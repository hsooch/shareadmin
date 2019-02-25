package shared.university.admin.service;

import java.io.File;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.AppProperties;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;
import shared.university.admin.component.excel.ExcelComponent;
import shared.university.admin.component.excel.ExcelFeature;
import shared.university.admin.component.excel.ExcelReader;
import shared.university.admin.dao.ExchangeResultDao;
import shared.university.admin.dao.UniversityDao;
import shared.university.admin.domain.UniversityInfo;
import shared.university.admin.domain.UserSession;
import shared.university.admin.feature.ExchangeResultInListExcelFeatrue;
import shared.university.admin.feature.ExchangeResultOutListExcelFeatrue;
import shared.university.admin.feature.RegistScoreInListExcelFeatrue;
import shared.university.admin.feature.StudentHistoryInListExcelFeatrue;
import shared.university.admin.feature.StudentHistoryOutListExcelFeatrue;
import shared.university.admin.feature.UploadExchangeResultListExcelFeature;
import shared.university.admin.feature.UploadRegistScoreListExcelFeature;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.StringUtil;

/**
 * Created on 2018. 6. 7.
 *
 * @author 스퀘어네트(진태희)
 * @since JDK1.7
 */
@Service
@Slf4j
public class ExchangeResultService {

    @Autowired
    private ExchangeResultDao exchangeResultDao;

    @Autowired
    private UniversityDao universityDao;

	@Autowired
    private ExcelComponent excelComponent;
	
