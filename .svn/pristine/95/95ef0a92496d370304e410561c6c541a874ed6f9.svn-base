package shared.university.admin.component.schedule;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.AppException;
import shared.university.admin.AppProperties;
import shared.university.admin.Const;
import shared.university.admin.UMap;
import shared.university.admin.component.SendMailComponent;
import shared.university.admin.dao.MessageDao;
import shared.university.admin.dao.ScheduleDao;
import shared.university.admin.dao.UserDao;
import shared.university.admin.dao.UserManagementDao;
import shared.university.admin.domain.SendMailVO;
import shared.university.admin.domain.UserVO;
import shared.university.admin.utils.StringUtil;

/**
 * Schedule Component
 *
 * Created on 2018. 3. 23.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */

@Component
@Slf4j
public class ScheduleComponent {

	@Autowired
	private SendMailComponent sendMailComponent;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserManagementDao userManagementDao;
	
	@Autowired
	private MessageDao messageDao;
	
	@Autowired
	private ScheduleDao scheduleDao;
	
	private final SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
	private final SimpleDateFormat formatter2 = new SimpleDateFormat("yyyyMMddHHmm");
	private final String wasNumber = StringUtils.defaultIfEmpty(System.getProperty("was.number"), "00");
	
	private String scheduleId = formatter.format(Calendar.getInstance().getTime()) +
											wasNumber +
										(UUID.randomUUID().toString().replace("-", ""));
	/**
	 * 전체 스케쥴러 아이디 삭제. 매일 00시 01분 00초에 실행
	 */
	@Scheduled(cron="0 1 0 * * *")// 0초 1분 0시 매일 매월 매년
	//@Scheduled(cron="0 * * * * *") //테스트용 설정
	public void deleteScheduleId(){
		log.info("=============================================================================["+wasNumber+"]");
		log.info("=========================== deleteScheduleId START ==========================["+wasNumber+"]");
		log.info("=============================================================================["+wasNumber+"]");
		//기존 스케쥴러 아이디들을 삭제.
		scheduleDao.deleteSchedule();
		log.info("=============================================================================["+wasNumber+"]");
		log.info("=========================== deleteScheduleId END ============================["+wasNumber+"]");
		log.info("=============================================================================["+wasNumber+"]");
	}
	
	/**
	 * 스케쥴러 컨테이너 선정. 매일 00시 02분 00초에 실행
	 */
	@Scheduled(cron="0 2 0 * * *")// 0초 2분 0시 매일 매월 매년
	//@Scheduled(cron="1 * * * * *") //테스트용 설정
	public void resetScheduleId(){
		log.info("=============================================================================["+wasNumber+"]");
		log.info("=========================== resetScheduleId START ===========================["+wasNumber+"]");
		log.info("=============================================================================["+wasNumber+"]");
		this.scheduleId = formatter.format(Calendar.getInstance().getTime()) +
				wasNumber +
			(UUID.randomUUID().toString().replace("-", ""));
		//컨테이너의 스케쥴러 아이디 등록.
		scheduleDao.insertSchedule(scheduleId);
		log.info("=============================================================================["+wasNumber+"]");
		log.info("============================ resetScheduleId END ============================["+wasNumber+"]");
		log.info("=============================================================================["+wasNumber+"]");
	}
	
