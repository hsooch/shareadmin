<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>

<!-- CSS & Script Load -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-paging.js"></script>
<script type="text/javascript">
    $("#adminLayer").ready(function() {
        $("#pagingLayer").createPaging({
            totalCnt: 243,
            nowPage: 12,
            maxRowCnt: 20,
            showPageCnt: 10,
            clickEvent: function(pageNum) {
                alert(pageNum);
                pagingUtils.changePaging('pagingLayer', pageNum, 300);
            }
        });
    });
</script>

<!-- Body Contents -->
<div id="adminLayer">
    <div id="pagingLayer" class="_paging"></div>
</div>

