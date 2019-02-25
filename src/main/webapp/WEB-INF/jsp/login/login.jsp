<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    long timestamp = System.currentTimeMillis();
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/loginCtrl.js"></script>
    
    <!-- Service js -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/loginService.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/userService.js"></script>

	<script type="text/javascript">
		//var sessionId = '';
    	//var serverCert = '';
    
		$(document).ready(function(){
			$("[ng-model='userId']").focus();

			//sessionId = '${sessionID}';
			//serverCert = '${strServerCert}';
			//epki.init(sessionId);

		});
		$(document).on("keyup", "[ng-model='userId'], [ng-model='userPwd']", function(event) {
			if(event.keyCode == 13) {
				angular.element(document.querySelector('[ng-controller="loginCtrl"]')).scope().$apply("loginIdPwd()");
			}
	    });
		
		function completeCertificate(){
			angular.element(document.querySelector('[ng-controller="loginCtrl"]')).scope().$apply("branchPurPoseToCert()");
		}
	</script>
    <style>
        .pop-loading{position:fixed; top:0; left:0;width:100%;height:100%;background:rgba(255,255,255,0.8);z-index:99999;text-align:center;display: none;}
        .pop-loading div{position:absolute; top:50%; left:50%;margin-top:-70px;margin-left:-70px;}
        .container{height:auto !important;}
    </style>
</head>
<body class="intro" ng-app="appModule" ng-controller="loginCtrl">
	<div id="loadingLayer" class="pop-loading">
	    <div>
	        <h1>Loading...</h1>
	    </div>
	</div>
	<div class="wrap">
		<!-- container -->
		<div class="container">
			<div class="content">
				<section class="section-intro">
					<section class="box login-epki">
						<h2 class="title-login">EPKI 인증서 로그인</h2>
						<a href="javascript:void(0);" ng-click="requestSessionEpki('loginEpki')" class="btn btn-blue btn-epki-login">
							<span>로그인</span>
						</a>
						<dl class="radio-list">
							<dt>EPKI 인증서 자동팝업</dt>
							<dd><input type="radio" ng-model="epkiAutoPopUseYn" ng-click="setEpkiAutoPopUseCookie('Y');" value="Y" id="epkiAutoPopUseYn1"/><label for="epkiAutoPopUseYn1">사용</label></dd>
							<dd><input type="radio" ng-model="epkiAutoPopUseYn" ng-click="setEpkiAutoPopUseCookie('N');" value="N" id="epkiAutoPopUseYn2"/><label for="epkiAutoPopUseYn2">사용 안함</label></dd>
						</dl>
						<ul class="btn-list">
							<li><a href="https://www.epki.go.kr/sub/info.do?m=020301&s=epki"  class="btn btn-gray"><span>발급/재발급</span></a></li>
							<li><a href="https://www.epki.go.kr/sub/info.do?m=020401&s=epki"  class="btn btn-gray"><span>인증서 갱신</span></a></li>
						</ul>
					</section>
					<section class="box login-id">
						<h2 class="title-login">아이디 로그인</h2>
						<div class="inner">
							<form>
								<div class="form-group">
									<label for="exampleInputID" class="hide">이메일 주소</label>
									<input id="exampleInputID" type="text" class="form-control" ng-model="userId" maxlength="40" placeholder="아이디(이메일)를 입력하세요."/>
								</div>
								<div class="form-group">
									<label for="exampleInputPassword" class="hide">암호</label>
									<input id="exampleInputPassword" type="password" class="form-control" ng-model="userPwd" maxlength="30" placeholder="비밀번호를 입력하세요."/>
								</div>
								<div class="checkbox">
									<label>
										<input type="checkbox" ng-model="saveUserId" id="saveUserId"/>아이디 저장
									</label>
								</div>
								<button type="submit" class="btn btn-black btn-login" ng-click="loginIdPwd()">로그인</button>
							</form>
							<ul class="btn-list">
								<li><a href="javascript:void(0);" class="btn btn-gray" ng-click="registAccount()"><span>회원가입</span></a></li>
								<li><a href="javascript:void(0);" class="btn btn-gray" ng-click="findIdPwd()"><span>아이디/비밀번호찾기</span></a></li>
							</ul>
						</div>
					</section>
					<p class="txt">문의사항이 있으신 경우 <span> 02-6490-6414</span>으로 연락 주시기 바랍니다.</p>
				</section>
			</div>
		</div>
		<!-- //container -->
	</div>
	<%-- 인증 관련 Form페이지 --%>
	<jsp:include page="../certification/certificationForm.jsp" flush="true" />
</body>
</html>
