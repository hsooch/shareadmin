package shared.university.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shared.university.admin.dao.CodeDao;
import shared.university.admin.dao.MoocMappingDao;
import shared.university.admin.domain.CodeVO;
import shared.university.admin.domain.MoocMappingVO;
import shared.university.admin.utils.AppUtils;

/**
 * Mooc 코드 관리
 * Created on 2018. 4
 *
 * @author 스퀘어네트
 * @since JDK1.7
 */
@Service
public class MoocMappingService {
	
	private final MoocMappingDao moocmappingDao;

	@Autowired
	public MoocMappingService(MoocMappingDao moocmappingDao) {
		this.moocmappingDao = moocmappingDao;
	}
	
 
	/**
	 * 하위 코드 목록을 조회 한다.
	 *
	 * @param 코드
	 * @return 코드 목록
	 */
	public Map<String, Object> selectCodeList(String codeType) {
		// 코드 조회
		final List<MoocMappingVO> codeList = moocmappingDao.selectCodeList(codeType);

		// 결과 데이터 맵핑
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		resultMap.put("codeList", codeList); 
		
		return resultMap;
	}
	/**
	 * Mooc 코드 관리 테이블에 등록
	 */
	
	public int insertMapping(MoocMappingVO vo) {
		int result = 0;
		result = moocmappingDao.insertMapping(vo); 
		return result;
	}
}
