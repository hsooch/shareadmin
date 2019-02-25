((function() {
    angular.module('appModule').controller('withdrawMemberCtrl', function($scope, $rootScope, $location, $cookies, commonService, userService, Const) {
            console.log("withdraw from member in....");
            
            /** 회원탈퇴 비밀번호 정합성 체크 **/
            var validateData = function() {
                if (!$scope.userPwd) {
                    commonService.alert('비밀번호를 입력해주세요.');
                    return true;
                }
                return false;
            };
            
            /**
             * 회원탈퇴 비밀번호 확인 페이지
             */
            $scope.goPwChkView = function() {
				$rootScope.member.withdraw.pageViewType = "pwchk";
				$scope.userPwd = '';
			};
            
            /**
             * 확인 버튼 클릭했을 때 이벤트
             */
            $scope.confirm = function() {
                if (validateData()) {
                    return;
                }
                $rootScope.member.withdraw.pageViewType = "confirm";
                $rootScope.member.withdraw.userId = $('#userId').text();
                
                var param = {
                		userId : $rootScope.member.withdraw.userId,
                		userPwd : $scope.userPwd
                };
                
                /**
                 * 패스워드 체크
                 */
                userService.getUserCount(param, function(data) {
                	if (data.userCount === 0) {
                		commonService.alert('비밀번호가 일치하지 않습니다.');
                		return true;
                	}
                });
            };
            
            /**
             * 글자수 200자 체크
             */
            $('#withdraw-ta').on('keyup', function() {
                if($(this).val().length > 200) {
                	commonService.alert('회원탈퇴 사유는 200자 이상 초과할 수 없습니다.');
                    $(this).val($(this).val().substring(0, 200));
                }
            });
            
            
            /**
             * 회원탈퇴 버튼 클릭했을 때 이벤트
             */
            $scope.withdraw = function() {
            	if(!$scope.ta) {	// 사유 미입력시
            		commonService.alert('회원탈퇴 사유를 입력해주세요.');
            		$('#withdraw-ta').focus();
            	}
            	else {
            		commonService.confirm('회원탈퇴 신청하시겠습니까?', function() {
            			var param = {
            					REASON : $scope.ta,
            					USERID : $rootScope.member.withdraw.userId
            			};
            			userService.withdrawMember(param, function(data) {
            				console.log(data);
        					commonService.alert('회원탈퇴가 신청 되었습니다. 통합관리자가 승인/반려 처리하여 메일과 SMS로 알려드리겠습니다.', function() {
        					    location.href = Const.contextPath + 'login/login.do';
                            });
            			});
            		});
            	}
            }
        });
})());