package shared.university.admin;

public class Const {
	
	/** Slf4j MDC Log Key **/
	public static final String MDC_LOG_KEY = "logKey";

	/** User Session Attribute Key **/
	public static final String USESSIONID_KEY = "USESSIONID"; // 공유대학 세션id cookie name
	public static final String USER_SESSION_KEY = "userSession";
	public static final String ENC_SESSION_KEY = "userEncKey";
	public static final Integer SESSION_TIMEOUT_SECOND = 60*60*30; //1800;
	public static final Integer COOKIE_TIMEOUT_SECOND = 60*60*60*24*365; //1892160000;

	/** 공통 세션 **/
	public static final String CSESSIONID_KEY = "CSESSIONID";
	public static final int CSESSION_EXPIRE_SECOND = 60*10;
	public static final String SSO_ASSERT_USER_ID = "eXSignOn.assert.userid";
	public static final String SSO_SESSION_USER_ID = "eXSignOn.session.userid";

	/** system environment **/
	public static final String ENV_PROPERTY_NAME = "env";
	public static final String ENV_LOCAL = "local";
	public static final String ENV_DEVELOPMENT = "development";
	public static final String ENV_STAGING = "staging";
	public static final String ENV_PRODUCT = "product";

	/** Default Character Set String **/
	public static final String DEFAULT_CONTENT_TYPE_SET_STR = "text/html;charset=UTF-8";
	public static final String DEFAULT_CHAR_SET_STR = "UTF-8";
	
	/** API List **/
	public static final String API_MAIL_AUTH_RES = "cert/emailCertificationRes.do";
	public static final String API_MAIL_AUTH_PARAM_ENC_KEY = "mailAuthKey";
	
	/** Login Managemant **/
	public static final int PWD_CHANGE_DAY = 180; // 비밀번호 변경 주기
	public static final int PWD_ERROR_PERMIT_CNT = 5; // 비밀번호 오류 제한 횟수
	public static final int INACTIVE_DAY = 365;	// 휴면처리 주기
	
	/** 정렬 값 **/
	public static final String ORDER_TYPE_ASCENDING = "ASC";
	public static final String ORDER_TYPE_DESCENDING = "DESC";
	
	/** 회원관리 페이지(탭) 타입 **/
	public static final String USER_MANAGEMENT_PAGE_TYPE_BASIC = "basic"; // 기본회원목록 (첫번째탭)
	public static final String USER_MANAGEMENT_PAGE_TYPE_ACCOUNT = "account"; // 가입신청목록 (두번째탭)
	public static final String USER_MANAGEMENT_PAGE_TYPE_WITHDRAW = "withdraw"; // 탈퇴신청목록(세번째탭)

	/** 사용자 유형 **/
	public static final String USER_TYPE_TOTAL_ADMIN = "UGR01000001";	// 총괄관리자
	public static final String USER_TYPE_UNIVERSITY = "UGR01000002";	// 대학담당자
	public static final String USER_TYPE_LIFELONG_LEARNING = "UGR01000003"; //평생교육담당자
	public static final String USER_TYPE_STUDENT = "UGR01000004";		// 학생
	public static final String USER_TYPE_CITIZEN = "UGR01000005";		// 시민
	
	/** 사용자 상태 **/
	public static final String USER_STATUS_ACTIVE = "UST01000001"; // 정상
	public static final String USER_STATUS_WITHDRAW = "UST01000002"; // 탈퇴
	public static final String USER_STATUS_FORCED_WITHDRAW = "UST01000003"; // 강제탈퇴
	public static final String USER_STATUS_INACTIVE = "UST01000004"; // 휴면
	public static final String USER_STATUS_ACCOUNT = "UST01000005"; // 가입신청
	
	/** 학년 코드 **/
	public static final String[] SUBJECT_GRADE_CODE = {	 "SGC01000001" //1학년
														,"SGC01000002" //2학년
														,"SGC01000003" //3학년
														,"SGC01000004" //4학년
														,"SGC01000005" //5학년
														,"SGC01000006" //6학년
													};

	/** 엑셀다운로드 파일명 **/
	public static final String EXCEL_FILE_NAME_DEFAULT = "공유대학_플랫폼"; // 기본 엑셀파일 명
	public static final String EXCEL_FILE_NAME_BASIC_USER_LIST = "공유대학_회원관리_회원목록"; // 회원관리 회원목록
	public static final String EXCEL_FILE_NAME_ACCOUNT_USER_LIST = "공유대학_회원관리_가입신청목록"; // 회원관리 가입신청목록
	public static final String EXCEL_FILE_NAME_WITHDRAW_USER_LIST = "공유대학_회원관리_탈퇴신청목록"; // 회원관리 탈퇴신청목록
	
