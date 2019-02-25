<%@ page language="java" contentType="text/html; charset=euc-kr" pageEncoding="euc-kr"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<% pageContext.setAttribute("lineEnter", "\n"); %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="euc-kr">
	<title>공유대학 플랫폼 메일 인증</title>
	<link href="${pageContext.request.contextPath}/css/bootstrap.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/common2.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/style.css" rel="stylesheet">
</head> 
<body>
	<div class="wrap">
		<!-- header -->
		<header class="header">
			<h1 class="logo"><a href=""><i class="ic icon_logo"></i><span>공유대학 플랫폼 관리시스템</span></a></h1>
		</header>
		<!-- //header -->
		<!-- container -->
		<div class="container">
			<section class="section-wrap">

				<!-- 이메일 인증 안내 -->
				<div class="content-wrap finish-wrap">
					<div class="inner">
						<p class="tx">이메일 인증 안내</p>
							<c:choose>
								<c:when test="${resultMap.resultCode eq 'MA01'}">
									<p class="tx-sm">이메일 인증이 정상적으로 처리되었습니다.<br>회원가입신청을 계속 진행해주세요.</p>
								</c:when>
								<c:when test="${resultMap.resultCode eq 'MA02'}">
									<p class="tx-sm">이메일 인증 유효기간이 지났습니다.<br/>인증요청을 다시 시도해주세요.</p>
								</c:when>
								<c:when test="${resultMap.resultCode eq 'MA03'}">
									<p class="tx-sm">이미 인증된 이메일 인증입니다.</p>
								</c:when>
								<c:otherwise>
									<p class="tx-sm">이메일 인증에 실패 했습니다.<br/>관리자(02-6490-6414)에게 문의해주세요.</p>
								</c:otherwise>
							</c:choose>
						</p>
						<div class="btn-area">
							<a href="javascript:void(0);" class="btn btn-gray" onclick="javascript:window.close();"><span>닫기</span></a>
						</div>
					</div>
				</div>
				<!-- //이메일 인증 안내 -->

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
	</div>
</body>
</html>