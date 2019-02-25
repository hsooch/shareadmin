package shared.university.admin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.AppException;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;
import shared.university.admin.dao.MessageDao;
import shared.university.admin.dao.SemesterDao;
import shared.university.admin.domain.FileInfo;
import shared.university.admin.domain.UserSession;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.StringUtil;

/**
 * 메시지 정보 조회/발송
 * 
 * Created on 2018. 5. 23.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Service
@Slf4j
public class MessageService {
	
	@Autowired
	private MessageDao messageDao;
	
	@Autowired
	private SemesterDao semesterDao;
	
	@Autowired
	private FileService fileService;
	
	/**
     * SMS 발송
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 수신자 목록, 내용, 시간 등
     * @return resultMap Map<String, Object> 결과맵
     * @throws Exception java.lang
     */
	public void sendSms(Map<String, Object> paramMap) throws Exception{
		log.info("init sendSms");
    	messageDao.sendSms(paramMap);
    	if(paramMap.get("seq") != null) {
    		paramMap.put("msgType", 1);
    		semesterDao.saveMsgInfo(paramMap);
    		if(paramMap.get("msgSeq") != null) {
    			semesterDao.saveMsgTarget(paramMap);
    		}
    	}
	}
	
	/**
     * e-mail 발송
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 수신자 목록, 내용, 시간 등
     * @return resultMap Map<String, Object> 결과맵
     * @throws Exception java.lang
     */
	public Map<String, Object> sendEmail(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		log.info("init sendSms");
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("modUserSeq", session.getUserSeq());
		
		String userSeq = (String)paramMap.get("userSeq");
		String userSeqList = (String)paramMap.get("userSeqList");
		
		if(StringUtils.isEmpty(userSeq) && StringUtils.isEmpty(userSeqList)){
			log.error("userSeq and userSeqlist is invalid");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
		
		String[] userSeqArr = StringUtil.nvltoStr(paramMap.get("userSeqList"), "").split(",");
		
		// userSeqList가 있을때
		if(StringUtils.isNotEmpty(userSeqList)){
			
				// userSeqList가 있을때
				/*
				for(int i = 0; i < userSeqArr.length; i++){
					paramMap.put("userSeq", userSeqArr[i]);
					messageDao.updateUserDetail(paramMap);
					
					if(!StringUtil.objectIfEmpty(paramMap.get("withdrawRejectReason"))){
						paramMap.put("confirmType", "withdraw");
						sendMailUserReject(paramMap);
					}else if(!StringUtil.objectIfEmpty(paramMap.get("accountRejectReason"))){
						paramMap.put("confirmType", "account");						
						sendMailUserReject(paramMap);
					}
				}
				*/
		}else{
			//userSeqList가 없을때
			/*
			messageDao.updateUserDetail(paramMap);
			
			if(!StringUtil.objectIfEmpty(paramMap.get("withdrawRejectReason"))){
				paramMap.put("confirmType", "withdraw");
				sendMailUserReject(paramMap);
			}else if(!StringUtil.objectIfEmpty(paramMap.get("accountRejectReason"))){
				paramMap.put("confirmType", "account");						
				sendMailUserReject(paramMap);
			}
			*/
		}
		return resultMap;
	}
	
	/**
     * 메시지 발송 정보 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	public Map<String, Object> getMessageInfo(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		if(session.getUserType().equals(Const.USER_TYPE_UNIVERSITY)){
			String[] userTypeArr = {Const.USER_TYPE_UNIVERSITY, Const.USER_TYPE_STUDENT};
			paramMap.put("userTypeArr", userTypeArr);
		}else if(session.getUserType().equals(Const.USER_TYPE_LIFELONG_LEARNING)){
			String[] userTypeArr = {Const.USER_TYPE_LIFELONG_LEARNING, Const.USER_TYPE_CITIZEN};
			paramMap.put("userTypeArr", userTypeArr);
		}
		
		UMap<String, Object> messageInfo = messageDao.getMessageInfo(paramMap);
		
		resultMap.put("messageInfo", messageInfo);
		
		return resultMap;
	}
	
	/**
     * 메시지 전송 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	public Map<String, Object> getMessageList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		if(session.getUserType().equals(Const.USER_TYPE_UNIVERSITY)){
			String[] userTypeArr = {Const.USER_TYPE_UNIVERSITY, Const.USER_TYPE_STUDENT};
			paramMap.put("userTypeArr", userTypeArr);
		}else if(session.getUserType().equals(Const.USER_TYPE_LIFELONG_LEARNING)){
			String[] userTypeArr = {Const.USER_TYPE_LIFELONG_LEARNING, Const.USER_TYPE_CITIZEN};
			paramMap.put("userTypeArr", userTypeArr);
		}
		
		List<UMap<String, Object>> messageList = messageDao.getMessageList(paramMap);
		
		resultMap.put("messageList", messageList);
		
		return resultMap;
	}
	
	/**
     * 메시지 수신자 목록 조회
     * @param paramMap 검색조건
     * @param request 파라미터 및 세션정보 
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	public Map<String, Object> getMessageTargetList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		if(session.getUserType().equals(Const.USER_TYPE_UNIVERSITY)){
			String[] userTypeArr = {Const.USER_TYPE_UNIVERSITY, Const.USER_TYPE_STUDENT};
			paramMap.put("userTypeArr", userTypeArr);
		}else if(session.getUserType().equals(Const.USER_TYPE_LIFELONG_LEARNING)){
			String[] userTypeArr = {Const.USER_TYPE_LIFELONG_LEARNING, Const.USER_TYPE_CITIZEN};
			paramMap.put("userTypeArr", userTypeArr);
		}
		
		List<UMap<String, Object>> messageTargetList = messageDao.getTargetList(paramMap);
		
		resultMap.put("messageTargetList", messageTargetList);
		
		return resultMap;
	}

	/**
	 * 사진 업로드
	 * 
	 */
	public Map<String, Object> uploadSmsImage(final Map<String, Object> paramMap, final MultipartFile img) throws Exception {
		FileInfo fileInfo = null;
		if (img != null) {
			fileInfo = fileService.saveFile(img);
			paramMap.put("imageFileKey", fileInfo.getFileKey());
		}
//		messageDao.upsertSmsInfo(paramMap);
		return AppUtils.createDefaultResultMap();
	}
	
	public Map<String, Object> getSenderList(final Map<String, Object> paramMap) throws Exception {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		List<UMap<String, Object>> senderList = messageDao.getSenderList(paramMap);
		List<UMap<String, Object>> senderPersonalList = messageDao.getSenderPersonalList(paramMap);
		resultMap.put("senderList", senderList);
		resultMap.put("senderPersonalList", senderPersonalList);
		return resultMap;
	}
	
	public Map<String, Object> getCheckedSenderList(final Map<String, Object> paramMap, final List<String> studentNumber) throws Exception {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		List<UMap<String, Object>> senderList = new ArrayList<>();
		if(studentNumber != null) {
			for(String no: studentNumber) {
				if (no != null) {
					paramMap.put("studentNumber", no);
				}
				UMap<String, Object> sender = messageDao.getCheckedSenderList(paramMap);
				senderList.add(sender);
			}
		}
		resultMap.put("senderList", senderList);
		return resultMap;
	}

	public Map<String, Object> getSmsResultList(Map<String, Object> paramMap) {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		List<UMap<String, Object>> smsResultList = messageDao.getSmsResultList(paramMap);
		resultMap.put("smsResultList", smsResultList);
		return resultMap;
	}
	
	public Map<String, Object> getSendResultInfo(Map<String, Object> paramMap) {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		List<UMap<String, Object>> sendResultInfo = messageDao.getSendResultInfo(paramMap);
		resultMap.put("sendResultInfo", sendResultInfo);
		return resultMap;
	}
	
}



