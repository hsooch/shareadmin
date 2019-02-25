package shared.university.admin.domain;

import lombok.Getter;
import lombok.Setter;

/**
 * 학점 교류 학기 정보를 저장하는 Value Object
 *
 * Created on 2018. 5. 2.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Getter @Setter
public class SemesterVO extends CommonVO{

    /** 시퀀스 **/
    private Integer seq;

    /** 대학교 코드 **/
    private String univCode;

    /** 대학교 이름 **/
    private String univCodeName;

    /** 학기 등록 년도 **/
    private String year;

    /** 학기 코드 **/
    private String semesterCode;

    /** 학기 코드명 **/
    private String semesterCodeName;

    /** 학기 시작일 **/
    private String semesterStartDay;

    /** 학기 종료일 **/
    private String semesterEndDay;

    /** 노출 여부 **/
    private String displayYn;

    /** 등록자 시퀀스 **/
    private Integer regUserSeq;

    /** 등록자 이름 **/
    private String regUserName;
    
    /** 등록일 **/
    private String regDt;

    /** 수정자 시퀀스 **/
    private Integer modUserSeq;

    /** 수정자 이름 **/
    private String modUserName;
    
    /** 등록일 **/
    private String modDt;
    
    /** 등록된 과목 개수 **/
    private Integer subjectCnt;
}
