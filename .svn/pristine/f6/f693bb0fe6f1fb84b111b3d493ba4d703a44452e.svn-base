package shared.university.admin.interceptor;

import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import redis.clients.jedis.Jedis;
import shared.university.admin.Const;
import shared.university.admin.utils.AppUtils;
import shared.university.admin.utils.RedisSessionUtils;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

/**
 * Created on 2018. 5. 30.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
public class RedisSessionFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        final JedisConnectionFactory factory = RedisSessionUtils.getApplicationContext().getBean(JedisConnectionFactory.class);
        try(Jedis jedis = factory.getConnection().getNativeConnection()) {
            final HttpServletRequest request = (HttpServletRequest)servletRequest;
            final HttpServletResponse response = (HttpServletResponse)servletResponse;

            Cookie sessionCookie = AppUtils.getCookie(request, Const.CSESSIONID_KEY);

            if (sessionCookie == null) {
                final String sessionId = UUID.randomUUID().toString().replace("-", "");
                this.createSession(jedis, sessionId, response);
            } else {
                if (jedis.exists(sessionCookie.getValue())) {
                    jedis.expire(sessionCookie.getValue(), Const.CSESSION_EXPIRE_SECOND);
                } else {
                    this.createSession(jedis, sessionCookie.getValue(), response);
                }
            }
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    private void createSession(final Jedis jedis, final String sessionId, final HttpServletResponse response) {
        jedis.hset(sessionId, "temp", "1");
        jedis.expire(sessionId, Const.CSESSION_EXPIRE_SECOND);

        final Cookie cookie = new Cookie(Const.CSESSIONID_KEY, sessionId);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    @Override
    public void destroy() {}
}
