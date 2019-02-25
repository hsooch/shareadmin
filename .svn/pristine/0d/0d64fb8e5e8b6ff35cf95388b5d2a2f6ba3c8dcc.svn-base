<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    long timestamp = System.currentTimeMillis();
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=10">
    <title><spring:message code="site.title" /></title>

	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/ngDialog.min.css?t=<%=timestamp%>" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/ngDialog-theme-default.min.css?t=<%=timestamp%>" />
    <link href="${pageContext.request.contextPath}/css/bootstrap.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/common2.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/style.css" rel="stylesheet">
	
	<!-- KSign Style Sheet -->
    <link href="${pageContext.request.contextPath}/kcase/lib/css/kcase.css" rel="stylesheet"/>


	<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="https://code.jquery.com/ui/1.11.0/jquery-ui.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ui.js?t=<%=timestamp%>"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/angular.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/angular-route.min.js"></script>
	<script type="text/javascript" src="https://code.angularjs.org/1.5.9/angular-cookies.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ngDialog.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/angular-file-upload.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/service/app.js?t=<%=timestamp%>"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/service/appFilter.js?t=<%=timestamp%>"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/service/commonService.js?t=<%=timestamp%>"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common-config.js?t=<%=timestamp%>"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/commons-func.js?t=<%=timestamp%>"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap.js?t=<%=timestamp%>"></script>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/kcase/lib/js/kcase_os_check.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/kcase/EPKICommon.js?t=<%=timestamp%>"></script>

    <!-- Controller js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/registUniversityManagerCtrl.js"></script>
    
    <!-- Service js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/userService.js"></script>

    <style>
        .pop-loading{position:fixed; top:0; left:0;width:100%;height:100%;background:rgba(255,255,255,0.8);z-index:99999;text-align:center;display: none;}
        .pop-loading div{position:absolute; top:50%; left:50%;margin-top:-70px;margin-left:-70px;}
        .container{height:auto !important;}
    </style>
    
	<script type="text/javascript">
		var userType = "${userType}";
		var emailAuthChecker = null;
		function completeCertificate(){
			moveNextStep();
		}
		function moveNextStep(){
			angular.element(document.querySelector('[ng-controller="registUniversityManagerCtrl"]')).scope().$apply("moveNextStep()");
		}
		function createCheckTimer(){
			emailAuthChecker = setInterval(function(){
				angular.element(document.querySelector('[ng-controller="registUniversityManagerCtrl"]')).scope().$apply("checkEmailAuth()");
			}, 3000);
		}
		$(document).on("keydown", "[numberOnly]",function(event){
			numberOnly(event);
		});
	</script>
