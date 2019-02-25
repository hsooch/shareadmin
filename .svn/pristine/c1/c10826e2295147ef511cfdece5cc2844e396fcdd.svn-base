<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link href="${baseUrl}resources/homepage/css/common-custom.css" rel="stylesheet">
<link href="${baseUrl}resources/homepage/css/style.css" rel="stylesheet">
<link href="${baseUrl}resources/homepage/css/style-popup.css" rel="stylesheet">
<script type="text/javascript" src="${baseUrl}js/jquery.fileDownload.js"></script>

<script type="text/javascript">
    var baseUrl = '${baseUrl}';
    var usessionId = '<%=request.getParameter("USESSIONID")%>';
    var defaultParam = 'USESSIONID=' + usessionId;
    var userUnivCode = '${userSession.univCode}';
    var studentNumber = '${userSession.studentNumber}';
    var nowPage = 1;

    $.getScript('${baseUrl}js/jquery-paging.js').done(function() {


        $("#exchangeListPagingLayer").createPaging({
            totalCnt: 0,
            nowPage: nowPage,
            maxRowCnt: Number($("#selectRowCnt").val()),
            showPageCnt: 5,
            isHome: true,
            clickEvent: function(targetId, pageNum) {
                nowPage = pageNum;
                searchExchangeList();
            }
        });

        searchExchangeList();
    });

    function searchExchangeList() {
        var rowCnt = $("#selectRowCnt").val();
        var totalCnt = 0;
        var params = "&searchUserUniv=" + userUnivCode
            + "&searchStudentNumber=" + studentNumber
            + "&nowPage=" + nowPage
            + "&rowCnt=" + rowCnt;

        $.ajax({
            method: "GET",
            url: baseUrl + "exchange/getApplyExchangeUserList.ajax?" + defaultParam + params,
            dataType: "json"
        }).done(function (data) {
            console.log(data);
            var html = '';
            var exchangeListFieldObj = $("#exchangeListField");
            if (data.applyExchangeUserList && data.applyExchangeUserList.length) {
                totalCnt = data.applyExchangeUserList[0].totalCnt;
                data.applyExchangeUserList.forEach(function(info) {
                    var semesterStr = info.year + '년도 ' + info.semesterCodeName;
                    html += '<tr>'
                        + '<td class="td-check"><input type="checkbox"  /></td>'
                        + '<td class="td-time"><span class="tx-ellipsis">'+info.regDt+'</span></td>'
                        + '<td class="td-college"><span class="tx-ellipsis">'+info.univCodeName+'</span></td>'
                        + '<td class="td-quarter"><span class="tx-ellipsis">'+semesterStr+'</span></td>'
                        + '<td class="td-subjectt"><span class="tx-ellipsis">'+info.subjectName+'</span></td>'
                        + '<td class="td-credit"><span class="tx-ellipsis">'+info.subjectPoint+'</span></td>'
                        + '<td class="td-state">'+getStatusButtonElement(info.applyStatus, info.applyCancelStatus)+'</td>'
                        + '</tr>';
                });
            } else {
                html += '<tr><td colspan="7" class="no-result">'
                    + '<p class="tx-no-result">신청된 학점교류 과목이 없습니다.</p>'
                    + '</td></tr>';
            }

            exchangeListFieldObj.html('');
            exchangeListFieldObj.html(html);
            pagingUtils.changePaging('exchangeListPagingLayer', nowPage, totalCnt, Number(rowCnt));
        });
    }

    function getStatusButtonElement(applyStatus, cancelStatus) {
        var el = '';

        if (cancelStatus) {
            switch (cancelStatus) {
                case 1:
                    el = '취소 신청중';
                    break;
                case 2:
                case 4:
                    el = '취소 승인';
                    break;
                case 3:
                    el = '<button type="button"><span class="flag">취소 반려</span></button>';
                    break;
            }
        } else {
            switch (applyStatus) {
                case 1:
                    el = '신청중';
                    break;
                case 2:
                    el = '이관 대기';
                    break;
                case 3:
                case 6:
                    el = '<button type="button"><span class="flag">신청 반려</span></button>';
                    break;
                case 4:
                    el = '이관 완료';
                    break;
                case 5:
                    el = '승인';
                    break;
            }
        }

        return el;
    }

