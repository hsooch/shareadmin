package shared.university.admin.component.excel;

import java.lang.reflect.Method;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import lombok.extern.slf4j.Slf4j;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;

/**
 * 엑셀 읽기/쓰기 시 엑셀 파일의 특성 정보를 관리하는 클래스
 */
@Slf4j
public abstract class ExcelFeature {

	private FormulaEvaluator evaluator = null;
	
	/**
	 * 실제 데이터 행이 시작되는 인덱스 리턴
	 * @return
	 */
	public abstract int getStartRowIdx(int sheetIdx);
	
	/**
	 * 해당하는 셀의 컬럼 타입 리턴
	 * (XSSFCell.CELL_TYPE_NUMERIC, XSSFCell.CELL_TYPE_STRING ... )
	 * @param columnIdx
	 * @return
	 */
	public abstract int getCellType(int sheetIdx, int columnIdx);
	public abstract int getHeaderSize();
	public abstract int getHeaderSize(int rowIdx);
	public abstract int[] getMergeSize(int rowIdx, int columnIdx);
	/**
	 * 해당 셀의 헤더(제목) 리턴
	 * @param columnIdx
	 * @return
	 */
	public abstract String getCellHeader(int sheetIdx, int rowIdx, int columnIdx);
	
	/**
	 * 해당 셀의 수평정렬 값 리턴
	 * @param columnIdx
	 * @return
	 */
	public abstract HorizontalAlignment getCellAllign(int sheetIdx, int columnIdx);
	
	/**
	 * 해당 셀에 빈값 입력 가능여부 리턴
	 * @param columnIdx
	 * @return
	 */
	public abstract boolean getCellNullable(int sheetIdx, int columnIdx);
	
	/**
	 * 각 행이 저장될 VO 클래스 리턴
	 * @return
	 */
	public abstract Class<?> getVoClass(int sheetIdx);

	/**
	 * 컬럼 인덱스에 해당하는 VO 클래스의 변수 명 리턴
	 * @param columnIdx
	 * @return
	 */
	public abstract String getFieldName(int sheetIdx, int columnIdx);
	
	/**
	 * 컬럼의 총 개수 리턴
	 * @return
	 */
	public abstract int getFieldCount(int sheetIdx);
	
	/**
	 * 컬럼 인덱스에 해당하는 VO 클래스의 변수 데이터타입 리턴
	 * @param columnIdx
	 * @return
	 */
	public abstract Class<?> getFieldType(int sheetIdx, int columnIdx);
	
	/**
	 * 해당 셀에 입력 가능 범위 리턴 (int[0]:시작값, int[1]:끝값)
	 * @param columnIdx
	 * @return
	 */
	public abstract int[] getCellRange(int sheetIdx, int columnIdx);
	
	/**
	 * 엑셀 시트 최 상단에 표시될 작성 가이드 리턴
	 * @return
	 */
	public abstract String getGuideMsg(int sheetIdx);
	
	/**
	 * 해당 셀 패턴 리턴
	 * @param columnIdx
	 * @return
	 */
	public abstract String getCellPattern(int sheetIdx, int columnIdx);

	/**
	 * 해당 셀 split 패턴 리턴
	 * @param sheetIdx
	 * @param columnIdx
	 * @return
	 */
	public abstract String getCellSplitPattern(int sheetIdx, int columnIdx);

	/**
	 * 해당 행(Row)을 VO 객체로 리턴
	 * @param row
	 * @return
	 */
	public Object toObject(int sheetIdx, XSSFRow row) {
		
		Object vo = null;

		try {
			Class<?> clazz = getVoClass(sheetIdx);
			if(clazz == null) {
				return null;
			}
			vo = clazz.getConstructor(null).newInstance(null);
		} catch (Exception e) {
			log.warn("", e);
			return null;
		}
		
		for (int columnIdx = 0; columnIdx < row.getPhysicalNumberOfCells(); columnIdx++) {
			XSSFCell cell = row.getCell(columnIdx);
			if(cell == null) {
				continue;
			}
			
			try {
				String fieldNm = getFieldName(sheetIdx, columnIdx);
				
				if(fieldNm == null) {
					continue;
				}
				
				String methodNm = "set" + fieldNm.substring(0, 1).toUpperCase() + fieldNm.substring(1);
				Method setter = vo.getClass().getMethod(methodNm, getFieldType(sheetIdx, columnIdx));
				
				Object value = getValueOfCell(cell);
				if(value == null) {
					continue;
				}
				
				if(value instanceof Double) {
					if(getFieldType(sheetIdx, columnIdx) == int.class) {
						value = ((Double)value).intValue();
					} else if(getFieldType(sheetIdx, columnIdx) == String.class) {
						value = String.valueOf(((Double)value).intValue());
					}
				}
				
				setter.invoke(vo, value);
			} catch (Exception e) {
				log.warn("", e);
				return null;
			}
		}
		
		return vo;
	}
	

