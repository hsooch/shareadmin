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
	<title>�������� �÷��� ���� ����</title>
	<link href="${pageContext.request.contextPath}/css/bootstrap.css" rel="stylesheet">
    <link href="${pageContext.request.contextPath}/css/common2.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/style.css" rel="stylesheet">
</head> 
<body>
	<div class="wrap">
		<!-- header -->
		<header class="header">
			<h1 class="logo"><a href=""><i class="ic icon_logo"></i><span>�������� �÷��� �����ý���</span></a></h1>
		</header>
		<!-- //header -->
		<!-- container -->
		<div class="container">
			<section class="section-wrap">

				<!-- �̸��� ���� �ȳ� -->
				<div class="content-wrap finish-wrap">
					<div class="inner">
						<p class="tx">�̸��� ���� �ȳ�</p>
							<c:choose>
								<c:when test="${resultMap.resultCode eq 'MA01'}">
									<p class="tx-sm">�̸��� ������ ���������� ó���Ǿ����ϴ�.<br>ȸ�����Խ�û�� ��� �������ּ���.</p>
								</c:when>
								<c:when test="${resultMap.resultCode eq 'MA02'}">
									<p class="tx-sm">�̸��� ���� ��ȿ�Ⱓ�� �������ϴ�.<br/>������û�� �ٽ� �õ����ּ���.</p>
								</c:when>
								<c:when test="${resultMap.resultCode eq 'MA03'}">
									<p class="tx-sm">�̹� ������ �̸��� �����Դϴ�.</p>
								</c:when>
								<c:otherwise>
									<p class="tx-sm">�̸��� ������ ���� �߽��ϴ�.<br/>������(02-6490-6414)���� �������ּ���.</p>
								</c:otherwise>
							</c:choose>
						</p>
						<div class="btn-area">
							<a href="javascript:void(0);" class="btn btn-gray" onclick="javascript:window.close();"><span>�ݱ�</span></a>
						</div>
					</div>
				</div>
				<!-- //�̸��� ���� �ȳ� -->

			</section>
		</div>
		<!-- //container -->
      
		<!-- footer -->
		<footer class="footer">
			<p class="txt">
				<em>���������÷���</em>
				<span class="copyright">Copyright@ Seoul Forum of University Presidents. All Rights Reserved.</span>
			</p>
		</footer>
		<!-- footer -->
	</div>
</body>
</html>