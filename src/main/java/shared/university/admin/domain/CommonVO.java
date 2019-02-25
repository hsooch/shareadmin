package shared.university.admin.domain;

import lombok.Getter;
import lombok.Setter;

/**
 * 공통 객체 - 페이징 관련 변수 등등
 * Created on 2018. 4. 25.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Getter @Setter
public class CommonVO{

	private Integer descRn; // 내림차순 순서번호
	private Integer rowNum; // 오름차순 순서번호
	private Integer totalCnt; // 전체 갯수
	
}
