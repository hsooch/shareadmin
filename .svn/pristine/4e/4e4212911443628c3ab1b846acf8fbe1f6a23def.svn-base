<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>



<div class="tab_wraping">
    <!-- tab1 -->
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">학기 등록/조회
            <div class="pg_location"><a href="javascript:;">Go home</a>
                <span>&gt;</span> 학점교류 관리<span>&gt;</span> 학기 등록/조회
            </div>
        </h5>
		<!-- innertab -->
		<div id="innTabContent">
			<!-- semesterList -->
			<div class="_articleContent" ng-show="$root.semester.pageViewType == 'list'">
				<div class="_border _write mt10">
					<div class="_inner">
						<fieldset>
							<legend>학기 등록/조회</legend>
							<form name="semesterSearchForm" method="post">
								<div class="_form _both">
									<div class="_insert tableWrap w960">
										<div class="innTable">
											<table class="w80">
												<colgroup>
													<col style="width:8%">
													<col style="width:13%">
													<col style="width:7%">
													<col style="width:14%">
													<col style="width:7%">
													<col style="width:22%">
													<col style="width:7%">
													<col style="width:22%">
												</colgroup>
												<tbody>
													<tr>
														<td><label for="sch_kind" class="pl10">학교 구분</label></td>
														<td>
															<select ng-model="$root.semester.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv')" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.semester.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td colspan="2">
															<select ng-model="$root.semester.searchUniv" class="_selectBox _fL w99">
																<option value="{{code.code}}" ng-repeat="code in $root.semester.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td><label for="sch_search" class="pl10">년도</label></td>
														<td>
															<select ng-model="$root.semester.searchYear" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.semester.searchYearList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="_areaButton innerBtnB">
											<div class="_right">
												<span class="_button _small _active searchBtn">
													<input type="button" value="조회" id="basicSearchBtn" ng-click="search(true)">
												</span>
												<span class="_button _small resetBtn">
													<input type="button" value="초기화" ng-click="resetSearchFiled()">
												</span>
											</div>
										</div>
									</div>
								</div>
							</form>
						</fieldset>
					</div>
				</div>
				<div class="_listHead">
					<div class="_count">
						총 <strong>{{$root.semester.totalCnt}}<!-- <em>/100</em> --></strong> 건이 검색되었습니다.
					</div>
					<div class="_search pr0">
						<div class="_btnSet pr0">
							<span class="_button _large"><a href="javascript:void(0);" class="_blockUI mainBtn" ng-click="saveSemesterView()">등록</a></span>
							<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown()">엑셀다운</a></span>
						</div>
						<fieldset>
							<legend>페이지별 목록개수</legend>
							<select name="findType" ng-model="$root.semester.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx90">
								<option value="10">10개</option>
								<option value="20">20개</option>
								<option value="30">30개</option>
								<option value="40">40개</option>
								<option value="50">50개</option>
							</select>
						</fieldset>
					</div>
				</div>
				<table class="_table _list w100 ">
					<caption>표 제목</caption>
					<colgroup>
						<col style="width:80px;">
						<col style="width:20%;">
						<col style="width:20%;">
						<col style="width:20%;">
						<col style="width:10%;"> 
						<col style="width:10%;"> 
						<col style="width:80px;">  
					</colgroup>
					<thead>
                       	<tr>
                           	<th ng-click="changeSortOrder($event)" data-sort="displayYn" data-order="desc"><span>노출여부<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="univCode" data-order="desc"><span>학교구분<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="year" data-order="desc"><span>년도/학기<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="semesterStartDay" data-order="desc"><span>학기기간<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="regUserName" data-order="desc"><span>작성자<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="regDt" data-order="desc"><span>작성일<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th>수정</th>
                       	</tr>
					</thead>
					<tbody ng-show="$root.semester.semesterList.length > 0">
						<tr class="firTd" ng-repeat="semesterInfo in $root.semester.semesterList | orderBy:descRn:false">
							<td>
								<input type="checkbox" id="basicChk{{$index}}" ng-model="semesterInfo.displayYn" ng-true-value="'Y'" ng-false-value="'N'" ng-click="checkSemesterList($index)">
								<label for="basicChk{{$index}}"><span></span></label>
							</td>
							<td>{{semesterInfo.univCodeName}}</td>
							<td>{{semesterInfo.year}}년도 {{semesterInfo.semesterCodeName}}</td>
							<td>{{semesterInfo.semesterStartDay | getDateString:'yyyy.MM.dd' }} ~ {{semesterInfo.semesterEndDay | getDateString:'yyyy.MM.dd' }}</td>
							<td>{{semesterInfo.regUserName}}</td>
							<td>{{semesterInfo.regDt | getDateString:'yyyy.MM.dd' }}</td>
							<td><span class="_button _minimum _green"><a href="javascript:void(0);" ng-click="saveSemesterView(semesterInfo, $index)">수정</a></span></td>
						</tr>
					</tbody>
					<tbody ng-show="$root.semester.semesterList.length == 0">
						<tr>
							<td colspan="7">등록된 학기가 없습니다.</td>
						</tr>
					</tbody>
				</table>
				<div ng-show="$root.semester.semesterList.length > 0" id="semesterListPaging" class="_paging"></div>
				<div class="_areaButton">
					<div class="_search pr0 _right">
						<div class="_btnSet pr0">
							<span class="_button _large"><a href="javascript:void(0);" class="_blockUI mainBtn" ng-click="saveSemesterView()">등록</a></span>
							<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown()">엑셀다운</a></span>
						</div>
						<fieldset>
							<legend>홈페이지검색</legend>
							<select name="findType" ng-model="$root.semester.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx90">
								<option value="10">10개</option>
								<option value="20">20개</option>
								<option value="30">30개</option>
								<option value="40">40개</option>
								<option value="50">50개</option>
							</select>
						</fieldset>
					</div>
				</div>
			</div>
			<!-- //semesterList -->
			<!-- semesterInfo modify -->
			<div class="_articleContent" ng-show="$root.semester.pageViewType == 'modify'">
				<table class="_table _view w100">
					<caption>학기 정보 수정 표</caption>
					<colgroup>
						<col style="width:150px;">
						<col>
						<col style="width:150px;">
						<col>
					</colgroup>
					<tbody>
						<tr>
							<th for="mem_college">학교구분 <span class="mark">*</span></th>
							<td colspan="3">
								<select name="mem_college" id="mem_college" class="_selectBox _fL wx125 mr05" ng-model="$root.semester.semesterInfo.univAreaCode" ng-change="getChildCdList('univAreaCode', 'newUnivCode')">
									<option value="{{code.code}}" ng-repeat="code in $root.semester.univAreaCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
								</select>
								<select name="mem_college" id="mem_college" class="_selectBox _fL wx270" ng-model="$root.semester.semesterInfo.newUnivCode">
									<option value="{{code.code}}" ng-repeat="code in $root.semester.newUnivCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<th for="mem_college">년도/학기 선택 <span class="mark">*</span></th>
							<td colspan="3">
								<label for="semesterYear" class="pl10">년도</label>
								<select id="semesterYear" ng-model="$root.semester.semesterInfo.newYear" class="_selectBox _fL wx150">
									<option value="{{code.code}}" ng-repeat="code in $root.semester.yearList | orderBy:codeIdx:false">{{code.codeName}}</option>
								</select>
								<label for="semesterCode" class="pl10">학기</label>
								<select id="semesterCode" name="mem_college" id="mem_college" class="_selectBox _fL wx125 mr05" ng-model="$root.semester.semesterInfo.newSemesterCode">
									<option value="{{code.code}}" ng-repeat="code in $root.semester.semesterCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>학사기간 <span class="mark">*</span></th>
							<td colspan="3">
								<div class="cal_type">
									<p class="date"><span><input type="text" id="semesterStartDay" ng-model="$root.semester.semesterInfo.semesterStartDay"></span><label class="pickerlabel" for="semesterStartDay"></label></p>
									<p class="date"><span><input type="text" id="semesterEndDay" ng-model="$root.semester.semesterInfo.semesterEndDay"></span><label class="pickerlabel" for="semesterEndDay"></label></p>
								</div>
							</td>
						</tr>
						<tr>
							<th>노출여부 <span class="mark">*</span></th>
							<td colspan="3">
								<div class="radioWrap">
									<div class="radio">
										<a href="javascript:;">
											<input type="radio" id="rad_Chek01" title="노출" ng-model="$root.semester.semesterInfo.displayYn" value="Y">
											<label for="rad_Chek01"><span></span>노출</label>
										</a>
									</div>
									<div class="radio">
										<a href="javascript:;">
											<input type="radio" id="rad_Chek02" title="비노출" ng-model="$root.semester.semesterInfo.displayYn" value="N">
											<label for="rad_Chek02"><span></span>비노출</label>
										</a>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th>작성자 </th>
							<td colspan="3">
								{{$root.semester.semesterInfo.regUserName}}
								<input type="hidden" ng-model="$root.semester.semesterInfo.regUserSeq"/>
							</td>
						</tr>
						<tr ng-show="$root.semester.semesterInfo.regDt != null">
							<th>작성일 </th>
							<td colspan="3">
								{{$root.semester.semesterInfo.regDt | getDateString:'yyyy.MM.dd hh24:mi:ss'}}
							</td>
						</tr>
					</tbody>
				</table>
				<div class="_areaButton">
					<div class="_center">
						<span class="_button _large blackBtn"><a href="javascript:void(0);" class="_blockUI wx135" ng-click="saveSemesterInfo()">저장</a></span>
						<span class="_button _large borderBtn"><a href="javascript:void(0);" class="_blockUI wx135" ng-click="getSemesterListView()">취소</a></span>
						<span ng-show="$root.semester.semesterInfo.subjectCnt < 1" class="_button _large borderBtn"><a href="javascript:void(0);" class="_blockUI wx135" ng-click="deleteSemesterInfo()">삭제</a></span>
					</div>
				</div>
			</div>
			<!-- //semester modify -->
		</div>
		<!-- //innertab -->
	</div>
	<!-- // tab1 -->
	<form id="excelForm" name="excelForm" method="post" action=""></form>
</div>