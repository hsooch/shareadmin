<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript">
	
</script>
<div class="rightConBoxing">
	<div class="tab_wraping">
		<!-- tab1 -->
		<div id="tab1" class="tab-content current">
			<h5 class="cont_Title">
				회원탈퇴
				<div class="pg_location">
					<a >Go home</a> <span>&gt;</span>
					회원관리<span>&gt;</span> 회원탈퇴
				</div>
			</h5>
			<div id="innTabContent">
				<div class="_articleContent" ng-show="$root.member.withdraw.pageViewType == 'pwchk'">
					<div class="leaveWrap">
						<div class="imgContWrap">
							<div class="imgTxtWrap">
								<div class="imgWrap"></div>
								<div class="txtWrap">
									<p>
										정보를 안전하게 보호하기 위해 비밀번호를<br>다시 한 번 확인 합니다.
									</p>
									<span>회원님의 비밀번호가 타인에게 노출되지 않도록 주의해주세요.</span>
								</div>
							</div>
							<div class="leaveContent">
								<table class="leaveTable">
									<colgroup>
										<col style="width: auto;">
										<col style="width: auto;">
									</colgroup>
									<tbody>
										<tr>
											<th><div>아이디</div></th>
											<td><div id="userId">${session.userId }</div></td>
										</tr>
										<tr>
											<th><div>비밀번호</div></th>
											<td><input kr-input id="pwd" type="password" class="w100"
												ng-model="userPwd"
												ng-keypress="($event.charCode==13)? confirm() : return"
												autofocus></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="_areaButton">
						<div class="_center">
							<span class="_button _large blackBtn"><a class="_blockUI wx135"  ng-click="confirm();">확인</a></span>
						</div>
					</div>
				</div>
				<div class="_articleContent" ng-show="$root.member.withdraw.pageViewType == 'confirm'">
					<div class="leaveWrap leaveContent">
						<div class="contWrap">
							<div class="txtWrap">
								<p>회원탈퇴 전에 안내 사항을 확인해 주세요.</p>
							</div>
							<div class="leaveInfoContent tableWrap">
								<table class="leaveInfoTable">
									<colgroup>
										<col style="width: 33.3%;">
										<col style="width: 33.3%;">
										<col style="width: 33.3%;">
									</colgroup>
									<tbody>
										<tr>
											<th><div>
													탈퇴한 아이디는 본인과 <br> 타인 모두 재사용 및 복구가 <br> 불가하오니 신중하게
													<br> 선택하시기 바랍니다.
												</div></th>
											<th><div>
													탈퇴 후 회원정보 및 개인형 <br> 서비스 이용기록은 모두 <br> 삭제 됩니다.
												</div></th>
											<th><div>
													대학 담당자 및 평생학습 <br> 담당자는 부 담당자를 <br> 지정하세요.
												</div></th>
										</tr>
										<tr>
											<td><div>
													<p>
														사용하고 계신 아이디는 <br> 탈퇴할 경우 재사용 및 복구가 <br> 불가능합니다.
													</p>
												</div></td>
											<td><div>
													<p>
														회원정보, 게시판 등 개인형 서비스 <br> 이용기록은 모두 삭제되며, 삭제된 <br>
														데이터는 복구되지 않습니다.
													</p>
													<p>
														삭제되는 내용을 확인하시고 필요한 <br> 데이터는 미리 백업을 해주세요
													</p>
												</div></td>
											<td><div>
													<p>
														대학 담당자 및 평생학습 <br> 담당자는 원활한 운영을 위하여<br> 부 담당자를
														지정해 놓고 탈퇴<br> 하시기 바랍니다.
													</p>
													<p>
														담당자가 없을 경우 학점교류,<br> 세미나/특강 등의 승인이 필요한 <br> 업무에
														차질이 생길 수 있습니다.
													</p>
												</div></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="tableWrap">
								<table class="reasonTable">
									<colgroup>
										<col style="width: 18%;">
										<col style="width: 82%;">
									</colgroup>
									<tbody>
										<tr>
											<th><div>회원탈퇴 사유</div></th>
											<td>
												<div>
													<textarea ng-model="ta" name="withdraw-ta" id="withdraw-ta" placeholder="회원탈퇴 사유를 입력하세요. (200자 제한)"></textarea>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="_areaButton">
							<div class="_center">
								<span class="_button _large blackBtn">
									<a class="_blockUI wx135"  ng-click="withdraw();">회원탈퇴</a>
								</span>
								<span class="_button _large borderBtn">
									<a class="_blockUI wx135"  ng-click="goPwChkView();">취소</a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- // cont_right -->


