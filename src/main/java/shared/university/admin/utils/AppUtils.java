package shared.university.admin.utils;

import com.google.common.collect.Maps;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.slf4j.helpers.MessageFormatter;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.Map;
import java.util.Set;

/**
 * Created on 2017. 7. 19.
 *
 * @author Sung-Hun Choi
 * @since JDK1.8
 */
@Slf4j
public class AppUtils {

    /**
     * 결과코드가 정상인 기본 결과 데이터 생성
     *
     * @return Result Map
     */
    public static Map<String, Object> createDefaultResultMap() {
        return createDefaultResultMap(ResultCode.SUCCESS);
    }

    /**
     * 결과코드를 파라미터로 받아 기본 결과 데이터 생성
     *
     * @param resultCode 결과 코드
     * @return Result Map
     */
    public static Map<String, Object> createDefaultResultMap(final ResultCode resultCode) {
        final Map<String, Object> result = Maps.newHashMap();
        return putBaseResultData(result, resultCode, null);
    }

    /**
     * 결과코드를 파라미터로 받아 기본 결과 데이터 생성
     *
     * @param resultCode 결과 코드
     * @param messageData 정의된 결과 메세지에 특수문자 '{}'와 맵핑될 데이터
     * @return Result Map
     */
    public static Map<String, Object> createDefaultResultMap(final ResultCode resultCode, final Object[] messageData) {
        final Map<String, Object> result = Maps.newHashMap();
        return putBaseResultData(result, resultCode, messageData);
    }

    /**
     * Result Map 안에 기본 데이터 셋팅
     *
     * @param map Result Map
     * @param resultCode 결과 코드
     * @return Result Map
     */
    public static Map<String, Object> putBaseResultData(final Map<String, Object> map, final ResultCode resultCode) {
        return putBaseResultData(map, resultCode, null);
    }

    /**
     * Result Map 안에 기본 데이터 셋팅
     *
     * @param map Result Map
     * @param resultCode 결과 코드
     * @param messageData 정의된 결과 메세지에 특수문자 '{}'와 맵핑될 데이터
     * @return Result Map
     */
    public static Map<String, Object> putBaseResultData(final Map<String, Object> map, final ResultCode resultCode, final Object[] messageData) {
        map.put("resultCode", resultCode.getCode());
        if (messageData == null) {
            map.put("resultMsg", resultCode.getMsg());
        } else {
            map.put("resultMsg", MessageFormatter.arrayFormat(resultCode.getMsg(), messageData).getMessage());
        }

        map.put("logKey", MDC.get(Const.MDC_LOG_KEY));
        return map;
    }

    /**
     * Request Parameter Log 출력
     *
     * @param requestParam Request Parameter
     */
    public static void printRequestParamMap(final Map<String, Object> requestParam) {
        final Set<String> keySet = requestParam.keySet();
        if (keySet.isEmpty()) {
            log.info("Request Parameter : None");
        } else {
            for (String key : keySet) {
                log.info("Request Parameter : [{}] = [{}]", key, requestParam.get(key));
            }
        }
    }

    /**
     * Collection 객체의 빈값 여부 체크 메서드
     *
     * @param collection java.util.Collection
     * @return 빈값 여부
     */
    public static boolean isNotEmpty(final Collection<?> collection) {
        return collection != null && collection.size() != 0;
    }

    /**
     * Collection 객체의 빈값 여부 체크 메서드
     *
     * @param collection java.util.Collection
     * @return 빈값 여부
     */
    public static boolean isEmpty(final Collection<?> collection) {
        return collection == null || collection.size() == 0;
    }

    /**
     * Request 에서 쿠키명으로 쿠키를 가져온다.
     *
     * @param request HttpServletRequest
     * @param cookieName 쿠키명
     * @return 쿠키
     */
    public static Cookie getCookie(HttpServletRequest request, final String cookieName) {
        Cookie result = null;
        final Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals(Const.CSESSIONID_KEY)) {
                    result = cookie;
                }
            }
        }

        return result;
    }
}
