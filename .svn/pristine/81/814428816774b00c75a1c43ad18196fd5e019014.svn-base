package shared.university.admin.component.excel;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.Comment;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ExcelWriter {

	private XSSFWorkbook workbook = null;
	private ExcelFeature feature = null;

	private XSSFCellStyle cellStyleLeft = null;
	private XSSFCellStyle cellStyleCenter = null;
	private XSSFCellStyle cellStyleRight = null;
	
	public ExcelWriter(ExcelFeature feature) {
		this.feature = feature;
		this.workbook = new XSSFWorkbook();
		initCellStyle();
	}
	
	public ExcelWriter(ExcelFeature feature, InputStream is) {
		this.feature = feature;
		try {
			this.workbook = new XSSFWorkbook(is);
		} catch (IOException e) {
			log.error("엑셀파일 개체 생성 실패", e);
		} finally {
			try {
				if(is != null) is.close();
			} catch (IOException e) {}
		}
		initCellStyle();
	}
	
	private void initCellStyle() {

		// 성능 이슈로 cell style은 미리 만들어둠
		cellStyleLeft = workbook.createCellStyle();
		cellStyleCenter = workbook.createCellStyle();
		cellStyleRight = workbook.createCellStyle();
		
        setCommonStyle(cellStyleLeft);
        setCommonStyle(cellStyleCenter);
        setCommonStyle(cellStyleRight);

        cellStyleLeft.setAlignment(HorizontalAlignment.LEFT);
        cellStyleCenter.setAlignment(HorizontalAlignment.CENTER);
        cellStyleRight.setAlignment(HorizontalAlignment.RIGHT);
	}
	
	private void setCommonStyle(XSSFCellStyle cellStyle) {
		Font font = setFont(10, false);
		cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
		cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        cellStyle.setBorderBottom(CellStyle.BORDER_THIN);
        cellStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setBorderLeft(CellStyle.BORDER_THIN);
        cellStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setBorderRight(CellStyle.BORDER_THIN);
        cellStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setBorderTop(CellStyle.BORDER_THIN);
        cellStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setWrapText(true); //줄바꿈.
        cellStyle.setFont(font); //폰트 스타일 적용
	}
	
	public void setData(int sheetIdx, List<?> voList) {
		
		setData(sheetIdx, null, voList);
	}
	
	public void setData(int sheetIdx, String sheetName, List<?> voList) {

		XSSFSheet sheet;
		
		if(sheetName == null) {
			sheet = (XSSFSheet) workbook.createSheet();
		} else {
			sheet = (XSSFSheet) workbook.createSheet(sheetName);
		}
		
		setGuideRow(sheetIdx, sheet);
		
		int startRowIdxOfData = feature.getStartRowIdx(sheetIdx);
		for(int headerIdx = 0 ; headerIdx < feature.getHeaderSize() ; headerIdx++){
			XSSFRow hdrRow = sheet.createRow((short) startRowIdxOfData-feature.getHeaderSize()+headerIdx);
			setHeaderCell(sheetIdx, hdrRow, sheet, headerIdx);
		}

		sheet.createFreezePane(0, startRowIdxOfData);
		
		for (int voIdx = 0; voIdx < voList.size(); voIdx++) {
			
			Object vo = voList.get(voIdx);
			XSSFRow row = sheet.createRow((short) voIdx+startRowIdxOfData);

			for (int columnIdx = 0; columnIdx < feature.getFieldCount(sheetIdx); columnIdx++) {
				setCellData(sheetIdx, sheet, vo, row, columnIdx);
				
				// 성능 이슈로 첫번째 행만 auto size 설정
//				if(voIdx == 0){
//					sheet.autoSizeColumn(columnIdx);
//					sheet.setColumnWidth(columnIdx, (sheet.getColumnWidth(columnIdx))+800);
//				}
			}
		}
	}
	
	// 디자인된 엑셀 양식에 데이터 세팅
	public void setDataSheet(int sheetIdx, List<?> voList) {

		XSSFSheet sheet = workbook.getSheetAt(sheetIdx);;
		
		int startRowIdxOfData = feature.getStartRowIdx(sheetIdx);
		sheet.createFreezePane(0, startRowIdxOfData);
		
		for (int voIdx = 0; voIdx < voList.size(); voIdx++) {
			Object vo = voList.get(voIdx);
			XSSFRow row = sheet.createRow((short) voIdx+startRowIdxOfData);

			for (int columnIdx = 0; columnIdx < feature.getFieldCount(sheetIdx); columnIdx++) {
				setCellData(sheetIdx, sheet, vo, row, columnIdx);
			}
		}
	}
	
	private void setGuideRow(int sheetIdx, XSSFSheet sheet) {
		
		String guideMsg = feature.getGuideMsg(sheetIdx);
		if(guideMsg == null) {
			return;
		}
		
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, feature.getFieldCount(sheetIdx)-1));
		XSSFCellStyle cellStyle = workbook.createCellStyle();

		XSSFRow row = sheet.createRow(0);
		applyGuideStyle(cellStyle);
		
		XSSFCell cell = row.createCell(0);
		cell.setCellValue(guideMsg);
		cell.setCellStyle(cellStyle);
		
		row.setHeightInPoints(110);
	}

	private void setHeaderCell(int sheetIdx, XSSFRow row, XSSFSheet sheet, int headerIdx) {

		XSSFCellStyle cellStyle = workbook.createCellStyle();
		applyHeaderStyle(cellStyle);
		
		for (int columnIdx = 0; columnIdx < feature.getHeaderSize(headerIdx); columnIdx++) {
			XSSFCell cell = row.createCell(columnIdx);
			int[] merge = feature.getMergeSize(headerIdx, columnIdx);
			if(merge != null)
				sheet.addMergedRegion(new CellRangeAddress(merge[0], merge[1], merge[2], merge[3]));
			cell.setCellValue(feature.getCellHeader(sheetIdx, headerIdx, columnIdx));
			cell.setCellStyle(cellStyle);
		}
	}

	private void setCellData(int sheetIdx, XSSFSheet sheet, Object vo, XSSFRow row, int columnIdx) {

		try {
			String fieldNm = feature.getFieldName(sheetIdx, columnIdx);
			
			Object value = null;
			if(vo instanceof Map) {
				value = ((Map)vo).get(fieldNm);
			} else {
				String methodNm = "get" + fieldNm.substring(0, 1).toUpperCase() + fieldNm.substring(1);
				Method getter = vo.getClass().getMethod(methodNm);
				value = getter.invoke(vo);
			}
			
			XSSFCell cell = row.createCell(columnIdx);
			
			if(value != null) {
				switch (feature.getCellType(sheetIdx, columnIdx)) {
				case XSSFCell.CELL_TYPE_NUMERIC:
					cell.setCellValue(Double.parseDouble(String.valueOf(value)));
					break;
				default:
					cell.setCellValue(String.valueOf(value));
					break;
				}
			}
			
			cell.setCellType(feature.getCellType(sheetIdx, columnIdx));
			applyContentStyle(cell, feature.getCellAllign(sheetIdx, columnIdx));
			
		} catch (Exception e) {
			log.warn("", e);
		}
	}
	
	private CellStyle applyGuideStyle(XSSFCellStyle cellStyle) {
		
		XSSFFont font = setFont(9, true);
        XSSFColor color = new XSSFColor(new java.awt.Color(192,0,0));
		font.setColor(color);
		applyCommonStyle(cellStyle, font);
		cellStyle.setAlignment(CellStyle.ALIGN_LEFT);
		
		return cellStyle;
	}

	private CellStyle applyHeaderStyle(XSSFCellStyle cellStyle) {
		
		XSSFFont font = setFont(9, true);
		applyCommonStyle(cellStyle, font);
		cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
		
        XSSFColor color = new XSSFColor(new java.awt.Color(242,242,242));
        cellStyle.setFillForegroundColor(color);
        
        cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        cellStyle.setLocked(true);
        
		return cellStyle;
	}
	
	private void applyContentStyle(XSSFCell cell, HorizontalAlignment align) {
		switch (align) {
		case LEFT:
			cell.setCellStyle(cellStyleLeft);
			break;
		case CENTER:
			cell.setCellStyle(cellStyleCenter);
			break;
		case RIGHT:
			cell.setCellStyle(cellStyleRight);
			break;
		default:
			break;
		}
	}

	/**
	 * 폰트 스타일 적용
	 * @param workbook
	 * @param size
	 * @param bold
	 * @return
	 */
	private XSSFFont setFont(int size, boolean bold) {
		
		XSSFFont font = workbook.createFont(); //폰트 객체 생성
        font.setFontHeightInPoints((short)size); //폰트 크기
    	font.setBold(bold);
    	font.setFontName("맑은 고딕");
        
        return font;
	}
	
	/**
	 * 공용 스타일 적용
	 * @param cellStyle
	 * @param font
	 * @return
	 */
	private void applyCommonStyle(XSSFCellStyle cellStyle, Font font) {
		
		cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        cellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        cellStyle.setBorderBottom(CellStyle.BORDER_THIN);
        cellStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setBorderLeft(CellStyle.BORDER_THIN);
        cellStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setBorderRight(CellStyle.BORDER_THIN);
        cellStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setBorderTop(CellStyle.BORDER_THIN);
        cellStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
        cellStyle.setWrapText(true); //줄바꿈.
        
        cellStyle.setFont(font); //폰트 스타일 적용
	}
	
	/**
	 * 메모 삽입
	 * @param sheetName
	 * @param rowIdx
	 * @param columIdx
	 * @param memo
	 */
	public void writeComment(String sheetName, int rowIdx, int columIdx, String memo) {
		CreationHelper factory = workbook.getCreationHelper();
		
		XSSFSheet sheet = workbook.getSheet(sheetName);
		XSSFRow row = sheet.getRow(rowIdx);
		XSSFCell cell = row.getCell(columIdx);
		
		Drawing drawing = sheet.createDrawingPatriarch();

		ClientAnchor anchor = factory.createClientAnchor();

		anchor.setRow1(cell.getRowIndex()+1);
		anchor.setRow2(cell.getRowIndex()+2);
		anchor.setCol1(cell.getColumnIndex()+1);
		anchor.setCol2(cell.getColumnIndex()+2);

		Comment comment = drawing.createCellComment(anchor);
		RichTextString str = factory.createRichTextString(memo);
		comment.setString(str);
		cell.setCellComment(comment);
		comment.setVisible(false);
	}
	
	
	/**
	 * 필터 적용
	 * @param sheetName
	 * @param firstRow
	 * @param lastRow
	 * @param firstCol
	 * @param lastCol
	 */
	public void setFilter(String sheetName, int firstRow, int lastRow, int firstCol, int lastCol) {
		XSSFSheet sheet = workbook.getSheet(sheetName);
		sheet.setAutoFilter(new CellRangeAddress(firstRow, lastRow, firstCol, lastCol));
	}

	/**
	 * 파일 생성
	 * @param filePath
	 */
	public void saveFile(String filePath) {
		
		if(filePath == null) {
			return;
		}
		
		FileOutputStream fis = null;
		try {
			fis = new FileOutputStream(filePath);
			workbook.write(fis);
		} catch (Exception e) {
			log.error("엑셀파일 개체 생성 실패", e);
		} finally {
			try {
				if(fis != null) fis.close();
			} catch (IOException e) {}
		}
	}

	public void writeFile(OutputStream outStream) {
		try {
			workbook.write(outStream);
		} catch (Exception e) {
			log.error("엑셀파일 개체 생성 실패", e);
		} finally {
			try {
				if(outStream != null) outStream.close();
			} catch (IOException e) {}
		}
	}
}
