package shared.university.admin.feature;

import java.util.Map;

import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.xssf.usermodel.XSSFCell;

import shared.university.admin.component.excel.ExcelFeature;

public class UploadSubjectListExcelFeature extends ExcelFeature {
	private int startIndex = 8;
	// column 14
	//시작 행번호 column
    //마지막 행번호
    //시작 열번호 row
    //마지막 열번호
	// ex ){startIndex-2, startIndex-1, 0, 0},
	protected int[][][] headerMerge = {
			{
				{startIndex-2, startIndex-1, 0, 0},
				{startIndex-2, startIndex-1, 1, 1},
				{startIndex-2, startIndex-1, 2, 2},
				{startIndex-2, startIndex-1, 3, 3},
				{startIndex-2, startIndex-1, 4, 4},
				
				{startIndex-2, startIndex-1, 5, 5},
				{startIndex-2, startIndex-1, 6, 6},
				{startIndex-2, startIndex-1, 7, 7},
				{startIndex-2, startIndex-1, 8, 8},
				{startIndex-2, startIndex-1, 9, 9},
				
				{startIndex-2, startIndex-1, 10, 10},
				{startIndex-2, startIndex-2, 11, 12},
				{startIndex-2, startIndex-1, 13, 13}
			},
			{
				null,
				null,
			}
	};
	protected String[][] cellHeaders = {
			{
				"학년",
				"교과번호",
				"이수구분",
				"과목명",
				"학점",
				"분반",
				"요일 및 시간",
				"강의실",
				"담당교수",
				"수강대상/유의사항",
				"학과",
				"수강인원",
				"강의계획서파일",
			},
			{
				"학생",
				"청강생"
			}
	};

	protected int[] cellTypes = {
			XSSFCell.CELL_TYPE_NUMERIC,
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
			XSSFCell.CELL_TYPE_NUMERIC,
			XSSFCell.CELL_TYPE_NUMERIC,
			XSSFCell.CELL_TYPE_STRING
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
			false,
			false,
			false,
			true,
			
			false,
			true,
			true,
			true
	};

	protected int[][] cellRange = {
			{0, Integer.MAX_VALUE},
			null,
			null,
			null,
			{0, Integer.MAX_VALUE},
			
			null,
			null,
			null,
			null,
			null,
			
			null,
			{0, Integer.MAX_VALUE},
			{0, Integer.MAX_VALUE},
			null
	};
	
	protected String[] fieldNames = {
			"subjectGradeCode",
			"subjectNum",
			"completeType",
			"subjectName",
			"subjectPoint",
			"classNum",
			"subjectTimeInfo",
			"classRoom",
			"teacherName",
			"memo",
			"department",
			"maxStudentCnt",
			"maxEtcCnt",
			"curriculumUrl",
	};
	
	protected Class<?>[] fieldTypes = {
			Integer.class,
			String.class,
			String.class,
			String.class,
			Double.class,
			
			String.class,
			String.class,
			String.class,
			String.class,
			String.class,
			
			String.class,
			Integer.class,
			Integer.class,
			String.class
	};
	
	protected String[] cellPattern = {
			null,
			null,
			null,
			null,
			null,
			
			null,
			"(\\S\\s)+\\d{2}:\\d{2}~\\d{2}:\\d{2}",
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
			", ",
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
		return 8;
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
