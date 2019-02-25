<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<link href="${baseUrl}resources/homepage/css/common-custom.css" rel="stylesheet">
<link href="${baseUrl}resources/homepage/css/style.css" rel="stylesheet">
<link href="${baseUrl}resources/homepage/css/style-popup.css" rel="stylesheet">
<script type="text/javascript" src="${baseUrl}js/jquery-paging.js"></script>
<script type="text/javascript" src="${baseUrl}js/jquery.fileDownload.js"></script>

<script type="text/javascript">
    var baseUrl = '${baseUrl}';
    var usessionId = '<%=request.getParameter("USESSIONID")%>';
    var defaultParam = 'USESSIONID=' + usessionId;
    var nowPage = 1;
    var userType = '${userType}';
    var isFirstLoad = true;

    function getHopeRegCntInfo() {
        $.ajax({
            method: "GET",
            url: baseUrl + "exchange/hope/getHopeRegCntInfo.ajax?" + defaultParam,
            dataType: "json"

        }).done(function (data) {
            $("#univCntField").text(data.regInfo.univCnt);
            $("#subjectCntField").text(data.regInfo.semesterCnt);
            $("#userNameField").text(data.userName);
        });
    }

    function getHopeUnivList() {
        $.ajax({
            method: "GET",
            url: baseUrl + "exchange/hope/getHopeUnivList.ajax?" + defaultParam,
            dataType: "json"

        }).done(function (data) {
            var html = '';
            data.univList.forEach(function (univ) {
                html += "<option value='"+univ.univCode+"'>" + univ.codeName + "</option>";
            });

            $("#selectUnivField").html(html);
            getHopeSemesterList();
        });
    }

    function getHopeSemesterList() {
        var params = "&univCode=" + $("#selectUnivField").val();
        $.ajax({
            method: "GET",
            url: baseUrl + "exchange/hope/getHopeSemesterList.ajax?" + defaultParam + params,
            dataType: "json"

        }).done(function (data) {
            var html = '';
            data.semesterList.forEach(function (semester) {
                html += "<option value='"+semester.year+"_"+semester.semesterCode+"'>" + semester.codeName + "</option>";
            });

            $("#selectSemesterField").html(html);
            initPageNum();
        });

    }

    function initPageNum() {
        nowPage = 1;
        search();
    }

    function search() {
        var semesters = $("#selectSemesterField").val().split('_');
        var params = "&univCode=" + $("#selectUnivField").val()
            + "&year=" + semesters[0]
            + "&semesterCode=" + semesters[1]
            + "&nowPage=" + nowPage
            + "&rowCnt=" + $("#rowCntField").val();


        $.ajax({
            method: "GET",
            url: baseUrl + "exchange/hope/getHopeSubjectList.ajax?" + defaultParam + params,
            dataType: "json"

        }).done(function (data) {
            console.log(data);
            printRecord(data);
        });
    }

    function printRecord(data) {
        var html = '';
        var totalCnt = 0;
        if (data.hopeSubjectList) {
            totalCnt = data.hopeSubjectList[0].totalCnt;
            data.hopeSubjectList.forEach(function (info) {
                var maxApplyCntStr = info.applyCnt + '/' + info.maxClassCnt;
                var showDetailParam = "'"+info.univCode+"', '"+info.year+"', '"+info.semesterCode+"', '"+info.subjectNum+"', '"+info.classNum+"'";

                html += '<tr id="">'
                    + '<td class="td-check">'
                        + '<input type="checkbox" />'
                        + '<input type="hidden" name="univCode" value="'+info.univCode+'" />'
                        + '<input type="hidden" name="year" value="'+info.year+'" />'
                        + '<input type="hidden" name="semesterCode" value="'+info.semesterCode+'" />'
                        + '<input type="hidden" name="subjectNum" value="'+info.subjectNum+'" />'
                        + '<input type="hidden" name="classNum" value="'+info.classNum+'" />'
                    + '</td>'
                    + '<td class="td-division"><span class="tx-ellipsis">'+info.completeType+'</span></td>'
                    + '<td class="td-department"><span class="tx-ellipsis">'+info.department+'</span></td>'
                    + '<td class="td-subject"><span class="tx-ellipsis">'+info.subjectName+'</span></td>'
                    + '<td class="td-group"><span class="tx-ellipsis">'+info.classNum+'</span></td>'
                    + '<td class="td-professor"><span class="tx-ellipsis">'+info.teacherName+'</span></td>'
                    + '<td class="td-time"><ul>';
                if (info.timeList) {
                    info.timeList.forEach(function (time) {
                        html += '<li>['+time.dayOfWeekName+'] '+time.startTimeHour+':'+time.startTimeMinute
                            + '~'+time.endTimeHour+':'+time.endTimeMinute+'</li>';
                    })
                }
                html += '<td class="td-credit"><span class="tx-ellipsis">'+info.subjectPoint+'</span></td>'
                    + '<td class="td-capacity"><span class="tx-ellipsis">'+maxApplyCntStr+'</span></td>'
                    + '<td class="td-detail">'
                        + '<span class="btn-custom btn-navy btn-mini"><input type="submit" class="" value="보기" onclick="showDetail('+showDetailParam+')"></span>'
                    + '</td>'
                    + '</tr>'
            });
        } else {
            html += '<td colspan="10" class="no-result">'
                + '<p class="tx-no-result">※ 등록한 과목이 없습니다. </p>'
                + '</td>';
        }


        $("#rowBodyLayer").html(html);
        if (isFirstLoad) {
            $("#pagingLayer").createPaging({
                totalCnt: totalCnt,
                nowPage: nowPage,
                maxRowCnt: Number($("#rowCntField").val()),
                showPageCnt: 5,
                isHome: true,
                clickEvent: function(targetId, pageNum) {
                    nowPage = pageNum;
                    search();
                }
            });
            isFirstLoad = false;
        } else {
            pagingUtils.changePaging('pagingLayer', nowPage, totalCnt, Number($("#rowCntField").val()));
        }
    }

    $(".subject-list-wrap").ready(function () {
        getHopeRegCntInfo();
        getHopeUnivList();
    });

    function showDetail(univCode, year, semesterCode, subjectNum, classNum) {
        console.log(arguments);
        var params = "&univCode=" + univCode
            + "&year=" + year
            + "&semesterCode=" + semesterCode
            + "&subjectNum=" + subjectNum
            + "&classNum=" + classNum;

        $.ajax({
            method: "GET",
            url: baseUrl + "subject/getSubjectInfo.ajax?" + defaultParam + params,
            dataType: "json"

        }).done(function (data) {
            $("#detailCompleteType").text(data.subjectInfo.completeType);
            $("#detailDepartment").text(data.subjectInfo.department);
            $("#detailSubjectName").text(data.subjectInfo.subjectName);
            $("#detailClassNum").text(data.subjectInfo.classNum);
            $("#detailTeacherName").text(data.subjectInfo.teacherName);
            $("#detailSubjectPoint").text(data.subjectInfo.subjectPoint + '학점');

            var timeHtml = '<dt>강의시간:</dt>';

            data.subjectInfo.timeList.forEach(function(time) {
                timeHtml += '<dd>'+time.dayOfWeekName+' '+time.startTimeHour+':'+time.startTimeMinute+' ~ '+time.endTimeHour+':'+time.endTimeMinute
                    +' <span>['+time.classRoom+']</span></dd>';
            });
            $("#detailTimeLayer").html(timeHtml);
            if (data.subjectInfo.curriculumUrl) {
                $("#detailDownUrlField").show();
                $("#detailDownUrlField").click(function() {
                    $.fileDownload(data.subjectInfo.curriculumUrl);
                });
            } else {
                $("#detailDownUrlField").hide();
            }

            $("#detailPopupLayer").show();
        });
    }

    function hopeDelete() {
        var params = {
            hopeList: []
        };

        $(".td-check > input[type=checkbox]").each(function() {
            if (this.checked) {
                params.hopeList.push({
                    univCode: $(this).nextAll("input[name='univCode']").val(),
                    year: $(this).nextAll("input[name='year']").val(),
                    semesterCode: $(this).nextAll("input[name='semesterCode']").val(),
                    subjectNum: $(this).nextAll("input[name='subjectNum']").val(),
                    classNum: $(this).nextAll("input[name='classNum']").val()
                });
            }
        });

        if (params.hopeList.length) {
            confirm('정말 삭제하시겠습니까? 삭제된 과목은 복구되지 않고, 다시 희망과목 등록을 원하실 경우 과목을 추가하셔야 합니다.', function() {
                $.ajax({
                    method: "POST",
                    url: baseUrl + "exchange/hope/deleteHopeSubject.ajax?" + defaultParam,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(params)
                }).done(function () {
                    search();
                });
            });
        } else {
            alert('삭제할 과목을 선택하여 주세요.');
        }
    }

