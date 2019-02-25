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
	<title></title>
	<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
	<script type="text/javascript">
		$(document).ready(function () {
			<c:if test="${not empty returnMap.certType}">
			</c:if>
			<c:if test="${empty returnMap.certType}">
				$("#mobCertNo", opener.document).val('${returnMap.phoneNo}');
				$("#mobUserName", opener.document).val('${returnMap.userName}');
				$("#mobBirthDay", opener.document).val('${returnMap.birthDay}');
				$("#mobChkCert", opener.document).val('${returnMap.certResult }');
				$("#mobSexCode", opener.document).val("${returnMap.sexCode}");
				$("#ci", opener.document).val('${returnMap.ci}');
				$("#di", opener.document).val('${returnMap.di}');
				$("#ciUrl", opener.document).val('${returnMap.ciURL}');
				$("#diUrl", opener.document).val('${returnMap.diURL}');
				<c:if test="${returnMap.certResult eq 'Y'}">
				opener.completeCertificate();
				</c:if>
			</c:if>
			window.close();
		});
	</script>
</head> 
<body>	
	<%-- ${returnMap} --%>
</body>
</html>