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
import shared.university.admin.service.SubjectService;

/**
 * 학점 교류 학기 관리의 페이지 및 기능을 제공하는 Controller
 *
 * Created on 2018. 5. 9.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/subject")
@Slf4j
public class SubjectController {
	
	@Autowired
	private SubjectService subjectService;
	
    /**
     * 학기 과목 관리 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/management")
    public String viewSubjectList() {
        return "subject/subject";
    }
    
    /**
     * 학기 과목 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getSubjectList")
	@ResponseBody
	public Map<String, Object> getSubjectList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = subjectService.getSubjectList(request, paramMap);
		
        return resultMap;
	}
	
	/**
     * 학기 과목 정보 저장
     * @param paramMap 과목 정보
     * @param request 파라미터 및 세션정보 
     * @param dayOfWeekList 과목 요일 목록
     * @param startTimeList 과목 수업시작시간 목록
     * @param endTimeList 과목 수업종료시간 목록
     * @param classRoomList 과목 강의실 목록
     * @return resultMap 조회결과
     * @throws Exception java.lang
     */
	@RequestMapping("/saveSubjectInfo")
	@ResponseBody
	public Map<String, Object> saveSubjectInfo(@RequestParam Map<String, Object> paramMap, HttpServletRequest request,
			 @RequestParam(value="subjectTimeSeq", required=false) List<Integer> subjectTimeSeqList,
			 @RequestParam(value="dayOfWeek", required=false) List<Integer> dayOfWeekList,
			 @RequestParam(value="startTime", required=false) List<String> startTimeList,
			 @RequestParam(value="endTime", required=false) List<String> endTimeList,
			 @RequestParam(value="classRoom", required=false) List<String> classRoomList
			) throws Exception {
		
		final Map<String, Object> resultMap = subjectService.saveSubjectInfo(request, paramMap, subjectTimeSeqList, dayOfWeekList, startTimeList, endTimeList, classRoomList);
		
        return resultMap;
	}
	
    /**
     * 학기 과목 정보 조회
     * @param paramMap 학기 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    @RequestMapping(value = "/getSubjectInfo")
    @ResponseBody
    public Map<String, Object> getSubjectInfo(@RequestParam Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = subjectService.getSubjectInfo(paramMap);
    	
    	return resultMap;
    }
    
	/**
     * 학기 과목 정보 삭제
     * @param paramMap 학기 정보
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과
     * @throws Exception java.lang
     */
	@RequestMapping("/deleteSubjectInfo")
	@ResponseBody
	public Map<String, Object> deleteSubjectInfo(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = subjectService.deleteSubjectInfo(request, paramMap);
		
        return resultMap;
	}
	
	/**
	 * 학기 과목 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping("/downloadSubjectList")
	public void downloadSubjectList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
    	 subjectService.downloadSubjectList(response, paramMap);
	}
	
	/**
     * 학기 과목 일괄업로드
     * @param mFile MultipartFile 첨부파일
     * @param paramMap 학기코드, 년도, 대학코드
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과
     */
    @RequestMapping(value="saveSubjectWithFile", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveSubjectWithFile( @RequestParam(value = "file", required = false) MultipartFile mFile
    		,@RequestParam Map<String, Object> paramMap
    		, HttpServletRequest request) throws Exception{

    	final Map<String, Object> resultMap = subjectService.saveSubjectWithFile(mFile, paramMap, request);
    	
    	return resultMap;
    	
    }
}
