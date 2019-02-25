((function() {
	angular.module('appModule').controller('registUniversityManagerCtrl', function($scope, userService, commonService, Const, $interval, $compile, $sce) {
        $scope.nowStep = 1;					//회원가입step
        $scope.termsList = [];				//약관 목록
        $scope.userType = userType;			//회원가입 사용자타입 : 대학담당자, 평생학습담당자
        $scope.userName = null;				//회원가입 성명
        $scope.parentUnivCode = null;			//대학지역코드
        $scope.parentUnivCodeList = [{code : "", codeName : "지역 선택"}];			//대학지역코드 목록
        $scope.univCode = null;				//대학코드
        $scope.univCodeList = [{code : "", codeName : "대학 선택"}];				//대학코드목록
        $scope.department = null;			//학과(부서)명
        $scope.email1 = null;				//email 앞부분
        $scope.email2 = null;				//email domain 입력값
        $scope.emailDomainList = [];		//email domain 코드목록
        $scope.emailSel = null;				//email domain 선택값
        $scope.userPwd = null;				//비밀번호
        $scope.confirmUserPwd = null;		//비밀번호 확인
        $scope.birthYearList = [];			//년도 코드목록
        $scope.birthYear = null;			//생년월일 - 연도
        $scope.birthMonthList				//월 코드목록
        $scope.birthMonth = null;			//생년월일 - 월
        $scope.birthDayList					//일 코드목록
        $scope.birthDay = null;				//생년월일 - 일
        $scope.mfType = null;				//성별
        $scope.telNoList = [];				//지역번호 코드목록
        $scope.telNo1 = null;				//부서번호 지역번호
        $scope.telNo2 = null;				//부서번호 두번째
        $scope.telNo3 = null;				//부서번호 세번째
        $scope.cellNoList = [];				//휴대전화번호 첫번째 코드목록
        $scope.cellNo1 = null;				//휴대전화번호 첫번째
        $scope.cellNo2 = null;				//휴대전화번호 두번째
        $scope.cellNo3 = null;				//휴대전화번호 세번째
        $scope.subEmail1 = null;			//sub email 앞부분
        $scope.subEmail2 = null;			//sub email domain 입력값
        $scope.subEmailSel = null;			//sub email domain 선택값
        $scope.userIdAuth = '00';			//아이디 중복확인 값 ( 00:미확인, 01:사용가능, 02:중복 )
        $scope.emailAuth = false;
        $scope.emailAuthParam = {};
        $scope.Const = Const;
        
        $scope.emailAuthChecker = null;
        
        $scope.sessionId = '';
		$scope.serverCert = '';
        
        //년도 및 월 목록 세팅
        var nowDate = new Date();
    	var curYear = nowDate.getFullYear() - 20;
    	var yearArr = [];
    	var monthArr = [];
    	for(var i = curYear; i >= (curYear - 60); i--) {
	 	   	yearArr.push({code:i, codeName:i});
	    }
    	
    	for(var i = 1; i < 13; i++) {
    		monthArr.push({code:leadingZeros(i,2), codeName:leadingZeros(i,2)});
	    }
    	$scope.birthYearList = yearArr;
    	$scope.birthMonthList = monthArr;
        
    	/**
    	 * 하위코드 목록 조회
    	 * @param parentCode ng-model name
    	 * @param childCode ng-model name
    	 */
    	$scope.getChildCdList = function(parentModel, childModel){
    		$scope[childModel+"List"] = [];
    		$scope[childModel+"List"].push({code : "", codeName : "대학 선택"});
    		if(!isNull($scope[parentModel])){
    			commonService.getCodeList($scope[parentModel], function(data) {
    				if(data.codeList != null && data.codeList.length > 0){
    					$.each(data.codeList, function(i, codeInfo){
    						$scope[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
    					});
    					//$scope[childModel] = $scope[childModel+"List"][0].code;
    				}
    			});
    		}
    	}
    	
    	/**
         * 이전 step으로 이동
         */
        $scope.movePreStep = function(){
        	if($scope.nowStep - 1 > 0){
        		$scope.nowStep = $scope.nowStep - 1;
        	}
        };
        
        /**
         * 다음 stemp으로 이동
         */
        $scope.moveNextStep = function(){
        	function addStepValue(){
        		if($scope.nowStep + 1 < 5){
            		$scope.nowStep = $scope.nowStep + 1;
            	}
        		if($scope.nowStep === 2 && $scope.userType ==='univ'){
        			$scope.initEpki();
        		}
        		
        		if($scope.nowStep === 3){
            		$scope.initStep3();
            	}
        	}
        	
        	if($scope.nowStep === 2){ // 본인인증 절차 후 인증키에 대해서 동일한 가입정보가 있는지 확인.
        		var param = {
        				userType : $scope.userType,
        				userCi : $("#ci").val(),
        				userDi : $("#di").val(),
        				encCiValue : $("#ciUrl").val(),
        				encDiValue : $("#diUrl").val()
        		};
        		
        		userService.getUserCount(param, function(data1){
            		if(data1.userCount > 0){
            			commonService.alertForLogin("이미 가입된 정보가 있습니다.", function(){
            				$("#mobCertNo").val("");
            				$("#mobUserName").val("");
            				$("#mobBirthDay").val("");
            				$("#mobSexCode").val("");
            				$("#mobChkCert").val("");
            				$("#ci").val("");
            				$("#di").val("");
            				$("#ciUrl").val("");
            				$("#diUrl").val("");
            			});
            		}else{
            			addStepValue();
            		}
            	});
        	}else{
        		addStepValue();
        	}
        	console.log($scope.nowStep);
        };
        
        /* show view 1 function start*/

        /**
         * 필수여부 텍스트 리턴
         * @param requiredYn String
         * @return String
         */
        $scope.setRequiredYnTxt = function(requiredYn){
        	var rslt = "";
        	if(requiredYn === "Y"){
        		rslt = "(필수)";
        	}else{
        		rslt = "(선택)";
        	}
        	
        	return rslt;
        }

        /**
         * 필수 약관들이 모두 체크도어있다면 다음 step으로 이동, 아니라면 알림 alert
         */
        $scope.agreeTerms = function() {
        	var moveNextStep = true;
        	$.each($scope.termsList, function(i, terms){
        		if(!terms.isChecked && terms.requiredYn === "Y"){
        			alertForLogin(terms.termsTitle+" 동의는 필수 입니다.")
        			moveNextStep = false;
        			return false;
        		}
        	});
        	
            if(moveNextStep) $scope.moveNextStep();
        };
        
        /**
         * 전체 약관동의 체크박스 컨트롤
         */
        $scope.agreeAllTerms = function() {
    		$.each($scope.termsList, function(i){
    			$scope.termsList[i].isChecked = $scope.isCheckedAll;
        	});
        };

        /**
         * 약관 별 체크박스 컨트롤
         */
        $scope.checkAgree = function() {
        	var isCheckedAll = true;
        	$.each($scope.termsList, function(i, terms){
        		if(!terms.isChecked){
        			isCheckedAll = false;
        		}
        	});
        	$scope.isCheckedAll = isCheckedAll;
        	
        };

        /**
         * 초기 약관 조회
         */
        userService.getTerms(Const.code.TERMS_REGIST_USER, function(data) {
            $scope.termsList = data.termsList;
        });
        
        /**
         * html 문자열 binding 함수
         * @param html html문자열
         * @return url decoding html문자열
         */
        $scope.bindHtml = function(html){
        	return $sce.trustAsHtml(decodeURIComponent(html));
		}
        
        /* show view 1 function end */
        
        
        /* show view 2 function start */
        /**
		 * EPKI 초기화 
		 */
		$scope.initEpki = function(){
			commonService.initEpki(function(data){
				$scope.sessionId = data.sessionID;
				$scope.serverCert = data.strServerCert;
				epki.init($scope.sessionId);
			});
		};
		
		/**
		 * EPKI 로그인을 위한 채널생성
		 */
		$scope.requestSessionEpki = function(){
			/* Call Back Function Definition */
            var success = function(output) {
            	console.log("after request session epki",output);
            	commonService.setRequestSessionEpki(output, function(data){
            		console.log(data);
            		$scope.certificateEpki();
            	});
                /*
            	secureChannelTexts.eq(0).val(output);
                $("#secureChannel_test").find("form").submit();
                */
            };
            var error = function(errCode, errMsg) {
                alertForLogin(errCode + ": " + errMsg);
            };
            epki.requestSession($scope.serverCert, "SEED", $scope.sessionId, success, error);
		};
		
    	/**
         * EPKI 인증 layer
         */
        $scope.certificateEpki = function(){
        	
        	/* Call Back Function Definition */
            var success = function(output) {
            	console.log("after login epki",output);
            	commonService.decodeEpkiCertificationResult(output, function(data){
            		console.log(data);
            		if(data.testResult == "성공"){
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
                alertForLogin(errCode + ": " + errMsg);
            };
            epki.login($scope.serverCert, success, error);
        };
        /**
         * EPKI 발급/재발급
         */ 
        $scope.issueCertificate = function() {
        	window.open("https://www.epki.go.kr/sub/info.do?m=020301&s=epki", "issuCertificate", "_blank");
        };
        
        /**
         * EPKI 인증서 갱신
         */ 
        $scope.renewalCertificate = function() {
        	window.open("https://www.epki.go.kr/sub/info.do?m=020401&s=epki", "issuCertificate", "_blank");
        };
        
        /**
         * id pwd 로그인
         */ 
        $scope.renewalCertificate = function() {
        	window.open("https://www.epki.go.kr/sub/info.do?m=020401&s=epki", "issuCertificate", "_blank");
        };
        
        /**
         * EPKI 인증서 갱신
         */ 
        $scope.renewalCertificate = function() {
        	window.open("https://www.epki.go.kr/sub/info.do?m=020401&s=epki", "issuCertificate", "_blank");
        };
        
        /**
         * 휴대폰 인증
         */
        $scope.cellPhoneCertificate = function() {
        	cellPhoneCertificate(); //휴대폰 본인인증 팝업
        };
        
        /**
         * 회원가입 취소 - 로그인페이지 이동
         */
        $scope.cancelRegist = function() {
  			location.href = Const.contextPath + "login/logout.do";
        };
        
        /* show view 2 function end */
        
        
        /* show view 3 function start */
        
        /**
         * step3 paramSet
         */
        $scope.initStep3 = function() {
        	//email domain 목록 
        	commonService.getCodeList(Const.code.EMAIL_DOMAIN_ROOT, function(data) {
        		if(data.codeList != null && data.codeList.length > 0){
        			$scope.emailDomainList = [];
        			$scope.emailDomainList.push({code:"", codeName:"직접입력"});
        			$.each(data.codeList, function(i, codeInfo){
                    	$scope.emailDomainList.push({code : codeInfo.codeName, codeName : codeInfo.codeName});
                    });
        		}
            });
        	
        	//전화 지역번호 목록
        	commonService.getCodeList(Const.code.TEL_NUMBER_ROOT, function(data) {
        		if(data.codeList != null && data.codeList.length > 0){
        			$.each(data.codeList, function(i, codeInfo){
                    	$scope.telNoList.push({code : codeInfo.codeName, codeName : codeInfo.codeName});
                    });
        			$scope.telNo1 = $scope.telNoList[0].code;
        		}
            });
        	
        	//모바일 전화번호 목록
        	commonService.getCodeList(Const.code.MOBILE_NUMBER_ROOT, function(data) {
        		if(data.codeList != null && data.codeList.length > 0){
        			$.each(data.codeList, function(i, codeInfo){
                    	$scope.cellNoList.push({code : codeInfo.codeName, codeName : codeInfo.codeName});
                    });
        			$scope.cellNo1 = $scope.cellNoList[0].code;
        		}
            });
        	
        	// 본인인증 사용자 정보 설정
        	$scope.userName = $("#mobUserName").val();
        	var birthDay = $("#mobBirthDay").val();
        	$scope.birthYear = birthDay.substring(0,4);
			$scope.birthMonth = birthDay.substring(4,6);
			$scope.changeDate();
			$scope.birthDay = birthDay.substring(6,birthDay.length);
			$scope.mfType = $("#mobSexCode").val()?$("#mobSexCode").val():"01";
			
			//대학 지역 목록
			commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
				$scope.parentUnivCodeList = [];
				$scope.parentUnivCodeList.push({code : "", codeName : "지역 선택"});
				if(data.codeList != null && data.codeList.length > 0){
					$.each(data.codeList, function(i, codeInfo){
						$scope.parentUnivCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
					});
					//$scope.parentUnivCode = $scope.parentUnivCodeList[0].code;
					
					//$scope.getChildCdList('parentUnivCode', 'univCode');
				}
			});
			
        	if($scope.userType === "univ"){
        	}else{
        		var phoneNo = trim(nvltoStr($("#mobCertNo").val())); // 본인인증 휴대폰번호 설정
        		var phoneLen = phoneNo.length;
        		if(phoneLen > 10) {
        			$scope.cellNo1 = phoneNo.substring(0,3);
        			$scope.cellNo2 = phoneNo.substring(3,7);
        			$scope.cellNo3 = phoneNo.substring(7,phoneLen);
        		} else {
        			$scope.cellNo1 = phoneNo.substring(0,3);	
        			$scope.cellNo2 = phoneNo.substring(3,6);
        			$scope.cellNo3 = phoneNo.substring(6,phoneLen);
        		}
        	}
        	
        };
        
        /**
         * 월별 일 목록 세팅
         */
        $scope.changeDate = function() {
        	var year = $scope.birthYear;
        	var month = $scope.birthMonth;
        	var curDate = $scope.birthDay;
        	var dayArr = [];
		    for(var i = 1; i < lastDay(year, month) + 1; i++) {
		 	    dayArr.push({code : leadingZeros(i,2), codeName : leadingZeros(i,2)});  
		    }
		    
		    $scope.birthDayList = dayArr;
		    if(curDate <= lastDay(year, month)) {
		    	$scope.birthDay = curDate;	
		    }
        };
        
        /**
         * 아이디(이메일) 중복 확인
         */
        $scope.checkDuplicationUserId = function() {
        	
        	if(isNull($scope.email1)){
    			commonService.alertForLogin("아이디(이메일)를 입력해주세요.", $("[ng-model='email1']").focus());
    			return false;
    		}
    		
    		if(isNull($scope.email2)){
    			commonService.alertForLogin("아이디(이메일)를 입력해주세요.", $("[ng-model='email2']").focus());
    			return false;
    		}
    		
    		if(!isEmailAddr($scope.email1+"@"+$scope.email2)){
    			commonService.alertForLogin("아이디(이메일)가 올바르지 않습니다. 다시 입력해주세요.", $("[ng-model='email2']").focus());
    			return false;
    		}

        	var email = $scope.email1+"@"+$scope.email2;
        	var param = {
        			userId : email,
        			email1 : $scope.email1,
        			email2 : $scope.email2,
        	};
        	
        	userService.getUserCount(param, function(data1){
        		if(data1.userCount > 0){
        			//commonService.alertForLogin("이미 사용중인 아이디(이메일) 입니다.");
        			$("#btnCheckUserId").parent().parent().next().css("color","red").text("중복입니다.");
        			$scope.userIdAuth = "02";
        		}else{
        			$("#btnCheckUserId").parent().parent().next().css("color","green").text("사용가능합니다.");
        			$scope.userIdAuth = "01";
        		}
        	});
        };
        
        
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
        	
        	if(isNull($scope.subEmail1)){
    			commonService.alertForLogin("이메일을 입력해주세요.", $("[ng-model='subEmail1']").focus());
    			return false;
    		}
    		
    		if(isNull($scope.subEmail2)){
    			commonService.alertForLogin("이메일을 입력해주세요.", $("[ng-model='subEmail2']").focus());
    			return false;
    		}
    		
    		if(!isEmailAddr($scope.subEmail1+"@"+$scope.subEmail2)){
    			commonService.alertForLogin("이메일이 올바르지 않습니다. 다시 입력해주세요.", $("[ng-model='subEmail2']").focus());
    			return false;
    		}

        	var email = $scope.subEmail1+"@"+$scope.subEmail2;
        	var param = {
        			userId : email,
        			email1 : $scope.subEmail1,
        			email2 : $scope.subEmail2,
        	};
        	/*
        	userService.getUserCount(param, function(data1){
        		if(data1.userCount > 0){
        			commonService.alertForLogin("이미 사용중인 이메일 입니다.");
        		}else{
    		*/
        			userService.sendEmailAuthReq(param, function(data2) {
                        commonService.alertForLogin("["+email+"]으로 발송된 인증메일의 인증 링크를 유효시간 30분안에 클릭해주세요.", function(){
                        	$scope.emailAuthParam = {
                        			reqTime : data2.reqTime,
                        	    	fromDt 	: data2.fromDt,
                        	    	toDt 	: data2.toDt,
                        	    	encParam: data2.encParam
                        	} 
                        	
                        	$scope.emailAuthChecker = $interval($scope.checkEmailAuth, 3000);//,.createCheckTimer();
                        });
                    });
			/*
        		}
        	});
        	*/
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
        				commonService.alertForLogin("정상적으로 처리되었습니다.");
        				$interval.cancel($scope.emailAuthChecker);
            			$scope.emailAuthParam = {};
            			$("#btnEmailAuth").css("background-color","red").css("color","white").html("인증완료");
            			$scope.emailAuth = true;
            			$("[ng-model='subEmail1']").attr("readonly",true);
            			$("[ng-model='subEmail2']").attr("readonly",true);
            			$("[ng-model='subEmailSel']").attr("disabled",true);
        				break;
        			case "MA02":
        				commonService.alertForLogin("유효시간이 지났습니다.\n다시 인증해주세요.");
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
         * 아이디(이메일) 중복확인 결과 초기화
         */        
        $scope.resetUserIdAuth = function(){
        	$scope.userIdAuth = "00";
        	$("#btnCheckUserId").parent().parent().next().removeAttr("style").text("");
        };
        
        /**
         * 이메일인증 초기화
         */
        $scope.resetEmailAuth = function(){
        	$scope.emailAuth = false;
        	$("#btnEmailAuth").removeAttr("style").html("인증요청");
        };
        
        /**
         * 회원가입 신청 등록
         */
        $scope.requestAccount = function() {
        	if($scope.checkValidate()){
        		commonService.confirmForLogin("회원가입을 신청하시겠습니까?", function(){
        			userService.insertUserAccount($scope.makeAccountParam(), function(data){
            			$scope.moveNextStep();
            		});
        		});
        	}
        };
        
        /**
         * 회원 정보 validate check
         */
        $scope.checkValidate = function(){
        	if($scope.userType == "univ"){
        		if(isNull($scope.parentUnivCode)){
        			commonService.alertForLogin("소속 대학교를 선택해주세요.", $("[ng-model='parentUnivCode']").focus());
        			return false;
        		}
        		
        		if(isNull($scope.univCode)){
        			commonService.alertForLogin("소속 대학교를 선택해주세요.", $("[ng-model='univCode']").focus());
        			return false;
        		}
        		
        		if(isNull($scope.department)){
        			commonService.alertForLogin("학과명(부서명)을 입력해주세요.", $("[ng-model='department']").focus());
        			return false;
        		}
        		
        		
        		if(isNull($scope.email1)){
        			commonService.alertForLogin("아이디(이메일)를 입력해주세요.", $("[ng-model='email1']").focus());
        			return false;
        		}
        		
        		if(isNull($scope.email2)){
        			commonService.alertForLogin("아이디(이메일)를 입력해주세요.", $("[ng-model='email2']").focus());
        			return false;
        		}
        		
        		if(!isEmailAddr($scope.email1+"@"+$scope.email2)){
        			commonService.alertForLogin("아이디(이메일)이 올바르지 않습니다. 다시 입력해주세요.", $("[ng-model='email2']").focus());
        			return false;
        		}
        		
        		if(defaultIfEmpty($scope.userIdAuth, "00") == "00"){
            		commonService.alertForLogin("아이디(이메일) 중복확인을 해주세요.", $("[ng-model='email1']").focus());
        			return false;
            	}
            	
            	if($scope.userIdAuth == "02"){
            		commonService.alertForLogin("이미 사용중인 아이디(이메일)는 사용할 수 없습니다.", $("[ng-model='email1']").focus());
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
    	        		commonService.alertForLogin("비밀번호는 영문, 숫자, 특수문자를 포함한 10~15자로 입력해주세요.", $("[ng-model='userPwd']").focus());
            			return false;
    	        	}
        		}
        		
        		if(isNull($scope.confirmUserPwd)){
        			commonService.alertForLogin("비밀번호를 재입력해주세요.", $("[ng-model='confirmUserPwd']").focus());
        			return false;
        		}else{
        			if($scope.userPwd != $scope.confirmUserPwd){
        				commonService.alertForLogin("비밀번호가 일치하지 않습니다.", $("[ng-model='confirmUserPwd']").focus());
            			return false;
        			}
        		}
        		
        		if(isNull($scope.cellNo2)){
        			commonService.alertForLogin("휴대폰번호를 입력해주세요.", $("[ng-model='cellNo2']").focus());
        			return false;
        		}else{
        			if($scope.cellNo2.length < 3){
        				commonService.alertForLogin("휴대폰번호를 정확히 입력해주세요.", $("[ng-model='cellNo2']").focus());
            			return false;
        			}
        		}
        		
        		if(isNull($scope.cellNo3)){
        			commonService.alertForLogin("휴대폰번호를 입력해주세요.", $("[ng-model='cellNo3']").focus());
        			return false;
        		}else{
        			if($scope.cellNo3.length < 4){
        				commonService.alertForLogin("휴대폰번호를 정확히 입력해주세요.", $("[ng-model='cellNo3']").focus());
            			return false;
        			}
        		}
        		
        		if(isNull($scope.subEmail1)){
        			commonService.alertForLogin("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='subEmail1']").focus());
        			return false;
        		}
        		
        		if(isNull($scope.subEmail2)){
        			commonService.alertForLogin("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='subEmail2']").focus());
        			return false;
        		}
        		
        		if(!isEmailAddr($scope.subEmail1+"@"+$scope.subEmail2)){
        			commonService.alertForLogin("비밀번호 변경/알림용 이메일이 올바르지 않습니다. 다시 입력해주세요.", $("[ng-model='subEmail2']").focus());
        			return false;
        		}
        		
        		if(!$scope.emailAuth){
        			commonService.alertForLogin("이메일을 인증해주세요.", $("[ng-model='subEmail1']").focus());
        			return false;
        		}
        	}else if($scope.userType == "llLearn"){
        		if(isNull($scope.parentUnivCode)){
        			commonService.alertForLogin("소속 대학교를 선택해주세요.", $("[ng-model='parentUnivCode']").focus());
        			return false;
        		}
        		
        		if(isNull($scope.univCode)){
        			commonService.alertForLogin("소속 대학교를 선택해주세요.", $("[ng-model='univCode']").focus());
        			return false;
        		}
        		
        		if(isNull($scope.email1)){
        			commonService.alertForLogin("아이디(이메일)를 입력해주세요.", $("[ng-model='email1']").focus());
        			return false;
        		}
        		
        		if(isNull($scope.email2)){
        			commonService.alertForLogin("아이디(이메일)를 입력해주세요.", $("[ng-model='email2']").focus());
        			return false;
        		}
        		
        		if(!isEmailAddr($scope.email1+"@"+$scope.email2)){
        			commonService.alertForLogin("아이디(이메일)이 올바르지 않습니다. 다시 입력해주세요.", $("[ng-model='email2']").focus());
        			return false;
        		}
        		
        		if(defaultIfEmpty($scope.userIdAuth, "00") == "00"){
            		commonService.alertForLogin("아이디(이메일) 중복확인을 해주세요.", $("[ng-model='email1']").focus());
        			return false;
            	}
            	
            	if($scope.userIdAuth == "02"){
            		commonService.alertForLogin("이미 사용중인 아이디(이메일)는 사용할 수 없습니다.", $("[ng-model='email1']").focus());
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
    	        		commonService.alertForLogin("비밀번호는 영문, 숫자, 특수문자를 포함한 10~15자로 입력해주세요.", $("[ng-model='userPwd']").focus());
            			return false;
    	        	}
        		}
        		
        		if(isNull($scope.confirmUserPwd)){
        			commonService.alertForLogin("비밀번호를 재입력해주세요.", $("[ng-model='confirmUserPwd']").focus());
        			return false;
        		}else{
        			if($scope.userPwd != $scope.confirmUserPwd){
        				commonService.alertForLogin("비밀번호가 일치하지 않습니다.", $("[ng-model='confirmUserPwd']").focus());
            			return false;
        			}
        		}
        		
        		if(isNull($scope.subEmail1)){
        			commonService.alertForLogin("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='subEmail1']").focus());
        			return false;
        		}
        		
        		if(isNull($scope.subEmail2)){
        			commonService.alertForLogin("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='subEmail2']").focus());
        			return false;
        		}
        		
        		if(!isEmailAddr($scope.subEmail1+"@"+$scope.subEmail2)){
        			commonService.alertForLogin("비밀번호 변경/알림용 이메일이 올바르지 않습니다. 다시 입력해주세요.", $("[ng-model='subEmail2']").focus());
        			return false;
        		}
        		
        		if(!$scope.emailAuth){
        			commonService.alertForLogin("이메일을 인증해주세요.", $("[ng-model='subEmail1']").focus());
        			return false;
        		}
        		
        		
        	}else{
        		return false;
        	}
        	return true;
        }
        
        /**
         * 회원가입 신청 parameter setting
         */
        $scope.makeAccountParam = function(){
        	var userType = $scope.userType;
        	userType = Const.code["USER_TYPE_"+userType.toUpperCase()];
        	
        	
        	var params = {
        			userType 		: userType,			//회원가입 사용자타입 : 대학담당자, 평생학습담당자
	    	        userName 		: $scope.userName,			//회원가입 성명
        			parentUnivCode	: $scope.parentUnivCode,		//대학지역코드
        			univCode			: $scope.univCode,			//대학코드
        			department		: $scope.department,		//학과(부서)명
        			email1			: $scope.email1,			//email 앞부분
        			email2			: $scope.email2,			//email domain 입력값
        			userPwd			: $scope.userPwd,			//비밀번호
        			birthYear		: $scope.birthYear,			//생년월일 - 연도
    				birthMonth		: $scope.birthMonth,		//생년월일 - 월
					birthDay		: $scope.birthDay,			//생년월일 - 일
					mfType			: $scope.mfType,			//성별
					telNo1			: $scope.telNo1,			//부서번호 지역번호
					telNo2			: $scope.telNo2,			//부서번호 두번째
					telNo3			: $scope.telNo3,			//부서번호 세번째
					cellNo1			: $scope.cellNo1,			//휴대전화번호 첫번째
    				cellNo2			: $scope.cellNo2,			//휴대전화번호 두번째
    				cellNo3			: $scope.cellNo3,			//휴대전화번호 세번째
    				subEmail1		: $scope.subEmail1,			//sub email 앞부분
    				subEmail2		: $scope.subEmail2,			//sub email domain 입력값
    				userCi			: $("#ci").val(),			//kcp ci
    				userDi			: $("#di").val(),			//kcp di or epki bserial
    				encCiValue		: $("#ciUrl").val(),		//kcp ci urlencode
    				encDiValue		: $("#diUrl").val()			//kcp di urlencode
        	};
        	
        	return params;
        }
        
        /**
         * 이메일 도메인 셀렉트박스 이벤트
         */
        $scope.changeEmailDomain = function(target, select) {
        	if(isNull($scope[select])){
        		$("[ng-model='"+target+"']").attr("readonly", false);
        		$scope[target] = "";
        	}else{
        		$("[ng-model='"+target+"']").attr("readonly", true);
        		$scope[target] = $scope[select];
        	}
        };
        
        /* show view 3 function end */
        
        
        /* show view 4 function start */
        
        /* show view 4 function end */
    });
})());