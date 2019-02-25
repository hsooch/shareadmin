package shared.university.admin.interceptor;

import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.google.common.io.BaseEncoding;

import lombok.extern.slf4j.Slf4j;
import redis.clients.jedis.Jedis;
import shared.university.admin.AppException;
import shared.university.admin.AppProperties;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.domain.UserSession;
import shared.university.admin.utils.CipherUtils;

/**
 * 사용자 인증 체크 Interceptor
 *
 * Created on 2018. 4. 10.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Slf4j
public class Authorization extends HandlerInterceptorAdapter {

	@Autowired
    private JedisConnectionFactory jedisConnectionFactory;
	
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	
    	boolean existCookie = true;
    	boolean existRedis = true;

		String USessionId = request.getParameter(Const.USESSIONID_KEY);

		if (USessionId == null) {
			// 쿠기 값 확인
			Cookie[] cookies = request.getCookies();
			if (cookies != null) {
				for (Cookie cookie : cookies) {
					if (cookie.getName().equals(Const.USESSIONID_KEY)) {
						USessionId = cookie.getValue();
					}
				}
			}
		}
		
		log.info(Const.USESSIONID_KEY+" => {}", USessionId);
		

		// 세션 쿠키값이 없을때
		if(USessionId == null){
			existCookie = false;
		} else {
			
			// Redis 조회 start
			try (Jedis jedis = jedisConnectionFactory.getConnection().getNativeConnection()) {
				final List<String> result = jedis.hmget(USessionId, Const.USER_SESSION_KEY, Const.ENC_SESSION_KEY);

				boolean nvlResult = false;
				for (String s : result) {
					if(s == null || s.isEmpty()){
						nvlResult = true;
					}
				}

				// Redis 조회 end
				if(nvlResult){
					existRedis = false;
				}else{
					final String encUserSession = result.get(0);
					final String encKey = result.get(1);


					try{
						//세션정보 복호화
						byte[] serializedUserSession = BaseEncoding.base64().decode(CipherUtils.aesDecode(encKey, encUserSession));
						try (ByteArrayInputStream bais = new ByteArrayInputStream(serializedUserSession)) {
							try (ObjectInputStream ois = new ObjectInputStream(bais)) {
								// 역직렬화된 Member 객체를 읽어온다.
								Object objectUser = ois.readObject();
								final UserSession userSession = (UserSession) objectUser;

								request.setAttribute(Const.USER_SESSION_KEY, userSession);//세션세팅
							}
						}

						log.debug("===== Start Jedis Expire ======");
						jedis.expire(USessionId, Const.SESSION_TIMEOUT_SECOND);//세션유효시간 갱신
						log.debug("===== End Jedis Expire ======");
					}catch(Exception e){
						log.error("UserSession Decoding Error.");
						existRedis = false;
					}
				}
			}
		}
		
		return confirmSession(request, response, existCookie, existRedis);
    }
    
    private boolean confirmSession(HttpServletRequest request, HttpServletResponse response, boolean existCookie, boolean existRedis) throws Exception{
    	log.info("Session Exist Cookie => {}, Exist Redis => {}", existCookie, existRedis);
    	if((!existCookie || !existRedis) && this.isNotIgnore(request)){
	    	final String uri = request.getRequestURI();
			log.info("Session Expire URI => {}", uri);
			if (uri.endsWith("do")) {
				response.sendRedirect(AppProperties.getProperty("admin.server.domain") + "exsignon/sso/sso_index.jsp");
			} else if (uri.endsWith("ajax")) {
				throw new AppException(ResultCode.SESSION_EXPIRE);
			} else if (uri.endsWith("view")) {
				response.getWriter().write("<script type='text/javascript'>location.href='"
						+ request.getContextPath() + "/login/login.do';</script>");
			}
			return false;
    	}else{
    		return true;
    	}
    }

    private boolean isNotIgnore(HttpServletRequest request) {
    	final String uri = request.getRequestURI();
		return !uri.contains("viewHopeSubjectList") && !uri.contains("viewApplyForExchange") && !uri.contains("pagingSample")
				&& !uri.contains("viewSubjectList") && !uri.contains("viewApplyList")
				&& !uri.contains("getExSubjectList") && !uri.contains("viewExSubjectInfo");
	}
}
