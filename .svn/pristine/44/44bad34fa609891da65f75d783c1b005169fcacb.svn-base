package shared.university.admin.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.component.excel.ExcelComponent;
import shared.university.admin.component.excel.ExcelFeature;
import shared.university.admin.dao.StatisticsEdxDao;
import shared.university.admin.feature.OrgStatExcelFeature;
import shared.university.admin.feature.RegOrgStatExcelFeature;
import shared.university.admin.feature.StudentStatExcelFeature;
import shared.university.admin.utils.Gzip;

/**
 * <pre>
 * open edx db 통계 처리를 위한 service 클래스입니다.
 * </pre>
 * 
 * @author enciel
 * @since JDK1.7
 */
@Service
@Slf4j
public class StatisticsEdxService{
	/**
	 * <pre>
	 * 통계 db 처리를 위한 dao 객체 선언입니다.
	 * </pre>
	 */
	private final StatisticsEdxDao statisticsEdxDao;
	/**
	 * <pre>
	 * 통계 엑셀 다운로드를 위한 컨포넌트 선언입니다.
	 * </pre>
	 */
	@Autowired
	private ExcelComponent excelComponent;

	/**
	 * <pre>
	 * StatisticsMappingService 클래스의 생성자입니다.
	 * </pre>
	 * 
	 * @param statisticsEdxDao 통계 처리를 위한 dao 객체.
	 */
	@Autowired
	public StatisticsEdxService(StatisticsEdxDao statisticsEdxDao){
		this.statisticsEdxDao = statisticsEdxDao;
	}

