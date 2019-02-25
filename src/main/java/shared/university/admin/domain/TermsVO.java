package shared.university.admin.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 약관 관리 객체 
 *
 * Created on 2018. 4. 5.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Getter @Setter @ToString
public class TermsVO {

    private Integer termsSeq; 			//약관seq
    private String termsType; 		//약관 종류
    private String termsTitle; 		//약관 제목
    private String termsContent; 	//약관 내용
    private String requiredYn;		//필수 여부
    
}
