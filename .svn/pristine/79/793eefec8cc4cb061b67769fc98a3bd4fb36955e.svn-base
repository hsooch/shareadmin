package shared.university.admin.dao;

import com.google.common.collect.Maps;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import shared.university.admin.domain.CodeVO;
import shared.university.admin.domain.FileInfo;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 디스크에 저장된 파일 정보 등록 및 조회를 하는 데이터 엑세스 오브젝트
 *
 * Created on 2018. 4. 10.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Repository
public class FileDao {

    @Resource(name="sqlSession")
    private SqlSessionTemplate sqlSession;

    /**
     * 디스크에 저장된 파일 정보를 저장한다.
     *
     * @param fileInfo 저장된 파일 정보
     * @return 입력 개수
     */
    public int insertFileInfo(final FileInfo fileInfo){
    	return sqlSession.insert("fileMapper.insertFileInfo", fileInfo);
    }

    /**
     * 파일 정보를 조회 한다.
     *
     * @param fileKey File Key
     * @return 저장된 파일 정보
     */
    public FileInfo getFileInfo(final String fileKey) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("fileKey", fileKey);
        return sqlSession.selectOne("fileMapper.getFileInfo", params);
    }

    /**
     * 파일 정보를 삭제 한다.
     *
     * @param fileKey File Key
     * @return 삭제된 개수
     */
    public int deleteFile(final String fileKey) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("fileKey", fileKey);
        return sqlSession.delete("fileMapper.deleteFile", params);
    }
}
