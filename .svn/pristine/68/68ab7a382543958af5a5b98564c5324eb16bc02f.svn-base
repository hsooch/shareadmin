package shared.university.admin.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import shared.university.admin.domain.FileInfo;
import shared.university.admin.service.FileService;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * 웹 에디터로 이용중인 CKEDITOR 전용 Controller
 *
 * Created on 2018. 4. 6.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/ckeditor")
@Slf4j
public class CkeditorController {

    private final FileService fileService;

    @Autowired
    public CkeditorController(FileService fileService) {
        this.fileService = fileService;
    }

    /**
     * CKEditor 에서 이미지 파일을 업로드 할 때 이용
     *
     * @param file 이미지 파일 바이너리 정보
     * @param number ckeditor 번호
     * @param response HttpServletResponse
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public void imageFileUpload(@RequestParam(value = "upload") MultipartFile file,
                                @RequestParam(value = "CKEditorFuncNum", required = false) String number,
                                HttpServletResponse response) throws Exception {

        String errorMessage = null;
        String fileUrl = "";
        try {
            final FileInfo fileInfo = fileService.saveFile(file);
            fileUrl = fileInfo.getDownloadUrl();
        } catch (Exception e) {
            log.error("upload server error", e);
            errorMessage = "Internal Server Error!!";
        }


        StringBuilder sb = new StringBuilder();
        sb.append("<script type=\"text/javascript\">\n");
        sb.append("window.parent.CKEDITOR.tools.callFunction(").append(number).append(", '");
        sb.append(fileUrl);
        if(errorMessage != null) {
            sb.append("', '").append(errorMessage);
        }
        sb.append("');\n </script>");

        response.setContentType("text/html");
        response.setHeader("Cache-Control", "no-cache");
        PrintWriter out = response.getWriter();

        out.print(sb.toString());
        out.flush();
        out.close();
    }
}
