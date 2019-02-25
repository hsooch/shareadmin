package test.shared.university.admin.dao;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import shared.university.admin.dao.MenuDao;
import shared.university.admin.domain.MenuVO;
import test.shared.university.admin.TestCommon;

import java.util.List;

/**
 * Created on 2018. 4. 4.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Slf4j
public class TestMenuDao extends TestCommon {

    @Autowired
    private MenuDao menuDao;

    /**
     * 메뉴 데이터 등록
     */
    @Test
    public void initMenuData() throws Exception {
        Integer seq;

        seq = this.insert(new MenuVO("N","회원 관리", "", 1, 1));
        this.insert(new MenuVO("N", seq, "회원 관리", "#/user/management", 1, 2));
        this.insert(new MenuVO("N", seq, "개인정보수정", "#/user/modify", 2, 2));
        this.insert(new MenuVO("N", seq, "회원탈퇴", "", 3, 2));

        seq = this.insert(new MenuVO("N", "코드/대학정보 관리", "", 2, 1));
        this.insert(new MenuVO("N", seq, "코드관리", "", 1, 2));
        this.insert(new MenuVO("N", seq, "대학 정보 관리", "", 2, 2));
        this.insert(new MenuVO("N", seq, "MOU 대학 관리", "", 3, 2));

        seq = this.insert(new MenuVO("Y", "권한 관리", "", 3, 1));
        this.insert(new MenuVO("Y", seq, "권한 그룹관리", "", 1, 2));
        this.insert(new MenuVO("N", seq, "운영권한 관리", "", 2, 2));

    }

    private Integer insert(final MenuVO vo) throws Exception {
        final List<MenuVO> menuVOList = menuDao.getSameNameMenu(vo.getMenuName(), vo.getDepth());
        if (menuVOList == null || menuVOList.size() == 0) {
            menuDao.insertMenu(vo);
            return vo.getMenuSeq();
        } else {
            if (menuVOList.size() == 1) {
                vo.setMenuSeq(menuVOList.get(0).getMenuSeq());
                menuDao.updateMenu(vo);
                return vo.getMenuSeq();
            } else {
                for (MenuVO menuVO : menuVOList) {
                    log.debug("Duplication Menu SEQ => {}, Name => {}, Depth => {}",
                            menuVO.getMenuSeq(), menuVO.getMenuName(), menuVO.getDepth());
                }

                throw new Exception("Duplication Data...");
            }
        }
    }
}
