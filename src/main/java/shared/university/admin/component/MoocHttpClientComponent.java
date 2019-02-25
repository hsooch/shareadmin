package shared.university.admin.component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.AppProperties;
import shared.university.admin.UMap;
import shared.university.admin.domain.MoocMappingVO;
import shared.university.admin.domain.mCourseDataVO;
import shared.university.admin.service.MoocMappingService;
import shared.university.admin.utils.StringUtil;

/**
 * Mooc 연동 결과 Component 
 *
 * Created on 2018. 4
 *
 * @author 스퀘어네트
 * @since JDK1.7
 */

@Component
@Slf4j
public class MoocHttpClientComponent {
	
	@Autowired   
	private  MoocMappingService moocmappingService;

	private final static String ELASTIC_HOST = AppProperties.getProperty("elastic.host");
	private final static String ELASTIC_PORT = AppProperties.getProperty("elastic.port");
	private final static String ELASTIC_SEARCH = AppProperties.getProperty("elastic.search");
	private final static String ELASTIC_UPDATE = AppProperties.getProperty("elastic.update");
	private final static String ELASTIC_INDEX = AppProperties.getProperty("elastic.index");
	private final static String ELASTIC_TYPE = AppProperties.getProperty("elastic.type");
	private final static String ELASTIC_SCHCHAR1 = AppProperties.getProperty("elastic.schchar1");
	private final static String ELASTIC_SCHCHAR2 = AppProperties.getProperty("elastic.schchar2");
	private final static String ELASTIC_SCHCHAR3 = AppProperties.getProperty("elastic.schchar3");
	private final static String ELASTIC_DOMAIN = AppProperties.getProperty("elastic.domain");
	
	private  HttpGet requestGet ; 
	private  HttpPost requestPost ;
	private  HttpDelete requestDelete ;
	private  HttpPut requestPut ;
	private  HttpResponse response ;
	private  HttpEntity entity ;
	    
    /**
     * 검색 엔진 연동 및 결과값 조회
     *  
     * @return map
     */
	public  Map<String, Object> readJson(String Type , List<mCourseDataVO> param){		
		Map<String, Object> map = new HashMap<String, Object>();
		HttpClient client = new DefaultHttpClient();
		String responseString ;
		String requestString ;
		String resultCode = null;
		try{			
			switch (Type) {
				case "GET" :
					//log.info("readJson => {http}" + "http://"+ELASTIC_HOST+":"+ELASTIC_PORT+ELASTIC_SEARCH);		
					
					requestGet = new HttpGet("http://"+ELASTIC_HOST+":"+ELASTIC_PORT+ELASTIC_SEARCH);
					response = client.execute(requestGet);
					//log.info(response.toString());
					entity = response.getEntity();				 
					responseString = EntityUtils.toString(entity, "utf-8");					
					JSONParser jsonParser = new JSONParser();
			        JSONObject jsonObj = (JSONObject) jsonParser.parse(responseString);
			        JSONObject sArray = (JSONObject) jsonObj.get(ELASTIC_SCHCHAR1);
			        resultCode = (String) jsonObj.get("error");
			        log.info("{resultCode} :" + resultCode);    
			        if(resultCode == null || resultCode.equals("")){
			        	map.putAll(sArray);
			        }else{
			        	map = null;
			        }	
					break;
				case "PUT" :
					System.out.println("Type : PUT");
					break;
				case "DELETE" :
					System.out.println("Type : DELETE");
					break;
				case "POST" :
					int result =0; 
					requestString = updateJsonData(param);  
					log.info("{param : updateJsonData}" + param);

					StringEntity sentity = new 	StringEntity(requestString, ContentType.APPLICATION_JSON) ;
					//ByteArrayEntity bentity = new ByteArrayEntity(s.getBytes());
					//bentity.setContentType("application/json"); 
							
					requestPost = new HttpPost("http://"+ELASTIC_HOST+":"+ELASTIC_PORT+ELASTIC_UPDATE);
					requestPost.setHeader("Content-Type", "application/json");
					requestPost.setHeader("Accept", "application/json;charset=UTF-8");									
					requestPost.setEntity(sentity);
					response = client.execute(requestPost);				 
					entity = response.getEntity();
					responseString = EntityUtils.toString(entity, "utf-8");	
					
					jsonParser = new JSONParser();
			        jsonObj = (JSONObject) jsonParser.parse(responseString);
			        
			        resultCode = (String) jsonObj.get("error");
			        log.info("{resultCode} :" + resultCode);
					
			        if ( resultCode != null && !resultCode.equals("")){
			        	map = null;
			        }else{
			        	//코드 데이터 등록
			        	result = insertCodeData(param);
			        	
			        }
				
					break;
				default:
					System.out.println("default");
					break;
					
			}
		}catch(Exception e){
			e.printStackTrace(); 
		} 
		return map;
	}
	
