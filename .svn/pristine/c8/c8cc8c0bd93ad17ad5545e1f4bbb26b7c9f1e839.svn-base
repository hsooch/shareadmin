package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import shared.university.admin.UMap;

/**
 * 권한 관리에 필요한 데이터 엑세스 오브젝트
 *
 * Created on 2018. 4. 10.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Repository
public class AuthorityDao {


	@Resource(name="sqlSession")
    private final SqlSessionTemplate sqlSession;

    @Autowired
    public AuthorityDao(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    /**
     * 매니저 유형 정보가 포함된 목록을 조회한다.
     *
     * @param params 검색 파라미터
     * @return 매니저 목록
     */
    public List<UMap<String, Object>> getManagerList(final Map<String, Object> params) {
        return sqlSession.selectList("authorityMapper.getManagerList", params);
    }
    
    /**
     * 담당자 권한 유형 수정.
     *
     * @param params 담당자 시퀀스, 권한유형
     */
    public void updateAuthorityType(final Map<String, Object> params) {
        sqlSession.update("authorityMapper.updateAuthorityType", params);
    }
    
    /**
     * 그룹 권한 목록 조회
     * @param params Map<String, Object> 검색조건
     * @return List<UMap> 조회결과  
     */
    @SuppressWarnings("rawtypes")
    public List<UMap> getGroupList(final Map<String, Object> params) {
    	return sqlSession.selectList("authorityMapper.selectGroupList", params);
    }
    
    @SuppressWarnings("rawtypes")
    public UMap getGroupInfo(final Map<String, Object> params) {
    	return sqlSession.selectOne("authorityMapper.selectGroupInfo", params);
    }
    
    @SuppressWarnings("rawtypes")
    public List<UMap> getGroupMenuList(final Integer groupSeq) {
    	return sqlSession.selectList("authorityMapper.selectGroupMenuList", groupSeq);
    }
    
    @SuppressWarnings("rawtypes")
    public List<UMap> getParentMenuList(final Integer groupSeq) {
    	return sqlSession.selectList("authorityMapper.selectParentMenuList", groupSeq);
    }
    
	public List<UMap<String, Object>> getMenuAuthForGroup(final Map<String, Object> params) {
		return sqlSession.selectList("authorityMapper.selectMenuAuthForGroup", params);
	}

	public void upsertGroupInfo(final Map<String, Object> params) {
		sqlSession.update("authorityMapper.upsertGroupInfo", params);
	}
	
	public void deletePermisionGroup(final Map<String, Object> params) {
		sqlSession.delete("authorityMapper.deletePermisionGroup", params);
	}
	
	public void savePermisionGroup(final Map<String, Object> params) {
		sqlSession.update("authorityMapper.savePermisionGroup", params);
	}
	
	public void deleteGroup(final Map<String, Object> params) {
		sqlSession.delete("authorityMapper.deleteGroup", params);
	}

	@SuppressWarnings("rawtypes")
	public List<UMap> getMenuAuthForUser(final Map<String, Object> params) {
		return sqlSession.selectList("authorityMapper.selectMenuAuthForUser", params);
	}

	@SuppressWarnings("rawtypes")
	public List<UMap> getUnivManagerList(final Map<String, Object> params) {
		return sqlSession.selectList("authorityMapper.selectUnivManagerList", params);
	}
	
	public UMap<String, Object>  getUnivMgrInfo(final Map<String, Object> params) {
		return sqlSession.selectOne("authorityMapper.selectUnivMgrInfo", params);
	}

	public List<UMap<String, Object>> getUnAttachedGroupList(final Map<String, Object> params) {
        return sqlSession.selectList("authorityMapper.selectUnAttachedGroupList", params);
    }
	
	public void addGroup(final Map<String, Object> params, final Integer groupSeq) {
		params.put("groupSeq", groupSeq);
		sqlSession.insert("authorityMapper.addGroup", params);
	}
	
	public List<UMap<String, Object>> getAttachedGroupList(final Map<String, Object> params) {
        return sqlSession.selectList("authorityMapper.selectAttachedGroupList", params);
    }
	
	public void removeGroup(final Map<String, Object> params) {
        sqlSession.delete("authorityMapper.removeGroup", params);
    }
	
	@SuppressWarnings("rawtypes")
    public UMap getUserMenuInfo(final Map<String, Object> params) {
    	return sqlSession.selectOne("authorityMapper.selectUserMenuInfo", params);
    }
	
	@SuppressWarnings("rawtypes")
	public List<UMap> getRemoveGroupMenus(final Map<String, Object> params) {
		return sqlSession.selectList("authorityMapper.getRemoveGroupMenus", params);
	}
	
	public void deletePermisionUsers(final Map<String, Object> params) {
		sqlSession.delete("authorityMapper.deletePermisionUsers", params);
	}
	
	public void saveMenuAuthForUser(final Map<String, Object> params) {
		sqlSession.insert("authorityMapper.insertMenuAuthForUser", params);
	}
	
	public void deleteMenuAuthForUser(final Map<String, Object> params) {
		sqlSession.delete("authorityMapper.deleteMenuAuthForUser", params);
	}
	
	
}
