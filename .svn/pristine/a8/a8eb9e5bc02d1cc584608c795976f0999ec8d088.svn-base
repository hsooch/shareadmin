((function() {
    angular.module('appModule')
        .controller('userModifyCtrl', function($scope, $rootScope, $routeParams, $interval, commonService, userService, codeService, Const, ngDialog) {
            var userSession = $rootScope.userSession;
            
            $scope.emailAuth = false;
            $scope.emailAuthParam = {};
            $scope.emailAuthChecker = null;
            
            $scope.emailIsChanged = false;
            var emails = '';
            var emailA = '';
            var emailD = '';
        	
            /**
        	 * 비밀번호 변경 팝업
        	 */
        	$scope.pwdChange = function() {
        		ngDialog.open({
                    template: Const.contextPath + 'common/pwdChangePop2.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 476,
                    controller: function($scope, $rootScope, commonService, $cookies) {
                    	$scope.oldUserPwd = null;
						$scope.userPwd = null;
						$scope.confirmUserPwd = null;
						
                        $scope.updateUserPwd = function() {
                        	if(isNull($scope.oldUserPwd)) {
                        		commonService.alert("현재 비밀번호를 입력해주세요.", $("[ng-model='oldUserPwd']").focus());
                    			return false;
                        	}
                        	
                        	if(isNull($scope.userPwd)){
                    			commonService.alertForLogin("비밀번호를 입력해주세요.", $("[ng-model='userPwd']").focus());
                    			return false;
                    		}
                        	else {
                        		var numCnt = $scope.userPwd.search(/[0-9]/g); 		//비밀번호 숫자 카운트
                    	        var chrCnt = $scope.userPwd.search(/[a-z]/gi);		//비밀번호 영문 소문자 카운트
                    	        var uppChrCnt = $scope.userPwd.search(/[A-Z]/gi);	 //비밀번호 영문 대문자 카운트
                    	        var specialCnt = $scope.userPwd.search(/[`~!@#$%^&*()_\-+=|\\\'\";:\/?<>,.]/gi); //비밀번호 특수문자 카운트
                    	        
                    	        var totCnt = $scope.userPwd.length;	// 비밀번호길이
                    	        
                    	        if(numCnt < 0 || (chrCnt+uppChrCnt) < 0 || specialCnt < 0 || totCnt < 10) {
                	        		commonService.alertForLogin("새 비밀번호는 영문, 숫자, 특수문자를 포함한 10~15자로 입력해주세요.", $("[ng-model='userPwd']").focus());
                        			return false;
                	        	}
                        	}
                        	
                        	if(isNull($scope.confirmUserPwd)) {
                    			commonService.alertForLogin("새 비밀번호를 재입력해주세요.", $("[ng-model='confirmUserPwd']").focus());
                    			return false;
                    		}
                        	else {
                    			if($scope.userPwd != $scope.confirmUserPwd) {
                    				commonService.alertForLogin("비밀번호가 일치하지 않습니다.", $("[ng-model='confirmUserPwd']").focus());
                        			return false;
                    			}
                    		}
                        	
                        	var param = {
    								oldUserPwd : $scope.oldUserPwd,
    								userPwd : $scope.userPwd,
    								confirmUserPwd : $scope.confirmUserPwd
    						};
                        	
                        	userService.updateUserPwd(param, function(data) {
                           		if(isNull(data.resultDetail)) {
                           			commonService.alertForLogin("비밀번호가 변경되었습니다.", function() {
//                           				window.location.reload();
	                           			$scope.closeThisDialog();
	                           		});
                           		}
                           		else {
                           			if(data.resultDetail.resultCode == "PC00") {
                           				commonService.alertForLogin("현재 비밀번호가 일치하지 않습니다.\n다시 입력해 주세요.", function() {
	                           				$("[ng-model='oldUserPwd']").focus();
	                           			});
                           			}
                           		}
                           	});
                        };
                        
                        $scope.pwdChangeHold = function() {
                        	$scope.closeThisDialog();
                        };
                        
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        }
                    }
                });
        	}
            
            // 지역 목록 조회
        	if($rootScope.member.modify.univAreaCodeList.length == 1) {
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		console.log(data);
            		if(data.codeList != null && data.codeList.length > 0) {
            			$rootScope.member.modify.univAreaCodeList = [];
            			$rootScope.member.modify.univAreaCodeList.push({code:"", codeName:"지역선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.member.modify.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
            
            /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model univArea
        	 * @param childCode ng-model univ
        	 */
            $scope.getChildCdList = function(parentModel, childModel){
            	$rootScope.member.modify.univCodeList = [];
        		if(isNull($rootScope.member.modify.univAreaCode)) return;
        		commonService.getCodeList($rootScope.member.modify.univAreaCode, function(data) {
            		if(data.codeList != null && data.codeList.length > 0) {
        				$rootScope.member.modify.univCodeList.push({code : "", codeName : "대학교선택"});
            			$.each(data.codeList, function(i, codeInfo) {
            				$rootScope.member.modify.univCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
                        });
//            			$rootScope.member.modify.univCode = $rootScope.member.modify.univCodeList[0].code;
            		}
                });
        	};
        	
        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
            ){
    			$rootScope.member.modify.univAreaCode = $rootScope.userSession.univAreaCd;
    			$scope.getChildCdList("univAreaCode", "univCode", $rootScope.userSession.univCode);
    			$rootScope.member.modify.univCode = $rootScope.userSession.univCode;
    			
    			$("[ng-model='$root.member.modify.univAreaCode']").attr("disabled", true);
    			$("[ng-model='$root.member.modify.univCode']").attr("disabled", true);
    		}
        	
        	/**
             * 지역번호 목록 가져오기
             */
            if (!$rootScope.member.modify.telFirstNumList) {
                commonService.getCodeList(Const.code.TEL_NUMBER_ROOT, function(data) {
                    $rootScope.member.modify.telFirstNumList = data.codeList;
                    $rootScope.member.modify.telNum1 = data.codeList[0].codeName;
                });
            }
            
            /**
             * 휴대전화번호 목록 가져오기
             */
            if (!$rootScope.member.modify.cellFirstNumList) {
            	commonService.getCodeList(Const.code.MOBILE_NUMBER_ROOT, function(data) {
            		$rootScope.member.modify.cellFirstNumList = data.codeList;
            		$rootScope.member.modify.cellNum1 = data.codeList[0].codeName;
            	});
            }
            
            /**
             * 이메일 도메인 목록 가져오기
             */
            if (!$rootScope.member.modify.emailDomainList) {
            	commonService.getCodeList(Const.code.EMAIL_DOMAIN_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0) {
	            		$rootScope.member.modify.emailDomainList = [];
	            		$rootScope.member.modify.emailDomainList.push({code:"", codeName:"직접입력"});
	        			$.each(data.codeList, function(i, codeInfo){
	        				$rootScope.member.modify.emailDomainList.push({code : codeInfo.code, codeName : codeInfo.codeName});
	        			});
            		}
            	});
            }
            
            /**
             * 년도 및 월 목록 세팅
             */
            var nowDate = new Date();
            var curYear = nowDate.getFullYear() - 20;
            var yearArr = [];
            var monthArr = [];
            var dayArr = [];
            for(var i = curYear; i >= (curYear - 60); i--) {
            	yearArr.push({
            		code: i,
            		codeName: i
            	});
            }
            
            for(var i = 1; i < 13; i++) {
            	monthArr.push({
            		code: leadingZeros(i,2),
            		codeName: leadingZeros(i,2)
            	});
            }
            
            $scope.birthYearList = yearArr;
        	$scope.birthMonthList = monthArr;
        	
        	 /**
             * 월별 일 목록 세팅
             */
            $scope.changeDate = function() {
            	var year = $rootScope.member.modify.year;
            	var month =	$rootScope.member.modify.month;
            	var curDate = $rootScope.member.modify.day;
            	var dayArr = [];
    		    for(var i = 1; i < lastDay(year, month) + 1; i++) {
    		 	    dayArr.push({
    		 	    	code: leadingZeros(i, 2),
    		 	    	codeName: leadingZeros(i, 2)
    		 	    });  
    		    }
    		    
    		    $rootScope.member.modify.birthDayList = dayArr;
    		    if(curDate <= lastDay(year, month)) {
    		    	$scope.birthDay = curDate;	
    		    }
            };
        	
        	/**
             * 유저 정보를 조회하며 화면에 정보를 노출한다.
             */
        	 var param = {
             		userSeq : $rootScope.userSession.userSeq,
             		userId : $rootScope.userSession.userId
			 };
                 
        	 if($rootScope.member.modify.flag == undefined) {
                 userService.getUserInfo(param, function(data) {
                	 
                     if (data.info) {
                     	$rootScope.member.modify.department = data.info.department;
                     	
                     	if (data.info.univAreaCd) {
                     		$rootScope.member.modify.univAreaCode = data.info.univAreaCd;
                     		$scope.getChildCdList();
                     		$rootScope.member.modify.univCode = data.info.univCode;
                     	}
                         
                         if (data.info.birthday) {
                         	var bday = data.info.birthday;
                         	
                         	$rootScope.member.modify.year = bday.substring(0, 4);
                         	$rootScope.member.modify.month = bday.substring(4, 6);
                         	$scope.changeDate();
                         	$rootScope.member.modify.day = bday.substring(6, 8);
                         	
                         }
                         if (data.info.telNo) {
                             var telNums = data.info.telNo.split('-');
                             if (telNums.length === 3) {
                                 $rootScope.member.modify.telNum1 = telNums[0];
                                 $rootScope.member.modify.telNum2 = telNums[1];
                                 $rootScope.member.modify.telNum3 = telNums[2];
                             }
                         }
                         else {
                        	 $rootScope.member.modify.telNum2 = '';
                             $rootScope.member.modify.telNum3 = '';
                         }
                         
                         if (data.info.cellNo) {
                         	var cellNums = data.info.cellNo.split('-');
                         	if (cellNums.length === 3) {
                         		$rootScope.member.modify.cellNum1 = cellNums[0];
                         		$rootScope.member.modify.cellNum2 = cellNums[1];
                         		$rootScope.member.modify.cellNum3 = cellNums[2];
                         	}
                         }
                         if (data.info.userEmail) {
                         	if (data.info.userEmail.match('@')) {
                         		var email = data.info.userEmail.split('@');
                         		if (email.length === 2) {
                         			$rootScope.member.modify.emailAddr = email[0];
                         			$rootScope.member.modify.emailDomain = email[1];
                         		}
                         	}
                         	else {
                         		$rootScope.member.modify.emailAddr = data.info.userEmail;
                         	}
                         	
                         	emailA = $rootScope.member.modify.emailAddr;
                         	emailD = $rootScope.member.modify.emailDomain;
                         	emails = emailA + '@' + emailD;
                         }
                     }
                 });
                 
                 $rootScope.member.modify.flag = true;
        	 }
            
        	 /**
              * 이메일 인증 프로세스 시작
              */
             $scope.requestEmailCertificate = function() {
             	
             	if($scope.emailAuth) return;
             	
             	if($scope.emailAuthChecker != null){
             		$interval.cancel($scope.emailAuthChecker);
             		$scope.emailAuthParam = {};
             		
             		$scope.emailAuthChecker = null;
             	}
             	
             	if(isNull($rootScope.member.modify.emailAddr)){
         			commonService.alert("아이디(이메일)를 입력해주세요.", $("[ng-model='$root.member.modify.emailAddr']").focus());
         			return false;
         		}
         		
         		if(isNull($rootScope.member.modify.emailDomain)){
         			commonService.alert("아이디(이메일)를 입력해주세요.", $("[ng-model='$root.member.modify.emailDomain']").focus());
         			return false;
         		}
         		
         		if(!isEmailAddr($rootScope.member.modify.emailAddr + "@" + $rootScope.member.modify.emailDomain)){
         			commonService.alert("아이디(이메일)이 올바르지 않습니다. 다시 입력해주세요.", $("[$root.member.modify.emailAddr']").focus());
         			return false;
         		}

             	var email = $rootScope.member.modify.emailAddr + "@" + $rootScope.member.modify.emailDomain;
             	var param = {
             			userId : email,
             			email1 : $rootScope.member.modify.emailAddr,
             			email2 : $rootScope.member.modify.emailDomain,
             	};
             	
     			userService.sendEmailAuthReq(param, function(data2) {
                     commonService.alert("["+email+"]으로 발송된 인증메일의 인증 링크를 유효시간 30분안에 클릭해주세요.", function(){
                     	$scope.emailAuthParam = {
                     			reqTime : data2.reqTime,
                     	    	fromDt 	: data2.fromDt,
                     	    	toDt 	: data2.toDt,
                     	    	encParam: data2.encParam
                     	} 
                     	
                     	$scope.emailAuthChecker = $interval($scope.checkEmailAuth, 3000);//,.createCheckTimer();
                     });
                 });
             };
             
             /**
              * 이메일 인증 여부 확인
              */
             $scope.checkEmailAuth = function(){
             	var param = $scope.emailAuthParam;
             	
             	userService.checkEmailAuth(param, function(data){
             		var detailResult = data.detailResult;
             		if(data.detailResult != null){
             			switch(detailResult.resultCode){
             			case "MA01":
             				commonService.alert("정상적으로 처리되었습니다.");
             				$interval.cancel($scope.emailAuthChecker);
                 			$scope.emailAuthParam = {};
                 			$("#btnEmailAuth").css("background-color","red").css("color","white").html("인증완료");
                 			$scope.emailAuth = true;
                 			$("[ng-model='$rootScope.member.modify.emailAddr']").attr("readonly",true);
                 			$("[ng-model='$rootScope.member.modify.emailDomain']").attr("disabled",true);
//                 			$("[ng-model='emailSel']").attr("disabled",true);
             				break;
             			case "MA02":
             				commonService.alert("유효시간이 지났습니다.\n다시 인증해주세요.");
             				$interval.cancel($scope.emailAuthChecker);
             				$scope.emailAuthParam = {};
             				break;
             			case "MA03":
             				break;
         				default:
         					break;
             			}
             		}
             	});
             };
            
             /**
              * 이메일 변경 감지
              */
             $scope.changeEmail = function(email1, email2) {
            	 if ((email1+'@'+email2) !== emails) {
            		 $scope.emailIsChanged = true;
            	 }
            	 else {
            		 $scope.emailIsChanged = false;
            	 }
             }
             
            /**
             * 저장 버튼 클릭시
             * 
             */
            $scope.modifyUser = function() {
            	
            	if($scope.emailIsChanged) {
            		if(!$scope.emailAuth){
            			commonService.alert("이메일을 인증해주세요.");
            			return false;
            		}
            	}
            	commonService.confirm('회원정보를 수정 하시겠습니까?', function() {
            		var params = {
            				department: $rootScope.member.modify.department,
            				univCode: $rootScope.member.modify.univCode,
            				birthday: $rootScope.member.modify.year + $rootScope.member.modify.month + $rootScope.member.modify.day,
            				telNo: $rootScope.member.modify.telNum1 + '-' + $rootScope.member.modify.telNum2 + '-' + $rootScope.member.modify.telNum3,
            				cellNo: $rootScope.member.modify.cellNum1 + '-' + $rootScope.member.modify.cellNum2 + '-' + $rootScope.member.modify.cellNum3,
            				userEmail: $rootScope.member.modify.emailAddr + '@' + $rootScope.member.modify.emailDomain,
            				userSeq: $rootScope.userSession.userSeq,
            				userId: $rootScope.userSession.userId
            		}
            		userService.updateUserInfo(params, function(data) {
            			commonService.alert('정보 수정 완료', function() {
            				location.reload();
                        });
            		});
            	});
        	}
        });
})());