<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>



<div class="tab_wraping">
    <!-- tab1 -->
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">메일 발송 관리
            <div class="pg_location"><a href="javascript:;">Go home</a>
                <span>&gt;</span> SMS/메일 발송 관리<span>&gt;</span> 메일 발송 관리
            </div>
        </h5>
        <div id="innTabContent">
            <ul class="innertab_list">
                <li data-tab="tab11" ng-class="{current:$root.message.emailSendManagement.nowMgmtTab === 0}"><a href="javascript:void(0);" ng-click="changeTab('0');"><span>메일 발송</span></a></li>
                <li data-tab="tab21" ng-class="{current:$root.message.emailSendManagement.nowMgmtTab === 1}"><a href="javascript:void(0);" ng-click="changeTab('1');"><span>발송 이력 조회</span></a></li>
            </ul>
            <!-- innertab -->
            <div class="innertab_wraping">
                <!-- tab11 회원목록 탭-->
                <div id="tab11" class="tabcontent" ng-show="$root.message.emailSendManagement.pageType == 'basic'" ng-class="{current:$root.message.emailSendManagement.nowMgmtTab === 0}">
                    <!-- basic userList -->
                    <h6 ng-show="$root.message.emailSendManagement.basic.pageViewType == 'list'">회원목록</h6>
                    <div class="_articleContent" ng-show="$root.message.emailSendManagement.basic.pageViewType == 'list'">
                        <div class="_border _write mt10">
                            <div class="_inner">
                                <fieldset>
                                    <legend>회원목록</legend>
                                    <form name="basicSearchForm" method="post">
                                        <div class="_form _both">
                                            <div class="_insert tableWrap w1000">
                                                <div class="innTable">
                                                    <table class="w95">
                                                        <colgroup>
                                                            <col style="width:8%">
                                                            <col style="width:13%">
                                                            <col style="width:7%">
                                                            <col style="width:14%">
                                                            <col style="width:7%">
                                                            <col style="width:51%">
                                                        </colgroup>
                                                        <tbody>
                                                        <tr>
                                                            <td><label for="mem_kind" class="pl10">회원유형</label>
                                                            </td>
                                                            <td>
                                                                <select ng-model="$root.message.emailSendManagement.basic.searchUserType" class="_selectBox _fL wx125">
                                                                    <option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.basic.searchUserTypeList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                                </select>
                                                            </td>
                                                            <td><label for="mem_status" class="pl10">상태</label> </td>
                                                            <td>
                                                                <select ng-model="$root.message.emailSendManagement.basic.searchUserStatus" class="_selectBox _fL w100">
                                                                    <option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.basic.searchUserStatusList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                                </select>
                                                            </td>
                                                            <td><label for="mem_date" class="pl20">기간</label></td>
                                                            <td>
                                                                <select ng-model="$root.message.emailSendManagement.basic.searchPeriodType" class="_selectBox _fL w25">
                                                                    <option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.basic.searchPeriodTypeList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                                </select>
                                                                <div class="cal_type">
																	<p class="date"><span><input type="text" id="basicSearchStartDt" ng-model="$root.message.emailSendManagement.basic.searchStartDt"></span><label class="pickerlabel" for="basicSearchStartDt"></label></p>
																	<p class="date"><span><input type="text" id="basicSearchEndDt" ng-model="$root.message.emailSendManagement.basic.searchEndDt"></span><label class="pickerlabel" for="basicSearchEndDt"></label></p>
																</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><label for="sch_kind" class="pl10">학교 구분</label></td>
                                                            <td>
                                                                <select ng-model="$root.message.emailSendManagement.basic.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv', 'basic')" class="_selectBox _fL wx125">
                                                                	<option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.basic.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                                </select>
                                                            </td>
                                                            <td colspan="2">
                                                                <select ng-model="$root.message.emailSendManagement.basic.searchUniv" class="_selectBox _fL w100">
                                                                	<option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.basic.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                                </select>
                                                            </td>
                                                            <td><label for="sch_search" class="pl20">검색</label></td>
                                                            <td>
                                                            	<select ng-model="$root.message.emailSendManagement.basic.searchKeyType" class="_selectBox _fL wx120">
                                                                    <option value="">전체</option>
                                                                    <option value="userId">아이디</option>
                                                                    <option value="userName">성명</option>
                                                                    <option value="userEmail">사용 이메일</option>
                                                                </select>
                                                                <input kr-input type="text" ng-model="$root.message.emailSendManagement.basic.searchKey" placeholder="" class="w60">
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="_areaButton innerBtn">
                                                    <div class="_right">
														<span class="_button _small _active searchBtn">
															<input type="button" value="조회" id="basicSearchBtn" ng-click="search('basic', true)">
														</span>
                                                        <span class="_button _small resetBtn">
                                                        	<input type="button" value="초기화" ng-click="resetSearchFiled('basic')">
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
								총 <strong>{{$root.message.emailSendManagement.basic.totalCnt}}<!-- <em>/100</em> --></strong> 건이 검색되었습니다.
                            </div>
                            <div class="_search pr0">
                                <div class="_btnSet pr0">
									<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown('basic')">엑셀다운</a></span>
                                </div>
                                <fieldset>
                                    <legend>페이지별 목록개수</legend>
                                    <select name="findType" ng-model="$root.message.emailSendManagement.basic.maxRowCnt" ng-change="changeMaxRowCnt('basic')" class="_selectBox wx90">
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
                                <col style="width:50px;">
                                <col style="width:12%;">
                                <col style="width:10%;">
                                <col style="width:60px;">
                                <col style="width:20%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:80px;">
                                <col style="width:80px;">
                            </colgroup>
                            <thead>
                            	<tr>
                                	<th>
                                		<input type="checkbox" id="basicCheckAll" ng-model="$root.message.emailSendManagement.basic.isCheckedAll" ng-click="checkAllUserList('basic')">
                                		<label for="basicCheckAll"><span></span></label>
                                	</th>
                                	<th ng-click="changeSortOrder($event)" data-sort="userType" data-order="desc"><span>회원유형<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                                	<th ng-click="changeSortOrder($event)" data-sort="univCode" data-order="desc"><span>학교구분<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                                	<th ng-click="changeSortOrder($event)" data-sort="userName" data-order="desc"><span>성명<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                                	<th ng-click="changeSortOrder($event)" data-sort="userId" data-order="desc"><span>아이디<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                                	<th ng-click="changeSortOrder($event)" data-sort="userStatusName" data-order="desc"><span>상태<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                                	<th ng-click="changeSortOrder($event)" data-sort="userStatusDt" data-order="desc"><span>가입/휴면/탈퇴일<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                                	<th>상세</th>
                                	<th>수정</th>
                            	</tr>
                            </thead>
                            <tbody ng-show="$root.message.emailSendManagement.basic.userList.length > 0">
	                            <tr class="firTd" ng-repeat="userInfo in $root.message.emailSendManagement.basic.userList | orderBy:descRn:false">
	                                <td>
	                                	<input type="checkbox" id="basicChk{{$index}}" ng-model="userInfo.isChecked" ng-click="checkUserList('basic')">
	                                	<label for="basicChk{{$index}}"><span></span></label>
                                	</td>
	                                <td>{{userInfo.userTypeName}}</td>
	                                <td>{{userInfo.univName}}</td>
	                                <td>{{userInfo.userName}}</td>
	                                <td class="_aL">{{userInfo.userId}}</td>
	                                <td>{{userInfo.userStatusName}}</td>
	                                <td>{{userInfo.userStatusDt | getDateString:'yyyy.MM.dd' }}</td>
	                                <td><span class="_button _minimum"><a href="javascript:void(0);" ng-click="selectUserInfoView('basic', userInfo.userSeq)">보기</a></span></td>
	                                <td><span class="_button _minimum _green"><a href="javascript:void(0);" ng-click="updateUserView('basic', userInfo.userSeq)">수정</a></span></td>
	                            </tr>
                            </tbody>
                            <tbody ng-show="$root.message.emailSendManagement.basic.userList.length == 0">
                            	<tr>
                            		<td colspan="9">검색 결과가 없습니다.</td>
                            	</tr>
                            </tbody>
                        </table>
                        <div ng-show="$root.message.emailSendManagement.basic.userList.length > 0" id="basicUserListPaging" class="_paging"></div>
                        <div class="_areaButton">
                            <div class="_left">
								<span class="_button _large borderBtn">
									<a href="javascript:void(0);" class="_blockUI" ng-click="updateUserForcedWithdraw('basic')">강제탈퇴</a>
								</span>
                            </div>
                            <div class="_search pr0 _right">
                                <div class="_btnSet pr0">
									<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown('basic')">엑셀다운</a></span>
                                </div>
                                <fieldset>
                                    <legend>홈페이지검색</legend>
                                    <select name="findType" ng-model="$root.message.emailSendManagement.basic.maxRowCnt" ng-change="changeMaxRowCnt('basic')" class="_selectBox wx90">
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
                    <!-- //basic userList -->
                    <!-- basic userInfo -->
					<h6 ng-show="$root.message.emailSendManagement.pageType == 'basic' && $root.message.emailSendManagement.basic.pageViewType == 'info'">회원정보 조회</h6>
					<div class="_articleContent" ng-show="$root.message.emailSendManagement.pageType == 'basic' && $root.message.emailSendManagement.basic.pageViewType == 'info'">
						<div class="_viewHead">
							<div class="_viewTitle">회원정보 조회</div>
						</div>
						<table class="_table _view w100">
							<caption>회원정보 상세</caption>
							<colgroup>
								<col style="width:150px;">
								<col>
								<col style="width:150px;">
								<col>
							</colgroup>
							<tbody>
								<tr>
									<th>아이디</th>
									<td colspan="3" ng-if="$root.message.emailSendManagement.basic.userInfo.userType != Const.code.USER_TYPE_LLLEARN && $root.message.emailSendManagement.basic.userInfo.userType != Const.code.USER_TYPE_CITIZEN">
										{{$root.message.emailSendManagement.basic.userInfo.userId}}
									</td>
									<td ng-if="$root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_LLLEARN || $root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_CITIZEN">
										{{$root.message.emailSendManagement.basic.userInfo.userId}}
									</td>
									<th ng-if="$root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_LLLEARN || $root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_CITIZEN">
										연령구분
									</th>
									<td ng-if="$root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_LLLEARN || $root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_CITIZEN">
										{{$root.message.emailSendManagement.basic.userInfo.under14Year == 'Y' ? '14세 미만' : '14세 이상'}}
									</td>
								</tr>
								<tr>
									<th>성명</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.userName}}</td>
									<th>회원유형</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.userTypeName}}</td>
								</tr>
								<tr>
									<th>소속 대학교</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.univName}}</td>
									<th>학번</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.studentNumber}}</td>
								</tr>
								<tr>
									<th>학과명(부서명)</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.department}}</td>
									<th>생년월일</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.birthday}}</td>
								</tr>
								<tr>
									<th>부서 전화번호</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.telNo}}</td>
									<th>휴대폰 번호</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.cellNo}}</td>
								</tr>
								<tr>
									<th>비밀번호 변경<br>/알림용 이메일</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.userEmail}}</td>
									<th>성별</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.mfTypeDesc}}</td>
								</tr>
								<tr>
									<th>가입일</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.confmDt | getDateString:'yyyy.MM.dd' }}</td>
									<th>휴면일</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.inactiveDt | getDateString:'yyyy.MM.dd' }}</td>
								</tr>
								<tr>
									<th>탈퇴일</th>
									<td colspan="3">{{$root.message.emailSendManagement.basic.userInfo.withdrawDt | getDateString:'yyyy.MM.dd' }}</td>
								</tr>
								<tr>	
									<th>탈퇴사유</th>
									<td colspan="3">{{$root.message.emailSendManagement.basic.userInfo.withdrawDt != null ? $root.message.emailSendManagement.basic.userInfo.withdrawReason : ''}}</td>
								</tr>
								<tr>
									<th>상태</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.userStatusName}}</td>
									<th>최근 접속일시</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.lastLoginde | getDateString:'yyyy.MM.dd hh24:mm:ss' }}</td>
								</tr>
							</tbody>
						</table>
						<div class="_viewHead" ng-if="$root.message.emailSendManagement.basic.userInfo.under14Year == 'Y'">
							<div class="_viewTitle">보호자 정보</div>
						</div>
						<table class="_table _view w100" ng-if="$root.message.emailSendManagement.basic.userInfo.under14Year == 'Y'">
							<caption>보호자 정보</caption>
							<colgroup>
								<col style="width:150px;">
								<col>
								<col style="width:150px;">
								<col>
							</colgroup>
							<tbody>
								<tr>
									<th>성명</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.parentName}}</td>
									<th>생년월일</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.parentBirthday}}</td>
								</tr>
								<tr>
									<th>휴대폰번호</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.parentCellNo}}</td>
									<th>성별</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.parentSexDesc}}</td>
								</tr>
							</tbody>
						</table>
						<div class="_areaButton">
							<div class="_center">
								<span class="_button _large blackBtn"><a href="javascript:void(0);" class="_blockUI wx135" ng-click="selectUserListView('basic')" >목록</a></span>
                                <span class="_button _large borderBtn"><a href="javascript:void(0);" class="_blockUI wx135" ng-click="updateUserView('basic', $root.message.emailSendManagement.basic.userInfo.userSeq)" >수정</a></span>
							</div>
						</div>
					</div>
					<!-- //basic userInfo -->
					<!-- basic userInfo modify -->
					<h6 ng-show="$root.message.emailSendManagement.pageType == 'basic' && $root.message.emailSendManagement.basic.pageViewType == 'modify'">회원정보 수정</h6>
					<div class="_articleContent" ng-show="$root.message.emailSendManagement.pageType == 'basic' && $root.message.emailSendManagement.basic.pageViewType == 'modify'">
						<div class="_viewHead">
							<div class="_viewTitle">회원정보 수정</div>
						</div>
						<table class="_table _view w100">
							<caption>회원정보 수정 표</caption>
							<colgroup>
								<col style="width:150px;">
								<col>
								<col style="width:150px;">
								<col>
							</colgroup>
							<tbody>
								<tr>
									<th>아이디</th>
									<td colspan="3" ng-if="$root.message.emailSendManagement.basic.userInfo.userType != Const.code.USER_TYPE_LLLEARN && $root.message.emailSendManagement.basic.userInfo.userType != Const.code.USER_TYPE_CITIZEN">
										{{$root.message.emailSendManagement.basic.userInfo.userId}}
									</td>
									<td ng-if="$root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_LLLEARN || $root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_CITIZEN">
										{{$root.message.emailSendManagement.basic.userInfo.userId}}
									</td>
									<th ng-if="$root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_LLLEARN || $root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_CITIZEN">
										연령구분
									</th>
									<td ng-if="$root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_LLLEARN || $root.message.emailSendManagement.basic.userInfo.userType == Const.code.USER_TYPE_CITIZEN">
										{{$root.message.emailSendManagement.basic.userInfo.under14Year == 'Y' ? '14세 미만' : '14세 이상'}}
									</td>
								</tr>
								<tr>
									<th>성명</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.userName}}</td>
									<th>성별</th>
									<td>{{$root.message.emailSendManagement.basic.userInfo.mfTypeDesc}}</td>
								</tr>
								<tr>
									<th for="mem_college">소속 대학교 <span class="mark">*</span></th>
									<td colspan="3">
										<select name="mem_college" id="mem_college" class="_selectBox _fL wx125 mr05" ng-model="$root.message.emailSendManagement.basic.userInfo.univAreaCd" ng-change="getChildCdList('univAreaCd', 'univCode', 'basic')">
											<option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.basic.univAreaCdList | orderBy:codeIdx:false">{{code.codeName}}</option>
										</select>
										<select name="mem_college" id="mem_college" class="_selectBox _fL wx270" ng-model="$root.message.emailSendManagement.basic.userInfo.univCode">
											<option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.basic.univCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>학과명(부서명)<mark class="must" ng-if="$root.message.emailSendManagement.emailSendResultList.userInfo.userType == Const.code.USER_TYPE_LLLEARN || $root.message.emailSendManagement.emailSendResultList.userInfo.userType == Const.code.USER_TYPE_CITIZEN">필수입력</mark></th>
									<td colspan="3"><input kr-input type="text" placeholder="" class="wx405" maxlength="30" ng-model="$root.message.emailSendManagement.basic.userInfo.department"></td>
								</tr>
								<!-- 대학담당자는 학번 비노출 dispaly:none -->
								<tr ng-if="$root.message.emailSendManagement.basic.userInfo.userType != Const.code.USER_TYPE_UNIV || $root.message.emailSendManagement.basic.userInfo.userType != Const.code.USER_TYPE_LLLEARN">
									<th>학번 <span class="mark">*</span></th>
									<td colspan="3"><input kr-input type="text" placeholder="" class="wx405" maxlength="20" ng-model="$root.message.emailSendManagement.basic.userInfo.studentNumber"></td>
								</tr>
								<tr>
									<th>생년월일</th>
									<td colspan="3">
										<select class="_selectBox _fL wx150 mr05" ng-model="$root.message.emailSendManagement.basic.userInfo.birthYear" ng-change="changeDate('basic')">
											<option ng-repeat="code in $root.message.emailSendManagement.birthYearList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
										</select>
										<select class="_selectBox _fL wx80 mr05" ng-model="$root.message.emailSendManagement.basic.userInfo.birthMonth" ng-change="changeDate('basic')">
											<option ng-repeat="code in $root.message.emailSendManagement.birthMonthList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
										</select>
										<select class="_selectBox _fL wx80 " ng-model="$root.message.emailSendManagement.basic.userInfo.birthDay">
											<option ng-repeat="code in $root.message.emailSendManagement.basic.birthDayList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>부서 전화번호</th>                
									<td colspan="3">
										<select class="_selectBox _fL wx80 mr05" ng-model="$root.message.emailSendManagement.basic.userInfo.telNo1">
											<option ng-repeat="code in $root.message.emailSendManagement.telNoList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
										</select>
										<input type="text" placeholder="" class="wx100" ng-model="$root.message.emailSendManagement.basic.userInfo.telNo2" maxlength="4" numberOnly>
										<input type="text" placeholder="" class="wx100" ng-model="$root.message.emailSendManagement.basic.userInfo.telNo3" maxlength="4" numberOnly>
									</td>
								</tr>
								<tr>
								<th>휴대폰 번호<mark class="must" ng-if="$rootScope.userManagement[pageType].userInfo.under14Year != 'Y'">필수입력</mark></th>              
									<td colspan="3">
										<select class="_selectBox _fL wx80 mr05" ng-model="$root.message.emailSendManagement.basic.userInfo.cellNo1">
											<option ng-repeat="code in $root.message.emailSendManagement.cellNoList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
										</select>
										<input type="text" placeholder="" class="wx100" ng-model="$root.message.emailSendManagement.basic.userInfo.cellNo2" maxlength="4" numberOnly>
										<input type="text" placeholder="" class="wx100" ng-model="$root.message.emailSendManagement.basic.userInfo.cellNo3" maxlength="4" numberOnly>
									</td>
								</tr>
								<tr>
									<th>비밀번호변경<br>/알림용 이메일 <span class="mark">*</span></th>
									<td colspan="3">
										<label for="$root.message.emailSendManagement.basic.userInfo.subEmail1" class="hidden">이메일 아이디</label>
										<input kr-input type="text" id="basic.email1" class="wx155" ng-model="$root.message.emailSendManagement.basic.userInfo.subEmail1">
										<span>@</span>
										<label for="$root.message.emailSendManagement.basic.userInfo.subEmail2" class="hidden">이메일 주소</label>
										<input kr-input type="text" id="basic.email2" class="wx180" ng-model="$root.message.emailSendManagement.basic.userInfo.subEmail2">
										<select class="_selectBox _fL wx185 mr05" ng-model="$root.message.emailSendManagement.basic.userInfo.subEmailSel" ng-change="changeEmailDomain('basic', 'subEmail2', 'subEmailSel')">
					    					<option ng-repeat="code in $root.message.emailSendManagement.emailDomainList | orderBy:codeIndex:false" value="{{code.code}}">{{code.codeName}}</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="_areaButton">
							<div class="_center">
								<span class="_button _large blackBtn"><a href="javascript:void(0);" class="_blockUI wx135"  ng-click="updateUserInfo('basic')">저장</a></span>
								<span class="_button _large borderBtn"><a href="javascript:void(0);" class="_blockUI wx135"  ng-click="selectUserListView('basic')">취소</a></span>
							</div>
						</div>
					</div>
					<!-- //basic userInfo modify -->
                </div>
                <!-- //tab11 회원목록 탭 -->
                <!-- tab21 -->
                <div id="tab21" class="tabcontent" ng-show="$root.message.emailSendManagement.pageType == 'emailSendResultList'" ng-class="{current:$root.message.emailSendManagement.nowMgmtTab === 1}">
                	<!-- emailSendResultList -->
                	<h6 ng-show="$root.message.emailSendManagement.pageType == 'emailSendResultList' && $root.message.emailSendManagement.emailSendResultList.pageViewType == 'list'">회원목록</h6>
                    <div class="_articleContent" ng-show="$root.message.emailSendManagement.pageType == 'emailSendResultList' && $root.message.emailSendManagement.emailSendResultList.pageViewType == 'list'">
                        <div class="_border _write mt10">
                            <div class="_inner">
                                <fieldset>
                                    <legend>회원목록</legend>
                                    <form name="accountSearchForm" method="post">
                                        <div class="_form _both">
                                            <div class="_insert tableWrap w1000">
                                                <div class="innTable">
                                                    <table class="w95">
                                                        <colgroup>
                                                            <col style="width:8%">
                                                            <col style="width:13%">
                                                            <col style="width:7%">
                                                            <col style="width:14%">
                                                            <col style="width:7%">
                                                            <col style="width:51%">
                                                        </colgroup>
                                                        <tbody>
                                                        <tr>
                                                            <td><label for="mem_kind" class="pl10">회원유형</label>
                                                            </td>
                                                            <td>
                                                                <select ng-model="$root.message.emailSendManagement.emailSendResultList.searchUserType" class="_selectBox _fL wx125">
                                                                    <option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.emailSendResultList.searchUserTypeList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                                </select>
                                                            </td>
                                                            <td><label for="mem_status" class="pl10">상태</label> </td>
                                                            <td>
                                                                <select ng-model="$root.message.emailSendManagement.emailSendResultList.searchUserStatus" class="_selectBox _fL w100">
                                                                    <option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.emailSendResultList.searchUserStatusList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                                </select>
                                                            </td>
                                                            <td><label for="mem_date" class="pl20">신청일</label></td>
                                                            <td>
																<div class="cal_type">
																	<p class="date"><span><input type="text" id="accountSearchStartDt" ng-model="$root.message.emailSendManagement.emailSendResultList.searchStartDt"></span><label class="pickerlabel" for="accountSearchStartDt"></label></p>
																	<p class="date"><span><input type="text" id="accountSearchEndDt" ng-model="$root.message.emailSendManagement.emailSendResultList.searchEndDt"></span><label class="pickerlabel" for="accountSearchEndDt"></label></p>
																</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><label for="sch_kind" class="pl10">학교 구분</label></td>
                                                            <td>
                                                                <select ng-model="$root.message.emailSendManagement.emailSendResultList.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv', 'emailSendResultList')" class="_selectBox _fL wx125">
                                                                	<option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.emailSendResultList.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                                </select>
                                                            </td>
                                                            <td colspan="2">
                                                                <select ng-model="$root.message.emailSendManagement.emailSendResultList.searchUniv" class="_selectBox _fL w100">
                                                                	<option value="{{code.code}}" ng-repeat="code in $root.message.emailSendManagement.emailSendResultList.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                                                </select>
                                                            </td>
                                                            <td><label for="sch_search" class="pl20">검색</label></td>
                                                            <td>
                                                            	<select ng-model="$root.message.emailSendManagement.emailSendResultList.searchKeyType" class="_selectBox _fL wx120">
                                                                    <option value="">전체</option>
                                                                    <option value="userId">아이디</option>
                                                                    <option value="userName">성명</option>
                                                                    <option value="userEmail">사용 이메일</option>
                                                                </select>
                                                                <input kr-input type="text" ng-model="$root.message.emailSendManagement.emailSendResultList.searchKey" placeholder="" class="w60">
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="_areaButton innerBtn">
                                                    <div class="_right">
														<span class="_button _small _active searchBtn">
															<input type="button" value="조회" id="accountSearchBtn" ng-click="search('emailSendResultList', true)">
														</span>
                                                        <span class="_button _small resetBtn">
                                                        	<input type="button" value="초기화" ng-click="resetSearchFiled('emailSendResultList')">
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
								총 <strong>{{$root.message.emailSendManagement.emailSendResultList.totalCnt}}<!-- <em>/100</em> --></strong> 건이 검색되었습니다.
                            </div>
                            <div class="_search pr0">
                                <div class="_btnSet pr0">
									<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown('emailSendResultList')">엑셀다운</a></span>
                                </div>
                                <fieldset>
                                    <legend>페이지별 목록개수</legend>
                                    <select name="findType" ng-model="$root.message.emailSendManagement.emailSendResultList.maxRowCnt" ng-change="changeMaxRowCnt('emailSendResultList')" class="_selectBox wx90">
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
								<col style="width:50px;">
                                <col style="width:12%;">
                                <col style="width:10%;">
                                <col style="width:60px;">
                                <col style="width:20%;">
                                <col style="width:10%;">
                                <col style="width:10%;">
                                <col style="width:80px;">
                                <col style="width:80px;">
                                <col style="width:80px;">
                            </colgroup>
                            <thead>
                            	<tr>
                                	<th>
                                		<input type="checkbox" id="accountCheckAll" ng-model="$root.message.emailSendManagement.emailSendResultList.isCheckedAll" ng-click="checkAllUserList('emailSendResultList')">
                                		<label for="accountCheckAll"><span></span></label>
                                	</th>
                                	<th ng-click="changeSortOrder($event)" data-sort="userType" data-order="desc"><span>회원유형<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                                	<th ng-click="changeSortOrder($event)" data-sort="univCode" data-order="desc"><span>학교구분<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                                	<th ng-click="changeSortOrder($event)" data-sort="userName" data-order="desc"><span>성명<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                                	<th ng-click="changeSortOrder($event)" data-sort="userId" data-order="desc"><span>아이디<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                                	<th ng-click="changeSortOrder($event)" data-sort="userStatusDt" data-order="desc"><span>신청일<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                                	<th ng-click="changeSortOrder($event)" data-sort="userStatusName" data-order="desc"><span>상태<a href="javascript:void(0);" style="display:none;" class="down"></a></span></th>
                                	<th>상세</th>
                                	<th colspan="2">승인처리</th>
                            	</tr>
                            </thead>
                            <tbody ng-show="$root.message.emailSendManagement.emailSendResultList.length > 0">
	                            <tr class="firTd" ng-repeat="userInfo in $root.message.emailSendManagement.emailSendResultList | orderBy:descRn:false">
	                                <td>
	                                	<input type="checkbox" id="accountChk{{$index}}" ng-model="userInfo.isChecked" ng-click="checkUserList('emailSendResultList')">
	                                	<label for="accountChk{{$index}}"><span></span></label>
                                	</td>
	                                <td>{{userInfo.userTypeName}}</td>
	                                <td>{{userInfo.univName}}</td>
	                                <td>{{userInfo.userName}}</td>
	                                <td class="_aL">{{userInfo.userId}}</td>
	                                <td>{{userInfo.userStatusDt}}</td>
	                                <td>{{userInfo.userStatusName}}</td>
	                                <td><span class="_button _minimum"><a href="javascript:void(0);" ng-click="selectUserInfoView('emailSendResultList', userInfo.userSeq)">보기</a></span></td>
	                                <td ng-if="userInfo.accountRejectReason == null"><span class="_button _minimum _green"><a href="javascript:void(0);" ng-click="updateUserConfirm('emailSendResultList', userInfo.userSeq)">승인</a></span></td>
	                                <td ng-if="userInfo.accountRejectReason == null"><span class="_button _minimum _gray"><a href="javascript:void(0);" ng-click="updateUserRejectReason('emailSendResultList', userInfo.userSeq)">반려</a></span></td>
	                                <td ng-if="userInfo.accountRejectReason != null" colspan="2"><span class="_button _minimum _gray"><a href="javascript:void(0);" ng-click="selectUserRejectReason('emailSendResultList', $index)" class="wx50">사유보기</a></span></td>         
	                            </tr>
                            </tbody>
                            <tbody ng-show="$root.message.emailSendManagement.emailSendResultList.length == 0">
                            	<tr>
                            		<td colspan="10">검색 결과가 없습니다.</td>
                            	</tr>
                            </tbody>
                        </table>
                        <div ng-show="$root.message.emailSendManagement.emailSendResultList.length > 0" id="emsilSendResultListViewPaging" class="_paging"></div>
                        <div class="_areaButton">
                            <div class="_left">
								<span class="_button _large borderBtn">
									<a href="javascript:void(0);" class="_blockUI" ng-click="updateUserConfirm('emailSendResultList')">선택승인</a>
								</span>
                            </div>
                            <div class="_search pr0 _right">
                                <div class="_btnSet pr0">
									<span class="_large"><a href="javascript:void(0);" class="_blockUI downBtn" ng-click="excelDown('emailSendResultList')">엑셀다운</a></span>
                                </div>
                                <fieldset>
                                    <legend>페이징</legend>
                                    <select name="findType" ng-model="$root.message.emailSendManagement.emailSendResultList.maxRowCnt" ng-change="changeMaxRowCnt('emailSendResultList')" class="_selectBox wx90">
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
                	<!-- //emailSendResultList -->
                </div>
                <!-- //tab21 -->
            </div>
            <!-- //innertab -->
        </div>
    </div>
    <!-- // tab1 -->
    
	<form id="excelForm" name="excelForm" method="post" action=""></form>
</div>