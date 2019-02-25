<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript">
    /**
     * 주소 선택 팝업창을 띄운다.
     */
    function goPopup(){
        window.open("${pageContext.request.contextPath}/address/popup.do","pop","width=570,height=420, scrollbars=yes, resizable=yes");
    }

    /**
     * 주소 검색 결과 Call Back Function
     */
    function jusoCallBack() {
        var evalTxt = 'setAddress("' + arguments[6] + '", "' + arguments[1] + '", "' + arguments[2] + '")';
        $("#ngViewField").scope().$apply(evalTxt);
    }

</script>

<style>
    .on {color:#b40c0c!important;}
</style>

<div class="tab_wraping">
    <!-- tab1 -->
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">대학 정보 관리
            <div class="pg_location"><a>Go home</a> <span>&gt;</span> </span> 코드/대학정보 관리<span>&gt;</span> 대학 정보 관리</div>
        </h5>
        <div id="innTabContent">
            <div class="_articleContent">
                <div class="_codeContent">
                    <!-- 대학교 트리 -->
                    <div class="_codeWrap">
                        <div class="codetotal">
                            <div class="codeControl">
                                <div class="tree">
                                    <ul class="clfix">
                                        <li class="last open" ng-repeat="data in $root.university.info.universityList | orderBy:'code.codeName'" ng-init="!$root.university.info.nowUniversityParentCode && $first && locationClick(data.code)">
                                            <button ng-click="locationClick(data.code);" type="button" class="toggle plus" ng-class="{minus:$root.university.info.nowUniversityParentCode === data.code.code, plus:$root.university.info.nowUniversityParentCode !== data.code.code}">-</button>
                                            <a ng-click="locationClick(data.code);" title="{{data.code.codeName}}" style="cursor: pointer;">{{data.code.codeName}}</a>
                                            <ul ng-show="$root.university.info.nowUniversityParentCode === data.code.code">
                                                <li class="last" ng-repeat="sub in data.subCodeList | orderBy:'codeName'" ng-init="!$root.university.info.nowUniversityCode && $parent.$first && $first && universityClick(sub, data.code)">
                                                    <a ng-click="universityClick(sub, data.code);" ng-class="{on:$root.university.info.nowUniversityCode === sub.code}" title="{{sub.codeName}}" style="cursor: pointer;">{{sub.codeName}}</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--// 대학교 트리 -->

                    <!-- 대학교 정보 -->
                    <div class="codeTable">
                        <table class="_table _view w100">
                            <caption>코드 관리 표</caption>
                            <colgroup>
                                <col style="width:150px;">
                                <col>
                                <col style="width:150px;">
                                <col>
                            </colgroup>

                            <tbody>
                            <tr>
                                <th>지역</th>
                                <td>{{$root.university.info.nowUniversityParentCodeName}}</td>
                                <th>설립구분</th>
                                <td><select name="sch_found" id="sch_found" class="_selectBox _fL wx100 mr05" ng-model="$root.university.info.setUpType">
                                    <option value="">선택</option>
                                    <option ng-repeat="code in $root.university.info.setUpTypeList" value="{{code.code}}">
                                        {{code.codeName}}
                                    </option>
                                </select></td>
                            </tr>
                            <tr>
                                <th>대학교 명</th>
                                <td>{{$root.university.info.nowUniversityCodeName}}</td>
                                <th>행정표준코드</th>
                                <td>
                                    <input kr-input type="text" class="w100" ng-model="$root.university.info.commonCode">
                                </td>
                            </tr>
                            <tr>
                                <th>대학교 영문 명</th>
                                <td colspan="3"><input kr-input type="text" class="w100" ng-model="$root.university.info.univNameEn"></td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td colspan="3">
                                    <ul>
                                        <li>
                                            <input kr-input type="text" name="mem_address" id="mem_zipcode" placeholder="우편번호" class="wx100" readonly ng-model="$root.university.info.zipCode">
                                            <span class="_button _minimum _gray"><a href="javascript:goPopup();" class="tabInnBtn typeA">주소검색</a></span>
                                        </li>
                                        <li>
                                            <input kr-input type="text" name="mem_address" placeholder="기본주소" class="w100" readonly ng-model="$root.university.info.defaultAddr">
                                        </li>
                                        <li>
                                            <input kr-input type="text" name="mem_address" placeholder="상세주소" class="w100" readonly ng-model="$root.university.info.detailAddr">
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <th>대표 전화번호</th>
                                <td colspan="3">
                                    <select name="mem_phone" class="_selectBox _fL wx80 mr05" ng-model="$root.university.info.telNum1">
                                        <option ng-repeat="code in $root.university.info.telFirstNumList" value="{{code.codeName}}">
                                            {{code.codeName}}
                                        </option>
                                    </select>

                                    <input kr-input type="text" placeholder="" class="wx100" ng-model="$root.university.info.telNum2" ng-focus="$root.university.info.focusField === 'telNum'">

                                    <input kr-input type="text" placeholder="" class="wx100" ng-model="$root.university.info.telNum3">
                                </td>
                            </tr>
                            <tr>
                                <th>로고이미지</th>
                                <td colspan="3">
                                    <ul>
                                        <li>
                                            <span class="_button _minimum _gray">
                                                <label for="logoImageFile" style="cursor: pointer;min-width: 65px;height:28px;line-height:28px;border: 1px solid #757575;border-radius: 4px;background-color: #fff;color: #757575;letter-spacing: -.01em;padding: 0 .5em;background: #fff;text-align: center;word-wrap: break-word;display: inline-block;zoom: 1;margin: 0;font-size: 100%;vertical-align: baseline;font-weight: bold;border-spacing: 0;">이미지 등록</label>
                                                <input id="logoImageFile" type="file" nv-file-select uploader="$root.university.info.uploader" style="display: none;" multiple/>
                                            </span>
                                            <span>{{$root.university.info.uploader.queue.length > 0 ? $root.university.info.uploader.queue[0].file.name : '선택된 이미지가 없습니다.'}}</span>
                                        </li>
                                        <li ng-show="$root.university.info.saveLogoFileName && $root.university.info.logoDeleteYn === 'N'">
                                            <span>{{$root.university.info.saveLogoFileName}}</span>
                                            <span class=" file_close"><a ng-click="$root.university.info.logoDeleteYn = 'Y';" class="">삭제</a></span>
                                        </li>
                                        <li ng-show="$root.university.info.saveLogoFileName && $root.university.info.logoDeleteYn === 'N'">
                                            <div class="imgfile"><!-- 이미지 미첨부시 display:inline-block-->
                                                <img ng-src="{{$root.university.info.saveLogoFileUrl}}">
                                            </div>
                                            <span class="mark imgfileText">* 사이즈 000 x 000, 10mb 이내 이미지만<br> 첨부 가능합니다.</span>
                                        </li>
                                        <li>

                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <th>홈페이지 URL</th>
                                <td colspan="3"><input kr-input type="text" placeholder="" class="w100" ng-model="$root.university.info.homeUrl"></td>
                            </tr>
                            <tr>
                                <th>대학미니포탈 <br>URL</th>
                                <td colspan="3"><input kr-input type="text" placeholder="" class="w100" ng-model="$root.university.info.miniHomeUrl"></td>
                            </tr>
                            <tr>
                                <th>활성화 여부</th>
                                <td colspan="3">
                                    <div class="radioWrap">
                                        <div class="radio">
                                            <a ng-click="$root.university.info.enableYn = 'Y';">
                                                <input type="radio" id="rad_Chek01" name="itmSoldout" title="활성화" ng-model="$root.university.info.enableYn" value="Y">
                                                <label for="rad_Chek01"><span></span>활성화</label>
                                            </a>
                                        </div>
                                        <div class="radio">
                                            <a ng-click="$root.university.info.enableYn = 'N';">
                                                <input type="radio" id="rad_Chek02" name="itmSoldout" title="비활성화" ng-model="$root.university.info.enableYn" value="N">
                                                <label for="rad_Chek02"><span></span>비활성화</label>
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr ng-show="$root.userSession.userType === Const.code.USER_TYPE_SUPER">
                                <th>학점교류신청서ID<mark class="must"></mark></th>
                                <td colspan="3"><input kr-input type="text" class="w100" ng-model="$root.university.info.applyDocId"></td>
                            </tr>
                            <tr ng-show="$root.userSession.userType === Const.code.USER_TYPE_SUPER">
                                <th>학점교류 신청
                                    <br>취소서 ID<mark class="must"></mark>
                                </th>
                                <td colspan="3"><input kr-input type="text" class="w100" ng-model="$root.university.info.applyCancelDocId"></td>
                            </tr>
                            <tr ng-show="$root.university.info.regUserName">
                                <th>작성자 <span class="mark">*</span></th>
                                <td colspan="3">{{$root.university.info.regUserName}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="_areaButton">
                            <div class="_center">
                                <span class="_button _large blackBtn"><a ng-click="submit();" class="wx135" >저장</a></span>
                            </div>
                        </div>
                    </div>
                    <!--// 대학교 정보 -->
                </div>
            </div>
        </div>
    </div>
    <!-- // tab1 -->
</div>


