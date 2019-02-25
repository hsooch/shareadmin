package shared.university.admin.controller;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.io.BaseEncoding;

import shared.university.admin.component.MoocHttpClientComponent;
import shared.university.admin.dao.CodeDao;
import shared.university.admin.domain.CodeVO;
import shared.university.admin.domain.mCourseDataVO;
import shared.university.admin.service.CodeService;

import shared.university.admin.utils.AppUtils;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 카테고리 맵핑 정보 조회  및 맵핑 기능을 제공하는 Controller
 *
 * Created on 2018. 4. 4.
 *
 * @author 스퀘어네트 
 * @since JDK1.7
 */
@Controller
@RequestMapping("/category")
@Slf4j
public class CatMappingController {

	
   @Autowired
   private MoocHttpClientComponent moocHttpComponent;
   
   @Autowired   
   private CodeService codeService;
   
 
    
	   /**
     * 카테고리 정보 관리 목록 조회 페이지
     *
     * @return 페이지 경로
     */
    @RequestMapping(value = "/mapping/list")
    public ModelAndView viewCatMappingList(HttpServletRequest req, HttpServletResponse response, ModelMap model) throws Exception {
    	
    	List<mCourseDataVO> jsonList = moocHttpComponent.JsonData("GET");
    	
    	
    	 
    	log.info("{}:" + jsonList);
    
    	//List<String> courseinfo =  repository.findByCodeInfo("TMTP0001"); 	//코드 테이블 정의된 코드값 (추후 group code 변경 여부 확인)
    	//List<String> coursetype = repository.findByCodeInfo("TMTP0002"); 
    	
    	List<String> courseinfo = new ArrayList();
    	List<String> coursetype = new ArrayList();
    	 
    	Map<String, Object> codeList = codeService.selectCodeList("CTC00000000");    	
    	List<CodeVO> mapValues = (List<CodeVO>)codeList.get("codeList");
    	log.info("{codeValues}" + mapValues + ":" + mapValues.size());
    	for(int i=0; i < mapValues.size(); i++){
    		courseinfo.add(mapValues.get(i).getCodeName());
    	}
    	 
    	
    	codeList = codeService.selectCodeList("CTT00000000");
    	mapValues = (List<CodeVO>)codeList.get("codeList");
    	log.info("{codeValues}" + mapValues + ":" + mapValues.size());
    	for(int i=0; i < mapValues.size(); i++){
    		coursetype.add(mapValues.get(i).getCodeName());
    	}
    	 
    	
    	ModelAndView mv = new ModelAndView();
    	model.addAttribute("jsonList", jsonList);
    	model.addAttribute("courseinfo", courseinfo);    	
    	model.addAttribute("coursetype", coursetype);
    	
		mv.setViewName("category/mappingList");
    	return mv;
    
    }

    
    

 
	/**
     * 과정, 타입 적용 
     * elasticsearch 연동 : 정보 변경
     * @param type
     * @return
     */  
    
    @RequestMapping(value = "/mapping/mapping")
    @ResponseBody
    public Map mapping(HttpServletRequest request,HttpServletResponse response,  @RequestBody List<mCourseDataVO> param ) throws Exception {
    	
    	Map map = null;
    	map = moocHttpComponent.readJson("POST", param);  
    	
    	Map result = new HashMap();
    	if(map == null) {
    		result.put("msg", "false");    		
    	}else{    		
    		result.put("msg", "success");    		
    	}    	
    	log.info("{model} : " + result);
    	return result;
    
	}
    
}
