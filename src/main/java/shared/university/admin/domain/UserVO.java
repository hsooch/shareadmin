package shared.university.admin.domain;

import lombok.Getter;
import lombok.Setter;

/**
 * Created on 2018. 4. 16.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Getter @Setter
public class UserVO extends CommonVO{

    //TBL_USER
    private Integer userSeq;		//사용자 시퀀스
    private String userType;		//사용자 타입
    private String userTypeName;	//사용자 타입 명
    private String userId;			// 사용자 계정
    private String userPwd;			// 비밀번호
    private String encPwd;			// 암호화된 비밀번호
    private String userPwdTmpr;		//임시 비밀번호
    private String userName;		// 사용자 명
    private String userEmail;		// 이메일
    private String subEmail;		// 서브 이메일
    private String userPin;			// pin
    private String regDt;			// 등록일
    private String modDt;			// 수정일
    private Integer modUserSeq;		// 수정자
    private String indvdlinfoAgrede;// 개인정보 동의 날짜
    private String confmYn;			// 가입신청 승인 여부
    private String confmDt;			// 가입신청 승인 날짜
    private Integer confmUserSeq;	// 가입신청 승인자
    private String lastLoginde;		// 마지막 로그인 날짜
    private String drmncyde;		// 휴면계정 전환 날짜
    private Integer pwdErrorCnt;	// 비밀번호 입력오류 횟수
    private String siteId;			// 사이트 ID
    private String univCode;			// 대학코드
    private String univName;		// 대학명
    private String univAreaCd;		// 대학 소속 지역코드 
    private String univAreaName;	// 대학 소속 지역명
    private String collegeName;     // 단과 대학명
    private String studentGradeCode;// 학년 코드
    private String studentGradeName;// 학년명
    private String department;		// 대학 부서(학과)명
    private String birthday;		// 생년월일
    private String under14Years;	// 14세 미만여부
    private String telNo;			// 전화번호
    private String cellNo;			// 휴대폰 번호
    private Integer serviceGroupSeq;// 서비스그룹시퀀스
    //private String indvdlinfoMailDe;// 개인정보 동의 메일 발송 날짜
    private String pwdChangeDate;	// 비밀번호 마지막 변경 날짜
    private String successYn;		// 로그인 성공(id, password 일치)여부
    private String errLockYn;		// 비밀번호 오류로 인한 잠금 여부
    private String lockYn;			// 휴면계정 여부
    private String pwdNeedToChgYn;	// 비밀번호 변경 필요 여부

    //TBL_USER_DETAIL
    private String mfType;			// 성별 코드
    private String mfTypeDesc;			// 성별 상세
    private String studentNumber;	// 학번
    private String userStatusCd;	// 회원 상태 코드
    private String userStatusName;	// 회원 상태 명
    private String userStatusDt;	// 회원 상태 적용 날짜
    private String withdrawReason;	// 탈퇴(강제탈퇴) 사유
    private String withdrawRejectReason; // 탈퇴 반려사유
    private String withdrawDt;		// 탈퇴(강제탈퇴) 일
    private String withdrawReqDt;	// 탈퇴요청일
    private String accountRejectReason;	// 가입신청 반려사유
    private String inactiveDt;		// 휴면일
    
    //보호자 정보
    private String guardianName;		// 보호자 명
    private String guardianBirthday;	// 보호자 생년월일
    private String guardianCellNo;	// 보호자 휴대폰번호
    private String guardianMfType;	// 보호자 성별
    private String guardianMfTypeDesc;	// 보호자 성별
}
