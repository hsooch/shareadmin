package shared.university.admin.feature;

import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.xssf.usermodel.XSSFCell;

import shared.university.admin.component.excel.ExcelFeature;

public class ExchangeResultOutListExcelFeatrue extends ExcelFeature {
	private int startIndex = 1; // start cell index
	
	/**
	 * 헤더영역 셀병합 정의
	 */
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
				null,
				null
			},
	};
	
	/**
	 * 셀 헤더명 정의
	 */
	protected String[][] cellHeaders = {
			{
				"성적 등록일",
				"학과",
				"학년",
				"학번",
				"성명",
				"교류대학",
				"교과번호",
				"과목명",
				"학점",
				"분반",
				"백분위점수",
				"등급"
			}
	};

	/**
	 * 셀 데이터 타입 정의
	 */
	protected int[] cellTypes = {
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING,
			XSSFCell.CELL_TYPE_STRING
	};

	/**
	 * 셀 정렬 정의
	 */
	protected HorizontalAlignment[] cellAligns = {
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.LEFT,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER,
			HorizontalAlignment.CENTER
	};

	/**
	 * 셀 빈값으로 채우기 여부 정의
	 */
	protected boolean[] cellNullables = {
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false
	};

	/**
	 * 셀 데이터 길이 정의
	 * Integer => {0, Integer.MAX_LALUE}
	 * String => null
	 */
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
			null,
			null
	};

	/**
	 * 셀 맵핑 변수명
	 */
	protected String[] fieldNames = {
			"scoreRegDt",
			"userDepartment",
			"studentGradeCodeName",
			"studentNumber",
			"userName",
			"univCodeName",
			"subjectNum",
			"subjectName",
			"subjectPoint",
			"classNum",
			"score",
			"gradeName"
	};

	/**
	 * 셀 맵핑 변수타입
	 */
	protected Class<?>[] fieldTypes = {
			String.class,
			String.class,
			String.class,
			String.class,
			String.class,
			String.class,
			String.class,
			String.class,
			String.class,
			String.class,
			String.class,
			String.class
	};
	
	/**
	 * 셀 패턴
	 */
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
			null,
			null
	};
	
	/**
	 * 셀 문자열 split 패턴 
	 */
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
		return null;
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
