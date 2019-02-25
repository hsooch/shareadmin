package shared.university.admin.service;

import com.google.common.collect.Maps;
import com.google.common.io.BaseEncoding;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import shared.university.admin.AppException;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.dao.LoginDao;
import shared.university.admin.domain.LoginVO;
import shared.university.admin.domain.UserSession;
import shared.university.admin.domain.UserVO;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.CipherUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.util.Map;

/**
 * 사용자 처리 관련 페이지 및 기능을 제공
 *
 * Created on 2018. 4. 9.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */

@Slf4j
@Service
public class LoginService {
	
	@Autowired
	private LoginDao loginDao;
	
	@Autowired
    private JedisConnectionFactory jedisConnectionFactory;
	
	 /**
     * 로그인 처리 
     * @param request HttpServletRequest
     * @param loginVO 아이디, 패스워드 정보
     * @return 로그인 처리 결과 데이터
     * @throws Exception java.lang
     */
    public Map<String, Object> processLogin(HttpServletRequest request, LoginVO loginVO) throws Exception {
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();

        /* 로그인 시 처리 사항
         * 1. 아이피 확인(개별 확인 및 대역확인)
         * 2. 로그 생성 (was 로그)
         */

        log.debug("getRemoteAddr==" + request.getRemoteAddr());
        log.debug("getRemoteHost==" + request.getRemoteHost());
        log.debug("WL-Proxy-Client-IP==" + request.getHeader("WL-Proxy-Client-IP"));
        log.debug("Proxy-Client-IP==" + request.getHeader("Proxy-Client-IP"));
        log.debug("X-Forwarded-For==" + request.getHeader("X-Forwarded-For"));

        String ipAddress = request.getHeader("X-FORWARDED-FOR");
        if (ipAddress  == null) {
            ipAddress = request.getRemoteAddr();
        }
        
        resultMap.put("ipAddress",  ipAddress);


        // 1. 아이디 / 비밀번호 검사

        if (StringUtils.isNotEmpty(loginVO.getUserPwd())) {
            String userPwd = loginVO.getUserPwd();
            String encPwd = CipherUtils.shaEncode(userPwd);
            loginVO.setEncPwd(encPwd);
        }

        loginVO.setPwdChangeDay(Const.PWD_CHANGE_DAY);
        loginVO.setPwdErrorPermitedCnt(Const.PWD_ERROR_PERMIT_CNT);
        loginVO.setInactiveDay(Const.INACTIVE_DAY);
        
        UserVO userVO = loginDao.selectLoginUserInfo(loginVO);

        // ID가 존재하지 않음
        if( userVO == null) {
        	// 아이디 또는 비밀번호 오류
        	throw new AppException(ResultCode.LOGIN_ID_PWD_DISCORD); 
        	//return AppUtils.createDefaultResultMap(ResultCode.LOGIN_ID_PWD_DISCORD); 
        }
        log.debug("userVO  :: {}", userVO.toString());

        //강제탈퇴 혹은 탈퇴한 사용자
        if( Const.USER_STATUS_WITHDRAW.equals(userVO.getUserStatusCd()) || Const.USER_STATUS_FORCED_WITHDRAW.equals(userVO.getUserStatusCd()) ){
        	// 아이디 또는 비밀번호 오류와 동일한 에러코드 사용
        	throw new AppException(ResultCode.LOGIN_ID_PWD_DISCORD);
        	//return AppUtils.createDefaultResultMap(ResultCode.LOGIN_ID_PWD_DISCORD); 
        }

        // 승인되지 않은 사용자
        if( "N".equals(userVO.getConfmYn())){
        	throw new AppException(ResultCode.LOGIN_ID_PWD_NOT_APPROVED);
        	//return AppUtils.createDefaultResultMap(ResultCode.LOGIN_ID_PWD_NOT_APPROVED);
        }
                        
        // 로그인 lock이 걸렸는지 검사
        if( "Y".equals(userVO.getErrLockYn())) {
        	// 비밀번호를 입력오류 제한횟수 달성. 
        	throw new AppException(ResultCode.LOGIN_PWD_ERROR_PERMIT_OVER);
        	//return AppUtils.createDefaultResultMap(ResultCode.LOGIN_PWD_ERROR_PERMIT_OVER); 
        }
        if( "Y".equals(userVO.getLockYn()) ) {
        	// 휴면 계정
        	throw new AppException(ResultCode.LOGIN_INACTIVE_ACCOUNT);
        	//return AppUtils.createDefaultResultMap(ResultCode.LOGIN_INACTIVE_ACCOUNT); 
        }
        
        // 비밀번호가 틀림
        if( "N".equals(userVO.getSuccessYn()) ) { 
        	 // 휴면 계정
            loginDao.updateLoginErrorCnt(loginVO);
            throw new AppException(ResultCode.LOGIN_ID_PWD_DISCORD);
            //return AppUtils.createDefaultResultMap(ResultCode.LOGIN_ID_PWD_DISCORD);
        }
        
        // 관리자가 아닐 경우
        if( !userVO.getUserType().equals(Const.USER_TYPE_TOTAL_ADMIN) &&
    		!userVO.getUserType().equals(Const.USER_TYPE_UNIVERSITY) &&
    		!userVO.getUserType().equals(Const.USER_TYPE_LIFELONG_LEARNING)
        ){
        	//관리자 사이트 접근권한이 없음.
        	log.debug(ResultCode.LOGIN_ACCOUNT_DOSE_NOT_HAVE_ACCESS.getMsg());
        	throw new AppException(ResultCode.LOGIN_ACCOUNT_DOSE_NOT_HAVE_ACCESS);
        	//return AppUtils.createDefaultResultMap(ResultCode.LOGIN_ACCOUNT_DOSE_NOT_HAVE_ACCESS); 
        	
        }
        
       	loginDao.updateLoginSuccess(loginVO);

        UserSession userSession = new UserSession();
        
        userSession.setUserSeq(userVO.getUserSeq());		//사용자 시퀀스
        userSession.setUserType(userVO.getUserType());		//사용자 타입
        userSession.setUserTypeName(userVO.getUserTypeName());		//사용자 타입
        userSession.setUserId(userVO.getUserId());			// 사용자 계정
        userSession.setUserName(userVO.getUserName());		// 사용자 명
        userSession.setMfType(userVO.getMfType());			// 사용자 성별
        userSession.setMfTypeName(userVO.getMfTypeDesc());
        userSession.setUnivAreaCd(userVO.getUnivAreaCd());  // 대학 지역 코드
        userSession.setUnivCode(userVO.getUnivCode());			// 대학코드
        userSession.setUnivName(userVO.getUnivName());		// 대학명
        userSession.setDepartment(userVO.getDepartment());		// 대학 부서(학과)명
        userSession.setBirthday(userVO.getBirthday());		// 생년월일
        userSession.setTelNo(userVO.getTelNo());			// 전화번호
        userSession.setCellNo(userVO.getCellNo());			// 휴대폰 번호
        userSession.setServiceGroupSeq(userVO.getServiceGroupSeq());// 서비스그룹시퀀스
        userSession.setIpAddr(ipAddress);			        // 로그인한 IP주소
        userSession.setPwdNeedToChgYn(userVO.getPwdNeedToChgYn());	// 비밀번호 변경 필요 여부
        userSession.setStudentNumber(userVO.getStudentNumber());
        userSession.setUserEmail(userVO.getUserEmail());

        log.debug("userSession => {}", userSession);
        //resultMap.put("sessionInfo", userSession);
        

        byte[] serializedUserSession;
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            try (ObjectOutputStream oos = new ObjectOutputStream(baos)) {
                oos.writeObject(userSession);
                // serializedMember -> 직렬화된 member 객체
                serializedUserSession = baos.toByteArray();
            }
        }
        
        log.debug("serializedUserSession =>{}",serializedUserSession);
        log.debug("serializedUserSession =>{}",serializedUserSession.toString());
        // 바이트 배열로 생성된 직렬화 데이터를 AES256로 암호화
        final String encKey = userSession.getUserId();
        final String encUserSession = CipherUtils.aesEncode(encKey, BaseEncoding.base64().encode(serializedUserSession));
        
        try (Jedis jedis = jedisConnectionFactory.getConnection().getNativeConnection()) {

            final String USessionId = MDC.get(Const.MDC_LOG_KEY);
            final Map<String, String> dataMap = Maps.newHashMap();
            dataMap.put(Const.USER_SESSION_KEY, encUserSession);
            dataMap.put(Const.ENC_SESSION_KEY, encKey);

            resultMap.put(Const.USESSIONID_KEY, USessionId);


            jedis.hmset(USessionId, dataMap);
            jedis.expire(USessionId, Const.COOKIE_TIMEOUT_SECOND);

            return resultMap;
        }
    }
    
}