<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<link href="${baseUrl}resources/homepage/css/common-custom.css" rel="stylesheet">
<link href="${baseUrl}resources/homepage/css/style.css" rel="stylesheet">
<%-- <link href="${baseUrl}resources/homepage/css/style-popup.css" rel="stylesheet"> --%>
<script type="text/javascript" src="${baseUrl}js/jquery-paging.js"></script>
<script type="text/javascript" src="${baseUrl}resources/homepage/js/univ-ui.js"></script>

<script type="text/javascript">
	var baseUrl = '${baseUrl}';
	var selUnivAreaCode = '';
	var selUnivCode = '';
	var selYear = '';
	var selSemesterCode = '';
	var selDayofweekCode = '';
    var nowPage = 1;
    var isFirstLoad = true;

	function changeArea(univAreaCode){
	    selUnivAreaCode = univAreaCode;
	
	    $.ajax({
	        method: "POST",
	        url: baseUrl + "code/" + univAreaCode + "/selectCodeList.ajax",
	        dataType: "json"
	    }).done(function (data) {
	        $('#sch_univ strong a').html('전체대학');
	        
	        $("#sch_univ_list").html('');
	        var html = '';
	        data.codeList.forEach(function (univInfo) {
	            html += '<li><a href="javascript:changeUniv(\''+univInfo.code+'\')">'+univInfo.codeName+'</a></li>';
	        });
	        $("#sch_univ_list").html(html);
	
	        $("#sch_univ_list li a").click(function() {
	            $(this).each(function(){
	              var text = $(this).html();
	              $(this).parents('div.select-ui').find('strong a').html(text);
	              $(".select-ui ul").parents('div.select-ui').removeClass('open');
	            });
	        });
	    });
	}
	
	function changeUniv(code){
	    selUnivCode = code;
	}
	
	function changeDayofweek(code){
	    selDayofweekCode = code;
	}
	
	function changeYear(code){
	    selYear = code;
	}
	
	function changeSemester(code){
	    selSemesterCode = code;
	}
    
    function initSelectbox(elementID){
    	//console.log("initSelectbox:"+$(elementID).html());
    	//$(elementID).parents('div.select-ui').removeClass("open");
    }
	
	function searchInit(){
		$('#sch_area strong a').html('지역선택');
        selUnivAreaCode = '';
        $('#sch_univ strong a').html('전체대학');
        $('#sch_univ_list').html('');
        selUnivCode = '';
        $('li input.input-text').val('');
        $('#sch_dayofweek strong a').html('요일선택');
        selDayofweekCode = '';
        var nowDate = new Date();
        selYear = nowDate.getFullYear();
        $('#sch_year strong a').html(selYear+'년');
        $('#sch_semester strong a').html('${semesterList.codeList[0].codeName}');
        selSemesterCode = '${semesterList.codeList[0].code}';
	    nowPage = 1;
	    $('#listView').val('10');
	}
	
	function searchSubjectList(){
	    var param = {
	            searchUnivArea     : selUnivAreaCode,
	            searchUniv         : selUnivCode,
	            searchCompleted    : $('#sch_completed').val(),
	            searchDepartment   : $('#sch_department').val(),
	            searchTeacher      : $('#sch_teacher').val(),
	            searchSubject      : $('#sch_subject').val(),
	            searchYear         : selYear,
	            searchSemesterCode : selSemesterCode,
	            selDayofweekCode   : selDayofweekCode,
	            sort               : 'UNIV_CODE_NAME',
	            order              : 'asc',
	            nowPage            : nowPage,
	            rowCnt             : $('#listView').val()
	    };
	    //console.log(param);
	    $.ajax({
	        method: "POST",
	        url: baseUrl + "exchange/getExSubjectList.ajax",
	        data : param,
	        dataType: "json"
	    }).done(function (data) {
	        var html = '';
            var totCnt = 0;

            if(data.subjectList.length > 0){

		        data.subjectList.forEach(function (subjectInfo) {
	                var showDetailParam = "'"+subjectInfo.univCode+"', '"+subjectInfo.year+"', '"+subjectInfo.semesterCode+"', '"+subjectInfo.subjectNum+"', '"+subjectInfo.classNum+"'";

	                html += '<tr>';
		            html += '  <td class="td-division"><span class="tx-ellipsis">'+subjectInfo.year+'년도</span></td>';
		            html += '  <td class="th-credit"><span class="tx-ellipsis">'+subjectInfo.semesterCodeName+'</span></td>';
		            html += '  <td class="td-division"><span class="tx-ellipsis">'+subjectInfo.univCodeName+'</span></td>';
		            html += '  <td class="td-division"><span class="tx-ellipsis">'+subjectInfo.completeType+'</span></td>';
		            html += '  <td class="td-department"><span class="tx-ellipsis">'+subjectInfo.department+'</span></td>';
		            html += '  <td class="td-subject"><span class="tx-ellipsis">'+subjectInfo.subjectName+'</span></td>';
		            html += '  <td class="td-group"><span class="tx-ellipsis">'+subjectInfo.classNum+'</span></td>';
		            html += '  <td class="td-professor"><span class="tx-ellipsis">'+subjectInfo.teacherName+'</span></td>';
		            html += '  <td class="td-credit"><span class="tx-ellipsis">'+subjectInfo.subjectPoint+'</span></td>';
		            html += '  <td class="td-detail">';
		            html += '    <span class="btn-custom btn-navy btn-mini"><input type="submit" class="" onClick="javascript:detailView('+showDetailParam+')" value="보기"></span>';
		            html += '  </td>';
		            html += '</tr>';
		        });
	
                totCnt = data.subjectList[0].totalCnt*1;
	            
	        } else {
	            html += '<td colspan="10" class="no-result">'
	                + '<p class="tx-no-result">※ 등록한 과목이 없습니다. </p>'
	                + '</td>';
	        }
            $("#subjectList").html(html);

            if (isFirstLoad) {
	            $("#pagingLayer").createPaging({
	                totalCnt: totCnt,
	                nowPage: nowPage,
	                maxRowCnt: Number($('#listView').val()),
	                showPageCnt: 10,
	                isHome: true,
	                clickEvent: function(targetId, pageNum) {
	                    nowPage = pageNum;
	                    searchSubjectList();
	                }
	            });
	            isFirstLoad = false;
            } else {
                pagingUtils.changePaging('pagingLayer', nowPage, totCnt, Number($("#listView").val()));
            }
	    });
	}

    function detailView(univCode, year, semesterCode, subjectNum, classNum) {

        $("#univCode").val(univCode);
        $("#year").val(year);
        $("#semesterCode").val(semesterCode);
        $("#subjectNum").val(subjectNum);
        $("#classNum").val(classNum);

        if( ( navigator.userAgent.indexOf("Android") > - 1 || navigator.userAgent.indexOf("iPhone") > - 1 ) == false ) // 스마트폰이 아닌경우
        {
            var return_gubun;
            var width  = 400;
            var height = 650;

            var leftpos = screen.width  / 2 - ( width  / 2 );
            var toppos  = screen.height / 2 - ( height / 2 );

            var winopts  = "width=" + width   + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
            var position = ",left=" + leftpos + ", top="    + toppos;
            var AUTH_POP = window.open('','subj_popup', winopts + position);
        }

        $("#subjForm").attr("target", "subj_popup");
        $("#subjForm").submit();
    }
	
	$(document).ready(function() {
	    // 년도 세팅
	    var html = "";
	    var nowDate = new Date();
	    var curYear = nowDate.getFullYear()+2;
	    $('#sch_year').append('<strong><a href="#self">'+nowDate.getFullYear()+'년</a></strong>');
	    for(var i = curYear; i >= nowDate.getFullYear(); i--) {
	    	html += '<li><a href="javascript:changeYear(\''+i+'\')">'+i+'년</a></li>';
	    }
	    $('#sch_year').append('<ul>' + html + '</ul>');
	    selYear = nowDate.getFullYear();
	
	    selSemesterCode = '${semesterList.codeList[0].code}';
	    
	    searchSubjectList();
	});
