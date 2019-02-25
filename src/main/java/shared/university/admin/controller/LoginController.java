/**
 * 
 */
package shared.university.admin.controller;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.Const;
import shared.university.admin.domain.LoginVO;
import shared.university.admin.service.LoginService;
import shared.university.admin.service.MailAuthService;
import shared.university.admin.service.UserService;
import shared.university.admin.utils.RedisSessionUtils;
import shared.university.admin.utils.StringUtil;

/**
 * 로그인 페이지 및 관련 기능을 제공하는 Controller
 *
 * Created on 2018. 4. 9.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Slf4j
@Controller
@RequestMapping("/login")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private MailAuthService mailAuthService;

	/**
     * 로그인 페이지 호출
     *
     * @param paramMap Map<String, Object> redirect url을 포함한다.
     * @param request HttpServletRequest
     * @param model Model
     * @throws Exception java.lang
     * @return String
     */
    @RequestMapping("/login")
	public String loginView(@RequestParam Map<String, Object> paramMap, HttpServletRequest request,
			Model model) throws Exception {
    	
    	//로그인 후 돌아갈 URL
		if(paramMap.get("refUrl") != null && !"".equals(paramMap.get("refUrl"))) {
			model.addAttribute("refUrl", paramMap.get("refUrl"));
		}
		
		return "/login/login";
	}
    
    /**
     * 로그인 처리 프로세스
     * @param paramMap Map<String, Object> 아이디, 패스워드을 가짐.
     * @param request HttpServletRequest
     * @param response HttpServletResponse
     * @param model Model
     * @return resultMap Map<String, Object> 로그인 결과
     * @throws Exception
     */
    @RequestMapping(value = "/loginProgress", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> loginProcess(@ModelAttribute("loginVO") LoginVO loginVO,@RequestParam Map<String, Object> paramMap, HttpServletRequest request
                , HttpServletResponse response, Model model) throws Exception{
    	
        log.debug(request.getRequestURI());
        log.debug(request.getRequestURL().toString());
        log.debug(request.getServletPath());
    	Map<String, Object> resultMap = loginService.processLogin(request, loginVO);
    	
    	resultMap.put("refUrl", StringUtil.nvltoStr(paramMap.get("refUrl"),""));
    	
    	Cookie cookie = new Cookie(Const.USESSIONID_KEY, (String)resultMap.get(Const.USESSIONID_KEY));
        cookie.setPath("/");																			// 모든 경로에서 접근 가능하도록
        response.addCookie(cookie);

        RedisSessionUtils.setAttribute(request, Const.SSO_ASSERT_USER_ID, loginVO.getUserId());

    	return resultMap;
    }

	@RequestMapping(value = "/ssoLogin", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> ssoLoginProcess(HttpServletRequest request, HttpServletResponse response) throws Exception{
		final String ssoSessionUserId = RedisSessionUtils.getAttribute(request, Const.SSO_SESSION_USER_ID);
		log.info("SSO Session User Id => [{}]", ssoSessionUserId);

		final LoginVO loginVO = new LoginVO();
		loginVO.setUserId(ssoSessionUserId);
		Map<String, Object> resultMap = loginService.processLogin(request, loginVO);

		Cookie cookie = new Cookie(Const.USESSIONID_KEY, (String)resultMap.get(Const.USESSIONID_KEY));
		cookie.setPath("/");																			// 모든 경로에서 접근 가능하도록
		response.addCookie(cookie);

		return resultMap;
	}
    
	/**
     * 로그아웃 처리 및 로긴페이지 호출
     *
	 * @param response HttpServletResponse
     * @return redirect login page
     */
    @RequestMapping("/logout")
    public String logoutProcess(HttpServletResponse response) {

        Cookie cookie = new Cookie(Const.USESSIONID_KEY, "");
        cookie.setMaxAge(0);	// 쿠키 유지 기간(이부분이 없으면 브라우저 종료시 사라짐)
        cookie.setPath("/");	// 모든 경로에서 접근 가능하도록
        response.addCookie(cookie);

    	return "redirect:/login/login.do";
    }
    
    /**
     * 휴면계정 복원 프로세스
     *
     * @param request HttpServletRequest
     * @param paramMap Map<String, Object> 아이디, 패스워드, 본인인증키값
     * @throws Exception java.lang
     * @return resultMap Map<String, Object> 휴면계정 복원 결과
     */
    @RequestMapping("/updateUserAccountWakeUp")
    @ResponseBody
    public Map<String, Object> updateUserAccountWakeUp(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception {
    	
    	final Map<String, Object> resultMap = userService.updateUserAccountWakeUp(paramMap);
    	return resultMap;
    }
    
	/**
     * 임시 비밀번호 발급 메일 전송
     *
     * @param paramMap Map<String, Object> 임시 비밀번호 발급 받을 메일 정보
     * @param request HttpServletRequest 파라미터 및 세션정보 
     * @return resultMap Map<String, Object> 전송결과
     * @throws Exception java.lang
     */
	@RequestMapping("/sendMailUserPwdTmpr")
	@ResponseBody
	public Map<String, Object> emailCertificationReq(@RequestParam Map<String, Object> paramMap, HttpServletRequest req) throws Exception {
		
		final Map<String, Object> resultMap = mailAuthService.sendMailUserPwdTmpr(paramMap);
		
        return resultMap;
	}
}
