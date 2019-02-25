package shared.university.admin.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shared.university.admin.dao.MenuDao;
import shared.university.admin.domain.MenuVO;
import shared.university.admin.domain.UserSession;
import shared.university.admin.utils.AppUtils;

import java.util.List;
import java.util.Map;

/**
 * 메인 화면에서 필요한 기능에 대한 로직 처리
 *
 * Created on 2018. 4. 10.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Service
@Slf4j
public class MainService {

    private final MenuDao menuDao;

    @Autowired
    public MainService(MenuDao menuDao) {
        this.menuDao = menuDao;
    }

    /**
     * 사용자별 메뉴 목록을 조회한다.
     *
     * @param userSession 사용자 세션 정보
     * @return 결과 데이터
     */
    public Map<String, Object> getUserMenuList(final UserSession userSession) {
        // 사용자별 메뉴 목록 조회
        final List<MenuVO> menuList = menuDao.getMenuListByUser(userSession.getUserSeq());

        // 2 Depth 구조의 메뉴 트리 데이터 생성
        final Map<Integer, Map<String, Object>> dataMap = Maps.newHashMap();
        for (MenuVO vo : menuList) {
            if (vo.getDepth() == 1) {
                final Map<String, Object> map = Maps.newHashMap();
                map.put("menu", vo);
                dataMap.put(vo.getMenuSeq(), map);
            } else if (vo.getDepth() == 2) {
                final Map<String, Object> map = dataMap.get(vo.getParentSeq());
                if (map == null) {
                    continue;
                }

                if (map.containsKey("subMenuList")) {
                    @SuppressWarnings("unchecked")
                    final List<MenuVO> subMenuList = (List<MenuVO>)map.get("subMenuList");
                    subMenuList.add(vo);
                } else {
                    final List<MenuVO> subMenuList = Lists.newArrayList();
                    subMenuList.add(vo);
                    map.put("subMenuList", subMenuList);
                }
            }
        }

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        resultMap.put("menuList", dataMap.values());

        return resultMap;
    }
}
