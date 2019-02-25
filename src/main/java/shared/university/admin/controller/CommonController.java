package shared.university.admin.controller;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import shared.university.admin.AppProperties;
import shared.university.admin.Const;
import shared.university.admin.UMap;
import shared.university.admin.component.MoocHttpClientComponent;
import shared.university.admin.domain.UserSession;
import shared.university.admin.domain.mCourseDataVO;
import shared.university.admin.utils.AppUtils;

import javax.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;

/**
 * Created on 2018. 3. 26.
 *
 * @author 스퀘어네트(최성헌)
 * @since JDK1.7
 */
@Controller
@Slf4j
public class CommonController {

	@Autowired
	private MoocHttpClientComponent moocHttpComponent;

    /**
     * 주소 입력 팝업 창 로드
     *
     * @param request HttpServletRequest
     * @return 페이지 경로
     */
    @RequestMapping(value = "/address/popup")
    public String viewAddressPopup(final HttpServletRequest request) {
        final String addrConfirmKey = AppProperties.getProperty("address.confirm.key");
        log.info("Address confirm key => {}", addrConfirmKey);
        request.setAttribute("addrConfirmKey", addrConfirmKey);
        request.setAttribute("serverDomain", AppProperties.getProperty("admin.server.domain"));

        return "commons/jusoPopup";
    }

    /**
     * 사용자 로그인 세션 정보를 조회 한다.
     *
     * @param request HttpServletRequest
     * @return 세션 정보
     */
    @RequestMapping(value = "/commons/session", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getUserSession(final HttpServletRequest request) {
        final UserSession session = (UserSession)request.getAttribute(Const.USER_SESSION_KEY);
        final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
        if (session != null) {
            resultMap.put("session", session);
        }

        return resultMap;
    }
	
	/**
     * 공개강좌 목록 조회
     * @param paramMap 검색조건
     * @return resultMap 조회결과 
     * @throws Exception java.lang
     */
	@RequestMapping("/mooc/getCourseList")
	@ResponseBody
	public Map<String, Object> getCourseList(@RequestParam Map<String, Object> paramMap) throws Exception {
		final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();

		List<UMap<String, Object>> jsonList = moocHttpComponent.apiData(paramMap);

		resultMap.put("courseList", jsonList);
		
		return resultMap;
	}
}
