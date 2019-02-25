package shared.university.admin;

import java.util.Date;
import java.util.HashMap;

import shared.university.admin.utils.StringUtil;

/**
 * 공유대학플랫폼 커스텀 맵
 *
 * Created on 2018. 5. 4.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@SuppressWarnings("serial")
public class UMap<K, V> extends HashMap<K, V> {
	
	/**
     * key 에 대하여 Camel Case 변환하여 super.put 호출
     * @param key
     *        - '_' 가 포함된 변수명
     * @param value
     *        - 명시된 key 에 대한 값 (변경 없음)
     * @return Camel Case 변환된 key값과 mapping되는 값, 키에 대한 mapping되는 값이 없을 경우 null
     */
	@SuppressWarnings("unchecked")
	@Override
    public V put(K key, V value) {
        return super.put((K)StringUtil.convert2CamelCase((String) key), (V)value);
    }

    /**
     * 값을 문자열로 리턴한다.
     *
     * @param key Map Key
     * @return String Value
     */
    public String getString(final Object key) {
        final Object value = this.get(key);
        if (value == null) {
            return null;
        } else {
            return value.toString();
        }
    }

    /**
     * 값을 정수형으로 리턴한다.
     *
     * @param key Map Key
     * @return Integer Value
     */
    public Integer getInteger(final Object key) {
        final Object value = this.get(key);
        if (value == null) {
            return null;
        } else {
            return Integer.parseInt(value.toString());
        }
    }

    /**
     * 값을 Long 형으로 리턴한다.
     *
     * @param key Map Key
     * @return Long Value
     */
    public Long getLong(final Object key) {
        final Object value = this.get(key);
        if (value == null) {
            return null;
        } else {
            return Long.parseLong(value.toString());
        }
    }

    /**
     * 값을 Float 형으로 리턴한다.
     *
     * @param key Map Key
     * @return Float Value
     */
    public Float getFloat(final Object key) {
        final Object value = this.get(key);
        if (value == null) {
            return null;
        } else {
            return Float.parseFloat(value.toString());
        }
    }

    /**
     * 값을 Double 형으로 리턴한다.
     *
     * @param key Map Key
     * @return Double Value
     */
    public Double getDouble(final Object key) {
        final Object value = this.get(key);
        if (value == null) {
            return null;
        } else {
            return Double.parseDouble(value.toString());
        }
    }

    /**
     * Object Value 를 Date 로 형변환 하여 리턴한다.
     *
     * @param key Map Key
     * @return Date Value
     */
    public Date getDate(final Object key) {
        final Object value = this.get(key);
        if (value == null) {
            return null;
        } else {
            return (Date)value;
        }
    }

    /**
     * Key 값에 저장되어 있는 값이 Null 이나 빈값인지 체크
     *
     * @param key Map Key
     * @return is empty
     */
    public boolean isEmpty(final Object key) {
        final Object value = this.get(key);
        if (value == null) {
            return true;
        } else if (value instanceof String) {
            return value.toString().isEmpty();
        } else {
            return false;
        }
    }

}
