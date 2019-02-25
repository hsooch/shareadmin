package shared.university.admin.domain;

import lombok.Data;

import java.util.Date;

/**
 * 대학교 상세 정보 데이터
 *
 * Created on 2018. 4. 16.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Data
public class UniversityInfo {

    /** 지역 코드 **/
    public String areaCode;

    /** 지역 코드명 **/
    public String areaCodeName;

    /** 설립 구분 코드 **/
    public String setupCode;

    /** 설립 구분 코드명 **/
    public String setupCodeName;

    /** 대학교 코드 **/
    public String universityCode;

    /** 대학교 코드명 (대학교 이름) **/
    public String universityCodeName;

    /** 우편번호 **/
    public String zipCode;

    /** 기본 주소 **/
    public String defaultAddr;

    /** 상세 주소 **/
    public String detailAddr;

    /** 대표 전화번호 **/
    public String telNum;

    /** 로고 파일키값 **/
    public String logoFileKey;

    /** 로고 파일 이름 **/
    public String logoFileName;

    /** 로고 파일 링크 URL **/
    public String logoFileUrl;

    /** 로고 파일 삭제 여부 (Y/N) **/
    public String logoDeleteYn;

    /** 홈페이지 URL **/
    public String homeUrl;

    /** 대학 미니 포탈 URL **/
    public String miniHomeUrl;

    /** 활성화 여부 **/
    public String enableYn;

    /** 등록자 시퀀스 **/
    public Integer regUserSeq;

    /** 등록자 이름 **/
    public String regUserName;

    /** 등록일 **/
    public Date regDate;

    /** 수정자 시퀀스 **/
    public Integer modUserSeq;

    /** 수정일 **/
    public Date modDate;

    /** 성적 등금 전환 유형 **/
    public Integer gradeTranceType;

    /** 행정 표준 코드 **/
    public String commonCode;

    /** 대학교 영문명 **/
    public String univNameEn;

    /** 신청서 아이디 **/
    public String applyDocId;

    /** 신청 취소서 아이디 **/
    public String applyCancelDocId;
}
