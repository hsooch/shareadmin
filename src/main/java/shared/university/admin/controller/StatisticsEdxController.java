package shared.university.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.service.CodeService;
import shared.university.admin.service.StatisticsEdxService;

/**
 * <pre>
 * open edx db 통계 처리를 위한 controller 클래스입니다.
 * </pre>
 * 
 * @author enciel
 * @since JDK1.7
 */
@Controller
@RequestMapping("/statisticsedx")
@Slf4j
public class StatisticsEdxController{
	/**
	 * <pre>
	 * 공통 코드 정보를 언기 위한 서비스 클래스 선언입니다.
	 * </pre>
	 */
	@Autowired
	private CodeService codeService;

	/**
	 * <pre>
	 * 통계 데이터 로직 처리를 위한 서비스 클래스 선언입니다.
	 * </pre>
	 */
	@Autowired
	private StatisticsEdxService statisticsEdxService;

	/**
	 * <pre>
	 * edx 통계 메인 화면을 호출합니다.
	 * </pre>
	 * 
	 * @param model 파라미터 설정을 위한 model 객체
	 * @return edx 통계 main 페이지 경로를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	@RequestMapping(value = "/main")
	public String viewMain(Model model) throws Exception{
		model.addAllAttributes(this.statisticsEdxService.selectOrgNameList());
		return "statistics/statisticsEdxMain";
	}

	/**
	 * <pre>
	 * 기관별 통계 정보를 보여줍니다.
	 * </pre>
	 * 
	 * @param params 파라미터 정보를 담고 있는 Map 객체.
	 * @param request 요청 정보.
	 * @return 기관별 통계 정보를 담고 있는 ModelAndView 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	@RequestMapping(value = "/orgCaseStatList")
	public ModelAndView viewOrgCaseStatList(@RequestParam Map<String, Object> params,
			HttpServletRequest request) throws Exception{
		log.debug("StatisticsEdxController.viewOrgCaseStatList() params >>>> " + params);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("statistics/statisticsEdxMain");
		modelAndView
				.addAllObjects(this.statisticsEdxService.selectOrgCaseStatList(params));
		modelAndView.addAllObjects(params);

		log.debug("StatisticsEdxController.viewOrgCaseStatList() modelAndView >>>> "
				+ modelAndView);
		return modelAndView;
	}

	/**
	 * <pre>
	 * 학생별 통계 정보를 보여줍니다.
	 * </pre>
	 * 
	 * @param params 파라미터 정보를 담고 있는 Map 객체.
	 * @param request 요청 정보.
	 * @return 학생별 통계 정보를 담고 있는 ModelAndView 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	@RequestMapping(value = "/studentCaseStatList")
	public ModelAndView viewStudentCaseStatList(@RequestParam Map<String, Object> params,
			HttpServletRequest request) throws Exception{
		log.debug(
				"StatisticsEdxController.viewStudentCaseStatList() params >>> " + params);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("statistics/studentCaseStatList");
		modelAndView.addAllObjects(
				this.statisticsEdxService.selectStudentCaseStatList(params));
		modelAndView.addAllObjects(this.statisticsEdxService.selectOrgNameList());
		modelAndView.addAllObjects(params);

		// log.debug("StatisticsEdxController.viewStudentCaseStatList() modelAndView >>>>
		// "
		// + modelAndView);
		return modelAndView;
	}

	/**
	 * <pre>
	 * 등록 기관별 통계 정보를 보여줍니다.
	 * </pre>
	 * 
	 * @param params 파라미터 정보를 담고 있는 Map 객체.
	 * @param request 요청 정보.
	 * @return 등록 기관별 통계 정보를 담고 있는 ModelAndView 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	@RequestMapping(value = "/regOrgCaseStatList")
	public ModelAndView viewRegOrgCaseStatList(@RequestParam Map<String, Object> params,
			HttpServletRequest request) throws Exception{
		log.debug(
				"StatisticsEdxController.viewRegOrgCaseStatList() params >>> " + params);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("statistics/regOrgCaseStatList");
		modelAndView.addAllObjects(
				this.statisticsEdxService.selectRegOrgCaseStatList(params));
		modelAndView.addAllObjects(this.statisticsEdxService.selectOrgNameList());
		modelAndView.addAllObjects(params);
		modelAndView.addAllObjects(this.selectCodeList());

		log.debug("StatisticsEdxController.viewRegOrgCaseStatList() modelAndView >>>> "
				+ modelAndView);
		return modelAndView;
	}

	/**
	 * <pre>
	 * 학습활동 내용을 보여줍니다.
	 * </pre>
	 * 
	 * @param params 파라미터 정보를 담고 있는 Map 객체.
	 * @param request 요청 정보.
	 * @return 해당 강좌에 대한 사용자 학습활동 정보를 담고 있는 ModelAndView 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	@RequestMapping(value = "/courseActivityPopup")
	public ModelAndView courseActivityPopup(@RequestParam Map<String, Object> params,
			HttpServletRequest request) throws Exception{
		log.debug("StatisticsEdxController.popupCouserStructure() params >>> " + params);

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("statistics/courseActivityPopup");
		modelAndView
				.addAllObjects(this.statisticsEdxService.selectCourseActivity(params));
		modelAndView.addAllObjects(params);

		log.debug("StatisticsEdxController.popupCouserStructure() modelAndView >>>> "
				+ modelAndView);
		return modelAndView;
	}

	/**
	 * <pre>
	 * 통꼐 목록을 excel 파일로 다운로드합니다.
	 * </pre>
	 * 
	 * @param params 파라미터 정보를 담고 있는 Map 객체.
	 * @param response http 응답 객체.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	@RequestMapping(value = "/downloadStatList", method = RequestMethod.POST)
	public void downloadStatList(@RequestParam Map<String, Object> params,
			HttpServletResponse response) throws Exception{
		log.debug("StatisticsEdxController.downloadStatList() params >>>> " + params);

		this.statisticsEdxService.statExcelDownload(params, response);
	}

	/**
	 * <pre>
	 * 공통 코드 정보 중 subject(분야)/type(종류) 정보를 읽어와 Map에 담습니다.
	 * </pre>
	 * 
	 * @return subject(분야)/type(종류) 정보를 담은 Map 객체를 반환합니다.
	 * @throws Exception 오류가 발생할 경우 exception을 발생시킵니다.
	 */
	private Map<String, Object> selectCodeList() throws Exception{
		Map<String, Object> codesMap = new HashMap<String, Object>();
		codesMap.put("SubjectList", this.codeService.selectCodeList("CTC00000000"));
		codesMap.put("TypeList", this.codeService.selectCodeList("CTT00000000"));

		return codesMap;
	}
}
