package shared.university.admin.domain;

import java.io.Serializable;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * Created on 2018. 4. 10.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Getter @Setter @Data
public class UserSession implements Serializable{

	private Integer userSeq;		//사용자 시퀀스

    private String userType;		//사용자 타입
    private String userTypeName;	//사용자 타입 명
    
    private String userId;			// 사용자 계정
    private String userName;		// 사용자 명
    private String userEmail;		// 이메일
    private String subEmail;		// 서브 이메일
    private String univAreaCd;		// 대학 지역 코드
    private String univCode;			// 대학코드
    private String univName;		// 대학명
    private String department;		// 대학 부서(학과)명
    private String birthday;		// 생년월일
    private String mfType;			// 성별 코드
    private String mfTypeName;		// 성별
    private String telNo;			// 전화번호
    private String cellNo;			// 휴대폰 번호
    private Integer serviceGroupSeq;// 서비스그룹시퀀스
    
    private String ipAddr;			// 로그인한 IP주소
    private String pwdNeedToChgYn;	// 비밀번호 변경 필요 여부
    private String studentNumber;   // 학번
}
