<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<% pageContext.setAttribute("lineEnter", "\n"); %>
	<script type="text/javascript">
		function cellPhoneCertificate(){
			$("input[name=certClass]").remove();
			$("<input></input>").attr({type:"hidden", name:"certClass", value:"mob"}).appendTo($("#mobForm"));
			/* $("#popPtcNm").val($("#mobNm").val());
			$("#popBrthYear").val($("#brthYear").val());
			$("#popBrthMonth").val($("#brthMonth").val());
			$("#popBrthDate").val($("#brthDate").val()); */
			if( ( navigator.userAgent.indexOf("Android") > - 1 || navigator.userAgent.indexOf("iPhone") > - 1 ) == false ) // 스마트폰이 아닌경우
            {
                var return_gubun;
                var width  = 410;
                var height = 500;

                var leftpos = screen.width  / 2 - ( width  / 2 );
                var toppos  = screen.height / 2 - ( height / 2 );

                var winopts  = "width=" + width   + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
                var position = ",left=" + leftpos + ", top="    + toppos;
                var AUTH_POP = window.open('','auth_popup', winopts + position);
            }
			$("#certForm").attr("target", "auth_popup"); //kcpCert
	        $("#certForm").submit();
		}
		
		function emailCertificate(){
			var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
			
			if($("#emailNm").val() == "") {
				alert('<fmt:message key="valid.account.name" />');
				$("#emailNm").focus();
				return;
			}
												
			if($("#email").val() == "") {
				alert('<fmt:message key="valid.account.email" />');
				$("#email").focus();
				return;	
			}
			
			if(!regExp.test($("#email").val())) {
				alert('<fmt:message key="valid.mbr.email" />');
				$("#email").focus();
				return;
			}
			$("input[name=certClass]").remove();
			$("<input></input>").attr({type:"hidden", name:"certClass", value:"email"}).appendTo($("#emailForm")); 
			$.ajax({ 
				url : "${pageContext.request.contextPath}/member/chkMbrInfo.do",
				type : "POST",
				data : $("#emailForm").serialize(),					
				dataType : "json",							    
				success : function(data) {
					if(data.code == "success") {
						sendEmail();
					} else {						
						alert(data.msg);
						return;
					}
				},
			    error : function(xhr,status, error){
			    	alert("통신중 장애 발생");
			    }
			});	
		}
		
		function sendEmail() {
			$.ajax({ 
				url : "${pageContext.request.contextPath}/member/sendEmailMbrInfo.do",
				type : "POST",
				data : $("#emailForm").serialize(),					
				dataType : "json",							    
				success : function(data) {
					if(data.code == "success") {
						$("#emailCertId").val(data.data);
						alert(data.msg);
						return;
					} else if(data.code == "fail") {
						alert(data.msg);
						return;
					}
				},
			    error : function(xhr,status, error){
			    	alert("통신중 장애 발생");
			    }
			});
		}
	
   </script>
<form id="certForm" name="certForm" method="post" action="${pageContext.request.contextPath}/cert/kcpCertificationReq.do">
	<input type="hidden" id="popPtcNm" name="popPtcNm" /> 
	<input type="hidden" id="popPtcLocalCd" name="popPtcLocalCd" />
	<input type="hidden" id="popPtcSexDstn" name="popPtcSexDstn" />
	<input type="hidden" id="popBrthYear" name="popBrthYear" />
	<input type="hidden" id="popBrthMonth" name="popBrthMonth" />
	<input type="hidden" id="popBrthDate" name="popBrthDate" />
	<input type="hidden" id="reqTx" name="reqTx" value="cert"/> 
</form>
<form id="mobForm" name="mobForm">
	<input type="hidden" id="mobCertNo" name="mobCertNo"/>
	<input type="hidden" id="mobUserName" name="mobUserName"/>
	<input type="hidden" id="mobBirthDay" name="mobBirthDay"/>
	<input type="hidden" id="mobChkCert" name="mobChkCert" value="N"/>
	<input type="hidden" id="mobSexCode" name="mobSexCode"/>
	<input type="hidden" id="ci" name="ci" />
	<input type="hidden" id="di" name="di" />
	<input type="hidden" id="ciUrl" name="ciUrl" />
	<input type="hidden" id="diUrl" name="diUrl" />
</form>
<form id="emailForm" name="emailForm">										
	<input type="hidden" id="mailType" name="mailType" value="02" />				
	<input type="hidden" id="emailCertId" name="emailCertId" />
	<input type="hidden" id="email" name="email" />
</form>
<%
	final String spId = StringUtils.defaultIfEmpty(request.getParameter("spId"), "admin");
	final String relayState = StringUtils.defaultIfEmpty(
	        request.getParameter("RelayState"), request.getContextPath() + "/main.do");
%>
<form id="assertLoginFrm" method="POST" action="${pageContext.request.contextPath}/exsignon/sso/sso_assert.jsp">
	<input type="hidden" name="nameId" />
	<input type="hidden" name="targetId" value="<%=spId%>" />
	<input type="hidden" name="RelayState" value="<%=relayState%>">
</form>
