<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>



<style>
.finish-wrap .tx{
	background:url() !important;
}
</style>

<div class="tab_wraping">
	<!-- tab1 -->
	<div id="tab1" class="tab-content current">
	    <h5 class="cont_Title">권한그룹 등록/조회
	        <div class="pg_location"><a >Go home</a> <span>&gt;</span> ADMIN<span>&gt;</span> 권한 관리<span>&gt;</span> 권한그룹 등록/조회</div>
	    </h5>
	    <div id="innTabContent">
	    	<!-- article list -->
	        <div class="_articleContent" ng-show="$root.authority.group.pageViewType == 'list'">
	            <div class="_border _write mt10">
	                <div class="_inner">
	                    <fieldset>
	                    <legend>월별 접속통계 조회 </legend>
	                    <form name="selYearForm" method="post">
	                        <div class="_form _both">
	                            <div class="_insert tableWrap w1120">
	                                <div class="innTable">
	                                    <table class="w80">
	                                        <colgroup>
	                                            <col style="width:8%">
	                                            <col style="width:13%">
	                                            <col style="width:20%">
	                                            <col style="width:8%">
	                                            <col style="width:10%">
	                                            <col style="width:8%">
	                                            <col style="width:33%">
	                                        </colgroup>
	                                        <tbody>
	                                            <tr>
	                                                <td><label for="sch_kind" class="pl10">학교 구분</label></td>
	                                                <td>
	                                                    <select name="mem_college" id="mem_college" class="_selectBox _fL w100" ng-model="$root.authority.group.searchUnivArea" ng-change="getChildCdList('searchUnivArea', 'searchUniv')">
															<option value="{{code.code}}" ng-repeat="code in $root.authority.group.searchUnivAreaList | orderBy:codeIdx:false">{{code.codeName}}</option>
														</select>
	                                                </td>
			 										<td>
	                                                    <select name="mem_college" id="mem_college" class="_selectBox _fL w95" ng-model="$root.authority.group.searchUniv">
															<option value="{{code.code}}" ng-repeat="code in $root.authority.group.searchUnivList | orderBy:codeIdx:false">{{code.codeName}}</option>
														</select>
	                                                </td>
	                                                <td><label for="sch_division" class="pl10">권한<br>사용유무</label></td>
	                                                <td><select name="sch_division" id="sch_division" class="_selectBox _fL wx100" ng-model="$root.authority.group.searchUseYn">
	                                                    <option value="">전체</option>
	                                                    <option value="Y">사용</option>
	                                                    <option value="N">중지</option>
	                                                </select>
	                                                </td>
	                                                <td><label for="sch_search" class="pl20">검색</label></td>
	                                                <td>
	                                                    <select name="sch_search" id="sch_search" class="_selectBox _fL wx100" ng-model="$root.authority.group.searchOption">
	                                                        <option value="">전체</option>
	                                                        <option value="name">권한그룹명</option>
	                                                        <option value="desc">설명</option>
	                                                        <option value="user">작성자</option>
	                                                    </select>
	                                                    <input type="text" id="" placeholder="" class="w60"
	                                                    	ng-model="$root.authority.group.searchKeywords" ng-show="$root.authority.group.searchOption != 'user'" kr-input>
	                                                    <select name="sch_search" id="sch_search" class="_selectBox _fL w60"
	                                                    	ng-model="$root.authority.group.searchUser" ng-show="$root.authority.group.searchOption == 'user'">
	                                                        <option value="{{user.userSeq}}" ng-repeat="user in $root.authority.group.searchUserList">{{user.userName}}</option>
	                                                    </select>
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
	            <div class="_listHead mt40">
	                <div class="_count">
	                    총  <strong>{{$root.authority.group.totalCnt}}</strong>  건이 검색되었습니다.
	                </div>
	                <div class="_search pr0">
	                    <div class="_btnSet pr0">
	                        <span class="_button _large"><a  class="mainBtn" ng-click="goGroupRegistView();">권한그룹 등록</a></span>
	                    </div>
	                    <fieldset>
	                        <legend>개수</legend>
	                        <select name="findType" class="_selectBox wx70" ng-model="$root.authority.group.maxRowCnt" ng-change="changeMaxRowCnt();">
	                            <option value="10">10개 </option>
	                            <option value="20">20개 </option>
	                            <option value="30">30개 </option>
	                            <option value="40">40개 </option>
	                            <option value="50">50개 </option>
	                        </select>
	                    </fieldset>
	                </div>
	            </div>
	            <table class="_table _list w100 ">
	                <caption>표 제목</caption>
	                <colgroup>
	                    <col style="width:80px;">
	                    <col style="width:10%;">
	                    <col style="width:12%;">
	                    <col style="width:30%;">
	                    <col style="width:10%;">
	                    <col style="width:10%;"> 
	                    <col style="width:10%;"> 
	                    <col style="width:80px;">  
	                </colgroup>
	                <thead>
	                    <tr>
	                        <th><input type="checkbox" id="basicCheckAll" ng-model="$root.authority.group.isCheckedAll" ng-click="checkAll()"><label for="basicCheckAll" ng-click="clickAll();"><span></span></label></th>
	                        <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="univCode" data-order="desc"><span>학교구분<a style="display:none;" class="down"></a></span></th>
	                        <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="groupName" data-order="desc"><span class="">권한그룹 명<a style="display:none;" class="down"></a></span></th>
	                        <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="groupDesc" data-order="desc"><span class="">설명<a style="display:none;" class="down"></a></span></th>
	                        <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="useYn" data-order="desc"><span class="">권한<br>사용유무<a style="display:none;" class="down"></a></span></th>
	                        <th>권한설정</th>
	                        <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="regUserName" data-order="desc"><span class="">작성자<a style="display:none;" class="down"></a></span></th>
	                        <th class="lineUp" ng-click="changeSortOrder($event)" data-sort="regDt" data-order="desc"><span class="">작성일<a style="display:none;" class="down"></a></span></th>
	                    </tr>
	                </thead>
