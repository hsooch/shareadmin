package shared.university.admin.dao;

import com.google.common.collect.Maps;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import shared.university.admin.UMap;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 학점 교류와 희망과목 등록 및 조회에 필요한 데이터 엑세스 오브젝트
 *
 * Created on 2018. 6. 1.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Repository
public class ExchangeDao {


	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public ExchangeDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    /**
     * 희망과목 등록 대학교 목록 조회
     *
     * @param userSeq 조회 대상자 시퀀스
     * @return 희망과목 대학교 목록
     */
    public List<UMap<String, Object>> getHopeUnivList(final Integer userSeq) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("userSeq", userSeq);
        return sqlSession.selectList("exchangeMapper.getHopeUnivList", params);

    }

    /**
     * 희망과목 등록 대학교의 학기 목록 조회
     *
     * @param userSeq 조회 대상자 시퀀스
     * @param univCode 조회 대상 학교 코드
     * @return 학기 목록
     */
    public List<UMap<String, Object>> getHopeSemesterList(final Integer userSeq, final String univCode) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("userSeq", userSeq);
        params.put("univCode", univCode);
        return sqlSession.selectList("exchangeMapper.getHopeSemesterList", params);
    }

    /**
     * 희망과목으로 등록한 과목 개수 정보 조회
     *
     * @param userSeq 조회 대상자 시퀀스
     * @return 등록한 개수 정보
     */
    public UMap<String, Object> getHopeRegCntInfo(final Integer userSeq) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("userSeq", userSeq);
        return sqlSession.selectOne("exchangeMapper.getHopeRegCntInfo", params);
    }

    /**
     * 희망과목 목록 조회
     *
     * @param params 검색 조건 파라미터
     * @return 희망과목 목록
     */
    public List<UMap<String, Object>> getHopeSubjectList(final Map<String, Object> params) {
        return sqlSession.selectList("exchangeMapper.getHopeSubjectList", params);
    }

    /**
     * 선택한 희망과목 삭제
     *
     * @param params 삭제 조건 파라미터
     */
    public void deleteHopeSubject(final Map<String, Object> params) {
        sqlSession.delete("exchangeMapper.deleteHopeSubject", params);
    }
    
    /**
     * 학점 교류 과목 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UserVO> 조회결과  
     */
    public List<UMap<String, Object>> getExSubjectList(Map<String, Object> paramMap){
    	return sqlSession.selectList("exchangeMapper.getExSubjectList", paramMap);
    }

    /**
     * 희망과목 저장
     * @param paramsMap 희망과목 정보
     */
    public void saveHopeSubject(final Map<String, Object> paramsMap) {
        sqlSession.insert("exchangeMapper.saveHopeSubject", paramsMap);
    }
	
    
	/**
     * 승인 안내문 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UMap> 조회결과  
     */
	@SuppressWarnings("rawtypes")
	public List<UMap> getApplyExchangeWithAGSendList(Map<String, Object> paramMap){
		return sqlSession.selectList("exchangeMapper.getApplyExchangeWithAGSendList", paramMap);
	}
    
    
    
    /********** 2018.06.06 lhj 작업중 **********/
    
    /**
     * 학점교류 신청 유저 목록 조회
     * @param request 파라미터 및 세션정보 
     * @param paramMap 검색조건
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
    public List<UMap<String, Object>> getApplyExchangeUserList(Map<String, Object> paramMap){
    	return sqlSession.selectList("exchangeMapper.getApplyExchangeUserList", paramMap);
    }
    
    /**
	 * 학점 교류 신청 상태 변경
	 * @param request 파라미터 및 세션정보
	 * @param paramMap 상태값, 사유
	 * @return resultMap 변경결과
	 * @throws Exception java.lang
	 */
    public void changeApplyStatus(Map<String, Object> paramMap){
    	sqlSession.update("exchangeMapper.changeApplyStatus", paramMap);
    }
    
    /********** //2018.06.06 lhj 작업중 **********/

    /**
     * 학점교류 신청 정보를 저장한다.
     *
     * @param params 학점교류 신청 정보보     */
    public void saveExchangeInfo(Map<String, Object> params) {
        sqlSession.insert("exchangeMapper.saveExchangeInfo", params);
    }
}
