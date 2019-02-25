<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

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
	</style>
	<script type="text/javascript">
		$(document).ready(function(){
			$.datepicker.setDefaults(getDatePickerConfig(""));
			$("#searchBegin").datepicker({
				onSelect: function (selected, event) {
					// 날짜 포맷을 yyyy.MM.dd에서 yyyy-MM-dd로 변경한 후 파라미터 값에 재 설정합니다.
					$("input[name=begin]").val($("#searchBegin").val().replace(/[^0-9]/gi, "-"));
				}					
			}).keyup(function(event){
		        if(event.keyCode == 8 || event.keyCode == 46){
		            $.datepicker._clearDate(this);
				}
			});
			$("#searchEnd").datepicker({
				onSelect: function (selected, event) {
					// 날짜 포맷을 yyyy.MM.dd에서 yyyy-MM-dd로 변경한 후 파라미터 값에 재 설정합니다.
					$("input[name=end]").val($("#searchEnd").val().replace(/[^0-9]/gi, "-"));
				}					
			}).keyup(function(event){
		        if(event.keyCode == 8 || event.keyCode == 46){
		            $.datepicker._clearDate(this);
				}
			});
			
			$("select[name=state]").val("${state}").prop("selected", true);
			$("select[name=isCompletion]").val("${isCompletion}").prop("selected", true);
			$("#searchBegin").val("${searchBegin}");
			$("#searchEnd").val("${searchEnd}");
			$("input[name=begin]").val("${begin}");
			$("input[name=end]").val("${end}");
			$("input[name=email]").val("${email}");
			$("input[name=name]").val("${name}");
	
			$("#sarchBtn").click(function(e){
				var url = "${pageContext.request.contextPath}/statisticsedx/studentCaseStatList.do";
				
				basicSearchForm.action = url;
				basicSearchForm.submit();
			});
			
			$("#resetBtn").click(function(e){
				$("select[name=isCompletion] option:eq(0)").prop("selected", true);
				$("#searchBegin").val("");
				$("#searchEnd").val("");
				$("input[name=begin]").val("");
				$("input[name=end]").val("");
				$("input[name=email]").val("");
				$("input[name=name]").val("");
			});
		});
		
		function back(){
			var url = "${pageContext.request.contextPath}/statisticsedx/orgCaseStatList.do";
			
			/**$("#searchBegin").val("");
			$("#searchEnd").val("");
			$("input[name=begin]").val("");
			$("input[name=end]").val("");
			
			basicSearchForm.action = url;
			basicSearchForm.submit();**/
			location.href = url;
		}
		
		function excelDown(){
			var url = "${pageContext.request.contextPath}/statisticsedx/downloadStatList.do";

			$("input[name=statType]").val("student");
			
			basicSearchForm.action = url;
			basicSearchForm.submit();
		}
		
	    function showLayerPopup(userId, userName, email, courseId, courseName){
	    	var params = {
	    		"userId": userId,
	    		"userName": userName,
	    		"email": email,
	    		"courseId": courseId,
	    		"courseName": courseName
	    	};
	    	
			createLayerPopup('${pageContext.request.contextPath}/statisticsedx/courseActivityPopup.do', 900, params);
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
		<h5 class="cont_Title">학생별 수강 현황</h5>
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
                        
                            <div class="_form _both">
                                <div class="_insert tableWrap w960">
                                    <div class="innTable">
                                        <table class="w80">
											<colgroup>
												<col style="width:8%">
												<col style="width:13%">
												<col style="width:7%">
												<col style="width:14%">
												<col style="width:7%">
												<col style="width:22%">
												<col style="width:7%">
												<col style="width:22%">
											</colgroup>
                                            <tbody>
                                            <tr>
                                                <td><label for="org" class="pl10">소속기관</label></td>
                                                <td colspan="2">
                                                    <select class="_selectBox _fL wx125" name="org">
														<c:forEach var="orgName" items="${OrgNameList}" varStatus="status">
															<option value="<c:out value='${orgName.org}' />" 
																<c:if test="${org == orgName.org}">selected="selected"</c:if>>
																<c:out value="${orgName.org}" />
															</option>
														</c:forEach>
                                                    </select>
                                                </td>
                                                <td><label for="status" class="pl10">수강현황</label></td>
                                                <td colspan="2">
                                                    <select class="_selectBox _fL wx125" name="isCompletion">
                                                    	<option value="">전체</option>
														<option value="0">미수료</option>
														<option value="1">수료</option>
														<option value="2">수강중</option>
														<option value="3">수강시작전</option>														
                                                    </select>
                                                </td>
                                                <td><label for="email" class="pl10">이메일</label></td>
                                                <td colspan="2">
													<input type="text" name="email" placeholder="" class="w99">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><label for="start_date" class="pl10">개강일</label></td>
                                                <td colspan="5">
													<div class="cal_type">
													    <p class="date"><span><input type="text" id="searchBegin" name="searchBegin" readonly="readonly" onkeyDown="if(event.keyCode==8){event.keyCode=0;return false;}"></span><label class="pickerlabel" for="searchBegin"></label></p>
													    <p class="date"><span><input type="text" id="searchEnd" name="searchEnd" readonly="readonly" onkeyDown="if(event.keyCode==8){event.keyCode=0;return false;}"></span><label class="pickerlabel" for="searchEnd"></label></p>
													</div>
												</td>
                                                <td><label for="name" class="pl10">이름</label></td>
                                                <td colspan="4">
													<input type="text" name="name" placeholder="" class="w99">
												</td>												
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="_areaButton innerBtn">
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
				학습자 수 : <strong>${UserTotalCount}</strong>
				</div>
				<div class="_search pr0">
					<div class="_btnSet pr0">
						<span class="_button _large"><a href="javascript:back();" class="mainBtn" >통계메인</a></span>
						<span class="_large">
							<a href="javascript:excelDown();" class="downBtn"
								>엑셀다운</a>
						</span>
					</div>
				</div>
            </div>

            <table class="_table _list w100 ">
                <caption>표 제목</caption>
                <colgroup>
                    <col style="width:9%">
                    <col style="width:7%">
                    <col style="width:3%">
                    <col style="width:4%">
                    <col style="width:6%">
                    <col style="width:5%">
                    <col style="width:5%">
                    <col style="width:7%">
                    <col style="width:8%">
                    <col style="width:7%">
                    <col style="width:6%">
                    <col style="width:7%">
                    <col style="width:4%">
                    <col style="width:4%">
                    <col style="width:9%">
                    <col style="width:9%">
                </colgroup>
                <thead valign="middle">
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>성별</th>
                        <th>수료여부</th>
                        <th>점수</th>
                        <th>진도</th>
                        <th>학습내역</th>
                        <th>강좌ID</th>
                        <th>강좌명</th>
                        <th>등록대학</th>
                        <th>분야</th>
                        <th>종류</th>
                        <th>강좌상태</th>
                        <th>강좌시작일</th>
                        <th>강좌종료일</th>
                    </tr>
                </thead>
                <tbody>
                <c:choose>
                    <c:when test="${fn:length(StudentStatList) > 0}">
                        <c:forEach items="${StudentStatList}" var="studentStat"
                            varStatus="status">
                            <tr align="center">
                                <td>${studentStat.email}</td>
                                <td>${studentStat.name}</td>
                                <td>${studentStat.age}</td>
                                <td>${studentStat.gender}</td>
                                <td>${studentStat.completion}</td>
                                <fmt:parseNumber var = "intValue" integerOnly = "true" type = "number" value = "${studentStat.score}" />
                                <td>${intValue}점</td>
                                <td>${studentStat.ProgressRate}%</td>
                                <td>
                                    <a id="edx_link" href="javascript:;" onclick="javascript:showLayerPopup('${studentStat.id}', '${studentStat.name}', '${studentStat.email}', '${studentStat.course_id}', '${studentStat.course_name}')">상세보기</a>
                                </td>
                                <td>${studentStat.course_id}</td>
                                <td>${studentStat.course_name}</td>
                                <td>${studentStat.org}</td>
                                <td>${studentStat.course_subject}</td>
                                <td>${studentStat.course_type}</td>
                                <td>${studentStat.state}</td>
                                <td>${studentStat.course_start}</td>
                                <td>${studentStat.course_end}</td>
                            </tr>
                        </c:forEach>
                    </c:when>
                    <c:otherwise>
                        <tr>
                            <td colspan="16">조회된 결과가 없습니다.</td>
                        </tr>
                    </c:otherwise>
                </c:choose>
                </tbody>
            </table>
            <div class="_areaButton">
                <div class="_search pr0 _right">
                    <div class="_btnSet pr0">
                        <span class="_button _large"><a href="javascript:back();" class="mainBtn" >통계메인</a></span>
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