<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<div class="tab_wraping">
    <!-- tab1 -->
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">수강결과 등록(IN)
            <div class="pg_location"><a>Go home</a>
                <span>&gt;</span> 학점교류 관리<span>&gt;</span> 수강결과 조회(IN)
            </div>
        </h5>
		<div id="innTabContent">
			<div class="_articleContent" ng-show="$root.exchange.resultIn.pageViewType == 'list'">
				<div class="_border _write mt10">
					<div class="_inner">
						<fieldset>
							<legend>수강결과 등록(IN)</legend>
							<form name="exchangeSearchForm" method="post">
								<div class="_form _both">
									<div class="_insert tableWrap w1120">
										<div class="innTable">
											<table class="w80">
												<colgroup>
													<col style="width:5%">
                                                    <col style="width:10%">
                                                    <col style="width:5%">
                                                    <col style="width:10%">
                                                    <col style="width:5%">
                                                    <col style="width:10%">
                                                    <col style="width:5%">
                                                    <col style="width:10%">
                                                    <col style="width:5%">
                                                    <col style="width:10%">
												</colgroup>
												<tbody>
													<tr>
                                                        <td><label for="sch_kind" class="pl10">학교 구분</label></td>
                                                        <td>
                                                            <select id="sch_kind" ng-model="$root.exchange.resultIn.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv')" class="_selectBox _fL wx150">
                                                                <option value="{{code.code}}" ng-repeat="code in $root.exchange.resultIn.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                            </select>
                                                        </td>
                                                        <td colspan="2">
                                                            <select ng-model="$root.exchange.resultIn.searchUniv" class="_selectBox _fL w99">
                                                                <option value="{{code.code}}" ng-repeat="code in $root.exchange.resultIn.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="mem_level" class="pl20">학년</label></td>
                                                        <td>
                                                            <select id="mem_level" ng-model="$root.exchange.resultIn.searchStudentGradeCode" class="_selectBox _fL wx100">
                                                                <option value="{{code.code}}" ng-repeat="code in $root.exchange.resultIn.searchStudentGradeCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="sch_kind2" class="pl20">소속대학</label></td>
                                                        <td>
															<select id="sch_kind2" ng-model="$root.exchange.resultIn.searchUserUnivArea" ng-change="getChildCdList('searchUserUnivArea', 'searchUserUniv')" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.exchange.resultIn.searchUserUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
                                                        </td>
                                                        <td colspan="2">
															<select ng-model="$root.exchange.resultIn.searchUserUniv" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.exchange.resultIn.searchUserUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
                                                        </td>
													</tr>
													<tr>
                                                        <td><label for="sch_year" class="pl10">년도</label></td>
                                                        <td>
                                                            <select id="sch_year" ng-model="$root.exchange.resultIn.searchYear" class="_selectBox _fL wx150">
                                                                <option value="{{code.code}}" ng-repeat="code in $root.exchange.resultIn.searchYearList | orderBy:codeIdx:false">{{code.codeName}}년도</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="sch_quarter" class="pl10">학기</label></td>
                                                        <td>
                                                            <select id="sch_quarter" ng-model="$root.exchange.resultIn.searchSemesterCode" class="_selectBox _fR wx100">
                                                                <option value="{{code.code}}" ng-repeat="code in $root.exchange.resultIn.searchSemesterCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                            </select>
                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                        <td><label for="sch_search" class="pl20">검색</label></td>
                                                        <td colspan="3">
                                                            <select ng-model="$root.exchange.resultIn.searchType" class="_selectBox _fL wx100">
                                                                <option value="">전체</option>
                                                                <option value="userUniv">소속대학</option>
                                                                <option value="userDepartment">학과</option>
                                                                <option value="studentNumber">학번</option>
                                                                <option value="userName">성명</option>
                                                                <option value="subjectNum">교과번호</option>
                                                                <option value="subjectName">과목명</option>
                                                            </select>
                                                            <input kr-input type="text" ng-model="$root.exchange.resultIn.searchKey" placeholder="" class="w64">
                                                        </td>
                                                    </tr>
												</tbody>
											</table>
										</div>
										<div class="_areaButton innerBtn">
											<div class="_right">
												<span class="_button _small _active searchBtn">
													<input type="button" value="조회" id="basicSearchBtn" ng-click="search(true)">
												</span>
												<span class="_button _small resetBtn mt2">
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
                <div class="_listNotice">
                    * 4월1일, 10월1일자 기준으로 최종자료 올려주세요.
                </div>
				<div class="_listHead">
					<div class="_count">
						총 <strong>{{$root.exchange.resultIn.totalCnt}}</strong> 건이 검색되었습니다.
					</div>
					<div class="_search pr0">
						<div class="_btnSet pr0">
                            <span class="_button _large"><a href="javascript:void(0);" class="mwx165" ng-click="downloadDocForm()">일괄등록양식 다운로드</a></span>
                            <span class="_button _large"><a href="javascript:void(0);" class="mainBtn" ng-click="uploadExchangeResultDataPop()">수강결과 일괄등록</a></span>
							<span class="_large"><a href="javascript:void(0);" class="downBtn" ng-click="excelDown()">엑셀다운</a></span>
						</div>
						<fieldset>
							<legend>페이지별 목록개수</legend>
							<select name="findType" ng-model="$root.exchange.resultIn.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx70">
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
                        <col style="width:14%;">
                        <col style="width:14%;">
                        <col style="width:60px;">
                        <col style="width:80px;">
                        <col style="width:80px;">
                        <col style="width:12%;">
                        <col style="width:22%;">
                        <col style="width:40px;">
                        <col style="width:40px;">
                        <col style="width:80px;">
                        <col style="width:80px;">
					</colgroup>
					<thead>
                       	<tr>
                           	<th ng-click="changeSortOrder($event)" data-sort="resultRegDt" data-order="desc"><span>결과 등록일<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="userUnivCode" data-order="desc"><span>소속대학<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="userDepartment" data-order="desc"><span>학과<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="studentGradeCode" data-order="desc"><span>학년<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="studentNumber" data-order="desc"><span>학번<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="userName" data-order="desc"><span>성명<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="subjectNum" data-order="desc"><span>교과번호<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="subjectName" data-order="desc"><span>과목명<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="subjectPoint" data-order="desc"><span>학점<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="classNum" data-order="desc"><span>분반<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th>상세</th>
                           	<th ng-click="changeSortOrder($event)" data-sort="applyResult" data-order="desc"><span>상태<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                       	</tr>
					</thead>
					<tbody ng-show="$root.exchange.resultIn.exchangeResultList.length > 0">
						<tr class="firTd" ng-repeat="exchangeResultInfo in $root.exchange.resultIn.exchangeResultList | orderBy:descRn:false">
							<td>{{exchangeResultInfo.resultRegDt}}</td>
							<td>{{exchangeResultInfo.userUnivCodeName}}</td>
							<td>{{exchangeResultInfo.userDepartment}}</td>
							<td>{{exchangeResultInfo.studentGradeCodeName}}</td>
							<td>{{exchangeResultInfo.studentNumber}}</td>
							<td>{{exchangeResultInfo.userName}}</td>
							<td>{{exchangeResultInfo.subjectNum}}</td>
							<td class="_aL">{{exchangeResultInfo.subjectName}}</td>
							<td>{{exchangeResultInfo.subjectPoint}}</td>
							<td>{{exchangeResultInfo.classNum}}</td>
							<td><span class="_button _minimum"><a href="javascript:void(0);" ng-click="getExchangeResultInfo(exchangeResultInfo.exchangeResultSeq)">보기</a></span></td>
							<td>{{exchangeResultInfo.applyResultStatus}}</td>
						</tr>
					</tbody>
					<tbody ng-show="$root.exchange.resultIn.exchangeResultList.length == 0">
						<tr class="nosearchData">
							<td colspan="12">등록된 학점교류 수강결과가 없습니다.</td>
						</tr>
					</tbody>
				</table>
				<div ng-show="$root.exchange.resultIn.exchangeResultList.length > 0" id="exchangeResultListPaging" class="_paging"></div>
				<div class="_areaButton">
					<div class="_search pr0 _right">
						<div class="_btnSet pr0">
                            <span class="_button _large"><a href="javascript:void(0);" class="mainBtn" ng-click="uploadExchangeResultDataPop()">수강결과 일괄등록</a></span>
                            <span class="_large"><a href="javascript:void(0);" class="downBtn" ng-click="excelDown()">엑셀다운</a></span>
						</div>
						<fieldset>
							<legend>페이지별 목록개수</legend>
							<select name="findType" ng-model="$root.exchange.resultIn.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx70">
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
			<!-- //semesterListWithGuide -->
		</div>
		<!-- //innertab -->
	</div>
	<!-- // tab1 -->
	<form id="excelForm" name="excelForm" method="post" action=""></form>
</div>