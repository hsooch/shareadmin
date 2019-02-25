<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<style>
li.active > a {
	color:#b40c0c!important
}
</style>

<!-- cont_bar -->
<div class="rightConBoxing">
	<div class="tab_wraping">
		<!-- tab1 -->
		<div id="tab1" class="tab-content current">
			<h5 class="cont_Title">
				코드 관리
				<div class="pg_location">
					<a >Go home</a> <span>&gt;</span>
					코드/대학정보 관리<span>&gt;</span> 코드 관리
				</div>
			</h5>
			<div id="innTabContent">
				<div class="_articleContent">
					<div class="_codeContent">
						<div class="_codeWrap">
							<div class="codetotal">
								<div class="_areaButton">
									<div class="_left">
										<span class="_button _large">
											<a  class="_blockUI mainBtn wx40"  ng-click="addNewCode();">추가</a>
										</span>
										<span class="_button _large Gray">
											<a  class="_blockUI wx40"  ng-click="removeCode();">삭제</a>
										</span>
									</div>
									<div class="_right"> 
                                        <div class="tree_updown">
                                            <span class="down"><a  ng-click="changeCodeIndex('down');">down</a></span>
                                            <span class="up"><a  ng-click="changeCodeIndex('up');">up</a></span>
                                        </div>  
                                    </div>
								</div>
								<div class="codeControl">
	                                <div class="tree">
	                                    <ul class="clfix">
	                                        <li id="codeRoot" class="deactive">
												<a  title="코드관리" style="cursor: pointer;background: url();" >코드관리</a>
											</li>
	                                    </ul>
	                                </div> 
	                            </div>
							</div>
						</div>
						<div class="codeTable">
							<div class="_border _write textAL">
								<div class="_inner">
									<fieldset>
										<legend>월별 접속통계 조회 </legend>
										<form name="selYearForm" method="post">
											<div class="_form _both">
												<div class="_insert tableWrap w280">
													<div class="innTable">
														<table class="w75">
															<colgroup>
																<col style="width: 20%">
																<col style="width: 80%">
															</colgroup>
															<tbody>
																<tr>
																	<td><label for="sch_search" class="">코드명</label></td>
																	<td>
																		<input kr-input type="text" id="" placeholder="" class="wx100"
																			ng-model="$root.university.code.keywords"
																			ng-keypress="($event.charCode==13)? searchCodeName() : return" kr-input>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
													<div class="_areaButton innerBtn">
														<div class="_right">
															<span class="_button _small _active searchBtn">
																<input type="button" value="조회" ng-click="searchCodeName();">
															</span>
														</div>
													</div>
												</div>
											</div>
										</form>
									</fieldset>
								</div>
							</div>
							<table class="_table _view w100">
								<caption>코드 관리 표</caption>
								<colgroup>
									<col style="width: 150px;">
									<col>
									<col style="width: 150px;">
									<col>
								</colgroup>

								<tbody>
									<tr>
										<th>상위코드명</th>
										<td colspan="3">{{$root.university.code.parentCodeName }}</td>
									</tr>
									<tr>
										<th>코드 ID</th>
										<td colspan="3">{{$root.university.code.code }}</td>
									</tr>
									<tr>
										<th>코드 명<span class="mark">*</span></th>
										<td colspan="3"><input type="text" id="codeName" placeholder="" class="w100" ng-model="$root.university.code.codeName" kr-input></td>
									</tr>
									<tr>
										<th>설명</th>
										<td colspan="3"><input type="text" id="" placeholder="" class="w100 hx90" ng-model="$root.university.code.codeDesc" kr-input></td>
									</tr>
									<tr>
										<th>사용유무</th>
										<td colspan="3">
											<div class="radioWrap">
												<div class="radio">
													<input type="radio" id="rad_Chek01" name="itmSoldout" title="사용" 
														ng-model="$root.university.code.useYn" value="Y">
													<label for="rad_Chek01"><span></span>사용</label>
												</div>
												<div class="radio">
													<input type="radio" id="rad_Chek02" name="itmSoldout" title="사용안함" 
														ng-model="$root.university.code.useYn" value="N">
													<label for="rad_Chek02"><span></span>사용안함</label>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<th>작성자 <span class="mark">*</span></th>
										<td colspan="3">{{$root.university.code.regUserName }}</td>
									</tr>
									<tr>
										<th>작성일</th>
										<td colspan="3">{{$root.university.code.regDt | getDateString:'yyyy.MM.dd' }}</td>
									</tr>
								</tbody>
							</table>
							<div class="_areaButton">
								<div class="_center">
									<span class="_button _large blackBtn">
										<a  class="_blockUI wx135"  ng-click="saveCodeInfo();">저장</a>
									</span>
									<span class="_button _large borderBtn">
										<a  class="_blockUI wx135"  ng-click="removeCode();">삭제</a>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- // cont_right -->
