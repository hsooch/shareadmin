package shared.university.admin.utils;

import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Object Utils
 * Object.class관련 유틸 모음 
 *
 * Created on 2018. 6. 19.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */

public class ObjectUtil {
	
    /**
     * Object 클래스를 Map으로 변환 후 리턴
     *
     * @param obj Object.class
     * @return Map
     */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> ConverObjectToMap(Object obj){
		try {
			ObjectMapper oMapper = new ObjectMapper();
			Map<String, Object> map = oMapper.convertValue(obj, Map.class);
			return map;
		} catch (Exception e){
			e.printStackTrace();
		}
		return null;
	}
}
