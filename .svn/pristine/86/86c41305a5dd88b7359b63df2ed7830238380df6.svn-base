<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%
    long timestamp = System.currentTimeMillis();
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>open edx 통계조회</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta name="description" content="" />
    <meta property="og:description" content="" />

    <jsp:include page="/resourcesLoad.jsp?t=<%=timestamp%>" flush="true" />    

	<!-- script src="//code.jquery.com/jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script-->
	<style>
		.top_area{position:relative;background:#3a55a6;height:60px;}
		.top_area .logo{width:230px;height:60px;position:absolute;left:0;top:0;}
		.top_area .logo a{width:230px;height:60px;display:block;background:url('${pageContext.request.contextPath}/images/common/icon/logo.png') 20px center no-repeat;text-indent:-9999px;position:relative;z-index:100;}
		.top_area .pageTit{width:118px;height:24px;margin:18px 0;position:absolute;border-radius:0 12px 12px 0;left:231px;top:0;background:#fff; text-align: center;}
		.top_area .pageTit a{color:#191919;line-height:24px;padding-left: 16px;}
		.top_area .pageTit a:before{content:'';position:absolute;left:14px;top:5px;padding-left:15px;width:16px;height:14px;background:url(${pageContext.request.contextPath}/images/common/icon/icon_com.png) no-repeat;}
		
		.top_area .global_navi{width:100%;margin:auto;padding-top:18px;position:relative;z-index:2;text-align:right;}
		.top_area .global_navi > ul{display:inline-block;padding-right:100px;}
		.top_area .global_navi li{float:left;position:relative;margin:0 4px;height:20px;line-height:24px;font-size:12px;}
		.top_area .global_navi li a{color:#fff;display:block;}
		.top_area .global_navi li a span{color:#fffd41;}
		.top_area .global_navi li.radiBtn{ width:87px;height:24px;line-height:24px;text-align:left;background:#fff; border-radius: 12px;}
		.top_area .global_navi li.radiBtn a {color: #333;padding-left:32px;}
		.top_area .global_navi li.gbnv_1{padding-right: 6px; font-size: 13px;}
		.top_area .global_navi li.gbnv_2:before{content:'';position:absolute;left:14px;top:5px;width:18px;height:18px;background:url(${pageContext.request.contextPath}/images/common/icon/icon_navibtn.png) -21px -1px no-repeat;}
		.top_area .global_navi li.gbnv_3:before{content:'';position:absolute;left:14px;top:5px;width:18px;height:18px;background:url(${pageContext.request.contextPath}/images/icon_x.png) -0px -1px no-repeat;}
	
		.cont_Title{height:31px;line-height:30px;position:relative;font-size:26px;color:#333;font-weight:500;}

		#edx_link {
			text-decoration : underline;
			color : #3a77a6;
		}
		#edx_bottom {border-bottom: 1px solid #fff;}
	</style>
	<script type="text/javascript">
		$(document).ready(function(){
			$.datepicker.setDefaults(getDatePickerConfig(""));
			$("#searchBegin").datepicker({
				onSelect: function(selected, event) {
					// 날짜 포맷을 yyyy.MM.dd에서 yyyy-MM-dd로 변경한 후 파라미터 값에 재 설정합니다.
					$("input[name=begin]").val($("#searchBegin").val().replace(/[^0-9]/gi, "-"));
				}					
			}).keyup(function(event){
				if(event.keyCode == 8 || event.keyCode == 46){
					$.datepicker._clearDate(this);
				}
			});
			$("#searchEnd").datepicker({
				onSelect: function(selected, event) {
					// 날짜 포맷을 yyyy.MM.dd에서 yyyy-MM-dd로 변경한 후 파라미터 값에 재 설정합니다.
					$("input[name=end]").val($("#searchEnd").val().replace(/[^0-9]/gi, "-"));
				}					
			}).keyup(function(event){
		        if(event.keyCode == 8 || event.keyCode == 46){
		            $.datepicker._clearDate(this);
				}
			});

			$("#searchBegin").val("${searchBegin}");
			$("#searchEnd").val("${searchEnd}");
			$("input[name=begin]").val("${begin}");
			$("input[name=end]").val("${end}");
			
			$("#sarchBtn").click(function(e){
				var url = "${pageContext.request.contextPath}/statisticsedx/orgCaseStatList.do";

				basicSearchForm.action = url;
				basicSearchForm.submit();
			});
			
			$("#resetBtn").click(function(e){
				$("select[name=org]").val("");
				$("input[name=begin]").val("");
				$("input[name=end]").val("");
				$("#searchBegin").val("");
				$("#searchEnd").val("");
			});
		});
	
		function callStudentStatPage(orgName, isCompletion){
			var url = "${pageContext.request.contextPath}/statisticsedx/studentCaseStatList.do";
	
			$("select[name=org]").val(orgName);
			$("input[name=isCompletion]").val(isCompletion);
			
			basicSearchForm.action = url;
			basicSearchForm.submit();
		}
		
		function callRegOrgStatPage(orgName, status){
			var url = "${pageContext.request.contextPath}/statisticsedx/regOrgCaseStatList.do";
	
			$("select[name=org]").val(orgName);
			$("input[name=state]").val(status);
			
			basicSearchForm.action = url;
			basicSearchForm.submit();
		}
		
		function excelDown(){
			var url = "${pageContext.request.contextPath}/statisticsedx/downloadStatList.do";
			/**var arrays = new Array();
	
			'<c:forEach var="orgStat" items = "${OrgStatList}">'
				var obj = new Object();
				obj.org = '<c:out value="${orgStat.org}" />';
				obj.a_cnt = '<c:out value="${orgStat.a_cnt}" />';
				obj.g_cnt = '<c:out value="${orgStat.g_cnt}" />';
				obj.b_cnt = '<c:out value="${orgStat.b_cnt}" />';
				obj.ag_minus_cnt = '<c:out value="${orgStat.ag_minus_cnt}" />';
				obj.ab_minus_cnt = '<c:out value="${orgStat.ab_minus_cnt}" />';
				obj.c_cnt = '<c:out value="${orgStat.c_cnt}" />';
				obj.d_cnt = '<c:out value="${orgStat.d_cnt}" />';
				obj.e_cnt = '<c:out value="${orgStat.e_cnt}" />';
				obj.f_cnt = '<c:out value="${orgStat.f_cnt}" />';
	
				arrays.push(obj);
			'</c:forEach>'
			
			console.log(arrays);**/
			
			$("input[name=statType]").val("org");
			
			basicSearchForm.action = url;
			basicSearchForm.submit();
		}
	</script>
</head>
<body>
<div class="top_area">
    <div class="global_navi">
        <ul class="clfix">
        	<li class="gbnv_2 radiBtn"><a href="${pageContext.request.contextPath}/category/mapping/list.do" title="강좌매핑">강좌매핑</a></li>
            <li class="gbnv_3 radiBtn"><a href="javascript:self.close();" title="닫기">닫기</a></li>
        </ul>
    </div>

    <h1 class="logo">
        <a title="공유대학포탈">공유대학포탈</a>
    </h1>
</div>
    
<div class="tab_wraping">
	<!-- tab1 -->
	<div id="tab1" class="tab-content current">
		<h5 class="cont_Title">기관별 서비스 통계</h5>
		<div id="innTabContent">
		<!-- innertab -->
		<div class="innertab_wraping">
		<div class="_articleContent">
            <div class="_border _write mt10">
                <div class="_inner">
                    <fieldset>
                        <legend>통계</legend>
                        <form name="basicSearchForm" method="post">
                        <input type="hidden" name="begin"/>
                        <input type="hidden" name="end"/>
                        <input type="hidden" name="statType"/>
                        <input type="hidden" name="isCompletion"/>
                        <input type="hidden" name="state"/>
                        
                            <div class="_form _both">
                                <div class="_insert tableWrap w960">
                                    <div class="innTable">
                                        <table class="w80">
											<colgroup>
												<col style="width:8%">
												<col style="width:13%">
												<col style="width:7%">
												<col style="width:17%">
												<col style="width:7%">
												<col style="width:22%">
												<col style="width:7%">
												<col style="width:22%">
											</colgroup>
                                            <tbody>
                                            <tr>
                                                <td><label for="org" class="pl10">소속기관</label></td>
                                                <td>
                                                    <select class="_selectBox _fL wx150" name="org">
                                                    	<option value="">전체</option>
														<c:forEach var="orgName" items="${OrgNameList}" varStatus="status">
															<option value="<c:out value='${orgName.org}' />" 
																<c:if test="${org == orgName.org}">selected="selected"</c:if>>
																<c:out value="${orgName.org}" />
															</option>
														</c:forEach>
                                                    </select>
                                                </td>
                                                <td><label for="start_date" class="pl10">개강일</label></td>
                                                <td colspan="2">
													<div class="cal_type">
													    <p class="date"><span><input type="text" id="searchBegin" name="searchBegin" readonly="readonly" onkeyDown="if(event.keyCode==8){event.keyCode=0;return false;}"></span><label class="pickerlabel" for="searchBegin"></label></p>
													    <p class="date"><span><input type="text" id="searchEnd" name="searchEnd" readonly="readonly" onkeyDown="if(event.keyCode==8){event.keyCode=0;return false;}"></span><label class="pickerlabel" for="searchEnd"></label></p>
													</div>
												</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="_areaButton innerBtnB">
                                        <div class="_right">
											<span class="_button _small _active searchBtn" id="sarchBtn">
												<input type="button" value="조회">
											</span>
                                            <span class="_button _small resetBtn" id="resetBtn">
                                            	<input type="button" value="초기화">
                                           	</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </fieldset>
                </div>
            </div>

			<div class="_listHead">
				<div class="_count">
				기관수 : 
				<c:choose>
					<c:when test="${fn:length(OrgStatList) > 0}">
						<strong>${fn:length(OrgStatList) - 1}</strong>
					</c:when>
					<c:otherwise>
						<strong>0</strong>
					</c:otherwise>
				</c:choose>
				</div>
				<div class="_search pr0">
					<div class="_btnSet pr0">
						<span class="_large">
							<a href="javascript:excelDown();" class="downBtn"
								>엑셀다운</a>
						</span>
					</div>
				</div>
			</div>

			<table id="list" class="_table _list w100 ">
				<caption>표 제목</caption>
				<colgroup>
					<col style="width:13%">
					<col style="width:10%">
					<col style="width:10%">
					<col style="width:10%">
					<col style="width:10%">
					<col style="width:10%">
					<col style="width:10%">
					<col style="width:9%">
					<col style="width:9%">
					<col style="width:9%">
				</colgroup>
				<thead valign="middle">
					<tr>
						<th rowspan="2">기관</th>
						<th rowspan="2">총수강생수</th>
						<th colspan="4" id="edx_bottom">수강현황</th>
						<th rowspan="2">등록강좌수</th>
						<th colspan="3" id="edx_bottom">강좌상태</th>
					</tr>
					<tr>
						<th>수료</th>
						<th>미수료</th>
						<th>수강중</th>
						<th>수강시작전</th>
						<th>예정</th>
						<th>개강</th>
						<th>종강</th>
					</tr>
				</thead>
				<tbody>
             		<c:choose>
            		<c:when test="${fn:length(OrgStatList) > 0}">
                		<c:forEach items="${OrgStatList}" var="orgStat"
                			varStatus="status">
                		<c:choose>
							<c:when test="${orgStat.org ne 'total'}">
								<tr align="center">
				                	<td>${orgStat.org}</td>
				                	<td>${orgStat.a_cnt}</td>
				                	<td>
				                		<a id="edx_link" href="javascript:callStudentStatPage('${orgStat.org}', '1');">
				                		${orgStat.g_cnt}
				                		</a>
				                	</td>
				                	<td>
				                		<a id="edx_link" href="javascript:callStudentStatPage('${orgStat.org}', '0');">
				                		${orgStat.ag_minus_cnt}
				                		</a>
				                	</td>
				                	<td>
				                		<a id="edx_link" href="javascript:callStudentStatPage('${orgStat.org}', '2');">
				                		${orgStat.b_cnt}
				                		</a>
				                	</td>				                	
				                	<td>${orgStat.ab_minus_cnt}</td>
				                	<td>
				                		<a id="edx_link" href="javascript:callRegOrgStatPage('${orgStat.org}', '');">
				                		${orgStat.c_cnt}
				                		</a>
				                	</td>
				                	<td>
				                		<a id="edx_link" href="javascript:callRegOrgStatPage('${orgStat.org}', '예정');">
				                		${orgStat.d_cnt}
				                		</a>
				                	</td>
				                	<td>
				                		<a id="edx_link" href="javascript:callRegOrgStatPage('${orgStat.org}', '개강');">
				                		${orgStat.e_cnt}
				                		</a>
				                	</td>
				                	<td>
				                		<a id="edx_link" href="javascript:callRegOrgStatPage('${orgStat.org}', '종료');">
				                		${orgStat.f_cnt}
				                		</a>
				                	</td>
				                </tr>
							</c:when>
							<c:otherwise>
								<tr align="center" bgcolor="#E6E6E6">
				                	<td>${orgStat.org}</td>				                	
				                	<td>${orgStat.a_cnt}</td>
									<td>${orgStat.g_cnt}</td>
				                	<td>${orgStat.ag_minus_cnt}</td>
				                	<td>${orgStat.b_cnt}</td>
				                	<td>${orgStat.ab_minus_cnt}</td>
				                	<td>${orgStat.c_cnt}</td>
				                	<td>${orgStat.d_cnt}</td>
				                	<td>${orgStat.e_cnt}</td>
				                	<td>${orgStat.f_cnt}</td>
			                	</tr>
							</c:otherwise>
						</c:choose>
                		</c:forEach>
            		</c:when>
            		<c:otherwise>
		                <tr>
		                    <td colspan="10">조회된 결과가 없습니다.</td>
		                </tr>
            		</c:otherwise>
       			</c:choose>
				</tbody>
			</table>
			<div class="_areaButton">
                <div class="_search pr0 _right">
                    <div class="_btnSet pr0">
                        <span class="_large">
							<a href="javascript:excelDown();" class="downBtn"
								>엑셀다운</a>
						</span>
                    </div>
                </div>
            </div>
		</div>
		</div>
		<!-- //innertab -->
		</div>
	</div>
	<!-- // tab1 -->
</div>
</body>
</html>