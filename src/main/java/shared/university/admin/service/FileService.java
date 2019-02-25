package shared.university.admin.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import shared.university.admin.AppProperties;
import shared.university.admin.Const;
import shared.university.admin.dao.FileDao;
import shared.university.admin.domain.FileInfo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * 파일 업/다운로드 시 필요한 데이터 저장 및 읽기 기능
 *
 * Created on 2018. 4. 16.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Service
@Slf4j
public class FileService {

    private final FileDao fileDao;

    private final SimpleDateFormat sdf = new SimpleDateFormat("/yyyy/MM/dd");

    @Autowired
    public FileService(FileDao fileDao) {
        this.fileDao = fileDao;
    }

    /**
     * MultipartFile 정보를 디스크에 저장한다.
     *
     * @param file 파일 정보
     * @return 저장된 파일 정보
     * @throws IOException java.io
     */
    public FileInfo saveFile(final MultipartFile file) throws IOException {
        // 현재 날짜 가져오기
        final Calendar cal = Calendar.getInstance();

        // 파일을 저장할 경로를 확인 후 존재하지 않을 경우 생성한다.
        final String datePath = sdf.format(cal.getTime());
        final Path uploadPath = Paths.get(AppProperties.getProperty("ckeditor.image.upload.base.dir")
                + datePath);
        log.info("Upload Dir => {}", uploadPath.toAbsolutePath());
        if (!Files.isDirectory(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 신규 파일명 생성
        final String fileKey = MDC.get(Const.MDC_LOG_KEY);
        final String fileExtension = com.google.common.io.Files.getFileExtension(file.getOriginalFilename());
        final String newFileName = fileKey + "." + fileExtension;
        log.info("Save File Name => {}", newFileName);

        // 파일 저장
        final Path filePath = Paths.get(uploadPath.toString() + "/" + newFileName);
        Files.copy(file.getInputStream(), filePath);

        // 이미지 파일 URL 생성
        final String downloadUrl = AppProperties.getProperty("admin.server.domain")
                + "file/download/" + fileKey + ".do";
        log.info("Download url => {}", downloadUrl);

        // 결과 데이터 생성
        final FileInfo info = new FileInfo();
        info.setOriFileName(file.getOriginalFilename());
        info.setSaveFileName(newFileName);
        info.setSaveFullPath(filePath.toAbsolutePath().toString());
        info.setExtension(fileExtension);
        info.setDownloadUrl(downloadUrl);
        info.setFileSize(file.getSize());
        info.setFileKey(fileKey);
        log.info("File Save Info => {}", info);
        fileDao.insertFileInfo(info);

        return info;
    }

    /**
     * 파일 다운로드를 위해 Response Header 를 셋팅하고 실제 파일 바이너리를 내려준다.
     *
     * @param fileDir 디스크에 저장된 파일 경로 (기본 업로드 경로 제외)
     * @param response HttpServletResponse
     * @param mimeType MIME Type
     * @param userAgent 브라우저 정보를 확인하기 위한 Request Header의 User-Agent 값
     * @param extension 파일 확장자
     * @throws Exception java.lang
     */
    public void download(final String fileKey, final HttpServletResponse response, final HttpServletRequest request) throws Exception {
        // DB 에서 파일 정보 조회
        final FileInfo fileInfo = fileDao.getFileInfo(fileKey);
        if (fileInfo == null) {
            response.sendError(404);
            return;
        }

        final String mimeType = StringUtils.defaultIfEmpty(request.getSession().getServletContext()
                .getMimeType(fileInfo.getSaveFileName()), "application/octet-stream");
        final String userAgent = request.getHeader("User-Agent");
        final String encodeFileName = URLEncoder.encode(fileInfo.getOriFileName(), Const.DEFAULT_CHAR_SET_STR);

        // Response Header Setting
        response.setContentType(mimeType + "; charset=" + Const.DEFAULT_CHAR_SET_STR);
        if (userAgent != null && userAgent.contains("MSIE")) { // MS IE (보통은 6.x 이상 가정)
            response.setHeader("Content-Disposition", "attachment; filename=" + encodeFileName + ";");
        } else { // 모질라나 오페라
            response.setHeader("Content-Disposition", "attachment; filename=" + encodeFileName + ";");
        }
        response.setHeader("Content-Length", "" + fileInfo.getFileSize());

        // File Download
        final Path filePath = Paths.get(fileInfo.getSaveFullPath());
        Files.copy(filePath, response.getOutputStream());
    }
}
