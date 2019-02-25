<%@ page import="shared.university.admin.utils.RedisSessionUtils" %>
<%@ page language="java"
         contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"
         session="false"

%><%

String username = RedisSessionUtils.getAttribute(request, "eXSignOn.session.userid");

/*
SSO 로그인이 되어 사용자 인증정보가 존재할 때에 이 화면으로 넘어온다.
session.getAttribute("eXSignOn.session.userid") 에는 인증서버의 설정에 따라
사용자의 인증정보가 단일 String 혹은 JSONString 형태로 들어오게 되는데, 넘어온 정보를 핸들링하여 연계시스템에 로그인시키면 된다.
*/

// TO DO...


%>
<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>

<script>
    function adminAfterLogin(data) {
        if (data.resultCode === "0") {
            location.href = "${pageContext.request.contextPath}/main.do";
        } else {
            location.href = "${pageContext.request.contextPath}/login/login.do";
        }
    }

    function homeAfterLogin(data) {
        if (data.resultCode === "0") {
            parent.homeLoginCallBack(data.USESSIONID);
        } else {
            parent.location.href = '/mainLogin/college/view.do?layout=unknown';
        }
    }

    $.ajax({
        method: "POST",
        url: "${pageContext.request.contextPath}/login/ssoLogin.ajax"
    }).done(function (data) {
        document.domain = 'sfup.or.kr';

        if (parent.homeLoginCallBack) {
            homeAfterLogin(data);
        } else {
            adminAfterLogin(data);
        }
    });
</script>