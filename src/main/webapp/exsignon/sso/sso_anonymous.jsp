<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    session="false"

%>
<script>
    function adminAfterLogin() {
        location.href = "${pageContext.request.contextPath}/login/login.do";
    }

    function homeAfterLogin() {
        parent.homeLoginCallBack('');
    }

    document.domain = 'sfup.or.kr';
    if (parent.homeLoginCallBack) {
        homeAfterLogin();
    } else {
        adminAfterLogin();
    }
</script>