	/**
     * 수강결과 등록 목록 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	public Map<String, Object> getExchangeResultList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		resultMap.put("exchangeResultList", exchangeResultDao.getExchangeResultList(paramMap));
		
		return resultMap;
	}
	
	/**
     * 수강결과 정보 조회
     * @param paramMap 수강결과 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public Map<String, Object> getExchangeResultInfo(Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	
    	resultMap.put("exchangeResultInfo", exchangeResultDao.getExchangeResultInfo(paramMap));
    	return resultMap;
    }
    
    /**
	 *	수강결과 등록 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public void downloadExchangeResultInList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UMap> exchangeResultList = exchangeResultDao.getExchangeResultList(paramMap);
		
		List<Map<String, Object>> excelList = Lists.newArrayList();
		
		for(UMap vo : exchangeResultList){
			//log.debug(vo.toString());
			Map<String, Object> row = Maps.newHashMap();
			row.put("resultRegDt", vo.getString("resultRegDt"));
			row.put("userUnivCodeName", vo.getString("userUnivCodeName"));
			row.put("userDepartment", vo.getString("userDepartment"));
			row.put("studentGradeCodeName", vo.getString("studentGradeCodeName"));
			row.put("studentNumber", vo.getString("studentNumber"));
			row.put("userName", vo.getString("userName"));
			row.put("subjectNum", vo.getString("subjectNum"));
			row.put("subjectName", vo.getString("subjectName"));
			row.put("subjectPoint", vo.getString("subjectPoint"));
			row.put("classNum", vo.getString("classNum"));
			row.put("applyResultStatus", vo.getString("applyResultStatus"));
			excelList.add(row);
		}
		
		final String fileName = Const.EXCEL_FILE_NAME_EXCHANGE_RESULT_IN_LIST;
		
		ExcelFeature featrue = new ExchangeResultInListExcelFeatrue();
		
		paramMap.put("excelList", excelList);
		paramMap.put("fileName", fileName);
		
		excelComponent.excelDownLoad(response, featrue, paramMap);
	}
	
	/**
     * 수강결과 등록(IN) 일괄업로드
     * @param mFile MultipartFile 첨부파일
     * @param request
     * @return resultMap 조회결과
     */
	public Map<String, Object> uploadExchangeResultData(MultipartFile mFile, Map<String, Object> paramMap, HttpServletRequest request) throws Exception{
		//log.info("init uploadExchangeResultData");
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        //log.info("User Session => {}", session);
        
        if(	StringUtil.objectIfEmpty(paramMap.get("univCode")) ){
        	//log.error("univCode is Empty");
        	return AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
        }
        if(	StringUtil.objectIfEmpty(paramMap.get("year")) ){
        	//log.error("year is Empty");
        	return AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
        }
        if( StringUtil.objectIfEmpty(paramMap.get("semesterCode")) ){
        	//log.error("semesterCode is Empty");
        	return AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
        }
        String univCode = String.valueOf(paramMap.get("univCode"));
        String year = String.valueOf(paramMap.get("year"));
        String semesterCode = String.valueOf(paramMap.get("semesterCode"));
        
        if(mFile != null) {

			File excelFile = new File(mFile.getOriginalFilename());
			mFile.transferTo(excelFile);
			
			ExcelReader reader = new ExcelReader(excelFile);
			reader.setEncoder(new UploadExchangeResultListExcelFeature());
			
			List<Map<String, Object>> checkResultList = reader.checkValidation(); // 유효성 체크 읽기 오류가 발견된 row 목록을 받음. 
			if(checkResultList.size() > 0){
				final Map<String, Object> resultMap2 = AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
				resultMap2.put("checkResultList", checkResultList);
				return resultMap2;
			}

			int sheetIdx = 0;
			try{
				//log.debug("sheetIdx => {}",sheetIdx);
				int rowCnt = reader.getValidRowCount(sheetIdx);
				if(rowCnt < 1)
					rowCnt = 1;
				
				// 엑셀에 등록된 데이터의 존재 여부 확인
				/*checkResultList = new ArrayList<Map<String, Object>>();
				for(Row row : reader.getWorkbook().getSheetAt(sheetIdx)){
					
					int rowNum = row.getRowNum();
					if(rowNum == rowCnt){
						break;
					}

					Map<String, Object> excelMap = reader.toMap(sheetIdx, rowNum);
					excelMap.put("univCode", univCode);
					excelMap.put("year", year);
					excelMap.put("semesterCode", semesterCode);
					List<String> failCellList = new ArrayList<String>();

					Map<String, Object> checkMap = exchangeResultDao.checkUploadExchangeResultData(excelMap);

					if("N".equals(checkMap.get("isUniv")) || "N".equals(checkMap.get("isSubj")) || "N".equals(checkMap.get("isChngSubj"))) {
						// 입력한 대학 행정 코드가 시스템에 없음
						if("N".equals(checkMap.get("isUniv"))) {
							failCellList.add("userUnivName");
						}
						// 입력한 교과 정보가 시스템에 없음
						if("N".equals(checkMap.get("isSubj"))) {
							failCellList.add("subjectNum");
							failCellList.add("classNum");
						}
						// 입력한 변경 교과 정보가 시스템에 없음
						if("N".equals(checkMap.get("isChngSubj"))) {
							failCellList.add("changeSubjectNum");
							failCellList.add("changeClassNum");
						}
						checkMap.put("failMap", excelMap);
						checkMap.put("failCellList", failCellList);
						checkResultList.add(checkMap);
					}
				}
				if(checkResultList.size() > 0){
					final Map<String, Object> resultMap2 = AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
					resultMap2.put("checkResultList", checkResultList);
					return resultMap2;
				}*/

				if(session != null) {
					paramMap.put("modUserSeq", session.getUserSeq());
				}
				// 데이터 초기화
				exchangeResultDao.initExchangeResultList(paramMap);
				
				int SuccessCnt = 0;
				int FailCnt = 0;
				for(Row row : reader.getWorkbook().getSheetAt(sheetIdx)){
					
					int rowNum = row.getRowNum();
					if(rowNum == rowCnt){
						break;
					}
					Map<String, Object> excelMap = reader.toMap(sheetIdx, rowNum);
					if(excelMap != null){
						//log.debug(excelMap.toString());
						if(session != null)
							excelMap.put("modUserSeq", session.getUserSeq());
						
						excelMap.put("univCode",			univCode);
						excelMap.put("year",				year);
						excelMap.put("semesterCode",		semesterCode);
						excelMap.put("userUnivName",		excelMap.get("userUnivName"));
						excelMap.put("studentNumber",		excelMap.get("studentNumber"));
						excelMap.put("subjectNum",			excelMap.get("subjectNum"));
						excelMap.put("classNum",			excelMap.get("classNum"));
						excelMap.put("changeSubjectNum",	excelMap.get("changeSubjectNum"));
						excelMap.put("changeClassNum",		excelMap.get("changeClassNum"));
						excelMap.put("userName",			excelMap.get("userName"));
						excelMap.put("userGrade",			excelMap.get("userGrade"));
						excelMap.put("changeCompleteType",	excelMap.get("changeCompleteType"));
						excelMap.put("changeSubjectName",	excelMap.get("changeSubjectName"));
						excelMap.put("changeSubjectPoint",	excelMap.get("changeSubjectPoint"));

						int resultValue = exchangeResultDao.upsertExchangeResultInfo(excelMap);

						if(resultValue > 0)
							SuccessCnt++;
						else
							FailCnt++;
						
					}
				}
				
				resultMap.put("allCount", rowCnt);
				resultMap.put("succCount", SuccessCnt);
				resultMap.put("failCount", FailCnt);
			}catch(Exception e){
				//log.debug(e.getMessage());
				excelFile.delete();
				throw e;
			}

			excelFile.delete();
		}
        
        return resultMap;
	}
	
