package shared.university.admin.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.AppException;
import shared.university.admin.ResultCode;
import shared.university.admin.service.AuthorityService;
import shared.university.admin.utils.AppUtils;

/**
 * 권한 관리 기능을 제공하는 Controller
 *
 * Created on 2018. 5. 16.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/authority")
@Slf4j
public class AuthorityController {

    private final AuthorityService authorityService;

    @Autowired
    public AuthorityController(AuthorityService authorityService) {
        this.authorityService = authorityService;
    }

    /**
     * 담당자 권한 유형 관리 페이지 로드
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/managerTypeSetting")
    public String viewManagerAuthority() {
        return "authority/managerTypeSetting";
    }

    /**
     * 그룹 목록 페이지 로드
     * 
     * @return 페이지 경로
     */
    @RequestMapping(value = "/viewGroupList")
    public String viewGroupList() {
    	return "authority/authorityGroupList";
    }

    /**
     * 개인별 권한 설정 페이지 로드
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/viewAuthUserList")
    public String viewAuthUserList() {
        return "authority/authorityUserList";
    }

    /**
     * 매니저 유형 정보가 포함된 목록을 조회한다.
     *
     * @param requestParam Request Parameter
     * @return 메니저 목록
     */
    @RequestMapping(value = "/managerList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getManagerList(@RequestParam Map<String, Object> requestParam) {
        AppUtils.printRequestParamMap(requestParam);
        return authorityService.getManagerList(requestParam);
    }
    
    /**
     * 담당자 권한 유형 수정.
     *
     * @param params 담당자 시퀀스, 권한유형
     */
    @RequestMapping(value = "/saveAuthorityType", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveAuthorityType(@RequestParam Map<String, Object> requestParam) {
        AppUtils.printRequestParamMap(requestParam);
        return authorityService.saveAuthorityType(requestParam);
    }
    
    /**
     * 권한 그룹 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getGroupList")
	@ResponseBody
	public Map<String, Object> getGroupList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
        return authorityService.getGroupList(request, paramMap);
	}
	
	@RequestMapping(value = "/getGroupInfo")
    @ResponseBody
    public Map<String, Object> getGroupInfo(@RequestParam Map<String, Object> paramMap) throws Exception {
        return authorityService.getGroupInfo(paramMap);
    }
    
    /**
     * 그룹별 메뉴 권한 목록 조회
     */
    @RequestMapping(value = "/getMenuAuthForGroup", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getMenuAuthForGroup(@RequestParam Map<String, Object> requestParam) throws Exception{
        AppUtils.printRequestParamMap(requestParam);
        return authorityService.getMenuAuthForGroup(requestParam);
    }
    
    /**
     * 그룹 권한 정보 수정.
     *
     * @param params 그룹 정보
     * @param menuSeq 체크한 메뉴 시퀀스 리스트 
     */
    @RequestMapping(value = "/saveGroupInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveGroupInfo(@RequestParam Map<String, Object> params,
    										 @RequestParam(value="menuSeq", required=false) List<Integer> menuSeq) throws Exception{
        return authorityService.saveGroupInfo(params, menuSeq);
    }
    
    /**
     * 그룹 권한 삭제
     *
     * @param params 그룹 정보
     * @param menuSeq 체크한 메뉴 시퀀스 리스트 
     */
    @RequestMapping(value = "/deleteGroup", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteGroup(@RequestParam Map<String, Object> params,
    									   @RequestParam(value="groupSeq", required=false) List<Integer> groupSeq) throws Exception{
        return authorityService.deleteGroup(params, groupSeq);
    }
    
    /**
     * 개인별 보유권한 리스트
     * 
     * @param params
     */
    @RequestMapping(value = "/getMenuAuthForUser", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getMenuAuthForUser(@RequestParam Map<String, Object> params) throws Exception{
    	AppUtils.printRequestParamMap(params);
        return authorityService.getMenuAuthForUser(params);
    }
    
    @RequestMapping(value = "/getUnivManagerList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getUnivManagerList(@RequestParam Map<String, Object> params) throws Exception{
    	return authorityService.getUnivManagerList(params);
    }
    
    @RequestMapping(value = "/getUnivMgrInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getUnivMgrInfo(@RequestParam Map<String, Object> params) throws Exception{
    	return authorityService.getUnivMgrInfo(params);
    }
    
    @RequestMapping(value = "/getUnAttachedGroupList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getUnAttachedGroupList(@RequestParam Map<String, Object> params) throws Exception {
    	return authorityService.getUnAttachedGroupList(params);
    }
    
    @RequestMapping(value = "/addGroup", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addGroup(@RequestParam Map<String, Object> params,
                                        @RequestParam(required = false) final List<Integer> groupSeqList) throws Exception {
        if (AppUtils.isEmpty(groupSeqList)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        } else {
            return authorityService.addGroup(params, groupSeqList);
        }
    }
    
    @RequestMapping(value = "/getAttachedGroupList", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getAttachedGroupList(@RequestParam Map<String, Object> params) throws Exception {
    	return authorityService.getAttachedGroupList(params);
    }
    
    @RequestMapping(value = "/removeGroup", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> removeGroup(@RequestParam Map<String, Object> params) throws Exception {
    	return authorityService.removeGroup(params);
    }
    
    @RequestMapping(value = "/getUserMenuInfo")
    @ResponseBody
    public Map<String, Object> getUserMenuInfo(@RequestParam Map<String, Object> paramMap) throws Exception {
        return authorityService.getUserMenuInfo(paramMap);
    }
    
    @RequestMapping(value = "/saveMenuAuthForUser")
    @ResponseBody
    public Map<String, Object> saveMenuAuthForUser(@RequestParam Map<String, Object> paramMap) throws Exception {
    	authorityService.saveMenuAuthForUser(paramMap);
    	return AppUtils.createDefaultResultMap();
    }
    
    @RequestMapping(value = "/deleteMenuAuthForUser")
    @ResponseBody
    public Map<String, Object> deleteMenuAuthForUser(@RequestParam Map<String, Object> paramMap) throws Exception {
    	authorityService.deleteMenuAuthForUser(paramMap);
    	return AppUtils.createDefaultResultMap();
    }
    
}















