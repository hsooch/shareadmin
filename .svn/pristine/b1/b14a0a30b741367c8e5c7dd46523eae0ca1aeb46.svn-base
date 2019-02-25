<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<% pageContext.setAttribute("lineEnter", "\n"); %>
<!DOCTYPE html>
<html lang="ko">

<head>	
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common-config.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-ui-1.11.0.js"></script>
    <script type="text/javascript">
    	var Bmenu = '';
		var Smenu = '';
		var nowDate = new Date();
    	var curYear = nowDate.getFullYear();
		$(document).ready( function() {
			//new SelectBoxUtil($("#ptcSexDstn")).setSelectBox('${SEX_TYPE}', {"initMsg":"선택", "selectedCode" : ""});
			//new SelectBoxUtil($("#cell1No")).setSelectBox('${MOBILE_TYPE}', {"initMsg":"선택", "selectedCode" : ""});
			$("#srchMob").trigger("click");
			
			ptcDivVisiblity("none");
		    for(var i = curYear; i >= curYear - 100; i--) {
		 	   	$("#brthYear").append("<option value='"+i+"'>"+i+"</option>");
		 	   	$("#ptcBrthYear").append("<option value='"+i+"'>"+i+"</option>");
		    }
		    
		    for(var i = 1; i < 13; i++) {
		   		$("#brthMonth").append("<option value='"+leadingZeros(i,2)+"'>"+leadingZeros(i,2)+"</option>");
		    	$("#ptcBrthMonth").append("<option value='"+leadingZeros(i,2)+"'>"+leadingZeros(i,2)+"</option>");
		    }
		}); 
		
		$(document).on("change", "#brthYear,#brthMonth,#ptcBrthYear,#ptcBrthMonth", function(event) {				
			if($(this).attr("id").indexOf("ptc") > -1) {
				changeDate($("#ptcBrthYear").val(), $("#ptcBrthMonth").val(), "ptcBrthDate", $("#ptcBrthDate").val());
			} else {
		    	changeDate($("#brthYear").val(), $("#brthMonth").val(), "brthDate", $("#brthDate").val());
			}
	    }); 
		
		function changeDate(year, month, id, curDate) {
		    $("#"+id+" > option").remove();
		    $("#"+id).append("<option>선택</option>");
		    for(var i = 1; i < lastDay(year, month) + 1; i++) {
		 	    $("#"+id).append("<option value='"+leadingZeros(i,2)+"'>"+leadingZeros(i,2)+"</option>");  
		    } 
		    if(curDate <= lastDay(year, month)) {
		    	$("#"+id).val(curDate);	
		    }					    
	    } 
		
		function lastDay(year, month) {
			return new Date(year, month, 0).getDate();
	   	}
		
		function leadingZeros(n, digits) {
	   		var zero = '';
	   		n = n.toString();
	   		
	   		if(n.length < digits) {
	   			for(var i = 0; i < digits - n.length; i++)
	   				zero += '0';
	   		}
	   		return zero + n;
	   	}
		
		$(document).on("click", "#srchMob, #srchEmail", function(event) {
			if($(this).attr("id") == "srchMob") {
				$("#srchEmail").parent("h3").removeClass("on");
				$("#emailDiv").css("display","none");
				$("#mobDiv").css("display","block");
			} else {
				$("#srchMob").parent("h3").removeClass("on");
				$("#mobDiv").css("display","none");
				$("#emailDiv").css("display","block");
			}
			
			$(this).parent("h3").addClass("on");						
		});
		
		/* 
		$(document).on("keydown", "#emailNm, #email", function(event) {
			$("#emailCertId").val("");
		});
		 */
		 
		$(document).on("keyup", "#cell1No, #cell2No, #cell3No", function(event) {
			$(this).val($(this).val().replace(/[^0-9]/g,""));
		});
		
		$(document).on("click", "#mobNext", function(event) {
			if($("#mobNm").val() == "") {
				//alert('<fmt:message key="valid.account.name" />');
				$("#mobNm").focus();
				return;
			}
			
			if($("#brthYear option:selected").index() == 0) {
				//alert('<fmt:message key="valid.account.birthDay" />');
				$("#brthYear").focus();
				return true;
			}			
			if($("#brthMonth option:selected").index() == 0) {
				//alert('<fmt:message key="valid.account.birthDay" />');
				$("#brthMonth").focus();
				return true;
			}			
			if($("#brthDate option:selected").index() == 0) {
				//alert('<fmt:message key="valid.account.birthDay" />');
				$("#brthDate").focus();
				return true;
			}
			
			if(calcAge($("#brthYear").val() + "" + $("#brthMonth").val() + "" + $("#brthDate").val()) < 14) {
				if($("#ptcNm").val() == "" ) {
					//alert('<fmt:message key="valid.account.ptcNm" />');
					$("#ptcNm").focus();
					return;
				}		
				
				if($("#ptcBrthYear option:selected").index() == 0) {
					//alert('<fmt:message key="valid.account.ptcBirthDay" />');
					$("#ptcBrthYear").focus();
					return;
				} 
				if($("#ptcBrthMonth option:selected").index() == 0) {
					//alert('<fmt:message key="valid.account.ptcBirthDay" />');
					$("#ptcBrthMonth").focus();
					return;
				}
				if($("#ptcBrthDate option:selected").index() == 0) {
					//alert('<fmt:message key="valid.account.ptcBirthDay" />');
					$("#ptcBrthDate").focus();
					return;
				}
				
				if($("#ptcSexDstn option:selected").index() == 0) {
					//alert('<fmt:message key="valid.account.gndr" />');
					$("#ptcSexDstn").focus();
					return;  
				}
				
				if($("#ptcChkCert").val() == "N") {
					//alert('<fmt:message key="valid.account.ptcChkCert" />');
					return;
				}
			} else {
				if($("#cell1No option:selected").index() == 0) {
					//alert('<fmt:message key="valid.account.phone1" />');
					$("#cell1No").focus();
					return;
				}
				
				if($("#cell2No").val() == "" ) {
					//alert('<fmt:message key="valid.account.phone2" />');
					$("#cell2No").focus();
					return;
				}
				
				if($("#cell3No").val() == "" ) {
					//alert('<fmt:message key="valid.account.phone3" />');
					$("#cell3No").focus();
					return;
				}
				
				var mobVal = $("#cell1No option:selected").val()+""+$("#cell2No").val()+""+$("#cell3No").val();
				
				if($("#mobChkCert").val() == "N" || $("#mobCertNo").val() != mobVal) {
					//alert('<fmt:message key="valid.account.mobChkCert" />');
					return;
				}
			}
			
			$("#mobForm").submit();
		});
		/* 
		$(document).on("click", "#emailNext", function(event) {
			if($("#emailNm").val() == "") {
				alert('<fmt:message key="valid.account.name" />');
				$("#emailNm").focus();
				return;
			}
			if($("#email").val() == "") {
				alert('<fmt:message key="valid.account.email1" />');
				$("#email").focus();
				return;
			}
			
			if($("#emailCertId").val() == "") {
				alert('<fmt:message key="valid.mbr.email.certBtn" />');
				return;
			}
			
			if($("#emailCertId").val() != $("#emailCert").val()) {
				alert('<fmt:message key="valid.mbr.email.worngCert" />');
				return;
			}			
						
			$("#emailForm").submit();
		});
		 */
		$(document).on("change", "#cell1No", function(event) {
	    	$("#mobCertNo").val("");
	    	$("#mobChkCert").val("N");
	    });
	    
	    $(document).on("keydown", "#mobNm, #cell2No, #cell3No", function(event) {
	    	$("#mobCertNo").val("");
	    	$("#mobChkCert").val("N");
	    });
	    
	    $(document).on("click", "#ptcMobCertBtn", function(evetn) {
			if(calcAge($("#brthYear").val() + "" + $("#brthMonth").val() + "" + $("#brthDate").val()) < 14) {
				if($("#ptcNm").val() == "" ) {
					//alert('<fmt:message key="valid.account.ptcNm" />');
					$("#ptcNm").focus();
					return;
				}
								
				
				if($("#ptcBrthYear option:selected").index() == 0) {
					//alert('<fmt:message key="valid.account.ptcBirthDay" />');
					$("#ptcBrthYear").focus();
					return;
				} 
				if($("#ptcBrthMonth option:selected").index() == 0) {
					//alert('<fmt:message key="valid.account.ptcBirthDay" />');
					$("#ptcBrthMonth").focus();
					return;
				}
				if($("#ptcBrthDate option:selected").index() == 0) {
					//alert('<fmt:message key="valid.account.ptcBirthDay" />');
					$("#ptcBrthDate").focus();
					return;
				}
				
				if($("#ptcSexDstn option:selected").index() == 0) {
					//alert('<fmt:message key="valid.account.gndr" />');
					$("#ptcSexDstn").focus();
					return;
				}
				
				$("#popPtcNm").val($("#ptcNm").val());
				$("#popPtcLocalCd").val($("#ptcLocalCd").val());
				$("#popPtcSexDstn").val($("#ptcSexDstn").val());
				$("#popBrthYear").val($("#ptcBrthYear").val());
				$("#popBrthMonth").val($("#ptcBrthMonth").val());
				$("#popBrthDate").val($("#ptcBrthDate").val());
				
				if($("input[name=certType]").val() == undefined) {
					$("<input></input>").attr({type:"hidden", id:"certType",name:"certType", value:"ptc01"}).appendTo($("#certForm"));	
				}
				$("input[name=certClass]").remove();
				$("<input></input>").attr({type:"hidden", name:"certClass", value:"mob"}).appendTo($("#mobForm"));
				//window.open("","auth_popup","location=no"); 
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
 				$("#certForm").attr("target", "auth_popup");
 		        $("#certForm").submit();
			}
		});
		
		$(document).on("click", "#mobCertBtn", function(event) {
			if($("#mobNm").val() == "") {
				//alert('<fmt:message key="valid.account.name" />');
				$("#mobNm").focus();
				return;
			}
			if($("#cell1No option:selected").index() == 0) {
				//alert('<fmt:message key="valid.account.phone1" />');
				$("#cell1No").focus();
				return;
			}			
			if($("#cell2No").val() == "" ) {
				//alert('<fmt:message key="valid.account.phone2" />');
				$("#cell2No").focus();
				return;
			}			
			if($("#cell3No").val() == "" ) {
				//alert('<fmt:message key="valid.account.phone3" />');
				$("#cell3No").focus();
				return;
			}
			$("input[name=certClass]").remove();
			$("<input></input>").attr({type:"hidden", name:"certClass", value:"mob"}).appendTo($("#mobForm"));
			/*$.ajax({ 
				url : "${pageContext.request.contextPath}/${branchCd}/member/chkMbrInfo.do",
				type : "POST",
				data : $("#mobForm").serialize(),					
				dataType : "json",							    
				success : function(data) {
					if(data.code == "success") {*/
						$("#popPtcNm").val($("#mobNm").val());
						$("#popBrthYear").val($("#brthYear").val());
						$("#popBrthMonth").val($("#brthMonth").val());
						$("#popBrthDate").val($("#brthDate").val());
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
						/* window.open("","kcpCert","location=no");
		 				$("#certForm").attr("target", "kcpCert"); */		 				
		 		        $("#certForm").submit();
					/*} else {
						alert(data.msg);
						return;
					} 
				}, 
			    error : function(xhr,status, error){
			    	alert("통신중 장애 발생");
			    }
			});			*/
		});
		
		/*
		$(document).on("click", "#emailCertBtn", function(event) {
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
				url : "${pageContext.request.contextPath}/${branchCd}/member/chkMbrInfo.do",
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
		});
		function sendEmail() {
			$.ajax({ 
				url : "${pageContext.request.contextPath}/${branchCd}/member/sendEmailMbrInfo.do",
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
		*/
		
		$(document).on("change", "#brthYear, #brthMonth, #brthDate", function(event) {
			if($("#brthYear option:selected").index() != 0 && $("#brthMonth option:selected").index() != 0 && $("#brthDate option:selected").index() != 0) {
				if(calcAge($("#brthYear").val() + "" + $("#brthMonth").val() + "" + $("#brthDate").val()) < 14) {
					ptcDivVisiblity("block");
				} else {
					ptcDivVisiblity("none");
					ptcInfoInit();
				}
			} else {				
				ptcDivVisiblity("none");
				ptcInfoInit();
			}
		});
		
		$(document).on("change", "#brthYear, #brthMonth, #brthDate, #cell1No, #sexDstn", function(event) {
			$("#mobChkCert").val("N");
		});
		
		$(document).on("keydown", "#mbrName, #cell2No, #cell3No", function(event) {
			$("#mobChkCert").val("N");
		});
		
		function calcAge(birth) {                  
		    var month = (nowDate.getMonth() + 1);
		    var day = nowDate.getDate();        
		    if (month < 10) month = '0' + month;
		    if (day < 10) day = '0' + day;
		    var monthDay = month + day;
		        
		    birth = birth.replace('-', '').replace('-', '');
		    var birthdayy = birth.substr(0, 4);
		    var birthdaymd = birth.substr(4, 4);		 
		    var age = monthDay < birthdaymd ? curYear - birthdayy - 1 : curYear - birthdayy;

		    return age;
		}
		
		function ptcInfoInit() {
			$("select[name^=ptc]").each(function() {
				$(this).children("option:eq(0)").attr("selected","selected");				
			});			
			$("#ptcNm").val("");
			$("#ptcChkCert").val("N");
		}
		
		function ptcDivVisiblity(attr) {
			$(".loginBox").find("li").eq(2).css("display",attr);/* 보호자 인증 영역 - header */
			$(".loginBox").find("li").eq(3).css("display",attr);/* 보호자 인증 영역 - 이름 */ 
			$(".loginBox").find("li").eq(4).css("display",attr);/* 보호자 인증 영역 - 생년월일 */
			$(".loginBox").find("li").eq(5).css("display",attr);/* 보호자 인증 영역 - 내외국인여부, 성별 */
			attr = attr == "block" ? "none" : "block";
			$(".loginBox").find("li").eq(6).css("display",attr);/* 가입자 전화번호 및 본인인증 영역 - 14세미만의 경우 보호자의 것으로 대체함.*/
		}
    </script>
