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
    var univCode = '${userSession.univCode}';
    var defaultParam = 'USESSIONID=' + usessionId;
    var mouNameMapping = [];
    var step2NowPage = 1;
    var hasHopeSubject = 'N';
    var tempUnivCode = '';

    var selectUnivCode = '';
    var selectYear = '';
    var selectSemesterCode = '';

    function getSemesterList() {
        var selectSemesterFieldObj = $("#selectSemesterField");
        var params = "&searchDisplayYn=Y"
            + "&searchSemesterStatus=accepting"
            + "&isRequiredDoc=Y"
            + "&isGroupBySemester=Y"
            + "&isPaging=N";
        $.ajax({
            method: "GET",
            url: baseUrl + "semester/getSemesterListWithGuide.ajax?" + defaultParam + params,
            dataType: "json"
        }).done(function (data) {
            if (data.semesterListWithGuide.length) {
                var html = '';
                data.semesterListWithGuide.forEach(function(info) {
                    var value = info.year + '_' + info.semesterCode;
                    var name = info.year + '년 ' + info.semesterCodeName;
                    html += '<option value="' + value + '">' + name + '</option>';
                });

                selectSemesterFieldObj.html(html);
            } else {
                selectSemesterFieldObj.hide();
            }
        });
    }

    function getMouUniversityList() {
        var params = "&univCode=" + univCode;
        console.log('params => ', params);
        $.ajax({
            method: "GET",
            url: baseUrl + "university/mou/getMouUnivList.ajax?" + defaultParam + params,
            dataType: "json"
        }).done(function (data) {
            console.log(data);
            setTimeout(function() {printMouListForPC(data.mouList);}, 0);
            setTimeout(function() {printMouListForMobile(data.mouList);}, 0);
            setTimeout(function() {printMouListForStep2(data.mouList);}, 0);
            if (data.mouList && data.mouList.length) {
                data.mouList.forEach(function(mou) {
                    mouNameMapping[mou.mouUnivCode] = mou;
                });
            }
        });
    }

    function printMouListForPC(mouList) {
        var html = '';
        if (mouList && mouList.length) {
            var sellCnt = 0;
            $(mouList).each(function(index, mou) {
                if (index === 0) {
                    html += '<li><ul>';
                } else if (index % 16 === 0) {
                    html += '</ul></li><li><ul>';
                    sellCnt = 0;
                }

                if (sellCnt < 4) {
                    html += '<li class="blue"';
                } else if (sellCnt < 8) {
                    html += '<li class="mint"';
                } else if (sellCnt < 12) {
                    html += '<li class="orange"';
                } else {
                    html += '<li class="gray"';
                }

                html += ' onclick="changeUniversity(this);" style="cursor:pointer;">'
                    + '<p>'+mou.mouUnivName+'</p><input type="hidden" name="univCode" value="'+mou.mouUnivCode+'" /></li>';
                sellCnt++;
            });
            html += '</ul></li>';
        }

        $("#step1MouUnivListField").html(html);

        $.getScript('${baseUrl}resources/homepage/js/jquery.bxslider.js').done(function() {
            $('.list_slide').bxSlider({
                mode : 'horizontal',
                speed:500,
                controls:true,
                pager:true,
                auto : false,
                infiniteLoop: true,
                hideControlOnEnd: true ,
                autoHover :true
            });
        });
    }

    function printMouListForMobile(mouList) {
        var html = '<option value="">대학 선택</option>';

        if (mouList) {
            mouList.forEach(function(mou) {
                html += '<option value="'+mou.mouUnivCode+'">'+mou.mouUnivName+'</option>'
            });
        }

        $("#mobileSelectMouList").html(html);
    }

    function printMouListForStep2(mouList) {
        var html = '';
        var initSelectMou = {};
        var ulObj = $("#step2MouListField");

        if (mouList && mouList.length) {
            for(var index = 0; index < mouList.length; index++) {
                html += '<li><a style="cursor: pointer;" onclick="changeUniversity(this);">'+mouList[index].mouUnivName
                    + '</a><input type="hidden" name="univCode" value="'+mouList[index].mouUnivCode+'" />'
                    + '<input type="hidden" name="univName" value="'+mouList[index].mouUnivName+'" /></li>';
                if (index === 0) {
                    initSelectMou.mouUnivCode = mouList[index].mouUnivCode;
                    initSelectMou.mouUnivName = mouList[index].mouUnivName;
                }

            }
        }

        ulObj.html(html);

        if (html) {
            $("#step2MouSelectField").html(initSelectMou.mouUnivName
                + '<input type="hidden" value="'+initSelectMou.mouUnivCode+'" />');
        }

    }

    function changeUniversity(obj) {
        var tagName = obj.tagName.toUpperCase();
        var selectedUnivCode;

        if ("LI" === tagName) {
            selectedUnivCode = $(obj).children("input").val();
        } else if ("SELECT" === tagName) {
            selectedUnivCode = obj.value;
        }

        if ("LI" === tagName || "SELECT" === tagName) {
            if (selectedUnivCode) {
                getSemesterGuideInfo(selectedUnivCode);
                var selectedUnivName = mouNameMapping[selectedUnivCode].mouUnivName;
                $("#step2MouSelectField").html(selectedUnivName
                    + '<input type="hidden" value="' + selectedUnivCode + '" />');
                $("#step1SelectedUniversityField").html('<strong>' + selectedUnivName + '</strong>');
            } else {
                $("#viewDocField").html("");
            }
        } else {
            var univCode = $(obj).next().val();
            var univName = $(obj).next().next().val();
            $("#step2MouSelectField").html(univName
                + '<input type="hidden" value="' + univCode + '" />');
        }

        if ("LI" === tagName) {
            $("#mobileSelectMouList").val(selectedUnivCode);
        } else if ("SELECT" === tagName) {
            if (selectedUnivCode) {
                $("#step1SelectedUniversityField").html('<strong>' + mouNameMapping[selectedUnivCode].mouUnivName + '</strong>');
            }
        }
    }

    function getSemesterGuideInfo(univCode) {
        var semesterSelectVal = $("#selectSemesterField").val();
        var year = '';
        var semesterCode = '';
        if (semesterSelectVal) {
            var temps = semesterSelectVal.split('_');
            if (temps.length === 2) {
                year = temps[0];
                semesterCode = temps[1];
            }
        }

        var viewDocFieldObj = $("#viewDocField");

        if (year && semesterCode && univCode) {
            getGuideInfo(univCode, year, semesterCode, function(data) {
                if (data.resultCode === "0" && data.semesterInfo) {
                    viewDocFieldObj.html(data.semesterInfo.contents)
                } else {
                    viewDocFieldObj.html("");
                }
            });
        } else {
            viewDocFieldObj.html("");
        }
    }

    function getGuideInfo(univCode, year, semesterCode, callBack) {
        var params = "&univCode=" + univCode
            + "&year=" + year
            + "&semesterCode=" + semesterCode
            + "&docType=1";
        $.ajax({
            method: "GET",
            url: baseUrl + "semester/getGuideInfo.ajax?" + defaultParam + params,
            dataType: "json"
        }).done(function (data) {
            callBack(data);
        });
    }

    function changeDayOfWeek(obj) {
        var dayOfWeek = $(obj).next().val();
        console.log('dayOfWeek =>', dayOfWeek);
        $("#dayOfWeekSelectField").html($(obj).text()
            + '<input type="hidden" value="'+dayOfWeek+'" />'
        );
    }

    function searchHopeSubjectList() {
        var params = "&univCode=" + $("#step2MouSelectField > input").val()
            + "&year=" + selectYear
            + "&semesterCode=" + selectSemesterCode
            + "&isPaging=N";

        $.ajax({
            method: "GET",
            url: baseUrl + "exchange/hope/getHopeSubjectList.ajax?" + defaultParam + params,
            dataType: "json"

        }).done(function (data) {
            console.log("hope => ", data);
            $("#step2SelectSubjectField").html(setRecode(data.hopeSubjectList, 2));
            setCountSummaryInfo();
        });
    }

    function searchSubjectList() {
        var univCode = $("#step2MouSelectField > input").val();
        if (tempUnivCode !== univCode) {
            tempUnivCode = univCode;
            searchHopeSubjectList();
        }

        $.ajax({
            method: "POST",
            url: baseUrl + "subject/getSubjectList.ajax?" + defaultParam,
            dataType: "json",
            data: {
                searchUniv: univCode,
                searchYear: selectYear,
                searchSemesterCode: selectSemesterCode,
                searchCompleteType: $("#completeTypeField").val(),
                searchDepartment: $("#departmentField").val(),
                searchTeacherName: $("#teacherNameField").val(),
                searchSubjectName: $("#subjectNameField").val(),
                searchDayOfWeek: $("#dayOfWeekSelectField > input").val(),
                rowCnt: $("#step2RowCntField").val(),
                nowPage: step2NowPage,
                useExchangeCnt: 'Y'
            }
        }).done(function (data) {
            console.log(data);
            var html = setRecode(data.subjectList, 1);
            var totalCnt = 0;
            if (data.subjectList.length) {
                totalCnt = data.subjectList[0].totalCnt;
            }

            $("#subjectListField").html(html);
            pagingUtils.changePaging('step2PagingLayer', step2NowPage, totalCnt, Number($("#step2RowCntField").val()));
        });
    }

    function setRecode(subjectList, type) {
        var html = '';
        if (subjectList && subjectList.length) {
            subjectList.forEach(function(subject) {
                html += '<tr>'
                    + '<input type="hidden" name="subjectNum" value="'+subject.subjectNum+'" />'
                    + '<input type="hidden" name="classNum" value="'+subject.classNum+'" />'
                    + '<input type="hidden" name="univCode" value="'+subject.univCode+'" />'
                    + '<td class="td-check"><input type="checkbox" /></td>'
                    + '<td class="td-division"><span class="tx-ellipsis">'+subject.completeType+'</span></td>'
                    + '<td class="td-department"><span class="tx-ellipsis">'+subject.department+'</span></td>'
                    + '<td class="td-subject"><span class="tx-ellipsis">'+subject.subjectName+'</span></td>'
                    + '<td class="td-group"><span class="tx-ellipsis">'+subject.classNum+'</span></td>'
                    + '<td class="td-professor"><span class="tx-ellipsis">'+subject.teacherName+'</span></td>'
                    + '<td class="td-time"><ul>';
                if (subject.timeList.length) {
                    subject.timeList.forEach(function(time) {
                        var timeStr = time.startTimeHour + ':' + time.startTimeMinute + '~'
                            + time.endTimeHour + ':' + time.endTimeMinute;
                        html += '<li>['+time.dayOfWeekName+'] '+timeStr+'</li>';
                    });

                }
                html += '</ul></td>'
                    + '<td class="td-credit"><span class="tx-ellipsis">'+subject.subjectPoint+'</span></td>'
                    + '<td class="td-capacity"><span class="tx-ellipsis">'+subject.applyCnt+'/'+subject.maxClassCnt+'</span></td>'
                    + '<td class="td-detail">'
                    + '<span class="btn-custom btn-navy btn-mini">'
                    + '<input type="submit" value="보기" onclick="showDetail(this);"></span>'
                    + '</td>'
            });
        } else {
            if (type === 1) {
                html += '<tr><td colspan="10" class="no-result">'
                    + '<p class="tx-no-result">※ 현재 신청 가능한 과목이 없습니다. </p>'
                    + '</td></tr>';
            } else {
                html += '<tr><td colspan="10" class="no-result">'
                    + '<p class="tx-no-result">※ 선택한 과목이 없습니다. </p>'
                    + '</td></tr>';
            }
        }

        return html;
    }

    function clearStep2Data() {
        $("#completeTypeField").val('');
        $("#departmentField").val('');
        $("#teacherNameField").val('');
        $("#subjectNameField").val('');
        $("#dayOfWeekSelectField").html('요일선택'
            + '<input type="hidden" value="" />'
        );
        step2NowPage = 1;
    }

    function showDetail(obj) {
        var trObj = $(obj).parents("tr");

        var params = "&univCode=" + $("#step2MouSelectField > input").val()
            + "&year=" + selectYear
            + "&semesterCode=" + selectSemesterCode
            + "&subjectNum=" + trObj.children("input[name='subjectNum']").val()
            + "&classNum=" + trObj.children("input[name='classNum']").val();

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

    function addSelectSubjet() {
        var subjectList = $("#subjectListField > tr > .td-check > input:checked");
        var step2SelectSubjectObj = $("#step2SelectSubjectField");
        var step2SelectSubjectTrs = step2SelectSubjectObj.children("tr");

        if (subjectList.length) {
            if (step2SelectSubjectObj.find("tr > .no-result").length) {
                step2SelectSubjectObj.html("");
            }

            subjectList.each(function(index, subject) {
                var oriTrObj = $(subject).parents("tr");
                var oriUnivCode = oriTrObj.children("input[name='univCode']").val();
                var oriSubjectNum = oriTrObj.children("input[name='subjectNum']").val();
                var oriClassNum = oriTrObj.children("input[name='classNum']").val();
                var isDuplication = false;
                step2SelectSubjectTrs.each(function(trIndex, tr) {
                    var seUnivCode = $(tr).children("input[name='univCode']").val();
                    var seSubjectNum = $(tr).children("input[name='subjectNum']").val();
                    var seClassNum = $(tr).children("input[name='classNum']").val();
                    if (oriUnivCode === seUnivCode && oriSubjectNum === seSubjectNum && oriClassNum === seClassNum) {
                        isDuplication = true;
                        alert('선택과목 리스트 동일한 과목이 존재합니다.');
                        return false;
                    }
                });

                if (!isDuplication) {
                    step2SelectSubjectObj.append($(subject).parents("tr").outerHTML());
                }
            });
        } else {
            alert('추가할 과목을 선택하여 주세요');
            return;
        }

        setCountSummaryInfo();
    }

    function removeStep2SelectSubjet() {
        var step2SelectSubjectFieldObj = $("#step2SelectSubjectField");
        var subjectList = step2SelectSubjectFieldObj.find("tr > .td-check > input:checked");

        if (subjectList.length) {
            subjectList.each(function(index, ckInput) {
                var tr = $(ckInput).parents("tr");
                tr.remove();
            });
        } else {
            alert('삭제할 과목을 선택하여 주세요.');
            return;
        }

        if (step2SelectSubjectFieldObj.find("tr").length === 0) {
            step2SelectSubjectFieldObj.append('<tr>'
                + '<td class="no-result" colspan="10">\n'
                + '<p class="tx-no-result">※ 선택한 과목이 없습니다. </p>'
                + '</td>'
                + '</tr>');
        }

        setCountSummaryInfo();
    }

    function removeStep3SelectSubjet() {
        var step3SelectSubjectFieldObj = $("#step3SelectSubjectField");
        var subjectList = step3SelectSubjectFieldObj.find("tr > .td-check > input:checked");

        if (subjectList.length) {
            subjectList.each(function(index, ckInput) {
                var tr = $(ckInput).parents("tr");
                tr.remove();
            });
        } else {
            alert('삭제할 과목을 선택하여 주세요.');
            return;
        }

        if (step3SelectSubjectFieldObj.find("tr").length === 0) {
            step3SelectSubjectFieldObj.append('<tr>'
                + '<td class="no-result" colspan="10">\n'
                + '<p class="tx-no-result">※ 선택한 과목이 없습니다. </p>'
                + '</td>'
                + '</tr>');
        }
    }

    function setCountSummaryInfo() {
        var step2checkTd = $("#step2SelectSubjectField").find("tr > .td-check");
        var cntSubject = step2checkTd.length;
        var sumPoint = 0;
        if (cntSubject) {
            step2checkTd.each(function(index, ckTd) {
                var pointStr = $(ckTd).parents("tr").find(".td-credit > span").text();
                sumPoint += Number(pointStr);
            });

            $("#selectSubjectCnt").text(cntSubject);
            $("#selectSubjectPoint").text(sumPoint);
            $("#countSummaryField").show();
        } else {
            $("#countSummaryField").hide();
        }
    }
    
    function saveHopeSubjectCheck() {
        if (hasHopeSubject === 'Y') {
            confirm("기존에 저장한 희망과목이 있습니다.\n저장하시겠습니까?\n저장 시 기존 희망과목은 사라집니다.", function() {
                saveHopeSubject();
            });
        } else {
            saveHopeSubject();
        }
    }

    function saveHopeSubject() {
        var step2checkTd = $("#step2SelectSubjectField").find("tr > .td-check");
        if (step2checkTd.length) {
            var data = {
                univCode: tempUnivCode,
                year: selectYear,
                semesterCode: selectSemesterCode,
                subjectList: []
            };

            step2checkTd.each(function(tdIndex, td) {
                var trObj = $(td).parent("tr");
                var subjectObj = {};
                subjectObj.subjectNum = trObj.find("input[name='subjectNum']").val();
                subjectObj.classNum = trObj.find("input[name='classNum']").val();
                data.subjectList.push(subjectObj);
            });

            $.ajax({
                method: "POST",
                url: baseUrl + "exchange/hope/saveHopeSubject.ajax?" + defaultParam,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).done(function () {
                alert('저장되었습니다.');
            });

        } else {
            alert('과목을 먼저 선택해 주세요.');
        }
    }

    function setGuideFileList() {
        getGuideInfo(tempUnivCode, selectYear, selectSemesterCode, function(data) {
            if (data.resultCode === "0" && data.semesterInfo) {
                var html = '';
                if (data.semesterInfo.fileList.length) {
                    $(data.semesterInfo.fileList).each(function(index, file) {
                        html += '<tr>'
                            + '<td>'+(index+1)+'</td>'
                            + '<td>'+file.oriFileName+'</td>'
                            + '<td><span class="btn-custom btn-navy btn-mini">'
                            + '<input type="submit" class="" value="다운로드" onclick="$.fileDownload(\''+file.downloadUrl+'\');" />'
                            + '</span></td></tr>';
                    });
                } else {
                    html += '<tr><td colspan="3" class="no-result">* 추가서류가 없습니다.</td></tr>';
                }

                $("#guideFileListField").html(html);
            }
        });
    }

    function saveExchange(callBack) {
        var data = {
            univCode: tempUnivCode,
            year: selectYear,
            semesterCode: selectSemesterCode,
            subjectList: []
        };

        var tdList = $("#step3SelectSubjectField").find("tr > .td-check");
        tdList.each(function (index, td) {
            var trObj = $(td).parent("tr");
            var subjectNum = trObj.find("input[name='subjectNum']").val();
            var classNum = trObj.find("input[name='classNum']").val();
            var info = {
                subjectNum: subjectNum,
                classNum: classNum
            };
            data.subjectList.push(info);
        });


        $.ajax({
            method: "POST",
            url: baseUrl + "exchange/saveExchangeInfo.ajax?" + defaultParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function () {
            callBack();
        });

    }

    function showApplyDoc(mode) {
        window.open("${baseUrl}html/report/exchangeApplyDoc.html", "학점교류신청서", "width=700,height=800");
    }

    function step1ToStep2() {
        selectUnivCode = $("#mobileSelectMouList").val();
        var semesterSelectVal = $("#selectSemesterField").val();
        if (semesterSelectVal) {
            var temps = semesterSelectVal.split('_');
            if (temps.length === 2) {
                selectYear = temps[0];
                selectSemesterCode = temps[1];
            }
        }

        if (!selectUnivCode || !selectYear || !selectSemesterCode) {
            alert('대학이 선택되지 않았습니다.\n대학을 선택하여 주세요.');
            return;
        }

        $("#step1Layer").hide();
        $("#step2Layer").show();
        $("#step1Navi").removeClass("on");
        $("#step2Navi").addClass("on");
        searchSubjectList();
        $("body").animate({scrollTop: $(".step-wrap").offset().top}, 400);
    }

    function step2ToStep3() {
        if($("#step2SelectSubjectField").find("tr > .td-check").length === 0) {
            alert('과목이 선택되지 않았습니다.\n과목을 선택해주세요.');
            return;
        }

        $("#step2Layer").hide();
        $("#step3Layer").show();
        $("#step2Navi").removeClass("on");
        $("#step3Navi").addClass("on");
        $("#step3SelectSubjectField").html($("#step2SelectSubjectField").html());
        $("body").animate({scrollTop: $(".step-wrap").offset().top}, 400);
    }

    function step3ToStep2() {
        $("#step3Layer").hide();
        $("#step2Layer").show();
        $("#step3Navi").removeClass("on");
        $("#step2Navi").addClass("on");
        $("#step2SelectSubjectField").html($("#step3SelectSubjectField").html());
        setCountSummaryInfo();
        $("body").animate({scrollTop: $(".step-wrap").offset().top}, 400);
    }

    function step3ToStep4() {
        if($("#step3SelectSubjectField").find("tr > .td-check").length === 0) {
            alert('신청과목이 없습니다.\n신청과목 조회 및 선택 메뉴에서 과목을 선택하여 주세요.');
            return;
        }

        saveExchange(function () {
            $("#step3Layer").hide();
            $("#step4Layer").show();
            $("#step3Navi").removeClass("on");
            $("#step4Navi").addClass("on");
            $("body").animate({scrollTop: $(".step-wrap").offset().top}, 400);
            setGuideFileList();
        });
    }

    $.getScript('${baseUrl}js/jquery-paging.js').done(function() {
        getSemesterList();
        getMouUniversityList();

        $(window).click(function() {
            $('#step2MouListField').hide();
            $('#dayOfWeebOptionField').hide();
        });

        $("#step2PagingLayer").createPaging({
            totalCnt: 0,
            nowPage: step2NowPage,
            maxRowCnt: Number($("#step2RowCntField").val()),
            showPageCnt: 5,
            isHome: true,
            clickEvent: function(targetId, pageNum) {
                step2NowPage = pageNum;
                searchSubjectList();
            }
        });
    });

</script>

<!-- step -->
<div class="step-wrap">
    <ul class="myStep-area">
        <li class="myStep1 on" id="step1Navi" style="margin-top: 5px;">
            <div class="step_area ">
                <span class="step">STEP.01</span>
                <p class="comment">대학선택</p>
            </div>
        </li>
        <li class="myStep2" id="step2Navi" style="margin-top: 5px;">
            <div class="step_area">
                <span class="step">STEP.02</span>
                <p class="comment">신청과목<br />조회 및 선택</p>
            </div>
        </li>
        <li class="myStep3" id="step3Navi" style="margin-top: 5px;">
            <div class="step_area">
                <span class="step">STEP.03</span>
                <p class="comment">개인정보<br />제공동의</p>
            </div>
        </li>
        <li class="myStep4" id="step4Navi" style="margin-top: 5px;">
            <div class="step_area">
                <span class="step">STEP.04</span>
                <p class="comment">작성완료</p>
            </div>
        </li>
    </ul>
</div>
<!-- //step -->


<!--  학점교류 가능대학 선택 -->
<div id="step1Layer">
    <div class="line-wrap step1-line-wrap">
        <div class="al-left">
            <ul>
                <li class="add_chk bg_gray" style="margin-top: 5px;">등록학기 선택</li>
                <li class="sel" style="margin-top: 5px;">
                    <select class="select" id="selectSemesterField"></select>
                </li>
            </ul>
        </div>
    </div>
    <!-- //학점교류 가능대학 선택 -->

    <!-- 대학 선택 desktop -->
    <!-- desktop 용 mobile에서 hidden -->
    <div class="content">
        <div class="univ_list">
            <div class="list_area">
                <div class="now_univ">
                    <p id="step1SelectedUniversityField"></p>
                    <ul class="list_slide" id="step1MouUnivListField" style="z-index: 999999;"></ul>
                </div>
            </div>
        </div>
    </div>
    <!-- //대학 선택 desktop-->

    <!-- 대학선택 mobile -->
    <!-- desktop에서 hidden 됩니다. -->
    <div class="univ-selec-mobile">
        <select class="select" id="mobileSelectMouList" onchange="changeUniversity(this);"></select>
    </div>
    <!-- //대학선택 mobile -->

    <div class="step1-textarea" id="viewDocField">
    </div>

    <div class="btn-area center">
        <span class="btn-custom btn-navy" id="step1NextBtn"><input type="submit" value="다음 STEP2" onclick="step1ToStep2()"></span>
    </div>
</div>
<!--//  학점교류 가능대학 선택 -->

<!-- 과목 선택 -->
<div id="step2Layer" style="display: none;">
    <div class="search-subject-wrap">
        <ul class="select-list">
            <li>
                <span class="tit-label">선택대학</span>
                <!-- select list type -->
                <div class="select-ui">
                    <strong><a href="javascript:$('#step2MouListField').toggle();" id="step2MouSelectField"></a></strong>
                    <ul id="step2MouListField">
                    </ul>
                </div>
            </li>
            <li>
                <span class="tit-label">이수구분</span>
                <!-- select list type -->
                <input kr-input id="completeTypeField" type="text" class="input-text" title="이수구분을 입력하세요" placeholder="이수구분을 입력하세요">
            </li>
            <li>
                <span class="tit-label">학과</span>
                <!-- select list type -->
                <input kr-input id="departmentField" type="text" class="input-text" title="학과를 입력하세요." placeholder="학과를 입력하세요">
            </li>
            <li>
                <span class="tit-label">교수 </span>
                <!-- select list type -->
                <input kr-input id="teacherNameField" type="text" class="input-text" title="교수명을 입력하세요." placeholder="교수명을 입력하세요">
            </li>
            <li>
                <span class="tit-label">과목명</span>
                <!-- select list type -->
                <input kr-input id="subjectNameField" type="text" class="input-text" title="과목명을 입력하세요." placeholder="과목명을 입력하세요">
            </li>
            <li>
                <span class="tit-label">강의진행 요일</span>
                <!-- select list type -->
                <div class="select-ui">
                    <strong>
                        <a href="javascript:$('#dayOfWeebOptionField').toggle();" id="dayOfWeekSelectField">
                            요일선택<input type="hidden" value=""/>
                        </a>
                    </strong>
                    <ul id="dayOfWeebOptionField">
                        <li><a style="cursor: pointer;" onclick="changeDayOfWeek(this);">전체</a><input type="hidden" value=""/></li>
                        <li><a style="cursor: pointer;" onclick="changeDayOfWeek(this);">일요일</a><input type="hidden" value="1"/></li>
                        <li><a style="cursor: pointer;" onclick="changeDayOfWeek(this);">월요일</a><input type="hidden" value="2"/></li>
                        <li><a style="cursor: pointer;" onclick="changeDayOfWeek(this);">화요일</a><input type="hidden" value="3"/></li>
                        <li><a style="cursor: pointer;" onclick="changeDayOfWeek(this);">수요일</a><input type="hidden" value="4"/></li>
                        <li><a style="cursor: pointer;" onclick="changeDayOfWeek(this);">목요일</a><input type="hidden" value="5"/></li>
                        <li><a style="cursor: pointer;" onclick="changeDayOfWeek(this);">금요일</a><input type="hidden" value="6"/></li>
                        <li><a style="cursor: pointer;" onclick="changeDayOfWeek(this);">토요일</a><input type="hidden" value="7"/></li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="btn-area center">
            <span class="btn-custom btn-gray"><input type="submit" value="검색조건 초기화" onclick="clearStep2Data();"></span>
            <span class="btn-custom btn-navy"><input type="submit" value="선택조건으로 검색" onclick="step2NowPage=1;searchSubjectList();"></span>
        </div>
    </div>
    <!-- //검색 -->

    <!-- 10개씩 보기 -->
    <div class="line-wrap">
        <label for="step2RowCntField" class="hide">리스트 갯수</label>
        <select id="step2RowCntField" class="select" >
            <option value="10">10개씩</option>
            <option value="20">20개씩</option>
        </select>
    </div>
    <!-- //10개씩 보기 -->

    <!-- 검색 결과 -->
    <div class="search-tb-list ">
        <table class="tb-list">
            <caption>학점교류신청 리스트</caption>
            <thead>
            <tr>
                <th class="th-check" scope="col">
                    <label for="all-check">
                        <input type="checkbox" id="all-check"  onclick="$('#subjectListField > tr > .td-check > input[type=checkbox]').prop('checked', this.checked);"/>
                        선택
                    </label>
                </th>
                <th class="th-division" scope="col">이수구분</th>
                <th class="th-department" scope="col">학과</th>
                <th class="th-subject" scope="col">과목명</th>
                <th class="th-group" scope="col">분반</th>
                <th class="th-professor" scope="col">교수명</th>
                <th class="th-time" scope="col">강의시간</th>
                <th class="th-credit" scope="col">학점</th>
                <th class="th-capacity" scope="col">인원</th>
                <th class="th-detail" scope="col">상세정보</th>
            </tr>
            </thead>
            <tbody id="subjectListField">
            </tbody>
        </table>
    </div>
    <div class="paing-custom">
        <div class="_paging " id="step2PagingLayer">
        </div>
    </div>
    <!-- //검색 결과  -->

    <div class="btn-side">
        <span class="btn-custom btn-navy btn-mini fl-left"><input type="submit" value="과목선택 " onclick="addSelectSubjet();"></span>
    </div>

    <!-- 검색 결과 -->
    <h4 class="tit-tb">선택과목 리스트 </h4>
    <div class="search-tb-list ">
        <table class="tb-list">
            <thead>
            <tr>
                <th class="th-check" scope="col">
                    <label for="all-check1">
                        <input type="checkbox" onclick="$('#step2SelectSubjectField > tr > .td-check > input[type=checkbox]').prop('checked', this.checked);"/>선택
                    </label>
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
        </table>
        <div class="inner-scroll">
            <table class="tb-list">
                <caption>선택과목 리스트</caption>
                <tbody id="step2SelectSubjectField">
                <tr>
                    <td class="no-result" colspan="10">
                        <p class="tx-no-result">※ 선택한 과목이 없습니다. </p>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="btn-side">
        <span class="btn-custom btn-navy btn-mini fl-left"><input type="submit" value="선택삭제 " onclick="removeStep2SelectSubjet();"></span>
    </div>
    <!-- //검색 결과  -->

    <p class="tx-result" id="countSummaryField" style="display: none;">※ <span>${userSession.userName}</span> 님은  <strong><span id="selectSubjectCnt">4</span> 과목 <span id="selectSubjectPoint">7</span> 학점</strong>  을 선택 하셨습니다.</p>
    <div class="btn-area center">
        <span class="btn-custom btn-gray"><input type="submit" value="희망과목 담기 " onclick="saveHopeSubjectCheck();"></span>
        <span class="btn-custom btn-navy btn-step-icon"><input type="submit" value="다음 STEP3" onclick="step2ToStep3();"></span>
    </div>
</div>
<!--// 과목 선택 -->

<!-- 약관 동의 -->
<div id="step3Layer" style="display: none;">
    <!-- 개인정보입력 -->
    <div class="form-custom step3-form">
        <div class="input-tr pc-col4">
            <div class="thtd-group">
                <div class="input-th ">
                    <label for="userNameField">성명</label>
                </div>
                <div class="input-td ">
                    <input id="userNameField" type="text" class="input-text" readonly value="${userSession.userName}">
                </div>
            </div>
            <div class="thtd-group">
                <div class="input-th ">
                    <label for="cellNoField">휴대전화</label>
                </div>
                <div class="input-td ">
                    <input id="cellNoField" type="text" class="input-text" readonly value="${userSession.cellNo}">
                </div>
            </div>
        </div>
        <div class="input-tr pc-col4">
            <div class="thtd-group">
                <div class="input-th ">
                    <label for="mfTypeField">성별</label>
                </div>
                <div class="input-td ">
                    <input id="mfTypeField" type="text" class="input-text" readonly value="${userSession.mfTypeName}">
                </div>
            </div>
            <div class="thtd-group">
                <div class="input-th ">
                    <label for="emailField">E-mail</label>
                </div>
                <div class="input-td ">
                    <input id="emailField" type="text" class="input-text" readonly value="${userSession.userEmail}">
                </div>
            </div>
        </div>
        <div class="input-tr pc-col4">
            <div class="thtd-group">
                <div class="input-th ">
                    <label for="userUnivField">소속대학</label>
                </div>
                <div class="input-td ">
                    <input id="userUnivField" type="text" class="input-text" readonly value="${userSession.univName}">
                </div>
            </div>
            <div class="thtd-group">
                <div class="input-th ">
                    <label for="userDepartmentField">학과(부)</label>
                </div>
                <div class="input-td ">
                    <input id="userDepartmentField" type="text" class="input-text" readonly value="${userSession.department}">
                </div>
            </div>
        </div>
        <div class="input-tr pc-col4">
            <div class="thtd-group">
                <div class="input-th ">
                    <label for="studentNumberField">학번</label>
                </div>
                <div class="input-td ">
                    <input id="studentNumberField" type="text" class="input-text" readonly value="${userSession.studentNumber}">
                </div>
            </div>
            <div class="thtd-group">
                <div class="input-th " onclick="$('#guidePopupLayer').show();">
                    <label for="exUnivStudentNumber">기존학번</label>
                </div>
                <div class="input-td ">
                    <input kr-input id="exUnivStudentNumber" type="text" class="input-text">
                </div>
            </div>
        </div>
    </div>
    <!-- //개인정보입력 -->

    <!-- 개인정보 동의  -->
    <div class="step3-terms-area">
        <div class="step3-terms-box">
            <strong class="terms-tit">제 3자 개인정보 제공동의 안내</strong>
            <ul>
                <li>
                    ㆍ목적개인정보의 목적 외 이용·제공 및 열람 처리 시 「개인정보보호법」상 적법한 처리 절차를 마련하여 위법사례를 방지하고자 함. 관련근거
                    <ul>
                        <li>○ 개인정보보호법 제18조(개인정보의 이용·제공 제한)</li>
                        <li>○ 개인정보보호법 시행령 제15조(개인정보의 목적 외 이용 또는 제3자 제공의 관리)</li>
                        <li>○ 표준 개인정보 보호지침 제9조(개인정보의 목적 외 이용 등)</li>
                    </ul>
                </li>
                <li>ㆍ목적 외 이용·제공이 가능한 경우 ○ 원칙적으로 개인정보의 목적 외 이용 및 제3자 제공 금지(법 제18조제1항)
                    <ul>
                        <li> - 개인정보처리자는 정보주체에게 이용제공의 목적을 고지하고 동의를 받거나 법령에 의하여 이용제공이 허용된 범위를</li>
                    </ul>
                </li>
            </ul>
        </div>
        <p class="chk-p"><input id="termsCheckField" type="checkbox" checked><label for="termsCheckField">제 3자 개인정보 제공 동의</label></p>
    </div>
    <!-- //개인정보 동의 -->

    <!-- 신청과목 -->
    <h4 class="tit-round">신청과목 </h4>
    <div class="search-tb-list ">
        <table class="tb-list">
            <thead>
            <tr>
                <th class="th-check" scope="col">
                    <label for="all-check1">
                        <input type="checkbox" id="all-check1" onclick="$('#step3SelectSubjectField > tr > .td-check > input[type=checkbox]').prop('checked', this.checked);" />선택
                    </label>
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
        </table>
        <div class="inner-scroll">
            <table class="tb-list">
                <caption>선택과목 리스트</caption>
                <tbody id="step3SelectSubjectField">
                </tbody>
            </table>
        </div>
    </div>
    <!-- //신청과목  -->

    <div class="btn-side">
        <span class="btn-custom btn-navy btn-mini fl-left"><input type="submit" value="선택삭제 " onclick="removeStep3SelectSubjet();"></span>
    </div>

    <div class="btn-area center">
        <span class="btn-custom btn-gray"><input type="submit" value="뒤로가기 " onclick="step3ToStep2();"></span>
        <span class="btn-custom btn-navy btn-step-icon"><input type="submit" value="다음 STEP4" onclick="step3ToStep4();"></span>
    </div>
</div>

<div id="step4Layer" style="display: none;">
    <div class="step4_cont step_cont">
        <div class="text_area">
            <p>작성이 완료 되었습니다.<br><strong>신청서를 출력하여 제출</strong>하여 주세요.</p>
            <span>(학점교류 신청내역 메뉴에서도 신청서 및 추가 제출서류를 다운 받을 수 있습니다)</span>
        </div>
        <div class="btn-area center">
            <span class="btn-custom btn-gray"><input type="submit" value="신청서 출력하기" onclick="showApplyDoc(1);"></span>
            <span class="btn-custom btn-navy"><input type="submit" value="신청서 다운로드" onclick="showApplyDoc(2);"></span>
            <span class="btn-custom btn-orange"><input type="submit" value="내 신청내역 확인하기"></span>
        </div>
        <div class="search-tb-list ">
            <p class="tabel_tit">학점교류 신청서와 함께 제출해야 하는 추가서류 입니다.</p>
            <table class="tb-list">
                <caption>학점교류신청 리스트</caption>
                <colgroup>
                    <col style="width:15%">
                    <col style="width:auto">
                    <col style="width:30%;">
                </colgroup>
                <thead>
                <tr>
                    <th scope="col">구분</th>
                    <th scope="col">제목</th>
                    <th scope="col">다운로드</th>
                </tr>
                </thead>
                <tbody id="guideFileListField">
                <tr>
                    <td>2</td>
                    <td>개인정보 제공 동의서</td>
                    <td>
                        <span class="btn-custom btn-navy btn-mini"><input type="submit" class="" value="다운로드"></span>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>학점교류수업 이수 계획서</td>
                    <td>
                        <span class="btn-custom btn-navy btn-mini"><input type="submit" class="" value="다운로드"></span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
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

<!-- 기존 학번 안내 팝업 -->
<div class="layer-wrap" style="display: none;" id="guidePopupLayer">
    <div class="layer-popup">
        <div class="layer-area">
            <button type="button" class="btn-layer-x"><span class="hide">레이어창닫기</span></button>
            <!-- layer header title -->
            <div class="layer-header">
                <h2 class="tit-layer">안내</h2>
            </div>
            <!-- //layer header title -->
            <!-- layer container -->
            <div class="layer-container">
                <div class="layer-content">
                    <p class="desc">현재 신청하는 교류대학에서 기존에 발급받은 학번이 있으면 입력하세요.<br>공유대학 플랫폼에서 신청한 내역은 </p>
                    <p class="desc c_blue poin_txt">마이페이지 > 학점교류이수내역 </p>
                    <p class="desc">메뉴에서 확인할 수 있습니다.</p>
                    <div class="btn-area">
                        <span class="btn-custom btn-navy"><input type="submit" value="확인" onclick="$('#guidePopupLayer').hide();"></span>
                    </div>
                </div>
                <!-- //layer container -->
            </div>
        </div>
    </div>
</div>
<!--// 기존 학번 안내 팝업 -->