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
        <h5 class="cont_Title">과목 등록/조회
            <div class="pg_location"><a>Go home</a>
                <span>&gt;</span> 학점교류 관리<span>&gt;</span> 과목 등록/조회
            </div>
        </h5>
		<!-- innertab -->
		<div id="innTabContent">
			<!-- subjectList -->
			<div class="_articleContent" ng-show="$root.semester.subject.pageViewType == 'list'">
				<div class="_border _write mt10">
					<div class="_inner">
						<fieldset>
							<legend>학기 등록/조회</legend>
							<form name="semesterSearchForm" method="post">
								<div class="_form _both">
									<div class="_insert tableWrap">
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
														<td><label for="sch_year" class="pl10">년도</label></td>
														<td>
															<select id="sch_year" ng-model="$root.semester.subject.searchYear" ng-change="setListTitle()" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.semester.subject.searchYearList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td><label for="sch_quarter" class="pl10">학기</label></td>
														<td>
															<select id="sch_quarter" ng-model="$root.semester.subject.searchSemesterCode" ng-change="setListTitle()" class="_selectBox _fR wx100">
																<option value="{{code.code}}" ng-repeat="code in $root.semester.subject.searchSemesterCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td><label for="mem_level" class="pl20">학년</label></td>
                                                        <td>
                                                            <select id="mem_level" ng-model="$root.semester.subject.searchSubjectGradeCode" class="_selectBox _fL wx100">
                                                            	<option value="">전체</option>
                                                            	<option value="{{code.code}}" ng-repeat="code in $root.semester.subject.searchSubjectGradeCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="mem_class" class="pl20">학생/청강생<br/>수강여부</label></td>
                                                        <td>
                                                            <select id="mem_class" ng-model="$root.semester.subject.searchClassAcceptType" class="_selectBox _fL wx100">
                                                                <option value="">전체</option>
                                                                <option value="1">학생</option>
                                                                <option value="2">학생+청강생</option>
                                                                <option value="3">청강생</option>
                                                            </select>
                                                        </td>
													</tr>
													<tr>														
														<td><label for="sch_kind" class="pl10">학교 구분</label></td>
														<td>
															<select id="sch_kind" ng-model="$root.semester.subject.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv'); setListTitle();" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.semester.subject.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td colspan="2">
															<select id="sch_kind2" ng-model="$root.semester.subject.searchUniv" ng-change="setListTitle()" class="_selectBox _fL w99">
																<option value="{{code.code}}" ng-repeat="code in $root.semester.subject.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td><label for="sch_search" class="pl20">검색</label></td>
                                                        <td colspan="3">
                                                            <select id="sch_search" ng-model="$root.semester.subject.searchType" class="_selectBox _fL wx100">
                                                                    <option value="">전체</option>
                                                                    <option value="subjectNum">교과번호</option>
                                                                    <option value="completeType">이수구분</option>
                                                                    <option value="subjectName">과목명</option>
                                                                    <option value="department">학과</option>
                                                                    <option value="teacherName">담당교수</option>
                                                            </select>
                                                            <input kr-input type="text"  ng-model="$root.semester.subject.searchKey" placeholder="" class="w64">
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
				<div class="_listHead">
					<div class="_listTitle" ng-if="listTitleYear != '' && listTitleSemester != '' && listTitleUniv != ''">
						{{listTitleYear}}년도 {{listTitleSemester}} <span>{{listTitleUniv}}</span>
					</div>
				</div>
				<div class="_listHead mt40">
					<div class="_count">
						총 <strong>{{$root.semester.subject.totalCnt}}<!-- <em>/100</em> --></strong> 건이 검색되었습니다.
					</div>
					<div class="_search pr0">
						<div class="_btnSet pr0">
							<span class="_button _large"><a href="javascript:void(0);" class="_blockUI wx165"  ng-click="downloadDocFormPop()">일괄등록양식 다운로드</a></span>
							<span class="_button _large"><a href="javascript:void(0);" class="_blockUI mainBtn"  ng-click="saveSubjectBatchPop()">일괄등록</a></span>
							<span class="_button _large"><a href="javascript:void(0);" class="_blockUI mainBtn"  ng-click="saveSubjectView()">개별등록</a></span>
							<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown()">엑셀다운</a></span>
						</div>
						<fieldset>
							<legend>페이지별 목록개수</legend>
							<select name="findType" ng-model="$root.semester.subject.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx90">
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
						<col style="width:40px;">
						<col style="width:40px;">
						<col style="width:14%;">
						<col style="width:14%;">
						<col style="width:20%;">
						<col style="width:40px;">
						<col style="width:50px;">
						<col style="width:12%;">
						<col style="width:18%;">
						<col style="width:60px;">
						<col style="width:40px;">
						<col style="width:40px;">
						<col style="width:16%;">
						<col style="width:16%;">
						<col style="width:80px;">
					</colgroup>
					<thead>
                       	<tr>
							<th><input type="checkbox" id="itm_Allcheck" name=""><label for="itm_Allcheck"><span></span></label></th>
							<th ng-click="changeSortOrder($event)" data-sort="subjectGradeCodeName" data-order="desc"><span>학년<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="subjectNum" data-order="desc"><span>학수번호<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="completeType" data-order="desc"><span>이수구분<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="subjectName" data-order="desc"><span>과목명<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="subjectPoint" data-order="desc"><span>학점<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="classNum" data-order="desc"><span>분반<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="department" data-order="desc"><span>학과<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="timeListIndex" data-order="desc"><span>요일 및 시간<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="teacherName" data-order="desc"><span>담당<br>교수<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="maxStudentCnt" data-order="desc"><span>학생<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="maxEtcCnt" data-order="desc"><span>청강생<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th ng-click="changeSortOrder($event)" data-sort="classAcceptType" data-order="desc"><span>학생/청강생<br>수강여부<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
							<th>수강대상/<br>유의사항</th>
							<th>수정</th>
                       	</tr>
					</thead>
					<tbody ng-show="$root.semester.subject.subjectList.length > 0">
						<tr class="firTd" ng-repeat="subjectInfo in $root.semester.subject.subjectList | orderBy:descRn:false">
							<td><input type="checkbox" id="thisChk_{{$index}}" name=""><label for="thisChk_{{$index}}"><span></span></label></td>
							<td>{{subjectInfo.subjectGradeCodeName}}</td>
							<td>{{subjectInfo.subjectNum}}</td>
							<td>{{subjectInfo.completeType}}</td>
							<td>{{subjectInfo.subjectName}}</td>
							<td>{{subjectInfo.subjectPoint}}</td>
							<td>{{subjectInfo.classNum}}</td>
							<td>{{subjectInfo.department}}</td>
							<td>
								<p ng-repeat="timeInfo in subjectInfo.timeList | orderBy:descRn:false">
									{{timeInfo.dayOfWeekName}} {{timeInfo.startTimeHour}}:{{timeInfo.startTimeMinute}}~{{timeInfo.endTimeHour}}:{{timeInfo.endTimeMinute}}
								</p>
							</td>
							<td>{{subjectInfo.teacherName}}</td>
							<td>{{subjectInfo.maxStudentCnt}}</td>
							<td>{{subjectInfo.maxEtcCnt}}</td>
							<td>{{subjectInfo.classAccepteTypeName}}</td>
							<td>{{subjectInfo.memo}}</td>
							<td>
								<span class="_button _minimum _gray"><a href="javascript:void(0);" ng-click="saveSubjectView(subjectInfo, $index)">수정</a></span>
							</td>
						</tr>
					</tbody>
					<tbody ng-show="$root.semester.subject.subjectList.length == 0">
						<tr>
							<td colspan="15">등록된 과목이 없습니다.<br/>양식을 다운로드 하여 작성 후 일괄 등록하거나 개별등록하세요.</td>
						</tr>
					</tbody>
				</table>
				<div ng-show="$root.semester.subject.subjectList.length > 0" id="subjectListPaging" class="_paging"></div>
				<div class="_areaButton">
					<div class="_left">
						<span class="_button _large borderBtn"><a href="javascript:;" class="_blockUI" >선택삭제</a></span>
					</div>
					<div class="_search pr0 _right">
						<div class="_btnSet pr0">
							<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown()">엑셀다운</a></span>
						</div>
						<fieldset>
							<legend>홈페이지검색</legend>
							<select name="findType" ng-model="$root.semester.subject.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx90">
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
			<!-- //subjectList -->
			<!-- subjectInfo modify -->
			<div class="_articleContent" ng-show="$root.semester.subject.pageViewType == 'regist' || $root.semester.subject.pageViewType == 'modify'">
				<table class="_table _view w100">
					<caption>과목 정보 수정 표</caption>
					<colgroup>
						<col style="width:150px;">
						<col>
						<col style="width:150px;">
						<col>
					</colgroup>
					<tbody>
						<tr>
							<th for="mem_college">년도/학기</th>
							<td>{{$root.semester.subject.subjectInfo.year}}년도 {{$root.semester.subject.subjectInfo.semesterCodeName}}</td>
							<th for="mem_college">학교구분</th>
							<td>{{$root.semester.subject.subjectInfo.univCodeName}}</td>
						</tr>
						<tr>
							<th>학년 <span class="mark">*</span></th>
							<td>
								<select id="subjectGradeCode" ng-model="$root.semester.subject.subjectInfo.subjectGradeCode" class="_selectBox _fL wx100">
									<option value="">선택</option>
									<option value="{{code.code}}" ng-repeat="code in $root.semester.subject.subjectGradeList | orderBy:codeIdx:false">{{code.codeName}}</option>
								</select>
							</td>
							<th>교과번호 <span class="mark">*</span></th>
							<td ng-if="$root.semester.subject.subjectInfo.subjectNum == null">
								<input kr-input type="text" id="subjectNum" ng-model="$root.semester.subject.subjectInfo.newSubjectNum" placeholder="" class="w100" maxlength="50">
							</td>
							<td ng-if="$root.semester.subject.subjectInfo.subjectNum != null">
								{{$root.semester.subject.subjectInfo.subjectNum}}
							</td>
						</tr>
						<tr>
							<th>분반 <span class="mark">*</span></th>
							<td ng-if="$root.semester.subject.subjectInfo.classNum == null">
								<input kr-input type="text" id="classNum" ng-model="$root.semester.subject.subjectInfo.newClassNum" placeholder="" class="w35" maxlength="50">
							</td>
							<td ng-if="$root.semester.subject.subjectInfo.classNum != null">
								{{$root.semester.subject.subjectInfo.classNum}}
							</td>
							<th>이수구분 <span class="mark">*</span></th>
							<td><input kr-input type="text" id="completeType" ng-model="$root.semester.subject.subjectInfo.completeType" placeholder="" class="w100" maxlength="50"></td>
						</tr>
						<tr>
							<th>과목명 <span class="mark">*</span></th>
							<td colspan="3"><input kr-input type="text" ng-model="$root.semester.subject.subjectInfo.subjectName" placeholder="" class="w100" maxlength="200"></td>
						</tr>
						<tr>
							<th>과목명 영문 <span class="mark">*</span></th>
							<td colspan="3"><input kr-input type="text" ng-model="$root.semester.subject.subjectInfo.subjectNameEn" placeholder="" class="w100" maxlength="200"></td>
						</tr>
						<tr>
							<th>학과 <span class="mark">*</span></th>
							<td><input kr-input type="text" ng-model="$root.semester.subject.subjectInfo.department" placeholder="" class="w100" maxlength="50"></td>
							<th>학점 <span class="mark">*</span></th>
							<td><input type="text" ng-model="$root.semester.subject.subjectInfo.subjectPoint" placeholder="" class="w35" maxlength="1" numberOnly></td>
						</tr>
						<tr>
							<th>담당교수 <span class="mark">*</span></th>
							<td><input kr-input type="text" ng-model="$root.semester.subject.subjectInfo.teacherName" placeholder="" class="w100" maxlength="50"></td>
							<th>수강인원 <span class="mark">*</span></th>
							<td>
								<label for="stu_kind_cnt" class="pl10">일반학생</label>
								<input type="text" ng-model="$root.semester.subject.subjectInfo.maxStudentCnt" id="stu_kind_cnt" placeholder="" class="w20" maxlength="3" numberOnly>
								<label for="stu_kind_cnt_2" class="pl10">청강생</label>
								<input type="text" ng-model="$root.semester.subject.subjectInfo.maxEtcCnt" id="stu_kind_cnt_2" placeholder="" class="w20" maxlength="3" numberOnly>
							</td>
						</tr>
						<tr>
							<th>수강대상/유의사항</th>
							<td colspan="3"><input kr-input type="text" ng-model="$root.semester.subject.subjectInfo.memo" placeholder="" class="w100" maxlength="300"></td>
						</tr>
						<tr>
							<th>강의계획서 파일<br/>다운로드 URL</th>
							<td colspan="3"><input kr-input type="text" ng-model="$root.semester.subject.subjectInfo.curriculumUrl" placeholder="" class="w100" maxlength="200"></td>
						</tr>
						<tr>
							<th>요일 및 시간 <span class="mark">*</span></th>
							<td colspan="3">
								<table class="_table _list w100 miniList">
									<caption>회원정보 수정 표</caption>
										<colgroup>
										<col style="width:100px;">
										<col style="width:50%;">
										<col>
										<col style="width:100px;">
									</colgroup>
									<thead>
										<th>요일</th>
										<th>
										<p class="textAC">시간</p><p><span class="mark">* 24시간 표기법. 예) 14시30분 ~ 16시00분</span></p>
										</th>
										<th>강의실</th>
										<th>삭제</th>
									</thead>
									<tbody>
										<tr id="subjectTimeList_{{$index}}" ng-repeat="subjectTimeInfo in $root.semester.subject.subjectInfo.timeList | orderBy:subjectTimeSeq:false">
											<td>
												<input type="hidden" name="subjectTimeSeq" id="subjectTimeSeq_{{$index}}" value="{{subjectTimeInfo.subjectTimeSeq}}"/>
												<select name="dayOfWeek" id="dayOfWeek_{{$index}}" class="_selectBox _fL wx70">
													<option value="">선택</option>
													<option value="2" ng-selected="subjectTimeInfo.dayOfWeek == 2">월</option>
													<option value="3" ng-selected="subjectTimeInfo.dayOfWeek == 3">화</option>
													<option value="4" ng-selected="subjectTimeInfo.dayOfWeek == 4">수</option>
													<option value="5" ng-selected="subjectTimeInfo.dayOfWeek == 5">목</option>
													<option value="6" ng-selected="subjectTimeInfo.dayOfWeek == 6">금</option>
													<option value="7" ng-selected="subjectTimeInfo.dayOfWeek == 7">토</option>
													<option value="1" ng-selected="subjectTimeInfo.dayOfWeek == 1">일</option>
												</select>
											</td>
											<td>
												<input type="text" name="start_time_hour" id="start_time_hour_{{$index}}" value="{{subjectTimeInfo.startTimeHour}}" placeholder="" class="w15" maxlength="2" numberOnly>
												<label for="time_hour" class="pl10">시</label>
												<input type="text" name="start_time_minute" id="start_time_minute_{{$index}}" value="{{subjectTimeInfo.startTimeMinute}}" placeholder="" class="w15" maxlength="2" numberOnly>
												<label for="time_minute" class="pl10">분</label>
												<input type="text" name="end_time_hour" id="end_time_hour_{{$index}}" value="{{subjectTimeInfo.endTimeHour}}" placeholder="" class="w15 ml20" maxlength="2" numberOnly>
												<label for="time_hour" class="pl10">시</label>
												<input type="text" name="end_time_minute" id="end_time_minute_{{$index}}" value="{{subjectTimeInfo.endTimeMinute}}" placeholder="" class="w15" maxlength="2" numberOnly>
												<label for="time_minute" class="pl10">분</label>
											</td>
											<td>
												<input kr-input type="text" name="classRoom" id="classRoom_{{$index}}"  value="{{subjectTimeInfo.classRoom}}" placeholder="" class="w100" maxlength="50">
											</td>
											<td>
												<span ng-if="$index > 0" class="_button _minimum _green"><a href="javascript:void(0);" ng-click="removeSubjectTime($index);">삭제</a></span>
											</td>
										</tr>
										<tr ng-if="$root.semester.subject.subjectInfo.timeList == null || $root.semester.subject.subjectInfo.timeList.length == 0">
											<td>
												<input type="hidden" name="subjectTimeSeq" id="subjectTimeSeq_0" value="0"/>
												<select name="dayOfWeek" id="dayOfWeek_0" class="_selectBox _fL wx70">
													<option value="">선택</option>
													<option value="2">월</option>
													<option value="3">화</option>
													<option value="4">수</option>
													<option value="5">목</option>
													<option value="6">금</option>
													<option value="7">토</option>
													<option value="1">일</option>
												</select>
											</td>
											<td>
												<input type="text" name="start_time_hour" id="start_time_hour_0" placeholder="" class="w15" maxlength="2" numberOnly>
												<label for="time_hour" class="pl10">시</label>
												<input type="text" name="start_time_minute" id="start_time_minute_0" placeholder="" class="w15" maxlength="2" numberOnly>
												<label for="time_minute" class="pl10">분</label>
												<input type="text" name="end_time_hour" id="end_time_hour_0" placeholder="" class="w15 ml20" maxlength="2" numberOnly>
												<label for="time_hour" class="pl10">시</label>
												<input type="text" name="end_time_minute" id="end_time_minute_0" placeholder="" class="w15" maxlength="2" numberOnly>
												<label for="time_minute" class="pl10">분</label>
											</td>
											<td>
												<input kr-input type="text" name="classRoom" id="classRoom_0" placeholder="" class="w100" maxlength="50">
											</td>
											<td>
												
											</td>
										</tr>
									</tbody>
								</table>
								<span class="_button _minimum mt10"><a href="javascript:void(0);" ng-click="addSubjectTime()">추가</a></span>
							</td>
						</tr>
						<tr>
							<th>작성자 </th>
							<td colspan="{{$root.semester.subject.subjectInfo.regDt == null ? '3' : '1'}}">
								{{$root.semester.subject.subjectInfo.regUserName}}
								<input type="hidden" ng-model="$root.semester.subject.subjectInfo.regUserSeq"/>
							</td>
							<th ng-if="$root.semester.subject.subjectInfo.regDt != null">작성일 </th>
							<td ng-if="$root.semester.subject.subjectInfo.regDt != null">
								{{$root.semester.subject.subjectInfo.regDt | getDateString:'yyyy.MM.dd hh24:mi:ss'}}
							</td>
						</tr>
					</tbody>
				</table>
				<div class="_areaButton">
					<div class="_center">
						<span class="_button _large blackBtn"><a href="javascript:void(0);" class="_blockUI wx135"  ng-click="saveSubjectInfo()">저장</a></span>
						<span class="_button _large borderBtn"><a href="javascript:void(0);" class="_blockUI wx135"  ng-click="getSubjectListView()">취소</a></span>
						<span ng-show="$root.semester.subject.subjectInfo.subjectNum != null;" class="_button _large borderBtn"><a href="javascript:void(0);" class="_blockUI wx135"  ng-click="deleteSubjectInfo()">삭제</a></span>
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