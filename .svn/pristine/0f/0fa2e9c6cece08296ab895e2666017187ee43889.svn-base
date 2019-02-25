<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

 <!-- rightConBoxing --> 
    <div class="rightConBoxing">
        <div class="tab_wraping">
        <!-- tab1 -->
            <div id="tab1" class="tab-content current">
                <h5 class="cont_Title">개인정보수정
                    <div class="pg_location"><a >Go home</a> <span>&gt;</span> 회원관리<span>&gt;</span> 개인정보수정</div>
                </h5>
                <div id="innTabContent">
                    <div class="_articleContent">
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
									<td colspan="3">${session.userId }</td>
                                </tr>
                                <tr>
                                    <th>성명</th>
									<td>${session.userName }</td>
<!--                                     <th>성별</th> -->
<!--                                     <td>남/여</td> -->
                                </tr>
                                <tr>
								<th for="mem_college">소속 대학교  <span class="mark">*</span></th>
								<td colspan="3">
								 	<select ng-model="$root.member.modify.univAreaCode" ng-change="getChildCdList('univAreaCode', 'univCode')" class="_selectBox _fL wx125">
                                    	<option value="{{code.code}}" ng-repeat="code in $root.member.modify.univAreaCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                    </select>
                                   	<select ng-model="$root.member.modify.univCode" class="_selectBox _fL wx125">
                                    	<option value="{{code.code}}" ng-repeat="code in $root.member.modify.univCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
                                    </select>
								</td>
								</tr>
								<tr>
									<th>학과명(부서명)</th>
									<td colspan="3">
										<input kr-input type="text" id="" placeholder="" class="wx405" ng-model="$root.member.modify.department">
									</td>
								</tr>
                                <tr>
                                    <th>비밀번호  <span class="mark">*</span></th>
                                    <td colspan="3"><span class="_button _minimum _green"><a  class="tabInnBtn" ng-click="pwdChange();">비밀번호 변경</a></span></td>
                                </tr>
                                <tr>
                                    <th>생년월일</th>
                                    <td colspan="3">
                                        <select name="mem_birth1" id="mem_birth1" class="_selectBox _fL wx150 mr05" ng-model="$root.member.modify.year" ng-change="changeDate();">
											<option ng-repeat="code in birthYearList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
										</select> 
										<select name="mem_birth2" id="mem_birth2" class="_selectBox _fL wx80 mr05" ng-model="$root.member.modify.month" ng-change="changeDate();">
											<option ng-repeat="code in birthMonthList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
										</select>
										<select name="mem_birth3" id="mem_birth3" class="_selectBox _fL wx80 " ng-model="$root.member.modify.day">
											<option ng-repeat="code in $root.member.modify.birthDayList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
										</select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>부서 전화번호</th>                
                                    <td colspan="3">
                                        <select name="mem_phone" id="mem_phone" class="_selectBox _fL wx80 mr05" ng-model="$root.member.modify.telNum1">
									 		<option ng-repeat="code in $root.member.modify.telFirstNumList" value="{{code.codeName}}">
			                                    {{code.codeName}}
			                                </option>
										</select>
										<input type="text" id="" placeholder="" class="wx100" ng-model="$root.member.modify.telNum2">
										<input type="text" id="" placeholder="" class="wx100" ng-model="$root.member.modify.telNum3">
                                    </td>
                                </tr>
                                <tr>
                                    <th>휴대폰 번호 <span class="mark">*</span></th>              
                                    <td colspan="3">
                                        <select name="mem_phone" id="mem_phone" class="_selectBox _fL wx80 mr05" ng-model="$root.member.modify.cellNum1">
											<option ng-repeat="code in $root.member.modify.cellFirstNumList" value="{{code.codeName}}">
			                                    {{code.codeName}}
			                                </option>
										</select>
										<input type="text" id="" placeholder="" class="wx100" ng-model="$root.member.modify.cellNum2">
										<input type="text" id="" placeholder="" class="wx100" ng-model="$root.member.modify.cellNum3">
                                    </td>
                                </tr>
                                <tr>
                                    <th>비밀번호변경<br>/알림용 이메일</th>
                                    <td colspan="3">
                                       	<label for="" class="hidden">이메일 아이디</label>
										<input kr-input type="text" id="" class="wx155" ng-model="$root.member.modify.emailAddr"
											ng-change="changeEmail($root.member.modify.emailAddr,$root.member.modify.emailDomain);">
										<span>@</span>
										<label for="" class="hidden">이메일 주소</label>
										<input kr-input type="text" id="" class="wx180" ng-model="$root.member.modify.emailDomain"
											ng-change="changeEmail($root.member.modify.emailAddr,$root.member.modify.emailDomain);">
										<select name="mem_phone" id="mem_phone" class="_selectBox _fL wx185 mr05"
											ng-model="$root.member.modify.emailDomain" ng-change="changeEmail($root.member.modify.emailAddr,$root.member.modify.emailDomain);">
											<option ng-repeat="code in $root.member.modify.emailDomainList" value="{{code.codeName}}">
			                                    {{code.codeName}}
			                                </option>
										</select>
										<span>
											<button type="button" class="btn btn-sm btn-gray" id="btnEmailAuth" ng-click="requestEmailCertificate()">인증요청</button>
										</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="_areaButton">
                            <div class="_center">
	                            <span class="_button _large blackBtn">
									<a  class="_blockUI wx135"  ng-click="modifyUser();">저장</a>
								</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- // tab1 -->
        <!-- tab2 -->
            <div id="tab2" class="tab-content">
                <h5 class="cont_Title">기본정보</h5>
                <div>aaaaaaa</div>
            </div>
        <!-- // tab2 -->
        <!-- tab3 -->
            <div id="tab3" class="tab-content">
                <h5 class="cont_Title">기본정보</h5>
                <div>bbbbbbbb</div>
            </div>
        <!-- // tab3 -->
        </div>
    </div>
</div>
<!-- // cont_right -->