	/**
	 * <pre>
	 * 중복 제거된 모든 기관명을 조회합니다.
	 * </pre>
	 * 
	 * @return 기관명 목록을 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	public Map<String, Object> selectOrgNameList() throws Exception{
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap.put("OrgNameList", this.statisticsEdxDao.selectOrgNameList());

		return returnMap;
	}

	/**
	 * <pre>
	 * 기관별 통계 정보를 조회합니다.
	 * </pre>
	 * 
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @return 기관별 조회된 통계 목록 및 기관명 목록을 담고 있는 Map 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	public Map<String, Object> selectOrgCaseStatList(Map<String, Object> params)
			throws Exception{
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap.put("OrgNameList", this.statisticsEdxDao.selectOrgNameList());
		returnMap.put("OrgStatList", this.statisticsEdxDao.selectOrgCaseStatList(params));

		return returnMap;
	}

	/**
	 * <pre>
	 * 학생별 통계 정보를 조회합니다.
	 * </pre>
	 * 
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @return 학생별 조회된 통계 목록 및 총 학생수를 담고 있는 Map 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	public Map<String, Object> selectStudentCaseStatList(Map<String, Object> params)
			throws Exception{
		try{
			String tempId = "";
			int userTotalCount = 0;

			List<Map<String, Object>> tempList = this.statisticsEdxDao
					.selectStudentCaseStatList(params);

			//
			// 조회된 학생별 통계 목록에서 각 학생별 강좌의 구조 정보를 읽어와 파싱
			// 처리한 후 학생별 진도율을 구해 map에 담습니다.
			//
			for(Map<String, Object> map : tempList){
				String encoded = map.get("structure_json").toString();
				String userId = map.get("id").toString();
				String courseId = map.get("course_id").toString();

				// 조회된 목록에서 사용자 아이디 중복을 제거한 후 총 사용자 건수를 구하기 위한 로직입니다.
				if(!userId.equals(tempId)){
					userTotalCount++;
					tempId = userId;
				}

				Map<String, Object> corseActivityParams = new HashMap<String, Object>();
				corseActivityParams.put("userId", userId);
				corseActivityParams.put("courseId", courseId);

				map.putAll(this.courseMapping(encoded, corseActivityParams));
			}

			Map<String, Object> returnMap = new HashMap<String, Object>();
			returnMap.put("UserTotalCount", userTotalCount);
			returnMap.put("StudentStatList", tempList);

			return returnMap;
		}catch(Exception ex){
			log.error(
					"selectStudentCaseStatList() : there was an error processing the logic.",
					ex);
			throw ex;
		}
	}

	/**
	 * <pre>
	 * 등록 기관별 통계 정보를 조회합니다.
	 * </pre>
	 * 
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @return 등록 기관별 통계 정보를 담고 있는 Map 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	public Map<String, Object> selectRegOrgCaseStatList(Map<String, Object> params)
			throws Exception{
		Map<String, Object> returnMap = new HashMap<String, Object>();
		returnMap.put("RegOrgStatList",
				this.statisticsEdxDao.selectRegOrgCaseStatList(params));

		return returnMap;
	}

	/**
	 * <pre>
	 * 강좌 구조에 사용자 학습활동 정보를 매핑합니다.
	 * </pre>
	 * 
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @return 강좌의 사용자 학습활동 매핑 정보를 담고 있는 Map 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	public Map<String, Object> selectCourseActivity(Map<String, Object> params)
			throws Exception{
		String encoded = this.statisticsEdxDao.selectCourseStructureJson(params);

		return this.courseMapping(encoded, params);
	}

	/**
	 * <pre>
	 * 통계를 엑셀 파일로 다운로드 하기 위한 메소드입니다.
	 * </pre>
	 * 
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @param response http 응답 객체.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	@SuppressWarnings("unchecked")
	public void statExcelDownload(Map<String, Object> params,
			HttpServletResponse response) throws Exception{
		String statType = params.get("statType").toString();
		String fileName = "";

		ExcelFeature excelFeature = null;
		// 문자열 배열 파싱 후 다운로드 하는 방식 대신 db 조회해서 다운로드하는 방식으로 변경하여 아래는 주석처리합니다.
		// List<Map<String, Object>> excelList = this
		// .string2ListParser(params.get("statList").toString());
		List<Map<String, Object>> excelList = null;

		if(statType.equals("org")){
			fileName = "공유대학_기관별통계";

			Map<String, Object> map = this.selectOrgCaseStatList(params);

			excelList = (List<Map<String, Object>>)map.get("OrgStatList");

			excelFeature = new OrgStatExcelFeature();
		}else if(statType.equals("student")){
			fileName = "공유대학_학생별통계";

			Map<String, Object> map = this.selectStudentCaseStatList(params);

			excelList = (List<Map<String, Object>>)map.get("StudentStatList");

			excelFeature = new StudentStatExcelFeature();
		}else if(statType.equals("reg")){
			fileName = "공유대학_등록기관별통계";

			Map<String, Object> map = this.selectRegOrgCaseStatList(params);

			excelList = (List<Map<String, Object>>)map.get("RegOrgStatList");

			excelFeature = new RegOrgStatExcelFeature();
		}

		params.put("excelList", excelList);
		params.put("fileName", fileName);

		this.excelComponent.excelDownLoad(response, excelFeature, params);
	}

	/**
	 * <pre>
	 * 강좌에 대해서 사용자 학습활동을 매핑해줍니다.
	 * </pre>
	 * 
	 * @param encoded 강좌구조 json 압축 문자열.
	 * @param params db 조회 시 사용될 파라미터를 가지고 있는 Map 객체.
	 * @return 강좌에 학습활동을 매핑한 Map 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	private Map<String, Object> courseMapping(String encoded, Map<String, Object> params)
			throws Exception{
		// db에서 조회된 강좌 구조 정보를 base64 디코딩 후 압축 해제 해서 json 문자열을 얻습니다.
		byte[] gzipped = org.apache.commons.codec.binary.Base64.decodeBase64(encoded);
		String decoded = Gzip.decompress(gzipped);

		JSONParser jsonParser = new JSONParser();

		List<Map<String, Object>> list = this
				.structureParser((JSONObject)jsonParser.parse(decoded));
		List<Map<String, Object>> mappingList = this.moduleMapping(list);
		List<Map<String, Object>> userActivityList = this.statisticsEdxDao
				.selectCourseActivityList(params);

		int totalActivityCount = 0;
		int userActivityCount = 0;

		for(Map<String, Object> mappingMap : mappingList){
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> activityList = (List<Map<String, Object>>)mappingMap
					.get("ActivityList");

			for(Map<String, Object> activityMap : activityList){
				String activityType = activityMap.get("ActivityType").toString();
				String key = activityMap.get("Key").toString();

				for(Map<String, Object> userActivityMap : userActivityList){
					String moduleId = userActivityMap.get("module_id").toString();

					//
					// moduleId(key)와 동일한 정보가 db에 존재하면 해당 설정값으로 활동(activity)
					// 를 설정하고, 해당 moduleId(key)와 동일한 정보가 없을 경우는 default로 설정해줍니다.
					//
					if(key.equals(moduleId)){
						String activity = "";
						String state = userActivityMap.get("state").toString();
						JSONObject stateJSONObject = (JSONObject)jsonParser.parse(state);

						if(activityType.equalsIgnoreCase("problem")){
							activity = ((stateJSONObject
									.get("last_submission_time") == null) ? "미제출" : "제출");

							activityMap.put("Activity", activity);

							// 문제인 경우 activity에 값이 "제출"로 설정되면 사용자 학습 활동 건수를 증가 시킵니다.
							if(activity.equals("제출")){
								userActivityCount++;
							}
						}else if(activityType.equalsIgnoreCase("video")){
							activity = ((stateJSONObject
									.get("saved_video_position") == null)
											? ""
											: stateJSONObject.get("saved_video_position")
													.toString());

							activityMap.put("Activity", activity);

							// 동영상인 경우 activity에 값이 설정되면 사용자 학습 활동 건수를 증가 시킵니다.
							if(activity.length() > 1){
								userActivityCount++;
							}
						}

						activityMap.put("ActivityDay",
								userActivityMap.get("modified").toString());

						// 학습활동 매핑처리가 완료되면 loop 구문을 빠져나갈수 있도록 break 문으로 처리합니다.
						break;
					}else{
						if(activityType.equalsIgnoreCase("problem")){
							activityMap.put("Activity", "미제출");
						}else if(activityType.equalsIgnoreCase("video")){
							activityMap.put("Activity", "");
						}

						activityMap.put("ActivityDay", "");
					}
				}

				if(activityType.equalsIgnoreCase("problem")
						|| activityType.equalsIgnoreCase("video")){
					totalActivityCount++;
				}

				activityMap.put("ActivityType", (activityType.equalsIgnoreCase("problem"))
						? "문제"
						: (activityType.equalsIgnoreCase("video")) ? "동영상" : "텍스트");
			}
		}

		Map<String, Object> returnMap = new HashMap<String, Object>();
		int progressRate = Math.round(
				(Float.valueOf(userActivityCount) / Float.valueOf(totalActivityCount))
						* 100);
		returnMap.put("ProgressRate", progressRate);
		returnMap.put("CourseStructure", mappingList);

		log.debug(String.format("ProgressRate >>> %d / %d = %d", userActivityCount,
				totalActivityCount, progressRate));
		return returnMap;
	}

	/**
	 * <pre>
	 * 강좌의 json 구조처리를 위한 메소드입니다.
	 * </pre>
	 * 
	 * @param jsonObject 강좌 구조 정보를 담고 있는 json 객체.
	 * @return json 구조 정보를 담고 있는 list 객체를 반환합니다.
	 */
	private List<Map<String, Object>> structureParser(JSONObject jsonObject){
		String root = jsonObject.get("root").toString();
		JSONObject blocks = (JSONObject)jsonObject.get("blocks");
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		for(@SuppressWarnings("unchecked")
		Iterator<String> iterator = blocks.keySet().iterator(); iterator.hasNext();){
			String key = (String)iterator.next();

			if(key.equalsIgnoreCase(root)){
				JSONObject block = (JSONObject)blocks.get(key);
				JSONArray childrens = (JSONArray)block.get("children");

				String blockType = block.get("block_type").toString();

				if(!blockType.equalsIgnoreCase("error")){
					String displayName = block.get("display_name").toString();

					Map<String, Object> map = new HashMap<String, Object>();
					map.put("display_name", displayName);
					map.put("block_type", blockType);
					map.put("key", key);
					map.put("count", childrens.size());
					list.add(map);

					for(int i = 0; i < childrens.size(); i++){
						String children = childrens.get(i).toString();
						this.sectionParser(children, blocks, list);
					}
				}
			}
		}

		return list;
	}