	public static final String EXCEL_FILE_NAME_SEMESTER_LIST = "공유대학_학기관리_학기목록"; // 학기관리 학기 목록
	public static final String EXCEL_FILE_NAME_SEMESTER_GUIDE_LIST = "공유대학_학기관리_학기_접수기간_안내문_목록"; // 학기관리 학기 접수기간/안내문 목록
	public static final String EXCEL_FILE_NAME_SEMSETER_SUBJECT_LIST = "공유대학_학기관리_과목_목록";
	
	public static final String EXCEL_FILE_NAME_SEMINAR_LIST = "공유대학_세미나특강_목록"; // 세미나 목록
	public static final String EXCEL_FILE_NAME_SEMINAR_APPLY_LIST = "공유대학_세미나특강_신청_목록"; // 세미나 신청 목록
	public static final String EXCEL_FILE_NAME_CONTEST_LIST = "공유대학_공모전_경시대회_신청_목록"; // 공모전 신청 목록
	
	public static final String EXCEL_FILE_NAME_APPLY_EXCHANGE_IN_LIST = "공유대학_학점교류_신청_IN_목록"; // 학점교류관리 > 학점교류 신청 (IN) 목록
	public static final String EXCEL_FILE_NAME_APPLY_EXCHANGE_OUT_LIST = "공유대학_학점교류_신청_OUT_목록"; // 학점교류관리 > 학점교류 신청(OUT)목록
	
	public static final String EXCEL_FILE_NAME_APPLY_EXCHANGE_CANCEL_IN_LIST = "공유대학_학점교류_신청취소_IN_목록"; // 학점교류관리 > 학점교류 신청취소(IN) 목록
	public static final String EXCEL_FILE_NAME_APPLY_EXCHANGE_CANCEL_OUT_LIST_0 = "공유대학_학점교류_신청취소_OUT_진행현황목록"; // 학점교류관리 > 학점교류 신청취소(OUT)진행현황목록
	public static final String EXCEL_FILE_NAME_APPLY_EXCHANGE_CANCEL_OUT_LIST_1 = "공유대학_학점교류_신청취소_OUT_승인대기목록"; // 학점교류관리 > 학점교류 신청취소(OUT)승인대기목록

	public static final String EXCEL_FILE_NAME_EXCHANGE_RESULT_IN_LIST = "공유대학_수강결과_IN_목록"; // 학점교류관리 > 수강결과 등록(IN) 목록
	public static final String EXCEL_FILE_NAME_EXCHANGE_RESULT_OUT_LIST = "공유대학_수강결과_OUT_목록"; // 학점교류관리 > 수강결과 조회(OUT) 목록

	public static final String EXCEL_FILE_NAME_REGIST_SCORE_IN_LIST = "공유대학_성적등록_IN_목록"; // 학점교류관리 > 성적등록(IN) 목록
	public static final String EXCEL_FILE_NAME_REGIST_SCORE_OUT_LIST = "공유대학_성적조회_OUT_목록"; // 학점교류관리 > 성적조회(OUT) 목록
	public static final String EXCEL_FILE_NAME_REGIST_SCORE_UPLOAD_LIST = "upload_grade_result"; // 학점교류관리 > 성적등록(IN) 목록 > 성적 업로드용 양식 다운로드

	public static final String EXCEL_FILE_NAME_STUDENT_HISTORY_IN_LIST = "공유대학_학생별_이력_IN_목록"; // 학점교류관리 > 학생별 이력 조회(IN) 목록
	public static final String EXCEL_FILE_NAME_STUDENT_HISTORY_OUT_LIST = "공유대학_학생별_이력_OUT_목록"; // 학점교류관리 > 학생별 이력 조회(OUT) 목록

	/** 최상의 코드 : MOU 협의회 **/
	public static final String CODE_MOU_GROUP = "MOU00000000";

	/** 보안 이력 유형 : 개인정보 변경 **/
	public static final int SECURITY_HISTORY_ACTION_TYPE_MODIFY_USER_INFO = 1;

	/** 보안 이력 유형 : 성적조회 **/
	public static final int SECURITY_HISTORY_ACTION_TYPE_SEARCH_SCORE = 2;

	/** 보안 이력 유형 : 권한변경 **/
	public static final int SECURITY_HISTORY_ACTION_TYPE_MODIFY_AUTH = 3;

	/** 보안 이력 유형 : 계정전환 **/
	public static final int SECURITY_HISTORY_ACTION_TYPE_CHANGE_ACCOUNT = 4;
}