<!-- 	                <tbody ng-show="$root.authority.group.groupList.length == 0"> -->
<!-- 							list 없을 경우 문구 출력 style="display:lnline-block; -->
<!-- 							<tr class="nosearchData" ng-style="nosearch" style="display: lnline-block;"> -->
<!-- 								<td colspan="15">없습니다.</td> -->
<!-- 							</tr> -->
<!-- 					</tbody> -->
	                <tbody ng-show="$root.authority.group.groupList.length > 0">
	                    <tr class="firTd" ng-repeat="groupInfo in $root.authority.group.groupList | orderBy:descRn:false">
	                        <td>
	                        	<a>
	                        	<input class="this_chk" type="checkbox" id="thisChk_{{groupInfo.groupSeq}}" name="thisChk_{{groupInfo.groupSeq}}" ng-model="groupInfo.isChecked">
	                        	<label for="thisChk_{{groupInfo.groupSeq}}" ng-click="chkForDel(groupInfo.groupSeq, groupInfo.haveUserCnt, groupInfo.isChecked);"><span></span></label>
	                        	</a>
	                        </td>
	                        <td>{{groupInfo.univCodeName}}</td>
	                        <td class="_aL">{{groupInfo.groupName}}</td>
	                        <td>{{groupInfo.groupDesc}}</td>
	                        <td>{{groupInfo.useYn}}</td>
	                        <td><span class="_button _minimum"><a ng-click="goGroupRegistView(groupInfo.groupSeq, $index);">권한설정</a></span></td>
	                        <td>{{groupInfo.regUserName}}</td>
	                        <td>{{groupInfo.regDt | getDateString:'yyyy.MM.dd' }}</td>
	                    </tr>
	                </tbody>
	            </table>
	            <div class="_paging" ng-show="$root.authority.group.groupList.length > 0" id="groupListPaging">
				</div>
	            <div class="_areaButton">
	                <div class="_left">
	                    <span class="_button _large borderBtn"><a  ng-click="deleteList();">선택삭제</a></span>
	                </div>
	                <div class="_search pr0 _right">
	                    <div class="_btnSet pr0">
	                        <span class="_button _large"><a  class="mainBtn">권한그룹 등록</a></span>
	                    </div>
	                    <fieldset>
	                        <legend>개수</legend>
	                        <select name="findType" class="_selectBox wx70">
	                            <option value="10">10개 </option>
	                            <option value="20">20개 </option>
	                            <option value="30">30개 </option>
	                            <option value="40">40개 </option>
	                            <option value="50">50개 </option>
	                        </select>
	                    </fieldset>
	                </div>
	            </div>
			</div>
			<!-- // article list -->
			<!-- article regist -->
	        <div class="_articleContent" ng-show="$root.authority.group.pageViewType == 'regist'">
				<div class="menuTabWrap">
				    <div class="menuTabTitle pb10">권한정보</div>
				    <table class="_table _view w100">
				        <caption>회원정보 수정 표</caption>
				        <colgroup>
				            <col style="width:150px;">
				            <col>
				        </colgroup>
				        <tbody>
				            <tr>
				                <th>학교구분 <span class="mark">*</span></th>
                                <td>
                                    <select name="mem_college" id="mem_college" class="_selectBox _fL wx125 mr05"
                                    	ng-model="$root.authority.group.groupInfo.univAreaCode" ng-change="getChildCdList('univAreaCode', 'univCode')">
										<option value="{{code.code}}"
											ng-repeat="code in $root.authority.group.univAreaCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
									</select>
									<select name="mem_college" id="mem_college" class="_selectBox _fL wx270"
										ng-model="$root.authority.group.groupInfo.univCode">
										<option value="{{code.code}}"
											ng-repeat="code in $root.authority.group.univCodeList | orderBy:codeIdx:false">{{code.codeName}}</option>
									</select>
                                </td>
				            </tr>
				            <tr>
				                <th>권한 그룹명 <span class="mark">*</span></th>
				                <td>
				                   <input type="text" id="groupName" placeholder="" class="w100" ng-model="$root.authority.group.groupInfo.groupName" kr-input>
				                </td>
				            </tr>
				            <tr>
				                <th>권한 사용유무</th>
				                <td>
				                    <div class="radioWrap">
				                        <div class="radio">
			                                <input type="radio" id="rad_Chek01" name="itmSoldout" title="사용" ng-model="$root.authority.group.groupInfo.useYn" value="Y">
			                                <label for="rad_Chek01"><span></span>사용</label>
				                        </div>
				                        <div class="radio">
			                                <input type="radio" id="rad_Chek02" name="itmSoldout" title="중지" ng-model="$root.authority.group.groupInfo.useYn" value="N">
			                                <label for="rad_Chek02"><span></span>중지</label>
			                      	    </div>
				                    </div>
				                </td>
				            </tr>
				            <tr>
				                <th>설명 <span class="mark"></span></th>
				                <td>
				                    <input type="text" id="" placeholder="" class="w100 hx90" ng-model="$root.authority.group.groupInfo.groupDesc" kr-input>
				                </td>
				            </tr>
				            <tr>
				                <th>작성자 <span class="mark"></span></th>
				                <td>{{$root.userSession.userName}}</td>
				            </tr>
				            <tr>
				                <th>작성일 <span class="mark"></span></th>
				                <td>{{ $root.authority.group.groupInfo.regDt | getDateString:'yyyy.MM.dd' }}</td>
				            </tr>
				        </tbody>
				    </table>
				    <div class="_areaButton">
				        <div class="_center">
				            <span class="_button _large blackBtn"><a class="mwx135" ng-click="saveGroupInfo();">저장</a></span>
				            <span class="_button _large borderBtn"><a  class="mwx135" ng-click="goGroupListView();">취소</a></span>
				            <span class="_button _large borderBtn" ng-show="$root.authority.group.groupInfo.uc === 0"><a  class="mwx135" ng-click="dg($root.authority.group.groupInfo.groupSeq)">삭제</a></span>
				        </div>
				    </div>
				</div>
				<div class="menuTreeWrap">
				    <div class="menuTabTitle">권한 메뉴 설정</div>
					    <div class="menuEditer pt10">
					        <div class="checkControl">
					           <div class="tree checkTree">
					                <ul class="clfix">
					                    <li class="last">
					                   		<button type="button" class="toggle plus" ng-click="clickToggle();">+</button>
					                    	<a title="전체메뉴"><input type="checkbox" class="chk_seq" id="itm_Allcheck" name="itm_Allcheck"><label for="itm_Allcheck"><span></span></label>전체메뉴</a>
					                        <ul>
							                	<!-- 트리 데이터 -->
					                            <li class="last open" ng-repeat="data in $root.authority.group.tree | orderBy:'data.menuIndex'" ng-init="!$root.authority.group.nowGroupParentSeq && $first && clickToggle(data.menuSeq) && checkbox(childData.menuSeq)">
					                           		<button type="button" id="toggle_{{data.menuSeq}}" class="toggle" ng-class="{minus:data.pm === 'minus'}" ng-click="clickToggle(data.menuSeq);">-</button>
					                            	<a title="{{data.menuName }}" style="cursor: pointer;">
					                            		<input type="checkbox" class="chk_seq" id="chk_{{data.menuSeq}}" name="chk_{{data.menuSeq}}" ng-click="checkbox(childData.menuSeq);">
					                            		<label for="chk_{{data.menuSeq}}" ng-click="checkbox(data.menuSeq);"><span></span></label>{{data.menuName }}
					                            	</a>
					                                <ul id="ul_{{data.menuSeq}}" style="display: none;">
					                                    <li ng-repeat="childData in data.children | orderBy:'menuIndex'" ng-init="!$root.authority.group.nowGroupParentSeq && $parent.$first && $first && clickSubToggle(childData, data.menuSeq) && checkbox(childData.menuSeq)">
					                                    	<a title="{{childData.menuName }}" style="cursor: pointer;">
					                                    		<input type="checkbox" class="chk_seq" id="chk_{{childData.menuSeq }}" name="chk_{{childData.menuSeq }}">
					                                    		<label for="{{childData.menuSeq }}" ng-click="checkbox(childData.menuSeq);"><span></span></label>{{childData.menuName }}
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
			<!-- // article regist -->
		</div>
	</div>
</div>
	            
