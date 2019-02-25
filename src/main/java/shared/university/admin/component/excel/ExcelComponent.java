package shared.university.admin.component.excel;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import shared.university.admin.Const;
import shared.university.admin.utils.StringUtil;

/**
 * Excel Component 
 *
 * Created on 2018. 3. 23.
 *
 * @author 스퀘어네트(이현준)
 * @since JDK1.7
 */

@Component
@Slf4j
public class ExcelComponent {

	/**
	 * List data 엑셀 다운로드
	 * @param response OutputStream를 사용하기 위함.
	 * @param feature 엑셀 양식 정의 객체
	 * @param paramMap 엑셀 데이터 및 기타 설정값.
	 *
	 */
	public void excelDownLoad(HttpServletResponse response, ExcelFeature feature, Map<String, Object> excelMap) throws Exception{
		log.debug("excelDownLoad START");
		
		ExcelWriter ex = new ExcelWriter(feature);
		ex.setData(0, (List<?>)(excelMap.get("excelList")));
		
		//파일명에 현재날짜 및 시간 추가
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		Date dt = new Date(); //현재시간
		final String dateTime = sdf.format(dt);
		
		response.setHeader("Content-Disposition", "attachement; filename=\""+ java.net.URLEncoder.encode(StringUtil.nvltoStr(excelMap.get("fileName"),Const.EXCEL_FILE_NAME_DEFAULT)+"현황_"+dateTime+".xlsx", "UTF-8") + "\";charset=\"UTF-8\"");
		response.setContentType("application/vnd.ms-excel");
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		ex.writeFile(response.getOutputStream());
		
		log.debug("excelDownLoad END");
	}

	/**
	 * 정해진 엑셀 양식 내에 List data 다운로드
	 * @param response OutputStream를 사용하기 위함.
	 * @param feature 엑셀 양식 정의 객체
	 * @param paramMap 엑셀 데이터 및 기타 설정값.
	 *
	 */
	public void excelDownLoad(HttpServletResponse response, InputStream stream, ExcelFeature feature, Map<String, Object> excelMap) throws Exception{
		log.debug("excelDownLoad InputStream START");
		
		ExcelWriter ex = new ExcelWriter(feature, stream);
		ex.setDataSheet(0, (List<?>)(excelMap.get("excelList")));
		
		//파일명에 현재날짜 및 시간 추가
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		Date dt = new Date(); //현재시간
		final String dateTime = sdf.format(dt);
		
		response.setHeader("Content-Disposition", "attachement; filename=\""+ java.net.URLEncoder.encode(StringUtil.nvltoStr(excelMap.get("fileName"),Const.EXCEL_FILE_NAME_DEFAULT)+"_"+dateTime+".xlsx", "UTF-8") + "\";charset=\"UTF-8\"");
		response.setContentType("application/vnd.ms-excel");
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		ex.writeFile(response.getOutputStream());
		
		log.debug("excelDownLoad InputStream END");
	}
}
