<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- cont_bar -->   
<div class="rightConBoxing">
    <div class="tab_wraping">
        <!-- tab1 -->
        <div id="tab1" class="tab-content current">
            <h5 class="cont_Title">세미나/특강 출석관리
                <div class="pg_location"><a >Go home</a> <span>&gt;</span> ADMIN<span>&gt;</span> 세미나/특강 관리<span>&gt;</span> 세미나/특강 출석관리</div>
            </h5>
            <div id="innTabContent">
                <div class="_articleContent" ng-show="$root.seminar.attend.pageViewType == 'list'">
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
                                                            	ng-model="$root.seminar.attend.searchSeminarType">
                                                                <option value="">전체</option>
                                                                    <option value="seminar">세미나</option>
                                                                    <option value="lecture">특강</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="cla_state" class="pl20">상태</label></td>
                                                        <td>
                                                            <select name="cla_state" id="sch_kind" class="_selectBox _fL wx100"
                                                            	ng-model="$root.seminar.attend.searchSeminarStatus">
                                                                <option value="">전체</option>
                                                                <option value="wait">대기</option>
                                                                <option value="accepting">접수중</option>
                                                                <option value="close">마감</option>
                                                            </select>
                                                        </td>
                                                        <td><label for="sch_search" class="pl20">검색</label></td>
                                                        <td colspan="3">
                                                            <select name="sch_search" id="sch_search" class="_selectBox _fL wx100"
                                                            	ng-model="$root.seminar.attend.searchEtcOption">
                                                                <option value="">전체</option>
                                                                <option value="title">강좌명</option>
                                                                <option value="place">장소</option>
                                                                <option value="teacher">강사</option>
                                                            </select>
                                                            <input kr-input type="text" id="" placeholder="" class="wx180" ng-model="$root.seminar.attend.searchKeywords">
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><label for="sch_kind" class="pl10">학교 구분</label></td>
                                                        <td>
                                                            <select name="mem_college" id="mem_college" class="_selectBox _fL wx150"
						                                    	ng-model="$root.seminar.attend.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv')">
																<option value="{{code.code}}"
																	ng-repeat="code in $root.seminar.attend.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
															</select>
                                                        </td>
										 				<td colspan="2">
                                                            <select name="mem_college" id="mem_college" class="_selectBox _fL w99"
																ng-model="$root.seminar.attend.searchUniv">
																<option value="{{code.code}}"
																	ng-repeat="code in $root.seminar.attend.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
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
                            총  <strong>{{$root.seminar.attend.totalCnt}}</strong>  건이 검색되었습니다.
                        </div>
                        <div class="_search pr0">
                            <div class="_btnSet pr0">
                                <span class="_large">
									<a  class="_blockUI downBtn"  ng-click="excelDown();">엑셀다운</a>
								</span>
                            </div>
                            <fieldset>
                                <legend>개수</legend>
                                <select name="findType" class="_selectBox wx70" ng-model="$root.seminar.attend.maxRowCnt" ng-change="changeMaxRowCnt()">
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
                            <col style="width:14%;">
                            <col style="width:60px;">
                            <col style="width:80px;">
                            <col style="width:10%;">
                            <col style="width:60px;">   
                            <col style="width:60px;">
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
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="title" data-order="desc"><span>강좌명<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="place" data-order="desc"><span>장소<a style="display:none;"  class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="classDay" data-order="desc"><span>강의일시<a style="display:none;"  class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="classStartTime" data-order="desc"><span>시간<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="teacherName" data-order="desc"><span>강사<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="maxUserCnt" data-order="desc"><span>수강가능<br>인원<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="applyUserCnt" data-order="desc"><span>승인<br>인원<a style="display:none;"  class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="attendUserCnt" data-order="desc"><span>출석<br>인원<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="seminarStatus" data-order="desc"><span >상태<a  style="display:none;" class="down"></a></span></th>
                                <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="attendDt" data-order="desc"><span>출석<br>처리일<a  style="display:none;" class="down"></a></span></th>
                                <th>출석처리</th>
                            </tr>
                        </thead>
                        <tbody ng-show="$root.seminar.attend.seminarList.length == 0">
                            <!-- 개설된 강좌가 없을 경우 문구 출력 style="display:lnline-block; -->
                            <tr class="nosearchData" style="display:lnline-block;">
                                <td colspan="13">
                                개설된 강좌가 없습니다.
                                </td>
                            </tr>
                        </tbody>
                       	<tbody ng-show="$root.seminar.attend.seminarList.length > 0">
                            <tr ng-repeat="data in $root.seminar.attend.seminarList">
                                <td>{{getSeminarColStr('seminarType', $index)}}</td>
                                <td>{{data.univCodeName}}</td>
                                <td>{{data.title}}</td>
                                <td>{{data.place}}</td>
                                <td>{{data.classDay | getDateString:'yyyy.MM.dd' }}</td>
                                <td>{{data.classStartTime}} ~ {{data.classEndTime}}</td>
                                <td>{{data.teacherName}}</td>
                                <td>{{data.maxUserCnt}}</td>
                                <td>{{data.applyUserCnt}}</td>
                                <td>{{data.attendUserCnt}}</td>
                                <td>{{data.seminarStatus}}</td>
                                <td>{{data.attendDt | getDateString:'yyyy.MM.dd' }}</td>
                                <td><span class="_button _minimum _puple"><a ng-click="attend(data.seminarSeq, $index);">출석처리</a></span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="_paging" ng-show="$root.seminar.attend.seminarList.length > 0" id="seminarListPaging">
					</div>
                    </div>
                    <div class="_areaButton">
                        <div class="_search pr0 _right">
                            <div class="_btnSet pr0">
                                <span class="_large">
									<a  class="_blockUI downBtn"  ng-click="excelDown();">엑셀다운</a>
								</span>
                            </div>
                            <fieldset>
                                <legend>개수</legend>
                                <select name="findType" class="_selectBox wx70" ng-model="$root.seminar.attend.maxRowCnt" ng-change="changeMaxRowCnt()">
                                    <option value="10">10개 </option>
                                    <option value="20">20개 </option>
                                    <option value="30">30개 </option>
                                    <option value="40">40개 </option>
                                    <option value="50">50개 </option>
                                </select>
                            </fieldset>
                        </div>
                    </div>
                <div class="_articleContent" ng-show="$root.seminar.attend.pageViewType == 'attend'">
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
                                    <td>{{$root.seminar.attend.seminarInfo.seminarType}}</td>
                                    <th>학교구분<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.univCodeName}}</td>
                                </tr>
                                <tr>
                                    <th>강좌명<span class="mark"></span></th>
                                     <td>{{$root.seminar.attend.seminarInfo.title}}</td>
                                    <th>접수기간<span class="mark"></span></th>
                                     <td>{{$root.seminar.attend.seminarInfo.applyStartDay | getDateString:'yyyy.MM.dd' }} ~ {{$root.seminar.attend.seminarInfo.applyEndDay | getDateString:'yyyy.MM.dd' }}</td>
                                </tr>
                                <tr>
                                    <th>강의날짜<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.classDay | getDateString:'yyyy.MM.dd' }}</td>
                                    <th>요일 및 시간<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.classStartTime}} ~ {{$root.seminar.attend.seminarInfo.classEndTime}}</td>
                                </tr>
                                <tr>
                                    <th>수강가능인원구분<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.applyAvailableType}}</td>
                                    <th>수강가능인원<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.maxUserCnt}}명</td>
                                </tr>
                                <tr>
                                    <th>승인인원<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.applyUserCnt}}명</td>
                                    <th>대기인원<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.waitUserCnt}}명</td>
                                </tr>
                                <tr>
                                    <th>장소<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.place}}</td>
                                    <th>강사명<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.teacherName}}</td>
                                </tr>
                                <tr>
                                    <th>승인처리유형<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.acceptType}}</td>
                                    <th>서울시교류여부<span class="mark"></span></th>
                                    <td>{{$root.seminar.attend.seminarInfo.exchangeYn}}</td>
                                </tr>
