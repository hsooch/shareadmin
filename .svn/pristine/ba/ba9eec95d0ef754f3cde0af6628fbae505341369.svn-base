package shared.university.admin.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import redis.clients.jedis.Jedis;
import shared.university.admin.Const;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * Redis Session Handler
 *
 * Created on 2018. 5. 30.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
public class RedisSessionUtils implements ApplicationContextAware {

    private static JedisConnectionFactory jedisConnectionFactory;

    private static ApplicationContext context;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
        jedisConnectionFactory = applicationContext.getBean(JedisConnectionFactory.class);
    }

    /**
     * Get Spring Application Context
     *
     * @return ApplicationContext
     */
    public static ApplicationContext getApplicationContext() {
        return context;
    }

    /**
     * Redis Session 에 값을 저장한다.
     *
     * @param request HttpServletRequest
     * @param field 저장 필드
     * @param value 저장할 값
     */
    public static void setAttribute(final HttpServletRequest request, final String field, final String value) {
        final Cookie cookie = AppUtils.getCookie(request, Const.CSESSIONID_KEY);
        if (cookie != null) {
            try (Jedis jedis = jedisConnectionFactory.getConnection().getNativeConnection()) {
                jedis.hset(cookie.getValue(), field, value);
            }
        }
    }

    /**
     * Redis Session 에서 값을 가져온다.
     *
     * @param request HttpServletRequest
     * @param field 가저올 필드
     * @return 필드의 값
     */
    public static String getAttribute(final HttpServletRequest request, final String field) {
        final Cookie cookie = AppUtils.getCookie(request, Const.CSESSIONID_KEY);
        String result = null;
        if (cookie != null) {
            try (Jedis jedis = jedisConnectionFactory.getConnection().getNativeConnection()) {
                result = jedis.hget(cookie.getValue(), field);
            }
        }

        return result;
    }

    /**
     * 세션의 특정 필드를 삭제한다.
     *
     * @param request HttpServletRequest
     * @param field 삭제할 필드명
     */
    public static void removeAttribute(final HttpServletRequest request, final String field) {
        final Cookie cookie = AppUtils.getCookie(request, Const.CSESSIONID_KEY);
        if (cookie != null) {
            try (Jedis jedis = jedisConnectionFactory.getConnection().getNativeConnection()) {
                jedis.hdel(cookie.getValue(), field);
            }
        }
    }

    /**
     * 세션의 모든 정보를 삭제한다.
     *
     * @param request HttpServletRequest
     */
    public static void invalidate(final HttpServletRequest request) {
        final Cookie cookie = AppUtils.getCookie(request, Const.CSESSIONID_KEY);
        if (cookie != null) {
            try (Jedis jedis = jedisConnectionFactory.getConnection().getNativeConnection()) {
                jedis.del(cookie.getValue());
            }
        }
    }

}
