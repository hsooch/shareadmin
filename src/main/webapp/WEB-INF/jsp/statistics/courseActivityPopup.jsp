<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<div class="_popup _langko">
	<div id="_wrap">
	<div class="_popupInner">
		<div class="_popHeader">
			<span class="pop_Title">학습활동현황</span>
			<a href="javascript:closeLayerPopup();" class="pop_close">close</a>
		</div>		
		<div class="_popContent">
			<div class="popconBox">
				<div id="_articleContent" class="_articleContent">
				<div class="_insert">
					<div class="_table">
						<h2 class="cont_Title" id="ngdialog1-aria-labelledby">
							학습자 : ${userName}(${email}) / 강좌명 : ${courseName}
						</h2>
						<table id="list" class="_table _list w100 ">
						<colgroup>
							<col style="width:20%">
							<col style="width:20%">
							<col style="width:20%">
							<col style="width:15%">
							<col style="width:8%">
							<col style="width:17%">
						</colgroup>
						<thead valign="middle">
							<tr>
								<th>섹션</th>
								<th>서브섹션</th>
								<th>학습활동</th>
								<th>종류</th>
								<th>활동</th>
								<th>최근활동일시</th>
							</tr>
						</thead>
						<tbody>
	              		<c:choose>
		            		<c:when test="${fn:length(CourseStructure) > 0}">
		                		<c:forEach items="${CourseStructure}" var="courseStructure" varStatus="status">
		                		<c:choose>
		                			<c:when test="${fn:length(courseStructure.ActivityList) > 0}">
										<c:forEach items="${courseStructure.ActivityList}" var="courseActivity" varStatus="status2">
											<tr align="center">
							                	<td>${courseStructure.SectionName}</td>
							                	<td>${courseStructure.SubSectionName}</td>
							                	<td>${courseActivity.ActivityName}</td>
							                	<td>${courseActivity.ActivityType}</td>
							                	<td>${courseActivity.Activity}</td>
							                	<td>${courseActivity.ActivityDay}</td>
						                	</tr>
				                		</c:forEach>
				                	</c:when>
				                	<c:otherwise>
				                		<tr align="center">
						                	<td>${courseStructure.SectionName}</td>
						                	<td>${courseStructure.SubSectionName}</td>
						                	<td></td>
						                	<td></td>
						                	<td></td>
						                	<td></td>
						                </tr>
				                	</c:otherwise>
				                </c:choose>
		                		</c:forEach>
		            		</c:when>
		            		<c:otherwise>
				                <tr>
				                    <td colspan="6">조회된 결과가 없습니다.</td>
				                </tr>
		            		</c:otherwise>
	        			</c:choose>
						</tbody>
						</table>				
					</div>
				</div>
				<div class="_areaButton">
					<div class="_center">
						<span class="_button _large blackBtn"><a href="javascript:closeLayerPopup();">닫기</a></span>
					</div>
				</div>						
				</div>
			</div>
		</div>
	</div>
	</div>
</div>