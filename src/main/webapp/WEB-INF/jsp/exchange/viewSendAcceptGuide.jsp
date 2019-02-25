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
        <h5 class="cont_Title">승인 안내문 발송(IN)
            <div class="pg_location"><a>Go home</a>
                <span>&gt;</span> 학점교류 관리<span>&gt;</span> 승인 안내문 발송(IN)
            </div>
        </h5>
		<!-- innertab -->
		<div id="innTabContent">
			<!-- semesterListWithAcceptGuide -->
			<div class="_articleContent" ng-show="$root.semesterAcceptGuide.pageViewType == 'list'">
				<div class="_border _write mt10">
					<div class="_inner">
						<fieldset>
							<legend>승인 안내문 발송(IN)</legend>
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
                                                            <select id="sch_kind" ng-model="$root.semesterAcceptGuide.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv')" class="_selectBox _fL wx150">
                                                                <option value="{{code.code}}" ng-repeat="code in $root.semesterAcceptGuide.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                            </select>
                                                        </td>
                                                        <td colspan="2">
                                                            <select ng-model="$root.semesterAcceptGuide.searchUniv" class="_selectBox _fL w99">
                                                                <option value="{{code.code}}" ng-repeat="code in $root.semesterAcceptGuide.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="sms_status" class="pl10 wx80">문자 전송결과</label></td>
                                                        <td>
                                                            <select id="sms_status" ng-model="$root.semesterAcceptGuide.searchSmsStatus" class="_selectBox _fL wx100">
                                                                <option value="">전체</option>
                                                                <option value="3">성공</option>
                                                                <option value="2">발송중</option>
                                                                <option value="4">실패</option>
                                                                <option value="1">대기</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="sch_kind2" class="pl10">소속대학</label></td>
                                                        <td>
															<select id="sch_kind2" ng-model="$root.semesterAcceptGuide.searchUserUnivArea" ng-change="getChildCdList('searchUserUnivArea', 'searchUserUniv')" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.semesterAcceptGuide.searchUserUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
                                                        </td>
                                                        <td colspan="2">
															<select ng-model="$root.semesterAcceptGuide.searchUserUniv" class="_selectBox _fL wx150">
																<option value="{{code.code}}" ng-repeat="code in $root.semesterAcceptGuide.searchUserUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
                                                        </td>
													</tr>
													<tr>
                                                        <td><label for="sch_year" class="pl10">년도</label></td>
                                                        <td>
                                                            <select id="sch_year" ng-model="$root.semesterAcceptGuide.searchYear" class="_selectBox _fL wx150">
                                                                <option value="{{code.code}}" ng-repeat="code in $root.semesterAcceptGuide.searchYearList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="sch_quarter" class="pl10">학기</label></td>
                                                        <td>
                                                            <select id="sch_quarter" ng-model="$root.semesterAcceptGuide.searchSemesterCode" class="_selectBox _fR wx100">
                                                                <option class="sch_option" value="{{code.code}}" ng-model="$root.semesterAcceptGuide.searchSemesterCodeName" ng-repeat="code in $root.semesterAcceptGuide.searchSemesterCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                            </select>
                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                        <td><label for="sch_search" class="pl10">검색</label></td>
                                                        <td colspan="3">
                                                            <select ng-model="$root.semesterAcceptGuide.searchType" class="_selectBox _fL wx120">
                                                                <option value="">전체</option>
                                                                <option value="userUniv">소속대학</option>
                                                                <option value="userDepartment">학과</option>
                                                                <option value="studentNumber">신청대학학번</option>
                                                                <option value="userName">성명</option>
                                                                <option value="userEmail">이메일</option>
                                                                <option value="cellNo">휴대폰번호</option>
                                                                <option value="mInStNum">교류대학학번</option>
                                                            </select>
                                                            <input kr-input type="text" ng-model="$root.semesterAcceptGuide.searchKey" placeholder="" class="w55">
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
					<div class="_count">
						총 <strong>{{$root.semesterAcceptGuide.totalCnt}}</strong> 건이 검색되었습니다.
					</div>
					<div class="_search pr0">
						<div class="_btnSet pr0">
                            <span class="_button _large" ng-if="semesterInfo.guideSemesterCode == null">
                            	<a href="javascript:void(0);" class="mwx165" ng-click="saveRegistGuideView($root.semesterAcceptGuide.searchYear, $root.semesterAcceptGuide.searchUniv, $root.semesterAcceptGuide.searchSemesterCode)">안내문 등록/수정</a>
                            </span>
                            <span class="_button _large"><a href="javascript:void(0);" class="mainBtn" ng-click="sendAcceptGuide($root.semesterAcceptGuide.searchSemesterCode)">메일/문자 선택발송</a></span>
                            <span class="_button _large"><a href="javascript:void(0);" class="mainBtn" ng-click="sendAcceptGuideToAll($root.semesterAcceptGuide.searchSemesterCode);">메일/문자 조회결과 전체발송</a></span>
						</div>
						<fieldset>
							<legend>페이지별 목록개수</legend>
							<select name="findType" ng-model="$root.semesterAcceptGuide.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx90">
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
                        <col style="width:30px;">
                        <col style="width:12%">
                        <col style="width:14%;">
                        <col style="width:40px;">
                        <col style="width:10%;">
                        <col style="width:10%;">
                        <col style="width:18%;">
                        <col style="width:12%;">
                        <col style="width:100px;">
                        <col style="width:60px;">
                        <col style="width:80px;">
                        <col style="width:80px;">
					</colgroup>
					<thead>
                       	<tr>
                           	<th>
