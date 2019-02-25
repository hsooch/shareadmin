package shared.university.admin.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Maps;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.AppException;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;
import shared.university.admin.component.excel.ExcelComponent;
import shared.university.admin.component.excel.ExcelFeature;
import shared.university.admin.dao.ExchangeDao;
import shared.university.admin.dao.SubjectDao;
import shared.university.admin.dao.UserDao;
import shared.university.admin.domain.UserSession;
import shared.university.admin.domain.UserVO;
import shared.university.admin.feature.ApplyExchangeCancelInListExcelFeatrue;
import shared.university.admin.feature.ApplyExchangeCancelOutListExcelFeatrue0;
import shared.university.admin.feature.ApplyExchangeCancelOutListExcelFeatrue1;
import shared.university.admin.feature.ApplyExchangeConformInListExcelFeatrue;
import shared.university.admin.feature.ApplyExchangeConformOutListExcelFeatrue;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.StringUtil;

/**
 * Created on 2018. 6. 1.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Service
@Slf4j
public class ExchangeService {
	
	@Autowired
	private ExcelComponent excelComponent;

    private final ExchangeDao exchangeDao;

    private final UserDao userDao;

    private final SubjectDao subjectDao;

    @Autowired
    public ExchangeService(ExchangeDao exchangeDao, UserDao userDao, SubjectDao subjectDao) {
        this.exchangeDao = exchangeDao;
        this.userDao = userDao;
        this.subjectDao = subjectDao;
    }

    /**
     * 희망과목 등록 대학교 목록 조회
     *
     * @param session 인즌 세션
     * @return 희망과목 등록 대학교 목록
     */
    public Map<String, Object> getHopeUnivList(final UserSession session) {
        // 데이터 조회
        final List<UMap<String, Object>> univList = exchangeDao.getHopeUnivList(session.getUserSeq());

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (AppUtils.isNotEmpty(univList)) {
            resultMap.put("univList", univList);
        }

        return resultMap;
    }

    /**
     * 희망과목 등록 대학교의 학기 목록 조회
     *
     * @param session 인증 세션
     * @param univCode 조회할 대학교 코드
     * @return 희망과목 등록 대학교의 학기 목록
     */
    public Map<String, Object> getHopeSemesterList(final UserSession session, final String univCode) {
        // 데이터 조회
        final List<UMap<String, Object>> semesterList = exchangeDao.getHopeSemesterList(session.getUserSeq(), univCode);

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (AppUtils.isNotEmpty(semesterList)) {
            resultMap.put("semesterList", semesterList);
        }

        return resultMap;
    }

    /**
     * 희망과목으로 등록한 과목 개수 정보 조회
     *
     * @param session 인증 세션
     * @return 희망과목으로 등록한 과목 개수
     */
    public Map<String, Object> getHopeRegCntInfo(final UserSession session) {
        // 데이터 조회
        final UMap<String, Object> regInfo = exchangeDao.getHopeRegCntInfo(session.getUserSeq());

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        resultMap.put("userName", session.getUserName());
        resultMap.put("regInfo", regInfo);

        return resultMap;
    }

    /**
     * 희망과목 목록 조회
     *
     * @param session 인증 세션
     * @param params 조회 파라미터
     * @return 희망과목 목록
     */
    public Map<String, Object> getHopeSubjectList(final UserSession session, final Map<String, Object> params) {
        params.put("userType", session.getUserType());
        params.put("userSeq", session.getUserSeq());

        // Select Data
        final List<UMap<String, Object>> hopeSubjectList = exchangeDao.getHopeSubjectList(params);

        // Set Result Map
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (AppUtils.isNotEmpty(hopeSubjectList)) {
            resultMap.put("hopeSubjectList", hopeSubjectList);
        }

        return resultMap;
    }

    /**
     * 선택한 희망과목 삭제
     *
     * @param session 인증 세션
     * @param params 삭제할 조건 파라미터
     * @return 처리 결과 코드
     */
    public Map<String, Object> deleteHopeSubject(final UserSession session, final Map<String, Object> params) {
        final Object hopeListObj = params.get("hopeList");
        if (hopeListObj instanceof List) {
            for (Object infoObj : (List)hopeListObj) {
                if (infoObj instanceof Map) {
                    Map<?, ?> param = (Map)infoObj;
                    final Map<String, Object> paramMap = Maps.newHashMap();
                    paramMap.put("univCode", param.get("univCode"));
                    paramMap.put("year", param.get("year"));
                    paramMap.put("semesterCode", param.get("semesterCode"));
                    paramMap.put("subjectNum", param.get("subjectNum"));
                    paramMap.put("classNum", param.get("classNum"));
                    paramMap.put("userSeq", session.getUserSeq());
                    exchangeDao.deleteHopeSubject(paramMap);
                }
            }
        }

        return AppUtils.createDefaultResultMap();
    }

    /**
     * 희망과목 저장
     *
     * @param session 인증 세션
     * @param params 희망과목 정보
     * @return 처리 결과 코드
     * @throws Exception java.lang
     */
    public Map<String, Object> saveHopeSubject(final UserSession session, final Map<String, Object> params) throws Exception {
        // 학기 및 대학코드 정의
        final String univCode = StringUtil.nvltoStr(params.get("univCode"), "");
        final String year = StringUtil.nvltoStr(params.get("year"), "");
        final String semesterCode = StringUtil.nvltoStr(params.get("semesterCode"), "");
        final Object listObj = params.get("subjectList");

        // 파라미터 체크
        if (StringUtils.isEmpty(univCode) || StringUtils.isEmpty(year) || StringUtils.isEmpty(semesterCode)
                || !(listObj instanceof List)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        }

        // 데이터 저장 전에 해당 대학에 등록된 희망과목을 모두 삭제한다.
        Map<String, Object> delParams = Maps.newHashMap();
        delParams.put("univCode", univCode);
        delParams.put("year", year);
        delParams.put("semesterCode", semesterCode);
        delParams.put("userSeq", session.getUserSeq());
        exchangeDao.deleteHopeSubject(delParams);

        // 희망과목 등록
        for (Object mapObj : (List)listObj) {
            if (mapObj instanceof Map) {
                final Map<?, ?> subjectMap = (Map)mapObj;
                final Map<String, Object> dbParams = Maps.newHashMap();
                dbParams.put("univCode", univCode);
                dbParams.put("year", year);
                dbParams.put("semesterCode", semesterCode);
                dbParams.put("subjectNum", subjectMap.get("subjectNum"));
                dbParams.put("classNum", subjectMap.get("classNum"));
                dbParams.put("userSeq", session.getUserSeq());
                exchangeDao.saveHopeSubject(dbParams);
            }
        }

        return AppUtils.createDefaultResultMap();
    }
	
	/**
     * 학점 교류 과목 목록 조회
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	public Map<String, Object> getExSubjectList(Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UMap<String, Object>> subjectList = exchangeDao.getExSubjectList(paramMap);
		
		resultMap.put("subjectList", subjectList);
		
		return resultMap;
	}
    
    /**
     * 승인 안내문 목록 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public Map<String, Object> getApplyExchangeWithAGSendList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		log.info("paramMap => " + paramMap);
		List<UMap> semesterListWithAcceptGuide = exchangeDao.getApplyExchangeWithAGSendList(paramMap);
		resultMap.put("semesterListWithAcceptGuide", semesterListWithAcceptGuide);
		return resultMap;
	}
    
    
    
    /********** 2018.06.06 lhj 작업중 **********/
    
    /**
     * 학점교류 신청 유저 목록 조회
     * @param request 파라미터 및 세션정보 
     * @param paramMap 검색조건
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
    public Map<String, Object> getApplyExchangeUserList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception {
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
    	
		resultMap.put("applyExchangeUserList", exchangeDao.getApplyExchangeUserList(paramMap));
		
        return resultMap;
	}
    
    /**
	 * 학점 교류 신청 상태 변경
	 * @param request 파라미터 및 세션정보
	 * @param paramMap 상태값, 사유
	 * @return resultMap 변경결과
	 * @throws Exception java.lang
	 */
	public Map<String, Object> changeApplyStatus(HttpServletRequest request, Map<String, Object> paramMap) throws Exception {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("modUserSeq", session.getUserSeq());
		
		
		String applyExchangeSeq = (String)paramMap.get("applyExchangeSeq");
		String applyExchangeSeqList = (String)paramMap.get("applyExchangeSeqList");
		
		if(StringUtils.isEmpty(applyExchangeSeq) && StringUtils.isEmpty(applyExchangeSeqList)){
			log.error("applyExchangeSeq and applyExchangeSeqList is invalid");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
		
		if(StringUtils.isNotEmpty(applyExchangeSeqList)){
			String[] applyExchangeSeqArr = applyExchangeSeqList.split(",");
			paramMap.put("applyExchangeSeqArr", applyExchangeSeqArr);
		}
		
		exchangeDao.changeApplyStatus(paramMap);
		
		return resultMap;
	}
	
	/**
	 * 학기 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	public void downloadApplyExchangeUserList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UMap<String, Object>> subjectList = exchangeDao.getApplyExchangeUserList(paramMap);
		
		String fileName = null;
		ExcelFeature featrue = null;
		if(StringUtil.nvltoStr(paramMap.get("searchPage"), "confirmOut").equals("confirmIn")){
			fileName = Const.EXCEL_FILE_NAME_APPLY_EXCHANGE_IN_LIST;
			featrue = new ApplyExchangeConformInListExcelFeatrue();
		}else if(StringUtil.nvltoStr(paramMap.get("searchPage"), "confirmOut").equals("cancelOut0")){
			fileName = Const.EXCEL_FILE_NAME_APPLY_EXCHANGE_CANCEL_OUT_LIST_0;
			featrue = new ApplyExchangeCancelOutListExcelFeatrue0();
		}else if(StringUtil.nvltoStr(paramMap.get("searchPage"), "confirmOut").equals("cancelOut1")){
			fileName = Const.EXCEL_FILE_NAME_APPLY_EXCHANGE_CANCEL_OUT_LIST_1;
			featrue = new ApplyExchangeCancelOutListExcelFeatrue1();
		}else if(StringUtil.nvltoStr(paramMap.get("searchPage"), "confirmOut").equals("cancelIn")){
			fileName = Const.EXCEL_FILE_NAME_APPLY_EXCHANGE_CANCEL_IN_LIST;
			featrue = new ApplyExchangeCancelInListExcelFeatrue();
		}else{
			fileName = Const.EXCEL_FILE_NAME_APPLY_EXCHANGE_OUT_LIST;
			featrue = new ApplyExchangeConformOutListExcelFeatrue();
		}
		
		
		
		paramMap.put("excelList", subjectList);
		paramMap.put("fileName", fileName);
		
		excelComponent.excelDownLoad(response, featrue, paramMap);
	}
    
    /********** //2018.06.06 lhj 작업중 **********/


    /**
     * 학점 교류 신청 정보를 저장한다.
     *
     * @param session 인증 세션
     * @param reqParams 학점 교류 정목 목록
     * @return 처리 결과 코드
     */
    public Map<String, Object> saveExchangeInfo(final UserSession session, final Map<String, Object> reqParams) throws Exception {
        // DB 파라미터
        final Map<String, Object> dbParams = Maps.newHashMap();
        dbParams.put("userSeq", session.getUserSeq());

        // 학기 및 유저 정보 파라미터 체크
        final String univCode = StringUtil.nvltoStr(reqParams.get("univCode"), "");
        final String year = StringUtil.nvltoStr(reqParams.get("year"), "");
        final String semesterCode = StringUtil.nvltoStr(reqParams.get("semesterCode"), "");
        final UserVO userInfo = userDao.selectUserInfo(dbParams);
        if (StringUtils.isEmpty(univCode) || StringUtils.isEmpty(year) || StringUtils.isEmpty(semesterCode) || userInfo == null) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        }

        // 학기 및 신청자 정보를 DB 파라미터에 저장
        dbParams.put("univCode", univCode);
        dbParams.put("year", year);
        dbParams.put("semesterCode",  semesterCode);
        dbParams.put("userUnivCode", userInfo.getUnivCode());
        dbParams.put("studentNumber", userInfo.getStudentNumber());
        dbParams.put("userName", userInfo.getUserName());
        dbParams.put("collegeName", userInfo.getCollegeName());
        dbParams.put("userDepartment", userInfo.getDepartment());
        dbParams.put("studentGradeCode", userInfo.getStudentGradeCode());

        // 신청 요청한 과목 목록을 루프돌며 저장
        final Object subjectListObj = reqParams.get("subjectList");
        if (subjectListObj instanceof List) {
            for (Object subjectObj : (List)subjectListObj) {
                if (subjectObj instanceof Map) {
                    final Map<?, ?> subjectMap = (Map)subjectObj;
                    final String subjectNum = StringUtil.nvltoStr(subjectMap.get("subjectNum"), "");
                    final String classNum = StringUtil.nvltoStr(subjectMap.get("classNum"), "");
                    if (StringUtils.isEmpty(subjectNum) || StringUtils.isEmpty(classNum)) {
                        log.warn("subjectNum({}), classNum({}) parameter is empty.....", subjectNum, classNum);
                        continue;
                    }

                    // 과목 정보 셋팅 후 저장
                    dbParams.put("subjectNum", subjectNum);
                    dbParams.put("classNum", classNum);
                    insertExchangeInfo(dbParams);
                }
            }
        }


        return AppUtils.createDefaultResultMap();
    }

    private void insertExchangeInfo(final Map<String, Object> dbParams) throws Exception {
        final UMap<String, Object> infoMap = subjectDao.getSubjectInfo(dbParams);
        if (infoMap == null) {
            log.warn("db subject info is null : univCode({}), year({}), semesterCode({}), subjectNum({}), classNum({})",
                    dbParams.get("univCode"), dbParams.get("year"), dbParams.get("semesterCode"),
                    dbParams.get("subjectNum"), dbParams.get("classNum"));
            return;
        }

        dbParams.put("subjectGradeCode", infoMap.get("subjectGradeCode"));
        dbParams.put("completeType", infoMap.get("completeType"));
        dbParams.put("subjectName", infoMap.get("subjectName"));
        dbParams.put("subjectDepartment", infoMap.get("department"));
        dbParams.put("subjectPoint", infoMap.get("subjectPoint"));
        dbParams.put("teacherName", infoMap.get("teacherName"));
        exchangeDao.saveExchangeInfo(dbParams);
    }
}
