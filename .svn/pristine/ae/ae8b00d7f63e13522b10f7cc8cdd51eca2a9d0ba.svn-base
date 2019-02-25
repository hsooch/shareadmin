package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.UMap;
import shared.university.admin.domain.SubjectVO;

/**
 * Created on 2018. 5. 9.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Repository
public class SubjectDao {

	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public SubjectDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }
    
    /**
     * 학기 과목 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UserVO> 조회결과  
     */
    public List<UMap<String, Object>> getSubjectList(Map<String, Object> paramMap){
    	return sqlSession.selectList("subjectMapper.getSubjectList", paramMap);
    }
    
    public List<UMap<String, Object>> getSubjectListForExcel(Map<String, Object> paramMap){
    	return sqlSession.selectList("subjectMapper.getSubjectListForExcel", paramMap);
    }
    
    /**
     * 학기 과목 정보 저장
     * @param paramMap Map<String, Object> 과목 정보
     * @throws Exception java.lang
     */
	public void upsertSubjectInfo(Map<String, Object> paramMap){
		sqlSession.update("subjectMapper.upsertSubjectInfo", paramMap);
	}
	
	/**
     * 학기 정보 조회(중복확인 겸용)
     * @param paramMap 과목 요일 및 시간 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public void upsertSubjectTimeInfo(Map<String, Object> paramMap) {
    	sqlSession.update("subjectMapper.upsertSubjectTimeInfo", paramMap);
    }
	
	/**
     * 학기 정보 조회(중복확인 겸용)
     * @param paramMap 과목 요일 및 시간 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public UMap<String, Object> getSubjectInfo(Map<String, Object> paramMap) {
    	return sqlSession.selectOne("subjectMapper.getSubjectInfo", paramMap);
    }
    
    /**
     * 학기 과목 정보 삭제
     * @param paramMap Map<String, Object> 과목 정보
     * @throws Exception java.lang
     */
	public void deleteSubjectInfo(Map<String, Object> paramMap){
		sqlSession.update("subjectMapper.deleteSubjectInfo", paramMap);
	}
	
	/**
     * 학기 과목 요일 및 시간 정보 삭제
     * @param paramMap Map<String, Object> 과목 요일 및 시간 정보
     * @throws Exception java.lang
     */
	public void deleteSubjectTimeInfo(Map<String, Object> paramMap){
		sqlSession.update("subjectMapper.deleteSubjectTimeInfo", paramMap);
	}
}
