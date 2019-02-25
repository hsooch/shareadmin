package shared.university.admin.controller;

import egovframework.rte.fdl.cmmn.trace.LeaveaTrace;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import shared.university.admin.AppException;
import shared.university.admin.AppProperties;
import shared.university.admin.ResultCode;

import javax.servlet.http.HttpServletRequest;

/**
 * Created on 2018. 3. 16.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Controller
@Slf4j
public class ExampleController {

    private final LeaveaTrace leaveaTrace;

    @Autowired
    public ExampleController(LeaveaTrace leaveaTrace) {
        this.leaveaTrace = leaveaTrace;
    }
    
    @RequestMapping(value = "/example")
    public String examplePage(final HttpServletRequest request) {
        request.setAttribute("serverDomain", AppProperties.getProperty("admin.server.domain"));
        return "example/example";
    }

    @RequestMapping(value = "/leaveaTrace")
    public String exampleLeavaTrace() {
        log.debug("controller in~~~~");
        leaveaTrace.trace("example.message", this.getClass());
        log.debug("controller out~~~");
        return "example/example";
    }

    @RequestMapping(value = "/pagingSample")
    public String pagingSample(final HttpServletRequest request) {
        request.setAttribute("serverDomain", AppProperties.getProperty("admin.server.domain"));
        return "example/pagingSample";
    }

    @RequestMapping(value = "/layerPopupSample")
    public String layerPopupSample(final HttpServletRequest request) {
        request.setAttribute("serverDomain", AppProperties.getProperty("admin.server.domain"));
        return "example/layerPopupSample";
    }

    @RequestMapping(value = "/popupSample")
    public String popupSample(final HttpServletRequest request) {
        request.setAttribute("serverDomain", AppProperties.getProperty("admin.server.domain"));
        return "example/popupSample";
    }

    @RequestMapping(value = "/exception")
    @ResponseBody
    public String exceptionResolverTest() throws Exception {
        throw new AppException(ResultCode.ETC_SERVER_ERROR);
    }
}
