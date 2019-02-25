<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript">
	function removeSubjectTime(idx){
		$("#ngViewField").scope().$apply("removeSubjectTime("+idx+")");
	}
	$(document).on("keydown", "[numberOnly]",function(event){
		numberOnly(event);
	});
</script>
<div class="tab_wraping">
    <!-- tab1 -->
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">학점교류 신청취소(IN)
            <div class="pg_location"><a>Go home</a>
                <span>&gt;</span> 학점교류 관리<span>&gt;</span> 학점교류 신청취소(IN)
            </div>
        </h5>
		<!-- innertab -->
		<div id="innTabContent">
			<!-- applyExchangeUserList -->
			<div class="_articleContent" ng-show="$root.exchange.cancelIn.pageViewType == 'list'">
				<div class="_border _write mt10">
					<div class="_inner">
						<fieldset>
							<legend>학기 등록/조회</legend>
							<form name="semesterSearchForm" method="post">
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
															<select id="sch_kind" ng-model="$root.exchange.cancelIn.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv');" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.exchange.cancelIn.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td colspan="2">
															<select id="sch_kind2" ng-model="$root.exchange.cancelIn.searchUniv" class="_selectBox _fL w99">
																<option value="{{code.code}}" ng-repeat="code in $root.exchange.cancelIn.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td><label for="mem_level" class="pl20">학년</label></td>
                                                        <td>
                                                            <select id="mem_level" ng-model="$root.exchange.cancelIn.searchStudentGradeCode" class="_selectBox _fL wx100">
                                                            	<option value="">전체</option>
                                                            	<option value="{{code.code}}" ng-repeat="code in $root.exchange.cancelIn.searchStudentGradeCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="sch_kind" class="pl10">소속대학</label></td>
														<td>
															<select id="sch_kind" ng-model="$root.exchange.cancelIn.searchUserUnivArea" ng-change="getChildCdList('searchUserUnivArea', 'searchUserUniv');" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.exchange.cancelIn.searchUserUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td colspan="2">
															<select id="sch_kind2" ng-model="$root.exchange.cancelIn.searchUserUniv" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.exchange.cancelIn.searchUserUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
													</tr>
													<tr>														
														<td><label for="sch_year" class="pl10">년도</label></td>
														<td>
															<select id="sch_year" ng-model="$root.exchange.cancelIn.searchYear" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.exchange.cancelIn.searchYearList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td><label for="sch_quarter" class="pl10">학기</label></td>
														<td>
															<select id="sch_quarter" ng-model="$root.exchange.cancelIn.searchSemesterCode" class="_selectBox _fR wx100">
																<option value="{{code.code}}" ng-repeat="code in $root.exchange.cancelIn.searchSemesterCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td></td>
														<td></td>
														<td><label for="sch_search" class="pl20">검색</label></td>
                                                        <td colspan="3">
                                                            <select id="sch_search" ng-model="$root.exchange.cancelIn.searchType" class="_selectBox _fL wx100">
																<option value="">전체</option>
                                                                <option value="userDepartment">학과</option>
                                                                <option value="studentNumber">학번</option>
                                                                <option value="userName">성명</option>
                                                                <option value="univCodeName">교류대학</option>
                                                                <option value="subjectName">과목명</option>
                                                            </select>
                                                            <input kr-input type="text"  ng-model="$root.exchange.cancelIn.searchKey" placeholder="" class="w64">
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
				<div class="_listHead mt40">
					<div class="_count">
						총 <strong>{{$root.exchange.cancelIn.totalCnt}}<!-- <em>/100</em> --></strong> 건이 검색되었습니다.
					</div>
					<div class="_search pr0">
						<div class="_btnSet pr0">
							<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown()">엑셀다운</a></span>
						</div>
						<fieldset>
							<legend>페이지별 목록개수</legend>
							<select name="findType" ng-model="$root.exchange.cancelIn.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx90">
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
					<thead>
                       	<tr>
							<th ng-click="changeSortOrder($event)" data-sort="seCancelCofmDt" data-order="desc"><span>취소승인일<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="userUnivCode" data-order="desc"><span>소속대학<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="userDepartment" data-order="desc"><span>학과<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="studentGradeCode" data-order="desc"><span>학년<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="studentNumber" data-order="desc"><span>학번<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="userName" data-order="desc"><span>성명<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="subjectNum" data-order="desc"><span>교과번호<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="subjectName" data-order="desc"><span>과목명<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="subjectPoint" data-order="desc"><span>학점<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="classNum" data-order="desc"><span>분반<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th>상세</th>
							<th ng-click="changeSortOrder($event)" data-sort="mInStNum" data-order="desc"><span>발급<br/>학번<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th>담당자전달<br/>메시지</th>
							<th ng-click="changeSortOrder($event)" data-sort="messageConfirm" data-order="desc"><span>담당자<br/>확인처리<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                       	</tr>
					</thead>
					<tbody ng-show="$root.exchange.cancelIn.applyExchangeUserList.length > 0">
						<tr class="firTd" ng-repeat="exchangeInfo in $root.exchange.cancelIn.applyExchangeUserList | orderBy:descRn:false">
							<td>{{exchangeInfo.seCancelCofmDt}}</td>
							<td>{{exchangeInfo.userUnivCodeName}}</td>
							<td>{{exchangeInfo.userDepartment}}</td>
							<td>{{exchangeInfo.studentGradeCodeName}}</td>
							<td>{{exchangeInfo.studentNumber}}</td>
							<td>{{exchangeInfo.userName}}</td>
							<td>{{exchangeInfo.subjectNum}}</td>
							<td>{{exchangeInfo.subjectName}}</td>
							<td>{{exchangeInfo.subjectPoint}}</td>
							<td>{{exchangeInfo.classNum}}</td>
							<td><span class="_button _minimum" ng-click="applyExchangeInfoView($index)"><a href="javascript:void(0);">보기</a></span></td>
							<td>{{exchangeInfo.mInStNum}}</td>
							<td>
								<span class="_button _minimum _puple" ng-click="viewSendMessage($index)"
									ng-if="exchangeInfo.sendMessage != null && exchangeInfo.sendMessage != ''">
									<a href="javascript:void(0);">메시지</a>
								</span>
								<span ng-if="exchangeInfo.sendMessage == null || exchangeInfo.sendMessage == ''">-</span>
							</td>
							<td>
								<span class="_button _minimum _green" ng-click="saveMessageConfirm($index)"
									ng-if="exchangeInfo.messageConfirm == null || exchangeInfo.messageConfirm != 'Y'">
									<a href="javascript:void(0);">확인</a>
								</span>
								<span ng-if="exchangeInfo.messageConfirm == 'Y'">{{exchangeInfo.messageConfirmName}}</span>
							</td>
						</tr>
					</tbody>
					<tbody ng-show="$root.exchange.cancelIn.applyExchangeUserList.length == 0">
						<tr>
							<td colspan="14">학점교류신청 취소 진행중인 학생이 없습니다.</td>
						</tr>
					</tbody>
				</table>
				<div ng-show="$root.exchange.cancelIn.applyExchangeUserList.length > 0" id="applyExchangeUserInListPaging" class="_paging"></div>
				<div class="_areaButton">
					<div class="_left">
					</div>
					<div class="_search pr0 _right">
						<div class="_btnSet pr0">
							<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown()">엑셀다운</a></span>
						</div>
						<fieldset>
							<legend>홈페이지검색</legend>
							<select name="findType" ng-model="$root.exchange.cancelIn.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx90">
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
			<!-- //applyExchangeUserList -->
		</div>
		<!-- //innertab -->
	</div>
	<!-- // tab1 -->
	<form id="excelForm" name="excelForm" method="post" action=""></form>
</div>