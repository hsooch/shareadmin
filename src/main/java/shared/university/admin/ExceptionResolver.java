package shared.university.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;
import shared.university.admin.utils.AppUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * Created on 2017. 7. 19.
 *
 * @author Sung-Hun Choi
 * @since JDK1.8
 */
@Slf4j
public class ExceptionResolver implements HandlerExceptionResolver {

    private final MappingJackson2JsonView jsonView;

    private final ObjectMapper mapper;

    @Autowired
    public ExceptionResolver(MappingJackson2JsonView jsonView, ObjectMapper objectMapper) {
        this.jsonView = jsonView;
        this.mapper = objectMapper;
    }

    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        ResultCode resultCode;
        Object[] messageData = null;
        Exception originalException = null;

        // Result Code Setting
        if (e instanceof AppException) {
            AppException ae = (AppException)e;
            resultCode = ae.getResultCode();

            if (ae.getOriginalException() != null) {
                originalException = ae.getOriginalException();
            }

            if (ae.getMessageData() != null) {
                messageData = ae.getMessageData();
            }
        } else {
            resultCode = ResultCode.ETC_SERVER_ERROR;
            originalException = e;
        }

        // Result Map Data Setting
        Map<String, Object> resultMap;
        if (messageData == null) {
            resultMap = AppUtils.createDefaultResultMap(resultCode);
        } else {
            resultMap = AppUtils.createDefaultResultMap(resultCode, messageData);
        }

        // Print result Map Data
        try {
            final String logMsg = mapper.writeValueAsString(resultMap);
            if (resultCode.isError()) {
                if (originalException == null) {
                    log.error(logMsg);
                } else {
                    log.error(logMsg, originalException);
                }
            } else {
                log.info(logMsg);
            }

        } catch (IOException e1) {
            log.error("ETC Server ERROR", e1);
        }

        // View Setting
        final ModelAndView mav;
        if (httpServletRequest.getRequestURI().endsWith("do")) {
            mav = new ModelAndView("commons/defaultError");
            mav.addAllObjects(resultMap);
        } else {
            this.jsonView.setAttributesMap(resultMap);
            this.jsonView.setContentType("application/json");
            mav = new ModelAndView(this.jsonView);
        }

        return mav;
    }
}
