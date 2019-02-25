package shared.university.admin.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import shared.university.admin.AppException;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.UMap;
import shared.university.admin.dao.FileDao;
import shared.university.admin.dao.UniversityDao;
import shared.university.admin.domain.FileInfo;
import shared.university.admin.domain.UniversityInfo;
import shared.university.admin.domain.UserSession;
import shared.university.admin.utils.AppUtils;

import java.util.List;
import java.util.Map;

/**
 * 대학교 관리 기능을 제공하는 Service
 *
 * Created on 2018. 4. 16.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Service
@Slf4j
public class UniversityService {

    private final FileService fileService;

    private final UniversityDao universityDao;

    private final FileDao fileDao;

    @Autowired
    public UniversityService(FileService fileService, UniversityDao universityDao, FileDao fileDao) {
        this.fileService = fileService;
        this.universityDao = universityDao;
        this.fileDao = fileDao;
    }

    /**
     * 대학 정보 저장
     *
     * @param info 대학교 정보
     * @param file 대학교 로고 파일 정보
     * @throws Exception java.lang
     * @return 처리 결과 코드
     */
    public Map<String, Object> saveUniversityInfo(final UniversityInfo info, final MultipartFile file) throws Exception {
        // 등록된 대학 정보가 있는지 정보 조회
        final UniversityInfo aleadyUniversityInfo = universityDao.getUniversityInfo(info.getUniversityCode());
        if ("Y".equals(info.getLogoDeleteYn())) {
            this.deleteLogoFile(aleadyUniversityInfo.getUniversityCode(), aleadyUniversityInfo.getLogoFileKey());
        }

        // 파일 정보 존재 시 파일 저장
        FileInfo fileInfo = null;
        if (file != null) {
            fileInfo = fileService.saveFile(file);
            info.setLogoFileKey(fileInfo.getFileKey());
        }

        // 대학 정보 저장
        if (aleadyUniversityInfo == null) {
            universityDao.insertUniversityInfo(info);
        } else {
            universityDao.updateUniversityInfo(info);
            if ("Y".equals(info.getLogoDeleteYn())) {
                fileDao.deleteFile(aleadyUniversityInfo.getLogoFileKey());
            }
        }

        return AppUtils.createDefaultResultMap();
    }

    /**
     * 대학 정보를 조회 한다.
     *
     * @param universityCode 대학교 코드
     * @return 대학교 정보
     */
    public Map<String, Object> getUniversityInfo(final String universityCode) {
        // DB 조회
        final UniversityInfo info = universityDao.getUniversityInfo(universityCode);

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (info != null) {
            resultMap.put("info", info);
        }

        return resultMap;
    }

    /**
     * MOU 대학 목록 조회
     *
     * @param univCode 대학 코드
     * @return MOU 대학 목록
     */
    public Map<String, Object> getMouUnivList(final String univCode, final boolean isUnderLine) {
        // DB 조회
        List<UMap<String, Object>> mouList = universityDao.getMouUnivList(univCode);

        // 지역별 언더라인 삽입
        if (isUnderLine) {
            final String keyAreaName = "areaName";
            final String keyMouUnivCode = "mouUnivCode";
            String tempArea = null;
            List<UMap<String, Object>> tempMouList = Lists.newArrayList();
            for (UMap<String, Object> mouMap : mouList) {
                if (mouMap.getString(keyAreaName).equals(tempArea)) {
                    tempMouList.add(mouMap);
                } else {
                    if (tempArea != null) {
                        final UMap<String, Object> lineMap = new UMap<>();
                        lineMap.put(keyMouUnivCode, "-1");
                        tempMouList.add(lineMap);
                    }

                    tempArea = mouMap.getString(keyAreaName);
                    tempMouList.add(mouMap);
                }
            }

            mouList = tempMouList;
        }

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (AppUtils.isNotEmpty(mouList)) {
            resultMap.put("mouList", mouList);
        }

        return resultMap;
    }

    /**
     * 참여중인 MOU 협의회 목록
     *
     * @param univCode 조회할 대학 코드
     * @return 협의회 목록
     */
    public Map<String, Object> getAttachedGroupList(final String univCode) {
        // 데이터 조회
        final List<UMap<String, Object>> groupList = universityDao.getAttachedGroupList(univCode);

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (AppUtils.isNotEmpty(groupList)) {
            resultMap.put("groupList", groupList);
        }

        return resultMap;
    }

    /**
     * 참여중이 아닌 MOU 협의회 목록 조회
     *
     * @param univCode 조회 대상 대학 코드
     * @return 협의회 코드 목록
     */
    public Map<String, Object> getUnAttachedGroupList(final String univCode) {
        // 데이터 조회
        final List<UMap<String, Object>> groupCodeList = universityDao.getUnAttachedGroupList(Const.CODE_MOU_GROUP, univCode);

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (AppUtils.isNotEmpty(groupCodeList)) {
            resultMap.put("groupCodeList", groupCodeList);
        }

        return resultMap;
    }

    /**
     * 참여할 MOU 협의회 추가
     *
     * @param session 로그인 세션
     * @param univCode 대학 코드
     * @param mouTypeList 협의회 그룹 코드 목록
     * @return 결과 코드
     */
    public Map<String, Object> addMouGroup(final UserSession session, final String univCode, final List<String> mouTypeList) {
        // 협의회 데이터 등록
        for (String mouType : mouTypeList) {
            log.info("add mou type : univCode({}) mouType({})", univCode, mouType);
            universityDao.addMouGroup(univCode, mouType, session.getUserSeq());
        }

        return AppUtils.createDefaultResultMap();
    }

    /**
     * 참여중인 MOU 협의회 제거
     *
     * @param univCode 대학 코드
     * @param mouTypeList 협의회 그룹 코드 목록
     * @return 결과 코드
     */
    public Map<String, Object> removeMouGroup(final String univCode, final List<String> mouTypeList) {
        // 협의회 데이터 삭제
        for (String mouType : mouTypeList) {
            log.info("remove mou type : univCode({}), mouType({})", univCode, mouType);
            universityDao.removeMouGroup(univCode, mouType);
        }

        return AppUtils.createDefaultResultMap();
    }

    /**
     * MOU 개별 협약 대학 리스트 조회
     *
     * @param univCode 대학 코드
     * @return MOU 대학 목록
     */
    public Map<String, Object> getIndividualMouList(final String univCode) {
        // 데이터 조회
        final List<UMap<String, Object>> indevidualMouList = universityDao.getIndividualMouList(univCode);

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (AppUtils.isNotEmpty(indevidualMouList)) {
            resultMap.put("individualMouList", indevidualMouList);
        }

        return resultMap;
    }

    /**
     * MOU 설정이 되어 있지 않은 대학 목록 조회
     *
     * @param areaCode 지역 코드
     * @param univCode 조회 대상 대학 코드
     * @return 대학 코드 목록
     */
    public Map<String, Object> getUnivListWithoutMou(final String areaCode, final String univCode) {
        // 데이터 조회
        final List<UMap<String, Object>> univList = universityDao.getUnivListWithoutMou(areaCode, univCode);

        // 결과 데이터 맵핑
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (AppUtils.isNotEmpty(univList)) {
            resultMap.put("univList", univList);
        }

        return resultMap;
    }

    /**
     * 개별 협약 대학 추가
     *
     * @param session 인증 세션
     * @param univCode 대상 대학 코드
     * @param mouUnivList MOU 대학 코드 목록
     * @return 처리 결과 코드
     */
    public Map<String, Object> addIndividualMouUniv(final UserSession session, final String univCode, final List<String> mouUnivList) {
        for (String mouUnivCode : mouUnivList) {
            log.info("add Individual Mou University : univCode({}), mouUnivCode({})");
            universityDao.addIndividualMouUniv(univCode, mouUnivCode, session.getUserSeq());
        }

        return AppUtils.createDefaultResultMap();
    }

    /**
     * 개별 협약 대학 삭제
     *
     * @param univCode 대상 대학 코드
     * @param mouUnivList MOU 대학 코드 목록
     * @return 처리 결과 코드
     */
    public Map<String, Object> removeIndevidualMouUniv(final String univCode, final List<String> mouUnivList) {
        for (String mouUnivCode : mouUnivList) {
            log.info("remove Individual Mou University : univCode({}), mouUnivCode({})");
            universityDao.removeIndevidualMouUniv(univCode, mouUnivCode);
        }

        return AppUtils.createDefaultResultMap();
    }

    /**
     * MOU 대학의 교류 신청 인원 제한 설정
     *
     * @param session 인증 세션
     * @param params 인원 제한 설정 정보
     * @return 처리 결과 코드
     */
    public Map<String, Object> saveMouApplyLimit(final UserSession session, final Map<String, Object> params) throws Exception {
        final Object univCodeObj = params.get("univCode");
        final Object mouObjList = params.get("mouList");
        if (univCodeObj == null || !(mouObjList instanceof List)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        }

        final String univCode = univCodeObj.toString();
        for (Object mouObj : (List)mouObjList) {
            final Map<?, ?> mouMapObj = (Map)mouObj;
            final Object mouUnivCodeObj = mouMapObj.get("mouUnivCode");
            final Object limitCntObj = mouMapObj.get("limitCnt");
            log.info("univCode({}), mouUnivCode({}), limitCnt({})", univCode, mouUnivCodeObj, limitCntObj);
            if (mouUnivCodeObj != null && limitCntObj != null) {
                universityDao.upsertMouApplyLimit(univCode, mouUnivCodeObj.toString(),
                        Integer.parseInt(limitCntObj.toString()), session.getUserSeq());
            }
        }

        return AppUtils.createDefaultResultMap();
    }

    private void deleteLogoFile(final String universityCode, final String fileKey) {
        log.info("Delete universityCode({}), fileKey({})", universityCode, fileKey);
        universityDao.removeLogoFile(universityCode);
        fileDao.deleteFile(fileKey);
    }
}
