package shared.university.admin.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import shared.university.admin.AppException;
import shared.university.admin.AppProperties;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.dao.SecurityHistoryDao;
import shared.university.admin.domain.UserSession;
import shared.university.admin.service.MainService;
import shared.university.admin.utils.CipherUtils;

import javax.servlet.http.HttpServletRequest;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;

/**
 * Created on 2018. 4. 5.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/main")
public class MainController {

    private final MainService mainService;

    private final SecurityHistoryDao securityHistoryDao;

    private final SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm");

    @Autowired
    public MainController(MainService mainService, SecurityHistoryDao securityHistoryDao) {
        this.mainService = mainService;
        this.securityHistoryDao = securityHistoryDao;
    }

    @RequestMapping
    public String viewMain(HttpServletRequest request) throws AppException {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        request.setAttribute("session", session);
        return "adminMain";
    }

    /**
     * 사용자 메뉴 정보를 조회
     *
     * @param request HttpServletRequest
     * @return 결과 데이터
     */
    @RequestMapping(value = "/user/menu")
    @ResponseBody
    public Map<String, Object> getUserMenuList(final HttpServletRequest request) {
        // Request 정보에서 사용자 세션 정보 취득
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        return mainService.getUserMenuList(session);
    }


    /**
     * 계정 전환 처리 (아이디를 암호화 하여 홈페이지로 리다이렉션 시킨다.)
     *
     * @param request HttpServletRequest
     * @param userId 전환할 사용자 아아디
     * @param userSeq 전환할 사용자 시퀀스
     * @return Hompage Redirection
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/change/account")
    public String changeAccount(final HttpServletRequest request,
                              @RequestParam(required = false) final String userId,
                              @RequestParam(required = false) final Integer userSeq) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);

        // Parameter Check
        if (StringUtils.isEmpty(userId) || userSeq == null) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        }

        // History 저장
        securityHistoryDao.insertHistory(session.getUserSeq(), userSeq, Const.SECURITY_HISTORY_ACTION_TYPE_CHANGE_ACCOUNT);

        // Create Redirect URL
        final String url = AppProperties.getProperty("share.portal.server.domain")
                + "monitoring/errorMessageView.do"
                + "?key=" + URLEncoder.encode(
                        CipherUtils.aesEncode(sdf.format(Calendar.getInstance().getTime()), userId),
                Const.DEFAULT_CHAR_SET_STR);

        return "redirect:" + url;
    }
}
