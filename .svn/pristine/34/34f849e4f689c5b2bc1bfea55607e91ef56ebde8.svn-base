<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>

<style>
	.on {color:#b40c0c!important;}
</style>

<div class="tab_wraping">
	<!-- tab1 -->
	<div id="tab1" class="tab-content current">
		<h5 class="cont_Title">MOU 대학 관리
			<div class="pg_location"><a href="javascript:;">Go home</a> <span>&gt;</span> 코드/대학정보 관리<span>&gt;</span> MOU 대학 관리</div>
		</h5>
		<div id="innTabContent">
			<div class="_articleContent">
				<div class="_codeContent">
					<div class="_codeWrap">
						<div class="codetotal">
							<div class="codeControl">
								<div class="tree">
									<ul class="clfix">
										<li class="last open" ng-repeat="data in $root.university.mou.universityList | orderBy:'code.codeName'" ng-init="!$root.university.mou.nowUniversityParentCode && $first && locationClick(data.code)">
											<button ng-click="locationClick(data.code);" type="button" class="toggle plus" ng-class="{minus:$root.university.mou.nowUniversityParentCode === data.code.code, plus:$root.university.mou.nowUniversityParentCode !== data.code.code}">-</button>
											<a ng-click="locationClick(data.code);" title="{{data.code.codeName}}" style="cursor: pointer;">{{data.code.codeName}}</a>
											<ul ng-show="$root.university.mou.nowUniversityParentCode === data.code.code">
												<li class="last" ng-repeat="sub in data.subCodeList | orderBy:'codeName'" ng-init="!$root.university.mou.nowUniversityCode && $parent.$first && $first && universityClick(sub, data.code)">
													<a ng-click="universityClick(sub, data.code);" ng-class="{on:$root.university.mou.nowUniversityCode === sub.code}" title="{{sub.codeName}}" style="cursor: pointer;">{{sub.codeName}}</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="codeGroupWrap">
						<div class="codeGroup">
							<div class="codeListWrap">
								<div class="codelist codelistL">
									<div class="codelist_con">
										<div class="codelist_tit">참여 협의회 리스트</div>
										<div class="tree_addDel">
											<span class="add"><a ng-click="addGroupClick();" style="cursor: pointer;">down</a></span>
											<span class="del"><a ng-click="removeGroup();" style="cursor: pointer;">up</a></span>
										</div>
										<div class="sch_code">
											<ul>
												<!-- 참여 협의회 리스트 있을 경우
                                                    style="display:none"  -->
												<li ng-show="$root.university.mou.attachedGroupList.length === 0">참여 협의회가 없습니다. 우측 상단의 [+]버튼을 눌러 추가해주세요.</li>
												<!-- //참여 협의회 리스트 있을 경우  -->
												<li ng-repeat="group in $root.university.mou.attachedGroupList" ng-click="group.checked = !group.checked" ng-class="{active:group.checked}">
                                                    {{group.groupName}}
                                                </li>
											</ul>
										</div>
									</div>
									<div class="codelist_con mt20">
										<div class="codelist_tit">개별 협약대학 리스트</div>
										<div class="tree_addDel">
											<span class="add"><a ng-click="addIndividualMouClick();" style="cursor: pointer;">down</a></span>
											<span class="del"><a ng-click="removeMouUniv();" style="cursor: pointer;">up</a></span>
										</div>
										<div class="sch_code">
											<ul>
												<!-- 개별 협약대학 리스트 있을 경우
                                                    style="display:none"  -->
												<li ng-show="$root.university.mou.individualMouList.length === 0">개별 협약대학이 없습니다. 우측 상단의 [+]버튼을 눌러 추가해주세요</li>
												<!-- //개별 협약대학 리스트 있을 경우  -->
												<li ng-repeat="univ in $root.university.mou.individualMouList" ng-click="univ.checked = !univ.checked" ng-class="{active:univ.checked}">
													{{univ.mouUnivName}}
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="codelist codelistR">
									<div class="codelist_con">
										<div class="codelist_tit">협의회 참여대학 및 개별협약대학교</div>
										<div class="sch_code">
											<ul>
												<!-- 협의회 참여대학 및 개별협약대학교 있을 경우
                                                    style="display:none"  -->
												<li ng-if="$root.university.mou.mouList.length === 0">참여 협의회 및 개별 협약대학이 없습니다. 좌측 상단의 [+]버튼을 눌러 추가해주세요</li>
												<li ng-repeat="mou in $root.university.mou.mouList">
													<span ng-if="mou.mouUnivCode !== '-1'">
														({{mou.areaName}}){{mou.mouUnivName}} <span ng-if="mou.limitCnt > 0">(제한 {{mou.limitCnt}}명)</span>
													</span>
													<span ng-if="mou.mouUnivCode === '-1'">
														------------------
													</span>
												</li>

											</ul>
										</div>
										<div class="_areaButton">
											<div class="_center">
												<span class="_button _large blackBtn"><a ng-click="setApplyMouLimitClick();" style="cursor: pointer;" class="w100">학점교류신청 인원 제한</a></span>
											</div>
										</div>
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

