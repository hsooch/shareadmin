<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>

<style>
tr.active {
background-color: #eeeeee;
}
tr.deactive {
background-color: #ffffff;
}

</style>

<div class="tab_wraping">
    <!-- tab1 -->
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">개인별 권한 설정
            <div class="pg_location"><a>Go home</a> <span>&gt;</span> 권한 관리<span>&gt;</span> 개인별 권한 설정</div>
        </h5>
        <div id="innTabContent">
            <div class="_articleContent">
                <div class="_border _write mt10">
                    <div class="_inner">
                        <fieldset>
                            <legend>월별 접속통계 조회 </legend>
                            <form name="selYearForm" method="post">
                                <div class="_form _both">
                                    <div class="_insert tableWrap w960">
                                        <div class="innTable">
                                            <table class="w80">
                                                <colgroup>
                                                    <col style="width:8%">
                                                    <col style="width:13%">
                                                    <col style="width:20%">
                                                    <col style="width:8%">
                                                    <col style="width:33%">
                                                </colgroup>
                                                <tbody>
                                                <tr>
                                                	<td><label for="sch_kind" class="pl10">학교 구분</label></td>
	                                                <td>
	                                                    <select name="mem_college" id="mem_college" class="_selectBox _fL w100" ng-model="$root.authority.personal.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv')">
															<option value="{{code.code}}" ng-repeat="code in $root.authority.personal.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
														</select>
	                                                </td>
			 										<td>
	                                                    <select name="mem_college" id="mem_college" class="_selectBox _fL w95" ng-model="$root.authority.personal.searchUniv">
															<option value="{{code.code}}" ng-repeat="code in $root.authority.personal.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
														</select>
	                                                </td>
	                                                <td><label for="sch_search" class="pl20">검색</label></td>
	                                                <td colspan="2">
	                                                    <select name="sch_search" id="sch_search" class="_selectBox _fL wx100" ng-model="$root.authority.personal.searchOption">
	                                                        <option value="">전체</option>
	                                                        <option value="name">담당자 이름</option>
	                                                        <option value="id">담당자 아이디</option>
	                                                    </select>
	                                                    <input type="text" id="" placeholder="" class="w60"
	                                                    	ng-model="$root.authority.personal.searchKeywords" kr-input>
	                                                </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="_areaButton innerBtnB">
                                            <div class="_right">
                                                <span class="_button _small _active searchBtn"><input type="button" value="조회" ng-click="search(true);"></span>
	                                 		    <span class="_button _small resetBtn"><input type="button" value="초기화" ng-click="resetSearchFiled();"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </fieldset>
                    </div>
                </div>
                <div class="personalWrap typeA">
                    <table class="_table _view w100">
                        <caption>표 제목</caption>
                        <colgroup>
                            <col style="width:60%;">
                            <col style="width:40%;">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>학교구분</th>
                            <th>담당자 명</th>
                        </tr>
                        </thead>
                        <tbody>
	                        <tr class="tr-mgr" id="tr-mgr-{{$index}}" style="cursor: pointer; " 
	                        	ng-repeat="data in $root.authority.personal.univManagerList" ng-click="clickMgrList(data.userSeq, $index);" ng-class="{active:$first}">
	                            <td>{{data.univCodeName}}</td>
	                            <td>{{data.userName}}</td>
	                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="personalWrap typeB">
                    <table class="_table _view w100">
                        <caption>회원정보 수정 표</caption>
                        <colgroup>
                            <col style="width:150px;">
                            <col>
                            <col style="width:150px;">
                            <col>
                            <col style="width:150px;">
                            <col>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>학교구분 <span class="mark"></span></th>
                            <td>{{$root.authority.personal.personalInfo.univCodeName}}</td>
                            <th>담당자 명 <span class="mark"></span></th>
                            <td>{{$root.authority.personal.personalInfo.userName}}</td>
                            <th>담당자 ID <span class="mark"></span></th>
                            <td>{{$root.authority.personal.personalInfo.userId}}</td>
                        </tr>
                        <tr>
                            <th>역할구분 <span class="mark"></span></th>
                            <td>{{getManagerAuthorityType();}}</td>
                            <th>권한설정자 <span class="mark"></span></th>
                            <td>{{$root.authority.personal.personalInfo.sessionUser}}</td>
                            <th>설정일 <span class="mark"></span></th>
                            <td>{{$root.authority.personal.personalInfo.regDt}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="persMenuWrap mt10">
                        <div class="persList_con">
                            <div class="persListTitle">보유권한그룹</div>
                            <div class="tree_addDel">
                                <span class="add"><a ng-click="addGroupClick();" style="cursor: pointer;">down</a></span>
                                <span class="del"><a ng-click="removeGroup();" style="cursor: pointer;">up</a></span>
                            </div>
                            <div class="sch_code personalCode">
                                <ul>
                                    <li class="li-group deactive" id="li-group-{{$index}}" style="cursor: pointer;"
                                    	ng-repeat="data in $root.authority.personal.attachedGroupList" ng-click="selectGroup(data.groupSeq, $index);">{{data.groupName}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="menuTreeWrap">
                            <div class="menuTabTitle">보유권한그룹 및 개인별 권한</div>
                            <div class="menuEditer pt10">
                                <div class="checkControl">
                                    <div class="tree checkTree">
                                        <ul class="clfix">
                                            <li class="last">
                                            	<button type="button" class="toggle plus">+</button>
                                            	<a title="전체메뉴"><input type="checkbox" id="itm_Allcheck" name="itm_Allcheck"><label for="itm_Allcheck"><span></span></label>전체메뉴</a>
                                                <ul id="tree-root">
                                                    <!-- 트리 데이터 -->
						                            <li class="last open" ng-repeat="data in $root.authority.personal.tree | orderBy:'data.menuIndex'" ng-init="!$root.authority.personal.nowGroupParentSeq && $first && clickToggle(data.menuSeq)">
						                           		<button type="button" id="toggle_{{data.menuSeq}}" class="toggle" ng-class="{minus:data.pm==='minus'}" ng-click="clickToggle(data.menuSeq);">-</button>
						                            	<a title="{{data.menuName }}" style="cursor: pointer;">
						                            		<input type="checkbox" class="chk_seq" id="chk_{{data.menuSeq}}" name="chk_{{data.menuSeq}}">
						                            		<label for="chk_{{data.menuSeq}}" ng-click="checkbox(data.menuSeq);"><span></span></label>{{data.menuName }}
						                            	</a>
						                                <ul id="ul_{{data.menuSeq}}" style="display: none;">
						                                    <li ng-repeat="childData in data.children | orderBy:'menuIndex'" ng-init="!$root.authority.personal.nowGroupParentSeq && $parent.$first && $first && clickSubToggle(childData, data.menuSeq)">
						                                    	<a title="{{childData.menuName }}" style="cursor: pointer;">
						                                    		<input type="checkbox" class="chk_seq" id="chk_{{childData.menuSeq }}" name="chk_{{childData.menuSeq }}">
						                                    		<label for="chk_{{childData.menuSeq }}" ng-click="checkbox(childData.menuSeq);"><span></span></label>{{childData.menuName }}
						                                    	</a>
						                                    </li>
						                                </ul>
						                            </li>
								                    <!-- // 트리 데이터 -->
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
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