</head>
<body>
	<form id="certForm" name="certForm" method="post" action="${pageContext.request.contextPath}/admin/cert/kcpCertificationReq.do">
		<input type="hidden" id="popPtcNm" name="popPtcNm" /> 
		<input type="hidden" id="popPtcLocalCd" name="popPtcLocalCd" />
		<input type="hidden" id="popPtcSexDstn" name="popPtcSexDstn" />
		<input type="hidden" id="popBrthYear" name="popBrthYear" />
		<input type="hidden" id="popBrthMonth" name="popBrthMonth" />
		<input type="hidden" id="popBrthDate" name="popBrthDate" />
		<input type="hidden" id="reqTx" name="reqTx" value="cert"/> 
	</form>	
	<!-- login start -->
	<div class="FindForm">
		<h2>아이디/비밀번호 찾기</h2>
		<ul class="tabFind">
			<li class="on"><a href="" onclick="javascript:return false;">아이디 찾기</a></li>
			<li><a href="${pageContext.request.contextPath}/${branchCd}/member/findPwInputId.do">비밀번호 찾기</a></li>
		</ul>

		<p>아이디 찾기 방식을 선택해주세요</p>
		<div class="listFindWay">
			<h3 class="on"><input type="radio" id="srchMob" name="srchType" /><label>가입한 휴대번호로 아이디 찾기 </label></h3>
			<form id="mobForm" name="mobForm" method="post" action="${pageContext.request.contextPath}/${branchCd}/member/findIdResult.do">
				<input type="hidden" id="mobCertNo" name="mobCertNo"/>
				<input type="hidden" id="ptcChkCert" name="ptcChkCert" value="N"/>
				<input type="hidden" id="mobChkCert" name="mobChkCert" value="N"/>
				<input type="hidden" id="ptcCell1No" name="ptcCell1No" />
				<input type="hidden" id="ptcCell2No" name="ptcCell2No" />
				<input type="hidden" id="ptcCell3No" name="ptcCell3No" />
				<input type="hidden" id="ci" name="ci" />
				<input type="hidden" id="di" name="di" />
				<input type="hidden" id="ciUrl" name="ciUrl" />
				<input type="hidden" id="diUrl" name="diUrl" />
				<div class="loginBox" id="mobDiv">
					<ul>
						<li><span>이름</span><input kr-input type="text" id="mobNm" name="mobNm" placeholder="이름을 입력해주세요"  /></li>
						<li>
							<span>생년월일 <span class="pointP">*</span></span>
							<select class="inpPhone" id="brthYear" name="brthYear">
								<option>선택</option>
							</select>
							-
							<select class="inpPhone" id="brthMonth" name="brthMonth">
								<option>선택</option>
							</select>
							-
							<select class="inpPhone" id="brthDate" name="brthDate">
								<option>선택</option>
							</select>
							<div class="pointP">* 14세 미만의 어린이는 보호자 동의가 필요합니다.</div>
						</li>
						<li>
							<span class="titChild">14세 미만 사용자 보호자 동의</span>
						</li>
						<li>
							<span>보호자 이름  <span class="pointP">*</span></span>
							<input kr-input type="text" id="ptcNm" name="ptcNm" placeholder="이름을 입력해 주세요"  />
						</li>
						<li>
							<span>보호자 생년월일 <span class="pointP">*</span></span>
							<select class="inpPhone" id="ptcBrthYear" name="ptcBrthYear">
								<option>선택</option>
							</select>
							-
							<select class="inpPhone" id="ptcBrthMonth" name="ptcBrthMonth">
								<option>선택</option>
							</select>
							-
							<select class="inpPhone" id="ptcBrthDate" name="ptcBrthDate">
								<option>선택</option>
							</select>
							<!-- <div class="pointP">* 14세 미만의 어린이는 보호자 동의가 필요합니다.</div> -->
						</li>
						<li>
							<span>보호자 정보 <span class="pointP">*</span></span>
							<select class="inpPhone" id="ptcLocalCd" name="ptcLocalCd">
	                               <option value='01'>내국인</option>
	                               <option value='02'>외국인</option>
	                           </select>
							<select class="inpPhone" id="ptcSexDstn" name="ptcSexDstn">
								<option value="01">남자</option>
								<option value="02">여자</option>
							</select>
							<button type="button" id="ptcMobCertBtn" class="btnRed btnSmll">휴대폰 인증</button>
						</li>
						<li>
							<span>휴대전화번호</span>
							<select class="inpPhone" id="cell1No" name="cell1No">
								<option value="">선택</option>
								<option value="010">010</option>
								<option value="011">011</option>
							</select>
							-
							<input type="text" id="cell2No" name="cell2No" class="inpPhone" maxlength="4"/>
							-
							<input type="text" id="cell3No" name="cell3No" class="inpPhone" maxlength="4"/>							
							<button type="button" id="mobCertBtn" class="btnRed btnSmll">휴대폰 인증</button>
						</li>
						<li><button type="button" id="mobNext" class="btnRed btnMedium" >다음</button></li>
					</ul>
				</div>
			</form>
		</div>
	</div>
	<!-- //login end -->
</body>
</html>