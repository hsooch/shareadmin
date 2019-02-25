package shared.university.admin.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.domain.MailAuthVO;

/**
 * 이메일 인증 정보 등록 및 갱신
 *
 * Created on 2018. 4. 10.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Repository
public class MailAuthDao {

	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public MailAuthDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    public MailAuthVO selectMailAuthInfo(Map<String, Object> paramMap){
    	return sqlSession.selectOne("mailAuthMapper.selectMailAuthInfo", paramMap);
    }
    
    public void insertMailAuth(Map<String, Object> paramMap){
    	sqlSession.insert("mailAuthMapper.insertMailAuth", paramMap);
    }
    
    public Integer updateMailAuth(Map<String, Object> paramMap){
    	return (Integer)sqlSession.update("mailAuthMapper.updateMailAuth", paramMap);
    }
    
    public String checkMailAuth(Map<String, Object> paramMap){
    	return (String)sqlSession.selectOne("mailAuthMapper.checkMailAuth", paramMap);
    }
        
}
