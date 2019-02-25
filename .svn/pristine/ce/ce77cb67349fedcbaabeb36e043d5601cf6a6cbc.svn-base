package shared.university.admin.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.Random;

import org.apache.commons.lang3.StringUtils;

/**
 * String Utils
 * 각종 String관련 유틸 모음 
 *
 * Created on 2018. 3. 23.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */

public class StringUtil {
	
    /**
     * Parameter Mapping
     *
     * @param 원본 문자열
     * @param paramter Map
     * @return 파라미터값이 맵핑된 문자열
     */
	public static String replaceParam(String orgStr, Map<String, Object> map){
		String result = "";
		
		for(Map.Entry<String, Object> val : map.entrySet()){
            result = orgStr.replace("#"+val.getKey()+"#", nvltoStr(val.getValue(), ""));
            orgStr = result;
        }
		 
		return result;
	}
	
	/**
     * 파일 내 문자열 리턴
     *
     * @param file Path
     * @return 파일에서 읽어낸 문자열
     * @throws Exception java.lang
     */
	public static String getFileContent(String filePath) throws Exception{
		
		InputStream is = StringUtil.class.getResourceAsStream(filePath);
		
		StringBuilder sb=new StringBuilder();
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		String read;

		while((read=br.readLine()) != null) {
		    sb.append(read);
		}

		br.close();
		
		return sb.toString();
	}
	
	/**
	* Null 체크 후 문자열 반환
	* @param Object
	* @return
	*/
	public static String nvltoStr(Object obj, String defualtStr) {
		String val = "";
		if(obj != null){
			val = (String)obj;
		}
				
		return StringUtils.defaultIfEmpty(val, defualtStr);
	}

	/**
	 * Object Empty Check
	 *
	 * @param obj Check Value
	 * @return is empty
	 */
	public static boolean objectIfEmpty(Object obj) {
		if (obj == null) {
			return true;
		}

		return obj.toString().isEmpty();
	}
	
	public static String getRandomString(int len){
		StringBuffer temp = new StringBuffer();
		if(len > 0){
			Random rnd = new Random();
			
			for(int i=0; i<len; i++){
				int type = rnd.nextInt(3);
				//log.debug("type => {}", type);
				switch(type){
				case 0: // 영소문자 a-z (아스키코드 97~122)
					temp.append((char) ((int) (rnd.nextInt(26)) + 97));
					break;
				case 1: // 영대문자 A-Z (아스키코드 65~90)
					temp.append((char) ((int) (rnd.nextInt(26)) + 65));
					break;
				case 2: // 숫자 0~9
					temp.append(rnd.nextInt(10));
					break;
				}
			}
		}
    	
    	return temp.toString();
	}
	
	
	/**
	 * camel 스타일의 데이터 클래스 멤버변수명 또는 화면오브젝트명을 DB컬럼명 스타일로 변환  
	 * ex ) userName or UserName => USER_NAME
	 * @param str String
	 * @return String
	 */
	public static String camelToDbStyle(String str){
		String regex = "([a-z])([A-Z])";
		String replacement = "$1_$2";
        return str.replaceAll(regex, replacement).toUpperCase();        
	}
	
	
    /**
     * underscore ('_') 가 포함되어 있는 문자열을 Camel Case ( 낙타등
     * 표기법 - 단어의 변경시에 대문자로 시작하는 형태. 시작은 소문자) 로 변환해주는
     * utility 메서드 ('_' 가 나타나지 않고 첫문자가 대문자인 경우도 변환 처리
     * 함.)
     * @param underScore
     *        - '_' 가 포함된 변수명
     * @return Camel 표기법 변수명
     */
    public static String convert2CamelCase(String underScore) {

        // '_' 가 나타나지 않으면 이미 camel case 로 가정함.
        // 단 첫째문자가 대문자이면 camel case 변환 (전체를 소문자로) 처리가
        // 필요하다고 가정함. --> 아래 로직을 수행하면 바뀜
        if (underScore.indexOf('_') < 0
            && Character.isLowerCase(underScore.charAt(0))) {
            return underScore;
        }
        StringBuilder result = new StringBuilder();
        boolean nextUpper = false;
        int len = underScore.length();

        for (int i = 0; i < len; i++) {
            char currentChar = underScore.charAt(i);
            if (currentChar == '_') {
                nextUpper = true;
            } else {
                if (nextUpper) {
                    result.append(Character.toUpperCase(currentChar));
                    nextUpper = false;
                } else {
                    result.append(Character.toLowerCase(currentChar));
                }
            }
        }
        return result.toString();
    }
}