	/**
     * 업로드 수강결과 정합성 체크
     * @param paramMap 엑셀 업로드 수강결과 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public Map<String, Object> checkUploadExchangeResultData(Map<String, Object> paramMap) throws Exception{
    	return exchangeResultDao.checkUploadExchangeResultData(paramMap);
    }
	
    /**
	 *	수강결과 조회(OUT) 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public void downResultOutList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UMap> exchangeResultList = exchangeResultDao.getExchangeResultList(paramMap);
		
		List<Map<String, Object>> excelList = Lists.newArrayList();
		
		for(UMap vo : exchangeResultList){
			//log.debug(vo.toString());
			Map<String, Object> row = Maps.newHashMap();
			row.put("resultRegDt", vo.getString("resultRegDt"));
			row.put("userDepartment", vo.getString("userDepartment"));
			row.put("studentGradeCodeName", vo.getString("studentGradeCodeName"));
			row.put("studentNumber", vo.getString("studentNumber"));
			row.put("userName", vo.getString("userName"));
			row.put("univCodeName", vo.getString("univCodeName"));
			row.put("subjectNum", vo.getString("subjectNum"));
			row.put("subjectName", vo.getString("subjectName"));
			row.put("subjectPoint", vo.getString("subjectPoint"));
			row.put("classNum", vo.getString("classNum"));
			row.put("applyResultStatus", vo.getString("applyResultStatus"));
			excelList.add(row);
		}
		
		final String fileName = Const.EXCEL_FILE_NAME_EXCHANGE_RESULT_OUT_LIST;
		
		ExcelFeature featrue = new ExchangeResultOutListExcelFeatrue();
		
		paramMap.put("excelList", excelList);
		paramMap.put("fileName", fileName);
		
		excelComponent.excelDownLoad(response, featrue, paramMap);
	}
	
	/**
     * 학생별 이력 목록(OUT) 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	public Map<String, Object> getStudentOutList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		resultMap.put("studentOutList", exchangeResultDao.getStudentOutList(paramMap));
		return resultMap;
	}
	
	/**
	 * 학생별 이력(OUT) 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public void downStudentOutList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		List<UMap> studentOutList = exchangeResultDao.getStudentOutList(paramMap);
		List<Map<String, Object>> excelList = Lists.newArrayList();
		for(UMap vo : studentOutList){
			//log.debug(vo.toString());
			Map<String, Object> row = Maps.newHashMap();
			row.put("userName", vo.getString("userName"));
			row.put("userUnivCodeName", vo.getString("userUnivCodeName"));
			row.put("year", vo.getString("year") + "년도 " + vo.getString("semesterCodeName"));
			row.put("userDepartment", vo.getString("userDepartment"));
			row.put("studentGradeCodeName", vo.getString("studentGradeCodeName"));
			row.put("studentNumber", vo.getString("studentNumber"));
			row.put("univCodeName", vo.getString("univCodeName"));
			row.put("subjectNum", vo.getString("subjectNum"));
			row.put("subjectName", vo.getString("subjectName"));
			row.put("subjectPoint", vo.getString("subjectPoint"));
			row.put("classNum", vo.getString("classNum"));
			row.put("mouStudentNumber", vo.getString("mouStudentNumber"));
			row.put("resultRegDt", vo.getString("resultRegDt"));
			excelList.add(row);
		}
		final String fileName = Const.EXCEL_FILE_NAME_STUDENT_HISTORY_OUT_LIST;
		ExcelFeature featrue = new StudentHistoryOutListExcelFeatrue();
		paramMap.put("excelList", excelList);
		paramMap.put("fileName", fileName);
		excelComponent.excelDownLoad(response, featrue, paramMap);
	}
	
	/**
     * 학생별 이력 목록(IN) 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	public Map<String, Object> getStudentInList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		resultMap.put("studentInList", exchangeResultDao.getStudentInList(paramMap));
		return resultMap;
	}
	
	/**
	 * 학생별 이력(IN) 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public void downStudentInList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		List<UMap> studentInList = exchangeResultDao.getStudentInList(paramMap);
		List<Map<String, Object>> excelList = Lists.newArrayList();
		for(UMap vo : studentInList){
			//log.debug(vo.toString());
			Map<String, Object> row = Maps.newHashMap();
			row.put("userName", vo.getString("userName"));
			row.put("userUnivCodeName", vo.getString("userUnivCodeName"));
			row.put("year", vo.getString("year") + "년도 " + vo.getString("semesterCodeName"));
			row.put("userDepartment", vo.getString("userDepartment"));
			row.put("studentGradeCodeName", vo.getString("studentGradeCodeName"));
			row.put("studentNumber", vo.getString("studentNumber"));
			row.put("univCodeName", vo.getString("univCodeName"));
			row.put("subjectNum", vo.getString("subjectNum"));
			row.put("subjectName", vo.getString("subjectName"));
			row.put("subjectPoint", vo.getString("subjectPoint"));
			row.put("classNum", vo.getString("classNum"));
			row.put("mouStudentNumber", vo.getString("mouStudentNumber"));
			row.put("scoreRegDt", vo.getString("scoreRegDt"));
			excelList.add(row);
		}
		final String fileName = Const.EXCEL_FILE_NAME_STUDENT_HISTORY_IN_LIST;
		ExcelFeature featrue = new StudentHistoryInListExcelFeatrue();
		paramMap.put("excelList", excelList);
		paramMap.put("fileName", fileName);
		excelComponent.excelDownLoad(response, featrue, paramMap);
	}
	
	/**
     * 성적 정보 저장
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 성적 정보
     * @return resultMap 조회결과
     */
    public Map<String, Object> saveScore(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);