	/**
	 * 연동결과 body json parsing /  mCourseDataVO 객체 set
	 * @param Type
	 * @return List
	 */
	public  List<mCourseDataVO> JsonData(String Type){			
		List<mCourseDataVO> jsonData = new ArrayList<mCourseDataVO>();
		mCourseDataVO vo = new mCourseDataVO();		
		
		try{
			JSONObject jsonObj = new JSONObject();
			jsonObj.putAll(readJson(Type, jsonData));
			
			switch (Type) {
				case "GET" :
					JSONArray  jsonArr = (JSONArray) jsonObj.get(ELASTIC_SCHCHAR1) ;
				     for(int i=0 ; i < jsonArr.size(); i++) {		        	
				        	JSONObject temp = (JSONObject) jsonArr.get(i);	
				        	log.info("contents info : " + (JSONObject)temp.get(ELASTIC_SCHCHAR2));
				        	Map m2 = new HashMap();
				        	m2.putAll((JSONObject)temp.get(ELASTIC_SCHCHAR2));
				        	Map m3 = new HashMap();
				        	m3.putAll((Map) m2.get(ELASTIC_SCHCHAR3));
				        	vo = new mCourseDataVO();	
				        	vo.setId((String)m2.get("id"));
				        	vo.setDisplayName((String)m3.get("display_name"));
				        	vo.setCourse((String)m2.get("course"));
				        	vo.setImageUrl((String)m2.get("img_url"));
				        	vo.setNumber((String)m3.get("number"));
				        	vo.setOverView((String)m3.get("overview"));
				        	vo.setOrg((String)m2.get("org"));
				        	vo.setSubject((String)m2.get("subject"));
				        	vo.setType((String)m2.get("type"));
				        	
				        	jsonData.add(vo);
				        } 
					break;
				case "POST" :
					break;
				default:
					System.out.println("default");
					break;
			}
		}catch(Exception e){
			e.printStackTrace();
			return jsonData;
		}finally{
			
		}
		return jsonData;
	}
	 
	

	   
	/**
	 * 변경 과정 카테고리 정보 변경
	 * 타입, 카테고리 변경을 위한 string 구성
	 * @throws  
	 * 
	*/
	public String updateJsonData(  List<mCourseDataVO>  mCourseDataVO )  {

		StringBuffer jsonData = new StringBuffer();
	//	String jsonData = "	{"update\":{"_type\": "course_info", "_id": "course-v1:SQUARENET+CS00001_01+2017_01_01", "_index": "courseware_index"}} "
	//	{"doc": {"subject": "공학"}}
	//	{"update":{"_type": "course_info", "_id": "course-v1:edX+DemoX+Demo_Course", "_index": "courseware_index"}}
	//	{"doc": {"subject": "인문과학"}}
		String start = "{\"update\":{\"_type\": \""+ELASTIC_TYPE+"\", \"_index\": \""+ELASTIC_INDEX+"\"";
		String subject = "{\"doc\": {\"subject\":\"";
		String type = ", \"type\":\"";
		String end = "}} \r\n";
 
		try{
			JSONObject jsonObject = new JSONObject();
			for(int i = 0; i <mCourseDataVO.size() ; i++){
				jsonData.append(start);
				jsonData.append(", \"_id\": \""+mCourseDataVO.get(i).getId()+"\"");
				jsonData.append(end);
				jsonData.append(subject);
				jsonData.append(mCourseDataVO.get(i).getSubject() +"\"");				
				jsonData.append(type);
				jsonData.append(mCourseDataVO.get(i).getType() + "\"");
				jsonData.append(end);
			}
			log.info("[ 인덱스 변경  ] : " + jsonData.toString());
		}catch(Exception e){
			e.printStackTrace();
		}
			
		return jsonData.toString() ;
	
	}
	
