package shared.university.admin.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.service.UserManagementService;
import shared.university.admin.utils.AppUtils;

/**
 * 회원 관리 페이지 및 기능을 제공하는 Controller
 *
 * Created on 2018. 4. 27.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/userManagement")
@Slf4j
public class UserManagementController {
	
	@Autowired
	private UserManagementService userManagementService;
	
    /**
     * 회원 관리 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/management")
    public String viewManagement() {
        return "user/userManagement";
    }
    
    /**
     * 유저 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/selectUserList")
	@ResponseBody
	public Map<String, Object> selectUserList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request,
											  @RequestParam(required = false) List<String> userTypeArr) throws Exception {

		paramMap.put("userTypeArr", userTypeArr);
		final Map<String, Object> resultMap = userManagementService.selectUserList(request, paramMap);
		
        return resultMap;
	}
	
	/**
     * 회원 상태 변경 (주로 강제 탈퇴)
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과  
     * @throws Exception java.lang
     */
	@RequestMapping(value="/updateUserDetail", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateUserDetail(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = userManagementService.updateUserDetail(request, paramMap);
		
        return resultMap;
	}
	
	/**
	 *	회원 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/userListExcelDown", method = RequestMethod.POST)
	public void userListExcelDown(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
		userManagementService.userListExcelDown(response, paramMap);
	}
	
	/**
	 * 회원가입 신청 승인
	 *
	 * @param request HttpServletRequest
	 * @param paramMap Request Parameter
	 * @return 결과 코드
	 * @throws Exception java.lang
	 */
    @RequestMapping(value = "/updateUserAccountConfirm", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateUserAccountConfirm(HttpServletRequest request,  @RequestParam Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	
    	userManagementService.updateUserAccountConfirm(request, paramMap);
    	
        return resultMap;
    }

	/**
	 * 회원탈퇴 신청 승인
	 *
	 * @param request HttpServletRequest
	 * @param paramMap Request Parameter
	 * @return 결과 코드
	 * @throws Exception java.lang
	 */
    @RequestMapping(value = "/updateUserWithdrawConfirm", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateUserWithdrawConfirm(HttpServletRequest request,  @RequestParam Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	
    	userManagementService.updateUserWithdrawConfirm(request, paramMap);
    	
        return resultMap;
    }
}
