package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.Const;
import shared.university.admin.domain.UserSession;
import shared.university.admin.domain.UserVO;
import shared.university.admin.utils.AppUtils;

/**
 * Created on 2018. 4. 27.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Repository
public class UserManagementDao {

	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public UserManagementDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    /**
     * 유저 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UserVO> 조회결과  
     */
    public List<UserVO> selectUserList(Map<String, Object> paramMap){
    	return sqlSession.selectList("userManagementMapper.selectUserList", paramMap);
    }
    
    /**
     * 회원 상태 수정
     * @param paramMap Map<String, Object> 대상 회원 정보, 상태, 사유 파라미터
     * @throws Exception java.lang
     */
	public void updateUserDetail(Map<String, Object> paramMap){
		sqlSession.update("userManagementMapper.updateUserDetail", paramMap);
	}
	
    /**
     * 사용자 회원 가입 승인
     *
     * @param paramMap 사용자 정보 파라미터
     */
    public void updateUserAccountConfirm(Map<String, Object> paramMap) {
        sqlSession.update("userManagementMapper.updateUserAccountConfirm", paramMap);
    }
	
}
