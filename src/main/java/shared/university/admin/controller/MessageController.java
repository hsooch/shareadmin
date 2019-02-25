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
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.service.MessageService;
import shared.university.admin.utils.AppUtils;

/**
 * 메일발송 관리 메뉴 Controller
 *
 * Created on 2018. 5. 23.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/message")
@Slf4j
public class MessageController {
	
	@Autowired
	private MessageService messageService;
	
    /**
     * SMS발송 관리 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/smsSendManagement")
    public String viewSmsSend() {
        return "message/smsSendManagement";
    }
    
    /**
     * 이메일발송 관리 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/emailSendManagement")
    public String viewEmailSend() {
        return "message/emailSendManagement";
    }
    
    /**
     * SMS발송
     * @param paramMap 수신자 목록, 내용, 시간 등
     * @param request 파라미터 및 세션정보 
     * @return resultMap 처리결과 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/sendSms", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> sendSms(@RequestParam Map<String, Object> paramMap) throws Exception {
		messageService.sendSms(paramMap);
        return AppUtils.createDefaultResultMap();
	}
	
    /**
     * e-mail 발송
     * @param paramMap 수신자 목록, 내용, 시간 등
     * @param request 파라미터 및 세션정보 
     * @return resultMap 처리결과 
     * @throws Exception java.lang
     */
	@RequestMapping(value="/sendEmail", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> sendEmail(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = messageService.sendEmail(request, paramMap);
		
        return resultMap;
	}
    
    /**
     * 메시지 발송 정보 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getMessageInfo")
	@ResponseBody
	public Map<String, Object> getMessageInfo(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = messageService.getMessageInfo(request, paramMap);
		
        return resultMap;
	}
	
    /**
     * 메시지 전송 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getMessageList")
	@ResponseBody
	public Map<String, Object> getMessageList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = messageService.getMessageList(request, paramMap);
		
        return resultMap;
	}
	
    /**
     * 메시지 수신자 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/getMessageTargetList")
	@ResponseBody
	public Map<String, Object> getMessageTargetList(@RequestParam Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		final Map<String, Object> resultMap = messageService.getMessageTargetList(request, paramMap);
		
        return resultMap;
	}
	
	/**
	 * 서버에 사진 업로드
	 * 
	 */
	@RequestMapping(value = "/uploadSmsImage", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> uploadSmsImage(@RequestParam Map<String, Object> paramMap, @RequestParam(value = "file", required = false) MultipartFile img) throws Exception {
		return messageService.uploadSmsImage(paramMap, img);
	}
	
	/**
	 * 발송 타겟 목록 
	 * 
	 * @param paramMap
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getSenderList")
	@ResponseBody
	public Map<String, Object> getSenderList(@RequestParam Map<String, Object> paramMap) throws Exception {
		final Map<String, Object> resultMap = messageService.getSenderList(paramMap);
		return resultMap;
	}
	
	/**
	 * 체크된 타겟 목록
	 *  
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getCheckedSenderList")
	@ResponseBody
	public Map<String, Object> getCheckedSenderList(@RequestParam Map<String, Object> paramMap
												  , @RequestParam(value = "studentNumber", required = false) List<String> studentNumber) throws Exception {
		final Map<String, Object> resultMap = messageService.getCheckedSenderList(paramMap, studentNumber);
		return resultMap;
	}
	
	/**
	 * sms 발송 이력 목록
	 *
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getSmsResultList")
	@ResponseBody
	public Map<String, Object> getSmsResultList(@RequestParam Map<String, Object> paramMap) throws Exception {
		final Map<String, Object> resultMap = messageService.getSmsResultList(paramMap);
		return resultMap;
	}
	
	@RequestMapping("/getSendResultInfo")
	@ResponseBody
	public Map<String, Object> getSendResultInfo(@RequestParam Map<String, Object> paramMap) throws Exception {
		final Map<String, Object> resultMap = messageService.getSendResultInfo(paramMap);
		return resultMap;
	}
	
	
	
	
}

















