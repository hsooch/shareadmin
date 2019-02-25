package shared.university.admin;

import lombok.Getter;

/**
 * 서버에서 발생하는 오류코드를 정의해 놓은 Enum Class
 *
 * Created on 2018. 3. 30.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Getter
public enum ResultCode {

    SUCCESS("0", "SUCCESS", false),

    ETC_SERVER_ERROR("E00", "Internal Server Error.", true),
    EMAIL_TRANSMISSION_ERROR("E01", "Email Transmission Error.", true),
	EMAIL_AUTH_SERVER_ERROR("E02", "Email Certification Server Error.", true),
    DATA_CONSISTENCY_ERROR("E03", "Data Consistency Error..", true),

    REQUIRED_PARAMETERS("SE00", "Required parameters fail...", false),
	
	LOGIN_ID_PWD_DISCORD("LE00", "Do Not verify ID or Password.", false),
	LOGIN_PWD_ERROR_PERMIT_OVER("LE01", "Exceeded Number of Password Error Permits.", false),
	LOGIN_INACTIVE_ACCOUNT("LE02", "This account is inactive.", false),
	//LOGIN_CHANGE_DATE_OVERINACTIVE_ACCOUNT("LE03", "The Password Change Cycle has come.", false),
    SESSION_EXPIRE("LE04", "Login Session Expire", false),
    LOGIN_ID_PWD_NOT_APPROVED("LE05", "Account is Not Approved", false),
    LOGIN_ACCOUNT_DOSE_NOT_HAVE_ACCESS("LE06", "This account does not have access.", false),

	
	PWD_CHANGE_ERROR("PC00", "The Current Password Does Not Match.", false),
	
	EMAIL_AUTH_FAIL("MA00", "Email Certification is Fail", false),
	EMAIL_AUTH_SUCCESS("MA01", "Email Certification is Success", false),
	EMAIL_AUTH_TIMEOVER("MA02", "Expiration Time of Email Certification is Over.", false ),
	EMAIL_AUTH_ALREADY("MA03", "Email Certification that has already.", false),
	
	SEMESTER_INFO_ALREADY("SM00", "This Semester Information already exists", false),
	SEMESTER_INFO_EXPOSED("SM01", "Exposed Semester Information.", false),
	
	SUBJECT_INFO_ALREADY("SS00", "This Subject Information already exists", false);

    /** 결과 코드 정의 **/
    private String code;

    /** 결과 메세지 정의 **/
    private String msg;

    /** 결과 코드 중 에러 로그로 출력할지에 대한 여부 필드 **/
    private boolean isError;

    ResultCode(String code, String msg, boolean isError) {
        this.code = code;
        this.msg = msg;
        this.isError = isError;
    }
}
