<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<script type="text/javascript">
	$(document).ready(function(){
		CKEDITOR.replace( 'contents', {
	        customConfig: '${pageContext.request.contextPath}/js/ckEditorConfig.js',
	        height:'446px'
	    });
	});
</script>
<div class="tab_wraping">
    <!-- tab1 -->
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">접수기간/안내문 등록/조회
            <div class="pg_location"><a>Go home</a>
                <span>&gt;</span> 학점교류 관리<span>&gt;</span> 접수기간/안내문 등록/조회
            </div>
        </h5>
		<!-- innertab -->
		<div id="innTabContent">
			<!-- semesterListWithGuide -->
			<div class="_articleContent" ng-show="$root.semesterGuide.pageViewType == 'list'">
				<div class="_border _write mt10">
					<div class="_inner">
						<fieldset>
							<legend>접수기간/안내문 등록/조회</legend>
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
														<td><label for="sch_year" class="pl10">년도</label></td>
														<td>
															<select id="sch_year" ng-model="$root.semesterGuide.searchYear" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.semesterGuide.searchYearList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td><label for="sch_quarter" class="pl10">학기</label></td>
														<td>
															<select id="sch_quarter" ng-model="$root.semesterGuide.searchSemesterCode" class="_selectBox _fR wx100">
																<option value="{{code.code}}" ng-repeat="code in $root.semesterGuide.searchSemesterCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td><label for="sch_level" class="pl20">노출여부</label></td>
                                                        <td>
                                                            <select id="sch_level" ng-model="$root.semesterGuide.searchDisplayYn" class="_selectBox _fL wx100">
                                                                <option value="">전체</option>
                                                                <option value="Y">노출</option>
                                                                <option value="N">비노출</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="sch_status" class="pl20">상태</label></td>
                                                        <td>
                                                            <select id="sch_status" ng-model="$root.semesterGuide.searchSemesterStatus" class="_selectBox _fL wx100">
                                                                <option value="">전체</option>
                                                                <option value="accepting">접수중</option>
                                                                <option value="wait">대기</option>
                                                                <option value="close">마감</option>
                                                            </select>
                                                        </td>
													</tr>
													<tr>														
														<td><label for="sch_kind" class="pl10">학교 구분</label></td>
														<td>
															<select id="sch_kind" ng-model="$root.semesterGuide.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv')" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.semesterGuide.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td colspan="2">
															<select ng-model="$root.semesterGuide.searchUniv" class="_selectBox _fL w99">
																<option value="{{code.code}}" ng-repeat="code in $root.semesterGuide.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
														</td>
														<td></td>
														<td colspan="3"></td>
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
					<div class="_count">
						총 <strong>{{$root.semesterGuide.totalCnt}}<!-- <em>/100</em> --></strong> 건이 검색되었습니다.
					</div>
					<div class="_search pr0">
						<div class="_btnSet pr0">
							<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown()">엑셀다운</a></span>
						</div>
						<fieldset>
							<legend>페이지별 목록개수</legend>
							<select name="findType" ng-model="$root.semesterGuide.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx90">
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
						<col style="width:20%;">
                        <col style="width:20%;">
                        <col style="width:20%;">
                        <col style="width:80px;">
                        <col style="width:10%;"> 
                        <col style="width:10%;">
                        <col style="width:10%;"> 
                        <col style="width:80px;">  
					</colgroup>
					<thead>
                       	<tr>
                           	<th ng-click="changeSortOrder($event)" data-sort="year" data-order="desc"><span>년도/학기<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="univCode" data-order="desc"><span>학교구분<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="receiptStartDay" data-order="desc"><span>접수기간<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="guideDisplayYn" data-order="desc"><span>노출여부<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="receiptStartDay" data-order="desc"><span>상태<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="regUserName" data-order="desc"><span>작성자<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="regDt" data-order="desc"><span>작성일<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th>등록/수정</th>
                       	</tr>
					</thead>
					<tbody ng-show="$root.semesterGuide.semesterListWithGuide.length > 0">
						<tr class="firTd" ng-repeat="semesterInfo in $root.semesterGuide.semesterListWithGuide | orderBy:descRn:false">
							<td>{{semesterInfo.year}}년도 {{semesterInfo.semesterCodeName}}</td>
							<td>{{semesterInfo.univCodeName}}</td>
							<td ng-if="semesterInfo.guideSemesterCode == null"></td>
							<td ng-if="semesterInfo.guideSemesterCode != null">{{semesterInfo.receiptStartDay | getDateString:'yyyy.MM.dd' }} ~ {{semesterInfo.receiptEndDay | getDateString:'yyyy.MM.dd'}}</td>
							<td>{{semesterInfo.guideDisplayYn != null ? (semesterInfo.guideDisplayYn === 'Y' ? '노출' : '비노출') : ''}}</td>
							<td>{{getSemesterGuideStatus($index)}}</td>
							<td>{{semesterInfo.guideRegUserName}}</td>
							<td>{{semesterInfo.guideRegDt | getDateString:'yyyy.MM.dd' }}</td>
							<td>
								<span ng-if="semesterInfo.guideSemesterCode == null" class="_button _minimum _green"><a href="javascript:void(0);" ng-click="saveSemesterView('regist', semesterInfo, $index)">등록</a></span>
								<span ng-if="semesterInfo.guideSemesterCode != null" class="_button _minimum _gray"><a href="javascript:void(0);" ng-click="saveSemesterView('modify', semesterInfo, $index)">수정</a></span>
							</td>
						</tr>
					</tbody>
					<tbody ng-show="$root.semesterGuide.semesterListWithGuide.length == 0">
						<tr>
							<td colspan="8">등록된 학기가 없습니다.</td>
						</tr>
					</tbody>
				</table>
				<div ng-show="$root.semesterGuide.semesterListWithGuide.length > 0" id="semesterListWithGuidePaging" class="_paging"></div>
				<div class="_areaButton">
					<div class="_search pr0 _right">
						<div class="_btnSet pr0">
							<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown()">엑셀다운</a></span>
						</div>
						<fieldset>
							<legend>홈페이지검색</legend>
							<select name="findType" ng-model="$root.semesterGuide.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx90">
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
			<!-- semesterInfo modify -->
			<div class="_articleContent" ng-show="$root.semesterGuide.pageViewType == 'regist' || $root.semesterGuide.pageViewType == 'modify'">
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
							<th for="mem_college">학교구분</th>
							<td colspan="3">{{$root.semesterGuide.semesterInfo.univCodeName}}</td>
						</tr>
						<tr>
							<th for="mem_college">년도/학기</th>
							<td colspan="3">{{$root.semesterGuide.semesterInfo.year}}년도 {{$root.semesterGuide.semesterInfo.semesterCodeName}}</td>
						</tr>
						<tr>
							<th>학기기간</th>
							<td colspan="3">{{$root.semesterGuide.semesterInfo.semesterStartDay | getDateString:'yyyy.MM.dd'}} ~ {{$root.semesterGuide.semesterInfo.semesterEndDay | getDateString:'yyyy.MM.dd'}}</td>
						</tr>
						<tr>
							<th>접수기간</th>
							<td colspan="3">
								<div class="cal_type">
									<p class="date"><span><input type="text" id="receiptStartDay" ng-model="$root.semesterGuide.semesterInfo.receiptStartDay"></span><label class="pickerlabel" for="receiptStartDay"></label></p>
									<p class="date"><span><input type="text" id="receiptEndDay" ng-model="$root.semesterGuide.semesterInfo.receiptEndDay"></span><label class="pickerlabel" for="receiptEndDay"></label></p>
								</div>
								<span class="mark ml10">* 학점교류신청 접수 받는 시작일, 종료일을 입력하세요.</span>
							</td>
						</tr>
						<tr>
							<th>작성자 </th>
							<td colspan="{{$root.semesterGuide.semesterInfo.guideRegDt == null ? '3' : '1'}}">
								{{$root.semesterGuide.semesterInfo.guideRegUserName}}
								<input type="hidden" ng-model="$root.semesterGuide.semesterInfo.guideRegUserSeq"/>
							</td>
							<th ng-if="$root.semesterGuide.semesterInfo.guideRegDt != null">작성일 </th>
							<td ng-if="$root.semesterGuide.semesterInfo.guideRegDt != null">
								{{$root.semesterGuide.semesterInfo.guideRegDt | getDateString:'yyyy.MM.dd hh24:mi:ss'}}
							</td>
						</tr>
						<tr>
							<th>노출여부</th>
							<td colspan="{{$root.semesterGuide.semesterInfo.guideRegDt == null ? '3' : '1'}}">
								<div class="radioWrap">
									<div class="radio">
										<a href="javascript:;">
											<input type="radio" id="rad_Chek01" title="노출" ng-model="$root.semesterGuide.semesterInfo.guideDisplayYn" value="Y">
											<label for="rad_Chek01"><span></span>노출</label>
										</a>
									</div>
									<div class="radio">
										<a href="javascript:;">
											<input type="radio" id="rad_Chek02" title="비노출" ng-model="$root.semesterGuide.semesterInfo.guideDisplayYn" value="N">
											<label for="rad_Chek02"><span></span>비노출</label>
										</a>
									</div>
								</div>
							</td>
							<th ng-if="$root.semesterGuide.semesterInfo.guideRegDt != null">상태</th>
							<td ng-if="$root.semesterGuide.semesterInfo.guideRegDt != null">{{getSemesterGuideStatus()}}</td>
						</tr>
					</tbody>
				</table>
				<div class="infoWrap">
					<div class="infoTitle">안내문 입력</div>
					<div class="infoEditer">
						<textarea id="contents" name="contents" ng-model="$root.semesterGuide.semesterInfo.contents"></textarea>
					</div>
					<div class="editerAdd mt10">
						<div class="ediAddTit">
							<strong>추가서류</strong>
							<span class="_button _minimum _gray ml10">
								<a href="javascript:void(0);" onclick="$(this).next().click();" class="tabInnBtn typeB">파일선택</a>
								<input type="file" class="ng-hide" nv-file-select uploader="$root.semesterGuide.uploader" multiple/>
							</span>
							<span class="mark ml10">* 10mb 이내 문서 또는 zip파일만 첨부 가능합니다. ( xlsx, xls, ppt, pptx, hwp, doc, docx, zip )</span>
						</div>
						<div class="addFile">
							<div class="addFileList" ng-repeat="fileInfo in $root.semesterGuide.uploader.queue | orderBy:descRn:false">
								<span>{{fileInfo.file.name}}</span>
								<span class=" file_close">
									<a href="javascript:void(0);" class="file_close" ng-click="$root.semesterGuide.uploader.queue.splice($index, 1);">삭제</a>
								</span>
							</div>
							<div class="addFileList" ng-repeat="fileInfo in $root.semesterGuide.semesterInfo.fileList | orderBy:descRn:false">
								<span><a href="{{fileInfo.downloadUrl}}">{{fileInfo.oriFileName}}</a></span>
								<span class=" file_close">
									<a href="javascript:void(0);" class="file_close" ng-click="removeAttachFile($index)">삭제</a>
									<input type="hidden" id="fileKey_{{$index}}" name="fileKey" value="{{fileInfo.fileKey}}"/>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="_areaButton">
					<div class="_center">
						<span class="_button _large blackBtn"><a href="javascript:void(0);" class="_blockUI wx135"  ng-click="saveSemesterInfo()">저장</a></span>
						<span class="_button _large borderBtn"><a href="javascript:void(0);" class="_blockUI wx135"  ng-click="getSemesterListWithGuideView()">취소</a></span>
						<span ng-show="$root.semesterGuide.semesterInfo.guideSemesterCode != null && $root.semesterGuide.semesterInfo.guideStatus == '01'" class="_button _large borderBtn"><a href="javascript:void(0);" class="_blockUI wx135"  ng-click="deleteGuideInfo()">삭제</a></span>
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