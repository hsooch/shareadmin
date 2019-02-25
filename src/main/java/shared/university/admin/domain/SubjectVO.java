package shared.university.admin.domain;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * 학기 과목 정보
 *
 * Created on 2018. 5. 3.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Getter @Setter
public class SubjectVO extends CommonVO{

    /** 시퀀스 **/
    private Long seq;

    /** 학기 시퀀스 **/
    private Integer semesterSeq;

    /** 과목 학년 코드 **/
    private String subjectGradeCode;

    /** 과목 학년 코드명 **/
    private String subjectGradeCodeName;

    /** 학수 번호 **/
    private String subjectNum;

    /** 분반 **/
    private String classNum;

    /** 이수 구분 **/
    private String completeType;

    /** 과목명 **/
    private String title;

    /** 학과명 **/
    private String department;

    /** 학점 **/
    private Integer subjectPoint;

    /** 담당교수 이름 **/
    private String teacherName;

    /** 수강인원 : 일반학생 **/
    private Integer maxStudentCnt;

    /** 수강인원 : 청강생 **/
    private Integer maxEtcCnt;

    /** 수강대상/유의사항 **/
    private String memo;

    /** 학생/청강생 신청 유형 (1:학생, 2:학생+청강생, 3:청강생) **/
    private Integer classAcceptType;

    /** 등록자 시퀀스 **/
    private Integer regUserSeq;

    /** 등록자 이름 **/
    private String regUserName;

    /** 수정자 시퀀스 **/
    private Integer modUserSeq;

    /** 수정자 이름 **/
    private String modUserName;

    /** 강의 시간 목록 **/
    private List<SubjectTimeVO> timeList;
}
