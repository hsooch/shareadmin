package shared.university.admin.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.google.common.collect.Maps;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.AppException;
import shared.university.admin.AppProperties;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.component.SendMailComponent;
import shared.university.admin.component.excel.ExcelComponent;
import shared.university.admin.component.excel.ExcelFeature;
import shared.university.admin.dao.UserDao;
import shared.university.admin.dao.UserManagementDao;
import shared.university.admin.domain.SendMailVO;
import shared.university.admin.domain.UserSession;
import shared.university.admin.domain.UserVO;
import shared.university.admin.feature.BasicUserListExcelFeatrue;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.StringUtil;

/**
 * Created on 2018. 4. 2.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Service
@Slf4j
public class UserManagementService {
	
	@Autowired
	private UserManagementDao userManagementDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ExcelComponent excelComponent;
	
	@Autowired
	private SendMailComponent sendMailComponent;
	
	/**
     * 유저 목록 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	public Map<String, Object> selectUserList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));

		if (paramMap.get("userTypeArr") == null) {
			if (session.getUserType().equals(Const.USER_TYPE_UNIVERSITY)) {
				String[] userTypeArr = {Const.USER_TYPE_UNIVERSITY, Const.USER_TYPE_STUDENT};
				paramMap.put("userTypeArr", userTypeArr);
			} else if (session.getUserType().equals(Const.USER_TYPE_LIFELONG_LEARNING)) {
				String[] userTypeArr = {Const.USER_TYPE_LIFELONG_LEARNING, Const.USER_TYPE_CITIZEN};
				paramMap.put("userTypeArr", userTypeArr);
			}
		}
		
		List<UserVO> userList = userManagementDao.selectUserList(paramMap);
		
		resultMap.put("userList", userList);
		
		return resultMap;
	}
	
	/**
     * 회원 상태 수정
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 대상 회원 정보
     * @return resultMap Map<String, Object> 결과맵
     * @throws Exception java.lang
     */
	public Map<String, Object> updateUserDetail(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		log.info("init updateUserDetail");
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
				for(int i = 0; i < userSeqArr.length; i++){
					paramMap.put("userSeq", userSeqArr[i]);
					userDao.updateUserInfo(paramMap);
					userManagementDao.updateUserDetail(paramMap);
					
					if(!StringUtil.objectIfEmpty(paramMap.get("withdrawRejectReason"))){
						paramMap.put("confirmType", "withdraw");
						sendMailUserReject(paramMap);
					}else if(!StringUtil.objectIfEmpty(paramMap.get("accountRejectReason"))){
						paramMap.put("confirmType", "account");						
						sendMailUserReject(paramMap);
					}
				}
		}else{
			//userSeqList가 없을때
			userDao.updateUserInfo(paramMap);
			userManagementDao.updateUserDetail(paramMap);
			
			if(!StringUtil.objectIfEmpty(paramMap.get("withdrawRejectReason"))){
				paramMap.put("confirmType", "withdraw");
				sendMailUserReject(paramMap);
			}else if(!StringUtil.objectIfEmpty(paramMap.get("accountRejectReason"))){
				paramMap.put("confirmType", "account");						
				sendMailUserReject(paramMap);
			}
			
		}
		return resultMap;
	}
	
	/**
	 *	회원 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	public void userListExcelDown(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UserVO> userList = userManagementDao.selectUserList(paramMap);

		String fileName;
		
		switch((String)paramMap.get("searchPageType")){
			case Const.USER_MANAGEMENT_PAGE_TYPE_BASIC:
				fileName = Const.EXCEL_FILE_NAME_BASIC_USER_LIST;
				break;
			case Const.USER_MANAGEMENT_PAGE_TYPE_ACCOUNT:
				fileName = Const.EXCEL_FILE_NAME_ACCOUNT_USER_LIST;
				break;
			case Const.USER_MANAGEMENT_PAGE_TYPE_WITHDRAW:
				fileName = Const.EXCEL_FILE_NAME_WITHDRAW_USER_LIST;
				break;

			default: fileName = "";
		}
		
		ExcelFeature featrue = new BasicUserListExcelFeatrue();
		
		paramMap.put("excelList", userList);
		paramMap.put("fileName", fileName);
		
		excelComponent.excelDownLoad(response, featrue, paramMap);
	}
	
	/**
	 * 가입 승인 여부 정보를 갱신한다.
	 *
	 * @param paramMap 승인여부 정보 파라미터
	 */
	public void updateUserAccountConfirm(HttpServletRequest request, Map<String, Object> paramMap) throws Exception {
		final UserSession session = (UserSession) request.getAttribute(Const.USER_SESSION_KEY);

		paramMap.put("modUserSeq", session.getUserSeq()); // 수정자(승인자)
		paramMap.put("statusCode", Const.USER_STATUS_ACTIVE); // 정상
		paramMap.put("confirmType", "account");
		
		String userSeq = (String)paramMap.get("userSeq");
		String userSeqList = (String)paramMap.get("userSeqList");
		
		if(StringUtils.isEmpty(userSeq) && StringUtils.isEmpty(userSeqList)){
			log.error("userSeq and userSeqlist is invalid");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
		
		String[] userSeqArr = StringUtil.nvltoStr(paramMap.get("userSeqList"), "").split(",");
		
		if(StringUtils.isNotEmpty(userSeqList)){
			for (String anUserSeqArr : userSeqArr) {
				paramMap.put("userSeq", anUserSeqArr);

				//회원 테이블 CONFM_YN, CONFM_DT 업데이트
				userManagementDao.updateUserAccountConfirm(paramMap);

				//회원 상태 테이블 등록
				userManagementDao.updateUserDetail(paramMap);

				sendMailUserConfirm(paramMap);
			}
		}else{
			//회원 테이블 CONFM_YN, CONFM_DT 업데이트
			userManagementDao.updateUserAccountConfirm(paramMap);
			
			//회원 상태 테이블 등록
			userManagementDao.updateUserDetail(paramMap);
			
			sendMailUserConfirm(paramMap);
		}
	}
	
	/**
	 * 탈퇴 승인 여부 정보를 갱신한다.
	 *
	 * @param paramMap 승인여부 정보 파라미터
	 */
	public void updateUserWithdrawConfirm(HttpServletRequest request, Map<String, Object> paramMap) throws Exception {
		final UserSession session = (UserSession) request.getAttribute(Const.USER_SESSION_KEY);

		paramMap.put("modUserSeq", session.getUserSeq()); // 수정자(승인자)
		paramMap.put("statusCode", Const.USER_STATUS_WITHDRAW); // 탈퇴
		paramMap.put("confirmType", "withdraw");
		
		String userSeq = (String)paramMap.get("userSeq");
		String userSeqList = (String)paramMap.get("userSeqList");
		
		if(StringUtils.isEmpty(userSeq) && StringUtils.isEmpty(userSeqList)){
			log.error("userSeq and userSeqlist is invalid");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
		
		String[] userSeqArr = StringUtil.nvltoStr(paramMap.get("userSeqList"), "").split(",");
		
		if(StringUtils.isNotEmpty(userSeqList)){
			for (String anUserSeqArr : userSeqArr) {
				paramMap.put("userSeq", anUserSeqArr);

				//회원 상태 테이블 등록
				userDao.updateUserInfo(paramMap);
				userManagementDao.updateUserDetail(paramMap);

				sendMailUserConfirm(paramMap);
			}
		}else{
			
			//회원 상태 테이블 등록
			userDao.updateUserInfo(paramMap);
			userManagementDao.updateUserDetail(paramMap);
			
			sendMailUserConfirm(paramMap);
		}
	}
	
	/**
	 * 가입/탈퇴 승인 메일 전송
	 * @param paramMap 수신자 메일, 승인시간
	 * @throws AppException
	 */
	@Async
    private void sendMailUserConfirm(Map<String, Object> paramMap) throws AppException{
		SendMailVO sendMailVO = new SendMailVO();
		final String confirmType = StringUtil.nvltoStr(paramMap.get("confirmType"),"account");
		
		try{
			UserVO userVO = userDao.selectUserInfo(paramMap); //ID(이메일)로 사용자 정보 조회
			
			String email = StringUtil.nvltoStr(userVO.getUserEmail(),"");
			log.info("Request Email => {}", email);
			
			if(email.isEmpty() && email.split("[@]").length < 2){
				log.error("Email Address is Empty");
				throw new AppException(ResultCode.ETC_SERVER_ERROR);
			}
			
			String maskingEmail = email.split("[@]")[0];
			final String emailDomain = email.split("[@]")[1];
			
			//email주소 마스킹처리
			if(maskingEmail.length() > 2){
				int len = maskingEmail.length();
				int maskLen = len-2;
				maskingEmail = maskingEmail.substring(0, 2);
				for (int i = 0; i < maskLen; i++) {
					maskingEmail += '*';
				}
			}
			
	    	sendMailVO.setFromMail(AppProperties.getProperty("mail.username"));
	    	sendMailVO.setToMail(email);
	    	if(confirmType.equals("account")){
	    		sendMailVO.setSubject("[공유대학포탈] 회원가입이 승인 되었습니다.");
	    	}else{
	    		sendMailVO.setSubject("[공유대학포탈] 회원탈퇴가 승인 되었습니다.");
	    	}
	    	
	    	final String tmplContent = StringUtil.getFileContent(AppProperties.getProperty("mail.template.dir.path")+AppProperties.getProperty("mail.template.user.accnt.cnfrm"));
	    	
	    	/* Email Template Key Mapping Start */
	    	Map<String, Object> templateMap = Maps.newHashMap();
	    	String homePageUrl = "";
			if(userVO.getUserType().equals(Const.USER_TYPE_UNIVERSITY) || userVO.getUserType().equals(Const.USER_TYPE_LIFELONG_LEARNING)){
				homePageUrl = AppProperties.getProperty("admin.server.domain"); //대학담당자, 평생교육담당자는 관리자 사이트
			}else if(userVO.getUserType().equals(Const.USER_TYPE_STUDENT) || userVO.getUserType().equals(Const.USER_TYPE_CITIZEN)){
				homePageUrl = AppProperties.getProperty("share.portal.server.domain"); //학생, 시민은 공유대학포털사이트
			}
	    	
	    	
	    	templateMap.put("userId", maskingEmail+"@"+emailDomain); // 마스킹한 이메일주소
	    	templateMap.put("homePageUrl", homePageUrl); // 홈페이지 바로가기 버튼 주소
	    	
	    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일 HH:mm");
	    	Date dt = new Date(); //현재시간
	    	Calendar cal = Calendar.getInstance();
	    	final String confirmTime = sdf.format(dt); //승인시간
	    	
	    	templateMap.put("confirmTime", confirmTime);
	    	

	    	
	    	if(confirmType.equals("account")){
	    		templateMap.put("homeBtnDisplay", "block");
	    		templateMap.put("confirmType", "회원가입");
				templateMap.put("confirmDesc1", "회원가입을 축하 드립니다!<br/>신청하신 회원가입이 승인 되었습니다.");
				templateMap.put("confirmDesc2", "* 가입하신 아이디(이메일)과 비밀번호로 로그인해 주세요.");
				templateMap.put("confirmTimeName", "승인시간");
	    	}else{
	    		templateMap.put("homeBtnDisplay", "none");
	    		templateMap.put("confirmType", "회원탈퇴");
	    		templateMap.put("confirmDesc1", "신청하신 회원탈퇴가 승인 되어 회원탈퇴가 안전하게 완료되었습니다.");
	    		templateMap.put("confirmDesc2", "그 동안 공유대학 포탈서비스를 이용해 주셔서 감사합니다.");
	    		templateMap.put("confirmTimeName", "탈퇴승인시간");
	    	}
	    	
	    	
	    	String mailAuthContent = StringUtil.replaceParam(tmplContent, templateMap);
	    	log.debug("resultContent => {}", mailAuthContent);
	    	
	    	sendMailVO.setContent(mailAuthContent);
	    	/* Key Mapping End */

	    	sendMailComponent.sendMail(sendMailVO); //가입승인 메일 전송
		}catch(Exception e){
			log.error(ResultCode.EMAIL_TRANSMISSION_ERROR.getMsg());
			log.error("The Account Confirm Mail to {} has Error",sendMailVO.getToMail());
		}
    }
	
	/**
	 * 가입/탈퇴 반려 메일 전송
	 * @param paramMap 수신자 메일, 반려사유
	 * @throws AppException
	 */
	@Async
    private void sendMailUserReject(Map<String, Object> paramMap) throws AppException{
		SendMailVO sendMailVO = new SendMailVO();
		final String confirmType = StringUtil.nvltoStr(paramMap.get("confirmType"),"account");
		
		try{
			UserVO userVO = userDao.selectUserInfo(paramMap); //ID(이메일)로 사용자 정보 조회
			
			String email = StringUtil.nvltoStr(userVO.getUserEmail(),"");
			log.info("Request Email => {}", email);
			
			if(email.isEmpty() && email.split("[@]").length < 2){
				log.error("Email Address is Empty");
				throw new AppException(ResultCode.ETC_SERVER_ERROR);
			}
			
	    	sendMailVO.setFromMail(AppProperties.getProperty("mail.username"));
	    	sendMailVO.setToMail(email);
	    	if(confirmType.equals("account")){
	    		sendMailVO.setSubject("[공유대학포탈] 회원가입이 반려 되었습니다.");
	    	}else{
	    		sendMailVO.setSubject("[공유대학포탈] 회원탈퇴가 반려 되었습니다.");
	    	}
	    	
	    	final String tmplContent = StringUtil.getFileContent(AppProperties.getProperty("mail.template.dir.path")+AppProperties.getProperty("mail.template.user.accnt.rjct"));
	    	
	    	/* Email Template Key Mapping Start */
	    	Map<String, Object> templateMap = Maps.newHashMap();
	    	String homePageUrl = "";
	    	
	    	if(userVO.getUserType().equals(Const.USER_TYPE_UNIVERSITY) || userVO.getUserType().equals(Const.USER_TYPE_LIFELONG_LEARNING)){
    			homePageUrl = AppProperties.getProperty("admin.server.domain"); //대학담당자, 평생교육담당자는 관리자 사이트
	    	}else if(userVO.getUserType().equals(Const.USER_TYPE_STUDENT) || userVO.getUserType().equals(Const.USER_TYPE_CITIZEN)){
    			homePageUrl = AppProperties.getProperty("share.portal.server.domain"); //학생, 시민은 공유대학포털사이트
	    	}
	    	
	    	templateMap.put("homePageUrl", homePageUrl); // 홈페이지 바로가기 버튼 주소
	    	
	    	if(confirmType.equals("account")){
	    		templateMap.put("homeBtnDisplay", "block");
	    		templateMap.put("confirmType", "회원가입");
	    		templateMap.put("confirmDesc", "죄송합니다. 신청하신 회원가입가 반려 되었습니다.<br/>반려사유는 다음과 같습니다.");
	    		templateMap.put("rejectReason", StringUtil.nvltoStr(paramMap.get("accountRejectReason"),"").replaceAll("\\n", "<br/>")); // 승인반려 사유
	    	}else{
	    		templateMap.put("homeBtnDisplay", "none");
	    		templateMap.put("confirmType", "회원탈퇴");
	    		templateMap.put("confirmDesc", "죄송합니다. 신청하신 회원탈퇴가 반려 되었습니다.<br/>반려사유는 다음과 같습니다.");
	    		templateMap.put("rejectReason", StringUtil.nvltoStr(paramMap.get("withdrawRejectReason"),"").replaceAll("\\n", "<br/>")); // 승인반려 사유
	    	}
	    	
	    	String mailAuthContent = StringUtil.replaceParam(tmplContent, templateMap);
	    	log.debug("resultContent => {}", mailAuthContent);
	    	
	    	sendMailVO.setContent(mailAuthContent);
	    	/* Key Mapping End */

	    	sendMailComponent.sendMail(sendMailVO); //가입승인 메일 전송
		}catch(Exception e){
			log.error(ResultCode.EMAIL_TRANSMISSION_ERROR.getMsg());
			log.error("The Account Confirm Mail to {} has Error",sendMailVO.getToMail());
		}
    }
}
