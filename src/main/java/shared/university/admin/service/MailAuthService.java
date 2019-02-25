package shared.university.admin.service;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.AppException;
import shared.university.admin.AppProperties;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;
import shared.university.admin.component.SendMailComponent;
import shared.university.admin.dao.FileDao;
import shared.university.admin.dao.MailAuthDao;
import shared.university.admin.dao.SemesterDao;
import shared.university.admin.dao.UserDao;
import shared.university.admin.domain.FileInfo;
import shared.university.admin.domain.MailAuthVO;
import shared.university.admin.domain.SendMailVO;
import shared.university.admin.domain.UserVO;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.CipherUtils;
import shared.university.admin.utils.StringUtil;

/**
 * Created on 2018. 4. 11.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Service
@Slf4j
public class MailAuthService {
	
	@Autowired
    private SendMailComponent sendMailComponent;
	
	@Autowired
	private MailAuthDao mailAuthDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private SemesterDao semesterDao;
	
	@Autowired
	private FileDao fileDao;
	
	/**
	 * 인증요청 메일 전송
	 * @param paramMap
	 * @return resultMap
	 * @throws AppException
	 */
	public Map<String, Object> sendMailAuth(Map<String, Object> paramMap) throws AppException{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final String email1 = StringUtil.nvltoStr(paramMap.get("email1"), "");
		final String email2 = StringUtil.nvltoStr(paramMap.get("email2"), "");
		final String email = email1+"@"+email2;
		
		log.info("Request Email => {}", email);
		
		if(email1.isEmpty() || email2.isEmpty()){
			log.error("Email Address is Empty");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
		
		paramMap.put("email", email); //email주소 세팅

		//인증 요청 시간(encode key) 및 유효시간 생성
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMddHHmm");
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		
		Date dt1 = new Date(); //현재시간
		
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MINUTE, 30);
		Date dt2 = cal.getTime(); //현재시간+30분
		
		final String reqTime = sdf1.format(dt1); //encode key
		final String fromDt = sdf2.format(dt1); //요청시간
		final String toDt = sdf2.format(dt2); //유효시간
		
		paramMap.put("toDt", toDt);
		
		//메일 인증키 생성
		final String uuid = reqTime + (UUID.randomUUID().toString().replace("-", "")); 
		//final String uuid = Generators.timeBasedGenerator(EthernetAddress.fromInterface()).generate().toString().replaceAll("-","");
		paramMap.put("uuid", uuid);
		
		mailAuthDao.insertMailAuth(paramMap);
		
		try{
			SendMailVO sendMailVO = new SendMailVO();
	    	
	    	sendMailVO.setFromMail(AppProperties.getProperty("mail.username"));
	    	sendMailVO.setToMail(email);
	    	sendMailVO.setSubject("[공유대학포탈] 이메일 인증 안내");
	    	
	    	final String tmplContent = StringUtil.getFileContent(AppProperties.getProperty("mail.template.dir.path")+AppProperties.getProperty("mail.template.mail.auth"));
	    	
	    	/* Email Template Key Mapping Start */
	    	Map<String, Object> templateMap = Maps.newHashMap();
	    	String bfrParam = "uuid="+uuid+"&email="+email+"&toDt="+toDt;
	    	
	    	// 파라미터 base64로 인코딩
	    	String encTxt = CipherUtils.aesEncode(reqTime, bfrParam);
	    	encTxt = URLEncoder.encode(encTxt, Const.DEFAULT_CHAR_SET_STR);
	    	
	    	String encParam = "?encParam="+encTxt+"&reqTime="+reqTime;
	    	String mailAuthApi = AppProperties.getProperty("admin.server.domain")+Const.API_MAIL_AUTH_RES+encParam;
	    	
	    	templateMap.put("toDt", toDt);
	    	templateMap.put("mailAuthApi", mailAuthApi);
	    	
	    	log.debug(mailAuthApi);
	    	
	    	String mailAuthContent = StringUtil.replaceParam(tmplContent, templateMap);
	    	log.debug("resultContent => {}", mailAuthContent);
	    	
	    	sendMailVO.setContent(mailAuthContent);
	    	/* Key Mapping End */

	    	sendMailComponent.sendMail(sendMailVO); //인증요청 메일 전송
	    	
	    	resultMap.put("reqTime", reqTime);
	    	resultMap.put("fromDt", fromDt);
	    	resultMap.put("toDt", toDt);
	    	resultMap.put("encParam", encTxt);
		}catch(Exception e){
			throw new AppException(ResultCode.EMAIL_TRANSMISSION_ERROR);
		}
		
		return resultMap;
	}
	
	/**
	 * 메일인증 응답처리
	 * @param paramMap
	 * @return resultMap
	 * @throws AppException
	 */
	public Map<String, Object> confirmMailAuth(Map<String, Object> paramMap) throws AppException{
		String reqTime = StringUtil.nvltoStr(paramMap.get("reqTime"), ""); //encode key
		String encParam = StringUtil.nvltoStr(paramMap.get("encParam"), "");
		
    	if(!encParam.isEmpty()){
    		String[] params = null;
    		String[] tempParam = null;
    		Map<String, Object> decParamMap = Maps.newHashMap();
    		try{
	    		String decParam = new String(CipherUtils.aesDecode(reqTime, encParam));
	    		params = decParam.split("&");
	    		for(int i=0;i<params.length;i++){
	    			tempParam = params[i].split("=");
	    			if(tempParam.length > 1){
	    				decParamMap.put(tempParam[0], tempParam[1]);
	    			}else{
	    				decParamMap.put(tempParam[0], "");
	    			}
	    		}
    		}catch(Exception e){
    			e.printStackTrace();
    			return AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_SERVER_ERROR);
    		}
    		
    		decParamMap.put("confmYn","N");
	    	String chkRsltCd = mailAuthDao.checkMailAuth(decParamMap);
	    	
	    	if(chkRsltCd != null){
	    		switch(chkRsltCd){
	    		case "01": //인증 성공한 레코드
	    			return AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_ALREADY);
	    		case "02": //인증 하기 전
	    			break;
	    		case "03": //인증 유효기간 지남
	    			return AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_TIMEOVER);
    			default:
    				return AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_FAIL);
	    		}
	    	}else{
	    		//인증 레코드가 없음.
	    		return AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_FAIL);
	    	}
	    	
	    	decParamMap.put("confmYn","Y");
    		Integer confmCount = mailAuthDao.updateMailAuth(decParamMap);
    		if(confmCount == 0){
    			//인증 레코드가 없음.
    			return AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_FAIL);
    		}
    		
    	}else{
    		log.error("Encoding Parameter is Empty");
    		return AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_SERVER_ERROR);
    	}
		return AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_SUCCESS);
	}
	
	/**
	 * 메일인증 확인
	 * @param paramMap
	 * @return resultMap
	 * @throws AppException
	 */
	public Map<String, Object> checkMailAuth(Map<String, Object> paramMap) throws AppException{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		String reqTime = StringUtil.nvltoStr(paramMap.get("reqTime"), ""); //encode key
		String encParam = StringUtil.nvltoStr(paramMap.get("encParam"), "");
		
    	if(!encParam.isEmpty()){
    		String[] params = null;
    		String[] tempParam = null;
    		Map<String, Object> decParamMap = Maps.newHashMap();
    		try{
    			encParam = URLDecoder.decode(encParam,Const.DEFAULT_CHAR_SET_STR);
	    		String decParam = new String(CipherUtils.aesDecode(reqTime, encParam));
	    		params = decParam.split("&");
	    		for(int i=0;i<params.length;i++){
	    			tempParam = params[i].split("=");
	    			if(tempParam.length > 1){
	    				decParamMap.put(tempParam[0], tempParam[1]);
	    			}else{
	    				decParamMap.put(tempParam[0], "");
	    			}
	    		}
    		}catch(Exception e){
    			e.printStackTrace();
    			resultMap.put("detailResult", AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_SERVER_ERROR));
    		}
    		
	    	String chkRsltCd = mailAuthDao.checkMailAuth(decParamMap);
	    	
	    	if(chkRsltCd != null){
	    		switch(chkRsltCd){
	    		case "01": //인증 성공한 레코드
	    			resultMap.put("detailResult", AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_SUCCESS));
	    		case "02": //인증 하기 전
	    			break;
	    		case "03": //인증 유효기간 지남
	    			resultMap.put("detailResult", AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_TIMEOVER));
				default:
					resultMap.put("detailResult", AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_FAIL));
	    		}
	    	}else{
	    		//인증 레코드가 없음.
	    		resultMap.put("detailResult", AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_FAIL));
	    	}
    	}else{
    		log.error("Encoding Parameter is Empty");
    		resultMap.put("detailResult", AppUtils.createDefaultResultMap(ResultCode.EMAIL_AUTH_SERVER_ERROR));
    	}
    	
		return resultMap;
	}
	
    public MailAuthVO selectMailAuthInfo(Map<String, Object> paramMap){
    	return mailAuthDao.selectMailAuthInfo(paramMap);
    }
    
    public Map<String, Object> sendMailUserPwdTmpr(Map<String, Object> paramMap) throws AppException{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final String email1 = StringUtil.nvltoStr(paramMap.get("email1"), "");
		final String email2 = StringUtil.nvltoStr(paramMap.get("email2"), "");
		final String email = email1+"@"+email2;
		
		log.info("Request Email => {}", email);
		
		if(email1.isEmpty() || email2.isEmpty()){
			log.error("Email Address is Empty");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
		
		paramMap.put("email", email); //email주소 세팅
		paramMap.put("userId", email); //id 세팅

		try{
			//메일 인증키 생성
			final String tempPwd = StringUtil.getRandomString(10);	// 임시비밀번호
			final String encTempPwd = CipherUtils.shaEncode(tempPwd); // 임시비밀번호 암호화
			
			UserVO userVO = userDao.selectUserInfo(paramMap); //ID(이메일)로 사용자 정보 조회
			
			//임시 비밀번호 저장
			paramMap.put("userSeq", userVO.getUserSeq());
			paramMap.put("modUserSeq", userVO.getUserSeq());
			paramMap.put("userPwdTmpr", encTempPwd);
			userDao.updateUserPwdTmpr(paramMap);
			
			SendMailVO sendMailVO = new SendMailVO();
	    	
	    	sendMailVO.setFromMail(AppProperties.getProperty("mail.username"));
	    	sendMailVO.setToMail(email);
	    	sendMailVO.setSubject("[공유대학포탈] 임시비밀번호가 도착했습니다.");
	    	
	    	final String tmplContent = StringUtil.getFileContent(AppProperties.getProperty("mail.template.dir.path")+AppProperties.getProperty("mail.template.user.pwd.tmpr"));
	    	
	    	/* Email Template Key Mapping Start */
	    	Map<String, Object> templateMap = Maps.newHashMap();
	    	String homePageUrl = "";
	    	if(userVO.getUserType().equals(Const.USER_TYPE_UNIVERSITY) || userVO.getUserType().equals(Const.USER_TYPE_LIFELONG_LEARNING)){
    			homePageUrl = AppProperties.getProperty("admin.server.domain");
    			templateMap.put("homeBtnDisplay", "none");
	    	}else if(userVO.getUserType().equals(Const.USER_TYPE_STUDENT) || userVO.getUserType().equals(Const.USER_TYPE_CITIZEN)){
    			homePageUrl = AppProperties.getProperty("share.portal.server.domain");
    			templateMap.put("homeBtnDisplay", "block");
	    	}
	    	
	    	templateMap.put("homePageUrl", homePageUrl);
	    	templateMap.put("userPwdTmpr", tempPwd);
	    	
	    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일 HH:mm");
			Date dt = new Date(); //현재시간
			Calendar cal = Calendar.getInstance();
			final String createTime = sdf.format(dt); //임시비밀번호 발급시간
			
			templateMap.put("createTime", createTime);
	    	
	    	String mailAuthContent = StringUtil.replaceParam(tmplContent, templateMap);
	    	log.debug("resultContent => {}", mailAuthContent);
	    	
	    	sendMailVO.setContent(mailAuthContent);
	    	/* Key Mapping End */

	    	sendMailComponent.sendMail(sendMailVO); //인증요청 메일 전송
		}catch(Exception e){
			e.printStackTrace();
			throw new AppException(ResultCode.EMAIL_TRANSMISSION_ERROR);
		}
		
		return resultMap;
    }
    
    /**
     * 승인 안내문 메일/알림 발송
     */
    @SuppressWarnings("rawtypes")
    public Map<String, Object> sendAcceptGuide(Map<String, Object> paramMap) throws Exception {
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		try{
			SendMailVO sendMailVO = new SendMailVO();
	    	sendMailVO.setFromMail(AppProperties.getProperty("mail.username"));
	    	sendMailVO.setToMail(paramMap.get("email").toString());
	    	sendMailVO.setSubject("[공유대학포탈] 학점교류신청 결과 안내");
	    	final String tmplContent = StringUtil.getFileContent(AppProperties.getProperty("mail.template.dir.path")+AppProperties.getProperty("mail.template.accept.exchange"));
	    	List<UMap> subjects = semesterDao.getSubjectInfo(paramMap);	// 과목정보
	    	UMap guideInfo = semesterDao.getAcceptGuideInfo(paramMap);	// 승인안내문 내용
	    	// 첨부파일 조회 start
			List<UMap> fileKeyList = getGudieFileKeyList(paramMap);
			List<FileInfo> fileList = Lists.newArrayList();
			for(UMap fileKey : fileKeyList) {
				fileList.add(fileDao.getFileInfo(fileKey.getString("fileKey")));
			}
			String fileListHtml = "";
			for(FileInfo file : fileList) {
				fileListHtml += "<li><a href=" + file.downloadUrl+ ">" + file.oriFileName + "</a></li>";
			}
			// 첨부파일 조회 end
			// 과목정보 템플릿 생성
	    	String html = "";
	    	for(UMap info : subjects) {
	    		html += "<h2 style=\"display: bloclk; padding-top: 15px; font-size: 16px; color: #454545; font-weight: bold; text-align: left;\">";
		    	html += "과목 명: <span style=\"color: #2c8bec;\">" + info.get("subjectName") + "</span>";
				html += "</h2>";
				html += "<table style=\"width: 100%; border-width: 2px 0 0 0; border-style: solid; border-color: #333333;\">";
				html += "<colgroup>";
				html += "<col style=\"width: 100px;\">";
				html += "<col style=\"width: 30%;\">";
				html += "<col style=\"width: 100px;\">";
				html += "<col style=\"width: 30%;\">";
				html += "</colgroup>";
				html += "<tbody style=\"text-align: left; font-size: 14px; line-height: 30px; margin: 20px 0; font-weight: bold; color: #454545;\">";
				html += "<tr>";
				html += "<th style=\"border-bottom: 1px solid #d1d1d1; padding: 7px 20px; background-color: #e2eaf4;\">이수구분</th>";
				html += "<td style=\"border-bottom: 1px solid #d1d1d1; padding: 7px 20px;\">" + info.get("completeType") + "</span></td>";
				html += "<th style=\"border-bottom: 1px solid #d1d1d1; padding: 7px 20px; background-color: #e2eaf4;\">학점</th>";
				html += "<td style=\"border-bottom: 1px solid #d1d1d1; padding: 7px 20px;\">" + info.get("subjectPoint") + "</span></td>";
				html += "</tr><tr>";
				html += "<th style=\"border-bottom: 1px solid #d1d1d1; padding: 7px 20px; background-color: #e2eaf4;\">학과</th>";
				html += "<td style=\"border-bottom: 1px solid #d1d1d1; padding: 7px 20px;\">" + info.get("userDepartment") + "</span></td>";
				html += "<th style=\"border-bottom: 1px solid #d1d1d1; padding: 7px 20px; background-color: #e2eaf4;\">대표교수</th>";
				html += "<td style=\"border-bottom: 1px solid #d1d1d1; padding: 7px 20px;\">" + info.get("teacherName") + "</span></td>";
				html += "</tr><tr>";
				html += "<th style=\"border-bottom: 1px solid #d1d1d1; padding: 7px 20px; background-color: #e2eaf4;\">요일 및 시간</th>";
				html += "<td colspan=\"3\" style=\"border-bottom: 1px solid #d1d1d1; padding: 7px 20px;\">";
				html += info.get("subjectTimeInfo") + "</span>";
				html += "</td></tr></tbody></table>";
	    	}
	    	Map<String, Object> templateMap = Maps.newHashMap();
	    	DateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd");
	    	Date date = new Date();
	    	templateMap.put("regDt", dateFormat.format(date));
	    	templateMap.put("userUnivCodeName", paramMap.get("userUnivCodeName"));
	    	templateMap.put("userName", paramMap.get("userName"));
	    	templateMap.put("mInStNum", paramMap.get("mInStNum"));
	    	templateMap.put("html", html);
	    	templateMap.put("guideTitle", guideInfo.get("acceptGuideMailTitle"));
	    	templateMap.put("guideContents", guideInfo.get("acceptGuideMailContents"));
	    	templateMap.put("fileListHtml", fileListHtml);
	    	String mailAuthContent = StringUtil.replaceParam(tmplContent, templateMap);
	    	log.debug("resultContent => {}", mailAuthContent);
	    	sendMailVO.setContent(mailAuthContent);
	    	sendMailComponent.sendMail(sendMailVO);
	    	paramMap.put("msgType", 1);
	    	paramMap.put("title", guideInfo.get("acceptGuideMailTitle"));
	    	paramMap.put("content", guideInfo.get("acceptGuideMailContents"));
	    	semesterDao.saveMsgInfo(paramMap);
		}catch(Exception e){
			e.printStackTrace();
			throw new AppException(ResultCode.EMAIL_TRANSMISSION_ERROR);
		}
		
    	return resultMap;
    }
    
    /**
     * 학기 접수기간/안내문 첨부파일 정보 조회
     * @param semetserSeq 학기 시퀀스
     * @return fileKeyList 첨부파일 파일 키 목록
     */
    @SuppressWarnings("rawtypes")
    private List<UMap> getGudieFileKeyList(Map<String, Object> paramMap) throws Exception{
    	List<UMap> fileKeyList = semesterDao.getGudieFileKeyList(paramMap);
    	return fileKeyList;
    }
    
    /*
    public Map<String, Object> insertMailAuth(Map<String, Object> paramMap){
    	sqlSession.insert("mailAuthMapper.insertMailAuth", paramMap);
    }
    
    public void updateMailAuth(Map<String, Object> paramMap){
    	sqlSession.update("mailAuthMapper.updateMailAuth", paramMap);
    }
    */
}
