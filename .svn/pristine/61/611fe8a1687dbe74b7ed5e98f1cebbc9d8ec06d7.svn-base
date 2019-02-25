<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%
    long timestamp = System.currentTimeMillis();
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/ngDialog.min.css?t=<%=timestamp%>" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/ngDialog-theme-default.min.css?t=<%=timestamp%>" />
    <link href="${pageContext.request.contextPath}/css/bootstrap.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/common2.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/style.css" rel="stylesheet">
	
	<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="https://code.jquery.com/ui/1.11.0/jquery-ui.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap.js?t=<%=timestamp%>"></script>
    <title><spring:message code="site.title" /></title>
</head>
<body>
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
	
	<!-- container -->
	<div class="container">
		<section class="section-wrap">
			<h2 class="title"><spring:message code="regist.user.main.top.subject" /></h2>
			<ul class="location-nav">
				<li class="home">HOME</li>
				<li><spring:message code="regist.user.main.top.subject" /></li>
				<li class="this"><spring:message code="regist.user.main.select.user.type" /></li>
			</ul>

			<!-- 회원 유형 선택 -->
			<div class="content-wrap choice-wrap">
				<div class="inner">
					<h3 class="title-choice">회원 유형 선택</h3>
					<p class="tx">* 회원님의 권한에 따라 해당하는 가입 방법을 선택해주세요.</p>
					<section class="section-type">
						<div class="box box1">
							<h3 class="tit">대학 담당자</h3>
							<p class="txt">대학의 학생과 학점교류를 관리하는 담당자</p>
							<a href='<c:url value="/user/regist/univManagerAccount.do" />' class="btn btn-blue"><span>가입하기</span></a>
						</div>
						<div class="box box2">
							<h3 class="tit">평생학습 담당자</h3>
							<p class="txt" style="width: 225px;">평생학습의 시민과 컨텐츠를 관리하는 담당자</p>
							<a href='<c:url value="/user/regist/llLearnManagerAccount.do" />' class="btn btn-blue"><span>가입하기</span></a>
						</div>
					</section>
				</div>
			</div>
			<!-- //회원 유형 선택-->
		</section>
	</div>
	<!-- //container -->

	<!-- footer -->
	<footer class="footer">
		<p class="txt">
			<em>공유대학플랫폼</em>
			<span class="copyright">Copyright@ Seoul Forum of University Presidents. All Rights Reserved.</span>
		</p>
	</footer>
	<!-- footer -->
</body>
</html>