<!--                            		<input type="checkbox" id="basicCheckAll" ng-model="$root.semesterAcceptGuide.isCheckedAll" ng-click="checkAllAGList()"> -->
                           		<label for="basicCheckAll"><span></span></label>
                           	</th>
                           	<th ng-click="changeSortOrder($event)" data-sort="userUnivCodeName" data-order="desc"><span>소속대학<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="userDepartment" data-order="desc"><span>학과<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="studentGradeCode" data-order="desc"><span>학년<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="studentNumber" data-order="desc"><span>학번<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="userName" data-order="desc"><span>성명<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="userEmail" data-order="desc"><span>이메일<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="cellNo" data-order="desc"><span>휴대폰번호<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="mInStNum" data-order="desc"><span>발급학번<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="sendStatus" data-order="desc"><span>문자<br>전송결과<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="senderName" data-order="desc"><span>발송자<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                           	<th ng-click="changeSortOrder($event)" data-sort="regDt" data-order="desc"><span>발송일<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                       	</tr>
					</thead>
					<tbody ng-show="$root.semesterAcceptGuide.semesterListWithAcceptGuide.length > 0">
						<tr class="firTd" ng-repeat="semesterInfo in $root.semesterAcceptGuide.semesterListWithAcceptGuide | orderBy:descRn:false">
							<td>
								<input type="checkbox" class="basicChke" id="basicChk{{$index}}"
									ng-model="$root.semesterAcceptGuide.isCheked[$index]" ng-click="checkAGList(semesterInfo, $index)">
								<label for="basicChk{{$index}}"><span></span></label>
							</td>
							<td>{{semesterInfo.userUnivCodeName}}</td>
							<td>{{semesterInfo.userDepartment}}</td>
							<td>{{semesterInfo.studentGradeCodeName}}</td>
							<td>{{semesterInfo.studentNumber}}</td>
							<td>{{semesterInfo.userName}}</td>
							<td>{{semesterInfo.userEmail}}</td>
							<td>{{semesterInfo.cellNo}}</td>
							<td>{{semesterInfo.mInStNum}}</td>
							<td>{{getSemesterSmsStatus($index)}}</td>
							<td>{{semesterInfo.senderName}}</td>
							<td>{{semesterInfo.sendRegDt | getDateString:'yyyy.MM.dd'}}</td>
						</tr>
					</tbody>
					<tbody ng-show="$root.semesterAcceptGuide.semesterListWithAcceptGuide.length == 0">
						<tr class="nosearchData">
							<td colspan="12">학점교류신청을 승인한 학생이 없습니다.</td>
						</tr>
					</tbody>
				</table>
				<div ng-show="$root.semesterAcceptGuide.semesterListWithAcceptGuide.length > 0" id="semesterListWithAcceptGuidePaging" class="_paging"></div>
				<div class="_areaButton">
					<div class="_search pr0 _right">
						<div class="_btnSet pr0">
                            <span class="_button _large" ng-if="semesterInfo.guideSemesterCode == null"><a href="javascript:void(0);" class="mwx165" ng-click="saveRegistGuideView($root.semesterAcceptGuide.searchYear, $root.semesterAcceptGuide.searchUniv, $root.semesterAcceptGuide.searchSemesterCode)">안내문 등록/수정</a></span>
                            <span class="_button _large"><a href="javascript:void(0);" class="mainBtn" ng-click="sendAcceptGuide()">메일/문자 선택발송</a></span>
                            <span class="_button _large"><a href="javascript:void(0);" class="mainBtn" ng-click="sendMailToAll();">메일/문자 조회결과 전체발송</a></span>
						</div>
						<fieldset>
							<legend>페이지별 목록개수</legend>
							<select name="findType" ng-model="$root.semesterAcceptGuide.maxRowCnt" ng-change="changeMaxRowCnt()" class="_selectBox wx90">
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
			<div class="_articleContent" ng-show="$root.semesterAcceptGuide.pageViewType == 'modify' || $root.semesterAcceptGuide.pageViewType == 'regist'">
				<table class="_table _view w100">
					<caption>학점교류 승인 안내문 수정 표</caption>
					<colgroup>
						<col style="width:150px;">
						<col>
						<col style="width:150px;">
						<col>
					</colgroup>
					<tbody>
						<tr>
							<th>년도/학기 <span class="mark"></span></th>
							<td>{{$root.semesterAcceptGuide.semesterInfo.year}}년도 {{$root.semesterAcceptGuide.semesterInfo.semesterCodeName}}</td>
							<th>교류대학 <span class="mark"></span></th>
							<td>{{$root.semesterAcceptGuide.semesterInfo.univCodeName}}</td>
						</tr>
						<tr>
							<th>메일제목<span class="mark"></span></th>
							<td colspan="3">
							    <input kr-input type="text" class="w100" ng-model="$root.semesterAcceptGuide.semesterInfo.acceptGuideMailTitle">
							</td>
						</tr>
						<tr>
                            <th>작성자 <span class="mark"></span></th>
                            <td>{{$root.userSession.userName}}</td>
                            <th>작성일 <span class="mark"></span></th>
                            <td>{{now}}</td>
                        </tr>
					</tbody>
				</table>

				<div class="infoWrap">
					<div class="infoTitle pl10">안내문 내용</div>
					<div class="infoEditer">
						<textarea id="contents" name="contents" ng-model="$root.semesterAcceptGuide.semesterInfo.acceptGuideMailContents"></textarea>
					</div>
					<div class="editerAdd mt10">
						<div class="ediAddTit">
							<strong>첨부파일</strong>
							<span class="_button _minimum _gray ml10">
								<a href="javascript:void(0);" onclick="$(this).next().click();" class="tabInnBtn typeB">파일선택</a>
								<input type="file" class="ng-hide" nv-file-select uploader="$root.semesterAcceptGuide.uploader" multiple/>
							</span>
							<span class="mark ml10">* 10mb 이내 문서 또는 zip파일만 첨부 가능합니다. ( xlsx, xls, ppt, pptx, hwp, doc, docx, zip )</span>
						</div>
						<div class="addFile">
							<div class="addFileList" ng-repeat="fileInfo in $root.semesterAcceptGuide.uploader.queue | orderBy:descRn:false">
								<span>{{fileInfo.file.name}}</span>
								<span class=" file_close">
									<a href="javascript:void(0);" class="" ng-click="$root.semesterAcceptGuide.uploader.queue.splice($index, 1);">삭제</a>
								</span>
							</div>
							<div class="addFileList" ng-repeat="fileInfo in $root.semesterAcceptGuide.semesterInfo.fileList | orderBy:descRn:false">
								<span><a href="{{fileInfo.downloadUrl}}">{{fileInfo.oriFileName}}</a></span>
								<span class=" file_close">
									<a href="javascript:void(0);" class="" ng-click="removeAttachFile($index)">삭제</a>
									<input type="hidden" id="fileKey_{{$index}}" name="fileKey" value="{{fileInfo.fileKey}}"/>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="_areaButton">
					<div class="_center">
						<span class="_button _large blackBtn"><a href="javascript:void(0);" class="wx135"  ng-click="saveSemesterInfo()">저장</a></span>
						<span class="_button _large borderBtn"><a href="javascript:void(0);" class="wx135"  ng-click="getSemesterListWithAcceptGuideView()">취소</a></span>
						<span ng-show="$root.semesterAcceptGuide.semesterInfo.semesterGuideSeq != null && $root.semesterAcceptGuide.semesterInfo.guideStatus == '01'" class="_button _large borderBtn"><a href="javascript:void(0);" class="wx135"  ng-click="deleteGuideInfo()">삭제</a></span>
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