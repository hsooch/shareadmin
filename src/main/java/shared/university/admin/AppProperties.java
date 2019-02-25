package shared.university.admin;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Created on 2018. 3. 22.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Slf4j
public class AppProperties extends PropertyPlaceholderConfigurer {
    private static Map<String, String> propertiesMap;

    public AppProperties() {
        final String env = System.getProperty(Const.ENV_PROPERTY_NAME, Const.ENV_LOCAL);
        Resource[] resources;
        if (Const.ENV_PRODUCT.equals(env)) {
            resources = new ClassPathResource[]{
                    new ClassPathResource("config/commons.properties"),
                    new ClassPathResource("config/product.properties")
            };

        } else if (Const.ENV_DEVELOPMENT.equals(env)) {
            resources = new ClassPathResource[]{
                    new ClassPathResource("config/commons.properties"),
                    new ClassPathResource("config/development.properties")
            };
        } else if (Const.ENV_STAGING.equals(env)) {
            resources = new ClassPathResource[]{
                    new ClassPathResource("config/commons.properties"),
                    new ClassPathResource("config/staging.properties")
            };

        } else {
            resources = new ClassPathResource[] {
                    new ClassPathResource("config/commons.properties"),
                    new ClassPathResource("config/local.properties")

            };
        }

        this.setLocations(resources);
    }

    @Override
    protected void processProperties(ConfigurableListableBeanFactory beanFactory,
                                     Properties props) throws BeansException {
        super.processProperties(beanFactory, props);

        if (propertiesMap == null) {
            propertiesMap = new HashMap<>();
        }

        for (Object key : props.keySet()) {
            String keyStr = key.toString();
            String value = props.getProperty(keyStr);
            propertiesMap.put(keyStr, value);
        }
    }

    public static String getProperty(String name) {
        return propertiesMap.get(name);
    }

    public static String getProperty(String name, String defaultVal) {
        String val = propertiesMap.get(name);
        if (val == null) {
            return defaultVal;
        } else {
            return val;
        }
    }
}
