package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.domain.TermsVO;

/**
 * 약관 정보 데이터 CRUD
 *
 * Created on 2018. 4. 2.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Repository
public class TermsDao {

	@Resource(name="sqlSession")
	private final SqlSessionTemplate sqlSession;

    @Autowired
    public TermsDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    /**
     * 약관 정보 조회
     *
     * @param paramMap 검색 조건 파라미터
     * @return 약관 목록
     */
    public List<TermsVO> selectTermsList(Map<String, Object> paramMap){
        return sqlSession.selectList("termsMapper.selectTermsList", paramMap);
    }
}
