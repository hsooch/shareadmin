package shared.university.admin.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.domain.LoginVO;
import shared.university.admin.domain.UserVO;

/**
 * Created on 2018. 4. 9.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Repository
public class LoginDao {

	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public LoginDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }
    
    public UserVO selectLoginUserInfo(LoginVO loginVO) throws Exception{
    	return (UserVO) sqlSession.selectOne("loginMapper.selectLoginUserInfo", loginVO);
    }
    
    public void updateLoginErrorCnt(LoginVO loginVO) throws Exception{
    	sqlSession.update("loginMapper.updateLoginErrorCnt", loginVO);
    }

    public void updateLoginSuccess(LoginVO loginVO) throws Exception{
    	sqlSession.update("loginMapper.updateLoginSuccess", loginVO);
    }
}
