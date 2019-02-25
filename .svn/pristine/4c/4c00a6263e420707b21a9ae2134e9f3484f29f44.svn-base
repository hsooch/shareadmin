package shared.university.admin.service;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;
import shared.university.admin.component.excel.ExcelComponent;
import shared.university.admin.component.excel.ExcelFeature;
import shared.university.admin.component.excel.ExcelReader;
import shared.university.admin.dao.SubjectDao;
import shared.university.admin.domain.UserSession;
import shared.university.admin.feature.SubjectListExcelFeatrue;
import shared.university.admin.feature.UploadSubjectListExcelFeature;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.ObjectUtil;
import shared.university.admin.utils.StringUtil;

/**
 * Created on 2018. 5. 11.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Service
@Slf4j
public class SubjectService {
	
	@Autowired
	private SubjectDao subjectDao;
	
	@Autowired
	private ExcelComponent excelComponent;
	
	/**
     * 학기 목록 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	public Map<String, Object> getSubjectList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UMap<String, Object>> subjectList = subjectDao.getSubjectList(paramMap);
		
		resultMap.put("subjectList", subjectList);
		
		return resultMap;
	}
	
	/**
     * 학기 정보 저장(등록/수정)
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 대상 회원 정보
     * @return resultMap Map<String, Object> 결과맵
     * @throws Exception java.lang
     */
	public Map<String, Object> saveSubjectInfo(HttpServletRequest request, Map<String, Object> paramMap,
			List<Integer> subjectTimeSeqList,
			List<Integer> dayOfWeekList,
			List<String> startTimeList,
			List<String> endTimeList,
			List<String> classRoomList
			) throws Exception{
		log.info("init saveSubjectInfo");
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("modUserSeq", session.getUserSeq());
		
		for(Map.Entry<String, Object> val : paramMap.entrySet()){
            log.debug("#### val.getKey() => {}, val.getValue() => {}",val.getKey(), val.getValue());
        }
		
		// 기존 데이터 확인
		/*
		if(subjectDao.getSubjectInfo(paramMap) != null){ //중복된 과목 조회
			// 중복된 학기가 있을때.
			return AppUtils.createDefaultResultMap(ResultCode.SUBJECT_INFO_ALREADY);
		}else{
		*/
			//과목정보 저장
			subjectDao.upsertSubjectInfo(paramMap);
			
			//삭제할 요일 및 시간 정보가 있을때
			if(paramMap.get("removeSubjectTimeSeqList") != null){
				String[] removeSubjectTimeSeqArr = StringUtil.nvltoStr(paramMap.get("removeSubjectTimeSeqList"), "").split(",");
				if(removeSubjectTimeSeqArr.length > 0){
					paramMap.remove("removeSubjectTimeSeq");
					paramMap.put("removeSubjectTimeSeqArr", removeSubjectTimeSeqArr);
					subjectDao.deleteSubjectTimeInfo(paramMap);
				}
			}
			
			//요일 및 시간 정보 저장
			if(subjectTimeSeqList.size() > 0){
				for(int i = 0; i<subjectTimeSeqList.size(); i++){
					Map<String, Object> paramMap2 = Maps.newHashMap();
					paramMap2.put("semesterCode", paramMap.get("semesterCode"));
					paramMap2.put("year", paramMap.get("year"));
					paramMap2.put("univCode", paramMap.get("univCode"));
					paramMap2.put("subjectNum", paramMap.get("subjectNum"));
					paramMap2.put("classNum", paramMap.get("classNum"));
					paramMap2.put("newSubjectNum", paramMap.get("newSubjectNum"));
					paramMap2.put("newClassNum", paramMap.get("newClassNum"));
					paramMap2.put("subjectTimeSeq", subjectTimeSeqList.get(i) == 0 ? null : subjectTimeSeqList.get(i));
					paramMap2.put("dayOfWeek", dayOfWeekList.get(i));
					paramMap2.put("startTime", startTimeList.get(i));
					paramMap2.put("endTime", endTimeList.get(i));
					paramMap2.put("classRoom", classRoomList.get(i));
					
					subjectDao.upsertSubjectTimeInfo(paramMap2);
				}
			}
		/*}*/
		return AppUtils.createDefaultResultMap();
	}
	
	/**
     * 학기 정보 조회
     * @param paramMap 학기 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public Map<String, Object> getSubjectInfo(Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        
        if(StringUtil.objectIfEmpty(paramMap.get("univCode"))
	        	|| StringUtil.objectIfEmpty(paramMap.get("year"))
	        	|| StringUtil.objectIfEmpty(paramMap.get("semesterCode"))
	        	|| StringUtil.objectIfEmpty(paramMap.get("subjectNum"))
	        	|| StringUtil.objectIfEmpty(paramMap.get("classNum"))) {
        	return AppUtils.createDefaultResultMap(ResultCode.REQUIRED_PARAMETERS);
        }
    	
    	resultMap.put("subjectInfo", subjectDao.getSubjectInfo(paramMap));
    	return resultMap;
    }
    
	/**
     * 학기 정보 삭제
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 대상 회원 정보
     * @return resultMap Map<String, Object> 결과맵
     * @throws Exception java.lang
     */
	public Map<String, Object> deleteSubjectInfo(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		log.info("init deleteSubjectInfo");
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("modUserSeq", session.getUserSeq());
		
		/* 수강신청한 이력이 있는 과목 조회 추가하기 */
		
		subjectDao.deleteSubjectInfo(paramMap);
		
		subjectDao.deleteSubjectTimeInfo(paramMap);
		
		return resultMap;
	}
	
	/**
	 * 학기 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	public void downloadSubjectList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UMap<String, Object>> subjectList = subjectDao.getSubjectListForExcel(paramMap);
		
		final String fileName = Const.EXCEL_FILE_NAME_SEMSETER_SUBJECT_LIST;
		
		ExcelFeature featrue = new SubjectListExcelFeatrue();
		
		paramMap.put("excelList", subjectList);
		paramMap.put("fileName", fileName);
		
		excelComponent.excelDownLoad(response, featrue, paramMap);
	}
	
	/**
     * 학기 과목 일괄업로드
     * @param mFile MultipartFile 첨부파일
     * @param request
     * @return resultMap 조회결과
     */
	public Map<String, Object> saveSubjectWithFile(MultipartFile mFile, Map<String, Object> paramMap, HttpServletRequest request) throws Exception{
		log.info("init saveSubjectWithFile");
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        log.info("User Session => {}", session);
        //paramMap.put("modUserSeq", session.getUserSeq());
        
        if( StringUtil.objectIfEmpty(paramMap.get("semesterCode")) ){
        	log.error("semesterCode is Empty");
        	return AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
        }
        if(	StringUtil.objectIfEmpty(paramMap.get("year")) ){
        	log.error("year is Empty");
        	return AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
        }
        if(	StringUtil.objectIfEmpty(paramMap.get("univCode")) ){
        	log.error("univCode is Empty");
        	return AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
        }
        
        if(mFile != null) {

			File excelFile = new File(mFile.getOriginalFilename());
			mFile.transferTo(excelFile);
			
			ExcelReader reader = new ExcelReader(excelFile);
			reader.setEncoder(new UploadSubjectListExcelFeature());
			
			List<Map<String, Object>> checkResultList = reader.checkValidation(); // 유효성 체크 읽기 오류가 발견된 row 목록을 받음. 
			log.debug("checkResultList.size() => {}", checkResultList.size());
			if(checkResultList.size() > 0){
				int nomalCnt = 0;
				for (Map<String, Object> checkResultInfo : checkResultList) {
					log.debug("checkResultInfo => {}"+checkResultInfo);
					Map<String, Object> failMap = ObjectUtil.ConverObjectToMap(checkResultInfo.get("failMap"));
					if(failMap.containsKey("classNum")){
						nomalCnt++;
					}
				}
				
				if(nomalCnt > 0){
					final Map<String, Object> resultMap2 = AppUtils.createDefaultResultMap(ResultCode.ETC_SERVER_ERROR);
					resultMap2.put("checkResultList", checkResultList);
					return resultMap2;
				}
				
				resultMap.put("nomalCnt", nomalCnt);
			}
			
			int sheetIdx = 0;
			try{
				log.debug("sheetIdx => {}",sheetIdx);
				int rowCnt = reader.getValidRowCount(sheetIdx);
				if(rowCnt < 1)
					rowCnt = 1;
				
				int SuccessCnt = 0;
				int FailCnt = 0;
				for(Row row : reader.getWorkbook().getSheetAt(sheetIdx)){
					
					int rowNum = row.getRowNum();
					if(rowNum == rowCnt){
						break;
					}
					Map<String, Object> excelMap = reader.toMap(sheetIdx, rowNum);
					if(excelMap != null){
						log.debug(excelMap.toString());
						if(session != null)
							excelMap.put("modUserSeq", session.getUserSeq());
						
						excelMap.put("semesterCode", paramMap.get("semesterCode"));
						excelMap.put("year", paramMap.get("year"));
						excelMap.put("univCode", paramMap.get("univCode"));
						excelMap.put("subjectGradeCode", Const.SUBJECT_GRADE_CODE[Integer.valueOf(StringUtil.nvltoStr(excelMap.get("subjectGradeCode"),"1"))-1]);
						int resultValue = upsertSubjectData(excelMap);

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
			
			/*
			// 현재 날짜 가져오기
	        final Calendar cal = Calendar.getInstance();

	        // 파일을 저장할 경로를 확인 후 존재하지 않을 경우 생성한다.
	        final SimpleDateFormat sdf = new SimpleDateFormat("/yyyy/MM/dd");
	        final String datePath = sdf.format(cal.getTime());
	        final Path uploadPath = Paths.get(AppProperties.getProperty("ckeditor.image.upload.base.dir")
	                + datePath);
	        log.info("Upload Dir => {}", uploadPath.toAbsolutePath());
	        if (!Files.isDirectory(uploadPath)) {
	            Files.createDirectories(uploadPath);
	        }

	        // 신규 파일명 생성
	        final String fileKey = MDC.get(Const.MDC_LOG_KEY);
	        final String fileExtension = com.google.common.io.Files.getFileExtension(mFile.getOriginalFilename());
	        final String newFileName = fileKey + "." + fileExtension;
	        log.info("Save File Name => {}", newFileName);

	        // 파일 저장
			reader.saveResultExcel(uploadPath.toString()+"/", newFileName);
			*/
		}
        
        return resultMap;
	}
	
	private int upsertSubjectData(Map<String, Object> excelMap){
		if(excelMap == null)
			return 0;

		int resultValue = 0;
		try{
			
			//요일 및 시간 정보 파라미터
			List<Integer> dayOfWeekList = Lists.newArrayList();
			List<String> startTimeList = Lists.newArrayList();
			List<String> endTimeList = Lists.newArrayList();
			List<String> classRoomList = Lists.newArrayList();
			
			String[] subjectTimeInfoArr = StringUtil.nvltoStr(excelMap.get("subjectTimeInfo"), "").split(", ");
			String[] classRoomArr = StringUtil.nvltoStr(excelMap.get("classRoom"), "").split(", ");
			String lastClassRoom = null;
			
			//요일 및 시간 정보 저장
	    	for (int j = 0; j < subjectTimeInfoArr.length; j++){
	    		String subjectTimeInfo = subjectTimeInfoArr[j];
	    		String classRoom = null;
	    		if(j < classRoomArr.length){
	    			classRoom = classRoomArr[j];
	    		}else{
	    			classRoom = lastClassRoom;
	    		}
	    		lastClassRoom = classRoom;
	    		
	    		subjectTimeInfo = subjectTimeInfo.replaceAll("\\s", "");
				if(Pattern.matches("(\\S)+\\d{2}:\\d{2}~\\d{2}:\\d{2}", subjectTimeInfo)){
					String dayOfWeekFull = subjectTimeInfo.replaceAll("[^A-Za-z가-힣]", "");
					String startEndTime = subjectTimeInfo.replaceAll("[A-Za-z가-힣]", "");
					String startTime = null;
					String endTime = null;
					String startTimeHour = null;
					String startTimeMinute = null;
					String endTimeHour = null;
					String endTimeMinute = null;
					
					if(Pattern.matches("\\d{2}:\\d{2}~\\d{2}:\\d{2}", startEndTime)){
						startTime = startEndTime.split("[~]")[0];
						endTime = startEndTime.split("[~]")[1];
						
						startTimeHour = startTime.split("[:]")[0];
						startTimeMinute = startTime.split("[:]")[1];
						endTimeHour = endTime.split("[:]")[0];
						endTimeMinute = endTime.split("[:]")[1];
					}
					
					for (int i = 0; i < dayOfWeekFull.length(); i++) {
						log.debug("dayOfWeek step.2 => {}", dayOfWeekFull.charAt(i));
						switch(dayOfWeekFull.charAt(i)){
							case '일':
								dayOfWeekList.add(1);
								break;
							case '월':
								dayOfWeekList.add(2);
								break;
							case '화':
								dayOfWeekList.add(3);
								break;
							case '수':
								dayOfWeekList.add(4);
								break;
							case '목':
								dayOfWeekList.add(5);
								break;
							case '금':
								dayOfWeekList.add(6);
								break;
							case '토':
								dayOfWeekList.add(7);
								break;
						}
						startTimeList.add(startTimeHour+startTimeMinute);
						endTimeList.add(endTimeHour+endTimeMinute);
						classRoomList.add(classRoom);
						
					}
					
					
				}else{
					log.error("this matches is false => {}", subjectTimeInfo);
				}
			}
			
	    	//과목정보 저장
			subjectDao.upsertSubjectInfo(excelMap);
			
			//삭제할 요일 및 시간 정보가 있을때
			subjectDao.deleteSubjectTimeInfo(excelMap);
			
			if(dayOfWeekList != null){
				if(dayOfWeekList.size() > 0){
					for(int i = 0; i<dayOfWeekList.size(); i++){
						Map<String, Object> excelMap2 = Maps.newHashMap();
						excelMap2.put("semesterCode", excelMap.get("semesterCode"));
						excelMap2.put("year", excelMap.get("year"));
						excelMap2.put("univCode", excelMap.get("univCode"));
						excelMap2.put("subjectNum", excelMap.get("subjectNum"));
						excelMap2.put("classNum", excelMap.get("classNum"));
						excelMap2.put("newSubjectNum", excelMap.get("newSubjectNum"));
						excelMap2.put("newClassNum", excelMap.get("newClassNum"));
						excelMap2.put("dayOfWeek", dayOfWeekList.get(i));
						excelMap2.put("startTime", startTimeList.get(i));
						excelMap2.put("endTime", endTimeList.get(i));
						excelMap2.put("classRoom", classRoomList.get(i));
						
						subjectDao.upsertSubjectTimeInfo(excelMap2);
					}
				}
			}
			resultValue = 1;
		}catch(Exception e){
			log.debug("[[Fail to upsert subject row data]]");
		}
		
		return resultValue;
	}
	
}
