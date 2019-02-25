((function() {
	angular.module('appModule').controller('loginCtrl', function($rootScope, $scope, $cookies, loginService, userService, commonService, Const, ngDialog) {
		$rootScope.login.scope = $scope;
		$scope.epkiAutoPopUseYn = $cookies.get("epkiAutoPopUseYn") === "Y" ? "Y" : "N";
		$scope.saveUserId = $cookies.get("saveUserId")+"" == "true" ? true : false;
		$scope.userId = $scope.saveUserId ? $cookies.get("userId") : null;
		$scope.sessionId = '';
		$scope.serverCert = '';
		
		
		/**
		 * EPKI 로그인 사용여부 쿠키값 저장.
		 */
		$scope.setEpkiAutoPopUseCookie = function(val){
			var date = new Date();
        	date.setDate(date.getDate()+7);
			$cookies.put("epkiAutoPopUseYn", val, {path:"/", expires:date.toGMTString()});
		};
        
		/**
		 * EPKI 초기화 
		 */
		$scope.initEpki = function(){
			commonService.initEpki(function(data){
				$scope.sessionId = data.sessionID;
				$scope.serverCert = data.strServerCert;
				epki.init($scope.sessionId);
				
				if($scope.epkiAutoPopUseYn == "Y"){
					$scope.requestSessionEpki("loginEpki");
				}
			});
		};
		$scope.initEpki();
		
		/**
		 * EPKI 로그인을 위한 채널생성
		 */
		$scope.requestSessionEpki = function(nextFn){
			/* Call Back Function Definition */
            var success = function(output) {
            	console.log("after request session epki",output);
            	commonService.setRequestSessionEpki(output, function(data){
            		console.log(data);
            		$scope[nextFn]();
            	});
                /*
            	secureChannelTexts.eq(0).val(output);
                $("#secureChannel_test").find("form").submit();
                */
            };
            var error = function(errCode, errMsg) {
                alert(errCode + ": " + errMsg);
            };
            epki.requestSession($scope.serverCert, "SEED", $scope.sessionId, success, error);
		};
		
    	/**
         * EPKI 로그인 layer
         */
        $scope.loginEpki = function(){
        	/* Call Back Function Definition */
            var success = function(output) {
            	console.log("after login epki",output);
            	commonService.decodeEpkiCertificationResult(output, function(data){
            		console.log(data);
            		if(data.testResult == "성공"){
            			$scope.loginEpkiNextStep(data);
            			var bserial = data.bserial;
            			var subjectDnArr = data.subjectDn.split(",");
            			if(subjectDnArr.length > 1){
            				$("#mobUserName").val(subjectDnArr[0].replace(/[0-9]/ig,"").substring(3,subjectDnArr[0].length));
            			}
            			$("#di").val(bserial);
            			$scope.moveNextStep();
            		}
            	});
            };
            var error = function(errCode, errMsg) {
                alert(errCode + ": " + errMsg);
            };
            epki.login($scope.serverCert, success, error);
        };
        
        $scope.loginEpkiNextStep = function(data){
        	var bserial = data.bserial;
        	var param = {
        			di : bserial
        	};
        	$rootScope.httpLoadingCnt++;
        	loginService.loginProgress(param, function(data){
        		switch(data.resultCode){
        		case 'LE00': //회원정보 없음
        		case 'LE05': //승인되지 않음.
        		case 'LE06': //관리자 계정이 아님.
        			$rootScope.httpLoadingCnt--;
        			commonService.alertForLogin(Const.message["RESULT_CODE_"+data.resultCode], function(){$scope.inProgress = false;});
        			break;
        		case 'LE01': //비밀번호 입력오류 제한횟수 초과
        		case 'LE02': //휴면계정
        			$rootScope.httpLoadingCnt--;
        			commonService.alertForLogin(Const.message["RESULT_CODE_"+data.resultCode], function(){
        				$scope.inProgress = false;
        				var htmlContext = 'common/';
        				if(data.resultCode === 'LE01') htmlContext += 'pwdErrPermitedCntPop.html';
        				else if(data.resultCode === 'LE02') htmlContext += 'certificationPop.html';
        				
        				$rootScope.login.errCode = nvltoStr(data.resultCode, "");
        				
        				if(htmlContext === 'common/') return;
        				
        				//$("#certificationPop").show();
        				//return;
        				ngDialog.open({
                            template: Const.contextPath + htmlContext,
                            showClose: false,
                            closeByDocument: false,
                            width: 690,
                            trapFocus : false,
                            controller: function($rootScope, $scope, commonService, $cookies) {
                            	$rootScope.login.popupScope = $scope;
                            	$scope.oldUserPwd = null;
        						$scope.userPwd = null;
        						$scope.confirmUserPwd = null;
        						$scope.pwdErrPermitedCnt_step = 1;
        						$scope.userEmail = null;
        						
        						/**
        				         * EPKI인증
        				         */
        				        $scope.epkiCertificate = function() {
        				        	alert("인증하기 클릭!");
        				        	
        				        };
        						
        						/**
        				         * 휴대폰 인증
        				         */
        				        $scope.cellPhoneCertificate = function() {
        				        	$rootScope.login.purposeToCert = "loginProgress";
        				        	cellPhoneCertificate(); //휴대폰 본인인증 팝업
        				        	
        				        };
        						
                                $scope.updateUserPwd = function() {
                                	if(isNull($scope.oldUserPwd)){
                            			commonService.alertForLogin("현재 비밀번호를 입력해주세요.", $("[ng-model='oldUserPwd']").focus());
                            			return false;
                            		}
                                	
                                	if(isNull($scope.userPwd)){
                            			commonService.alertForLogin("비밀번호를 입력해주세요.", $("[ng-model='userPwd']").focus());
                            			return false;
                            		}else{
                            			var numCnt = $scope.userPwd.search(/[0-9]/g); //비밀번호 숫자 카운트
                            	        var chrCnt = $scope.userPwd.search(/[a-z]/ig);	//비밀번호 영문 소문자 카운트
                            	        var uppChrCnt = $scope.userPwd.search(/[A-Z]/ig); //비밀번호 영문 대문자 카운트
                            	        var specialCnt = $scope.userPwd.search(/[`~!@#$%^&*()_\-+=|\\\'\";:\/?<>,.]/gi); //비밀번호 특수문자 카운트
                            	        
                            	        var totCnt = $scope.userPwd.length;// 비밀번호길이
                            			
                        	        	if(numCnt < 0 || (chrCnt+uppChrCnt) < 0 || specialCnt < 0 || totCnt < 10){
                        	        		commonService.alertForLogin("새 비밀번호는 영문, 숫자, 특수문자를 포함한 10~15자로 입력해주세요.", $("[ng-model='userPwd']").focus());
                                			return false;
                        	        	}
                            		}
                            		
                            		if(isNull($scope.confirmUserPwd)){
                            			commonService.alertForLogin("새 비밀번호를 재입력해주세요.", $("[ng-model='confirmUserPwd']").focus());
                            			return false;
                            		}else{
                            			if($scope.userPwd != $scope.confirmUserPwd){
                            				commonService.alertForLogin("비밀번호가 일치하지 않습니다.", $("[ng-model='confirmUserPwd']").focus());
                                			return false;
                            			}
                            		}
                                	
                            		var param = {
            								oldUserPwd : $scope.oldUserPwd,
            								userPwd : $scope.userPwd,
            								confirmUserPwd : $scope.confirmUserPwd
            						};
                                	
                                   	userService.updateUserPwd(param, function(data){
                                   		if(isNull(data.resultDetail)){
                                   			commonService.alertForLogin("비밀번호가 변경되었습니다.", function(){
                                   				window.location.reload();
        	                           			//$scope.closeThisDialog();
        	                           		});
                                   		}else{
                                   			if(data.resultDetail.resultCode == "PC00"){
                                   				commonService.alertForLogin("현재 비밀번호가 일치하지 않습니다.\n다시 입력해 주세요.", function(){
        	                           				$("[ng-model='oldUserPwd']").focus();
        	                           			});
                                   			}
                                   		}
                                   	});
                                };
                                
                                $scope.pwdChangeHold = function() {
                                	var date = new Date();
                                	date.setDate(date.getDate()+7);
                                	$cookies.put("pwdChangeHold", true, {path:"/", expires:date.toGMTString()});
                                	$scope.closeThisDialog();
                                };
                                
                                
                                $scope.closeLayerPopup = function() {
                                	$scope.closeThisDialog();
                                }
                            }
                        });
        			});
        			break;
        		case '00':
    			default:
    				$cookies.put("userId", $scope.userId);
    				$cookies.put("saveUserId", $scope.saveUserId);
    				location = '/main.do';
    				break;

    				// $cookies.put("userId", $scope.userId);
    				// $cookies.put("saveUserId", $scope.saveUserId);
    				// $("#assertLoginFrm").find("[name='nameId']").val($scope.userId);
    				// $("#assertLoginFrm").submit();
    				// break;

        		}
        	});
        };
        
    	/**
         * ID/PWD 로그인
         */
        $scope.inProgress = false;
        $scope.loginIdPwd = function(){
        	if($scope.inProgress) return;
        	else $scope.inProgress = true;
        	
        	if(isNull($scope.userId)){
        		commonService.alertForLogin("아이디를 입력해 주세요.", function(){
        			$("[ng-model='userId']").focus();
        		});
        		return;
        	}
        	if(isNull($scope.userPwd)){
        		commonService.alertForLogin("비밀번호를 입력해 주세요.", function(){
        			$("[ng-model='userPwd']").focus();
        		});
        		return;
        	}
        	
        	var param = {
        			userId : $scope.userId,
        			userPwd : $scope.userPwd
        	};
        	$rootScope.httpLoadingCnt++;
        	loginService.loginProgress(param, function(data){
        		switch(data.resultCode){
        		case 'LE00': //회원정보 없음
        		case 'LE05': //승인되지 않음.
        		case 'LE06': //관리자 계정이 아님.
        			$rootScope.httpLoadingCnt--;
        			commonService.alertForLogin(Const.message["RESULT_CODE_"+data.resultCode], function(){$scope.inProgress = false;});
        			break;
        		case 'LE01': //비밀번호 입력오류 제한횟수 초과
        		case 'LE02': //휴면계정
        			$rootScope.httpLoadingCnt--;
        			commonService.alertForLogin(Const.message["RESULT_CODE_"+data.resultCode], function(){
        				$scope.inProgress = false;
        				var htmlContext = 'common/';
        				if(data.resultCode === 'LE01') htmlContext += 'pwdErrPermitedCntPop.html';
        				else if(data.resultCode === 'LE02') htmlContext += 'certificationPop.html';
        				
        				$rootScope.login.errCode = nvltoStr(data.resultCode, "");
        				
        				if(htmlContext === 'common/') return;
        				
        				//$("#certificationPop").show();
        				//return;
        				ngDialog.open({
                            template: Const.contextPath + htmlContext,
                            showClose: false,
                            closeByDocument: false,
                            width: 690,
                            trapFocus : false,
                            controller: function($rootScope, $scope, commonService, $cookies) {
                            	$rootScope.login.popupScope = $scope;
                            	$scope.oldUserPwd = null;
        						$scope.userPwd = null;
        						$scope.confirmUserPwd = null;
        						$scope.pwdErrPermitedCnt_step = 1;
        						$scope.userEmail = null;
        						
        						/**
        				         * EPKI인증
        				         */
        				        $scope.epkiCertificate = function() {
        				        	$rootScope.login.scope.requestSessionEpki("selfAuthEpki");
        				        };
        						
        						/**
        				         * 휴대폰 인증
        				         */
        				        $scope.cellPhoneCertificate = function() {
        				        	$rootScope.login.purposeToCert = "loginProgress";
        				        	cellPhoneCertificate(); //휴대폰 본인인증 팝업
        				        };
        						
                                $scope.updateUserPwd = function() {
                                	if(isNull($scope.oldUserPwd)){
                            			commonService.alertForLogin("현재 비밀번호를 입력해주세요.", $("[ng-model='oldUserPwd']").focus());
                            			return false;
                            		}
                                	
                                	if(isNull($scope.userPwd)){
                            			commonService.alertForLogin("비밀번호를 입력해주세요.", $("[ng-model='userPwd']").focus());
                            			return false;
                            		}else{
                            			var numCnt = $scope.userPwd.search(/[0-9]/g); //비밀번호 숫자 카운트
                            	        var chrCnt = $scope.userPwd.search(/[a-z]/ig);	//비밀번호 영문 소문자 카운트
                            	        var uppChrCnt = $scope.userPwd.search(/[A-Z]/ig); //비밀번호 영문 대문자 카운트
                            	        var specialCnt = $scope.userPwd.search(/[`~!@#$%^&*()_\-+=|\\\'\";:\/?<>,.]/gi); //비밀번호 특수문자 카운트
                            	        
                            	        var totCnt = $scope.userPwd.length;// 비밀번호길이
                            			
                        	        	if(numCnt < 0 || (chrCnt+uppChrCnt) < 0 || specialCnt < 0 || totCnt < 10){
                        	        		commonService.alertForLogin("새 비밀번호는 영문, 숫자, 특수문자를 포함한 10~15자로 입력해주세요.", $("[ng-model='userPwd']").focus());
                                			return false;
                        	        	}
                            		}
                            		
                            		if(isNull($scope.confirmUserPwd)){
                            			commonService.alertForLogin("새 비밀번호를 재입력해주세요.", $("[ng-model='confirmUserPwd']").focus());
                            			return false;
                            		}else{
                            			if($scope.userPwd != $scope.confirmUserPwd){
                            				commonService.alertForLogin("비밀번호가 일치하지 않습니다.", $("[ng-model='confirmUserPwd']").focus());
                                			return false;
                            			}
                            		}
                                	
                            		var param = {
            								oldUserPwd : $scope.oldUserPwd,
            								userPwd : $scope.userPwd,
            								confirmUserPwd : $scope.confirmUserPwd
            						};
                                	
                                   	userService.updateUserPwd(param, function(data){
                                   		if(isNull(data.resultDetail)){
                                   			commonService.alertForLogin("비밀번호가 변경되었습니다.", function(){
                                   				window.location.reload();
        	                           			//$scope.closeThisDialog();
        	                           		});
                                   		}else{
                                   			if(data.resultDetail.resultCode == "PC00"){
                                   				commonService.alertForLogin("현재 비밀번호가 일치하지 않습니다.\n다시 입력해 주세요.", function(){
        	                           				$("[ng-model='oldUserPwd']").focus();
        	                           			});
                                   			}
                                   		}
                                   	});
                                };
                                
                                $scope.pwdChangeHold = function() {
                                	var date = new Date();
                                	date.setDate(date.getDate()+7);
                                	$cookies.put("pwdChangeHold", true, {path:"/", expires:date.toGMTString()});
                                	$scope.closeThisDialog();
                                };
                                
                                
                                $scope.closeLayerPopup = function() {
                                	$scope.closeThisDialog();
                                }
                            }
                        });
        			});
        			break;
        		case '00':
    			default:
    				$cookies.put("userId", $scope.userId);
    				$cookies.put("saveUserId", $scope.saveUserId);
    				location = '/main.do';
    				break;

    				// $cookies.put("userId", $scope.userId);
    				// $cookies.put("saveUserId", $scope.saveUserId);
    				// $("#assertLoginFrm").find("[name='nameId']").val($scope.userId);
    				// $("#assertLoginFrm").submit();
    				// break;

        		}
        	});
        };
        
        /**
         * ID/PWD 찾기 EPKI 인증
         */
        $scope.selfAuthEpki = function(){
        	/* Call Back Function Definition */
            var success = function(output) {
            	console.log("after login epki",output);
            	commonService.decodeEpkiCertificationResult(output, function(data){
            		console.log(data);
            		if(data.testResult == "성공"){
            			var bserial = data.bserial;
            			$("#di").val(bserial);
            			$("div[id^='ngdialog']").each(function(){ $(this).show(); });
            			$scope.branchPurPoseToCert();
            		}
            	});
            };
            var error = function(errCode, errMsg) {
                alert(errCode + ": " + errMsg);
            };
            epki.login($scope.serverCert, success, error);
            $("div[id^='ngdialog']").each(function(){ $(this).hide(); });
        };
        
        /**
         * 회원가입
         */
        $scope.registAccount = function(){
        	location = Const.contextPath + "user/regist/main.do";
        };
        
        /**
         * 아이디/비밀번호 찾기
         */
        $scope.findIdPwd = function(){
        	ngDialog.open({
                template: Const.contextPath + 'common/findUserIdPwdPop.html',
                showClose: false,
                closeByDocument: false,
                width: 690,
                trapFocus : false,
                controller: function($rootScope, $scope, commonService, $cookies) {
                	$rootScope.login.popupScope = $scope;
                	$scope.userId = null;
					$scope.findView_step = 1;
					$scope.pwdErrPermitedCnt_step = 0;
					$scope.userEmail = null;
					
					/**
			         * EPKI인증
			         */
			        $scope.epkiCertificate = function() {
			        	$rootScope.login.purposeToCert = "findIdPwd";
			        	$rootScope.login.scope.requestSessionEpki("selfAuthEpki");
			        };
			        $scope.epkiCertificate2 = function() {
			        	if(isNull($rootScope.login.popupScope.userId)){
                			commonService.alertForLogin("아이디를 입력해 주세요.", $("[ng-model='userId']").focus());
                			return false;
                		}
			        	$rootScope.login.purposeToCert = "loginProgress";
			        	$rootScope.login.errCode = "LE01";
			        	$rootScope.login.scope.requestSessionEpki("selfAuthEpki");
			        };
					
					/**
			         * 휴대폰 인증
			         */
			        $scope.cellPhoneCertificate = function() {
			        	$rootScope.login.purposeToCert = "findIdPwd";
			        	cellPhoneCertificate(); //휴대폰 본인인증 팝업
			        };
			        $scope.cellPhoneCertificate2 = function() {
		        		if(isNull($rootScope.login.popupScope.userId)){
                			commonService.alertForLogin("아이디를 입력해 주세요.", $("[ng-model='userId']").focus());
                			return false;
                		}
			        	$rootScope.login.purposeToCert = "loginProgress";
			        	$rootScope.login.errCode = "LE01";
			        	cellPhoneCertificate(); //휴대폰 본인인증 팝업
			        };
			        
			        $scope.findIdDiv = function() {
			        	$scope.findView_step = 1;
			        	$scope.pwdErrPermitedCnt_step = 0;
			        };
			        
			        
					$scope.findPwdDiv = function() {
						$scope.findView_step = 0;
						$scope.pwdErrPermitedCnt_step = 1;
					};
					
                    $scope.closeLayerPopup = function() {
                    	$scope.closeThisDialog();
                    }
                }
            });
        };
        
        $scope.branchPurPoseToCert = function(){
        	if($rootScope.login.purposeToCert == "loginProgress"){
        		$scope.updateUserAccountWakeUp();
        	}else if($rootScope.login.purposeToCert == "findIdPwd"){
        		$scope.findIdResult();
        	}
        };
        
        $scope.updateUserAccountWakeUp = function(){
        	var loginErrCode = $rootScope.login.errCode;
        	var userId = $rootScope.login.popupScope.userId ? $rootScope.login.popupScope.userId : $scope.userId;
        	var param = {
        			userId 			: userId,
        			userPwd			: loginErrCode === 'LE02' ? $scope.userPwd : null,
        			userCi			: $("#ci").val(),			//kcp ci
    				userDi			: $("#di").val(),			//kcp di
    				encCiValue		: $("#ciUrl").val(),		//kcp ci urlencode
    				encDiValue		: $("#diUrl").val()			//kcp di urlencode
        	};
        	
        	userService.getUserCount(param, function(data1){
        		if(data1.userCount > 0){
        			if(loginErrCode == "LE01"){
        				
        				var email1 = userId.split("@")[0];
        				var email2 = userId.split("@")[1];
        				
        				var param2 = {
        						userId : email1+"@"+email2,
        						email1 : email1,
        						email2 : email2
        				};

        				//email주소 마스킹처리
        				if(email1.length > 2){
        					var len = email1.length;
        					var maskLen = len-2
        					var email1 = email1.substring(0, 2);
        					for (var i = 0; i < maskLen; i++) {
        						email1 += '*';
        					}
        				}
        				
        				loginService.sendEmailUserPwdTmpr(param2, function(data){
        					$rootScope.login.popupScope.pwdErrPermitedCnt_step = 2;
            				$rootScope.login.popupScope.userEmail = email1+"@"+email2;
            				
            				var date = new Date();
                        	date.setDate(date.getDate()+7);
                        	$cookies.put("pwdChangeHold", false, {path:"/", expires:date.toGMTString()});
        				});
        				
        			}else if(loginErrCode === "LE02"){
        				loginService.updateUserAccountWakeUp(param, function(data2) {
        					commonService.alertForLogin("휴면계정이 복원되었습니다.", function(){
        						$scope.loginIdPwd();
        					});
        				});
        			}
        		}else{
        			commonService.alertForLogin("입력하신 정보와 일치하는 회원이 없습니다.");
        		}
        	});
        };
        
        $scope.findIdResult = function(){
        	var param = {
        			userCi			: $("#ci").val(),			//kcp ci
    				userDi			: $("#di").val(),			//kcp di
    				encCiValue		: $("#ciUrl").val(),		//kcp ci urlencode
    				encDiValue		: $("#diUrl").val()			//kcp di urlencode
        	};
        	userService.getUserCount(param, function(data1){
        		if(data1.userCount > 0){
        			userService.selectUserId(param, function(data2){
        				$rootScope.login.popupScope.findView_step = 2;
        				$rootScope.login.popupScope.userEmail = data2.userId;
        			});
        		}else{
        			commonService.alertForLogin("입력하신 정보와 일치하는 회원이 없습니다.");
        		}
        	});
        };
    });
})());