	/**
	 * 과정 카테고리 , 타입정보 맵핑 정보 등록
	 * mooc db에 등록
	 * @param mCourseDataVO
	 * @return
	 */
	
	public  int insertCodeData(  List<mCourseDataVO>  mCourseDataVO )  {
		int result =0;
		MoocMappingVO vo = new MoocMappingVO(); 
		try{
			JSONObject jsonObject = new JSONObject();
			for(int i = 0; i <mCourseDataVO.size() ; i++){
				vo.setCourseId(mCourseDataVO.get(i).getId());
				vo.setCourseName(mCourseDataVO.get(i).getDisplayName());				
				vo.setCourseSubject(mCourseDataVO.get(i).getSubject());
				vo.setCourseType(mCourseDataVO.get(i).getType());
	 
				log.info("{vo}:"+ vo);
				result = moocmappingService.insertMapping(vo); 
				if (result < 1 ) break;
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return result ;
	}
	
	/**
	 * 외부 연동 API
	 * @param Type
	 * @return List
	 */
	public List<UMap<String, Object>> apiData(Map<String, Object> paramMap){
		List<UMap<String, Object>> jsonData = new ArrayList<UMap<String, Object>>();
		HttpClient client = new DefaultHttpClient();
		String responseString ;
		String requestString ;
		String resultCode = null;

		requestString = searchParam(paramMap);
		//log.debug("{param : updateJsonData}" + paramMap);
		
		try{
			StringEntity sentity = new 	StringEntity(requestString, ContentType.APPLICATION_JSON) ;
					
			requestPost = new HttpPost("http://"+ELASTIC_HOST+":"+ELASTIC_PORT+ELASTIC_SEARCH);
			requestPost.setHeader("Content-Type", "application/json");
			requestPost.setHeader("Accept", "application/json;charset=UTF-8");									
			requestPost.setEntity(sentity);
			response = client.execute(requestPost);				 

			entity = response.getEntity();
			responseString = EntityUtils.toString(entity, "utf-8");	
			
			JSONParser jsonParser = new JSONParser();
			JSONObject jsonObj = (JSONObject) jsonParser.parse(responseString);

			JSONObject sArray = (JSONObject) jsonObj.get(ELASTIC_SCHCHAR1);
	        
	        resultCode = (String) jsonObj.get("error");
	        log.debug("{resultCode} :" + resultCode);

	        if(StringUtil.objectIfEmpty(resultCode)) {
				JSONArray  jsonArr = (JSONArray) sArray.get(ELASTIC_SCHCHAR1) ;
	
				for(int i=0 ; i < jsonArr.size(); i++) {		        	
			        JSONObject temp = (JSONObject) jsonArr.get(i);	
			        //log.debug("contents info : " + (JSONObject)temp.get(ELASTIC_SCHCHAR2));
			        Map<String, Object> m2 = new HashMap<String, Object>();
			        m2.putAll((JSONObject)temp.get(ELASTIC_SCHCHAR2));
			        Map<String, Object> m3 = new HashMap<String, Object>();
			        m3.putAll((Map) m2.get(ELASTIC_SCHCHAR3));
	
			        UMap<String, Object> map = new UMap<String, Object>();	
			        map.put("courseId", (String)m2.get("id"));
			        map.put("modes", m2.get("modes"));
			        map.put("language", (String)m2.get("language"));
			        map.put("start", (String)m2.get("start"));
			        map.put("end", (String)m2.get("end"));
			        map.put("org", (String)m2.get("org"));
			        map.put("number", (String)m3.get("number"));
			        map.put("type", (String)m2.get("type"));
			        map.put("subject", (String)m2.get("subject"));
			        map.put("displayName", (String)m3.get("display_name"));
			        map.put("overview", (String)m3.get("overview"));
			        map.put("thumbnailUrl", ELASTIC_DOMAIN + (String)m2.get("image_url"));
			        map.put("aboutUrl", ELASTIC_DOMAIN + "/courses/" + (String)m2.get("id") + "/about");
			        //map.put("enrollmentStart", (String)m2.get("enrollment_start"));
			        //map.put("enrollmentEnd", (String)m2.get("enrollment_end"));
	
			        jsonData.add(map);
			    }
	        }
		}catch(Exception e){
			e.printStackTrace();
			return jsonData;
		}finally{
			
		}
		return jsonData;
	}
	   
	/**
	 * MOOC 공개강좌 목록 조회를 위한 검색 string 구성
	 */
	public String searchParam(Map<String, Object> paramMap)  {

		StringBuffer jsonData = new StringBuffer();
		String filterTerm = "";
		String filterOr = "";
		String start = "{\"query\":{\"filtered\":{";
		String end = "}}} \r\n";
		String filterPre = "\"filter\": {\"bool\":{\"must\":[";

		String enrollmentEndDay = String.valueOf(paramMap.get("enrollmentEndDay"));

		try{
			jsonData.append(start);

			if( !StringUtil.objectIfEmpty(paramMap.get("univName"))
					|| !StringUtil.objectIfEmpty(paramMap.get("courseMode"))
					|| !StringUtil.objectIfEmpty(paramMap.get("language"))
					|| !StringUtil.objectIfEmpty(paramMap.get("courseType"))
					|| !StringUtil.objectIfEmpty(paramMap.get("courseSubject"))
					|| !StringUtil.objectIfEmpty(paramMap.get("enrollmentEndDay")) ) {
				jsonData.append(filterPre);

				if( !StringUtil.objectIfEmpty(paramMap.get("univName")) ) {
					filterTerm += "{\"term\": {\"org\":\"" + paramMap.get("univName") + "\"}},";
				}
				if( !StringUtil.objectIfEmpty(paramMap.get("courseMode")) ) {
					filterTerm += "{\"term\": {\"modes\":\"" + paramMap.get("courseMode") + "\"}},";
				}
				if( !StringUtil.objectIfEmpty(paramMap.get("language")) ) {
					filterTerm += "{\"term\": {\"language\":\"" + paramMap.get("language") + "\"}},";
				}
				if( !StringUtil.objectIfEmpty(paramMap.get("courseType")) ) {
					filterTerm += "{\"term\": {\"type\":\"" + paramMap.get("courseType") + "\"}},";
				}
				if( !StringUtil.objectIfEmpty(paramMap.get("courseSubject")) ) {
					filterTerm += "{\"term\": {\"subject\":\"" + paramMap.get("courseSubject") + "\"}},";
				}

				if( StringUtil.objectIfEmpty(paramMap.get("enrollmentEndDay")) ) {
					if(!filterTerm.isEmpty()) {
						filterTerm = filterTerm.substring(0, filterTerm.length() - 1);
					}
				} else {
					filterOr = "{\"or\": [{\"range\": {\"enrollment_end\": {\"gte\":\""
							+ enrollmentEndDay.substring(0, 4) + "-"
							+ enrollmentEndDay.substring(4, 6) + "-"
							+ enrollmentEndDay.substring(6)
							+ "\"}}},{\"missing\":{\"field\":\"enrollment_end\"}}]}";
				}

				jsonData.append(filterTerm);
				jsonData.append(filterOr);
				jsonData.append("]}},");
			}

			jsonData.append("\"query\": {\"bool\": {\"must\": [{\"query_string\":{\"fields\":[\"content.*\"],\"query\":\"");
			if( StringUtil.objectIfEmpty(paramMap.get("courseSearch")) ) {
				jsonData.append("*");
			} else {
				jsonData.append(paramMap.get("courseSearch"));
			}
			jsonData.append("\"}}]}}");

			jsonData.append(end);

			//log.debug("[ 목록 조회 ] : " + jsonData.toString());
		}catch(Exception e){
			e.printStackTrace();
		}
			
		return jsonData.toString() ;
	}
	
}
