package shared.university.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shared.university.admin.dao.MenuDao;
import shared.university.admin.domain.MenuVO;
import shared.university.admin.utils.AppUtils;

/**
 * 메뉴 조회 및 관리에 필요한 기능 제공
 *
 * Created on 2018. 5. 11.
 *
 * @author 스퀘어네트(황수찬)
 * @since JDK1.7
 */
@Service
public class MenuService {

	private final MenuDao menuDao;
	
	@Autowired
	public MenuService(MenuDao menuDao) {
		this.menuDao = menuDao;
	}
	
	/**
	 * 최상위 메뉴 및 하위 메뉴 목록 조회
	 *
	 * @param parentSeq 조회할 상위 시퀀스
	 * @return 메뉴 목록
	 */
	public Map<String, Object> getMenuList(final String parentSeq) {
		// 조회
		final List<MenuVO> menuList = menuDao.getMenuList("0".equals(parentSeq) ? null : parentSeq);

		// 결과 데이터 맵핑
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		resultMap.put("menuList", menuList);

		return resultMap;
	}
	
	/**
	 * 메뉴 정보 조회
	 *
	 * @param seq 시퀀스 값
	 * @return 메뉴 정보
	 */
	public Map<String, Object> getMenuInfo(final String seq) {
        final MenuVO info = menuDao.getMenuInfo(seq);
		
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (info != null) {
            resultMap.put("info", info);
        }
        
        return resultMap;
	}
	
	/**
	 * 메뉴 정보 저장
	 * 
	 * @param paramMap
	 * @return
	 */
	public Map<String, Object> saveMenuInfo(Map<String, Object> paramMap) {
		menuDao.upsertMenuInfo(paramMap);
		return AppUtils.createDefaultResultMap();
	}
	
	/**
	 * 메뉴 삭제 (숨김)
	 * @param paramMap
	 * @return 
	 */
	public Map<String, Object> deleteMenuInfo(Map<String, Object> paramMap) {
		menuDao.deleteMenuInfo(paramMap);
		return AppUtils.createDefaultResultMap();
	}
	
	public Map<String, Object> changeMenuIndex(Map<String, Object> paramMap) {
		menuDao.changeMenuIndex(paramMap);
		return AppUtils.createDefaultResultMap();
	}
	
	public Integer getTopMenuIndex() {
		return menuDao.getTopMenuIndex();
	}
	
}















