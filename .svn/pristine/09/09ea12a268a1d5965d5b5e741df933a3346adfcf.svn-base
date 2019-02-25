<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- cont_bar -->   
<div class="rightConBoxing">
    <div class="tab_wraping">
        <!-- tab1 -->
        <div id="tab1" class="tab-content current">
            <h5 class="cont_Title">세미나/특강 수강신청
                <div class="pg_location">
                	<a >Go home</a> <span>&gt;</span> ADMIN<span>&gt;</span> 세미나/특강 관리<span>&gt;</span> 세미나/특강 수강신청
                </div>
            </h5>
            <div id="innTabContent">
            	<!-- article list -->
                <div class="_articleContent" ng-show="$root.seminar.confirm.pageViewType == 'list'">
                    <div class="_border _write mt10">
                        <div class="_inner">
                            <fieldset>
                            <legend>월별 접속통계 조회 </legend>
                            <form name="selYearForm" method="post">
                                <div class="_form _both">
                                    <div class="_insert tableWrap">
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
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td><label for="cla_kind" class="pl10">분류</label></td>
														<td>
															<select name="cla_kind" id="sch_year" class="_selectBox _fL wx150"
																ng-model="$root.seminar.confirm.searchSeminarType">
																<option value="">전체</option>
																<option value="seminar">세미나</option>
																<option value="lecture">특강</option>
															</select>
														</td>
                                                        <td><label for="cla_state" class="pl20">상태</label> </td>
                                                        <td>
                                                            <select name="cla_state" id="sch_kind" class="_selectBox _fL wx100"
                                                            	ng-model="$root.seminar.confirm.searchSeminarStatus">
                                                                 <option value="">전체</option>
	                                                             <option value="accepting">접수중</option>
	                                                             <option value="wait">대기</option>
	                                                             <option value="close">마감</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="sch_search" class="pl20">검색</label></td>
                                                       	<td colspan="3">
                                                        	<select name="sch_search" id="sch_search" class="_selectBox _fL wx100"
                                                        		ng-model="$root.seminar.confirm.searchEtcOption">
                                                                <option value="">전체</option>
                                                                <option value="title">강좌명</option>
                                                                <option value="place">장소</option>
                                                                <option value="teacher">강사</option>
                                                            </select>
                                                            <input kr-input type="text" placeholder="" class="wx180" ng-model="$root.seminar.confirm.searchKeywords">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><label for="sch_kind" class="pl10">학교 구분</label></td>
                                                        <td>
                                                            <select name="mem_college" id="mem_college" class="_selectBox _fL wx150"
			                                    	ng-model="$root.seminar.confirm.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv')">
													<option value="{{code.code}}"
														ng-repeat="code in $root.seminar.confirm.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
												</select>
                                                        </td>
										 				<td colspan="2">
                                                            <select name="mem_college" id="mem_college" class="_selectBox _fL w99"
													ng-model="$root.seminar.confirm.searchUniv">
													<option value="{{code.code}}"
														ng-repeat="code in $root.seminar.confirm.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
                                                        </td>
                                                        <td><label for="" class="pl20"></label></td>
                                                        <td>
                                                            <label for="" class="pl20 wx100"></label>
                                                        </td>
                                                        <td><label for="" class="pl20 wx50"></label></td>
                                                        <td><label for="" class="pl20 wx80"></label></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="_areaButton innerBtn">
                                            <div class="_right">
                                                <span class="_button _small _active searchBtn"><input type="button" value="조회" ng-click="search(true);"></span>
                                                <span class="_button _small resetBtn mt2"><input type="button" value="초기화" ng-click="resetSearchFiled();"></span>
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
                            총  <strong>{{$root.seminar.confirm.totalCnt}}</strong>  건이 검색되었습니다.
                        </div>
                        <div class="_search pr0">
                            <div class="_btnSet pr0">
