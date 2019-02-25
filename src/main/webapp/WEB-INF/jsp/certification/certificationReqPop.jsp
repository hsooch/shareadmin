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
	<title>Insert title here</title>
	<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
	<script type="text/javascript">
		var Bmenu = '';
		var Smenu = '';
		$(document).ready(function () {			
		    $("#certForm").submit();		     
		});		
	</script> 
</head> 
<body>

<form id="certForm" name="certForm" method="post" accept-charset="euc-kr" onsubmit="document.charset='euc-kr'" action="https://cert.kcp.co.kr/kcp_cert/cert_view.jsp">		<!-- kcp 보안업데이트로 변경 20170821, by zkm, 기존주소 https://cert.kcp.co.kr/Ver2/kcp_cert/cert_intro.jsp -->
	<input type="hidden" name="site_cd" value="${paramMap.siteCd }" />
	<input type="hidden" name="req_tx" value="${paramMap.reqTx }" />
	<input type="hidden" name="ordr_idxx" value="${paramMap.ordrIdxx }" />
	<input type="hidden" name="user_name" value="${paramMap.popPtcNm }" />
	<input type="hidden" name="year" value="${paramMap.popBrthYear }" />
	<input type="hidden" name="month" value="${paramMap.popBrthMonth }" />
	<input type="hidden" name="day" value="${paramMap.popBrthDate }" />
	<input type="hidden" name="sex_code" value="${paramMap.popPtcSexDstn }" />
	<input type="hidden" name="local_code" value="${paramMap.popPtcLocalCd }" />
	<input type="hidden" name="web_siteid_hashYN" value="${paramMap.webSiteIdHashYN }" />
	<input type="hidden" name="web_siteid" value="${paramMap.webSiteId }" />
	<input type="hidden" name="cert_able_yn" value="${paramMap.certAbleYn }" />
	<input type="hidden" name="up_hash" value="${paramMap.upHash }"/>	
	<input type="hidden" name="Ret_URL" value="${paramMap.retURL}" />
	<input type="hidden" name="cert_enc_use" value="Y" />	
	<c:if test="${not empty paramMap.certType }">
		<input type="hidden" name="param_opt_1" value="${paramMap.certType }" />
	</c:if>	
</form>
</body>
</html>