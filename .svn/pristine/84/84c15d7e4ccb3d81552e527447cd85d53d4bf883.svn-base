package shared.university.admin.component;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.google.common.collect.Maps;

import shared.university.admin.AppException;
import shared.university.admin.AppProperties;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;
import shared.university.admin.domain.SendMailVO;
import shared.university.admin.domain.UserVO;
import shared.university.admin.utils.StringUtil;

import java.util.List;
import java.util.Map;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

/**
 * Send Mail Component 
 *
 * Created on 2018. 3. 23.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */

@Component
@Slf4j
public class SendMailComponent {

	@Autowired
	protected transient JavaMailSender mailSender;

	/**
	 * 이메일 전송 (단건 처리)
	 *
	 * @param sendMailVO 메일 전송 정보
	 * @throws Exception java.lang
	 */
	@Async
	public void sendMail(SendMailVO sendMailVO) throws Exception{
		log.debug("sendMail START");
		log.debug("sendMail set parameters");
		log.debug("sendMailVO => {}", sendMailVO.toString());
		
		MimeMessage msg = mailSender.createMimeMessage();
		msg.setRecipient(RecipientType.TO, new InternetAddress(sendMailVO.getToMail()));
		
		//임시테스트
		msg.setSender(new InternetAddress(sendMailVO.getFromMail()));
		msg.setFrom(new InternetAddress(sendMailVO.getFromMail()));
		
		msg.setHeader("content-Type", Const.DEFAULT_CONTENT_TYPE_SET_STR);
		msg.setSubject(sendMailVO.getSubject(), Const.DEFAULT_CHAR_SET_STR);
		msg.setContent(sendMailVO.getContent(), Const.DEFAULT_CONTENT_TYPE_SET_STR);

		mailSender.send(msg);

		log.debug("sendMail END");
	}
	
	/**
	 * 이메일 전송 (복수건 처리)
	 *
	 * @param sendMailList 메일 전송 정보 목록
	 * @throws Exception java.lang
	 */
	@Async
    public void sendMailList(List<SendMailVO> sendMailList){
		log.debug("sendMailList START");
		
		for(SendMailVO sendMailVO : sendMailList){
			try{
				MimeMessage msg = mailSender.createMimeMessage();
				msg.setRecipient(RecipientType.TO, new InternetAddress(sendMailVO.getToMail()));
				
				//임시테스트
				msg.setSender(new InternetAddress(sendMailVO.getFromMail()));
				msg.setFrom(new InternetAddress(sendMailVO.getFromMail()));
				
				msg.setHeader("content-Type", Const.DEFAULT_CONTENT_TYPE_SET_STR);
				msg.setSubject(sendMailVO.getSubject(), Const.DEFAULT_CHAR_SET_STR);
				msg.setContent(sendMailVO.getContent(), Const.DEFAULT_CONTENT_TYPE_SET_STR);
				
				mailSender.send(msg);
			}catch(Exception e){
				log.error(ResultCode.EMAIL_TRANSMISSION_ERROR.getMsg());
				log.error("The Send Mail Schedule to {} has Error",sendMailVO.getToMail());
				e.printStackTrace();
			}

		}
		log.debug("sendMailList END");
    }
}
