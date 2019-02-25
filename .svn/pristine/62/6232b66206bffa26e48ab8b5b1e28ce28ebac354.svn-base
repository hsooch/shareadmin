package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.common.collect.Maps;

import shared.university.admin.domain.MenuVO;

/**
 * 서비스 메뉴 데이터 CRUD
 *
 * Created on 2018. 4. 4.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Repository
public class MenuDao {

	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public MenuDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    /**
     * 메뉴 등록
     *
     * @param menuVO 메뉴 정보 데이터
     * @return 등록 후 생성된 메뉴 시퀀스 값
     */
    public int insertMenu(final MenuVO menuVO) {
        return sqlSession.insert("menuMapper.insertMenu", menuVO);
    }

    /**
     * 동일한 depth에 동일한 이름의 메뉴 정보를 조회한다.
     *
     * @param menuName 메뉴 이름
     * @param depth 단계
     * @return 동일한 데이터 목록
     */
    public List<MenuVO> getSameNameMenu(final String menuName, final int depth) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("menuName", menuName);
        params.put("depth", depth);
        return sqlSession.selectList("menuMapper.getSameNameMenu", params);
    }

    /**
     * 메뉴 정보를 갱신한다.
     *
     * @param menuVO 메뉴 정보 데이터
     * @return 업데이트 처리 개수
     */
    public int updateMenu(final MenuVO menuVO) {
        return sqlSession.update("menuMapper.updateMenu", menuVO);
    }

    /**
     * 사용자별 메뉴 리스트를 조회
     *
     * @param userSeq 사용자 시퀀스
     * @return 메뉴 목록
     */
    public List<MenuVO> getMenuListByUser(final Integer userSeq) {
        return sqlSession.selectList("menuMapper.getMenuListByUser", userSeq);
    }
    
    /**
     * 최상위 메뉴 및 하위 메뉴 목록 조회
     * 
     * @param parentSeq 부모 시퀀스
     * @return 메뉴 목록
     */
    public List<MenuVO> getMenuList(final String str) {
        final Map<String, Object> params = Maps.newHashMap();
    	Integer parentSeq = null;
    	if (str != null) {
    		parentSeq =  Integer.parseInt(str);
    		params.put("parentSeq", parentSeq);
    	}
    	return sqlSession.selectList("menuMapper.getMenuList", params);
    }
    
    /**
     * 메뉴 정보 조회
     *
     * @param seq 시퀀스 값
     * @return 메뉴 정보
     */
    public MenuVO getMenuInfo(final String str) {
        final Map<String, Object> params = Maps.newHashMap();
        Integer seq = Integer.parseInt(str);
        params.put("seq", seq);
        
        return sqlSession.selectOne("menuMapper.getMenuInfo", params);
    }
    
    /**
     * 메뉴 정보 등록 및 갱신
     * 
     * @param paramMap
     */
    public void upsertMenuInfo(Map<String, Object> paramMap) {
        sqlSession.update("menuMapper.upsertMenuInfo", paramMap);
    }
    
    /**
     * 메뉴 삭제 (숨김)
     * @param paramMap
     */
    public void deleteMenuInfo(Map<String, Object> paramMap) {
    	sqlSession.update("menuMapper.deleteMenuInfo", paramMap);
    }
    
    public void changeMenuIndex(Map<String, Object> paramMap) {
    	sqlSession.update("menuMapper.changeMenuIndex", paramMap);
    }
    
    public Integer getTopMenuIndex() {
    	return sqlSession.selectOne("menuMapper.getTopMenuIndex");
    }
    
    
}
























