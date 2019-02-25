package shared.university.admin.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.microsoft.sqlserver.jdbc.StringUtils;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.AppException;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;
import shared.university.admin.dao.AuthorityDao;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.StringUtil;

/**
 * 권한 관리에 필요한 기능을 제공
 *
 * Created on 2018. 5. 16.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Service
@Slf4j
public class AuthorityService {

    private final AuthorityDao authorityDao;

    @Autowired
    public AuthorityService(AuthorityDao authorityDao) {
        this.authorityDao = authorityDao;
    }

    /**
     * 매니저 유형 정보가 포함된 목록을 조회한다.
     *
     * @param requestParam 요청 파라미터
     * @return 매니저 목록
     */
    public Map<String, Object> getManagerList(final Map<String, Object> requestParam) {
        // 필수 검색 조건 추가
        requestParam.put("userStatusCode", Const.USER_STATUS_ACTIVE);
        requestParam.put("universityType", Const.USER_TYPE_UNIVERSITY);
        requestParam.put("lifelongLearningType", Const.USER_TYPE_LIFELONG_LEARNING);

        // 데이터 조회
        final List<UMap<String, Object>> managerList = authorityDao.getManagerList(requestParam);

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (managerList != null && managerList.size() > 0) {
            resultMap.put("managerList", managerList);
        }

        return resultMap;
    }
    
    /**
     * 담당자 권한 유형 수정.
     *
     * @param params 담당자 시퀀스, 권한유형
     */
    public Map<String, Object> saveAuthorityType(final Map<String, Object> params) {
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        authorityDao.updateAuthorityType(params);
        return resultMap;
    }

    /**
     * 그룹 권한 목록 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public Map<String, Object> getGroupList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		List<UMap> groupList = authorityDao.getGroupList(paramMap);
		resultMap.put("groupList", groupList);
		return resultMap;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map<String, Object> getGroupInfo(Map<String, Object> paramMap) throws Exception {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		String groupSeq = StringUtil.nvltoStr(paramMap.get("groupSeq"), "");
		if(StringUtils.isEmpty(groupSeq)) {
			log.error("groupSeq is invalid");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
		UMap groupInfo = authorityDao.getGroupInfo(paramMap);
		List<UMap> menuSeqList = getGroupMenuList(Integer.parseInt(groupSeq));
		List<UMap> menuParentList = getParentMenuList(Integer.parseInt(groupSeq));
		List<Integer> menuList = Lists.newArrayList();
		List<Integer> parentMenuList = Lists.newArrayList();
		for(UMap menuSeq : menuSeqList) {
			menuList.add(menuSeq.getInteger("menuSeq"));
		}
		for(UMap parentSeq : menuParentList) {
			if (parentSeq != null) {
				parentMenuList.add(parentSeq.getInteger("parentSeq"));
			}
		}
		groupInfo.put("menuList", menuList);
		groupInfo.put("parentList", parentMenuList);
		resultMap.put("groupInfo", groupInfo);
		return resultMap;
	}
	
	@SuppressWarnings("rawtypes")
    private List<UMap> getGroupMenuList(Integer groupSeq) throws Exception{
    	List<UMap> groupMenuList = authorityDao.getGroupMenuList(groupSeq);
    	return groupMenuList;
    }
	
	@SuppressWarnings("rawtypes")
	private List<UMap> getParentMenuList(Integer groupSeq) throws Exception{
		List<UMap> parentMenuList = authorityDao.getParentMenuList(groupSeq);
		return parentMenuList;
	}

	public Map<String, Object> getMenuAuthForGroup(Map<String, Object> requestParam) throws Exception{
		final List<UMap<String, Object>> menuAuthList = authorityDao.getMenuAuthForGroup(requestParam);
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		if(menuAuthList != null && menuAuthList.size() > 0) {
			for(int i=0;i<menuAuthList.size();i++) {
				if(menuAuthList.get(i).get("parentSeq") == null) {
					menuAuthList.get(i).put("parentSeq", null);
				}
			}
			resultMap.put("menuAuth", menuAuthList);
		}
		return resultMap;
	}

	public Map<String, Object> saveGroupInfo(Map<String, Object> params, List<Integer> menuSeq)throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		authorityDao.deletePermisionGroup(params);
		authorityDao.upsertGroupInfo(params);
		log.info("params => "+params);
		if(menuSeq != null) {
			for(Integer seq: menuSeq) {
				if (seq != null) {
					params.put("menuSeq", seq);
				}
				authorityDao.savePermisionGroup(params);
			}
		}
		return resultMap;
	}
	
	public Map<String, Object> deleteGroup(Map<String, Object> params, List<Integer> groupSeq) throws Exception {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		authorityDao.deletePermisionGroup(params);
		if(groupSeq != null) {
			for(Integer seq: groupSeq) {
				if(seq != null) {
					params.put("groupSeq" , seq);
				}
				authorityDao.deleteGroup(params);
			}
		}
		return resultMap;
	}

	@SuppressWarnings({"rawtypes", "unchecked"})
	public Map<String, Object> getMenuAuthForUser(Map<String, Object> params) throws Exception{
		final List<UMap> menuAuthList = authorityDao.getMenuAuthForUser(params);
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		if(menuAuthList != null && menuAuthList.size() > 0) {
			for(int i=0;i<menuAuthList.size();i++) {
				if(menuAuthList.get(i).get("parentSeq") == null) {
					menuAuthList.get(i).put("parentSeq", null);
				}
			}
			resultMap.put("menuAuth", menuAuthList);
		}
		return resultMap;
	}
	
	@SuppressWarnings("rawtypes")
	public Map<String, Object> getUnivManagerList(Map<String, Object> params) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		List<UMap> univManagerList = authorityDao.getUnivManagerList(params);
		resultMap.put("univManagerList", univManagerList);
		return resultMap;
	}
	
	public Map<String, Object> getUnivMgrInfo(Map<String, Object> params) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		UMap<String, Object> univMgrInfo = authorityDao.getUnivMgrInfo(params);
		resultMap.put("mgrInfo", univMgrInfo);
		return resultMap;
	}

	public Map<String, Object> getUnAttachedGroupList(Map<String, Object> params) {
        // 데이터 조회
        final List<UMap<String, Object>> groupList = authorityDao.getUnAttachedGroupList(params);

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (AppUtils.isNotEmpty(groupList)) {
            resultMap.put("groupList", groupList);
        }
        return resultMap;
    }

	public Map<String, Object> addGroup(final Map<String, Object> params, final List<Integer> groupSeqList) {
        // 협의회 데이터 등록
        for (Integer groupSeq : groupSeqList) {
            authorityDao.addGroup(params, groupSeq);
        }
        return AppUtils.createDefaultResultMap();
    }
	
	public Map<String, Object> getAttachedGroupList(final Map<String, Object> params) {
		// 데이터 조회
		final List<UMap<String, Object>> groupList = authorityDao.getAttachedGroupList(params);
		
		// 결과 데이터 맵핑
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		if (AppUtils.isNotEmpty(groupList)) {
			resultMap.put("groupList", groupList);
		}
		return resultMap;
	}
	
	@SuppressWarnings("rawtypes")
	public Map<String, Object> removeGroup(final Map<String, Object> params) {
		final List<UMap> removeList = authorityDao.getRemoveGroupMenus(params);
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		resultMap.put("removeList", removeList);
		authorityDao.removeGroup(params);
        return resultMap;
    }
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Map<String, Object> getUserMenuInfo(Map<String, Object> paramMap) throws Exception {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		String groupSeq = StringUtil.nvltoStr(paramMap.get("groupSeq"), "");
		if(StringUtils.isEmpty(groupSeq)) {
			log.error("groupSeq is invalid");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
		UMap groupInfo = authorityDao.getUserMenuInfo(paramMap);
		List<UMap> menuSeqList = getGroupMenuList(Integer.parseInt(groupSeq));
		List<UMap> menuParentList = getParentMenuList(Integer.parseInt(groupSeq));
		List<Integer> menuList = Lists.newArrayList();
		List<Integer> parentMenuList = Lists.newArrayList();
		for(UMap menuSeq : menuSeqList) {
			menuList.add(menuSeq.getInteger("menuSeq"));
		}
		for(UMap parentSeq : menuParentList) {
			if (parentSeq != null) {
				parentMenuList.add(parentSeq.getInteger("parentSeq"));
			}
		}
		groupInfo.put("menuList", menuList);
		groupInfo.put("parentList", parentMenuList);
		resultMap.put("groupInfo", groupInfo);
		return resultMap;
	}

	public Map<String, Object> saveMenuAuthForUser(Map<String, Object> paramMap) {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		authorityDao.saveMenuAuthForUser(paramMap);
		return resultMap;
	}
	
	public Map<String, Object> deleteMenuAuthForUser(Map<String, Object> paramMap) {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		authorityDao.deleteMenuAuthForUser(paramMap);
		return resultMap;
	}
	
	
	
	
	
	
	
	
	
}