	/**
	 * 휴면계정 찾기 및 휴면계정처리. 매일 06시 00분 00초에 실행.
	 */
	@Scheduled(cron="0 0 6 * * *") // 0초 0분 6시 매일 매월 매년
	//@Scheduled(cron="2/1 * * * * *") //테스트용 설정
	public void inactiveAccountSchedule() {
		log.info("=============================================================================["+wasNumber+"]");
		log.info("========================= inactiveAccountSchedule START =========================["+wasNumber+"]");
		log.info("=============================================================================["+wasNumber+"]");
		
		try{
			
			//스케쥴러 아이디 조회.
			final String aftScheduleId = scheduleDao.getScheduleId();
			
			log.debug("This Container's scheduleId => {}", scheduleId);
			log.debug("Schedule Container's scheduleId => {}", aftScheduleId);
			//조회한 스케쥴러 아이디가 컨테이너의 스케쥴러 아이디와 같으면 진행 
			if(aftScheduleId != null){
				if(aftScheduleId.equals(scheduleId)){
					//휴면계정 기준 날짜 세팅.
					Calendar cal = Calendar.getInstance();
					cal.add(Calendar.DATE, 15);
					Date dt1 = cal.getTime(); //15일 후
					
					cal.add(Calendar.DATE, 15);
					Date dt2 = cal.getTime(); //30일 후
					
					cal.add(Calendar.DATE, 60);
					Date dt3 = cal.getTime(); //90일 후
					
					final String[] inactiveDt = {formatter.format(dt1), formatter.format(dt2), formatter.format(dt3)};
					final int[] inactiveDay = {15, 30, 90}; // 15일, 30일, 90일
					
					log.debug("inactiveDt's => {}, {}, {}", formatter.format(dt1), formatter.format(dt2), formatter.format(dt3));
					
					Map<String, Object> uParam = Maps.newHashMap();
					uParam.put("sort", "");
					uParam.put("isPaging", "N");
					uParam.put("searchUserStatus", Const.USER_STATUS_ACTIVE);
					
					//잔여일수 순서대로 사용자목록 조회 및 메일 발송.
					for(int i=0; i<inactiveDt.length; i++){
						uParam.put("inactiveDay", inactiveDay[i]);// 휴면전환 잔여일수 세팅
						List<UserVO> userList = userManagementDao.selectUserList(uParam);
						
						List<Map<String, Object>> sendMailUserList = Lists.newArrayList();
						for(UserVO vo : userList){
							Map<String, Object> sendMailUserInfo = Maps.newHashMap();
							sendMailUserInfo.put("userSeq", vo.getUserSeq());
							sendMailUserInfo.put("userId", vo.getUserId());
							sendMailUserInfo.put("userEmail", vo.getUserEmail());
							sendMailUserInfo.put("inactiveDay", ""+inactiveDay[i]);
							sendMailUserInfo.put("inactiveDt", ""+inactiveDt[i]);
							sendMailUserInfo.put("userType", vo.getUserType());
							sendMailUserList.add(sendMailUserInfo);
						}
						sendMailInactiveAccount(sendMailUserList);
					}
					
					
					//휴면계정 처리.
					uParam.put("inactiveDay", Const.INACTIVE_DAY); //365일
					List<UserVO> inactiveUserList = userManagementDao.selectUserList(uParam);
					for(UserVO iauVO : inactiveUserList){
						Map<String, Object> iauParam = Maps.newHashMap(); // 휴면계정 전환 파라미터.
						iauParam.put("statusCode", Const.USER_STATUS_INACTIVE);
						iauParam.put("userSeq", iauVO.getUserSeq());
						iauParam.put("modUserSeq", 1);
						
						userDao.updateUserInfo(iauParam);
						userManagementDao.updateUserDetail(iauParam); // 휴면상태로 전환
					}
				}
			}
		}catch(Exception e){
			log.error("schedulerId is => {}", scheduleId);
			log.error("inactiveAccountSchedule Error => {}", e.getMessage());
			e.printStackTrace();
		}
		
		log.info("=============================================================================["+wasNumber+"]");
		log.info("========================== inactiveAccountSchedule END ==========================["+wasNumber+"]");
		log.info("=============================================================================["+wasNumber+"]");
	}
	
