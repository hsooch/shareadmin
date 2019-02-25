package shared.university.admin.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import shared.university.admin.AppException;
import shared.university.admin.Const;
import shared.university.admin.ResultCode;
import shared.university.admin.domain.UniversityInfo;
import shared.university.admin.domain.UserSession;
import shared.university.admin.service.UniversityService;
import shared.university.admin.utils.AppUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 대학교 정보관리/MOU 대학관리 기능을 제공하는 Controller
 *
 * Created on 2018. 4. 11.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/university")
@Slf4j
public class UniversityController {

    private final UniversityService universityService;

    @Autowired
    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    /**
     * 대학 정보 관리 페이지 로드
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/info")
    public String viewUniversityInfo() {
        return "university/universityInfo";
    }

    /**
     * MOU 대학 관리 페이지 로드
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/mou")
    public String viewMOUUniversity() {
        return "university/mouUniversity";
    }

    /**
     * 대학 정보 등록 (로고 파일 포함)
     *
     * @param file 로고 파일 바이너리
     * @param info 대학교 정보 데이터
     * @throws Exception java.lang
     * @return 처리 결과 코드
     */
    @RequestMapping(value = "/submitWithLogo", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> submitInfo(@RequestParam(value = "file", required = false) MultipartFile file,
                          @ModelAttribute UniversityInfo info,
                          HttpServletRequest request) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        log.info("User Session => {}", session);
        info.setRegUserSeq(session.getUserSeq());
        info.setModUserSeq(session.getUserSeq());

        log.info("file => {}", file);
        log.info("info => {}", info);
        return universityService.saveUniversityInfo(info, file);
    }

    /**
     * 대학 정보 등록 (로고 파일 미포함)
     *
     * @param info 대학교 정보 데이터
     * @throws Exception java.lang
     * @return 처리 결과 코드
     */
    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> submitInfo(@ModelAttribute UniversityInfo info, HttpServletRequest request) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        log.info("User Session => {}", session);
        info.setRegUserSeq(session.getUserSeq());
        info.setModUserSeq(session.getUserSeq());

