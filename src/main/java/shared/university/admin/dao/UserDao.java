package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.UMap;
import shared.university.admin.domain.UserVO;

/**
 * Created on 2018. 4. 4.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Repository
public class UserDao {

    @Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public UserDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    /**
     * 특정 조건의 사용자 개수를 조회한다.
     *
     * @param paramMap 조건 파라미터
     * @return 사용자 개수
     */
    public Integer getUserCount(Map<String, Object> paramMap) {
        return (Integer)sqlSession.selectOne("userMapper.getUserCount", paramMap);
    }

    /**
     * 대학별 미니포탈 사이트 ID 조회
     *
     * @param paramMap 사용자 정보 및 본인 인증 정보 파라미터
     * @return 사이트 ID String
     */
    public String selectSiteId(Map<String, Object> paramMap) {
        return (String)sqlSession.selectOne("userMapper.selectSiteId", paramMap);
    }

    /**
     * 사용자 정보를 저장한다.
     *
     * @param paramMap 사용자 정보 파라미터
     */
    public void insertUserAccount(Map<String, Object> paramMap) {
        sqlSession.update("userMapper.insertUserAccount", paramMap);
    }

    /**
     * 사용자 본인인증 정보를 저장한다.
     *
     * @param paramMap 사용자 본인인증 정보 파라미터
     */
    public void insertUserSelfAuth(Map<String, Object> paramMap) {
        sqlSession.update("userMapper.insertUserSelfAuth", paramMap);
    }

    /**
     * 사용자 계정 비밀번호 변경
     *
     * @param paramMap 사용자 정보 파라미터
     */
    public void updateUserPwd(Map<String, Object> paramMap) {
        sqlSession.update("userMapper.updateUserPwd", paramMap);
    }

    /**
     * 사용자 계정 임시 비밀번호 패스워드 발급
     *
     * @param paramMap 사용자 정보 파라미터
     */
    public void updateUserPwdTmpr(Map<String, Object> paramMap) {
        sqlSession.update("userMapper.updateUserPwdTmpr", paramMap);
    }

    /**
     * 휴면계정 복구
     *
     * @param paramMap 사용자 정보 파라미터
     */
    public void updateUserAccountWakeUp(Map<String, Object> paramMap) {
        sqlSession.update("userMapper.updateUserAccountWakeUp", paramMap);
    }

    /**
     * 사용자 상세정보 조회
     *
     * @param paramMap 사용자 정보 파라미터
     * @return 사용자 정보 UserVO
     */
    public UserVO selectUserInfo(Map<String, Object> paramMap){
        return (UserVO)sqlSession.selectOne("userMapper.selectUserInfo", paramMap);
    }

    /**
     * 사용자 계정ID 조회 - 아이디 찾기 및 휴면계정복구 알림용
     *
     * @param paramMap 사용자 정보 파라미터
     * @return 사용자 계정ID String
     */
    public String selectUserId(Map<String, Object> paramMap){
        return (String)sqlSession.selectOne("userMapper.selectUserId", paramMap);
    }

    /**
     * 사용자 계정 비밀번호 확인
     *
     * @param paramMap 사용자 정보 파라미터
     * @return 비밀번호 일치여부 boolean
     */
    public boolean chkPwd(Map<String, Object> paramMap) {
        int count = sqlSession.selectOne("userMapper.chkPwd", paramMap);

        return count == 1;
    }

    /**
     * 사용자 계정 탈퇴 신청
     *
     * @param paramMap 사용자 정보 파라미터
     */
    public void withdrawMember(Map<String, Object> paramMap) {
        sqlSession.update("userMapper.withdrawMember", paramMap);
    }

    /**
     * 유저 정보를 수정한다.
     *
     * @param paramMap 유저 정보
     */
    public void updateUserInfo(Map<String, Object> paramMap) {
        sqlSession.update("userMapper.updateUserInfo", paramMap);
    }
    
    @SuppressWarnings("rawtypes")
    public List<UMap> selectUserList(Map<String, Object> paramMap) {
    	return sqlSession.selectList("userMapper.selectUserList", paramMap);
    }

}
