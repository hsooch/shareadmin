<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%
    long timestamp = System.currentTimeMillis();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/administrator.css?t=<%=timestamp%>" media="screen"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/common.css?t=<%=timestamp%>"/>
    <title>Error</title>
</head>
<body>
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">
            <div class="pg_location"></div>
        </h5>
        <div id="innTabContent">
            <div class="_articleContent">
                <div class="errorWrap">
                    <div class="imgContWrap">
                        <div class="ContWrap">
                            <div class="imgWrap"></div>
                            <div class="txtWrap">
                                <p>불편을 드려 죄송합니다.</p>
                                <span>요청하신 페이지를 찾을 수 없습니다.<br>
                                                                            정확한 주소를 확인하시고 다시 접속해 주십시오.</span>
                                <c:if test="${resultCode != null}">
                                    <div class="errorContent errorContentbg">
                                        <table class="errorTable">
                                            <colgroup>
                                                <col style="width:150px">
                                                <col style="width:auto;">
                                            </colgroup>
                                            <tbody>

                                            <tr>
                                                <th>에러 Code :</th>
                                                <td><span class="caution">${resultCode}</span></td>
                                            </tr>
                                            <tr>
                                                <th>에러 ID:</th>
                                                <td>${logKey}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </c:if>
                            </div>
                        </div>
                    </div>
                    <div class="_areaButton">
                        <div class="_center">
                            <span class="_button _large blackBtn"><a href="javascript:history.back();" class="mwx135">이전 페이지로 이동</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
