package shared.university.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shared.university.admin.dao.TermsDao;
import shared.university.admin.domain.TermsVO;

import java.util.List;
import java.util.Map;

/**
 * 약관 정보 조회 기능 제공
 *
 * Created on 2018. 4. 2.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */
@Service
public class TermsService {
	
	@Autowired
	private TermsDao termsDao;
	
	public List<TermsVO> selectTermsList(Map<String, Object> paramMap) throws Exception{
		List<TermsVO> termsList = termsDao.selectTermsList(paramMap);
		return termsList;
	}
}
