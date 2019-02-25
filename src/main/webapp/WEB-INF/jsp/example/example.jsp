<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>

<!-- 달력 생성에 필요한 리소스 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common-config.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-ui-1.11.0.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.9.1.min.js"></script>
<!-- //달력 생성에 필요한 리소스 -->

<script type="text/javascript">
	/* 주소 입력 예제 */
	function goPopup(){
		window.open("${pageContext.request.contextPath}/address/popup.do","pop","width=570,height=420, scrollbars=yes, resizable=yes");
	}

	function jusoCallBack() {
		var resultStr = '';

		for (var obj in arguments) {
			resultStr += obj + ' => ' + arguments[obj] + '\n';
		}

		$("#addressResultLayer").val(resultStr);
	}
	/* //주소 입력 예제 */

	$("#adminLayer").ready(function() {
		/* 달력 예제 */
		$("#dateField").datepicker(getDatePickerConfig("dateField"));
		/* //달력 예제 */
	});

</script>

<div id="adminLayer" style="text-align: left;">
	<h1>
		<!-- 달력 예제 -->
		<br/>달력 셈플 : <input type='text' id='dateField' size='10' maxlength='7' readonly="readonly"
							style="cursor: pointer; width: 300px;" value="여기를 클릭!!"/>
		<!-- //달력 예제 -->

		<br/><br/>

		<!-- 주소 입력 팝업 예제 -->
		<br/><input type="button" value="Show Address Popup" onclick="goPopup();"/>
		<br/>주소 검색 결과 출력
		<br/><textarea id="addressResultLayer" rows="20" cols="100"></textarea>
		<!-- //주소 입력 팝업 예제 -->
	</h1>
</div>
