package shared.university.admin.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.service.MenuService;
import shared.university.admin.utils.AppUtils;

/**
 * 메뉴관리 관련 페이지 및 기능을 제공하는 Controller
 *
 * Created on 2018. 5. 11.
 *
 * @author 스퀘어네트(황수찬)
 * @since JDK1.7
 */
@Controller
@RequestMapping("/menu")
@Slf4j
public class MenuController {

	private final MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }
	
    /**
     * 메뉴 관리 페이지 로딩
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/management")
    public String viewMenuManagement() {
        return "menu/menuManagement";
    }
    
    /**
     * 메뉴관리 메뉴목록 조회
     *
     * @return 메뉴목록
     */
    @RequestMapping(value = "/{parentSeq}/getMenuList")
    @ResponseBody
    public Map<String, Object> getMenuList(@PathVariable String parentSeq) {
        log.info("Parent Seq => {}", parentSeq);
        return menuService.getMenuList(parentSeq);
    }
    
    /**
     * 선택한 메뉴 정보를 조회 한다.
     *
     * @param seq 시퀀스 값
     * @return 메뉴 정보
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/info/{seq}")
    @ResponseBody
    public Map<String, Object> getMenuInfo(@PathVariable String seq, HttpServletRequest req) throws Exception {
    	 return menuService.getMenuInfo(seq);
    }
    
    /**
     * 메뉴 정보 저장
     * 
     * @param paramMap
     * @return 결과 데이터
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/saveMenuInfo")
    @ResponseBody
    public Map<String, Object> saveMenuInfo(@RequestParam Map<String, Object> paramMap) throws Exception {
    	menuService.saveMenuInfo(paramMap);
    	return AppUtils.createDefaultResultMap();
    }
    
    /**
     * 메뉴 삭제 (숨김)
     * @param paramMap
     * @return 결과 데이터
     * @throws Exception java.lang
     */
    @RequestMapping(value = "/deleteMenuInfo")
    @ResponseBody
    public Map<String, Object> deleteMenuInfo(@RequestParam Map<String, Object> paramMap) throws Exception {
    	final Map<String, Object> resultMap = menuService.deleteMenuInfo(paramMap);
    	return resultMap;
    }
    
    @RequestMapping(value = "/changeMenuIndex")
    @ResponseBody
    public Map<String, Object> changeMenuIndex(@RequestParam Map<String, Object> paramMap) throws Exception {
    	final Map<String, Object> resultMap = menuService.changeMenuIndex(paramMap);
    	return resultMap;
    }
    
    @RequestMapping(value = "/getTopMenuIndex")
    @ResponseBody
    public Map<String, Object> getTopMenuIndex() throws Exception {
    	log.info("idex => " + menuService.getTopMenuIndex());
    	final Map<String, Object> resultMap = AppUtils.createDefaultResultMap();
    	resultMap.put("idx", menuService.getTopMenuIndex());
    	return resultMap;
    }
    
}
