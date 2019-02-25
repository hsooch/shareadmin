<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>공유대학 플랫폼 - 회원가입 정보입력3</title>
	<link href="${baseUrl}resources/homepage/css/common.css" rel="stylesheet"> <!-- 공유대학 공통 -->
	<link href="${baseUrl}resources/homepage/css/common-custom.css" rel="stylesheet"> <!-- 이 css 만 추가 -->
	<link href="${baseUrl}resources/homepage/css/style.css" rel="stylesheet"> <!-- 이 css 만 추가 -->
	<link href="${baseUrl}resources/homepage/css/style-popup.css" rel="stylesheet"> <!-- 이 css 만 추가 -->
  </head>

  <body>
    <div class="layer-wrap">
      <div class="layer-popup">
        <div class="layer-area">
          <button type="button" class="btn-layer-x"><span class="hide">레이어창닫기</span></button>
          <!-- layer header title -->
          <div class="layer-header">
            <h2 class="tit-layer">과목 상세정보</h2>
          </div>
          <!-- //layer header title -->
          <!-- layer container -->
          <div class="layer-container">
            <div class="layer-content">
                <dl class="info_list">
                    <dt>이수구분:</dt>
                    <dd>${subjectInfo.completeType}</dd>
                </dl>
                <dl class="info_list">
                    <dt>학과명:</dt>
                    <dd>${subjectInfo.department}</dd>
                </dl>
                <dl class="info_list">
                    <dt>과목명:</dt>
                    <dd>${subjectInfo.subjectName}</dd>
                </dl>
                <dl class="info_list">
                    <dt>분반:</dt>
                    <dd>${subjectInfo.classNum}</dd>
                </dl>
                <dl class="info_list">
                    <dt>대표교수:</dt>
                    <dd>${subjectInfo.teacherName}</dd>
                </dl>
                <dl class="info_list type2">
                    <dt>강의시간:</dt>
	            <c:if test="${subjectInfo.timeList != null and fn:length(subjectInfo.timeList) != 0 }">                                         
	              <c:forEach items="${subjectInfo.timeList}" var="timeInfo">
                    <dd>${timeInfo.dayOfWeekName} ${timeInfo.startTimeHour}:${timeInfo.startTimeMinute} ~ ${timeInfo.endTimeHour}:${timeInfo.endTimeMinute} <span>[${timeInfo.classRoom}]</span></dd>
	              </c:forEach>
	            </c:if>
                </dl>
                <dl class="info_list">
                    <dt>학점:</dt>
                    <dd>${subjectInfo.subjectPoint}</dd>
                </dl>
                <div class="btn-area">
                <c:if test="${subjectInfo.curriculumUrl != null}">                                         
                    <span class="btn-custom btn-down"><a href="${subjectInfo.curriculumUrl}" ><input type="submit" value="수업계획서 다운로드"></a></span>
                </c:if>
                    <span class="btn-custom btn-navy"><input type="submit" onClick="javascript:window.close()" value="확인"></span>
                </div>
            </div>
          <!-- //layer container -->
        </div>
      </div>
    </div>
  </body>
</html>
