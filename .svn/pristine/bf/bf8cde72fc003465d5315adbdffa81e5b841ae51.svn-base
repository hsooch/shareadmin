package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.UMap;

/**
 * 메시지 발송 관리에 필요한 데이터 엑세스 오브젝트
 * 
 * Created on 2018. 5. 23.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Repository
public class MessageDao {

	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public MessageDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }
    
    /**
     * 메시지 정보 등록 및 갱신
     * @param paramMap Map<String, Object> 메시지 정보
     * @throws Exception java.lang
     */
	public void upsertMessage(Map<String, Object> paramMap){
		sqlSession.update("messageMapper.upsertMessage", paramMap);
	}
	
	public void sendSms(Map<String, Object> paramMap) {
		sqlSession.insert("messageMapper.sendSms", paramMap);
	}
	
	/**
     * 수신자 정보 등록 및 갱신
     * @param paramMap Map<String, Object> 수신자 정보
     * @throws Exception java.lang
     */
	public void upsertTarget(Map<String, Object> paramMap){
		sqlSession.update("messageMapper.upsertTarget", paramMap);
	}
    
	/**
     * 메시지 정보 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UserVO> 조회결과  
     */
    public UMap<String, Object> getMessageInfo(Map<String, Object> paramMap){
    	return sqlSession.selectOne("messageMapper.getMessageInfo", paramMap);
    }

    /**
     * 메시지 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UserVO> 조회결과  
     */
    public List<UMap<String, Object>> getMessageList(Map<String, Object> paramMap){
    	return sqlSession.selectList("messageMapper.getMessageList", paramMap);
    }
    
    /**
     * 수신자 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return List<UserVO> 조회결과  
     */
    public List<UMap<String, Object>> getTargetList(Map<String, Object> paramMap){
    	return sqlSession.selectList("messageMapper.getTargetList", paramMap);
    }
    
    public void upsertSmsInfo(Map<String, Object> paramMap) {
    	sqlSession.update("messageMapper.upsertSmsInfo", paramMap);
    }
    
    public List<UMap<String, Object>> getSenderList(Map<String, Object> paramMap) {
    	return sqlSession.selectList("messageMapper.getSenderList", paramMap);
    }
    public List<UMap<String, Object>> getSenderPersonalList(Map<String, Object> paramMap) {
    	return sqlSession.selectList("messageMapper.getSenderPersonalList", paramMap);
    }
    
    public UMap<String, Object> getCheckedSenderList(Map<String, Object> paramMap) {
    	return sqlSession.selectOne("messageMapper.getCheckedSenderList", paramMap);
    }

	public List<UMap<String, Object>> getSmsResultList(Map<String, Object> paramMap) {
		return sqlSession.selectList("messageMapper.getSmsResultList", paramMap);
	}
	
	public List<UMap<String, Object>> getSendResultInfo(Map<String, Object> paramMap) {
		return sqlSession.selectList("messageMapper.getSendResultInfo", paramMap);
	}
}