<!--                                 <tr> -->
<!--                                     <th>출석 처리자<span class="mark"></span></th> -->
<!--                                     <td>{{$root.seminar.attend.seminarInfo.attendanceUserSeq}}</td> -->
<!--                                     <th>출석 처리일<span class="mark"></span></th> -->
<!--                                     <td>{{$root.seminar.attend.seminarInfo.attendanceDt}}</td> -->
<!--                                 </tr> -->
                                <tr>
                                    <th>상태<span class="mark"></span></th>
                                    <td colspan="3">{{$root.seminar.attend.seminarInfo.seminarStatus}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="_listHead mt10">
                        <div class="_count wBg pl0">
                            승인 :<strong>{{$root.seminar.attend.seminarInfo.applyUserCnt}}<!-- <em>/100</em> --></strong>  명
                        </div>
                        <div class="_count wBg pl0">
                            출석 :<strong>{{$root.seminar.attend.seminarInfo.attendUserCnt}}<!-- <em>/100</em> --></strong>  명
                        </div>
                        <div class="_count wBg pl0">
                           출석율 :<strong>{{$root.seminar.attend.attendPercent}}<!-- <em>/100</em> --></strong> %
                        </div>
<!--                         <div class="_search pr0"> -->
<!--                             <div class="_btnSet pr0"> -->
<!--                                 <span class="_large"> -->
<!-- 									<a  class="_blockUI downBtn"  ng-click="excelDown();">엑셀다운</a> -->
<!-- 								</span> -->
<!--                             </div> -->
<!--                         </div> -->
                    </div>
                    <div class="countWrap" style="height: auto; min-height: auto;">
                        <table class="_table _list w100 ">
                            <caption>표 제목</caption>
                            <colgroup>
                                <col style="width:40px;">
                                <col style="width:5%;">
                                <col style="width:8%;">
                                <col style="width:8%;">
                                <col style="width:8%;">
                                <col style="width:15%;">
                                <col style="width:35%;">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="rowNumber" data-order="desc"><span>번호<a  style="display:none;" class="down"></a></span></th>
                                    <th class="lineUp"><input type="checkbox" id="itm_Allcheck" name="">출석<br>체크</label>
                                    </th>
                                    <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="userName" data-order="desc"><span">성명<a  style="display:none;" class="down"></a></span></th>
                                    <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="univCodeName" data-order="desc"><span>소속대학<a  style="display:none;" class="down"></a></span></th>
                                    <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="studentNumber" data-order="desc"><span>학번<a  style="display:none;" class="down"></a></span></th>
                                  	<th class="lineUp" ng-click="changeSortOrder($event)" data-sort="userId" data-order="desc"><span>아이디<a  style="display:none;" class="down"></a></span></th>
                                    <th>수강확인증 등록<br><span class="caution">(1mb이내 jpg, jpeg, gif 파일만 등록가능)</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody ng-show="$root.seminar.attend.attendList.length == 0">
                                <tr class="nosearchData" style="display:lnline-block;">
                                    <td colspan="7">
                                    승인된 신청자가 없습니다.
                                    </td>
                                </tr>
                            </tbody>
                            <tbody ng-show="$root.seminar.attend.attendList.length > 0">
                                <tr ng-repeat="data in $root.seminar.attend.attendList">
                                    <td>{{data.rowNumber}}</td>
                                    <td>
                                    	<input type="checkbox" id="thisChk{{$index}}" class="{{$root.seminar.attend.attendclass}}"
                                    		ng-model="data.attendanceYn" ng-true-value="'Y'" ng-false-value="'N'" ng-click="checkAttend(data, $index);">
                                    	<label for="thisChk{{$index}}"><span></span></label>
                                    </td>
                                    <td>{{data.userName}}</td>
                                    <td>{{data.univCodeName}}</td>
                                    <td>{{data.studentNumber}}</td>
                                    <td>{{data.userId}}</td>
                                    <td class="_aL">
                                    	<div>
                                    		<div>
                                    			<span class="_button _minimum _puple pl10 mt10">
		                                    		<label for="certImageFile{{$index}}" style="cursor: pointer;min-width: 65px;height:28px;line-height:28px;border: 1px solid #757575;border-radius: 4px;background-color: #fff;color: #757575;letter-spacing: -.01em;padding: 0 .5em;background: #fff;text-align: center;word-wrap: break-word;display: inline-block;zoom: 1;margin: 0;font-size: 100%;vertical-align: baseline;font-weight: bold;border-spacing: 0;">등록</label>
		                                    		<input id="certImageFile{{$index}}" type="file" nv-file-select uploader="data.uploader" style="display:none;"/>
                                    			</span>
                                    			<span id="certFileName{{$index}}" ng-show="data.certFileName">{{data.certFileName}}</span>
                                    			<span ng-show="!data.certFileName">{{data.uploader.queue[0].file.name}}</span>
                                    			<span ng-show="data.certFileName" id="certFileClose{{$index}}" class=" file_close"><a style="cursor:pointer;" ng-click="removeCert(data, $index);" class="">삭제</a></span>
                                    		</div>
                                    	</div>
                                    </td>     
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="_areaButton">
                        <div class="_search pr0 _center">
                            <div class="_btnSet pr0">
                                <span class="_button _large"><a class="mainBtn mwx100" ng-click="goSeminarAttendListView();">목록</a></span>
                            </div>
                        </div>
<!--                         <div class="_search pr0 _right"> -->
<!--                             <div class="_btnSet pr0"> -->
<!--                                 <span class="_large"> -->
<!-- 									<a  class="_blockUI downBtn"  ng-click="excelDown();">엑셀다운</a> -->
<!-- 								</span> -->
<!--                             </div> -->
<!--                         </div> -->
                    </div>
                </div>
            </div>
        </div>
        <form id="excelForm" name="excelForm" method="post" action=""></form>
    </div>
</div>
<!-- // cont_right -->

