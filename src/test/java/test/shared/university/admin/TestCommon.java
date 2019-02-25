package test.shared.university.admin;

import com.google.common.collect.Maps;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import redis.clients.jedis.Jedis;

import java.util.List;
import java.util.Map;

/**
 * 단위 테스트시 스프링 리소스를 로드한다.
 *
 * Created on 2018. 3. 22.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
        "classpath*:egovframework/spring/context-common.xml",
        "classpath*:egovframework/spring/context-database.xml",
        "classpath*:egovframework/spring/context-transaction.xml",
        "classpath*:egovframework/spring/context-mail.xml",
        "classpath*:egovframework/spring/context-redis.xml"
})
public class TestCommon {
    static {
        System.setProperty("env", "local");
    }

    @Autowired
    private JedisConnectionFactory jedisConnectionFactory;

    @Test
    public void testJedis() {
        try (Jedis jedis = jedisConnectionFactory.getConnection().getNativeConnection()) {
            final String key = "aaaa";
            final Map<String, String> dataMap = Maps.newHashMap();
            dataMap.put("aesKey", "111");
            dataMap.put("aesValue", "222");


            jedis.hmset(key, dataMap);
            jedis.expire(key, 30);

            final List<String> result = jedis.hmget(key, "aesKey", "aesValue");
            for (String s : result) {
                System.out.println("value => " + s);
            }
        }
    }
    
    
}