</script>

<div class="subject-list-wrap">
    <h4 class="tit-round no-line">희망과목이란?</h4>
    <p class="tx-description">
        학점교류협약된 전체 대학의 학점교류신청 가능한 과목을 검색하고 선택하여 <span class="tx-line"> 미리 장바구니 형태로 담아두는 것,</span> 즉 학점교류대학에 수강하고자 하는 ‘희망’ 과목을 말합니다.
        학점교류대학별 희망과목을 저장해 두면 학점교류신청시 <span class="tx-line">자동으로 선택목록에 등록</span>이 됩니다.
        <em> ※ 현재 마감중이 아닌 과목도 신청절차를 거치는 도중에 마감될 수 있습니다.</em>
    </p>
    <p class="tx-result al-left">※ <span id="userNameField"></span> 님은  <strong><span id="univCntField"></span> 대학 <span id="subjectCntField"></span>과목</strong>을 선택 하셨습니다. 대학을 선택하면 희망과목 신청목록이 나타납니다.</p>

    <div class="line-wrap">
        <div class="al-left">
            <label for="selectUnivField" class="hide">희망과목 선택 대학 리스트</label>
            <select name="" id="selectUnivField" class="select" onchange="getHopeSemesterList();"></select>
            <label for="selectSemesterField" class="hide">희망과목 선택 대학 리스트</label>
            <select name="" id="selectSemesterField" class="select" onchange="initPageNum();"></select>
        </div>
        <!-- 10개씩 보기 -->
        <div class="al-right">
            <label for="rowCntField" class="hide">리스트 갯수</label>
            <select name="" id="rowCntField" class="select" onchange="search();">
                <option value="10">10개씩</option>
                <option value="20">20개씩</option>
            </select>

        </div>
        <!-- //10개씩 보기 -->
    </div>
    <!-- 희망과목 신청목록 -->
    <div class="search-tb-list ">
        <table class="tb-list">
            <caption>학점교류신청 리스트</caption>
            <thead>
            <tr>
                <th class="th-check" scope="col"><label for="all-check">
                    <input type="checkbox" id="all-check"  onclick="$('.td-check > input[type=checkbox]').prop('checked', this.checked);"/>선택 </label>
                </th>
                <th class="th-division" scope="col">이수구분</th>
                <th class="th-department" scope="col">학과</th>
                <th class="th-subject" scope="col">과목명</th>
                <th class="th-group" scope="col">분반</th>
                <th class="th-professor" scope="col">담당교수</th>
                <th class="th-time" scope="col">강의시간</th>
                <th class="th-credit" scope="col">학점</th>
                <th class="th-capacity" scope="col">인원</th>
                <th class="th-detail" scope="col">상세정보</th>
            </tr>
            </thead>
            <tbody id="rowBodyLayer">
            </tbody>
        </table>
    </div>
    <div class="paing-custom">
        <div class="_paging " id="pagingLayer">
        </div>
    </div>
    <!-- //희망과목 신청목록  -->

    <div class="btn-side">
        <span class="btn-custom btn-navy btn-mini fl-left"><input type="submit" value="선택삭제 " onclick="hopeDelete();"></span>
    </div>

    <div class="btn-area center">
        <span class="btn-custom btn-navy"><input type="submit" value="신청 바로가기" onclick="alert('준비중...');"></span>
    </div>

    <!-- 상세 정보 보기 레이어 팝업 -->
    <div class="layer-wrap" style="display: none;" id="detailPopupLayer">
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
                            <dd id="detailCompleteType"></dd>
                        </dl>
                        <dl class="info_list">
                            <dt>학과명:</dt>
                            <dd id="detailDepartment"></dd>
                        </dl>
                        <dl class="info_list">
                            <dt>과목명:</dt>
                            <dd id="detailSubjectName"></dd>
                        </dl>
                        <dl class="info_list">
                            <dt>분반:</dt>
                            <dd id="detailClassNum"></dd>
                        </dl>
                        <dl class="info_list">
                            <dt>대표교수:</dt>
                            <dd id="detailTeacherName"></dd>
                        </dl>
                        <dl class="info_list type2" id="detailTimeLayer">
                        </dl>
                        <dl class="info_list">
                            <dt>학점:</dt>
                            <dd id="detailSubjectPoint"></dd>
                        </dl>
                        <div class="btn-area">
                            <span class="btn-custom btn-down" id="detailDownUrlField"><input type="submit" value="수업계획서 다운로드"></span>
                            <span class="btn-custom btn-navy"><input type="submit" value="확인" onclick="$('#detailPopupLayer').hide();"></span>
                        </div>
                    </div>
                    <!-- //layer container -->
                </div>
            </div>
        </div>
    </div>
    <!--// 상세 정보 보기 레이어 팝업 -->
</div>