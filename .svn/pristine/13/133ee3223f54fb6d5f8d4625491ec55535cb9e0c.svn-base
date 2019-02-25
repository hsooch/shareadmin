package test.shared.university.admin.component;

import com.google.common.collect.Maps;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import shared.university.admin.AppProperties;
import shared.university.admin.component.SendMailComponent;
import shared.university.admin.domain.SendMailVO;
import shared.university.admin.utils.StringUtil;
import test.shared.university.admin.TestCommon;

import java.util.HashMap;
import java.util.Map;

/**
 * User Repository Test Module
 *
 * Created on 2018. 3. 27.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Slf4j
public class TestSendMailComponent extends TestCommon {

    @Autowired
    private SendMailComponent sendMailComponent;

    @Test
    public void testSendMail() {
    	log.debug("sendMail START");
    	try{
	    	SendMailVO sendMailVO = new SendMailVO();
	    	
	    	sendMailVO.setFromMail("sfup@uos.ac.kr");
	    	sendMailVO.setToMail("special9486@naver.com");
	    	sendMailVO.setSubject("이메일발송 로컬테스트");
	    	
	    	final String tmplContent = StringUtil.getFileContent(AppProperties.getProperty("mail.template.dir.path")+AppProperties.getProperty("mail.template.file.path"));
	    	
	    	/* Key Mapping start */
	    	Map<String, Object> paramMap = new HashMap<String, Object>();//Maps.newHashMap();
	    	paramMap.put("userName", "이현준");
	    	paramMap.put("toTime", "2018-01-01");
	    	paramMap.put("content", "이메일발송<span style=\"color:red;\">로컬테스트</span>");
	    	//sendMailVO.setParamMap(paramMap);
	    	
	    	String resultContent = StringUtil.replaceParam(tmplContent, paramMap);
	    	/* Key Mapping end */

	    	
	    	/* MessageFormatter 사용 start*/
	    	/*
	    	String userName = "이현준";
	    	String toTime = (new Date()).toGMTString();
	    	String content = "이메일발송<span style=\"color:red;\">로컬테스트</span>";
	    	Object params[] = {userName, toTime, content};//new Object[];
	    	
	    	String resultContent = MessageFormatter.arrayFormat(tmplContent, params).getMessage();
	    	*/
	    	/* MessageFormatter 사용 end*/
	    	
	    	log.debug("resultContent => {}", resultContent);
	    	sendMailVO.setContent(resultContent);

	    	sendMailComponent.sendMail(sendMailVO);
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    	
    	//log.info("user id => {}", entity.getUserId());
    	log.debug("sendMail END");
    }
}