	/**
	 * <pre>
	 * 강좌의 섹션 및 하위 섹션 파싱을 위한 메소드입니다. 하위 섹션 파싱 시 학습할동등의 내용을 추출합니다.
	 * </pre>
	 * 
	 * @param key json 데이터를 가져오기 위한 key.
	 * @param jsonObject 파싱을 위한 json 데이터.
	 */
	private void sectionParser(String key, JSONObject jsonObject,
			List<Map<String, Object>> list){
		JSONObject block = (JSONObject)jsonObject.get(key);
		JSONArray childrens = (JSONArray)block.get("children");

		String displayName = block.get("display_name").toString();
		String blockType = block.get("block_type").toString();

		if(!blockType.equalsIgnoreCase("html")
				&& !blockType.equalsIgnoreCase("discussion")
				&& !blockType.equals("openassessment")){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("display_name", displayName);
			map.put("block_type", blockType);
			map.put("key", key);
			map.put("count", childrens.size());
			list.add(map);
		}

		for(int i = 0; i < childrens.size(); i++){
			String children = childrens.get(i).toString();

			sectionParser(children, jsonObject, list);
		}
	}

	/**
	 * <pre>
	 * 구조 별 해당하는 정보를 db 정보와 매핑하여 화면에 보여주기 위한 목록으로 변형해주는 메소드입니다.
	 * </pre>
	 * 
	 * @param list 구조 매핑을 목록을 담고 있는 객체.
	 * @return db 정보와 매핑된 목록을 반환합니다.
	 */
	private List<Map<String, Object>> moduleMapping(List<Map<String, Object>> list){
		String sectionType = "";
		String sectionName = "";
		String subSectionType = "";
		String subSectionName = "";

		List<Map<String, Object>> mappingList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> activityList = null;

		for(Map<String, Object> map : list){
			String displayName = map.get("display_name").toString();
			String blockType = map.get("block_type").toString();
			int count = Integer.valueOf(map.get("count").toString());

			if(blockType.equalsIgnoreCase("course")){
				continue;
			}else if(blockType.equalsIgnoreCase("chapter")){
				sectionType = blockType;
				sectionName = displayName;

				if(count == 0){
					//
					// 목록의 크기가 0이상일 경우 이전 "sequential"에 대한 학습활동이 존재하는 것이므로, 이전 목록
					// 정보에 추가된 학습활동 목록을 추가해서 list 객체에 수정해줍니다.
					//
					if(activityList != null && activityList.size() > 0){
						int index = mappingList.size() - 1;

						Map<String, Object> tempMap = mappingList.get(index);
						tempMap.put("ActivityList", activityList);

						mappingList.set(index, tempMap);
					}

					activityList = new ArrayList<Map<String, Object>>();

					Map<String, Object> sectionMap = new HashMap<String, Object>();
					sectionMap.put("SectionType", sectionType);
					sectionMap.put("SectionName", sectionName);
					sectionMap.put("SubSectionType", "");
					sectionMap.put("SubSectionName", "");
					sectionMap.put("ActivityList", activityList);

					mappingList.add(sectionMap);
				}
			}else if(blockType.equalsIgnoreCase("sequential")){
				subSectionType = blockType;
				subSectionName = displayName;

				//
				// 목록의 크기가 0이상일 경우 이전 "sequential"에 대한 학습활동이 존재하는 것이므로, 이전 목록
				// 정보에 추가된 학습활동 목록을 추가해서 list 객체에 수정해줍니다.
				//
				if(activityList != null && activityList.size() > 0){
					int index = mappingList.size() - 1;

					Map<String, Object> tempMap = mappingList.get(index);
					tempMap.put("ActivityList", activityList);

					mappingList.set(index, tempMap);
				}

				activityList = new ArrayList<Map<String, Object>>();

				Map<String, Object> subSectionMap = new HashMap<String, Object>();
				subSectionMap.put("SectionType", sectionType);
				subSectionMap.put("SectionName", sectionName);
				subSectionMap.put("SubSectionType", subSectionType);
				subSectionMap.put("SubSectionName", subSectionName);
				subSectionMap.put("ActivityList", activityList);

				mappingList.add(subSectionMap);
			}else if(blockType.equalsIgnoreCase("vertical")
					|| blockType.equalsIgnoreCase("problem")
					|| blockType.equalsIgnoreCase("video")){
				Map<String, Object> activityMap = new HashMap<String, Object>();
				activityMap.put("ActivityType", blockType);
				activityMap.put("ActivityName", displayName);
				activityMap.put("Key", map.get("key").toString());

				activityList.add(activityMap);
			}
		}

		return mappingList;
	}

	/**
	 * <pre>
	 * array 형식으로된 문자열을 List 객체로 변환해줍니다.
	 * </pre>
	 * 
	 * @param stringList array 형식 문자열.
	 * @return 변환된 List 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	private List<Map<String, Object>> string2ListParser(String stringList)
			throws Exception{
		String regen = "[\\[\\]\\{\\} ]";
		String[] arrays = stringList.split("\\}, ");

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		for(String temp : arrays){
			String[] subArrays = temp.replaceAll(regen, "").split(",");

			Map<String, Object> map = new HashMap<String, Object>();

			for(String sub : subArrays){
				String[] division = sub.split("=");

				if(division.length > 1){
					map.put(division[0], division[1]);
				}else if(division.length == 1){
					map.put(division[0], "");
				}
			}

			list.add(map);
		}

		log.debug("excel download list >>> " + list);
		return list;
	}
}
