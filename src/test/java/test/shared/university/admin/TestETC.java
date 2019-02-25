package test.shared.university.admin;

import java.util.Iterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Test;
import org.slf4j.helpers.MessageFormatter;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.utils.CipherUtils;
import shared.university.admin.utils.StringUtil;

/**
 * Created on 2018. 3. 23.
 *
 * @author Sung-Hun Choi
 * @since JDK1.8
 */
@Slf4j
public class TestETC {

    /**
     * AES & SHA 암복호화 테스트
     *
     * @throws Exception java.lang
     */
    @Test
    public void testCipher() throws Exception {
        final String key = "123";
        final String value = "sqn1q2w3e!0709";

        final String aesEncodeResult = CipherUtils.aesEncode(key, value);

        log.debug("Original Value => {}", value);
        log.debug("AES Encode Result => {}", aesEncodeResult);
        log.debug("AES Decode Result => {}", CipherUtils.aesDecode(key, aesEncodeResult));
        log.debug("SHA256 Encode Result => {}", CipherUtils.shaEncode(value));
    }

    @Test
    public void testMessageFormatter() {
        final String templeteBody = "alkdjflaksdjf{}alkjflasjflakjd";
        final String result = MessageFormatter.arrayFormat(templeteBody, new Object[]{"가나다"}).getMessage();

        log.debug("result => {}", result);
    }
    
    @Test
    public void testRamdomPwd(){
    	
    	String result = StringUtil.getRandomString(12);
    	log.debug("result password =>{}", result);
    	log.debug("result password length =>{}", result.length());
    }
    
    @Test
    public void testPatterCheck(){
    	String[] testStrArr = "월 화 수 09:00~11:00, 월 화 수 14:00~16:00".split(", ");
    	
    	for (String testStr : testStrArr) {
			log.debug("test string = >[{}]", testStr);
			testStr = testStr.replaceAll("\\s", "");
			log.debug("test string trim = >[{}]", testStr);
			if(Pattern.matches("(\\S)+\\d{2}:\\d{2}~\\d{2}:\\d{2}", testStr)){
				log.debug("this matches is true => {}", testStr);
				String dayOfWeekFull = testStr.replaceAll("[^A-Za-z가-힣]", "");
				String startEndTime = testStr.replaceAll("[A-Za-z가-힣]", "");
				String startTime = null;
				String endTime = null;
				String startTimeHour = null;
				String startTimeMinute = null;
				String endTimeHour = null;
				String endTimeMinute = null;
				log.debug("dayOfWeek step.1 => {}", dayOfWeekFull);
				log.debug("startEndTime step.1 => {}", startEndTime);
				
				if(Pattern.matches("\\d{2}:\\d{2}~\\d{2}:\\d{2}", startEndTime)){
					startTime = startEndTime.split("[~]")[0];
					endTime = startEndTime.split("[~]")[1];
					
					log.debug("startEndTime step.2 startTime => {}", startTime);
					log.debug("startEndTime step.2 endTime => {}", endTime);
					
					startTimeHour = startTime.split("[:]")[0];
					startTimeMinute = startTime.split("[:]")[1];
					endTimeHour = endTime.split("[:]")[0];
					endTimeMinute = endTime.split("[:]")[1];
					
					log.debug("startEndTime step.3 startTimeHour => {}", startTimeHour);
					log.debug("startEndTime step.3 startTimeMinute => {}", startTimeMinute);
					log.debug("startEndTime step.3 endTimeHour => {}", endTimeHour);
					log.debug("startEndTime step.3 endTimeMinute => {}", endTimeMinute);
					
				}
				
				for (int i = 0; i < dayOfWeekFull.length(); i++) {
					log.debug("dayOfWeek step.2 => {}", dayOfWeekFull.charAt(i));
				}
				
				
			}else{
				log.debug("this matches is false => {}", testStr);
			}
		}
    }
    
    @Test
    public void patternCheck2(){
    	log.debug(""+Pattern.matches("(\\S\\s)+\\d{2}:\\d{2}~\\d{2}:\\d{2}", "화 수 13:03~14:05, 토 13:06~14:07"));
    }
}
