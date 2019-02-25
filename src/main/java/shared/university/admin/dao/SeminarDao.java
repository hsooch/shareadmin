package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.UMap;

/**
 * 세미나 등록 및 조회에 필요한 데이터 엑세스 오브젝트
 *
 * Created on 2018. 5. 15.
 *
 * @author 스퀘어네트(황수찬)
 * @since JDK1.7
 */
@Repository
public class SeminarDao {
	
	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public SeminarDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }
    
    /**
     * 강좌 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UMap> 조회결과  
     */
    @SuppressWarnings("rawtypes")
    public List<UMap> getSeminarList(Map<String, Object> paramMap){
    	return sqlSession.selectList("seminarMapper.selectSeminarList", paramMap);
    }
    
    /**
     * 세미나 정보를 조회 한다.
     *
     * @param seminarSeq 세미나 시퀀스
     * @return 저장된 세미나 정보
     */
    public UMap<String, Object> getSeminarInfo(Map<String, Object> paramMap) {
        return sqlSession.selectOne("seminarMapper.getSeminarInfo", paramMap);
    }
    
    /**
     * 세미나 정보에서 등록된 섬네일 파일을 제거 한다.
     *
     * @param seminarSeq 세미나 시퀀스
     * @return 저장된 세미나 정보
     */
    public int removeThumbnail(Map<String, Object> paramMap) {
        return sqlSession.update("seminarMapper.removeThumbnail", paramMap);
    }
    
    /**
     * 세미나 파일 조회
     * @param paramMap 학기 접수기간/안내문 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    @SuppressWarnings("rawtypes")
	public List<UMap> getSeminarFileKeyList(Integer seminarSeq) {
    	return sqlSession.selectList("seminarMapper.getSeminarFileKeyList", seminarSeq);
    }
    
    /**
     * 세미나 첨부파일 삭제
     * @param paramMap Map<String, Object> 세미나 정보
     * @throws Exception java.lang
     */
	public void deleteSeminarFile(Map<String, Object> paramMap){
		sqlSession.delete("seminarMapper.deleteSeminarFile", paramMap);
	}
	
	/**
     * 세미나 정보 저장
     * @param paramMap Map<String, Object> 세미나 정보		
     * @throws Exception java.lang
     */
	public void upsertSeminarInfo(Map<String, Object> paramMap){
		sqlSession.update("seminarMapper.upsertSeminarInfo", paramMap);
	}
	
	/**
	 * 세미나 첨부파일 저장
	 */
	public void saveSeminarFiles(Map<String, Object> paramMap) {
		sqlSession.update("seminarMapper.saveSeminarFiles", paramMap);
	}
	
	/**
	 * 세미나 정보 삭제
	 * 
	 */
	public void deleteSeminarInfo(Map<String, Object> paramMap){
		sqlSession.delete("seminarMapper.deleteSeminarInfo", paramMap);
	}

	@SuppressWarnings("rawtypes")
	public List<UMap> getApplyUserList(Map<String, Object> paramMap) {
		return sqlSession.selectList("seminarMapper.selectApplyUserList", paramMap);
	}

	public void changeApplyStatus(Map<String, Object> params) {
		sqlSession.update("seminarMapper.updateApplyStatus", params);
	}
	
	public List<UMap<String, Object>> getAttendUserList(Map<String, Object> params) {
		return sqlSession.selectList("seminarMapper.selectAttendUserList", params);
	}
	
	/**
     * 세미나 출첵
     * @param paramMap Map<String, Object> 세미나 정보		
     * @throws Exception java.lang
     */
	public void checkAttend(Map<String, Object> paramMap){
		sqlSession.update("seminarMapper.checkAttend", paramMap);
	}
	
	public void unCheckAttend(Map<String, Object> paramMap) {
		sqlSession.update("seminarMapper.unCheckAttend", paramMap);
	}
	
	public void removeCert(Map<String, Object> paramMap) {
		sqlSession.update("seminarMapper.removeCert", paramMap);
	}
	
    
}
