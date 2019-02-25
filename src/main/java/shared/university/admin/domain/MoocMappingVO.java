package shared.university.admin.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Mooc 코드 맵핑 관리 객체 
 *
 * Created on 2018. 4.  
 *
 * @author 스퀘어네트
 * @since JDK1.7
 */
@Getter @Setter @ToString
public class MoocMappingVO {

    /** 과정 아이디 **/
    private String courseId; 
     
    /** 과정명 **/
    private String courseName;

    /** 과정  **/
    private String courseSubject;

    /** 과정 타입 **/
    private String courseType;
 

    /** 등록일 **/
    private String regDt; 

    /** 수정일 **/
    private String modDt;

 
}
