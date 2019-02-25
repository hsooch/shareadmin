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
import shared.university.admin.dao.SeminarDao;
import shared.university.admin.domain.FileInfo;
import shared.university.admin.feature.ContestListExcelFeature;
import shared.university.admin.feature.SeminarApplyListExcelFeature;
import shared.university.admin.feature.SeminarListExcelFeature;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.StringUtil;

/**
 * 세미나 관리에 필요한 기능 제공
 *
 * Created on 2018. 5. 15.
 *
 * @author 스퀘어네트(황수찬)
 * @since JDK1.7
 */
@Service
@Slf4j
public class SeminarService {
	
	@Autowired
	private FileService fileService;

	@Autowired
	private SeminarDao seminarDao;
	
	@Autowired
	private FileDao fileDao;
	
	@Autowired
	private ExcelComponent excelComponent;
	
	/**
     * 강좌 목록 조회
     * @param request HttpServletRequest 세션 정보 확인용
     * @param paramMap Map<String, Object> 검색조건
     * @return resultMap Map<String, Object> 조회결과
     * @throws Exception java.lang
     */
	@SuppressWarnings("rawtypes")
	public Map<String, Object> getSeminarList(HttpServletRequest request, Map<String, Object> paramMap) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
        
        if(StringUtil.objectIfEmpty(paramMap.get("type1"))
	        	|| StringUtil.objectIfEmpty(paramMap.get("type2"))) {
        	return AppUtils.createDefaultResultMap(ResultCode.REQUIRED_PARAMETERS);
        }

