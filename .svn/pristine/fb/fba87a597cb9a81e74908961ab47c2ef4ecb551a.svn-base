package shared.university.admin.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import shared.university.admin.AppException;
import shared.university.admin.AppProperties;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.domain.UserSession;
import shared.university.admin.service.CodeService;
import shared.university.admin.service.ExchangeService;
import shared.university.admin.service.SubjectService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

/**
 * 홈페이지 학점 교류 신청 및 정보 조회 관련 기능 제공
 *
 * Created on 2018. 5. 31.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/exchange")
@Slf4j
public class ExchangeController {

    private final ExchangeService exchangeService;
    private final CodeService codeService;
	private final SubjectService subjectService;

    @Autowired
    public ExchangeController(ExchangeService exchangeService, CodeService codeService, SubjectService subjectService) {
        this.exchangeService = exchangeService;
        this.codeService = codeService;
        this.subjectService = subjectService;
    }

    /**
     * 학점 교류 과목 목록 화면 로드
     *
     * @param request HttpServletRequest
     * @return 페이지 로드
     */
    @RequestMapping(value = "/viewSubjectList")
    public String viewSubjectList(final HttpServletRequest request, final HttpServletResponse response, ModelMap model) {
    	request.setAttribute("baseUrl", AppProperties.getProperty("admin.server.domain"));

    	request.setAttribute("areaList", codeService.selectCodeList("UNI00000000"));
    	request.setAttribute("semesterList", codeService.selectCodeList("STC00000000"));

    	return "exchange/viewSubject";
    }

    /**
     * 학점 교류 과목 목록 조회
     *
     * @param request HttpServletRequest
     * @param params 검색 파라미터
     * @return 희망과목 목록
     */
    @RequestMapping(value = "/getExSubjectList")
    @ResponseBody
    public Map<String, Object> getExSubjectList(final HttpServletRequest request, @RequestParam Map<String, Object> params) throws Exception {
        return exchangeService.getExSubjectList(params);
    }

    /**
     * 학점 교류 과목 정보 화면 로드
     *
     * @param request HttpServletRequest
     * @return 페이지 로드
     */
    @RequestMapping(value = "/viewExSubjectInfo")
    public String viewExSubjectInfo(final HttpServletRequest request, final HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
    	request.setAttribute("baseUrl", AppProperties.getProperty("admin.server.domain"));

    	final Map<String, Object> resultMap = subjectService.getSubjectInfo(params);
    	request.setAttribute("subjectInfo", resultMap.get("subjectInfo"));

    	return "exchange/viewSubjectInfo";
    }

    /**
     * 홈페이지 희망과목 신청목록 화면 로드
     *
     * @param request HttpServletRequest
     * @return 페이지 로드
     */
    @RequestMapping(value = "/viewHopeSubjectList")
    public String viewHopeSubjectList(final HttpServletRequest request, final HttpServletResponse response,
                                      @RequestParam(defaultValue = "false") final boolean isRetry) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        request.setAttribute("baseUrl", AppProperties.getProperty("admin.server.domain"));
        if (session == null) {
            if (isRetry) {
                return "exchange/notLogin";
            } else {
                this.ssoCheck(response, "viewHopeSubjectList");
            }
            return null;
        } else {
            request.setAttribute("userType", session.getUserType().equals(Const.USER_TYPE_STUDENT) ? "1" : "2");
            return "exchange/hopeSubject";
        }
    }

    @RequestMapping(value = "/viewApplyForExchange")
    public String viewApplyForExchange(final HttpServletRequest request, final HttpServletResponse response,
                                      @RequestParam(defaultValue = "false") final boolean isRetry) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        request.setAttribute("baseUrl", AppProperties.getProperty("admin.server.domain"));
        if (session == null) {
            if (isRetry) {
                return "exchange/notLogin";
            } else {
                this.ssoCheck(response, "viewApplyForExchange");
            }
            return null;
        } else {
            return "exchange/applyExchange";
        }
    }

    @RequestMapping(value = "/viewApplyList")
    public String viewApplyList(final HttpServletRequest request, final HttpServletResponse response,
                                      @RequestParam(defaultValue = "false") final boolean isRetry) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        request.setAttribute("baseUrl", AppProperties.getProperty("admin.server.domain"));
        if (session == null) {
            if (isRetry) {
                return "exchange/notLogin";
            } else {
                this.ssoCheck(response, "viewApplyList");
            }
            return null;
        } else {
            return "exchange/applyList";
        }
    }

    /**
     * 승인 안내문 발송 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/viewSendAcceptGuide")
    public String viewSendAcceptGuide() throws Exception {
    	return "exchange/viewSendAcceptGuide";
    }


    /**
     * 희망과목 등록 대학교 목록 조회
     *
     * @param request HttpServletRequest
     * @return 희망과목 등록 대학교 목록
     */
    @RequestMapping(value = "/hope/getHopeUnivList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getHopeUnivList(final HttpServletRequest request) {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        return exchangeService.getHopeUnivList(session);
    }

    /**
     * 희망과목 등록 대학교의 학기 목록 조회
     *
     * @param request HttpServletRequest
     * @param univCode 대학 코드
     * @return 희망과목 등록 대학교의 학기 목록
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/hope/getHopeSemesterList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getHopeSemesterList(final HttpServletRequest request,
                                                   @RequestParam(required = false) final String univCode) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        if (StringUtils.isEmpty(univCode)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        } else {
            return exchangeService.getHopeSemesterList(session, univCode);
        }
    }

    /**
     * 희망과목으로 등록한 과목 개수 정보 조회
     *
     * @param request HttpServletRequest
     * @return 희망과목으로 등록한 과목 개수 정보
     */
    @RequestMapping(value = "/hope/getHopeRegCntInfo", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getHopeRegCntInfo(final HttpServletRequest request) {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        return exchangeService.getHopeRegCntInfo(session);
    }

    /**
     * 희망과목 목록 조회
     *
     * @param request HttpServletRequest
     * @param params 검색 파라미터
     * @return 희망과목 목록
     */
    @RequestMapping(value = "/hope/getHopeSubjectList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getHopeSubjectList(final HttpServletRequest request, @RequestParam Map<String, Object> params) {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        return exchangeService.getHopeSubjectList(session, params);
    }

    /**
     * 선택한 희망과목 삭제
     *
     * @param request HttpServletRequest
     * @param params 희망과목 삭제 조건 파라미터
     * @return 처리 결과 코드
     */
    @RequestMapping(value = "/hope/deleteHopeSubject", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteHopeSubject(final HttpServletRequest request, @RequestBody Map<String, Object> params) {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        return exchangeService.deleteHopeSubject(session, params);
    }

    /**
     * 희망과목 저장
     *
     * @param request HttpServletRequest
     * @param params 희망과목 정보
     * @return 처리 결과 코드
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/hope/saveHopeSubject", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveHopeSubject(final HttpServletRequest request,
                                               @RequestBody Map<String, Object> params) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        return exchangeService.saveHopeSubject(session, params);
    }

    /**
     * 학점 교류 신청 정보를 저장한다.
     *
     * @param request HttpServletRequest
     * @param params 학점 교류 신청 정보 파라미터
     * @return 처리 결과 코드
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/saveExchangeInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveExchangeInfo(final HttpServletRequest request,
                                                @RequestBody final Map<String, Object> params) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        return exchangeService.saveExchangeInfo(session, params);
    }

    /**
     * SSO Login Check
     * (홈페이지가 SSO 구현되기 전까지 shareadmin 계정으로 임시 강제 로그인 처리)
     *
     * @param response HttpServletResponse
     * @throws IOException java.io
     */
    private void ssoCheck(final HttpServletResponse response, String retryUrl) throws IOException {
        final StringBuilder sb = new StringBuilder();
        final String serverDomain = AppProperties.getProperty("admin.server.domain");
        final String ssoIndexUrl = serverDomain + "exsignon/sso/sso_index.jsp";
        log.info("sso index url => {}", ssoIndexUrl);
        retryUrl = serverDomain + "exchange/" + retryUrl + ".do?isRetry=true&USESSIONID=";

        sb.append("<script>document.domain = 'sfup.or.kr'; function homeLoginCallBack(sId) {")
                    .append("$('#iframeLayer').parent().load('").append(retryUrl).append("' + sId);")
                .append("}</script>")
                .append("<iframe id='iframeLayer' src='")
                .append(ssoIndexUrl).append("'>브라우저가 Iframe을 지원하지 않아 서비스를 이용할 수 없습니다.</iframe>");

//        final StringBuilder sb = new StringBuilder();
//        final String serverDomain = AppProperties.getProperty("admin.server.domain");
//        final String loginUrl = serverDomain + "login/loginProgress.ajax";
//        retryUrl = serverDomain + "exchange/" + retryUrl;
//
//        sb.append("<script>")
//                .append("$.ajax({")
//                .append("method: 'POST',")
//                .append("url: '").append(loginUrl).append("',")
//                .append("data: {userId: 'univManager1', userPwd: 'sqn1q2w3e!'}")
//                .append("}).done(function(msg) {")
//                .append("$('#tempDivField').parent().load('").append(retryUrl)
//                .append(".do?isRetry=true&USESSIONID='+msg.USESSIONID);")
//                .append("});")
//                .append("</script>")
//                .append("<div id='tempDivField'></div>");

        final PrintWriter writer = response.getWriter();
        writer.write(sb.toString());
        writer.flush();
    }



    /********** 2018.06.06 lhj 작업중 **********/
    /**
     * 학점교류 신청(OUT) 페이지 로드
     * @return 페이지뷰
     */
    @RequestMapping(value = "/viewConfirmOut")
    public String viewConfirmOut() {
        return "exchange/confirmOut";
    }
    
    /**
     * 학점교류 신청(IN) 페이지 로드
     * @return 페이지뷰
     */
    @RequestMapping(value = "/viewConfirmIn")
    public String viewConfirmIn() {
        return "exchange/confirmIn";
    }
    
    /**
     * 학점교류 신청취소(OUT) 페이지 로드
     * @return 페이지뷰
     */
    @RequestMapping(value = "/viewApplyCancelOut")
    public String viewApplyCancelOut() {
        return "exchange/applyCancelOut";
    }
    
    /**
     * 학점교류 신청취소(IN) 페이지 로드
     * @return 페이지뷰
     */
    @RequestMapping(value = "/viewApplyCancelIn")
    public String viewApplyCancelIn() {
        return "exchange/applyCancelIn";
    }
    
    /**
     * 학점교류 신청 유저 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보
     * @return resultMap 조회결과
     * @throws Exception java.lang
     */
	@RequestMapping("/getApplyExchangeUserList")
	@ResponseBody
	public Map<String, Object> getApplyExchangeUserList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {

		final Map<String, Object> resultMap = exchangeService.getApplyExchangeUserList(request, paramMap);

        return resultMap;
	}
	
	/**
	 * 학점 교류 신청 상태 변경
	 * @param paramMap 상태값, 사유
	 * @param request 파라미터 및 세션정보
	 * @return resultMap 변경결과
	 * @throws Exception java.lang
	 */
	@RequestMapping("/changeApplyStatus")
	@ResponseBody
	public Map<String, Object> changeApplyStatus(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = exchangeService.changeApplyStatus(request, paramMap);
		
		return resultMap;
	}
	
	/**
	 * 학기 과목 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping("/downloadApplyExchangeUserList")
	public void downloadApplyExchangeUserList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
    	 exchangeService.downloadApplyExchangeUserList(response, paramMap);
	}
	
    
    /********** //2018.06.06 lhj 작업중 *************/

    /**
     * 승인 안내문 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getApplyExchangeWithAGSendList")
	@ResponseBody
	public Map<String, Object> getApplyExchangeWithAGSendList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		final Map<String, Object> resultMap = exchangeService.getApplyExchangeWithAGSendList(request, paramMap);
        return resultMap;
	}
}