</script>

<form id="subjForm" name="subjForm" method="post" action="${baseUrl}/exchange/viewExSubjectInfo.do">
    <input type="hidden" id="univCode" name="univCode" /> 
    <input type="hidden" id="year" name="year" />
    <input type="hidden" id="semesterCode" name="semesterCode" />
    <input type="hidden" id="subjectNum" name="subjectNum" />
    <input type="hidden" id="classNum" name="classNum" />
</form> 

<!-- 검색 -->
<div class="search-subject-wrap type2">
  <ul class="select-list">
    <li class="li-first">
      <span class="tit-label">선택대학</span>
      <div class="select-group">
        <div class="select-ui type2 ml0" id="sch_area">
          <strong><a href="#self" onfocusout="javascript:initSelectbox(this)">지역선택</a></strong>
          <ul>
           	<c:if test="${areaList.codeList != null and fn:length(areaList.codeList) != 0 }">                                         
              <c:forEach items="${areaList.codeList}" var="univAreaInfo">
                <li><a href="javascript:changeArea('${univAreaInfo.code}')">${univAreaInfo.codeName}</a></li>
              </c:forEach>
 	        </c:if>
          </ul>
        </div>
        <div class="select-ui type2" id="sch_univ">
          <strong><a href="#self" onfocusout="javascript:initSelectbox(this)">전체대학</a></strong>
          <ul id="sch_univ_list">
          </ul>
        </div>
      </div>
    </li>
    <li>
      <span class="tit-label">이수구분</span>
      <!-- select list type -->
      <input kr-input type="text" class="input-text" id="sch_completed" title="이수구분을 입력하세요" placeholder="이수구분을 입력하세요">
    </li>
    <li class="li-first">
      <span class="tit-label">학과</span>
      <!-- select list type -->
      <input kr-input type="text" class="input-text" id="sch_department" title="학과를 입력하세요." placeholder="학과를 입력하세요">
    </li>
    <li>
      <span class="tit-label">교수 </span>
      <!-- select list type -->
      <input kr-input type="text" class="input-text" id="sch_teacher" title="교수명을 입력하세요." placeholder="교수명을 입력하세요">
    </li>
    <li class="li-first">
      <span class="tit-label">과목명</span>
      <!-- select list type -->
      <input kr-input type="text" class="input-text" id="sch_subject" title="과목명을 입력하세요." placeholder="과목명을 입력하세요">
    </li>
    <li>
      <span class="tit-label">강의진행 요일</span>
      <!-- select list type -->
      <div class="select-ui" id="sch_dayofweek">
          <strong><a href="javascript:initSelectbox()">요일선택</a></strong>
          <ul>
              <li><a href="javascript:changeDayofweek('2')">월</a></li>
              <li><a href="javascript:changeDayofweek('3')">화</a></li>
              <li><a href="javascript:changeDayofweek('4')">수</a></li>
              <li><a href="javascript:changeDayofweek('5')">목</a></li>
              <li><a href="javascript:changeDayofweek('6')">금</a></li>
              <li><a href="javascript:changeDayofweek('6')">토</a></li>
              <li><a href="javascript:changeDayofweek('1')">일</a></li>
          </ul>
      </div>
    </li>
    <li class="li-first">
      <span class="tit-label">등록년도/학기</span>
      <div class="select-group">
        <!-- select list type -->
        <div class="select-ui type2 ml0" id="sch_year">
        </div>
        <div class="select-ui type2" id="sch_semester">
          <c:if test="${semesterList.codeList != null and fn:length(semesterList.codeList) != 0 }">                                         
            <c:forEach items="${semesterList.codeList}" var="semesterInfo" end="0">
              <strong><a href="#self">${semesterInfo.codeName}</a></strong>
            </c:forEach>
          </c:if>
          <ul>
           	<c:if test="${semesterList.codeList != null and fn:length(semesterList.codeList) != 0 }">                                         
              <c:forEach items="${semesterList.codeList}" var="semesterInfo">
                <li><a href="javascript:changeSemester('${semesterInfo.code}')">${semesterInfo.codeName}</a></li>
              </c:forEach>
 	        </c:if>
          </ul>
        </div>
      </div>
    </li>
  </ul>
  <div class="btn-area center">
    <span class="btn-custom btn-gray"><input type="submit" onClick="javascript:searchInit()" value="검색조건 초기화"></span>
    <span class="btn-custom btn-navy"><input type="submit" onClick="javascript:searchSubjectList()" value="선택조건으로 검색"></span>
  </div>
