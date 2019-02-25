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
 * Created on 2018. 6. 20.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Repository
public class ScheduleDao {

	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public ScheduleDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }
    
    /**
     * 스케쥴 아이디 조회
     * @param paramMap 스케쥴러ID, 스케쥴러타입
     * @return List<SemesterVO> 조회결과  
     */
    public String getScheduleId(){
    	return (String)sqlSession.selectOne("scheduleMapper.getScheduleId");
    }
    
    /**
     * 스케쥴러 아이디 등록
     * @param paramMap 스케쥴러ID, 스케쥴러타입
     * @throws Exception java.lang
     */
	public void insertSchedule(String scheduleId){
		sqlSession.insert("scheduleMapper.insertSchedule", scheduleId);
	}
	
	/**
     * 스케쥴러 아이디 삭제
     * @param paramMap 스케쥴러타입
     * @return resultMap 조회결과
     */
    public void deleteSchedule() {
    	sqlSession.delete("scheduleMapper.deleteSchedule");
    }
    
}
