package shared.university.admin.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import shared.university.admin.service.FileService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 파일 업/다운 Controller
 *
 * Created on 2018. 4. 6.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/file")
@Slf4j
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    /**
     * 파일을 다운로드 한다.
     *
     * @param fileKey 저장된 경로 표기를 위해 받는 값으로 파일 이름으로 사용됨.
     * @param extension  파일 확장자를 파라미터로 받음
     * @param response HttpServletResponse
     * @param request HttpServletRequest
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/download/{fileKey}")
    public void fileDownload(@PathVariable String fileKey, HttpServletResponse response, HttpServletRequest request) throws Exception {
        log.info("Download file key => {}", fileKey);
        fileService.download(fileKey, response, request);
    }
}