</div>
<!-- //검색 -->

<!-- 10개씩 보기 -->
<div class="line-wrap">
  <label for="listView" class="hide">리스트 갯수</label>
  <select name="" id="listView" class="select" onchange="searchSubjectList();">
    <option value="10">10개씩</option>
    <option value="20">20개씩</option>
    <option value="30">30개씩</option>
    <option value="40">40개씩</option>
    <option value="50">50개씩</option>
  </select>
</div>
<!-- //10개씩 보기 -->

<!-- 검색 결과 -->
<div class="search-tb-list ">
  <table class="tb-list">
    <caption>학점교류과목 리스트</caption>
    <thead>
      <tr>
        <th class="th-division" scope="col">등록년도</th>
        <th class="th-credit" scope="col">학기</th>
        <th class="th-division" scope="col">대학명</th>
        <th class="th-division" scope="col">이수구분</th>
        <th class="th-department" scope="col">학과</th>
        <th class="th-subject" scope="col">과목명</th>
        <th class="th-group" scope="col">분반</th>
        <th class="th-professor" scope="col">담당교수</th>
        <th class="th-credit" scope="col">학점</th>
        <th class="th-detail" scope="col">상세정보</th>
      </tr>
    </thead>
    <tbody id="subjectList">
    </tbody>
  </table>
</div>
<div class="paing-custom">
  <div id="pagingLayer" class="_paging"></div>
</div>
<!-- //검색 결과  -->
