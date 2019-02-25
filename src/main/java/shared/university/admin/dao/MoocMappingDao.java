package shared.university.admin.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import com.google.common.collect.Maps;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import shared.university.admin.domain.MoocMappingVO;

/**
 * Created on 2018. 4.
 *
 * @author 스퀘어네트
 * @since JDK1.7
 */
@Repository
public class MoocMappingDao {

	@Resource(name="sqlSession2")
    private final SqlSessionTemplate sqlSession2;

    @Autowired    
    public MoocMappingDao(SqlSessionTemplate sqlSession2) {
        this.sqlSession2 = sqlSession2;
    }

    /**
     * 하위 코드 목록을 조회 한다.
     *
     * @param parentCode 조회할 상위 코드
     * @return 코드 목록
     */
    public List<MoocMappingVO> selectCodeList(String type){
        final Map<String, Object> params = Maps.newHashMap();        
        params.put("codeType", type);
    	return sqlSession2.selectList("moocmappingMapper.selectCodeList", params);
    }
    
    
    /**
     * Mooc DB에 데이터 등록
     *
     * @param moocmappingVO mooc 코드 정보 데이터
     * @return 등록  
     */
    public int insertMapping( MoocMappingVO moocmappingVO) {    	
       return sqlSession2.insert("moocmappingMapper.insertMapping", moocmappingVO);
    }

    
}