	public Map<String, Object> toMap(int sheetIdx, XSSFRow row) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		for (int columnIdx = 0; columnIdx < row.getPhysicalNumberOfCells(); columnIdx++) {
			XSSFCell cell = row.getCell(columnIdx);
			if(cell == null) {
				continue;
			}
			
			try {
				String fieldNm = getFieldName(sheetIdx, columnIdx);
				
				if(fieldNm == null) {
					continue;
				}
				
				Object value = getValueOfCell(cell);
				if(value == null) {
					continue;
				}
				
				if(value instanceof Double) {
					if(getFieldType(sheetIdx, columnIdx) == int.class) {
						value = ((Double)value).intValue();
					} else if(getFieldType(sheetIdx, columnIdx) == String.class) {
						value = String.valueOf(((Double)value).intValue());
					}
				}

				map.put(fieldNm, value);
			} catch (Exception e) {
				log.warn("", e);
				return null;
			}
		}
		
		return map;
	}
	
	/**
	 * 해당 셀의 값 리턴
	 * @param cell
	 * @return
	 */
	public Object getValueOfCell(XSSFCell cell) {
		
		Object value = null;
		DecimalFormat df = new DecimalFormat();

		if (cell != null) {
			switch (cell.getCellType()) {
			// 수식 처리
			case XSSFCell.CELL_TYPE_FORMULA:
				if (!(cell.toString().equalsIgnoreCase(""))) {
					if (getEvaluator().evaluateFormulaCell(cell) == XSSFCell.CELL_TYPE_NUMERIC) {
						value = cell.getNumericCellValue();
					} else if (getEvaluator().evaluateFormulaCell(cell) == XSSFCell.CELL_TYPE_STRING) {
						value = cell.getStringCellValue();
					} else if (getEvaluator().evaluateFormulaCell(cell) == XSSFCell.CELL_TYPE_BOOLEAN) {
						boolean fbdata = cell.getBooleanCellValue();
						value = String.valueOf(fbdata);
					}
					break;
				}
				// 숫자 처리
			case XSSFCell.CELL_TYPE_NUMERIC:
				if (HSSFDateUtil.isCellDateFormatted(cell)) {
					SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
					value = formatter.format(cell.getDateCellValue());
				} else {
					value = cell.getNumericCellValue();
				}
				break;
			// 문자열 처리
			case XSSFCell.CELL_TYPE_STRING:
				value = cell.getStringCellValue();
				break;
			// 빈셀 처리
			case XSSFCell.CELL_TYPE_BLANK:
				value = null;
				break;
			// 에러셀 처리
			case XSSFCell.CELL_TYPE_ERROR:
				value = cell.getErrorCellValue();
				break;
			}
		}
		return value;
	}
	
	public FormulaEvaluator getEvaluator() {
		return evaluator;
	}
	public void setEvaluator(FormulaEvaluator evaluator) {
		this.evaluator = evaluator;
	}

	/**
	 * 해당 셀에 입력된 정보의 유효성 체크
	 * @param columnIdx
	 * @param cellType
	 * @param value
	 * @return
	 */
	public boolean checkCellValidation(int sheetIdx, int columnIdx, XSSFCell cell, Object value) {
		int cellType = cell.getCellType();
		if(getCellNullable(sheetIdx, columnIdx)) {
			return true;
		}
		
		if(value == null || "".equals(value)){
			return false;
		}
		
		String tValue = value.toString().trim();
		
		Double castVal = 0.0;
		switch (getCellType(sheetIdx, columnIdx)) {
		case XSSFCell.CELL_TYPE_NUMERIC :
			try{
				castVal = Double.parseDouble(tValue);
			}catch(Exception e){
				return false;
			}
			break;
		default:
			try{
				String pattern = getCellPattern(sheetIdx, columnIdx);
				String splitPattern = getCellSplitPattern(sheetIdx, columnIdx);
				if(pattern != null){
					if(splitPattern != null){
						int matchesCnt = 0;
						String[] tValueArr = tValue.split(splitPattern);
						for (String tva : tValueArr) {
							if(Pattern.matches(pattern, tva)) matchesCnt++;
						}
						if(tValueArr.length > matchesCnt) return false;
					}else{
						if(!Pattern.matches(pattern, tValue))
							return false;
					}
				}
				
			}catch(Exception e){
				return false;
			}
			break;
		}
		
		int[] range = getCellRange(sheetIdx, columnIdx);

		if(getCellType(sheetIdx, columnIdx) == XSSFCell.CELL_TYPE_NUMERIC 
//				&& castVal instanceof Double 
				&& range!=null) {
			if(range[0] > castVal || range[1] < castVal) {
//			if(range[0] > (double)value || range[1] < (double)value) {
				return false;
			}
		}
		return true;
	}
}
