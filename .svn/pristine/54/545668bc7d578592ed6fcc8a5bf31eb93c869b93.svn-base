package test.shared.university.admin.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import shared.university.admin.dao.UserDao;
import shared.university.admin.domain.UserSession;
import shared.university.admin.service.MainService;
import test.shared.university.admin.TestCommon;

/**
 * Created on 2018. 4. 4.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Slf4j
public class TestMainService extends TestCommon {

    @Autowired
    private MainService service;

    @Test
    public void testGetUserMenuList() {
        final UserSession session = new UserSession();
        session.setUserSeq(2);

        service.getUserMenuList(session);
    }
}
