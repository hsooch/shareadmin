package shared.university.admin.domain;

import lombok.Data;

/**
 * MOU 대학 정보를 저장하는 Value Object
 *
 * Created on 2018. 4. 23.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Data
public class MouUniversityVO {

    /** 시퀀스 **/
    private Integer seq;

    /** 대학 코드 **/
    private String univCode;

    /** 대학교 이름 (대학코드명) **/
    private String univCodeName;

    /** MOU 대학 코드 **/
    private String mouUnivCode;

    /** MOU 대학교 이름 (MOU 대학코드명) **/
    private String mouUnivCodeName;

    /** MOU 분류 코드 **/
    private String mouType;

    /** 목록 정렬 순서 **/
    private Integer mouIndex;

    /** 등록자 시퀀스 **/
    private Integer regUserSeq;

    /** 수정자 시퀀스 **/
    private Integer modUserSeq;

}
