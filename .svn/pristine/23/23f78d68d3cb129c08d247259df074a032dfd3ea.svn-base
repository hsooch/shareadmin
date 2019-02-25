package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.UMap;

/**
 * 학점 교류 수강 결과 등록 및 조회에 필요한 데이터 엑세스 오브젝트
 *
 * Created on 2018. 6. 7.
 *
 * @author 스퀘어네트(진태희)
 * @since JDK1.7
 */
@Repository
public class ExchangeResultDao {


	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public ExchangeResultDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }
	
	/**
     * 수강결과 등록 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UMap> 조회결과  
     */
	@SuppressWarnings("rawtypes")
	public List<UMap> getExchangeResultList(Map<String, Object> paramMap){
		return sqlSession.selectList("exchangeResultMapper.getExchangeResultList", paramMap);
	}
	
	/**
     * 수강결과 정보 조회
     * @param paramMap 수강결과 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public UMap<String, Object> getExchangeResultInfo(Map<String, Object> paramMap) {
    	return sqlSession.selectOne("exchangeResultMapper.getExchangeResultInfo", paramMap);
    }
    
    /**
     * 업로드 수강결과 정합성 체크
     * @param paramMap Map<String, Object> 엑셀 업로드 수강결과 정보
     * @throws Exception java.lang
     */
	public UMap<String, Object> checkUploadExchangeResultData(Map<String, Object> paramMap){
		return sqlSession.selectOne("exchangeResultMapper.checkUploadExchangeResultData", paramMap);
	}
    
    /**
     * 수강결과 정보 초기화
     * @param paramMap Map<String, Object> 수강결과 초기화를 위한 정보
     * @throws Exception java.lang
     */
	public int initExchangeResultList(Map<String, Object> paramMap){
		return sqlSession.update("exchangeResultMapper.initExchangeResultList", paramMap);
	}
    
    /**
     * 수강결과 정보 저장
     * @param paramMap Map<String, Object> 수강결과 정보
     * @throws Exception java.lang
     */
	public int upsertExchangeResultInfo(Map<String, Object> paramMap){
		return sqlSession.update("exchangeResultMapper.upsertExchangeResultInfo", paramMap);
	}
    
    /**
     * 성적 정보 저장
     * @param paramMap Map<String, Object> 성적 정보
     * @throws Exception java.lang
     */
	public int saveScore(Map<String, Object> paramMap){
		return sqlSession.update("exchangeResultMapper.saveScore", paramMap);
	}
    
    /**
     * 성적 정보 일괄 업로드 저장
     * @param paramMap Map<String, Object> 성적 정보
     * @throws Exception java.lang
     */
	public int upsertScore(Map<String, Object> paramMap){
		return sqlSession.update("exchangeResultMapper.upsertScore", paramMap);
	}
	
	/**
     * 성적 등급 정보가 포함된 결과 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UMap> 조회결과  
     */
	@SuppressWarnings("rawtypes")
	public List<UMap> getResultScoreList(Map<String, Object> paramMap){
		return sqlSession.selectList("exchangeResultMapper.getResultScoreList", paramMap);
	}
	
	/**
     * 성적 등급 전환 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UMap> 조회결과  
     */
	@SuppressWarnings("rawtypes")
	public List<UMap> getGradeTranceList(Map<String, Object> paramMap){
		return sqlSession.selectList("exchangeResultMapper.getGradeTranceList", paramMap);
	}
	
	/**
     * 선택한 대학의 성적 등급 전환 정보 전체 삭제
     * @param paramMap Map<String, Object> 삭제조건
     * @return List<UMap> 조회결과  
     */
	public void deleteGradeTraceAll(Map<String, Object> paramMap){
		sqlSession.delete("exchangeResultMapper.deleteGradeTraceAll", paramMap);
	}
	
	/**
     * 선택한 대학의 성적 등급 전환 정보 등록
     * @param paramMap Map<String, Object> 삭제조건
     * @return List<UMap> 조회결과  
     */
	public int insertGradeTranceInfo(Map<String, Object> paramMap){
		return sqlSession.insert("exchangeResultMapper.insertGradeTranceInfo", paramMap);
	}
	
	/**
	 * 학생별 이력조회(OUT) 목록
	 * @param paramMap Map<String, Object> 검색조건
     * @return List<UMap> 조회결과  
	 */
	@SuppressWarnings("rawtypes")
	public List<UMap> getStudentOutList(Map<String, Object> paramMap) {
		return sqlSession.selectList("exchangeResultMapper.getStudentOutList", paramMap);
	}
	
	/**
	 * 학생별 이력조회(IN) 목록
	 * @param paramMap Map<String, Object> 검색조건
	 * @return List<UMap> 조회결과  
	 */
	@SuppressWarnings("rawtypes")
	public List<UMap> getStudentInList(Map<String, Object> paramMap) {
		return sqlSession.selectList("exchangeResultMapper.getStudentInList", paramMap);
	}
	
}
