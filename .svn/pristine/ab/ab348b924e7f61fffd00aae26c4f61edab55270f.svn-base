package shared.university.admin.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.Const;
import shared.university.admin.domain.UserSession;
import shared.university.admin.service.CodeService;
import shared.university.admin.utils.AppUtils;

/**
 * 코드관리 관련 페이지 및 기능을 제공하는 Controller
 *
 * Created on 2018. 4. 10.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/code")
@Slf4j
public class CodeController {
	
	private final CodeService codeService;

    @Autowired
    public CodeController(CodeService codeService) {
        this.codeService = codeService;
    }

    /**
     * 코드관리 코드목록 조회
     *
     * @return 코드목록
     */
    @RequestMapping(value = "/{parentCode}/selectCodeList")
    @ResponseBody
    public Map<String, Object> selectCodeList(@PathVariable String parentCode) {
        log.info("Parent Code => {}", parentCode);
        return codeService.selectCodeList(parentCode);
    }

    /**
     * 코드 관리 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/management")
    public String viewCodeManagement() {
        return "university/codeManagement";
    }

    /**
     * 지역과 대학교 코드 목록을 조회 한다.
     *
     * @param rootCode 대학교 목록의 최상위 코드
     * @param request HttpServletRequest
     * @return 결과 데이터
     */
    @RequestMapping(value = "/university/list/{rootCode}")
    @ResponseBody
    public Map<String, Object> getUniversityCodeList(@PathVariable String rootCode, HttpServletRequest request) throws Exception {
        log.info("University Root Code => {}", rootCode);
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        return codeService.getUniversityList(rootCode, session);
    }
    
    /**
     * 선택한 코드 정보를 조회 한다.
     *
     * @param code 코드 값
     * @return 코드 정보
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/university/info/{code}")
    @ResponseBody
    public Map<String, Object> getCodeInfo(@PathVariable String code, HttpServletRequest req) throws Exception {
    	 return codeService.getCodeInfo(code);
    }
    
    /**
     * 코드 정보 저장
     * 
     * @param paramMap
     * @return 결과 데이터
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/university/saveCodeInfo")
    @ResponseBody
    public Map<String, Object> saveCodeInfo(@RequestParam Map<String, Object> paramMap) throws Exception {
    	codeService.saveCodeInfo(paramMap);
    	return AppUtils.createDefaultResultMap();
    }
    
    /**
     * 코드 이름으로 검색
     * @param paramMap
     * @return 검색 결과 데이터
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/university/searchCodeName")
    @ResponseBody
    public Map<String, Object> searchCodeName(@RequestParam Map<String, Object> paramMap) throws Exception {
    	final Map<String, Object> resultMap = codeService.searchCodeName(paramMap);
        return resultMap;
    }
    
    /**
     * 코드 삭제 (숨김)
     * @param paramMap
     * @return 결과 데이터
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/university/removeCode")
    @ResponseBody
    public Map<String, Object> removeCode(@RequestParam Map<String, Object> paramMap) throws Exception {
    	final Map<String, Object> resultMap = codeService.removeCode(paramMap);
    	return resultMap;
    }
    
    /**
     * code 로 codeName 가져옴
     * 
     * @param paramMap
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/getCodeName/{code}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getCodeName(@PathVariable String code) throws Exception {
    	log.info("code => " + code);
    	return codeService.getCodeName(code);
    }
    
    @RequestMapping(value = "/changeCodeIndex")
    @ResponseBody
    public Map<String, Object> changeCodeIndex(@RequestParam Map<String, Object> paramMap) throws Exception {
    	final Map<String, Object> resultMap = codeService.changeCodeIndex(paramMap);
    	return resultMap;
    }

}
