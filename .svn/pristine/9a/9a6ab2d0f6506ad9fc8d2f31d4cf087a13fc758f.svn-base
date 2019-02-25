package shared.university.admin.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.AppException;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;
import shared.university.admin.component.excel.ExcelComponent;
import shared.university.admin.component.excel.ExcelFeature;
import shared.university.admin.dao.FileDao;
import shared.university.admin.dao.SemesterDao;
import shared.university.admin.domain.FileInfo;
import shared.university.admin.domain.SemesterVO;
import shared.university.admin.domain.UserSession;
import shared.university.admin.feature.SemesterListExcelFeatrue;
import shared.university.admin.feature.SemesterListWithGuideExcelFeatrue;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.StringUtil;

/**
 * Created on 2018. 5. 9.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Service
@Slf4j
public class SemesterService {
	
	@Autowired
	private SemesterDao semesterDao;
	
	@Autowired
	private ExcelComponent excelComponent;
	
	@Autowired
    private FileService fileService;

	@Autowired
    private FileDao fileDao;
	
	/**
     * 학기 목록 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	public Map<String, Object> getSemesterList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<SemesterVO> semesterList = semesterDao.getSemesterList(paramMap);
		
		resultMap.put("semesterList", semesterList);
		
		return resultMap;
	}
	
	/**
     * 학기 정보 저장(등록/수정)
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 대상 회원 정보
     * @return resultMap Map<String, Object> 결과맵
     * @throws Exception java.lang
     */
	public Map<String, Object> saveSemesterInfo(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		log.info("init saveSemesterInfo");
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("modUserSeq", session.getUserSeq());
		
		String toCheckList = (String)paramMap.get("toCheckList");
		
		// toCheckList가 있을때
		if(StringUtils.isNotEmpty(toCheckList)){
			semesterDao.upsertSemesterInfo(paramMap);
		}else{
			// toCheckList가 없을때
			
			// 기존 데이터 확인
			if(semesterDao.getSemesterInfo(paramMap) != null){ //중복된 학기 조회
				// 중복된 학기가 있을때.
				return AppUtils.createDefaultResultMap(ResultCode.SEMESTER_INFO_ALREADY);
			}else{
				String displayOverride = StringUtil.nvltoStr(paramMap.get("displayOverride"), "N"); //노출설정 학기 변경 여부
				paramMap.put("displayOverride", displayOverride);
				if(displayOverride.equals("N")){
					// 노출설정시 기존에 노출설정된 학기 정보 확인.
					String displayYn = StringUtil.nvltoStr(paramMap.get("displayYn"), "N"); 
					if(displayYn.equals("Y")){
						paramMap.put("searchType", "exposed");
						SemesterVO exposedInfo = semesterDao.getSemesterInfo(paramMap);
						
						if(exposedInfo != null){
							//기존에 노출설정된 타학기 정보가 있을때 - 타학기정보가 함께 결과리턴
							Map<String, Object> resultMap = AppUtils.createDefaultResultMap(ResultCode.SEMESTER_INFO_EXPOSED);
							resultMap.put("exposedInfo", exposedInfo);
							return resultMap;
						}
					}
				}else{
					if(!StringUtil.objectIfEmpty(paramMap.get("exposedUnivCode"))){
						// 기존에 노출설정된 학기 정보 미노출처리.
						Map<String, Object> paramMap2 = Maps.newHashMap();
						paramMap2.put("exposedUnivCode", paramMap.get("exposedUnivCode"));
						paramMap2.put("modUserSeq", paramMap.get("modUserSeq"));
						paramMap2.put("displayYn", "N");
						
						log.debug("paramMap2 data =>{}",paramMap2);
						//정상적으로 저장
						semesterDao.upsertSemesterInfo(paramMap2);
						
						paramMap.remove("exposedUnivCode");
					}
				}
			}
			
			//정상적으로 저장
			semesterDao.upsertSemesterInfo(paramMap);
		}
		return AppUtils.createDefaultResultMap();
	}
	
	/**
     * 학기 정보 조회
     * @param paramMap 학기 정보 조회 파라미터
     * @return resultMap 조회결과
     */
    public Map<String, Object> getSemesterInfo(Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	
    	String semesterCode = StringUtil.nvltoStr(paramMap.get("semesterCode"), "");
    	String univCode = StringUtil.nvltoStr(paramMap.get("univCode"), "");
    	String year = StringUtil.nvltoStr(paramMap.get("year"), "");
    	if(StringUtils.isEmpty(semesterCode) || StringUtils.isEmpty(univCode) || StringUtils.isEmpty(year)){
			log.error("parameter is invalid");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
    	
    	paramMap.put("searchType", "modify");
    	SemesterVO semesterInfo = semesterDao.getSemesterInfo(paramMap);
    	resultMap.put("semesterInfo", semesterInfo);
    	return resultMap;
    }
    
	/**
     * 학기 정보 삭제
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 대상 회원 정보
     * @return resultMap Map<String, Object> 결과맵
     * @throws Exception java.lang
     */
	public Map<String, Object> deleteSemesterInfo(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		log.info("init deleteSemesterInfo");
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
		
		paramMap.put("modUserSeq", session.getUserSeq());
		
		String semesterCode = StringUtil.nvltoStr(paramMap.get("semesterCode"), "");
    	String univCode = StringUtil.nvltoStr(paramMap.get("univCode"), "");
    	String year = StringUtil.nvltoStr(paramMap.get("year"), "");
    	if(StringUtils.isEmpty(semesterCode) || StringUtils.isEmpty(univCode) || StringUtils.isEmpty(year)){
			log.error("parameter is invalid");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
		
    	//등록된 학기 정보를 사용하는 과목 등이 있는지 확인 프로세스 start
    	//등록된 학기 정보를 사용하는 과목 등이 있는지 확인 프로세스 end
    	
		semesterDao.deleteSemesterInfo(paramMap);
		
		return resultMap;
	}
	
	/**
	 *	학기 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	public void downloadSemesterList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<SemesterVO> semesterList = semesterDao.getSemesterList(paramMap);
		
		List<Map<String, Object>> excelList = Lists.newArrayList();
		
		for(SemesterVO vo : semesterList){
			Map<String, Object> row = Maps.newHashMap();
			row.put("displayYn", vo.getDisplayYn().equals("Y")?"노출":"비노출");
			row.put("univCodeName", vo.getUnivCodeName());
			row.put("semesterCodeName", vo.getYear()+"년도 "+vo.getSemesterCodeName());
			row.put("semesterPeriod",	vo.getSemesterStartDay().substring(0, 4)+"."+vo.getSemesterStartDay().substring(4, 6)+"."+vo.getSemesterStartDay().substring(6, 8)
										+" ~ "+
										vo.getSemesterEndDay().substring(0, 4)+"."+vo.getSemesterEndDay().substring(4, 6)+"."+vo.getSemesterEndDay().substring(6, 8));
			row.put("regUserName", vo.getRegUserName());
			row.put("regDt", vo.getRegDt());
			excelList.add(row);
		}
		
		
		final String fileName = Const.EXCEL_FILE_NAME_SEMESTER_LIST;
		
		ExcelFeature featrue = new SemesterListExcelFeatrue();
		
		paramMap.put("excelList", excelList);
		paramMap.put("fileName", fileName);
		
		excelComponent.excelDownLoad(response, featrue, paramMap);
	}
	
	/**
     * 학기 접수기간/안내문 목록 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public Map<String, Object> getSemesterListWithGuide(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UMap> semesterListWithGuide = semesterDao.getSemesterListWithGuide(paramMap);
		
		resultMap.put("semesterListWithGuide", semesterListWithGuide);
		
		return resultMap;
	}
	
	/**
     * 학기 접수기간/안내문 정보 조회
     * @param paramMap 학기 접수기간/안내문 정보 조회 파라미터
     * @return resultMap 조회결과
     */
	@SuppressWarnings({ "rawtypes", "unchecked" })
    public Map<String, Object> getGuideInfo(Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	
    	String semesterCode = StringUtil.nvltoStr(paramMap.get("semesterCode"), "");
    	String univCode = StringUtil.nvltoStr(paramMap.get("univCode"), "");
    	String year = StringUtil.nvltoStr(paramMap.get("year"), "");
    	if(StringUtils.isEmpty(semesterCode) || StringUtils.isEmpty(univCode) || StringUtils.isEmpty(year)){
			log.error("parameter is invalid");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
    	
    	UMap semesterInfo = semesterDao.getGuideInfo(paramMap);
		if (semesterInfo != null) {
			//첨부파일 조회 start
			List<UMap> fileKeyList = getGudieFileKeyList(paramMap);
			List<FileInfo> fileList = Lists.newArrayList();
			for(UMap fileKey : fileKeyList){
				fileList.add(fileDao.getFileInfo(fileKey.getString("fileKey")));
			}
			//첨부파일 조회 end

			semesterInfo.put("fileList", fileList);
		}

    	resultMap.put("semesterInfo", semesterInfo);
    	return resultMap;
    }
    
    /**
     * 학기 접수기간/안내문 첨부파일 정보 조회
     * @param semetserSeq 학기 시퀀스
     * @return fileKeyList 첨부파일 파일 키 목록
     */
    @SuppressWarnings("rawtypes")
    private List<UMap> getGudieFileKeyList(Map<String, Object> paramMap) throws Exception{
    	List<UMap> fileKeyList = semesterDao.getGudieFileKeyList(paramMap);
    	return fileKeyList;
    }
    
    /**
     * 학기 접수기간/안내문 정보 저장 (첨부파일 포함)
     * @param file MultipartFile 첨부파일
     * @param paramMap 학기 접수기간/안내문 정보 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    public Map<String, Object> saveGuideInfo(List<MultipartFile> files, Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	
    	String removeFileKeys = StringUtil.nvltoStr(paramMap.get("removeFileKeys"), "");
    	if(!removeFileKeys.equals("")){
    		String[] removeFileKeyArr = removeFileKeys.split(",");
    		Map<String, Object> paramMap2 = Maps.newHashMap();
    		paramMap2.put("semesterCode", paramMap.get("semesterCode"));
    		paramMap2.put("year", paramMap.get("year"));
    		paramMap2.put("univCode", paramMap.get("univCode"));
    		paramMap2.put("removeFileKeys", removeFileKeyArr);
    		semesterDao.deleteGuideFile(paramMap2);
    		for(String removeFileKey : removeFileKeyArr){
    			fileDao.deleteFile(removeFileKey);
    		}
    	}
    	
    	
    	if(files.size() > 0){
    		for(MultipartFile file: files){
    			//log.debug("fileName {} => {}", i, file.getOriginalFilename());
    			//log.debug("paramMap {} => {}", i, paramMap.toString());
    			//i++;
    			// 파일 정보 존재 시 파일 저장
    			FileInfo fileInfo = null;
    			if (file != null) {
    				fileInfo = fileService.saveFile(file);
    				paramMap.put("guideFileKey", fileInfo.getFileKey());
    			}
    		}
    	}
    	semesterDao.upsertGuideInfo(paramMap);
    	
    	return resultMap;
    	
    }
    
    /**
     * 학기 접수기간/안내문 정보 저장 (첨부파일 미포함)
     * @param file MultipartFile 첨부파일
     * @param paramMap 학기 접수기간/안내문 정보 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    public Map<String, Object> saveGuideInfo(Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	
    	String removeFileKeys = StringUtil.nvltoStr(paramMap.get("removeFileKeys"), "");
    	if(!removeFileKeys.equals("")){
    		String[] removeFileKeyArr = removeFileKeys.split(",");
    		Map<String, Object> paramMap2 = Maps.newHashMap();
    		paramMap2.put("semesterCode", paramMap.get("semesterCode"));
    		paramMap2.put("year", paramMap.get("year"));
    		paramMap2.put("univCode", paramMap.get("univCode"));
    		paramMap2.put("removeFileKeys", removeFileKeyArr);
    		semesterDao.deleteGuideFile(paramMap2);
    		for(String removeFileKey : removeFileKeyArr){
    			fileDao.deleteFile(removeFileKey);
    		}
    	}
    	
    	semesterDao.upsertGuideInfo(paramMap);
    	
    	return resultMap;
    	
    }
    
    /**
     * 학기 접수기간/안내문 정보 삭제
     * @param paramMap 학기 접수기간/안내문 정보 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    @SuppressWarnings("rawtypes")
    public Map<String, Object> deleteGuideInfo(Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	
    	semesterDao.deleteGuideInfo(paramMap);
    	semesterDao.deleteGuideFile(paramMap);
    	
    	
    	//첨부파일 삭제 start
		List<UMap> fileKeyList = getGudieFileKeyList(paramMap);
		for(UMap fileKeyInfo : fileKeyList){
			fileDao.deleteFile(fileKeyInfo.getString("fileKey"));
		}
		//첨부파일 삭제 end
    	
    	return resultMap;
    }
    
    /**
	 *	학기 접수기간/안내문 목록 엑셀 다운로드 
     * @param Map<String, Object> paramMap 검색조건
     * @param HttpServletResponse response 파라미터 및 세션정보 
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public void downloadSemesterListWithGuide(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		
		List<UMap> semesterListWithGuide = semesterDao.getSemesterListWithGuide(paramMap);
		
		List<Map<String, Object>> excelList = Lists.newArrayList();
		
		for(UMap vo : semesterListWithGuide){
			log.debug(vo.toString());
			Map<String, Object> row = Maps.newHashMap();
			row.put("univCodeName", vo.getString("univCodeName"));
			row.put("semesterCodeName", vo.getString("year")+"년도 "+vo.getString("semesterCodeName"));
			if(StringUtils.isNotEmpty(vo.getString("guideSemesterCode"))){
				row.put("displayYn", vo.getString("guideDisplayYn").equals("Y")?"노출":"비노출");
				row.put("receiptPeriod",	vo.getString("receiptStartDay").substring(0, 4)+"."+vo.getString("receiptStartDay").substring(4, 6)+"."+vo.getString("receiptStartDay").substring(6, 8)
						+" ~ "+
						vo.getString("receiptEndDay").substring(0, 4)+"."+vo.getString("receiptEndDay").substring(4, 6)+"."+vo.getString("receiptEndDay").substring(6, 8));
				row.put("guideStatus", vo.getString("guideStatus"));
				row.put("regUserName", vo.getString("guideRegUserName"));
				row.put("regDt", vo.getString("guideRegDt"));
			}
			excelList.add(row);
		}
		
		
		final String fileName = Const.EXCEL_FILE_NAME_SEMESTER_GUIDE_LIST;
		
		ExcelFeature featrue = new SemesterListWithGuideExcelFeatrue();
		
		paramMap.put("excelList", excelList);
		paramMap.put("fileName", fileName);
		
		excelComponent.excelDownLoad(response, featrue, paramMap);
	}
	
	/**
     * 승인 안내문 정보 조회
     * @param paramMap 승인 안내문 정보 조회 파라미터
     * @return resultMap 조회결과
     */
	@SuppressWarnings({ "rawtypes", "unchecked" })
    public Map<String, Object> getAcceptGuideInfo(Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	String semesterCode = StringUtil.nvltoStr(paramMap.get("semesterCode"), "");
    	String univCode = StringUtil.nvltoStr(paramMap.get("univCode"), "");
    	String year = StringUtil.nvltoStr(paramMap.get("year"), "");
    	if(StringUtils.isEmpty(semesterCode) || StringUtils.isEmpty(univCode) || StringUtils.isEmpty(year)){
			log.error("parameter is invalid");
			throw new AppException(ResultCode.ETC_SERVER_ERROR);
		}
    	UMap semesterInfo = semesterDao.getAcceptGuideInfo(paramMap);
    	log.info("paramMap -> " + paramMap);
    	//첨부파일 조회 start
		List<UMap> fileKeyList = getGudieFileKeyList(paramMap);
		List<FileInfo> fileList = Lists.newArrayList();
		for(UMap fileKey : fileKeyList){
			fileList.add(fileDao.getFileInfo(fileKey.getString("fileKey")));
		}
		if(fileList.size() != 0) {
			semesterInfo.put("fileList", fileList);
		}
		//첨부파일 조회 end
    	resultMap.put("semesterInfo", semesterInfo);
    	return resultMap;
    }
    
    /**
     * 승인 안내문 정보 저장 (첨부파일 포함)
     * @param file MultipartFile 첨부파일
     * @param paramMap 승인 안내문 정보 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    public Map<String, Object> saveAcceptGuideInfo(List<MultipartFile> files, Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	String removeFileKeys = StringUtil.nvltoStr(paramMap.get("removeFileKeys"), "");
    	if(!removeFileKeys.equals("")){
    		String[] removeFileKeyArr = removeFileKeys.split(",");
    		Map<String, Object> paramMap2 = Maps.newHashMap();
    		paramMap2.put("semesterCode", paramMap.get("semesterCode"));
    		paramMap2.put("year", paramMap.get("year"));
    		paramMap2.put("univCode", paramMap.get("univCode"));
    		paramMap2.put("docType", paramMap.get("docType"));
    		paramMap2.put("removeFileKeys", removeFileKeyArr);
    		log.info("paramMap2 -> " + paramMap2);
    		semesterDao.deleteGuideFile(paramMap2);
    		for(String removeFileKey : removeFileKeyArr){
    			fileDao.deleteFile(removeFileKey);
    		}
    	}
    	if(files.size() > 0){
    		for(MultipartFile file: files){
    			//log.debug("fileName {} => {}", i, file.getOriginalFilename());
    			//log.debug("paramMap {} => {}", i, paramMap.toString());
    			//i++;
    			// 파일 정보 존재 시 파일 저장
    			FileInfo fileInfo = null;
    			if (file != null) {
    				fileInfo = fileService.saveFile(file);
    				paramMap.put("guideFileKey", fileInfo.getFileKey());
    			}
    		}
    	}
    	semesterDao.updateAcceptGuideInfo(paramMap);
    	return resultMap;
    }
    
    /**
     * 승인 안내문 정보 저장 (첨부파일 미포함)
     * @param file MultipartFile 첨부파일
     * @param paramMap 승인 안내문 정보 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    public Map<String, Object> saveAcceptGuideInfo(Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	String removeFileKeys = StringUtil.nvltoStr(paramMap.get("removeFileKeys"), "");
    	if(!removeFileKeys.equals("")){
    		String[] removeFileKeyArr = removeFileKeys.split(",");
    		Map<String, Object> paramMap2 = Maps.newHashMap();
    		paramMap2.put("semesterCode", paramMap.get("semesterCode"));
    		paramMap2.put("year", paramMap.get("year"));
    		paramMap2.put("univCode", paramMap.get("univCode"));
    		paramMap2.put("docType", paramMap.get("docType"));
    		paramMap2.put("removeFileKeys", removeFileKeyArr);
    		log.info("paramMap2 -> " + paramMap2);
    		semesterDao.deleteGuideFile(paramMap2);
    		for(String removeFileKey : removeFileKeyArr){
    			fileDao.deleteFile(removeFileKey);
    		}
    	}
    	semesterDao.updateAcceptGuideInfo(paramMap);
    	return resultMap;
    }
    
    /**
     * 승인 안내문 정보 삭제
     * @param paramMap 승인 안내문 정보 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    @SuppressWarnings("rawtypes")
    public Map<String, Object> deleteAcceptGuideInfo(Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	semesterDao.deleteAcceptGuideInfo(paramMap);
    	semesterDao.deleteGuideFile(paramMap);
    	//첨부파일 삭제 start
		List<UMap> fileKeyList = getGudieFileKeyList(paramMap);
		for(UMap fileKeyInfo : fileKeyList){
			fileDao.deleteFile(fileKeyInfo.getString("fileKey"));
		}
		//첨부파일 삭제 end
    	return resultMap;
    }
   
    /**
     * 승인 알림 메시지 전송
     * 
     * @param paramMap
     * @throws Exception
     */
    public void sendAcceptGuide(Map<String, Object> paramMap) throws Exception {
    	String univCodeName = paramMap.get("univCodeName").toString();
    	String mInStNum = paramMap.get("mInStNum").toString();
    	String content = univCodeName;
    	content += " 학점교류 신청이 승인 되었습니다. 교류대학 학번은 ";
    	content += mInStNum;
    	content += " 입니다. 자세한 안내문은 [MY페이지 > 학점교류승인내역]에서 확인하세요.";
    	paramMap.put("content", content);
    	semesterDao.sendAcceptGuide(paramMap);
    	if(paramMap.get("seq") != null) {
    		paramMap.put("msgType", 1);
    		paramMap.put("title", "");
    		semesterDao.saveMsgInfo(paramMap);
    		if(paramMap.get("msgSeq") != null) {
    			semesterDao.saveMsgTarget(paramMap);
    			semesterDao.saveApplyMsgSeq(paramMap);
    		}
    	}
    	
    }
   
}
