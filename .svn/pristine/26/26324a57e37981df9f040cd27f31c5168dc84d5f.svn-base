package shared.university.admin.utils;

import com.google.common.io.BaseEncoding;
import org.apache.commons.lang3.StringUtils;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.MessageDigest;

/**
 * AES 128 암호화 & 복호화 기능 제공.
 * SHA 256 암호화 기능 제공.
 *
 * Created on 2018. 3. 23.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
public class CipherUtils {

    private static final String ENCODE_CHAR = "UTF-8";

    /**
     * AES 암호화
     *
     * @param key 암호화에 사용할 key.
     * @param value 암호화 할 값
     * @return 암호화된 문자열
     * @throws Exception java.lang
     */
    public static String aesEncode(final String key, final String value) throws Exception {
        final String iv = getIvParameterSpec(key);
        final SecretKey keySpec = getSecretKeySpec(iv);

        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));

        byte[] encrypted = c.doFinal(value.getBytes(ENCODE_CHAR));

        return URLEncoder.encode(BaseEncoding.base64().encode(encrypted), ENCODE_CHAR);
    }

    /**
     * AES 복호화
     *
     * @param key 암호화에 사용할 key.
     * @param encodeValue 암호화된 문자열
     * @return 복호화된 문자열
     * @throws Exception java.lang
     */
    public static String aesDecode(final String key, final String encodeValue) throws Exception {
        final String iv = getIvParameterSpec(key);
        final SecretKey keySpec = getSecretKeySpec(iv);

        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes("UTF-8")));

        byte[] byteStr = BaseEncoding.base64().decode(URLDecoder.decode(encodeValue, ENCODE_CHAR));


        return new String(c.doFinal(byteStr), ENCODE_CHAR);
    }

    /**
     * SHA 암호화 (단반향 암호화)
     *
     * @param value 암호화 할 값.
     * @return 암호화된 문자열
     * @throws Exception java.lang
     */
    public static String shaEncode(final String value) throws Exception {
        final MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(value.getBytes(ENCODE_CHAR));
        StringBuilder hexString = new StringBuilder();

        for (byte aHash : hash) {
            String hex = Integer.toHexString(0xff & aHash);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }

        return hexString.toString();
    }

    private static String getIvParameterSpec(final String key) {
        if (key.length() > 16) {
            return key.substring(0, 16);
        } else {
            return StringUtils.rightPad(key, 16, "0");
        }
    }

    private static SecretKeySpec getSecretKeySpec(final String ivParameter) throws UnsupportedEncodingException {
        byte[] keyBytes = new byte[16];
        byte[] b = ivParameter.getBytes(ENCODE_CHAR);
        int len = b.length;
        if (len > keyBytes.length) {
            len = keyBytes.length;
        }
        System.arraycopy(b, 0, keyBytes, 0, len);
        return new SecretKeySpec(keyBytes, "AES");
    }
}
