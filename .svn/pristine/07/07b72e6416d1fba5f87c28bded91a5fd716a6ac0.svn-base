package shared.university.admin.dao;

import com.google.common.collect.Maps;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.Map;

/**
 * Created on 2018. 6. 19.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Repository
public class SecurityHistoryDao {
    @Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public SecurityHistoryDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    /**
     * 개인정보 취급 이력 저장
     *
     * @param actionUserSeq 취급자 유저 시퀀스
     * @param targetUserSeq 대상 유저 시퀀스
     * @param actionType 취급 유형
     */
    public void insertHistory(final int actionUserSeq, final int targetUserSeq, final int actionType) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("actionUserSeq", actionUserSeq);
        params.put("targetUserSeq", targetUserSeq);
        params.put("actionType", actionType);
        sqlSession.insert("securityHistoryMapper.insertHistory", params);
    }
}
