<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>



<div class="tab_wraping">
    <!-- tab1 -->
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">담당자 등록/조회
            <div class="pg_location"><a>Go home</a> <span>&gt;</span> 권한 관리<span>&gt;</span> 담당자 등록/조회</div>
        </h5>
        <div id="innTabContent">
            <div class="_articleContent">
                <div class="_border _write mt10">
                    <div class="_inner">
                        <fieldset>
                            <form name="selYearForm" method="post">
                                <div class="_form _both">
                                    <div class="_insert tableWrap">
                                        <div class="innTable">
                                            <table class="w100">
                                                <colgroup>
                                                    <col style="width:8%">
                                                    <col style="width:13%">
                                                    <col style="width:7%">
                                                    <col style="width:14%">
                                                    <col style="width:7%">
                                                    <col style="width:22%">
                                                    <col style="width:7%">
                                                    <col style="width:22%">
                                                </colgroup>
                                                <tbody>
                                                <tr>
                                                    <td><label for="sch_division" class="pl10">역할 구분</label></td>
                                                    <td>
                                                        <select name="sch_division" id="sch_division" class="_selectBox _fL wx150"
                                                                ng-model="$root.authority.typeSet.searchParam.managerType">
                                                            <option value="">전체</option>
                                                            <option value="1">정</option>
                                                            <option value="2">부</option>
                                                        </select>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><label for="sch_search" class="pl20">검색</label></td>
                                                    <td colspan="3">
                                                        <select name="sch_search" id="sch_search" class="_selectBox _fL wx100"
                                                                ng-model="$root.authority.typeSet.searchParam.keywordType">
                                                            <option value="">전체</option>
                                                            <option value="1">담당자ID</option>
                                                            <option value="2">담당자 명</option>
                                                            <option value="3">부서명</option>
                                                        </select>
                                                        <input kr-input type="text" id="" placeholder="" class="wx190"
                                                               ng-model="$root.authority.typeSet.searchParam.keyword">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><label for="sch_kind" class="pl10">학교 구분</label></td>
                                                    <td>
                                                        <select name="sch_kind" id="sch_kind" class="_selectBox _fL wx150"
                                                                ng-model="$root.authority.typeSet.searchParam.areaCode">
                                                            <option value="">지역 전체</option>
                                                            <option value="{{code.code}}" ng-repeat="code in $root.authority.typeSet.areaList | orderBy:'codeName'">
                                                                {{code.codeName}}
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td colspan="2">
                                                        <select name="sch_kind2" id="sch_kind2" class="_selectBox _fL wx180"
                                                                ng-model="$root.authority.typeSet.searchParam.univCode">
                                                            <option value="">대학교 전체</option>
                                                            <option value="{{code.code}}" ng-repeat="code in $root.authority.typeSet.universityList | orderBy:'codeName'">
                                                                {{code.codeName}}
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="_areaButton innerBtn">
                                            <div class="_right">
                                                <span class="_button _small _active searchBtn"><input type="button" value="조회" ng-click="searchManagerList();"></span>
                                                <span class="_button _small resetBtn"><input type="button" value="초기화" ng-click="searchParamClear();"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </fieldset>
                    </div>
                </div>
                <div class="_listHead mt40">
                    <div class="_count">
                       	총 <strong>{{$root.authority.typeSet.totalCnt}}</strong> 건이 검색되었습니다.
                    </div>

                    <div class="_search pr0">
                        <fieldset>
                            <legend>개수</legend>
                            <select name="findType" class="_selectBox wx70" ng-change="changeMaxRowCnt()"
                                    ng-model="$root.authority.typeSet.searchParam.maxRowCnt">
                                <option value="10">10개</option>
                                <option value="20">20개</option>
                                <option value="30">30개</option>
                                <option value="40">40개</option>
                                <option value="50">50개</option>
                            </select>
                        </fieldset>
                    </div>
                </div>
                <table class="_table _list w100 ">
                    <caption>표 제목</caption>
                    <colgroup>
                        <col style="width:14%">
                        <col style="width:16%;">
                        <col style="width:15%;">
                        <col style="width:15%;">
                        <col style="width:20%;">
                    </colgroup>
                    <thead>
                    <tr>
                    	<th ng-click="changeSortOrder($event)" data-sort="univName" data-order="desc"><span>학교구분<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                    	<th ng-click="changeSortOrder($event)" data-sort="managerType" data-order="desc"><span>역할구분<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                    	<th ng-click="changeSortOrder($event)" data-sort="userName" data-order="desc"><span>담당자 명<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                    	<th ng-click="changeSortOrder($event)" data-sort="department" data-order="desc"><span>부서명<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                    	<th ng-click="changeSortOrder($event)" data-sort="userId" data-order="desc"><span>담당자 ID<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                    </tr>
                    </thead>
                    <tbody ng-show="$root.authority.typeSet.managerList.length != 0">
                        <tr ng-repeat="manager in $root.authority.typeSet.managerList">
                            <td>{{manager.univName}}</td>
                            <td>
                                <div class="radioWrap listInnRadio">
                                    <div class="radio">
                                        <input type="radio" id="rad_Chek_1_{{manager.rownum}}" name="sch_part_{{manager.rownum}}" title="정"
                                               ng-model="manager.managerType" ng-value="1">
                                        <label for="rad_Chek_1_{{manager.rownum}}"><span></span>정</label>
                                    </div>
                                    <div class="radio">
                                        <input type="radio" id="rad_Chek_2_{{manager.rownum}}" name="sch_part_{{manager.rownum}}" title="부"
                                               ng-model="manager.managerType" ng-value="2">
                                        <label for="rad_Chek_2_{{manager.rownum}}"><span></span>부</label>
                                    </div>
                                </div>
                                <span class="_button _minimum _apply pl10"><a ng-click="saveAuthorityType(manager);">적용</a></span>
                            </td>
                            <td>{{manager.userName}}</td>
                            <td>{{manager.department}}</td>
                            <td>{{manager.userId}}</td>
                        </tr>
                    </tbody>
                    <tbody ng-show="$root.authority.typeSet.managerList.length == 0">
						<tr>
							<td colspan="5">등록된 담당자가 없습니다.</td>
						</tr>
					</tbody>
                </table>
                <div ng-show="$root.authority.typeSet.managerList.length > 0" id="managerListPaging" class="_paging"></div>
                <div class="_areaButton">
                    <div class="_search pr0 _right">
                        <fieldset>
                            <legend>개수</legend>
                            <select name="findType" class="_selectBox wx70" ng-change="changeMaxRowCnt()"
                                    ng-model="$root.authority.typeSet.searchParam.maxRowCnt">
                                <option value="10">10개</option>
                                <option value="20">20개</option>
                                <option value="30">30개</option>
                                <option value="40">40개</option>
                                <option value="50">50개</option>
                            </select>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- // tab1 -->
    <!-- tab2 -->
    <div id="tab2" class="tab-content">
        <h5 class="cont_Title">기본정보</h5>
        <div>aaaaaaa</div>
    </div>
    <!-- // tab2 -->
    <!-- tab3 -->
    <div id="tab3" class="tab-content">
        <h5 class="cont_Title">기본정보</h5>
        <div>bbbbbbbb</div>
    </div>
    <!-- // tab3 -->
</div>
