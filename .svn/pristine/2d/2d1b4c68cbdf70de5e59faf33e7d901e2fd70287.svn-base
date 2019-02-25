package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.UMap;
import shared.university.admin.domain.SemesterVO;

/**
 * Created on 2018. 5. 9.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Repository
public class SemesterDao {

	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public SemesterDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }
    
    /**
     * 학기 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<SemesterVO> 조회결과  
     */
    public List<SemesterVO> getSemesterList(Map<String, Object> paramMap){
    	return sqlSession.selectList("semesterMapper.getSemesterList", paramMap);
    }
    
    /**
     * 학기 정보 저장
     * @param paramMap Map<String, Object> 학기 정보
     * @throws Exception java.lang
     */
	public void upsertSemesterInfo(Map<String, Object> paramMap){
		sqlSession.update("semesterMapper.upsertSemesterInfo", paramMap);
	}
	
	/**
     * 학기 정보 조회(중복확인 겸용)
     * @param paramMap 학기 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public SemesterVO getSemesterInfo(Map<String, Object> paramMap) {
    	return sqlSession.selectOne("semesterMapper.getSemesterInfo", paramMap);
    }
    
    /**
     * 학기 정보 삭제
     * @param paramMap Map<String, Object> 학기 정보
     * @throws Exception java.lang
     */
	public void deleteSemesterInfo(Map<String, Object> paramMap){
		sqlSession.update("semesterMapper.deleteSemesterInfo", paramMap);
	}
	
	/**
     * 학기 접수기간/안내문 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UMap> 조회결과  
     */
	@SuppressWarnings("rawtypes")
	public List<UMap> getSemesterListWithGuide(Map<String, Object> paramMap){
		return sqlSession.selectList("semesterMapper.getSemesterListWithGuide", paramMap);
	}
	
	/**
     * 학기 접수기간/안내문 정보 조회
     * @param paramMap 학기 접수기간/안내문 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public UMap<String, Object> getGuideInfo(Map<String, Object> paramMap) {
    	return sqlSession.selectOne("semesterMapper.getGuideInfo", paramMap);
    }
    
    /**
     * 학기 접수기간/안내문 정보 조회
     * @param paramMap 학기 접수기간/안내문 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    @SuppressWarnings("rawtypes")
	public List<UMap> getGudieFileKeyList(Map<String, Object> paramMap) {
    	return sqlSession.selectList("semesterMapper.getGudieFileKeyList", paramMap);
    }
    
    /**
     * 학기 접수기간/안내문 첨부파일 정보 조회
     * @param paramMap 학기 접수기간/안내문 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public UMap<String, Object> getGuideFileInfo(Map<String, Object> paramMap) {
    	return sqlSession.selectOne("semesterMapper.getGuideFileInfo", paramMap);
    }
    
    /**
     * 학기 접수기간/안내문 정보 저장
     * @param paramMap Map<String, Object> 학기 접수기간/안내문 정보
     * @throws Exception java.lang
     */
	public void upsertGuideInfo(Map<String, Object> paramMap){
		sqlSession.update("semesterMapper.upsertGuideInfo", paramMap);
	}
	
	/**
     * 학기 접수기간/안내문 삭제
     * @param paramMap Map<String, Object> 학기 접수기간/안내문 정보
     * @throws Exception java.lang
     */
	public void deleteGuideInfo(Map<String, Object> paramMap){
		sqlSession.delete("semesterMapper.deleteGuideInfo", paramMap);
	}
	
	/**
     * 학기 접수기간/안내문 첨부파일 삭제
     * @param paramMap Map<String, Object> 학기 접수기간/안내문 정보
     * @throws Exception java.lang
     */
	public void deleteGuideFile(Map<String, Object> paramMap){
		sqlSession.delete("semesterMapper.deleteGuideFile", paramMap);
	}
	
	/**
     * 승인 안내문 정보 조회
     * @param paramMap 승인 안내문 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public UMap<String, Object> getAcceptGuideInfo(Map<String, Object> paramMap) {
    	return sqlSession.selectOne("semesterMapper.getAcceptGuideInfo", paramMap);
    }
    
    /**
     * 승인 안내문 정보 저장
     * @param paramMap Map<String, Object> 승인 안내문 정보
     * @throws Exception java.lang
     */
	public void updateAcceptGuideInfo(Map<String, Object> paramMap){
		sqlSession.update("semesterMapper.updateAcceptGuideInfo", paramMap);
	}
	
	/**
     * 승인 안내문 삭제
     * @param paramMap Map<String, Object> 승인 안내문 정보
     * @throws Exception java.lang
     */
	public void deleteAcceptGuideInfo(Map<String, Object> paramMap){
		sqlSession.delete("semesterMapper.deleteAcceptGuideInfo", paramMap);
	}
	
	/**
	 * 승인 안내문 메일 & 문자 발송
	 */
	public void sendAcceptGuide(Map<String, Object> paramMap) {
		sqlSession.insert("semesterMapper.sendAcceptGuide", paramMap);
	}
	
	/**
	 * 메시지 테이블에 저장
	 * 
	 * @param paramMap
	 * @return
	 */
	public void saveMsgInfo(Map<String, Object> paramMap) {
		sqlSession.insert("semesterMapper.saveMsgInfo", paramMap);
	}
	
	/**
	 * 메시지 타겟 테이블에 저장
	 * 
	 * @param paramMap
	 * @return
	 */
	public void saveMsgTarget(Map<String, Object> paramMap) {
		sqlSession.insert("semesterMapper.saveMsgTarget", paramMap);
	}
	
	public void saveApplyMsgSeq(Map<String, Object> paramMap) {
		sqlSession.insert("semesterMapper.updateApplyMsgSeq", paramMap);
	}
	
	@SuppressWarnings("rawtypes")
	public List<UMap> getSubjectInfo(Map<String, Object> paramMap) {
		return sqlSession.selectList("semesterMapper.getSubjectInfo", paramMap);
	}
}
