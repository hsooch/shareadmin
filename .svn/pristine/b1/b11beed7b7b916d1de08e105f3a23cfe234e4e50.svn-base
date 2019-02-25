package shared.university.admin.component.excel;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Comment;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;
import org.apache.poi.xssf.usermodel.XSSFCreationHelper;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ExcelReader {

	private XSSFWorkbook workbook = null;
	private ArrayList<ArrayList<Integer>> validRowMap = new ArrayList<ArrayList<Integer>>();
	
	/**
	 * 행의 오류 발생 시 중복 카운트를 방지하기 위해 오류 발생 행 인덱스 저장
	 */
	private ArrayList<Map<Integer, String>> failRowMapList = new ArrayList<Map<Integer, String>>();
	private ExcelFeature feature = null;
	private int errorRowCount = 0;
	private int totalRowCount = 0;
	
	public ExcelReader(File file) {
		
		if(file == null) {
			return;
		}
		
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(file);
			workbook = new XSSFWorkbook(fis);
		} catch (Exception e) {
			log.error("엑셀파일 개체 생성 실패", e);
		} finally {
			try {
				if(fis != null) fis.close();
			} catch (IOException e) {}
		}
	}
	public XSSFWorkbook getWorkbook() {
		return workbook;
	}

	public void setWorkbook(XSSFWorkbook workbook) {
		this.workbook = workbook;
	}

	/**
	 * 엑셀 파일 인코더 등록
	 * @param encoder
	 */
	public void setEncoder(ExcelFeature encoder) {
		this.feature = encoder;
		this.feature.setEvaluator(workbook.getCreationHelper().createFormulaEvaluator());
	}
	
	/**
	 * 유효성 검사
	 */
	public List<Map<String, Object>> checkValidation() {
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		for(int sheetIdx = 0; sheetIdx < workbook.getNumberOfSheets(); sheetIdx++) {
			XSSFSheet sheet = workbook.getSheetAt(sheetIdx);

			ArrayList<Integer> validList = new ArrayList<Integer>();

			for (int rowIdx = 0; rowIdx < sheet.getPhysicalNumberOfRows(); rowIdx++) {
				XSSFRow row = sheet.getRow(rowIdx);
				if(row == null || rowIdx < feature.getStartRowIdx(sheetIdx) || isAllBlank(row)) continue;
				
				// 오류 행을 저장할 map 생성
				Map<Integer, String> map = new HashMap<Integer, String>();
				failRowMapList.add(map);
				totalRowCount++;
				boolean allValid = true;
				List<String> failCellList = new ArrayList<String>();
				
				for (int columnIdx = 0; columnIdx < row.getPhysicalNumberOfCells(); columnIdx++) {
					XSSFCell cell = row.getCell(columnIdx);
					if(cell == null) continue;
					
					Object cellValue = feature.getValueOfCell(cell);
					/*
					System.out.println("cellValue : " + cellValue);
					System.out.println("cell " + feature.checkCellValidation(sheetIdx, columnIdx, cell, cellValue));
					System.out.println("cellindx " + columnIdx);
					*/
					if(!feature.checkCellValidation(sheetIdx, columnIdx, cell, cellValue)) {
						setStyleErrCellFont(cell);
						setComment(sheetIdx, cell, "입력값의 유형 또는 범위가 유효하지 않음");
						allValid = false;
						failCellList.add(feature.getFieldName(sheetIdx, columnIdx));
					}
				}
				if(allValid) {
					validList.add(row.getRowNum());
				} else {
					setMarkFailRow(sheetIdx, row, null);
					Map<String, Object> failMap = new HashMap<String, Object>();
					failMap.put("failMap", feature.toMap(sheetIdx ,row));
					failMap.put("failCellList", failCellList);
					resultList.add(failMap);
				}
			}
			validRowMap.add(validList);
		}
		
		return resultList;
	}
	
	/**
	 * 한 행의 정보를 출력
	 * @param row
	 * @return
	 */
	public String toString(XSSFRow row) {
		
		StringBuffer buf = new StringBuffer();
		
		if(row != null) {
			for (int columnIdx = 0; columnIdx < row.getPhysicalNumberOfCells(); columnIdx++) {
				XSSFCell cell = row.getCell(columnIdx);
				
				Object value = null;
				if(cell == null) {
					value = "";
				} else {
					value = feature.getValueOfCell(cell);
				}
	
				buf.append(value).append("\t");
			}
		}
		
		buf.append("\r\n");
		
		return buf.toString();
	}
	
	/**
	 * 모든 행의 정보를 출력
	 * @return
	 */
	public String toStringAll() {
		
		StringBuffer buf = new StringBuffer();
		
		for(int i = 0; i < workbook.getNumberOfSheets(); i++) {
			XSSFSheet sheet = workbook.getSheetAt(i);
			for (int rowIdx = 0; rowIdx < sheet.getPhysicalNumberOfRows(); rowIdx++) {
				XSSFRow row = sheet.getRow(rowIdx);
				buf.append(toString(row));
			}
		}
		
		return buf.toString();
	}
	
	/**
	 * 하나의 행을 객체로 반환
	 * @param sheetIdx
	 * @param rowIdx
	 * @return
	 */
	public Object toObject(int sheetIdx, int rowIdx) {
		
		XSSFSheet sheet = workbook.getSheetAt(sheetIdx);
		ArrayList<Integer> rowNums = validRowMap.get(sheetIdx);
		return feature.toObject(sheetIdx, sheet.getRow(rowNums.get(rowIdx)));
	}
	
	/**
	 * 하나의 행을 Map으로 반환
	 * @param sheetIdx
	 * @param rowIdx
	 * @return
	 */
	public Map<String, Object> toMap(int sheetIdx, int rowIdx) {
		
		XSSFSheet sheet = workbook.getSheetAt(sheetIdx);
		ArrayList<Integer> rowNums = validRowMap.get(sheetIdx);
		return feature.toMap(sheetIdx, sheet.getRow(rowNums.get(rowIdx)));
	}
	
	/**
	 * 행 개수를 반환
	 * @param sheetIdx
	 * @return
	 */
	public int getValidRowCount(int sheetIdx) {
		System.out.println("validRowMap.size() : "+validRowMap.size());
		System.out.println("sheetIdx : "+sheetIdx);
		System.out.println("sheetRowList.size() : "+validRowMap.get(sheetIdx).size());
		return validRowMap.get(sheetIdx).size();
	}

	/**
	 * 유효하지 않은 행 개수 반환
	 * @param sheetIdx
	 * @return
	 */
	public int getErrorRowCount() {
		return errorRowCount;
	}

	/**
	 * 
	 * @param sheetIdx
	 * @return
	 */
	public int getTotalRowCount() {
		return totalRowCount;
	}
	
	/**
	 * 처리 실패 행을 표시
	 * @param sheetIdx
	 * @param rowIdx
	 * @param msg
	 */
	public void setMarkFailRow(int sheetIdx, int rowIdx, String memo) {

		XSSFSheet sheet = workbook.getSheetAt(sheetIdx);
		ArrayList<Integer> rowNums = validRowMap.get(sheetIdx);
		XSSFRow row = sheet.getRow(rowNums.get(rowIdx));

		setMarkFailRow(sheetIdx, row, memo);
	}

	private void setMarkFailRow(int sheetIdx, XSSFRow row, String memo) {
		if(failRowMapList.size() < (sheetIdx +1 )) return;
		Map<Integer, String> map = failRowMapList.get(sheetIdx);
		
		if(map.containsKey(row.getRowNum())) {
			return;
		}
		
		map.put(row.getRowNum(), "ERROR");
		errorRowCount++;
		for (int columnIdx = 0; columnIdx < row.getPhysicalNumberOfCells(); columnIdx++) {
			XSSFCell cell = row.getCell(columnIdx);
			setStyleErrCellFill(cell);
		}
		setComment(sheetIdx, row.getCell(0), memo);
	}

	public void setMarkFailCell(int sheetIdx, int rowIdx, int columnIdx, String memo) {

		XSSFSheet sheet = workbook.getSheetAt(sheetIdx);
		ArrayList<Integer> rowNums = validRowMap.get(sheetIdx);
		XSSFRow row = sheet.getRow(rowNums.get(rowIdx));
		
		XSSFCell cell = row.getCell(columnIdx);
		setStyleErrCellFont(cell);
		setComment(sheetIdx, cell, memo);
	}

	/**
	 * 처리결과가 저장된 엑셀 개체를 파일로 저장
	 * @param path
	 * @return
	 */
	public boolean saveResultExcel(String path, String fileName) {
		FileOutputStream fis = null;
		
		try {
			File resultFl = new File(path);
			if(!resultFl.exists()){
				resultFl.mkdirs(); 
			}
			fis = new FileOutputStream(path+fileName);
			workbook.write(fis);
		} catch (Exception e) {
			log.error("", e);
			return false;
		} finally {
			try {
				if(fis != null) fis.close();
			} catch (IOException e) {}
		}
		return true;
	}
	
	/**
	 * 유효하지 않은 셀에 폰트 스타일 적용
	 * @param cell
	 * @param msg
	 */
	private void setStyleErrCellFont(XSSFCell cell) {
		
		XSSFFont font = workbook.createFont();
		font.setBold(true);
		font.setColor(IndexedColors.RED.getIndex());

		CellStyle cellStyle = workbook.createCellStyle();
		cellStyle.cloneStyleFrom(cell.getCellStyle());
		cellStyle.setFont(font);
        cell.setCellStyle(cellStyle);
	}
	
	/**
	 * 유효하지 않은 셀에 배경 스타일 적용
	 * @param cell
	 * @param msg
	 */
	private void setStyleErrCellFill(XSSFCell cell) {
		
		if(cell == null) {
			return;
		}

		CellStyle cellStyle = workbook.createCellStyle();
		cellStyle.cloneStyleFrom(cell.getCellStyle());
//        cellStyle.setFillBackgroundColor(IndexedColors.YELLOW.getIndex());
        cellStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
        cellStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
//        cellStyle.setFillPattern(XSSFCellStyle.BIG_SPOTS);
        cell.setCellStyle(cellStyle);
	}
	
	/**
	 * 해당 행의 모든 열이 값이 없는지 확인 (이 경우 그 행은 처리안함)
	 * @param row
	 * @return
	 */
	private boolean isAllBlank(XSSFRow row) {

		boolean hasValue = false;
		
		//System.out.println("Row:"+row.getRowNum());
		
		for (int columnIdx = 0; columnIdx < row.getPhysicalNumberOfCells(); columnIdx++) {
//			System.out.print("    col:"+columnIdx);
			
			Cell cell = row.getCell(columnIdx);
			if(cell == null) {
//				System.out.print(", cell is null");
				continue;
			}

//			System.out.print(", cellType:" + cell.getCellType());
			if(cell.getCellType() != XSSFCell.CELL_TYPE_BLANK) {
				hasValue = true;
			}
			
//			System.out.println();
		}
//		System.out.println("hasValue:"+hasValue);
		
		return !hasValue;
	}
	
	
	private void setComment(int sheetIdx, XSSFCell cell, String memo) {
		
		if(memo == null) {
			return;
		}
		
		try {
			XSSFCreationHelper factory = workbook.getCreationHelper();
			XSSFSheet sheet = workbook.getSheetAt(sheetIdx);
			Drawing drawing = sheet.createDrawingPatriarch();
	
			XSSFClientAnchor anchor = factory.createClientAnchor();
	
			anchor.setRow1(cell.getRowIndex());
			anchor.setRow2(cell.getRowIndex()+2);
			anchor.setCol1(cell.getColumnIndex());
			anchor.setCol2(cell.getColumnIndex()+2);
	
			Comment comment = drawing.createCellComment(anchor);
			
			RichTextString text = factory.createRichTextString(memo);
	
			XSSFFont font = workbook.createFont();
			font.setFontHeight(8);
			text.applyFont(font);
			
			comment.setString(text);
			cell.setCellComment(comment);
			comment.setVisible(false);
		} catch (IllegalArgumentException e) {
			log.warn("Error! while setting comment in Excel");
		}
	}
}