<!--                                 <span class="_large"> -->
<!-- 									<a  class="_blockUI downBtn"  ng-click="excelDown();">엑셀다운</a> -->
<!-- 								</span> -->
                            </div>
                            <fieldset>
                                <legend>개수</legend>
                                <select name="findType" class="_selectBox wx70" ng-model="$root.seminar.confirm.maxRowCnt" ng-change="changeMaxRowCnt()">
                                    <option value="10">10개 </option>
                                    <option value="20">20개 </option>
                                    <option value="30">30개 </option>
                                    <option value="40">40개 </option>
                                    <option value="50">50개 </option>
                                </select>
                            </fieldset>
                        </div>
                    </div>
                    <table class="_table _list w100 ">
                        <caption>표 제목</caption>
                        <colgroup>
                            <col style="width:60px;">
                            <col style="width:8%;"> 
                            <col style="width:8%;">
                            <col style="width:14%;">
                            <col style="width:60px;">
                            <col style="width:80px;">
                            <col style="width:10%;">
                            <col style="width:60px;">   
                            <col style="width:60px;">
                            <col style="width:40px;">
                            <col style="width:40px;">
                            <col style="width:40px;">      
                            <col style="width:40px;">
                            <col style="width:80px;">
                            <col style="width:80px;">   
                        </colgroup>
                        <thead>
                            <tr>
                            	<th class="lineUp" ng-click="changeSortOrder($event)" data-sort="seminarType" data-order="desc"><span>분류<a style="display:none;"  class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="univCode" data-order="desc"><span>학교구분<a style="display:none;"  class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="applyStartDay" data-order="desc"><span>접수기간<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="title" data-order="desc"><span>강좌명<a style="display:none;"  class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="place" data-order="desc"><span>장소<a style="display:none;"  class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="classDay" data-order="desc"><span>강의날짜<a style="display:none;"  class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="classStartTime" data-order="desc"><span>시간<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="teacherName" data-order="desc"><span>강사<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="maxUserCnt" data-order="desc"><span>수강가능<br>인원<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="waitUserCnt" data-order="desc"><span>대기<br>인원<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="applyUserCnt" data-order="desc"><span>승인<br>인원<a style="display:none;"  class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="seminarStatus" data-order="desc"><span >상태<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="exchangeYn" data-order="desc"><span >서울시<br>교류<a  style="display:none;" class="down"></a></span></th>
                                <th>강좌<br>정보</th>
                                <th>승인<br>처리</th>
                            </tr>
                        </thead>
                        <tbody ng-show="$root.seminar.confirm.seminarList.length == 0">
                            <!-- 개설된 강좌가 없을 경우 문구 출력 style="display:lnline-block; -->
                            <tr class="nosearchData" style="display:lnline-block;">
                                <td colspan="15">
                                개설된 강좌가 없습니다.
                                </td>
                            </tr>
                        </tbody>
                        <tbody ng-show="$root.seminar.confirm.seminarList.length > 0">
                        	<tr class="firTd" ng-repeat="seminarInfo in $root.seminar.confirm.seminarList">
								<td>{{getSeminarColStr('seminarType', $index) }}</td>
								<td>{{seminarInfo.univCodeName }}</td>
								<td>{{seminarInfo.applyStartDay | getDateString:'yyyy.MM.dd' }}<br>~{{seminarInfo.applyEndDay | getDateString:'yyyy.MM.dd' }}</td>
								<td>{{seminarInfo.title }}</td>
								<td>{{seminarInfo.place }}</td>
								<td>{{seminarInfo.classDay | getDateString:'yyyy.MM.dd' }}</td>
								<td>{{seminarInfo.classStartTime | formatTime }}~<br>{{seminarInfo.classEndTime | formatTime }}</td>
								<td>{{seminarInfo.teacherName }}</td>
								<td>{{seminarInfo.maxUserCnt }}</td>
								<td>{{seminarInfo.waitUserCnt }}</td>
								<td>{{seminarInfo.applyUserCnt }}</td>
								<td>{{getSeminarColStr('seminarStatus', $index) }}</td>
								<td>{{getSeminarColStr('exchangeYn', $index) }}</td>
								<td><span class="_button _minimum"><a  ng-click="getSeminarInfo(seminarInfo.seminarSeq);">보기</a></span></td>
                                <td><span class="_button _minimum _green"><a  ng-click="treatApplyInfo(seminarInfo.seminarSeq);">처리</a></span></td>
							</tr>
                        </tbody>
                    </table>
                    <div class="_paging" ng-show="$root.seminar.confirm.seminarList.length > 0" id="seminarListPaging">
					</div>
                    <div class="_areaButton">
                        <div class="_search pr0 _right">