		paramMap.put("scoreRegUserSeq", session.getUserSeq());

		exchangeResultDao.saveScore(paramMap);

		return resultMap;
    }
    
    /**
	 *	성적등록(IN) 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public void downRegistScoreInList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UMap> exchangeResultList = exchangeResultDao.getExchangeResultList(paramMap);
		
		List<Map<String, Object>> excelList = Lists.newArrayList();
		ExcelFeature featrue = null;

		// 목록화면에서 엑셀다운 버튼의 처리
		if("download".equals(paramMap.get("excelType"))) {
			for(UMap vo : exchangeResultList){
				//log.debug(vo.toString());
				Map<String, Object> row = Maps.newHashMap();
				row.put("scoreRegDt", vo.getString("scoreRegDt"));
				row.put("userUnivCodeName", vo.getString("userUnivCodeName"));
				row.put("userDepartment", vo.getString("userDepartment"));
				row.put("studentGradeCodeName", vo.getString("studentGradeCodeName"));
				row.put("studentNumber", vo.getString("studentNumber"));
				row.put("userName", vo.getString("userName"));
				row.put("subjectNum", vo.getString("subjectNum"));
				row.put("subjectName", vo.getString("subjectName"));
				row.put("subjectPoint", vo.getString("subjectPoint"));
				row.put("classNum", vo.getString("classNum"));
				row.put("score", vo.getString("score"));
				excelList.add(row);
			}
			
			featrue = new RegistScoreInListExcelFeatrue();
			
			paramMap.put("excelList", excelList);
			paramMap.put("fileName", Const.EXCEL_FILE_NAME_REGIST_SCORE_IN_LIST);

			excelComponent.excelDownLoad(response, featrue, paramMap);

		// 목록화면에서 일괄등록양식 다운로드 버튼의 처리
		} else if("upload".equals(paramMap.get("excelType"))) {
			String fileURL = AppProperties.getProperty("admin.server.domain") + paramMap.get("filePath");

			URL url = new URL(fileURL);
	        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
	        int responseCode = httpConn.getResponseCode();
	        
	        if(responseCode == HttpURLConnection.HTTP_OK) {
	 
				for(UMap vo : exchangeResultList){
					//log.debug(vo.toString());
					Map<String, Object> row = Maps.newHashMap();
					row.put("userUnivCodeName", vo.getString("userUnivCodeName"));
					row.put("userUnivCode", vo.getString("userUnivCode"));
					row.put("studentNumber", vo.getString("studentNumber"));
					row.put("userName", vo.getString("userName"));
					row.put("subjectNum", vo.getString("subjectNum"));
					row.put("completeType", vo.getString("completeType"));
					row.put("subjectName", vo.getString("subjectName"));
					row.put("subjectPoint", vo.getString("subjectPoint"));
					row.put("classNum", vo.getString("classNum"));
					row.put("subjectDepartment", vo.getString("subjectDepartment"));
					row.put("teacherName", vo.getString("teacherName"));
					row.put("mouStudentNumber", vo.getString("mouStudentNumber"));
					row.put("subjectNameEn", vo.getString("subjectNameEn"));
					row.put("score", vo.getString("score"));
					excelList.add(row);
				}
				
				featrue = new UploadRegistScoreListExcelFeature();
				
				paramMap.put("excelList", excelList);
				paramMap.put("fileName", Const.EXCEL_FILE_NAME_REGIST_SCORE_UPLOAD_LIST);
	
				excelComponent.excelDownLoad(response, httpConn.getInputStream(), featrue, paramMap);
	        }
		}
		
	}
	
	/**
     * 성적등록(IN) 일괄업로드
     * @param mFile MultipartFile 첨부파일
     * @param request HttpServletRequest 세션 정보 확인용
     * @return resultMap 조회결과
     */
	public Map<String, Object> uploadScoreData(MultipartFile mFile, Map<String, Object> paramMap, HttpServletRequest request) throws Exception{
		//log.info("init uploadScoreData");
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        
        if(	StringUtil.objectIfEmpty(paramMap.get("univCode")) ){
        	//log.error("univCode is Empty");
        	return AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
        }
        if(	StringUtil.objectIfEmpty(paramMap.get("year")) ){
        	//log.error("year is Empty");
        	return AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
        }
        if( StringUtil.objectIfEmpty(paramMap.get("semesterCode")) ){
        	//log.error("semesterCode is Empty");
        	return AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
        }
        String univCode = String.valueOf(paramMap.get("univCode"));
        String year = String.valueOf(paramMap.get("year"));
        String semesterCode = String.valueOf(paramMap.get("semesterCode"));
        
        if(mFile != null) {

			File excelFile = new File(mFile.getOriginalFilename());
			mFile.transferTo(excelFile);
			
			ExcelReader reader = new ExcelReader(excelFile);
			reader.setEncoder(new UploadRegistScoreListExcelFeature());
			
			List<Map<String, Object>> checkResultList = reader.checkValidation(); // 유효성 체크 읽기 오류가 발견된 row 목록을 받음. 
			if(checkResultList.size() > 0){
				final Map<String, Object> resultMap2 = AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
				resultMap2.put("checkResultList", checkResultList);
				return resultMap2;
			}

			int sheetIdx = 0;
			try{
				//log.debug("sheetIdx => {}",sheetIdx);
				int rowCnt = reader.getValidRowCount(sheetIdx);
				if(rowCnt < 1)
					rowCnt = 1;

				// 데이터 초기화
				if(session != null)
					paramMap.put("modUserSeq", session.getUserSeq());
				
				int SuccessCnt = 0;
				int FailCnt = 0;
				for(Row row : reader.getWorkbook().getSheetAt(sheetIdx)){
					
					int rowNum = row.getRowNum();
					if(rowNum == rowCnt){
						break;
					}

					Map<String, Object> excelMap = reader.toMap(sheetIdx, rowNum);
					if(excelMap != null){
						//log.debug(excelMap.toString());
						if(session != null)
							excelMap.put("scoreRegUserSeq", session.getUserSeq());
						
						excelMap.put("univCode",		univCode);
						excelMap.put("year",			year);
						excelMap.put("semesterCode",	semesterCode);
						excelMap.put("userUnivName",	excelMap.get("userUnivName"));
						excelMap.put("studentNumber",	excelMap.get("studentNumber"));
						excelMap.put("userName",		excelMap.get("userName"));
						excelMap.put("userGrade",		excelMap.get("userGrade"));
						excelMap.put("subjectNum",		excelMap.get("subjectNum"));
						excelMap.put("completeType",	excelMap.get("completeType"));
						excelMap.put("subjectName",		excelMap.get("subjectName"));
						excelMap.put("subjectPoint",	excelMap.get("subjectPoint"));
						excelMap.put("classNum",		excelMap.get("classNum"));
						excelMap.put("mouStudentNumber",excelMap.get("mouStudentNumber"));
						excelMap.put("subjectNameEn",	excelMap.get("subjectNameEn"));
						excelMap.put("score",			String.valueOf(excelMap.get("score")));

						int resultValue = exchangeResultDao.upsertScore(excelMap);

						if(resultValue > 0)
							SuccessCnt++;
						else
							FailCnt++;
					}
				}
				
				resultMap.put("allCount", rowCnt);
				resultMap.put("succCount", SuccessCnt);
				resultMap.put("failCount", FailCnt);
			}catch(Exception e){
				log.debug(e.getMessage());
				excelFile.delete();
				throw e;
			}

			excelFile.delete();
		}
        
        return resultMap;
	}
	
	/**
     * 성적 등급 정보가 포함된 결과 목록 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	public Map<String, Object> getResultScoreList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
        
        if(StringUtil.objectIfEmpty(paramMap.get("searchUserUniv"))
	        	|| StringUtil.objectIfEmpty(paramMap.get("searchYear"))) {
        	return AppUtils.createDefaultResultMap(ResultCode.REQUIRED_PARAMETERS);
        }
		
		resultMap.put("exchangeResultList", exchangeResultDao.getResultScoreList(paramMap));
		
		return resultMap;
	}
	
    /**
	 *	성적조회(OUT) 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public void downRegistScoreOutList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UMap> exchangeResultList = exchangeResultDao.getResultScoreList(paramMap);
		
		List<Map<String, Object>> excelList = Lists.newArrayList();
		
		for(UMap vo : exchangeResultList){
			Map<String, Object> row = Maps.newHashMap();
			row.put("scoreRegDt", vo.getString("scoreRegDt"));
			row.put("userDepartment", vo.getString("userDepartment"));
			row.put("studentGradeCodeName", vo.getString("studentGradeCodeName"));
			row.put("studentNumber", vo.getString("studentNumber"));
			row.put("userName", vo.getString("userName"));
			row.put("univCodeName", vo.getString("univCodeName"));
			row.put("subjectNum", vo.getString("subjectNum"));
			row.put("subjectName", vo.getString("subjectName"));
			row.put("subjectPoint", vo.getString("subjectPoint"));
			row.put("classNum", vo.getString("classNum"));
			row.put("score", vo.getString("score"));
			row.put("gradeName", vo.getString("gradeName"));
			excelList.add(row);
		}
		
		final String fileName = Const.EXCEL_FILE_NAME_REGIST_SCORE_OUT_LIST;
		
		ExcelFeature featrue = new ExchangeResultOutListExcelFeatrue();
		
		paramMap.put("excelList", excelList);
		paramMap.put("fileName", fileName);
		
		excelComponent.excelDownLoad(response, featrue, paramMap);
	}
	
	/**
     * 성적 등급 전환 목록 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	public Map<String, Object> getGradeTranceList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		// 선택한 대학 정보
		resultMap.put("universityInfo", universityDao.getUniversityInfo(String.valueOf(paramMap.get("univCode"))));

		// 4.5만점 기준 등급 및 점수 목록
		paramMap.put("gradeType", "2");
		resultMap.put("gradeListType2", exchangeResultDao.getGradeTranceList(paramMap));

		// 4.3만점 기준 등급 및 점수 목록
		paramMap.put("gradeType", "3");
		resultMap.put("gradeListType3", exchangeResultDao.getGradeTranceList(paramMap));
		
		return resultMap;
	}
	
	/**
     * 성적 등급 전환 정보 저장
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 대상 회원 정보
     * @return resultMap Map<String, Object> 결과맵
     * @throws Exception java.lang
     */
	public Map<String, Object> saveGradeTranceInfo(HttpServletRequest request, Map<String, Object> paramMap,
			List<String> type2NameList,
			List<Integer> type2MinList,
			List<Integer> type2MaxList,
			List<String> type3NameList,
			List<Integer> type3MinList,
			List<Integer> type3MaxList
			) throws Exception{
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("modUserSeq", session.getUserSeq());
		
		/*for(Map.Entry<String, Object> val : paramMap.entrySet()){
            log.debug("#### val.getKey() => {}, val.getValue() => {}",val.getKey(), val.getValue());
        }*/

		final String univCode = String.valueOf(paramMap.get("univCode"));

		//대학 정보 변경
		final UniversityInfo universityInfo = new UniversityInfo();
		universityInfo.setUniversityCode(univCode);
		universityInfo.setGradeTranceType(Integer.parseInt(String.valueOf(paramMap.get("gradeTranceType"))));
		universityInfo.setModUserSeq(session.getUserSeq());
		universityDao.updateUniversityInfo(universityInfo);
		
		//선택한 대학의 성적 등급 전환 정보 전체 삭제
		exchangeResultDao.deleteGradeTraceAll(paramMap);
		
		//4.5만점 기준 등급 전환 설정 정보 저장
		final Map<String, Object> paramMap2 = Maps.newHashMap();
		if(type2NameList.size() > 0){
			for(int i = 0; i < type2NameList.size(); i++){
				paramMap2.put("univCode", univCode);
				paramMap2.put("gradeType", 2);
				paramMap2.put("gradeName", type2NameList.get(i));
				paramMap2.put("scoreMin", type2MinList.get(i));
				paramMap2.put("scoreMax", type2MaxList.get(i));
				
				exchangeResultDao.insertGradeTranceInfo(paramMap2);
			}
		}
		
		//4.3만점 기준 등급 전환 설정 정보 저장
		if(type3NameList.size() > 0){
			for(int i = 0; i < type3NameList.size(); i++){
				paramMap2.put("univCode", univCode);
				paramMap2.put("gradeType", 3);
				paramMap2.put("gradeName", type3NameList.get(i));
				paramMap2.put("scoreMin", type3MinList.get(i));
				paramMap2.put("scoreMax", type3MaxList.get(i));
				
				exchangeResultDao.insertGradeTranceInfo(paramMap2);
			}
		}

		return AppUtils.createDefaultResultMap();
	}

}