	/**
	 * 예약발송 이메일 조회 및 발송. 매일 매시 0분부터 5분마다 실행.
	 */
	@Scheduled(cron="0 0/5 * * * *") //0초 0분부터 5분마다 0시 매일 매월 매년
	//@Scheduled(cron="2/1 * * * * *") //테스트용 설정
	public void emailSchedule() {
		log.info("=============================================================================["+wasNumber+"]");
		log.info("========================= emailSchedule START =========================["+wasNumber+"]");
		log.info("=============================================================================["+wasNumber+"]");
		
		try{
			
			//스케쥴러 아이디 조회.
			final String aftScheduleId = scheduleDao.getScheduleId();
			
			log.debug("This Container's scheduleId => {}", scheduleId);
			log.debug("Schedule Container's scheduleId => {}", aftScheduleId);
			//조회한 스케쥴러 아이디가 컨테이너의 스케쥴러 아이디와 같으면 진행
			if(aftScheduleId != null){
				if(aftScheduleId.equals(scheduleId)){
					Map<String, Object> paramMap = Maps.newHashMap();
					paramMap.put("sort", "SEND_DT");
					paramMap.put("order", Const.ORDER_TYPE_ASCENDING);
					paramMap.put("isPaging", "N");
					paramMap.put("searchMsgType", 2);
					paramMap.put("searchSendType", 'N');
					paramMap.put("searchSelectType", 'N');
					
					Calendar cal = Calendar.getInstance();
					Date dt = cal.getTime();
					paramMap.put("searchEndDt", formatter2.format(dt));
					
					//잔여일수 순서대로 사용자목록 조회 및 메일 발송.
					List<UMap<String, Object>> emailScheduleList = messageDao.getMessageList(paramMap);
						
					sendMailSchedule(emailScheduleList);
				}
			}
		}catch(Exception e){
			log.error("schedulerId is => {}", scheduleId);
			log.error("emailSchedule Error => {}", e.getMessage());
			e.printStackTrace();
		}
		
		log.info("=============================================================================["+wasNumber+"]");
		log.info("========================== emailSchedule END ==========================["+wasNumber+"]");
		log.info("=============================================================================["+wasNumber+"]");
	}
	
	
	/**
	 * 휴면계정 전환 공지 메일 전송
	 * @param paramMap 수신자 메일, 수신자ID, 예정일, 잔여일 
	 * @throws AppException
	 */
    private void sendMailInactiveAccount(List<Map<String, Object>> sendMailUserList) throws Exception{
		
    	List<SendMailVO> sendMailList = Lists.newArrayList();
    	
    	for(Map<String, Object> sendMailUserInfo : sendMailUserList){
    		SendMailVO sendMailVO = new SendMailVO();
			
			String email = StringUtil.nvltoStr(sendMailUserInfo.get("userEmail"),""); //수신자 메일주소
			String userId = StringUtil.nvltoStr(sendMailUserInfo.get("userId"),""); //사용자 계정ID(이메일주소형식)
			log.info("Request Email => {}", email);
			
			if(email.isEmpty() && email.split("[@]").length < 2){
				log.error("Email Address is Empty");
				return;
			}
			
			String maskingEmail = userId.split("[@]")[0];
			final String emailDomain = userId.split("[@]")[1];
			
			//email주소 마스킹처리
			if(maskingEmail.length() > 2){
				int len = maskingEmail.length();
				int maskLen = len-2;
				maskingEmail = maskingEmail.substring(0, 2);
				for (int i = 0; i < maskLen; i++) {
					maskingEmail += '*';
				}
			}
			
			//휴면전환 예정일
			String inactiveDt = StringUtil.nvltoStr(sendMailUserInfo.get("inactiveDt"),"");
			inactiveDt = inactiveDt.substring(0, 4) + "년 "
					+ inactiveDt.substring(4, 6) + "월 "
					+ inactiveDt.substring(6) + "일";
			
	    	sendMailVO.setFromMail(AppProperties.getProperty("mail.username")); //발신자 메일 주소
	    	sendMailVO.setToMail(email); //수신자 메일주소
    		sendMailVO.setSubject("[공유대학플랫폼] 회원님의 아이디가 휴면 상태로 전환될 예정입니다."); //메일 제목
	    	
	    	
	    	/* Email Template Key Mapping Start */
	    	Map<String, Object> templateMap = Maps.newHashMap();

	    	templateMap.put("userId", maskingEmail+"@"+emailDomain); // 마스킹한 사용자 계정ID(이메일주소형식)
	    	templateMap.put("inactiveDay", sendMailUserInfo.get("inactiveDay")); // 휴면계정 전환 잔여일.
	    	templateMap.put("inactiveDt", inactiveDt); // 휴면계정 전환 예정일.

	    	String homePageUrl = "";

	    	if(sendMailUserInfo.get("userType").equals(Const.USER_TYPE_UNIVERSITY) || sendMailUserInfo.get("userType").equals(Const.USER_TYPE_LIFELONG_LEARNING)){
    			homePageUrl = AppProperties.getProperty("admin.server.domain"); //대학담당자, 평생교육담당자는 관리자 사이트
	    	}else if(sendMailUserInfo.get("userType").equals(Const.USER_TYPE_STUDENT) || sendMailUserInfo.get("userType").equals(Const.USER_TYPE_CITIZEN)){
    			homePageUrl = AppProperties.getProperty("share.portal.server.domain"); //학생, 시민은 공유대학포털사이트
	    	}
	    	
	    	templateMap.put("homePageUrl", homePageUrl); // 홈페이지 바로가기 버튼 주소
    		templateMap.put("homeBtnDisplay", "block");
	    	
    		final String tmplContent = StringUtil.getFileContent(AppProperties.getProperty("mail.template.dir.path")+AppProperties.getProperty("mail.template.inactive.accnt"));
	    	final String mailContnet = StringUtil.replaceParam(tmplContent, templateMap);
	    	log.debug("resultContent => {}", mailContnet);
	    	
	    	sendMailVO.setContent(mailContnet);
	    	/* Key Mapping End */
			
			sendMailList.add(sendMailVO);
		}
    	
    	sendMailComponent.sendMailList(sendMailList); //휴면계정 전환 안내 메일 발송
    }
	