        log.info("info => {}", info);
        return universityService.saveUniversityInfo(info, null);
    }

    /**
     * 대학교 정보를 조회한다.
     *
     * @param code 대학교 코드
     * @return 대학교 정보
     */
    @RequestMapping(value = "/info/{code}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getInfo(@PathVariable String code) {
        log.info("University Code => {}", code);
        return universityService.getUniversityInfo(code);
    }

    /**
     * 개별 및 협의회에 속한 MOU 대학 목록 조회
     *
     * @param univCode 대학교 코드
     * @param isUnderLine 지역 구분 라인 삽입 여부
     * @return MOU 대학 목록
     */
    @RequestMapping(value = "/mou/getMouUnivList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getMouUnivList(@RequestParam(required = false) final String univCode,
                                              @RequestParam(defaultValue = "false") final boolean isUnderLine) {
        log.info("univCode => {}, isUnderLine => {}", univCode, isUnderLine);
        return universityService.getMouUnivList(univCode, isUnderLine);
    }

    /**
     * 참여중인 MOU 협의회 목록
     *
     * @param univCode 조회할 대학 코드
     * @return 협의회 목록
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/mou/getAttachedGroupList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getAttachedGroupList(@RequestParam(required = false) final String univCode) throws Exception {
        log.info("univCode => {}", univCode);
        if (StringUtils.isEmpty(univCode)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        } else {
            return universityService.getAttachedGroupList(univCode);
        }
    }

    /**
     * 참여중이 아닌 MOU 협의회 목록
     *
     * @param univCode 조회할 대학 코드
     * @return 협의회 코드 목록
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/mou/getUnAttachedGroupList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getUnAttachedGroupList(@RequestParam(required = false) final String univCode) throws Exception {
        log.info("univCode => {}", univCode);
        if (StringUtils.isEmpty(univCode)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        } else {
            return universityService.getUnAttachedGroupList(univCode);
        }
    }

    /**
     * 참여할 MOU 협의회 추가
     *
     * @param request HttpServletRequest
     * @param univCode 대학 코드
     * @param mouTypeList 협의회 코드 목록
     * @return 처리 결과 코드
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/mou/addMouGroup", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addMouGroup(HttpServletRequest request,
                                           @RequestParam(required = false) final String univCode,
                                           @RequestParam(required = false) final List<String> mouTypeList) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        if (StringUtils.isEmpty(univCode) || AppUtils.isEmpty(mouTypeList)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        } else {
            return universityService.addMouGroup(session, univCode, mouTypeList);
        }
    }

    /**
     * 참여중인 MOU 협의회 제거
     *
     * @param univCode 대학 코드
     * @param mouTypeList 협의회 코드 목록
     * @return 처리 결과 코드
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/mou/removeMouGroup", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> removeMouGroup(@RequestParam(required = false) final String univCode,
                                              @RequestParam(required = false) final List<String> mouTypeList) throws Exception {
        if (StringUtils.isEmpty(univCode) || AppUtils.isEmpty(mouTypeList)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        } else {
            return universityService.removeMouGroup(univCode, mouTypeList);
        }
    }

    /**
     * MOU 개별 협약 대학 리스트 조회
     *
     * @param univCode 대학 코드
     * @return MOU 대학 목록
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/mou/getIndividualMouList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getIndividualMouList(
            @RequestParam(required = false) final String univCode) throws Exception {
        log.info("univCode => {}", univCode);
        if (StringUtils.isEmpty(univCode)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        } else {
            return universityService.getIndividualMouList(univCode);
        }
    }

    /**
     * MOU 설정이 되어 있지 않은 대학 목록 조회
     *
     * @param areaCode 지역 코드
     * @param univCode 조회 대상 대학 코드
     * @return 대학 코드 목록
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/mou/getUnivListWithoutMou", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getUnivListWithoutMou(
            @RequestParam(required = false) final String areaCode,
            @RequestParam(required = false) final String univCode) throws Exception {
        log.info("areaCode({}), univCode({})", areaCode, univCode);
        if (StringUtils.isEmpty(areaCode) || StringUtils.isEmpty(univCode)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        } else {
            return universityService.getUnivListWithoutMou(areaCode, univCode);
        }
    }

    /**
     * 개별 협약 대학 추가
     *
     * @param request HttpServletRequest
     * @param univCode 대상 대학 코드
     * @param mouUnivList MOU 대학 코드 목록
     * @return 처리 결과 코드
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/mou/addIndividualMouUniv", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addIndividualMouUniv(
            HttpServletRequest request,
            @RequestParam(required = false) final String univCode,
            @RequestParam(required = false) final List<String> mouUnivList) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        if (StringUtils.isEmpty(univCode) || AppUtils.isEmpty(mouUnivList)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        } else {
            return universityService.addIndividualMouUniv(session, univCode, mouUnivList);
        }
    }

    /**
     * 개별 협약 대학 삭제
     *
     * @param univCode 대상 대학 코드
     * @param mouUnivList 삭제할 MOU 대학 코드
     * @return 처리 결과 코드
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/mou/removeIndividualMouUniv", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> removeIndividualMouUniv(@RequestParam(required = false) final String univCode,
                                                       @RequestParam(required = false) final List<String> mouUnivList) throws Exception {
        if (StringUtils.isEmpty(univCode) || AppUtils.isEmpty(mouUnivList)) {
            throw new AppException(ResultCode.REQUIRED_PARAMETERS);
        } else {
            return universityService.removeIndevidualMouUniv(univCode, mouUnivList);
        }
    }

    /**
     * MOU 대학의 교류 신청 인원 제한 설정
     *
     * @param request HttpServletRequest
     * @param body JSON body
     * @return 처리 결과 코드
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/mou/saveMouApplyLimit", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> saveMouApplyLimit(HttpServletRequest request, @RequestBody final Map<String, Object> params) throws Exception {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        return universityService.saveMouApplyLimit(session, params);

    }
}
