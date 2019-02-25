package shared.university.admin.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.Const;
import shared.university.admin.domain.TermsVO;
import shared.university.admin.domain.UserSession;
import shared.university.admin.service.TermsService;
import shared.university.admin.service.UserService;
import shared.university.admin.utils.AppUtils;

/**
 * 사용자 처리 관련 페이지 및 기능을 제공하는 Controller
 *
 * Created on 2018. 4. 2.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/user")
@Slf4j
public class UserController {
	
	@Autowired
	private TermsService termsService;
	
	@Autowired
	private UserService userService;

    /**
     * 회원가입 최초 진입 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/regist/main")
    public String viewRegistUserMain() {
        return "user/registUserMain";
    }

    /**
     * 대학 담당자 회원 가입 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/regist/univManagerAccount")
    public String viewRegistUniversityManager(HttpServletRequest req, Model model) {
    	model.addAttribute("userType","univ");
        return "user/registUniversityManager";
    }
    
    /**
     * 평생 학습 담당자 회원 가입 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/regist/llLearnManagerAccount")
    public String viewRegistAnyStudyManager(HttpServletRequest req, Model model) {
    	model.addAttribute("userType","llLearn");
        return "user/registUniversityManager";
    }
    
    
    /**
     * 약관조회
     * @Param Map<String, Object>
     * @return Map<String, Object>
     */
    @RequestMapping(value = "/regist/terms/{type}")
    @ResponseBody
    public Map<String, Object> getTerms(@PathVariable String type, @RequestParam Map<String, Object> paramMap) throws Exception{
        log.info("terms type => {}", type);
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();

        //TermsEntity param = BeanUtils.instantiateClass(TermsEntity.class);

        paramMap.put("termsType", StringUtils.defaultString(type));

        List<TermsVO> termsList = termsService.selectTermsList(paramMap);

        resultMap.put("termsList", termsList);

        return resultMap;
    }

    /**
     * 개인정보 수정 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/modify")
    public String viewModify(HttpServletRequest req) {
    	final UserSession session = (UserSession)req.getAttribute(Const.USER_SESSION_KEY);
		req.setAttribute("session", session);
		
		String url = "";
		
		if ("UGR01000003".equals(session.getUserType())) {
			url = "user/modifyLifetime";
		}
		else {
			url = "user/modifyUser";
		}
		
        return url;
    }
    
    /**
     * 회원 탈퇴 비밀번호입력 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/withdraw")
    public String viewWithdrawMember(HttpServletRequest req) {
    	final UserSession session = (UserSession)req.getAttribute(Const.USER_SESSION_KEY);
		req.setAttribute("session", session);
		
        return "user/withdrawMember";
    }

    /**
     * 회원 탈퇴 페이지 로딩
     * 
     * @return 페이지 경로
     */
    @RequestMapping(value = "/withdrawConfirm")
    public String viewWithdrawConfirm(HttpServletRequest req) {
    	final UserSession session = (UserSession)req.getAttribute(Const.USER_SESSION_KEY);
		req.setAttribute("session", session);
		
    	return "user/withdrawConfirm";
    }
    
    /**
     * 조건에 따른 사용자 수 리턴
     * @Param Map<String, Object>
     * @return Map<String, Object>
     */
    @RequestMapping(value = "/getUserCount")
    @ResponseBody
    public Map<String, Object> getUserCount(@RequestParam Map<String, Object> paramMap) throws Exception {
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	
    	Integer userCount = userService.getUserCount(paramMap);
    	
    	resultMap.put("userCount", userCount);
    	
        return resultMap;
    }
    
    /**
     * 회원가입 신청 등록
     * @Param Map<String, Object>
     * @return Map<String, Object>
     */
    @RequestMapping(value = "/insertUserAccount")
    @ResponseBody
    public Map<String, Object> insertUserAccount(@RequestParam Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	
    	userService.insertUserAccount(paramMap);
    	
        return resultMap;
    }
    
    /**
     * 사용자 비밀번호 변경
     * @Param HttpServletRequest 
     * @Param Map<String, Object>
     * @return Map<String, Object> 
     */
    @RequestMapping(value = "/updateUserPwd")
    @ResponseBody
    public Map<String, Object> updateUserPwd(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) throws Exception{
  	
    	final Map<String, Object> resultMap = userService.updateUserPwd(request, paramMap);
    	
        return resultMap;
    }
    
    /**
     * 아이디 찾기
     * @param Map<String, Object> 인증키값(kcp 또는 epki)
     * @param HttpServletRequest 파라미터 및 세션정보 
     * @return Map<String, Object> 조회결과  
     * @throws Exception java.lang
     */
	@RequestMapping("/selectUserId")
	@ResponseBody
	public Map<String, Object> selectUserId(@RequestParam Map<String, Object> paramMap, HttpServletRequest req) throws Exception {
		
		final Map<String, Object> resultMap = userService.selectUserId(paramMap);
		
        return resultMap;
	}
    
    /**
     * 회원탈퇴 신청
     * @Param Map<String, Object> 탈퇴 사유, 유저 아이디
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/withdrawMember")
    @ResponseBody
    public Map<String, Object> withdrawMember(@RequestParam Map<String, Object> paramMap) throws Exception {
    	userService.withdrawMember(paramMap);
    	
    	return AppUtils.createDefaultResultMap();
    }
    
    /**
     * 유저 정보를 조회한다.
     *
     * @param seq 유저 seq
     * @return 유저 정보
     */
    @RequestMapping(value = "/getUserInfo")
    @ResponseBody
    public Map<String, Object> getInfo(@RequestParam Map<String, Object> paramMap) {
        return userService.getUserInfo(paramMap);
    }
	
    /**
     * 유저 정보를 수정한다.
     * 
     * @param Map<String, Object> 유저 정보
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/updateUserInfo")
    @ResponseBody
    public Map<String, Object> modifyMember(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
    	userService.updateUserInfo(request, paramMap);
    	return AppUtils.createDefaultResultMap();
    }
    
    @RequestMapping(value="/selectUserList")
    @ResponseBody
    public Map<String, Object> selectUserList(@RequestParam Map<String, Object> paramMap) throws Exception {
    	return userService.selectUserList(paramMap);
    }
    
}