	/**
	 * 메일발송관리 예약발송
	 * @param paramMap 수신자 메일, 수신자ID, 예정일, 잔여일 
	 * @throws AppException
	 */
    // 즉시발송에서도 사용하기 위해서 public
    public void sendMailSchedule(List<UMap<String, Object>> emailScheduleList) throws Exception{
		
		for(UMap<String, Object> emailScheduleInfo : emailScheduleList){
			Map<String, Object> msgMap = Maps.newHashMap();
			msgMap.put("selectYn","Y");
			msgMap.put("messageSeq", emailScheduleInfo.get("messageSeq"));
			msgMap.put("msgType", emailScheduleInfo.get("msgType"));
			messageDao.upsertMessage(msgMap); //메일 발송중으로 상태변경.
			
			List<SendMailVO> sendMailList = Lists.newArrayList(); //메일전송목록.
			
			emailScheduleInfo.put("isPaging", "N");
			List<UMap<String, Object>> targetList = messageDao.getTargetList(emailScheduleInfo); // 수신자목록 조회
			
			for(UMap<String, Object> targetInfo : targetList){
				
				String email = StringUtil.nvltoStr(targetInfo.get("userEmail"),""); //수신자 메일주소
				log.info("Request Email => {}", email);
				
				if(email.isEmpty() && email.split("[@]").length < 2){
					log.error("Email Address is Empty (userSeq =>{})", targetInfo.get("userSeq"));
					continue;
				}
				
				SendMailVO sendMailVO = new SendMailVO();
		    	sendMailVO.setFromMail(AppProperties.getProperty("mail.username")); //발신자 메일 주소
		    	sendMailVO.setToMail(email); //수신자 메일주소
	    		sendMailVO.setSubject(StringUtil.nvltoStr(emailScheduleInfo.get("title"), "")); //메일 제목
		    	sendMailVO.setContent(StringUtil.nvltoStr(emailScheduleInfo.get("contents"), "")); //메일 내용
		    	sendMailList.add(sendMailVO);
		    	sendMailComponent.sendMailList(sendMailList); //예약발송 메일 전송
			}
			
			msgMap.put("sendYn","Y");
			messageDao.upsertMessage(msgMap); //메일발송 완료로 상태변경
		}
		
    }
}
