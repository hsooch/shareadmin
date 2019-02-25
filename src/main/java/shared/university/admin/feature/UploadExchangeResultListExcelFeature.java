package shared.university.admin.feature;

import java.util.Map;

import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.xssf.usermodel.XSSFCell;

import shared.university.admin.component.excel.ExcelFeature;

public class UploadExchangeResultListExcelFeature extends ExcelFeature {
	private int startIndex = 7;

	protected int[][][] headerMerge = {
			{
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null
			}
	};
	protected String[][] cellHeaders = {
			{
				"학생의 소속대학",
				"학생의 소속대학 학번",
				"성명",
				"학년",
				"교과번호",
				"분반",
				"변경 또는 신규 교과번호",
				"변경 또는 신규 분반",
				"변경 또는 신규 이수구분",
				"변경 또는 신규 과목명",
				"변경 또는 신규 학점"
			}
	};

	protected int[] cellTypes = {
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_NUMERIC,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_NUMERIC
	};

	protected HorizontalAlignment[] cellAligns = {
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER
	};

	protected boolean[] cellNullables = {
			false,
			false,
			false,
			false,
			false,
			false,
			true,
			true,
			true,
			true,
			true
	};

	protected int[][] cellRange = {
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null
	};
	
	protected String[] fieldNames = {
			"userUnivName",
			"studentNumber",
			"userName",
			"userGrade",
			"subjectNum",
			"classNum",
			"changeSubjectNum",
			"changeClassNum",
			"changeCompleteType",
			"changeSubjectName",
			"changeSubjectPoint"
	};
	
	protected Class<?>[] fieldTypes = {
			String.class,
			String.class,
			String.class,
			Integer.class,
			String.class,
			String.class,
			String.class,
			String.class,
			String.class,
			String.class,
			Integer.class
	};
	
	protected String[] cellPattern = {
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null
	};
	
	protected String[] cellSplitPattern = {
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null
	};
	
	@Override
	public int getStartRowIdx(int sheetIdx) {
		return startIndex;
	}
	
	@Override
	public int getCellType(int sheetIdx, int columnIdx) {
		return cellTypes[columnIdx];
	}

	@Override
	public int getHeaderSize() {
		return cellHeaders.length;
	}
	@Override
	public int getHeaderSize(int rowIdx) {
		return cellHeaders[rowIdx].length;
	}
	@Override
	public int[] getMergeSize(int rowIdx, int columnIdx) {
		return headerMerge[rowIdx][columnIdx];
	}
	
	@Override
	public String getCellHeader(int sheetIdx, int rowIdx, int columnIdx) {
		return cellHeaders[rowIdx][columnIdx];
	}
	
	@Override
	public HorizontalAlignment getCellAllign(int sheetIdx, int columnIdx) {
		return cellAligns[columnIdx];
	}
	
	@Override
	public boolean getCellNullable(int sheetIdx, int columnIdx) {
		return cellNullables[columnIdx];
	}
	
	@Override
	public Class<?> getVoClass(int sheetIdx) {
		return Map.class;
	}
	
	@Override
	public String getFieldName(int sheetIdx, int columnIdx) {
		return fieldNames[columnIdx];
	}
	
	@Override
	public int getFieldCount(int sheetIdx) {
		return fieldNames.length;
	}
	
	@Override
	public Class<?> getFieldType(int sheetIdx, int columnIdx) {
		return fieldTypes[columnIdx];
	}
	
	@Override
	public int[] getCellRange(int sheetIdx, int columnIdx) {
		return cellRange[columnIdx];
	}
	
	@Override
	public String getGuideMsg(int sheetIdx) {
		/*String guideStr = 
				"(*) 경기기록 등록 규칙\n"+
				"1. 숫자입력란은 없으면 0을 입력한다.";
		return guideStr;
		*/
		return null;
	}
	
	@Override
	public String getCellPattern(int sheetIdx, int columnIdx) {
		return cellPattern[columnIdx];
	}
	
	@Override
	public String getCellSplitPattern(int sheetIdx, int columnIdx){
		return cellSplitPattern[columnIdx];
	}

}
