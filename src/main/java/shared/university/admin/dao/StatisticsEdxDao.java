package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * <pre>
 * open edx db 통계 처리를 위한 dao 클래스입니다.
 * </pre>
 * 
 * @author enciel
 * @since JDK1.7
 */
@Repository
public class StatisticsEdxDao{
	/**
	 * <pre>
	 * open edx db 처리를 위한 sql session 객체 선언입니다.
	 * </pre>
	 */
	@Resource(name = "sqlSession2")
	private final SqlSessionTemplate sqlSession2;

	/**
	 * <pre>
	 * StatisticsMappingDao 클래스의 생성자입니다.
	 * </pre>
	 * 
	 * @param sqlSession2 mysql db 접속 정보를 가지고 있는 sql session template 객체.
	 */
	@Autowired
	public StatisticsEdxDao(SqlSessionTemplate sqlSession2){
		this.sqlSession2 = sqlSession2;
	}

	/**
	 * <pre>
	 * 중복 제거된 모든 기관명을 조회합니다.
	 * </pre>
	 * 
	 * @return 기관명 목록을 반환합니다.
	 */
	public List<Map<String, Object>> selectOrgNameList(){
		return this.sqlSession2.selectList("statisticsEdxMapper.selectOrgNameList");
	}

	/**
	 * <pre>
	 * 기관별 통계 정보를 조회합니다.
	 * </pre>
	 * 
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @return 기관별 조회된 통계 목록을 반환합니다.
	 */
	public List<Map<String, Object>> selectOrgCaseStatList(Map<String, Object> params){
		return this.sqlSession2.selectList("statisticsEdxMapper.selectOrgCaseStatList",
				params);
	}

	/**
	 * <pre>
	 * 학생별 통계 정보를 조회합니다.
	 * </pre>
	 * 
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @return 학생별 조회된 통계 목록을 반환합니다.
	 */
	public List<Map<String, Object>> selectStudentCaseStatList(
			Map<String, Object> params){
		return this.sqlSession2
				.selectList("statisticsEdxMapper.selectStudentCaseStatList", params);
	}

	/**
	 * <pre>
	 * 등록 기관별 통계 정보를 조회합니다.
	 * </pre>
	 * 
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @return 등록 기관별 통계 목록을 반환합니다.
	 */
	public List<Map<String, Object>> selectRegOrgCaseStatList(Map<String, Object> params){
		return this.sqlSession2.selectList("statisticsEdxMapper.selectRegOrgCaseStatList",
				params);
	}

	/**
	 * <pre>
	 * 사용자 강좌별 학습활동 정보를 조회합니다.
	 * </pre>
	 * 
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @return 사용자 강좌별 학습활동 목록을 반환합니다.
	 */
	public List<Map<String, Object>> selectCourseActivityList(Map<String, Object> params){
		return this.sqlSession2.selectList("statisticsEdxMapper.selectCourseActivityList",
				params);
	}

	/**
	 * <pre>
	 * 강좌의 구조 json 문자열을 조회합니다.
	 * </pre>
	 * 
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @return 강좌 구조 json 문자영를 반환합니다.
	 */
	public String selectCourseStructureJson(Map<String, Object> params){
		return this.sqlSession2.selectOne("statisticsEdxMapper.selectCourseStructureJson",
				params);
	}
}
