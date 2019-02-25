package shared.university.admin.service;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import shared.university.admin.AppException;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.dao.CodeDao;
import shared.university.admin.domain.CodeVO;
import shared.university.admin.domain.UserSession;
import shared.university.admin.utils.AppUtils;

/**
 * 코드 조회 및 관리에 필요한 기능 제공
 *
 * Created on 2018. 4. 10.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Service
public class CodeService {
	
	private final CodeDao codeDao;

	@Autowired
	public CodeService(CodeDao codeDao) {
		this.codeDao = codeDao;
	}

	/**
	 * 하위 코드 목록을 조회 한다.
	 *
	 * @param parentCode 조회할 상위 코드 (0 일경우 root 코드 조회)
	 * @return 코드 목록
	 */
	public Map<String, Object> selectCodeList(final String parentCode) {
		// 코드 조회
		final List<CodeVO> codeList = codeDao.selectCodeList("0".equals(parentCode) ? null : parentCode);

		// 결과 데이터 맵핑
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		resultMap.put("codeList", codeList);

		return resultMap;
	}

	/**
	 * 지역과 대학교 코드 목록을 조회 한다.
	 *
	 * @param univRootCode 대학교 코드의 최상위 코드
	 * @param  userSession 사용자 로그인 정보
	 * @return 코드 목록
	 */
	public Map<String, Object> getUniversityList(final String univRootCode, final UserSession userSession) throws Exception {
		// 코드 목록 조회
		final List<CodeVO> codeList = codeDao.getUniversityList(univRootCode);

		CodeVO universityCode = null;
		if (Const.USER_TYPE_UNIVERSITY.equals(userSession.getUserType())) {
			if (StringUtils.isEmpty(userSession.getUnivCode())) {
				throw new AppException(ResultCode.DATA_CONSISTENCY_ERROR);
			}

			universityCode = codeDao.getCodeInfo(userSession.getUnivCode());
		}

		// 지역과 대학교 코드 데이터를 트리 구조로 변환
		final Map<String, Map<String, Object>> dataMap = Maps.newHashMap();
		for (CodeVO vo : codeList) {
			if (this.getCodeDepth(vo.getCode()) == 1) {
				if (universityCode != null) {
					if (vo.getCode() == null || !vo.getCode().equals(universityCode.getParentCode())) {
						continue;
					}
				}
				final Map<String, Object> map = Maps.newHashMap();
				map.put("code", vo);
				dataMap.put(vo.getCode(), map);
			} else if (this.getCodeDepth(vo.getCode()) == 2) {
				final Map<String, Object> map = dataMap.get(vo.getParentCode());
				if (map == null || (universityCode != null && (vo.getCode() == null || !vo.getCode().equals(universityCode.getCode())))) {
					continue;
				}

				if (map.containsKey("subCodeList")) {
					@SuppressWarnings("unchecked")
					final List<CodeVO> subCodeList = (List<CodeVO>)map.get("subCodeList");
					subCodeList.add(vo);
				} else {
					final List<CodeVO> subCodeList = Lists.newArrayList();
					subCodeList.add(vo);
					map.put("subCodeList", subCodeList);
				}
			}
		}

		// 결과 데이터 맵핑
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		resultMap.put("universityList", dataMap.values());

		return resultMap;
	}

	private int getCodeDepth(final String code) {
		final Matcher matcher = Pattern.compile("^\\S{3}(\\d{2})").matcher(code);
		if (matcher.find()) {
			return Integer.parseInt(matcher.group(1));
		} else {
			return -1;
		}

	}
	
	/**
	 * 코드 정보 조회
	 *
	 * @param code 코드 값
	 * @return 코드 정보
	 */
	public Map<String, Object> getCodeInfo(final String code) {
        final CodeVO info = codeDao.getCodeInfo(code);
		
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (info != null) {
            resultMap.put("info", info);
        }
        
        return resultMap;
	}
	
	/**
	 * 코드 정보 저장
	 * 
	 * @param paramMap
	 * @return
	 */
	public Map<String, Object> saveCodeInfo(Map<String, Object> paramMap) {
		codeDao.upsertCodeInfo(paramMap);
		return AppUtils.createDefaultResultMap();
	}
	
	/**
	 * 코드명 검색
	 * @param paramMap
	 * @return 검색한 코드명 목록
	 */
	public Map<String, Object> searchCodeName(Map<String, Object> paramMap) {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		
		List<CodeVO> codeNameList = codeDao.searchCodeName(paramMap);
		
		resultMap.put("codeNameList", codeNameList);
		
		return resultMap;
	}
	
	/**
	 * 코드 삭제 (숨김)
	 * @param paramMap
	 * @return 
	 */
	public Map<String, Object> removeCode(Map<String, Object> paramMap) {
		codeDao.removeCode(paramMap);
		return AppUtils.createDefaultResultMap();
	}
	
	/**
     * code 로 codeName 가져옴
     * 
     * @param paramMap
     * @return
     * @throws Exception
     */
    public Map<String, Object> getCodeName(String code) throws Exception {
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	final String codeName = codeDao.getCodeName(code);
    	resultMap.put("codeName", codeName);
    	return resultMap;
    }
    
    public Map<String, Object> changeCodeIndex(Map<String, Object> paramMap) {
		codeDao.changeCodeIndex(paramMap);
		return AppUtils.createDefaultResultMap();
	}
    
}
