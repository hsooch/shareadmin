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
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.Const;
import shared.university.admin.domain.UserSession;
import shared.university.admin.service.MailAuthService;
import shared.university.admin.service.SemesterService;

/**
 * 학점 교류 학기 관리의 페이지 및 기능을 제공하는 Controller
 *
 * Created on 2018. 5. 11.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/semester")
@Slf4j
public class SemesterController {
	
	@Autowired
	private SemesterService semesterService;
	
	@Autowired
	private MailAuthService mailAuthService;
	
    /**
     * 학기 관리 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/management")
    public String viewSemesterList() {
        return "semester/semester";
    }
    
    /**
     * 학기 접수기간/안내문 관리 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/guideManagement")
    public String viewSemesterListWithGuide() {
        return "semester/semesterGuide";
    }
    
    /**
     * 학기 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getSemesterList")
	@ResponseBody
	public Map<String, Object> getSemesterList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = semesterService.getSemesterList(request, paramMap);
		
        return resultMap;
	}
	
	/**
     * 학기 정보 저장
     * @param paramMap 학기 정보
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과
     * @throws Exception java.lang
     */
	@RequestMapping(value="/saveSemesterInfo", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveSemesterInfo(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = semesterService.saveSemesterInfo(request, paramMap);
		
        return resultMap;
	}
	
    /**
     * 학기 정보 조회
     * @param paramMap 학기 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    @RequestMapping(value = "/getSemesterInfo")
    @ResponseBody
    public Map<String, Object> getSemesterInfo(@RequestParam Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = semesterService.getSemesterInfo(paramMap);
    	
    	return resultMap;
    }
    
	/**
     * 학기 정보 삭제
     * @param paramMap 학기 정보
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과
     * @throws Exception java.lang
     */
	@RequestMapping(value="/deleteSemesterInfo", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteSemesterInfo(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = semesterService.deleteSemesterInfo(request, paramMap);
		
        return resultMap;
	}
	
	/**
	 * 학기 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/downloadSemesterList", method = RequestMethod.POST)
	public void downloadSemesterList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
    	 semesterService.downloadSemesterList(response, paramMap);
	}
	
	/**
     * 학기 접수기간/안내문 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getSemesterListWithGuide")
	@ResponseBody
	public Map<String, Object> getSemesterListWithGuide(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = semesterService.getSemesterListWithGuide(request, paramMap);
		
        return resultMap;
	}
	
    /**
     * 학기 접수기간/안내문 정보 조회
     * @param paramMap 학기 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    @RequestMapping(value = "/getGuideInfo")
    @ResponseBody
    public Map<String, Object> getGuideInfo(@RequestParam Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = semesterService.getGuideInfo(paramMap);
    	
    	return resultMap;
    }
    
    /**
     * 학기 접수기간/안내문 정보 저장 (첨부파일 포함)
     * @param file MultipartFile 첨부파일
     * @param paramMap 학기 정보 조회 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    @RequestMapping(value="/saveGuideInfoWithFile", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveGuideInfo( @RequestParam(value = "file", required = false)List<MultipartFile> files
    										, @RequestParam Map<String, Object> paramMap
    										, HttpServletRequest request) throws Exception{
    	final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        log.info("User Session => {}", session);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());

    	final Map<String, Object> resultMap = semesterService.saveGuideInfo(files, paramMap);
    	
    	return resultMap;
    	
    }
    
    /**
     * 학기 접수기간/안내문 정보 저장 (첨부파일 미포함)
     * @param file MultipartFile 첨부파일
     * @param paramMap 학기 정보 조회 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    @RequestMapping(value="/saveGuideInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveGuideInfo( @RequestParam Map<String, Object> paramMap
    										, HttpServletRequest request) throws Exception{
    	final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        log.info("User Session => {}", session);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());

    	final Map<String, Object> resultMap = semesterService.saveGuideInfo(paramMap);
    	
    	return resultMap;
    	
    }
    
    /**
     * 학기 접수기간/안내문 정보 저장 (첨부파일 미포함)
     * @param paramMap 학기 정보 조회 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    @RequestMapping(value="/deleteGuideInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteGuideInfo( @RequestParam Map<String, Object> paramMap
    										, HttpServletRequest request) throws Exception{
    	final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        log.info("User Session => {}", session);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());

    	final Map<String, Object> resultMap = semesterService.deleteGuideInfo(paramMap);
    	
    	return resultMap;
    	
    }
    
    /**
	 * 학기 접수기간/안내문 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/downloadSemesterListWithGuide", method = RequestMethod.POST)
	public void downloadSemesterListWithGuide(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
    	 semesterService.downloadSemesterListWithGuide(response, paramMap);
	}
	   
    /**
     * 승인 안내문 정보 조회
     * @param paramMap 승인 안내문 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    @RequestMapping(value = "/getAcceptGuideInfo")
    @ResponseBody
    public Map<String, Object> getAcceptGuideInfo(@RequestParam Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = semesterService.getAcceptGuideInfo(paramMap);
    	
    	return resultMap;
    }
    
    /**
     * 승인 안내문 정보 저장 (첨부파일 포함)
     * @param file MultipartFile 첨부파일
     * @param paramMap 승인 안내문 정보 조회 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    @RequestMapping(value="/saveAcceptGuideInfoWithFile", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveAcceptGuideInfo( @RequestParam(value = "file", required = false)List<MultipartFile> files
    										, @RequestParam Map<String, Object> paramMap
    										, HttpServletRequest request) throws Exception{
    	final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        log.info("User Session => {}", session);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());
    	final Map<String, Object> resultMap = semesterService.saveAcceptGuideInfo(files, paramMap);
    	return resultMap;
    	
    }
    
    /**
     * 승인 안내문 정보 저장 (첨부파일 미포함)
     * @param file MultipartFile 첨부파일
     * @param paramMap 승인 안내문 정보 조회 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    @RequestMapping(value="/saveAcceptGuideInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveAcceptGuideInfo( @RequestParam Map<String, Object> paramMap
		    									  , HttpServletRequest request) throws Exception{
    	final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        log.info("User Session => {}", session);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());
    	final Map<String, Object> resultMap = semesterService.saveAcceptGuideInfo(paramMap);
    	return resultMap;
    	
    }
    
    /**
     * 승인 안내문 정보 저장 (첨부파일 미포함)
     * @param paramMap 승인 안내문 정보 조회 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    @RequestMapping(value="/deleteAcceptGuideInfo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteAcceptGuideInfo( @RequestParam Map<String, Object> paramMap
    										, HttpServletRequest request) throws Exception{
    	final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        log.info("User Session => {}", session);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());

    	final Map<String, Object> resultMap = semesterService.deleteAcceptGuideInfo(paramMap);
    	
    	return resultMap;
    	
    }
    
    /**
     * 승인 안내 메일/문자 발송
     * @param paramMap 승인 안내문 정보 조회 파라미터
     * @param request
     * @return resultMap 결과
     */
    @RequestMapping(value = "/sendAcceptGuide", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> sendAcceptGuide(@RequestParam Map<String, Object> paramMap,
    										   HttpServletRequest req) throws Exception {
    	log.info("parameters => " + paramMap);
    	semesterService.sendAcceptGuide(paramMap);
    	final Map<String, Object> resultMap = mailAuthService.sendAcceptGuide(paramMap);
    	return resultMap;
    }
	
}