</script>


<div class="subject-list-wrap">
    <p class="tx-result al-left">※ 본 페이지의 신청관련 내역은 고객님 소속대학에서 처리되는 상태를 나타냅니다.<br>최종 교류대학 학점교류 수강신청 결과는 마이페이지 &gt; 학점교류 승인내역 에서 확인할 수 있습니다.
    </p>
    <p class="tx-result al-left">※ <em class="tx-point">교류대학명을 클릭하여 </em>필요한 제출서류를 출력 또는 다운로드 받아 제출하여 승인 받아야 합니다.</p>
    <div class="line-wrap top-insert">
        <!-- 10개씩 보기 -->
        <div class="al-right">
            <label for="selectRowCnt" class="hide">리스트 갯수</label>
            <select name="" id="selectRowCnt" class="select">
                <option value="10">10개씩</option>
                <option value="20">20개씩</option>
            </select>
        </div>
        <!-- //10개씩 보기 -->
    </div>
    <!-- 학점교류 신청내력 -->
    <div class="result-tb-list">
        <table class="tb-list">
            <caption>학점교류신청 리스트</caption>
            <thead>
            <tr>
                <th class="th-check" scope="col">
                    <label for="all-check">
                        <input type="checkbox" id="all-check" onclick="$('#exchangeListField > tr > .td-check > input[type=checkbox]').prop('checked', this.checked);" />선택
                    </label>
                </th>
                <th class="th-time" scope="col">신청일</th>
                <th class="th-college" scope="col">교류대학</th>
                <th class="th-quarter" scope="col">학기</th>
                <th class="th-subject" scope="col">신청과목</th>
                <th class="th-credit" scope="col">학점</th>
                <th class="th-state" scope="col">상태</th>
            </tr>
            </thead>
            <tbody id="exchangeListField">
            <tr>
                <td class="td-check"><input type="checkbox"  /></td>
                <td class="td-time"><span class="tx-ellipsis">2018. 02. 20  17:44</span></td>
                <td class="td-college"><span class="tx-ellipsis">서울여자대학교</span></td>
                <td class="td-quarter"><span class="tx-ellipsis">2018년도 제2학기</span></td>
                <td class="td-subjectt"><span class="tx-ellipsis">소프트웨어/DB 공학개론 외 3과목 </span></td>
                <td class="td-credit"><span class="tx-ellipsis">2</span></td>
                <td class="td-state"><button type="button"><span class="flag">신청중</span></button></td>
            </tr>
            <tr>
                <td class="td-check"><input type="checkbox" /></td>
                <td class="td-time"><span class="tx-ellipsis">2018. 02. 20  17:44</span></td>
                <td class="td-college"><span class="tx-ellipsis">서울여자대학교</span></td>
                <td class="td-quarter"><span class="tx-ellipsis">2018년도 제2학기</span></td>
                <td class="td-subjectt"><span class="tx-ellipsis">소프트웨어/DB 공학개론 외 3과목 </span></td>
                <td class="td-credit"><span class="tx-ellipsis">2</span></td>
                <td class="td-state"><button type="button"><span class="flag">신청반려</span></button></td>
            </tr>
            <tr>
                <td class="td-check"><input type="checkbox" /></td>
                <td class="td-time"><span class="tx-ellipsis">2018. 02. 20  17:44</span></td>
                <td class="td-college"><span class="tx-ellipsis">서울여자대학교</span></td>
                <td class="td-quarter"><span class="tx-ellipsis">2018년도 제2학기</span></td>
                <td class="td-subjectt"><span class="tx-ellipsis">소프트웨어/DB 공학개론 외 3과목 </span></td>
                <td class="td-credit"><span class="tx-ellipsis">2</span></td>
                <td class="td-state"><button type="button"><span class="flag">이관대기</span></button></td>
            </tr>
            <tr>
                <td class="td-check"><input type="checkbox" /></td>
                <td class="td-time"><span class="tx-ellipsis">2018. 02. 20  17:44</span></td>
                <td class="td-college"><span class="tx-ellipsis">서울여자대학교</span></td>
                <td class="td-quarter"><span class="tx-ellipsis">2018년도 제2학기</span></td>
                <td class="td-subjectt"><span class="tx-ellipsis">소프트웨어/DB 공학개론 외 3과목 </span></td>
                <td class="td-credit"><span class="tx-ellipsis">2</span></td>
                <td class="td-state"><button type="button"><span class="flag">이관완료</span></button></td>
            </tr>
            <tr>
                <td class="td-check"><input type="checkbox" id=""  /></td>
                <td class="td-time"><span class="tx-ellipsis">2018. 02. 20  17:44</span></td>
                <td class="td-college"><span class="tx-ellipsis">서울여자대학교</span></td>
                <td class="td-quarter"><span class="tx-ellipsis">2018년도 제2학기</span></td>
                <td class="td-subjectt"><span class="tx-ellipsis">소프트웨어/DB 공학개론 외 3과목 </span></td>
                <td class="td-credit"><span class="tx-ellipsis">2</span></td>
                <td class="td-state"><button type="button"><span class="flag">승인</span></button></td>
            </tr>
            <tr>
                <td class="td-check"><input type="checkbox" id=""  /></td>
                <td class="td-time"><span class="tx-ellipsis">2018. 02. 20  17:44</span></td>
                <td class="td-college"><span class="tx-ellipsis">서울여자대학교</span></td>
                <td class="td-quarter"><span class="tx-ellipsis">2018년도 제2학기</span></td>
                <td class="td-subjectt"><span class="tx-ellipsis">소프트웨어/DB 공학개론 외 3과목 </span></td>
                <td class="td-credit"><span class="tx-ellipsis">2</span></td>
                <td class="td-state"><button type="button"><span class="flag">취소신청중</span></button></td>
            </tr>
            <tr>
                <td class="td-check"><input type="checkbox" id=""  /></td>
                <td class="td-time"><span class="tx-ellipsis">2018. 02. 20  17:44</span></td>
                <td class="td-college"><span class="tx-ellipsis">서울여자대학교</span></td>
                <td class="td-quarter"><span class="tx-ellipsis">2018년도 제2학기</span></td>
                <td class="td-subjectt"><span class="tx-ellipsis">소프트웨어/DB 공학개론 외 3과목 </span></td>
                <td class="td-credit"><span class="tx-ellipsis">2</span></td>
                <td class="td-state"><button type="button"><span class="flag">신청중</span></button></td>
            </tr>
            <tr>
                <td class="td-check"><input type="checkbox" id=""  /></td>
                <td class="td-time"><span class="tx-ellipsis">2018. 02. 20  17:44</span></td>
                <td class="td-college"><span class="tx-ellipsis">서울여자대학교</span></td>
                <td class="td-quarter"><span class="tx-ellipsis">2018년도 제2학기</span></td>
                <td class="td-subjectt"><span class="tx-ellipsis">소프트웨어/DB 공학개론 외 3과목 </span></td>
                <td class="td-credit"><span class="tx-ellipsis">2</span></td>
                <td class="td-state"><button type="button"><span class="flag">취소승인</span></button></td>
            </tr>
            <tr>
                <td class="td-check"><input type="checkbox" id=""  /></td>
                <td class="td-time"><span class="tx-ellipsis">2018. 02. 20  17:44</span></td>
                <td class="td-college"><span class="tx-ellipsis">서울여자대학교</span></td>
                <td class="td-quarter"><span class="tx-ellipsis">2018년도 제2학기</span></td>
                <td class="td-subjectt"><span class="tx-ellipsis">소프트웨어/DB 공학개론 외 3과목 </span></td>
                <td class="td-credit"><span class="tx-ellipsis">2</span></td>
                <td class="td-state"><button type="button"><span class="flag">취소반려</span></button></td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="paing-custom">
        <div class="_paging " id="exchangeListPagingLayer">
        </div>
    </div>
    <!-- //학점교류 신청내력  -->

    <div class="btn-side top-insert" style="display: inline-block; position: absolute; margin-top: -45px;">
        <span class="btn-custom btn-navy btn-mini fl-left"><input type="submit" value="신청 취소 "></span>
    </div>

</div>