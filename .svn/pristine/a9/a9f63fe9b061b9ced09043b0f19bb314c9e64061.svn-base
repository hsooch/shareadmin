package shared.university.admin;

import lombok.Getter;
import lombok.Setter;

/**
 * 서버에서 오류코드를 공통으로 처리하기 위해 사용하는 Custom Exception
 *
 * Created on 2018. 3. 30.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Getter @Setter
public class AppException extends Exception {

    /** 결과 코드 **/
    private ResultCode resultCode;

    /** 실제로 발생한 Exception **/
    private Exception originalException;

    /** 정의된 결과 메세지에 특수문자 '{}'와 맵핑될 데이터 **/
    private Object[] messageData;

    public AppException(ResultCode resultCode) {
        this.resultCode = resultCode;
    }

    public AppException(ResultCode resultCode, Exception originalException) {
        this.resultCode = resultCode;
        this.originalException = originalException;
    }

    public AppException(ResultCode resultCode, Object[] messageData) {
        this.resultCode = resultCode;
        this.messageData = messageData;
    }

    public AppException(ResultCode resultCode, Object[] messageData, Exception originalException) {
        this.resultCode = resultCode;
        this.messageData = messageData;
        this.originalException = originalException;
    }
}
