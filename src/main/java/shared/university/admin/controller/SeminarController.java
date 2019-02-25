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
import shared.university.admin.service.SeminarService;
import shared.university.admin.utils.AppUtils;

/**
 * 세미나/특강 관련 기능을 제공하는 Controller
 *
 * Created on 2018. 5. 15.
 *
 * @author 스퀘어네트(황수찬)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/seminar")
@Slf4j
public class SeminarController {

	private final SeminarService seminarService;

    @Autowired
    public SeminarController(SeminarService seminarService) {
        this.seminarService = seminarService;
    }
	
    /**
     * 세미나 목록 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/seminarList")
    public String viewSeminarList() {
        return "seminar/seminarList";
    }

    /**
     * 세미나 신청 페이지 로딩
     * 
     * @return 경로
     */
    @RequestMapping(value = "/seminarConfirm")
    public String viewSeminarConfirm() {
    	return "seminar/seminarConfirm";
    }
    
    /**
     * 세미나 출석관리 페이지 로딩
     * 
     * @return 경로
     */
    @RequestMapping(value = "/seminarAttend")
    public String viewSeminarAttend() {
    	return "seminar/seminarAttend";
    }
    
    /**
     * 공모전 목록 화면 로드
     * 
     */
    @RequestMapping(value = "/contestList")
    public String viewContestList() {
    	return "seminar/contestList";
    }
    
    /**
     * 세미나 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getSeminarList")
	@ResponseBody
	public Map<String, Object> getSeminarList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
        return seminarService.getSeminarList(request, paramMap);
	}
    
	/**
     * 세미나 정보 등록 (섬네일 파일 포함)
     *
     * @param file 섬네일 파일 바이너리
     * @param paramMap 세미나 정보 데이터
     * @throws Exception java.lang
     * @return 처리 결과 
     */
    @RequestMapping(value = "/submitWithThumbnail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveSeminarInfo(@RequestParam Map<String, Object> paramMap,
    										   @RequestParam(value = "file", required = false) MultipartFile thumb,
    										   HttpServletRequest request) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());
        final Map<String, Object> resultMap = seminarService.saveSeminarInfo(paramMap, thumb);
        return resultMap;
    }
    
    /**
     * 세미나 정보 등록 (섬네일 파일 미포함)
     *
     * @param info 세미나 정보 데이터
     * @throws Exception java.lang
     * @return 처리 결과 
     */
    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveSeminarInfo(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());
        return seminarService.saveSeminarInfoNofile(paramMap);
    }
    
    /**
     * 세미나 파일을 저장한다.
     * 
     */
    @RequestMapping(value = "/submitWithFiles")
    @ResponseBody
    public Map<String, Object> saveSeminarFile(@RequestParam Map<String, Object> paramMap,
    											@RequestParam(value = "file", required = false) List<MultipartFile> files,
    											HttpServletRequest request) throws Exception {
    	seminarService.saveSeminarFiles(paramMap, files);
    	return AppUtils.createDefaultResultMap();
    }
    
    /**
     * 세미나 정보를 조회한다.
     *
     * @param seq 세미나 시퀀스
     * @return 세미나 정보
     */
    @RequestMapping(value = "/getSeminarInfo")
    @ResponseBody
    public Map<String, Object> getSeminarInfo(@RequestParam Map<String, Object> paramMap) throws Exception {
        return seminarService.getSeminarInfo(paramMap);
    }
    
    /**
     * 세미나 정보 삭제
     * 
     * @param
     * @return
     */
    @RequestMapping(value = "/deleteSeminarInfo")
    @ResponseBody
    public Map<String, Object> deleteSeminarInfo(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
    	final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());
    	final Map<String, Object> resultMap = seminarService.deleteSeminarInfo(paramMap);
    	return resultMap;
    }
    
    /**
	 * 세미나 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/downloadSeminarList", method = RequestMethod.POST)
	public void downloadSeminarList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
    	 seminarService.downloadSeminarList(response, paramMap);
	}
    
	/**
	 * 세미나 신청자 사용자 목록 조회
	 * @throws Exception 
	 * 
	 */
	@RequestMapping(value="/getApplyUserList")
	@ResponseBody
	public Map<String, Object> getApplyUserList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		return seminarService.getApplyUserList(paramMap, request);
	}
	
	/**
	 * 세미나 신청자 승인
	 * 
	 */
	@RequestMapping(value="/changeApplyStatus")
	@ResponseBody
	public Map<String, Object> changeApplyStatus(@RequestParam Map<String, Object> params,
												 @RequestParam(value="userSeq", required=false) List<Integer> userSeq,
												 HttpServletRequest req) throws Exception {
		final UserSession session = (UserSession)req.getAttribute(Const.USER_SESSION_KEY);
        params.put("modStatusUserSeq", session.getUserSeq());
        seminarService.changeApplyStatus(params, userSeq);
    	return AppUtils.createDefaultResultMap();
	}
	
	/**
	 * 세미나 신청 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/downloadSeminarApplyList", method = RequestMethod.POST)
	public void downloadSeminarApplyList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
    	 seminarService.downloadSeminarApplyList(response, paramMap);
	}
	
	/**
	 * 세미나 신청자 출석 목록 조회
	 * @throws Exception 
	 * 
	 */
	@RequestMapping(value="/getAttendUserList")
	@ResponseBody
	public Map<String, Object> getAttendUserList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		return seminarService.getAttendUserList(paramMap);
	}
	
	 /**
     * 세미나 출첵 (확인증 파일 미포함)
     *
     * @param info 세미나 정보 데이터
     * @throws Exception java.lang
     * @return 처리 결과 
     */
    @RequestMapping(value = "/checkAttend", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> checkAttend(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());
        log.info("paramMap checkAttend => " + paramMap);
        return seminarService.checkAttend(paramMap);
    }
    
    /**
     * 세미나 출첵 (확인증 파일 포함)
     *
     * @param info 세미나 정보 데이터
     * @throws Exception java.lang
     * @return 처리 결과 
     */
    @RequestMapping(value = "/checkAttendWithCert", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> checkAttendWithCert(@RequestParam Map<String, Object> paramMap,
    											   @RequestParam(value = "file", required = false) MultipartFile cert,
    											   HttpServletRequest request) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        paramMap.put("regUserSeq", session.getUserSeq());
        paramMap.put("modUserSeq", session.getUserSeq());
        log.info("paramMap checkAttend => " + paramMap);
        return seminarService.checkAttendWithCert(paramMap, cert);
    }
    
    @RequestMapping(value="/unCheckAttend", method=RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> unCheckAttend(@RequestParam Map<String, Object> paramMap) throws Exception {
    	seminarService.unCheckAttend(paramMap);
    	return AppUtils.createDefaultResultMap();
    }
    
    @RequestMapping(value = "/removeCert", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> removeCert(@RequestParam Map<String, Object> paramMap) throws Exception {
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	seminarService.removeCert(paramMap);
    	return resultMap;
    }
    
    /**
	 * 공모전 목록 엑셀 다운로드 
     * @param paramMap 검색조건
     * @param response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/downloadContestList", method = RequestMethod.POST)
	public void downloadContestList(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
    	 seminarService.downloadContestList(response, paramMap);
	}
    
	
}





























