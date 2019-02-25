package shared.university.admin.dao;

import com.google.common.collect.Maps;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import shared.university.admin.UMap;
import shared.university.admin.domain.MouUniversityVO;
import shared.university.admin.domain.UniversityInfo;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * 대학교 관리 데이터 엑세스 오브젝트
 *
 * Created on 2018. 4. 10.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Repository
public class UniversityDao {

    @Resource(name="sqlSession")
    private SqlSessionTemplate sqlSession;

    /**
     * 대학교 정보를 등록 한다.
     *
     * @param universityInfo 대학교 정보
     * @return 입력 개수
     */
    public int insertUniversityInfo(final UniversityInfo universityInfo){
    	return sqlSession.insert("universityMapper.insertUniversityInfo", universityInfo);
    }

    /**
     * 대학교 정보를 갱신한다.
     *
     * @param universityInfo 대학교 정보
     * @return 수정된 레코드 개수
     */
    public int updateUniversityInfo(final UniversityInfo universityInfo) {
        return sqlSession.update("universityMapper.updateUniversityInfo", universityInfo);
    }

    /**
     * 대학교 정보를 조회 한다.
     *
     * @param universityCode 대학교 코드
     * @return 저장된 대학교 정보
     */
    public UniversityInfo getUniversityInfo(final String universityCode) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("universityCode", universityCode);
        return sqlSession.selectOne("universityMapper.getUniversityInfo", params);
    }

    /**
     * 대학교 정보에서 등록된 로고 파일을 제거 한다.
     *
     * @param universityCode 대학교 코드
     * @return 저장된 대학교 정보
     */
    public int removeLogoFile(final String universityCode) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("universityCode", universityCode);
        return sqlSession.update("universityMapper.removeLogoFile", params);
    }

    /**
     * MOU 대학교 정보 저장
     *
     * @param vo MOU 대학교 정보
     * @return 입력 개수
     */
    public int insertUniversityMou(final MouUniversityVO vo) {
        return sqlSession.insert("universityMapper.insertUniversityMou", vo);
    }

    /**
     * MOU 대학교 정보를 삭제한다.
     *
     * @param seq 삭제할 시퀀스
     * @return 삭제된 데이터 개수
     */
    public int deleteUniversityMou(final Integer seq) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("seq", seq);
        return sqlSession.delete("universityMapper.deleteUniversityMou", params);
    }

    /**
     * MOU 대학으로 설정된 항목의 정렬값을 변경한다.
     *
     * @param mouIndex 변경할 정렬 값
     * @param seq 변경할 시퀀스
     * @return 갱신된 데이터 개수
     */
    public int updateMouIndex(final String mouIndex, final Integer seq) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("mouIndex", mouIndex);
        params.put("seq", seq);
        return sqlSession.update("universityMapper.updateMouIndex", params);
    }

    /**
     * 개별 및 협의회에 속한 MOU 대학 목록 조회
     *
     * @param univCode 조회할 대학교 코드
     * @return MOU 대학 목록
     */
    public List<UMap<String, Object>> getMouUnivList(final String univCode) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("univCode", univCode);
        return sqlSession.selectList("universityMapper.getMouUnivList", params);
    }

    /**
     * 참여중인 MOU 협의회 목록 조회
     *
     * @param univCode 조회 대상 대학교
     * @return 협의회 목록
     */
    public List<UMap<String, Object>> getAttachedGroupList(final String univCode) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("univCode", univCode);
        return sqlSession.selectList("universityMapper.getAttachedGroupList", params);
    }

    /**
     * 참여중이 아닌 MOU 협의회 목록 조회
     *
     * @param mouGroupCode 협의회 최상위 코드
     * @param univCode 조회 대상 대학교
     * @return 협의회 코드 목록
     */
    public List<UMap<String, Object>> getUnAttachedGroupList(final String mouGroupCode, final String univCode) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("mouGroupCode", mouGroupCode);
        params.put("univCode", univCode);
        return sqlSession.selectList("universityMapper.getUnAttachedGroupList", params);
    }

    /**
     * 참여할 MOU 협의회 추가
     *
     * @param univCode 대학 코드
     * @param mouType 협의회 코드
     * @param userSeq 등록자 시퀀스
     */
    public void addMouGroup(final String univCode, final String mouType, final Integer userSeq) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("univCode", univCode);
        params.put("mouType", mouType);
        params.put("userSeq", userSeq);
        sqlSession.insert("universityMapper.addMouGroup", params);
    }

    /**
     * 참여중인 MOU 협의회 제거
     *
     * @param univCode 대학 코드
     * @param mouType 협의회 코드
     */
    public void removeMouGroup(final String univCode, final String mouType) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("univCode", univCode);
        params.put("mouType", mouType);
        sqlSession.delete("universityMapper.removeMouGroup", params);
    }

    /**
     * MOU 개별 협약 대학 리스트 조회
     *
     * @param univCode 대학 코드
     * @return 협약 대학 목록
     */
    public List<UMap<String, Object>> getIndividualMouList(final String univCode) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("univCode", univCode);
        return sqlSession.selectList("universityMapper.getIndividualMouList", params);
    }

    /**
     * MOU 설정이 되어 있지 않은 대학 목록 조회
     *
     * @param areaCode 지역 코드
     * @param univCode 조회 대상 대학 코드
     * @return 대학 코드 목록
     */
    public List<UMap<String, Object>> getUnivListWithoutMou(final String areaCode, final String univCode) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("areaCode", areaCode);
        params.put("univCode", univCode);
        return sqlSession.selectList("universityMapper.getUnivListWithoutMou", params);
    }

    /**
     * 개별 협약 대학 추가
     *
     * @param univCode 대상 대학 코드
     * @param mouUnivCode MOU 대학 코드
     * @param userSeq 등록자 시퀀스
     */
    public void addIndividualMouUniv(final String univCode, final String mouUnivCode, final Integer userSeq) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("univCode", univCode);
        params.put("mouUnivCode", mouUnivCode);
        params.put("userSeq", userSeq);
        sqlSession.insert("universityMapper.addIndividualMouUniv", params);
    }

    /**
     * 개별 협약 대학 삭제
     *
     * @param univCode 대상 대학 코드
     * @param mouUnivCode MOU 대학 코드
     */
    public void removeIndevidualMouUniv(final String univCode, final String mouUnivCode) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("univCode", univCode);
        params.put("mouUnivCode", mouUnivCode);
        sqlSession.delete("universityMapper.removeIndevidualMouUniv", params);
    }

    /**
     * MOU 대학의 교류 신청 인원 제한 등록 및 갱신
     *
     * @param univCode 대학교 코드
     * @param mouUnivCode MOU 대학 코드
     * @param limitCnt 제한 인원 수
     */
    public void upsertMouApplyLimit(final String univCode, final String mouUnivCode, final Integer limitCnt, final Integer userSeq) {
        final Map<String, Object> params = Maps.newHashMap();
        params.put("univCode", univCode);
        params.put("mouUnivCode", mouUnivCode);
        params.put("limitCnt", limitCnt);
        params.put("userSeq", userSeq);
        sqlSession.insert("universityMapper.upsertMouApplyLimit", params);
    }

}