        List<UMap> seminarList = seminarDao.getSeminarList(paramMap);
		resultMap.put("seminarList", seminarList);
		return resultMap;
	}
	
	/**
     * 세미나 첨부파일 정보 조회
     * @param seminarSeq 세미나 시퀀스
     * @return fileKeyList 첨부파일 파일 키 목록
     */
    @SuppressWarnings("rawtypes")
    private List<UMap> getSeminarFileKeyList(Integer seminarSeq) throws Exception{
    	List<UMap> fileKeyList = seminarDao.getSeminarFileKeyList(seminarSeq);
    	return fileKeyList;
    }

	/**
     * 세미나 정보 저장
     *
     * @param paramMap 세미나 정보
     * @param file 세미나 로고 파일 정보
     * @throws Exception java.lang
     * @return 처리 결과 맵
     */
    public Map<String, Object> saveSeminarInfo(final Map<String, Object> paramMap, final MultipartFile thumb) throws Exception {
    	String removeFileKeys = StringUtil.nvltoStr(paramMap.get("removeFileKeys"), "");
    	if(!removeFileKeys.equals("")) {
    		String[] removeFileKeyArr = removeFileKeys.split(",");
    		Map<String, Object> paramMap2 = Maps.newHashMap();
    		paramMap2.put("semninarSeq", paramMap.get("semninarSeq"));
    		paramMap2.put("removeFileKeys", removeFileKeyArr);
    		seminarDao.deleteSeminarFile(paramMap2);
    		for(String removeFileKey : removeFileKeyArr){
    			fileDao.deleteFile(removeFileKey);
    		}
    	}
    	FileInfo fileInfo = null;
    	if (thumb != null) {
    		 fileInfo = fileService.saveFile(thumb);
             paramMap.put("thumbnailFileKey", fileInfo.getFileKey());
    	}
    	log.info("seminarservice param => " + paramMap);
    	seminarDao.upsertSeminarInfo(paramMap);
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	resultMap.put("seqSeminar", paramMap.get("seqSeminar"));
        return resultMap;
    }
    
    /**
     * 세미나 정보 저장 (첨부파일 미포함)
     * @param file MultipartFile 첨부파일
     * @param paramMap 세미나 정보 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    public Map<String, Object> saveSeminarInfoNofile(Map<String, Object> paramMap) throws Exception{
    	String removeFileKeys = StringUtil.nvltoStr(paramMap.get("removeFileKeys"), "");
    	if(!removeFileKeys.equals("")){
    		String[] removeFileKeyArr = removeFileKeys.split(",");
    		Map<String, Object> paramMap2 = Maps.newHashMap();
    		paramMap2.put("seminarSeq", paramMap.get("seminarSeq"));
    		paramMap2.put("removeFileKeys", removeFileKeyArr);
    		seminarDao.deleteSeminarFile(paramMap2);
    		for(String removeFileKey : removeFileKeyArr){
    			fileDao.deleteFile(removeFileKey);
    		}
    	}
    	seminarDao.upsertSeminarInfo(paramMap);
    	return AppUtils.createDefaultResultMap();
    }
    
    /**
     * 세미나 첨부파일을 저장한다
     * 
     */
    public Map<String, Object> saveSeminarFiles(final Map<String, Object> paramMap, final List<MultipartFile> files) throws Exception {
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	String removeFileKeys = StringUtil.nvltoStr(paramMap.get("removeFileKeys"), "");
    	if(!removeFileKeys.equals("")){
    		String[] removeFileKeyArr = removeFileKeys.split(",");
    		Map<String, Object> paramMap2 = Maps.newHashMap();
    		paramMap2.put("seminarSeq", paramMap.get("seminarSeq"));
    		paramMap2.put("removeFileKeys", removeFileKeyArr);
    		seminarDao.deleteSeminarFile(paramMap2);
    		for(String removeFileKey : removeFileKeyArr){
    			fileDao.deleteFile(removeFileKey);
    		}
    	}
    	if(files.size() > 0){
    		for(MultipartFile file: files){
    			// 파일 정보 존재 시 파일 저장
    			FileInfo fileInfo = null;
    			if (file != null) {
    				fileInfo = fileService.saveFile(file);
    				paramMap.put("seminarFileKey", fileInfo.getFileKey());
    			}
    		}
    	}
    	seminarDao.saveSeminarFiles(paramMap);
    	return resultMap;
    }
    
    /**
     * 세미나 정보를 조회 한다.
     *
     * @param paramMap 세미나 정보 파라미터
     * @return 세미나 정보
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public Map<String, Object> getSeminarInfo(Map<String, Object> paramMap) throws Exception{
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	String seminarSeq = StringUtil.nvltoStr(paramMap.get("seminarSeq"), "");
    	if(StringUtils.isEmpty(seminarSeq)){
			log.error("seminarSeq is invalid");
			throw new AppException(ResultCode.REQUIRED_PARAMETERS);
		}
    	UMap seminarInfo = seminarDao.getSeminarInfo(paramMap);
    	//첨부파일 조회 start
		List<UMap> fileKeyList = getSeminarFileKeyList(Integer.parseInt(seminarSeq));
		log.info("fileKeyList => " + fileKeyList);
		List<FileInfo> fileList = Lists.newArrayList();
		for(UMap fileKey : fileKeyList){
			fileList.add(fileDao.getFileInfo(fileKey.getString("fileKey")));
		}
		seminarInfo.put("fileList", fileList);
		//첨부파일 조회 end
    	resultMap.put("seminarInfo", seminarInfo);
    	return resultMap;
    }
    
    /**
     * 세미나 정보 삭제
     * 
     */
    @SuppressWarnings("rawtypes")
    public Map<String, Object> deleteSeminarInfo(Map<String, Object> paramMap) throws Exception {
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	seminarDao.deleteSeminarFile(paramMap);
    	seminarDao.deleteSeminarInfo(paramMap);
		Integer seminarSeq = Integer.valueOf((String)paramMap.get("seminarSeq"));
		List<UMap> fileKeyList = getSeminarFileKeyList(seminarSeq);
		for(UMap fileKeyInfo : fileKeyList) {
			fileDao.deleteFile(fileKeyInfo.getString("fileKey"));
		}
    	return resultMap;
    }
    
    /**
   	 *	세미나 목록 엑셀 다운로드 
        * @param Map<String, Object> paramMap 검색조건
        * @param HttpServletResponse response 파라미터 및 세션정보 
        * @throws Exception java.lang
        */
   	@SuppressWarnings("rawtypes")
   	public void downloadSeminarList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
   		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
   		List<UMap> seminarList = seminarDao.getSeminarList(paramMap);
   		List<Map<String, Object>> excelList = Lists.newArrayList();
   		for(UMap vo : seminarList){
   			log.debug(vo.toString());
   			Map<String, Object> row = Maps.newHashMap();
   			row.put("univCodeName", vo.getString("univCodeName"));
			row.put("exchangeYn", vo.getString("exchangeYn").equals("Y")?"교류":"비교류");
			row.put("applyPeriod",	vo.getString("applyStartDay").substring(0, 4)+"."+vo.getString("applyStartDay").substring(4, 6)+"."+vo.getString("applyStartDay").substring(6, 8)
					+" ~ "+
					vo.getString("applyEndDay").substring(0, 4)+"."+vo.getString("applyEndDay").substring(4, 6)+"."+vo.getString("applyEndDay").substring(6, 8));
			switch (vo.getString("seminarType").toString()) {
			case "seminar":
				row.put("seminarType", "세미나");
				break;
			case "lecture":
				row.put("seminarType", "특강");
				break;
			}
			row.put("title", vo.getString("title"));
			row.put("place", vo.getString("place"));
			row.put("classDay",	vo.getString("classDay").substring(0, 4)+"."+vo.getString("classDay").substring(4, 6)+"."+vo.getString("classDay").substring(6, 8));
			row.put("classTime", vo.getString("classStartTime").substring(0, 2) + ":" + vo.getString("classStartTime").substring(2, 4)
					+ " ~ " + 
					vo.getString("classEndTime").substring(0, 2) + ":" + vo.getString("classEndTime").substring(2, 4));
			row.put("teacherName", vo.getString("teacherName"));
			row.put("maxUserCnt", vo.getString("maxUserCnt"));
			row.put("seminarStatus", vo.getString("seminarStatus"));
			row.put("regUserName", vo.getString("regUserName"));
			row.put("regDt", vo.getString("regDt"));
			excelList.add(row);
   		}
   		final String fileName = Const.EXCEL_FILE_NAME_SEMINAR_LIST;
   		ExcelFeature featrue = new SeminarListExcelFeature();
   		paramMap.put("excelList", excelList);
   		paramMap.put("fileName", fileName);
   		excelComponent.excelDownLoad(response, featrue, paramMap);
   	}
    
   	/**
   	 *	세미나 신청 목록 엑셀 다운로드 
        * @param Map<String, Object> paramMap 검색조건
        * @param HttpServletResponse response 파라미터 및 세션정보 
        * @throws Exception java.lang
        */
   	@SuppressWarnings("rawtypes")
   	public void downloadSeminarApplyList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
   		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
   		List<UMap> seminarApplyList = seminarDao.getApplyUserList(paramMap);
   		List<Map<String, Object>> excelList = Lists.newArrayList();
   		for(UMap vo : seminarApplyList){
   			log.debug(vo.toString());
   			Map<String, Object> row = Maps.newHashMap();
   			row.put("regDt", vo.getString("regDt"));
   			row.put("univCodeName", vo.getString("univCodeName"));
   			row.put("studentNumber", vo.getString("studentNumber"));
			switch (Integer.parseInt(vo.getString("applyStatus").toString())) {
			case 1:
				row.put("applyStatus", "승인");
				break;
			case 2:
				row.put("applyStatus", "대기");
				break;
			case 3:
				row.put("applyStatus", "취소");
				break;
			}
			row.put("userName", vo.getString("userName"));
			row.put("userEmail", vo.getString("userEmail"));
			row.put("cellNo",	vo.getString("cellNo"));
			row.put("modStatusDate", vo.getString("modStatusDate"));
			row.put("modStatusUserName", vo.getString("modStatusUserName"));
			
			excelList.add(row);
   		}
   		final String fileName = Const.EXCEL_FILE_NAME_SEMINAR_APPLY_LIST;
   		ExcelFeature featrue = new SeminarApplyListExcelFeature();
   		paramMap.put("excelList", excelList);
   		paramMap.put("fileName", fileName);
   		excelComponent.excelDownLoad(response, featrue, paramMap);
   	}
   	
   	/**
   	 * 공모전 엑셀 다운로드
   	 * 
   	 * @param response
   	 * @param paramMap
   	 * @throws Exception
   	 */
   	@SuppressWarnings("rawtypes")
   	public void downloadContestList(HttpServletResponse response, Map<String, Object> paramMap) throws Exception{
   		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
   		List<UMap> seminarList = seminarDao.getSeminarList(paramMap);
   		List<Map<String, Object>> excelList = Lists.newArrayList();
   		for(UMap vo : seminarList){
   			log.debug(vo.toString());
   			Map<String, Object> row = Maps.newHashMap();
   			row.put("univCodeName", vo.getString("univCodeName"));
			row.put("applyPeriod",	vo.getString("applyStartDay").substring(0, 4)+"."+vo.getString("applyStartDay").substring(4, 6)+"."+vo.getString("applyStartDay").substring(6, 8)
					+" ~ "+
					vo.getString("applyEndDay").substring(0, 4)+"."+vo.getString("applyEndDay").substring(4, 6)+"."+vo.getString("applyEndDay").substring(6, 8));
			switch (vo.getString("seminarType").toString()) {
			case "contest":
				row.put("seminarType", "공모전");
				break;
			case "competition":
				row.put("seminarType", "경시대회");
				break;
			}
			row.put("title", vo.getString("title"));
			row.put("place", vo.getString("place"));
			row.put("classDay",	vo.getString("classDay").substring(0, 4)+"."+vo.getString("classDay").substring(4, 6)+"."+vo.getString("classDay").substring(6, 8));
			row.put("classTime", vo.getString("classStartTime").substring(0, 2) + ":" + vo.getString("classStartTime").substring(2, 4)
					+ " ~ " + 
					vo.getString("classEndTime").substring(0, 2) + ":" + vo.getString("classEndTime").substring(2, 4));
			row.put("regUserName", vo.getString("regUserName"));
			row.put("regDt", vo.getString("regDt"));
			excelList.add(row);
   		}
   		final String fileName = Const.EXCEL_FILE_NAME_CONTEST_LIST;
   		ExcelFeature featrue = new ContestListExcelFeature();
   		paramMap.put("excelList", excelList);
   		paramMap.put("fileName", fileName);
   		excelComponent.excelDownLoad(response, featrue, paramMap);
   	}
   	
   	/**
   	 * 신청 목록
   	 * 
   	 */
   	@SuppressWarnings("rawtypes")
	public Map<String, Object> getApplyUserList(Map<String, Object> paramMap, HttpServletRequest request) throws Exception{
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		paramMap.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(paramMap.get("sort"),"")));
		List<UMap> applyList = seminarDao.getApplyUserList(paramMap);
		resultMap.put("applyList", applyList);
		return resultMap;
	}

	public void changeApplyStatus(Map<String, Object> params,
								  List<Integer> userSeq) throws Exception {
		if(userSeq != null) {
			for(Integer seq: userSeq) {
				if (seq != null) {
					params.put("userSeq", seq);
				}
			}
			seminarDao.changeApplyStatus(params);
		}
	}
	
	public Map<String, Object> getAttendUserList(Map<String, Object>  params) throws Exception {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
		params.put("sort", StringUtil.camelToDbStyle(StringUtil.nvltoStr(params.get("sort"),"")));
		final List<UMap<String, Object>> attendUserList = seminarDao.getAttendUserList(params);
		resultMap.put("attendList", attendUserList);
		return resultMap;
	}
	
	/**
     * 세미나 출첵 (첨부파일 미포함)
     * @param file MultipartFile 첨부파일
     * @param paramMap 세미나 정보 파라미터
     * @param request
     * @return resultMap 조회결과
     */
    public Map<String, Object> checkAttend(Map<String, Object> paramMap) throws Exception{
    	String removeFileKeys = StringUtil.nvltoStr(paramMap.get("removeFileKeys"), "");
    	if(!removeFileKeys.equals("")){
    		String[] removeFileKeyArr = removeFileKeys.split(",");
    		Map<String, Object> paramMap2 = Maps.newHashMap();
    		paramMap2.put("seminarSeq", paramMap.get("seminarSeq"));
    		paramMap2.put("removeFileKeys", removeFileKeyArr);
    		seminarDao.deleteSeminarFile(paramMap2);
    		for(String removeFileKey : removeFileKeyArr){
    			fileDao.deleteFile(removeFileKey);
    		}
    	}
    	seminarDao.checkAttend(paramMap);
    	return AppUtils.createDefaultResultMap();
    }
	
	
    /**
     * 세미나 출첵 (첨부파일 포함)
     *
     * @param paramMap 세미나 정보
     * @param file 세미나 수강확인증 파일 정보
     * @throws Exception java.lang
     * @return 처리 결과 맵
     */
    public Map<String, Object> checkAttendWithCert(final Map<String, Object> paramMap, final MultipartFile cert) throws Exception {
    	String removeFileKeys = StringUtil.nvltoStr(paramMap.get("removeFileKeys"), "");
    	if(!removeFileKeys.equals("")) {
    		String[] removeFileKeyArr = removeFileKeys.split(",");
    		Map<String, Object> paramMap2 = Maps.newHashMap();
    		paramMap2.put("semninarSeq", paramMap.get("semninarSeq"));
    		paramMap2.put("removeFileKeys", removeFileKeyArr);
    		seminarDao.deleteSeminarFile(paramMap2);
    		for(String removeFileKey : removeFileKeyArr){
    			fileDao.deleteFile(removeFileKey);
    		}
    	}
    	FileInfo fileInfo = null;
    	if (cert != null) {
    		 fileInfo = fileService.saveFile(cert);
             paramMap.put("certFileKey", fileInfo.getFileKey());
    	}
    	seminarDao.checkAttend(paramMap);
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	resultMap.put("seqSeminar", paramMap.get("seqSeminar"));
        return resultMap;
    }
    
    public void unCheckAttend(final Map<String, Object> paramMap) throws Exception {
    	seminarDao.unCheckAttend(paramMap);
    }
	
	public void removeCert(final Map<String, Object> paramMap) throws Exception {
		seminarDao.removeCert(paramMap);
	}

	
	
}

