</head>
<body ng-app="appModule" ng-controller="registUniversityManagerCtrl">
	<div id="loadingLayer" class="pop-loading">
	    <div>
	        <h1>Loading...</h1>
	    </div>
	</div>
	<div class="wrap">
		<!-- header -->
		<header class="header">
			<h1 class="logo">
				<a href="javascript:void(0);" style="cursor: default;" >
					<i class="ic icon_logo"></i>
					<span>공유대학 플랫폼 관리시스템</span>
				</a>
			</h1>
		</header>
		<!-- /header -->
		
		<!-- step 1 container -->
		<div class="container">
			<section class="section-wrap">
				<h2 class="title"><spring:message code="regist.user.main.top.subject" /></h2>
				<ul class="location-nav">
					<li class="home">HOME</li>
					<li><spring:message code="regist.user.main.top.subject" /></li>
					<li class="this" ng-show="nowStep === 1">약관동의</li>
					<li class="this ng-hide" ng-show="nowStep === 2">본인인증</li>
					<li class="this ng-hide" ng-show="nowStep === 3">정보입력</li>
					<li class="this ng-hide" ng-show="nowStep === 4">가입신청완료</li>
				</ul>
				
				<!-- step  -->
				<ul class="step-list">
					<li ng-class="{on:nowStep > 0}">
						<div class="inner">
							<span class="img">
								<img ng-src="{{ Const.contextPath +'images/step01_'+ (nowStep > 0 ? 'on' : 'off') + '.jpg'}}" alt="">
							</span>
							<p class="txt">
								<span class="tx-step">STEP.1</span>
								<span>약관동의</span>
							</p>
						</div>
					</li>
					<li ng-class="{on:nowStep > 1}">
						<div class="inner">
							<span class="img">
								<img ng-src="{{ Const.contextPath +'images/step02_'+ (nowStep > 1 ? 'on' : 'off') + '.jpg'}}" alt="">
							</span>
							<p class="txt">
								<span class="tx-step">STEP.2</span>
								<span>본인인증</span>
							</p>
						</div>
					</li>
					<li ng-class="{on:nowStep > 2}">
						<div class="inner">
							<span class="img">
								<img ng-src="{{ Const.contextPath +'images/step03_'+ (nowStep > 2 ? 'on' : 'off') + '.jpg'}}" alt="">
							</span>
							<p class="txt">
								<span class="tx-step">STEP.3</span>
								<span>정보입력</span>
							</p>
						</div>
					</li>
					<li ng-class="{on:nowStep > 3}">
						<div class="inner">
							<span class="img">
								<img ng-src="{{ Const.contextPath +'images/step04_'+ (nowStep > 3 ? 'on' : 'off') + '.jpg'}}" alt="">
							</span>
							<p class="txt">
								<span class="tx-step">STEP.4</span>
								<span>가입신청완료</span>
							</p>
						</div>
					</li>
				</ul>
				<!-- //step  -->
				
				<!-- 약관동의 -->
				<div class="content-wrap terms-wrap ng-hide" ng-show="nowStep === 1">
					<div ng-repeat="obj in termsList | orderBy:termsSeq:false">
						<h3 class="title-terms">{{obj.termsTitle}}{{setRequiredYnTxt(obj.requiredYn)}}</h3>
						<div class="terms-box" ng-bind-html="bindHtml(obj.termsContent)"></div>
						<div class="agree-check">
							<label for="agree{{$index}}"><input type="checkbox" id="agree{{$index}}" ng-model="obj.isChecked" ng-click="checkAgree()">&nbsp;{{obj.termsTitle}}에 동의합니다.</label>
						</div>
					</div>
					<div class="agree-check">
						<label for="agreeAll"><input type="checkbox" id="agreeAll" ng-model="isCheckedAll" ng-click="agreeAllTerms()">&nbsp;전체 동의</label>
					</div>
					<div class="btn-area">
						<a href="javascript:void(0);" class="btn btn-blue btn-sm btn-radius" ng-click="agreeTerms()"><span>동의</span></a>
	           			<a href="${pageContext.request.contextPath}/login/login.do" class="btn btn-gray btn-sm btn-radius"><span>비동의</span></a>
	           		</div>
	        	</div>
	       		<!-- //약관동의 -->
			
				<!-- /step 1 container -->
				
				<!-- step 2 container-->
				<!-- EPKI -->
				<div class="content-wrap confirm-wrap ng-hide" ng-show="nowStep === 2 && userType ==='univ'">
					<div class="inner">
						<h3 class="title-sub-confirm">본인인증</h3>
						<p class="sub-txt">
							관리자 사이트 이용을 위해서는 EPKI(교육부 전자서명 인증)<br />
							확인을 통한 회원가입이 필요합니다.<br /><br />
							EPKI가 없으신 경우 교육부 전자서명 인증 센터에서 발급 받으시기 바랍니다.
						</p>
						<div class="confirm-box">
							<div class="inner">
								<strong class="tit">EPKI 인증</strong>
								<input type="button" class="btn btn-confirm" ng-click="requestSessionEpki()" value="인증하기">
							</div>
						</div>
						<p class="tx-confirm-mini">* EPKI 인증서가 없거나 재발급이 필요한 경우 교육부 전자서명인증센터에서 발급 받으시기 바랍니다.</p>
						<div class="btn-area">
							<a href="#" class="btn btn-gray" ng-click="issueCertificate()"><span>발급/재발급</span></a>
							<a href="#" class="btn btn-gray" ng-click="renewalCertificate()"><span>인증서 갱신</span></a>
						</div>
						<div class="btn-area mt20">
							<a href="#" class="btn btn-gray btn-lg" ng-click="cancelRegist()"><span>취소</span></a>
						</div>
					</div>
				</div>
				<!-- /EPKI -->
					
				<!-- 휴대폰 본인 인증 -->
				<div class="content-wrap idpw-wrap ng-hide" ng-show="nowStep === 2 && userType === 'llLearn'">
					<div class="inner">
						<p class="tx-idpw">* 관리자 사이트 이용을 위해서는 휴대폰번호 확인을 통한 회원가입이 필요합니다.</p>
						<section class="section-confirm">
							<div class="box box1 center">
								<h3 class="title-confirm">휴대폰 인증</h3>
								<button type="button" class="btn btn-blue btn-" ng-click="cellPhoneCertificate()">인증하기</button>
							</div>
						</section>
					</div>
					
					<div class="btn-area">
						<a href="#" class="btn btn-gray btn-lg" ng-click="cancelRegist()"><span>취소</span></a>
					</div>
				</div>
				<!-- /휴대폰 본인 인증-->
				<!-- /step 2 container-->
				
				<!-- step 3 container-->
				<div class="content-wrap ng-hide" ng-show="nowStep === 3">
				    <div class="inner">
				    	<h3 class="title-sub-info">소속정보</h3>
						<table class="tb" >
                			<colgroup>
                  				<col style="width:140px;">
                  				<col style="width:auto">
                			</colgroup>
                			<tbody>
                  				<tr>
                    				<th>성명</th>
                    				<td>
                    					{{userName}}
                    					<input type="hidden" ng-model="userName" id="userName"/>
                   					</td>
                  				</tr>
                  				<tr>
                    				<th>소속 대학교<span class="tx-essential">*</span></th>
                    				<td>
                      					<div class="row">
                        					<div class="col-xs-4">
                        						<select class="form-control" ng-model="parentUnivCode" ng-change="getChildCdList('parentUnivCode', 'univCode')">
	    											<option ng-repeat="code in parentUnivCodeList | orderBy:codeIndex:false" value="{{code.code}}">{{code.codeName}}</option>
	    										</select>
    										</div>
											<div class="col-xs-4">					
	    										<select class="form-control" ng-model="univCode">
	    											<option ng-repeat="code in univCodeList | orderBy:codeIndex:false" value="{{code.code}}">{{code.codeName}}</option>
	    										</select>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<th>학과명(부서명)<span class="tx-essential" ng-show="userType === 'univ'">*</span></th>
									<td><input kr-input type="text" class="form-control" ng-model="department" maxlength="30" style="width:302px" placeholder="학과명(부서명) 입력"></td>
                  				</tr>
                			</tbody>
              			</table>
						<h3 class="title-sub-info">기본정보</h3>
						<table class="tb">
							<colgroup>
								<col style="width:140px;">
								<col style="width:auto">
							</colgroup>
							<tbody>
								<tr>
									<th>아이디<span class="tx-essential">*</span></th>
									<td>
										<div class="row">
											<div class="col-xs-3">
												<input kr-input type="text" class="form-control" ng-model="email1" ng-change="resetUserIdAuth()">
											</div>
											<span class="tx">@</span>
											<div class="col-xs-3">
												<input kr-input type="text" class="form-control" ng-model="email2" ng-change="resetUserIdAuth()">
											</div>
											<div class="col-xs-3">
												<select class="form-control" ng-model="emailSel" ng-change="changeEmailDomain('email2', 'emailSel')"/>
							    					<option ng-repeat="code in emailDomainList | orderBy:codeIndex:false" value="{{code.code}}">{{code.codeName}}</option>
							    				</select>
											</div>
											<div class="col-xs-2">
												<button type="button" class="btn btn-sm btn-gray" id="btnCheckUserId" ng-click="checkDuplicationUserId()">중복확인</button>
											</div>
										</div>
										<p class="tx-info"><span></span></p>
									</td>
								</tr>
								<tr>
									<th>비밀번호<span class="tx-essential">*</span></th>
									<td>
										<input kr-input type="password" class="form-control" ng-model="userPwd" maxlength="15" style="width:302px" >
										<p class="tx-info">* 영문, 숫자, 특수문자 포함(10~15자)</p>
									</td>
								</tr>
								<tr>
									<th>비밀번호 확인<span class="tx-essential">*</span></th>
									<td>
										<input kr-input type="password" class="form-control" ng-model="confirmUserPwd" maxlength="15" style="width:302px" >
										<p class="tx-info">* 비밀번호를 재입력 하세요.</p>
									</td>
								</tr>
								<tr ng-show="userType === 'univ'">
									<th>생년월일</th>
									<td>
										<div class="row">
											<div class="col-xs-3">
												<select class="form-control" ng-model="birthYear" ng-change="changeDate()">
													<option ng-repeat="code in birthYearList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
												</select>
											</div>
											<div class="col-xs-3">
												<select class="form-control" ng-model="birthMonth" ng-change="changeDate()">
													<option ng-repeat="code in birthMonthList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
												</select>
											</div>
											<div class="col-xs-3">
												<select class="form-control" ng-model="birthDay">
													<option ng-repeat="code in birthDayList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
												</select>
											</div>
										</div>
									</td>
								</tr>
								<tr ng-show="userType === 'univ'">
									<th>성별</th>
									<td>
										<div class="row">
											<div class="col-xs-3">
												<select class="form-control" ng-model="mfType">
													<option value="01">남성</option>
													<option value="02">여성</option>
												</select>
											</div>
										</div>
									</td>
								</tr>
								<tr ng-show="userType === 'llLearn'">
				    				<th>생년월일</th>
				    				<td><span>{{birthYear}}년 {{birthMonth}}월 {{birthDay}}일</span></td>
				    			</tr>
								<tr>
									<th>부서 전화번호</th>
									<td>
										<div class="row">
											<div class="col-xs-3">
												<select class="form-control" ng-model="telNo1">
						    						<option ng-repeat="code in telNoList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
						    					</select>
											</div>
											<div class="col-xs-3">
												<input type="text" class="form-control" ng-model="telNo2" maxlength="4" numberOnly>
											</div>
											<div class="col-xs-3">
												<input type="text" class="form-control" ng-model="telNo3" maxlength="4" numberOnly>
											</div>
										</div>
									</td>
								</tr>
								<tr ng-show="userType === 'univ'">
									<th>휴대폰번호<span class="tx-essential">*</span></th>
									<td>
										<div class="row">
											<div class="col-xs-3">
												<select class="form-control" ng-model="cellNo1">
						    						<option ng-repeat="code in cellNoList | orderBy:code:false" value="{{code.code}}">{{code.codeName}}</option>
						    					</select>
											</div>
											<div class="col-xs-3">
												<input type="text" class="form-control" ng-model="cellNo2" maxlength="4" numberOnly>
											</div>
											<div class="col-xs-3">
												<input type="text" class="form-control" ng-model="cellNo3" maxlength="4" numberOnly>
											</div>
										</div>
									</td>
								</tr>
								<tr ng-show="userType === 'llLearn'">
				    				<th>휴대폰번호</th>
				    				<td>
				    					{{cellNo1}}-{{cellNo2}}-{{cellNo3}}
				    				</td>
				    			</tr>
								<tr>
									<th>비밀번호변경/알림용 이메일<span class="tx-essential">*</span></th>
									<td>
										<div class="row">
											<div class="col-xs-3">
												<input kr-input type="text" class="form-control" ng-model="subEmail1" ng-change="resetEmailAuth()">
											</div>
											<span class="tx">@</span>
											<div class="col-xs-3">
												<input kr-input type="text" class="form-control" ng-model="subEmail2" ng-change="resetEmailAuth()">
											</div>
											<div class="col-xs-3">
												<select class="form-control" ng-model="subEmailSel" ng-change="changeEmailDomain('subEmail2', 'subEmailSel')"/>
							    					<option ng-repeat="code in emailDomainList | orderBy:codeIndex:false" value="{{code.code}}">{{code.codeName}}</option>
							    				</select>
											</div>
											<div class="col-xs-2">
												<button type="button" class="btn btn-sm btn-gray" id="btnEmailAuth" ng-click="requestEmailCertificate()">인증요청</button>
											</div>
										</div>
										<p class="tx-info"><span>*</span>알림용 이메일을 입력 후 인증요청 버튼을 눌러주세요.</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-area">
						<a href="javascript:void(0);" class="btn btn-blue btn-sm btn-fluid" ng-click="requestAccount()"><span>회원가입 신청</span></a>
						<a href="javascript:void(0);" class="btn btn-gray btn-sm" ng-click="cancelRegist()"><span>취소</span></a>
					</div>
				</div>
				<!-- /step 3 container-->
				
				<!-- container 4-->
				<!-- 가입신청완료 -->
				<div class="content-wrap finish-wrap ng-hide" ng-show="nowStep === 4">
					<div class="inner">
						<p class="tx">회원가입 신청이 완료 되었습니다.</p>
						<p class="tx-sm">회원가입은 통합관리자의 승인이 필요하며, 승인이 완료되면<br />등록된 <span>이메일</span>과 <span>SMS</span>로 알려 드립니다.</p>
						<div class="btn-area">
							<a href="javascript:void(0);" class="btn btn-blue" ng-click="cancelRegist()"><span>로그인화면 바로가기</span></a>
						</div>
					</div>
				</div>
				<!-- //가입신청완료 -->
				<!-- /container 4-->
		
			</section>
		</div>
		<!-- footer -->
		<footer class="footer">
			<p class="txt">
				<em>공유대학플랫폼</em>
				<span class="copyright">Copyright@ Seoul Forum of University Presidents. All Rights Reserved.</span>
			</p>
		</footer>
		<!-- /footer -->
	</div>
	
	<%-- 인증 관련 Form페이지 --%>
	<jsp:include page="../certification/certificationForm.jsp" flush="true" />
</body>
</html>
