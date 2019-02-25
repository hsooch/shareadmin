package shared.university.admin.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 메뉴 테이블 데이터
 *
 * Created on 2018. 4. 9.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Data
@Getter @Setter @ToString
public class MenuVO {

    public MenuVO(String mainYn, Integer parentSeq, String menuName, String menuUrl, Integer menuIndex, Integer depth) {
        this.mainYn = mainYn;
        this.parentSeq = parentSeq;
        this.menuName = menuName;
        this.menuUrl = menuUrl;
        this.menuIndex = menuIndex;
        this.depth = depth;
    }

    public MenuVO(String mainYn, String menuName, String menuUrl, Integer menuIndex, Integer depth) {
        this.mainYn = mainYn;
        this.menuName = menuName;
        this.menuUrl = menuUrl;
        this.menuIndex = menuIndex;
        this.depth = depth;
    }

    public MenuVO() {}

    /** 메뉴 시퀀스 **/
    private Integer menuSeq;

    /** 메뉴 상위 시퀀스 **/
    private Integer parentSeq;

    /** 메뉴명 **/
    private String menuName;

    /** 메뉴 클릭시 연동되는 URL **/
    private String menuUrl;

    /** 메뉴 정렬 기준 **/
    private Integer menuIndex;

    /** 메뉴 단계 값 **/
    private Integer depth;

    /** 첫 페이지 여부 **/
    private String mainYn;
    
    /** 등록 날짜 **/
    private String regDt;
    
    /** 노출 여부 **/
    private String displayYn;
    
    /** 등록자 시퀀스 **/
    private Integer regUserSeq;
    
    /** 상위 메뉴명 **/
    private String parentMenuName;
    
    /** 등록자 이름 **/
    private String regUserName;
    
    /** 삭제 여부 **/
    private String delYn;
    
    /** 최상위 여부 **/
    private String readonlyYn;
    
    /** 하위 메뉴의 최근 인덱스 **/
    private Integer lastIndex;
    
    /** 하위 메뉴 개수 **/
    private Integer lowCount;
    
    /** 메뉴 개수 **/
    private Integer indexCount;
    
}
