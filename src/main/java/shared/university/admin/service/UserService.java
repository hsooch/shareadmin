package shared.university.admin.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;
import shared.university.admin.dao.UserDao;
import shared.university.admin.dao.UserManagementDao;
import shared.university.admin.domain.UserSession;
import shared.university.admin.domain.UserVO;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.CipherUtils;
import shared.university.admin.utils.StringUtil;

/**
 * 회원 정보 조회 및 갱신에 필요한 기능을 제공
 *
 * Created on 2018. 4. 2.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Service
@Slf4j
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserManagementDao userManagementDao;

	/**
	 * 특정 조건의 사용자 개수를 조회한다.
	 *
	 * @param paramMap 조건 파라미터
	 * @return 사용자 개수
	 * @throws Exception java.lang
	 */
	public Integer getUserCount(Map<String, Object> paramMap) throws Exception {
		
		if(!StringUtil.objectIfEmpty(paramMap.get("userPwd"))) {
			String userPwd = StringUtil.nvltoStr(paramMap.get("userPwd"), "");
			String encPwd = CipherUtils.shaEncode(userPwd);
			paramMap.put("userPwd", encPwd);
		}
		
        return userDao.getUserCount(paramMap);
    }

	/**
	 * 사용자 정보와 본인 인증 정보를 저장한다.
	 *
	 * @param paramMap 사용자 정보 및 본인 인증 정보 파라미터
	 * @throws Exception java.lang
	 */
	public void insertUserAccount(Map<String, Object> paramMap) throws Exception{
		
		paramMap.put("siteId", userDao.selectSiteId(paramMap));
		
		String email = StringUtil.nvltoStr(paramMap.get("email1"),"") + "@" + StringUtil.nvltoStr(paramMap.get("email2"),"");
		//String userType = (String)paramMap.get("userType");
		String telNo = StringUtil.nvltoStr(paramMap.get("telNo1"),"") + "-" + StringUtil.nvltoStr(paramMap.get("telNo2"),"") + "-" + StringUtil.nvltoStr(paramMap.get("telNo3"),"");
		String cellNo = StringUtil.nvltoStr(paramMap.get("cellNo1"),"") + "-" + StringUtil.nvltoStr(paramMap.get("cellNo2"),"") + "-" + StringUtil.nvltoStr(paramMap.get("cellNo3"),"");
		
		paramMap.put("userId", email);
		//paramMap.put("userEmail", email);
		//paramMap.put("subEmail", StringUtil.nvltoStr(paramMap.get("subEmail1"),"") + "@" + StringUtil.nvltoStr(paramMap.get("subEmail2"),""));
		/* 테이블에 SUB_EMAIL 컬럼이 삭제 됐고, USER_EMAIL에 subEmail값을 넣기로함. */
		/* 모든 이메일 전송 행위는 subEmail값으로 이루어짐, 기존 email값은 계정아이디로서만 사용 */
		paramMap.put("userEmail", StringUtil.nvltoStr(paramMap.get("subEmail1"),"") + "@" + StringUtil.nvltoStr(paramMap.get("subEmail2"),""));
		
		paramMap.put("telNo", telNo.length() > 10 ? telNo : null);
		paramMap.put("cellNo", cellNo.length() > 11 ? cellNo : null);
		paramMap.put("birthday", StringUtil.nvltoStr(paramMap.get("birthYear"),"") + StringUtil.nvltoStr(paramMap.get("birthMonth"),"") + StringUtil.nvltoStr(paramMap.get("birthDay"),""));
		paramMap.put("userPwd", CipherUtils.shaEncode(StringUtil.nvltoStr(paramMap.get("userPwd"),"") ) );
		paramMap.put("statusCode", Const.USER_STATUS_ACCOUNT);
		
		for(Map.Entry<String, Object> val : paramMap.entrySet()){
            log.info("before paramKey => {}, paramValue => {}", val.getKey(), StringUtil.nvltoStr(val.getValue(), ""));
        }
		
		//회원정보 등록
		userDao.insertUserAccount(paramMap);
		
		//본인인증 정보 등록
		userDao.insertUserSelfAuth(paramMap);
		
		//본인인증 정보 등록
		userManagementDao.updateUserDetail(paramMap);
		
	}

	/**
	 * 사용자 비밀번호 변경
	 *
	 * @param request HttpServletRequest
	 * @param paramMap 비밀번호 변경 파라미터 데이터
	 * @return 결과 코드
	 * @throws Exception java.lang
	 */
	public Map<String, Object> updateUserPwd(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession) request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("modUserSeq", session.getUserSeq());
		
		final String oldUserPwd = CipherUtils.shaEncode(StringUtil.nvltoStr(paramMap.get("oldUserPwd"),"") );
		final String userPwd = CipherUtils.shaEncode(StringUtil.nvltoStr(paramMap.get("userPwd"),"") );
		
		paramMap.put("userId", session.getUserId());
		paramMap.put("oldUserPwd", oldUserPwd ); // parameter에 변경전 비밀번호로 사용자 정보가 있는지 조회
		paramMap.put("userPwd", userPwd);
		
		if(userDao.getUserCount(paramMap) > 0){
			userDao.updateUserPwd(paramMap);
			session.setPwdNeedToChgYn("N");
		}else{
			resultMap.put("resultDetail", AppUtils.createDefaultResultMap(ResultCode.PWD_CHANGE_ERROR)); // 현재 비밀번호와 일치하는 회원 정보가 없을때.
		}
		
		return resultMap;
	}

	/**
	 * 휴면계정 복원 처리
	 *
	 * @param paramMap 휴면 계정 복원에 필요한 파라미터 데이터
	 * @return 처리 결과 코드
	 * @throws Exception java.lang
	 */
	public Map<String, Object> updateUserAccountWakeUp(Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		
		if(!StringUtil.nvltoStr(paramMap.get("userPwd"), "").isEmpty()){
			String userPwd = StringUtil.nvltoStr(paramMap.get("userPwd"), "");
			String encPwd = CipherUtils.shaEncode(userPwd);
			paramMap.put("userPwd", encPwd);
		}
		
		paramMap.put("statusCode", Const.USER_STATUS_ACTIVE);
		
    	userDao.updateUserAccountWakeUp(paramMap); //마지막 로그인날짜 갱신
    	userManagementDao.updateUserDetail(paramMap); //회원상태 변경
    	
    	return resultMap;
    }

	/**
	 * 아이디 찾기에 필요한 사용자 아이디 조회
	 *
	 * @param paramMap 아아디 찾기의 파라미터 데이터
	 * @return 처리 결과 코드
	 */
	public Map<String, Object> selectUserId(Map<String, Object> paramMap) {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		resultMap.put("userId", userDao.selectUserId(paramMap));
		return resultMap;
	}
	
	/**
	 * 회원탈퇴 신청
	 *
	 * @param paramMap 탈퇴 사유, 유저 아이디
	 */
	public void withdrawMember(Map<String, Object> paramMap) {
		userDao.withdrawMember(paramMap);
	}
	

	/**
     * 유저 정보를 조회 한다.
     *
     * @param userSeq 사용자 SEQ
     * @return 사용자 정보
     */
    public Map<String, Object> getUserInfo(Map<String, Object> paramMap) {
        // DB 조회
        final UserVO info = userDao.selectUserInfo(paramMap);

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (info != null) {
            resultMap.put("info", info);
        }

        return resultMap;
    }
	
    /**
     * 유저 정보를 수정한다.
     * 
     * @param paramMap 유저 정보
     */
    public Map<String, Object> updateUserInfo(HttpServletRequest request, Map<String, Object> paramMap) {
    	final UserSession session = (UserSession) request.getAttribute(Const.USER_SESSION_KEY);
		paramMap.put("modUserSeq", session.getUserSeq());
		paramMap.put("siteId", userDao.selectSiteId(paramMap));
    	userDao.updateUserInfo(paramMap);
    	return AppUtils.createDefaultResultMap();
    }
    
    @SuppressWarnings("rawtypes")
    public Map<String, Object> selectUserList(Map<String, Object> paramMap) {
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	List<UMap> userList = userDao.selectUserList(paramMap);
    	resultMap.put("userList", userList);
    	return resultMap;
    }
    
}
