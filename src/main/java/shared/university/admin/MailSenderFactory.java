package shared.university.admin;

import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

/**
 * Java MailSender Factory
 *
 * Created on 2018. 6. 12.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
public class MailSenderFactory {

    private static JavaMailSenderImpl javaMailSender;

    public static JavaMailSenderImpl createMailSender() {
        if (javaMailSender != null) {
            return javaMailSender;
        } else {
            final String host = AppProperties.getProperty("mail.host");
            final String port = AppProperties.getProperty("mail.ssl.port");

            final Properties props = new Properties();
            props.setProperty("mail.smtps.auth", "false");
            props.setProperty("mail.transport.protocol", "smtps");
            props.setProperty("mail.smtp.ssl.enable", "false");
            props.setProperty("mail.smtp.starttls.enable", "true");

            javaMailSender = new JavaMailSenderImpl();
            javaMailSender.setHost(host);
            javaMailSender.setProtocol("smtp");
            javaMailSender.setPort(Integer.parseInt(port));
            javaMailSender.setJavaMailProperties(props);

            return javaMailSender;
        }
    }
}
