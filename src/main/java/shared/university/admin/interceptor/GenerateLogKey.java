package shared.university.admin.interceptor;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import shared.university.admin.Const;

/**
 * Log Session Key 를 생성하고 MDC 에 주입
 *
 * Created on 2018. 3. 22.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Slf4j
public class GenerateLogKey extends HandlerInterceptorAdapter {
	private String lastIpNumber;
    private final String wasNumber = StringUtils.defaultIfEmpty(System.getProperty("was.number"), "00");
    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");

    public GenerateLogKey() {
        final String defaultIp = "000.000.000.000";
        String ip;
        try {
            final String env = System.getProperty("env", "local");
            if ("local".equals(env)) {
                ip = defaultIp;
            } else {
                ip = InetAddress.getLocalHost().getHostAddress();
            }
        } catch (UnknownHostException e) {
            log.error(e.getMessage(), e);
            ip = defaultIp;
        }

        final Matcher matcher = Pattern.compile("\\d+$").matcher(ip);
        if (matcher.find()) {
            lastIpNumber = StringUtils.leftPad(
                    StringUtils.defaultIfEmpty(matcher.group(), "000"),
                    3, '0');
        }
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        final String logKey = formatter.format(Calendar.getInstance().getTime()) + wasNumber +
                lastIpNumber +
                (UUID.randomUUID().toString().replace("-", ""));

        MDC.put(Const.MDC_LOG_KEY, logKey);
        return super.preHandle(request, response, handler);
    }
}
