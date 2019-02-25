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
import shared.university.admin.service.ExchangeResultService;

/**
 * 학점 교류 수강 결과 관련 기능 제공
 *
 * Created on 2018. 6. 7.
 *
 * @author 스퀘어네트(진태희)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/exchangeResult")
@Slf4j
public class ExchangeResultController {

    @Autowired
    private ExchangeResultService exchangeResultService;

    /**
     * 수강결과 등록(IN) 페이지 로딩
     *
     * @return 페이지 경로
     */
	@RequestMapping(value = "/viewExchangeResultInList")
	public String viewExchangeResultInList() {
	     return "exchangeResult/exchangeResultInList";
	}
	
	/**
     * 수강결과 등록 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getExchangeResultList")
	@ResponseBody
	public Map<String, Object> getExchangeResultList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		return exchangeResultService.getExchangeResultList(request, paramMap);
	}
	
    /**
     * 수강결과 등록 정보 조회
     * @param paramMap 승인 안내문 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    @RequestMapping(value = "/getExchangeResultInfo")
    @ResponseBody
    public Map<String, Object> getExchangeResultInfo(@RequestParam Map<String, Object> paramMap) throws Exception{

    	return exchangeResultService.getExchangeResultInfo(paramMap);
    }
    
    /**
	 * 수강결과 등록(IN) 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/downResultInList", method = RequestMethod.POST)
	public void downloadExchangeResultInList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
		exchangeResultService.downloadExchangeResultInList(response, paramMap);
	}
	
	/**
     * 수강결과 등록(IN) 일괄업로드
     * @param mFile MultipartFile 첨부파일
     * @param paramMap 학기코드, 년도, 대학코드
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과
     */
    @RequestMapping(value="/uploadExchangeResultData", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> uploadExchangeResultData(@RequestParam(value = "file", required = false) MultipartFile mFile,
    		@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception{

    	final Map<String, Object> resultMap = exchangeResultService.uploadExchangeResultData(mFile, paramMap, request);
    	
    	return resultMap;
    }
    
    /**
     * 수강결과 등록(OUT) 페이지 로딩
     *
     * @return 페이지 경로
     */
	@RequestMapping(value = "/viewExchangeResultOutList")
	public String viewExchangeResultOutList() {
	    return "exchangeResult/exchangeResultOutList";
	}
    
    /**
	 * 수강결과 조회(OUT) 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/downResultOutList", method = RequestMethod.POST)
	public void downResultOutList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
		exchangeResultService.downResultOutList(response, paramMap);
	}
    
    /**
     * 성적등록(IN) 페이지 로딩
     *
     * @return 페이지 경로
     */
	@RequestMapping(value = "/viewRegistScoreIn")
	public String viewRegistScoreIn() {
	     return "exchangeResult/registScoreInList";
	}
    
    /**
	 * 성적 정보 저장 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/saveScore", method = RequestMethod.POST)
    @ResponseBody
	public Map<String, Object> saveScore(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		 return exchangeResultService.saveScore(request, paramMap);
	}
    
    /**
	 * 성적등록(IN) 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/downRegistScoreInList", method = RequestMethod.POST)
	public void downRegistScoreInList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
		exchangeResultService.downRegistScoreInList(response, paramMap);
	}
	
	/**
     * 성적등록(IN) 일괄업로드
     * @param mFile MultipartFile 첨부파일
     * @param paramMap 학기코드, 년도, 대학코드
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과
     */
    @RequestMapping(value="/uploadScoreData", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> uploadScoreData( @RequestParam(value = "file", required = false) MultipartFile mFile,
    		@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception{

    	final Map<String, Object> resultMap = exchangeResultService.uploadScoreData(mFile, paramMap, request);
    	
    	return resultMap;
    }
    
    /**
     * 성적조회(OUT) 페이지 로딩
     *
     * @return 페이지 경로
     */
	@RequestMapping(value = "/viewRegistScoreOut")
	public String viewRegistScoreOut() {
	     return "exchangeResult/registScoreOutList";
	}
	
	/**
     * 성적 등급 정보가 포함된 결과 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getResultScoreList")
	@ResponseBody
	public Map<String, Object> getResultScoreList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		return exchangeResultService.getResultScoreList(request, paramMap);
	}
    
    /**
	 * 성적조회(OUT) 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/downRegistScoreOutList", method = RequestMethod.POST)
	public void downRegistScoreOutList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
		exchangeResultService.downRegistScoreOutList(response, paramMap);
	}
	
	/**
     * 성적 등급 전환 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getGradeTranceList")
	@ResponseBody
	public Map<String, Object> getGradeTranceList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		return exchangeResultService.getGradeTranceList(request, paramMap);
	}
	
	/**
     * 성적 등급 전환 정보 저장
     * @param paramMap 과목 정보
     * @param request 파라미터 및 세션정보 
     * @param dayOfWeekList 과목 요일 목록
     * @param startTimeList 과목 수업시작시간 목록
     * @param endTimeList 과목 수업종료시간 목록
     * @param classRoomList 과목 강의실 목록
     * @return resultMap 조회결과
     * @throws Exception java.lang
     */
	@RequestMapping("/saveGradeTranceInfo")
	@ResponseBody
	public Map<String, Object> saveGradeTranceInfo(@RequestParam Map<String, Object> paramMap, HttpServletRequest request,
			 @RequestParam(value="type2Name", required=false) List<String> type2NameList,
			 @RequestParam(value="type2Min", required=false) List<Integer> type2MinList,
			 @RequestParam(value="type2Max", required=false) List<Integer> type2MaxList,
			 @RequestParam(value="type3Name", required=false) List<String> type3NameList,
			 @RequestParam(value="type3Min", required=false) List<Integer> type3MinList,
			 @RequestParam(value="type3Max", required=false) List<Integer> type3MaxList
			) throws Exception {
		
		final Map<String, Object> resultMap = exchangeResultService.saveGradeTranceInfo(request, paramMap, type2NameList, type2MinList, type2MaxList, type3NameList, type3MinList, type3MaxList);
		
        return resultMap;
	}
    
    /**
     * 학생별 이력조회(OUT) 페이지 로딩
     *
     * @return 페이지 경로
     */
	@RequestMapping(value = "/viewStudentHistoryOut")
	public String viewStudentHistoryOut() {
	     return "exchangeResult/studentHistoryOutList";
	}
	
	/**
     * 학생별 이력조회(OUT) 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getStudentOutList")
	@ResponseBody
	public Map<String, Object> getStudentOutList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		return exchangeResultService.getStudentOutList(request, paramMap);
	}
	
	/**
	 * 학생별 이력조회(IN) 목록 조회
	 * @param paramMap 검색조건
	 * @param request 파라미터 및 세션정보 
	 * @return resultMap 조회결과 
	 * @throws Exception java.lang
	 */
	@RequestMapping("/getStudentInList")
	@ResponseBody
	public Map<String, Object> getStudentInList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		return exchangeResultService.getStudentInList(request, paramMap);
	}
    
    /**
     * 학생별 이력조회(IN) 페이지 로딩
     *
     * @return 페이지 경로
     */
	@RequestMapping(value = "/viewStudentHistoryIn")
	public String viewStudentHistoryIn() {
	     return "exchangeResult/studentHistoryInList";
	}
	
	/**
	 * 학생별 이력조회(OUT) 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/downStudentOutList", method = RequestMethod.POST)
	public void downStudentOutList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
		exchangeResultService.downStudentOutList(response, paramMap);
	}
	
	/**
	 * 학생별 이력조회(IN) 목록 엑셀 다운로드 
	 * @param paramMap 검색조건
	 * @param response 파라미터 및 세션정보 
	 * @throws Exception java.lang
	 */
	@RequestMapping(value="/downStudentInList", method = RequestMethod.POST)
	public void downStudentInList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
		exchangeResultService.downStudentInList(response, paramMap);
	}
	
}