<!--                             <span class="_large"> -->
<!-- 								<a  class="_blockUI downBtn"  ng-click="excelDown();">엑셀다운</a> -->
<!-- 							</span> -->
                            <fieldset>
                                <legend>개수</legend>
                                <select name="findType" class="_selectBox wx70" ng-model="$root.seminar.confirm.maxRowCnt" ng-change="changeMaxRowCnt()">
                                    <option value="10">10개 </option>
                                    <option value="20">20개 </option>
                                    <option value="30">30개 </option>
                                    <option value="40">40개 </option>
                                    <option value="50">50개 </option>
                                </select>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- // article list -->
        <!-- article apply -->
        <div class="_articleContent" ng-show="$root.seminar.confirm.pageViewType == 'apply'">
            <div class=tableWrap">
                <table class="_table _view w100">
                    <caption>기본정보 표</caption>
                    <colgroup>
                        <col style="width:150px;">
                        <col>
                        <col style="width:150px;">
                        <col>
                    </colgroup>
                    <tbody>
                      	  <tr>
                              <th>분류<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.seminarType }}</td>
	                          <th>학교구분<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.univCodeName }}</td>
	                      </tr>
	                      <tr>
	                          <th>강좌명<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.title }}</td>
	                          <th>접수기간<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.applyStartDay }} ~ {{$root.seminar.confirm.seminarInfo.applyEndDay }}</td>
	                      </tr>
	                      <tr>
	                          <th>강의날짜<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.classDay }}</td>
	                          <th>요일 및 시간<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.classStartTime }} ~ {{$root.seminar.confirm.seminarInfo.classEndTime }}</td>
	                      </tr>
	                      <tr>
	                      	  <th>수강가능인원구분<span class="mark"></span></th>
                              <td>소속대학교 학생만</td>
	                          <th>수강가능인원<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.maxUserCnt }}명</td>
	                      </tr>
	                      <tr>
	                          <th>승인인원<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.applyUserCnt }}명</td>
	                          <th>대기인원<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.waitUserCnt }}명</td>
	                      </tr>
	                      <tr>
	                          <th>장소<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.place }}</td>
	                          <th>강사명<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.teacherName }}</td>
	                      </tr>
	                      <tr>
	                          <th>승인처리유형<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.acceptType }}</td>
	                          <th>서울시교류여부<span class="mark"></span></th>
	                          <td>{{$root.seminar.confirm.seminarInfo.exchangeYn }}</td>
	                      </tr>
	                      <tr>
                			  <th>상태<span class="mark"></span></th>
                              <td colspan="3">{{$root.seminar.confirm.seminarInfo.seminarStatus }}</td>
                          </tr>
                    </tbody>
                </table>
            </div>
            <div class="_listHead">
                <div class="tabWrapTypeB _left mt10">
                    <table class="innTabTypeB w50">
                        <colgroup>
                            <col style="width:3%">
                            <col style="width:5%">
                            <col style="width:3%">
                            <col style="width:10%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td><label for="cla_kind" class="pl10">승인/반려</label></td>
                                <td>
                                    <select name="cla_kind" id="sch_year" class="_selectBox _fL w100" ng-model="$root.seminar.confirm.applyInfo.searchApplyStatus">
                                        <option value="">전체</option>
                                        <option value="apply">승인</option>
                                        <option value="wait">대기</option>
                                        <option value="cancel">반려</option>
                                    </select>
                                </td>
                                <td><label for="sch_exchange" class="pl10">성명</label></td>
                                <td>
                                   <input kr-input type="text" id="" placeholder="" class="w100" ng-model="$root.seminar.confirm.applyInfo.searchUserName">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="innBtnTypeB">
                        <span class="_button _small _active searchBtn"><input type="button" value="조회" ng-click="searchApplyList(true);"></span>
                    </div>
                    <div class="_search pr0">
                        <div class="_btnSet pr0">
		                    <span class="_button _large"><a href="javascript:void(0);" class="_blockUI wx165"  ng-click="">출석체크 명단 인쇄</a></span>
                        </div>
                        <fieldset>
                            <legend>개수</legend>
                            <select name="findType" class="_selectBox wx70" ng-model="$root.seminar.confirm.maxRowCnt" ng-change="changeMaxRowCnt()">
                                <option value="10">10개 </option>
                                <option value="20">20개 </option>
                                <option value="30">30개 </option>
                                <option value="40">40개 </option>
                                <option value="50">50개 </option>
                            </select>
                        </fieldset>
                    </div>
                </div>
            </div>
            <table class="_table _list w100 ">
                <caption>표 제목</caption>
                <colgroup>
                    <col style="width:40px;">
                    <col style="width:80px">
                    <col style="width:10%;">
                    <col style="width:10%;">
                    <col style="width:80px;">
                    <col style="width:20%;">
                    <col style="width:15%;">
                    <col style="width:80px;">
                    <col style="width:80px;">
                    <col style="width:80px;">
                </colgroup>
                <thead>
                    <tr>
                        <th><input type="checkbox" id="itm_Allcheck" name=""><label for="itm_Allcheck"><span></span></label></th>
                        <th>접수일자</th>
                        <th><span class="lineUp">소속대학<a  class="up"></a></span></th>
                        <th><span class="lineUp">학번<a  class="up"></a></span></th>
                        <th>성명</th>
                        <th>이메일</th>
                        <th>휴대폰번호</th>
                        <th>승인/<br>반려</th>
                        <th>승인/반려<br>일자</th>
                        <th>승인/반려<br>담당자</th>
                    </tr>
                </thead>
                <tbody ng-show="$root.seminar.confirm.applyList.length == 0">
					<!-- 개설된 강좌가 없을 경우 문구 출력 style="display:lnline-block; -->
					<tr class="nosearchData" style="display:lnline-block;">
					    <td colspan="10">
					    해당 강좌에 신청자가 없습니다.
					    </td>
					</tr>
                </tbody>
                <tbody ng-show="$root.seminar.confirm.applyList.length > 0">
                    <tr ng-repeat="data in $root.seminar.confirm.applyList">
                        <td><input type="checkbox" class="applyChk" id="thisChk_{{data.userSeq}}" name="thisChk_{{data.userSeq}}" ng-click="checkbox(data.userSeq);">
                        <label for="thisChk_{{data.userSeq}}" ng-click="checkbox(data.userSeq);"><span></span></label></td>
                        <td>{{data.regDt | getDateString:'yyyy.MM.dd'  }}</td>
                        <td ng-init="$root.seminar.confirm.applyInfo.univCodeName == data.univCodeName">{{data.univCodeName }}</td>
                        <td>{{data.studentNumber }}</td>
                        <td>{{data.userName }}</td>
                        <td>{{data.userEmail }}</td>
                        <td>{{data.cellNo }}</td>
                        <td>{{data.applyStatus}}</td>
                        <td>{{data.modStatusDate | getDateString:'yyyy.MM.dd'  }}</td>    
                        <td>{{data.modStatusUserName }}</span></td>     
                    </tr>
                </tbody>
            </table>
            <div class="_paging" ng-show="$root.seminar.confirm.applyList.length > 0" id="applyListPaging"></div>
            <div class="_areaButton">
                <div class="_left">
                    <span class="_button _large ApprovalBtn" ng-click="changeApplyStatus(1);"><a> 승인</a></span>
                    <span class="_button _large ApprovalBtn Aqu" ng-click="changeApplyStatus(3);"><a>반려</a></span>
                </div>
                <div class="_search pr0 _right">
                	<div class="_btnSet pr0">
	                    <span class="_button _large"><a href="javascript:void(0);" class="_blockUI wx165"  ng-click="">출석체크 명단 인쇄</a></span>
                    </div>
                    <fieldset>
                        <legend>개수</legend>
                        <select name="findType" class="_selectBox wx70" ng-model="$root.seminar.confirm.maxRowCnt" ng-change="changeMaxRowCnt()">
                            <option value="10">10개 </option>
                            <option value="20">20개 </option>
                            <option value="30">30개 </option>
                            <option value="40">40개 </option>
                            <option value="50">50개 </option>
                        </select>
                    </fieldset>
                </div>
            </div>
            <div class="_areaButton">
                <div class="_search pr0 _center">
                    <div class="_btnSet pr0">
                        <span class="_button _large"><a class="mainBtn mwx100" ng-click="goSeminarListView();">목록</a></span>
                    </div>
                </div>
            </div>
        </div>
        <!-- // article apply -->
        <form id="excelForm" name="excelForm" method="post" action=""></form>
    </div>
</div>
<!-- // cont_right -->
