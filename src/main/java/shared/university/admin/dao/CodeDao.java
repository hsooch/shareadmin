package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.common.collect.Maps;

import shared.university.admin.domain.CodeVO;

/**
 * Created on 2018. 4. 10.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Repository
public class CodeDao {

	
	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired    
    public CodeDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    /**
     * 하위 코드 목록을 조회 한다.
     *
     * @param parentCode 조회할 상위 코드
     * @return 코드 목록
     */
    public List<CodeVO> selectCodeList(final String parentCode) {
        final Map<String, Object> params = Maps.newHashMap();
        if (parentCode != null) {
            params.put("parentCode", parentCode);
        }
    	return sqlSession.selectList("codeMapper.selectCodeList", params);
    }

    /**
     * 지역과 대학교 목록을 조회 한다.
     *
     * @param uniRootCode 대학교 목록 최상위 코드
     * @return 코드 목록
     */
    public List<CodeVO> getUniversityList(final String uniRootCode) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("parentCode", uniRootCode);
        return sqlSession.selectList("codeMapper.getUniversityList", params);
    }

    /**
     * 코드 정보 조회
     *
     * @param code 코드 값
     * @return 코드 정보
     */
    public CodeVO getCodeInfo(final String code) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("code", code);
        return sqlSession.selectOne("codeMapper.getCodeInfo", params);
    }
    
    /**
     * 코드 정보 등록 및 갱신
     * 
     * @param paramMap
     */
    public void upsertCodeInfo(Map<String, Object> paramMap) {
        sqlSession.update("codeMapper.upsertCodeInfo", paramMap);
    }
    
    /**
     * 코드명 검색
     * @param paramMap
     * @return 검색한 코드명 목록
     */
    public List<CodeVO> searchCodeName(Map<String, Object> paramMap) {
    	return sqlSession.selectList("codeMapper.searchCodeName", paramMap);
    }
    
    /**
     * 코드 삭제 (숨김)
     * @param paramMap
     */
    public void removeCode(Map<String, Object> paramMap) {
    	sqlSession.update("codeMapper.removeCode", paramMap);
    }
    
    /**
     * code 로 codeName 가져옴
     * 
     * @param paramMap
     * @return
     * @throws Exception
     */
    public String getCodeName(String code) {
    	return sqlSession.selectOne("codeMapper.getCodeName", code);
    }
    
    public void changeCodeIndex(Map<String, Object> paramMap) {
    	sqlSession.update("codeMapper.changeCodeIndex", paramMap);
    }
    
}
