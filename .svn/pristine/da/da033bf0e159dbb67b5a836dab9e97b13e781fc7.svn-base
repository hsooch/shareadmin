((function() {
    angular.module('appModule')
        .controller('userManagementCtrl', function($scope, $rootScope, userManagementService, userService, commonService, Const, ngDialog) {
        	$rootScope.userManagement.scope = $scope;

            $scope.changeTab = function(tabIdx){
            	$rootScope.userManagement.nowMgmtTab = tabIdx*1;
            	var pageType = $rootScope.userManagement.pageTypeArr[$rootScope.userManagement.nowMgmtTab];
            	$rootScope.userManagement.pageType = pageType;
            	
            	if($rootScope.userManagement[pageType].searchYn != "Y"){
            		$scope.search(pageType, true);
            	}
            };
            
            /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, pageType, defaultValue){
        		$rootScope.userManagement[pageType][childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.userManagement[pageType][parentModel])) return;
        			commonService.getCodeList($rootScope.userManagement[pageType][parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.userManagement[pageType][childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.userManagement[pageType][childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)){
                				$rootScope.userManagement[pageType][childModel] = $rootScope.userManagement[pageType][childModel+"List"][0].code;
                			}else{
                				$rootScope.userManagement[pageType][childModel] = defaultValue;
                			}
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.userManagement[pageType].userInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.userManagement[pageType].userInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.userManagement[pageType][childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.userManagement[pageType][childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			if(isNull(defaultValue)){
	            				$rootScope.userManagement[pageType].userInfo[childModel] = $rootScope.userManagement[pageType][childModel+"List"][0].code;
	            			}else{
	            				$rootScope.userManagement[pageType].userInfo[childModel] = defaultValue;
                			}
	            		}
        			});
        		}
        	};
            
        	$scope.$watch("$root.userSession", function(newValue, oldValue){
        		console.log("newValue => ", newValue);
        		console.log("oldValue => ", oldValue);
        		if (newValue == oldValue && oldValue == {} ) { return; }
        		//기본 셀렉트 박스 데이터 조회
                $.each($rootScope.userManagement.pageTypeArr, function(i, pageType){
                	
                	//달력
            		$("[ng-model='$root.userManagement."+pageType+".searchStartDt']").datepicker(getDatePickerConfig("dateField"));
            		$("[ng-model='$root.userManagement."+pageType+".searchEndDt']").datepicker(getDatePickerConfig("dateField"));
            		
                	//회원 유형 목록
                	if($rootScope.userManagement[pageType].searchUserTypeList.length == 1){
                		commonService.getCodeList(Const.code.USER_TYPE_ROOT, function(data) {
                			if(data.codeList != null && data.codeList.length > 0){
                				$rootScope.userManagement[pageType].searchUserTypeList = [];
                				$rootScope.userManagement[pageType].searchUserTypeList.push({code:"", codeName:"전체"});
                				$.each(data.codeList, function(i, codeInfo){
                					$rootScope.userManagement[pageType].searchUserTypeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
                				});
                			}
                		});
                	};
                	
                	//학교 지역 목록
                	if($rootScope.userManagement[pageType].searchUnivAreaList.length == 1){
                    	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
                    		if(data.codeList != null && data.codeList.length > 0){
                    			$rootScope.userManagement[pageType].searchUnivAreaList = [];
                    			$rootScope.userManagement[pageType].searchUnivAreaList.push({code:"", codeName:"지역 전체"});
                    			$rootScope.userManagement[pageType].univAreaCdList = [];
                    			$rootScope.userManagement[pageType].univAreaCdList.push({code:"", codeName:"지역 선택"});
                    			$.each(data.codeList, function(i, codeInfo){
                    				$rootScope.userManagement[pageType].searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
                    				$rootScope.userManagement[pageType].univAreaCdList.push({code : codeInfo.code, codeName : codeInfo.codeName});
                    			});
                    		}
                    	});
                    };
                    
                    
                    //회원 상태 코드 목록
                	if($rootScope.userManagement[pageType].searchUserStatusList.length == 1){
                    	commonService.getCodeList(Const.code.USER_STATUS_ROOT, function(data) {
                    		if(data.codeList != null && data.codeList.length > 0){
                    			$rootScope.userManagement[pageType].searchUserStatusList = [];
                    			$rootScope.userManagement[pageType].searchPeriodTypeList = [];
                    			$rootScope.userManagement[pageType].searchUserStatusList.push({code:"", codeName:"전체"});
                    			$rootScope.userManagement[pageType].searchPeriodTypeList.push({code:"", codeName:"전체"});
                    			$.each(data.codeList, function(i, codeInfo){
                    				$rootScope.userManagement[pageType].searchUserStatusList.push({code : codeInfo.code, codeName : codeInfo.codeName});
                    				$rootScope.userManagement[pageType].searchPeriodTypeList.push({code : codeInfo.code, codeName : codeInfo.codeName+"일"});
                    			});
                    		}
                    	});
                    };
                    
                    //사용자 권한에 따른 학교구분 검색조건 세팅
            		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
            			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                    ){
            			$rootScope.userManagement[pageType].searchUnivArea = $rootScope.userSession.univAreaCd;
            			$scope.getChildCdList("searchUnivArea", "searchUniv", pageType, $rootScope.userSession.univCode);
            			$rootScope.userManagement[pageType].searchUniv = $rootScope.userSession.univCode;
            			
            			$("[ng-model='$root.userManagement."+pageType+".searchUnivArea']").attr("disabled", true);
            			$("[ng-model='$root.userManagement."+pageType+".searchUniv']").attr("disabled", true);
            			
            		}
                });
                
                //email domain 목록 
                if($rootScope.userManagement.emailDomainList.length == 0){
    	        	commonService.getCodeList(Const.code.EMAIL_DOMAIN_ROOT, function(data) {
    	        		if(data.codeList != null && data.codeList.length > 0){
    	        			$rootScope.userManagement.emailDomainList = [];
    	        			$rootScope.userManagement.emailDomainList.push({code:"", codeName:"직접입력"});
    	        			$.each(data.codeList, function(i, codeInfo){
    	        				$rootScope.userManagement.emailDomainList.push({code : codeInfo.codeName, codeName : codeInfo.codeName});
    	                    });
    	        		}
    	            });
                }
            	
            	//전화 지역번호 목록
                if($rootScope.userManagement.telNoList.length == 0){
                	commonService.getCodeList(Const.code.TEL_NUMBER_ROOT, function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
                			$.each(data.codeList, function(i, codeInfo){
                				$rootScope.userManagement.telNoList.push({code : codeInfo.codeName, codeName : codeInfo.codeName});
                			});
                			$rootScope.userManagement.basic.userInfo.telNo1 = $rootScope.userManagement.telNoList[0].code;
                		}
                	});
                }
            	
            	//모바일 전화번호 목록
                if($rootScope.userManagement.cellNoList.length == 0){
    	        	commonService.getCodeList(Const.code.MOBILE_NUMBER_ROOT, function(data) {
    	        		if(data.codeList != null && data.codeList.length > 0){
    	        			$.each(data.codeList, function(i, codeInfo){
    	        				$rootScope.userManagement.cellNoList.push({code : codeInfo.codeName, codeName : codeInfo.codeName});
    	                    });
    	        			$rootScope.userManagement.basic.userInfo.cellNo1 = $rootScope.userManagement.cellNoList[0].code;
    	        		}
    	            });
                }
                
                //페이지 로드시 사용자 목록을 조회하기 위함.
            	$scope.search($rootScope.userManagement.pageType, false);
            	
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
            	$rootScope.userManagement.birthYearList = yearArr;
            	$rootScope.userManagement.birthMonthList = monthArr;
        		
    		}, true);
        	
            
            
        	$scope.resetSearchFiled = function(pageType){
    			$rootScope.userManagement[pageType].searchUserType		= null;
    			$rootScope.userManagement[pageType].searchUnivArea		= null;
    			$rootScope.userManagement[pageType].searchUniv			= null;
    			$rootScope.userManagement[pageType].searchUserStatus	= null;
    			$rootScope.userManagement[pageType].searchPeriodType	= null;
    			$rootScope.userManagement[pageType].searchStartDt		= null;
    			$rootScope.userManagement[pageType].searchEndDt		= null;
    			$rootScope.userManagement[pageType].searchKeyType		= null;
    			$rootScope.userManagement[pageType].searchKey			= null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.userManagement[pageType].searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", pageType, $rootScope.userSession.univCode);
        			$rootScope.userManagement[pageType].searchUniv = $rootScope.userSession.univCode;
        			
        			$("[ng-model='$root.userManagement."+pageType+".searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.userManagement."+pageType+".searchUniv']").attr("disabled", true);
        			
        		}
        	};
        	
        	/**
        	 * 회원 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(pageType, redrawPage){
        		var param = {
        			searchPageType		: 	pageType,
    	        	searchUserType		:	$rootScope.userManagement[pageType].searchUserType,
    	        	searchUnivArea		:	$rootScope.userManagement[pageType].searchUnivArea,
    	        	searchUniv			:	$rootScope.userManagement[pageType].searchUniv,
    	        	searchUserStatus 	:	$rootScope.userManagement[pageType].searchUserStatus,
    	        	searchPeriodType 	:	$rootScope.userManagement[pageType].searchPeriodType,
    	        	searchStartDt 		:	replaceAll(nvltoStr($rootScope.userManagement[pageType].searchStartDt,''), '.', '-'),
    	        	searchEndDt 		:	replaceAll(nvltoStr($rootScope.userManagement[pageType].searchEndDt,''), '.', '-'),
    	        	searchKeyType 		:	$rootScope.userManagement[pageType].searchKeyType,
    	        	searchKey 			:	$rootScope.userManagement[pageType].searchKey,
    	        	sort				:	$rootScope.userManagement[pageType].sort,
    	        	order				:	$rootScope.userManagement[pageType].order,
    	        	//isPaging			: 	'Y',
    	        	nowPage				:	isNull(pagingGlobalVar[pageType+"UserListPaging"])? 1 : pagingGlobalVar[pageType+"UserListPaging"].nowPage,
    	        	rowCnt				:	$rootScope.userManagement[pageType].maxRowCnt,
        		};
        		
        		userManagementService.selectUserList(param, function(data){
        			$rootScope.userManagement[pageType].searchYn = "Y";
					$rootScope.userManagement[pageType].userList = data.userList;
					if(data.userList.length > 0){
						var totCnt = data.userList[0].totalCnt*1;
						var nowPage = $rootScope.userManagement[pageType].nowPage*1;
						var maxRowCnt = $rootScope.userManagement[pageType].maxRowCnt*1;
						$rootScope.userManagement[pageType].totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.userManagement[pageType].nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar[pageType+"UserListPaging"]) || redrawPage){
							$("#"+pageType+"UserListPaging").html("");
							$("#"+pageType+"UserListPaging").createPaging({
								totalCnt: totCnt,
			                    nowPage: nowPage,
			                    maxRowCnt: maxRowCnt,
			                    showPageCnt: 10,
			                    clickEvent: function(pageTrgtId, pageNum) {
			                        pagingUtils.changePaging(pageTrgtId, pageNum, totCnt);
			                        $scope.search($rootScope.userManagement.pageType);// 페이지 번호 선택시 재검색.
			                    }
							});
		        		}
					}else{
						$rootScope.userManagement[pageType].totalCnt = 0;
					}
        		});
        	};
        	
        	$scope.changeMaxRowCnt = function(pageType){
        		$scope.search(pageType, true);
        	};
        	
        	$scope.changeSortOrder = function($event){
        		var pageType = $rootScope.userManagement.pageType;
        		var elemObj = $event.currentTarget || $event.srcElement;
        		var sort = $(elemObj).attr("data-sort");
        		var order = ($(elemObj).attr("data-order") == "desc" ? "asc": "desc");
        		var elemIndex = $(elemObj).parent().find("th").index($(elemObj));
        		$(elemObj).parent().find("th").each(function(i, th){
        			if(i == elemIndex){
        				$(th).find("span").addClass("lineUp");
        				$(th).find("a").removeClass(order=="desc"?"up":"down").addClass(order=="desc"?"down":"up").show();
        			}else{
        				$(th).find("span").removeClass("lineUp");
        				$(th).find("a").removeClass("down").removeClass("up").hide();
        			}
        		});
        		
        		$rootScope.userManagement[pageType].sort = sort;
        		$rootScope.userManagement[pageType].order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(pageType, true);
        	};
        	
            /**
             * 회원 목록 전체 체크박스 컨트롤
             */
            $scope.checkAllUserList = function(pageType){
        		$.each($rootScope.userManagement[pageType].userList, function(i){
        			$rootScope.userManagement[pageType].userList[i].isChecked = $rootScope.userManagement[pageType].isCheckedAll;
            	});
            };
            
            $scope.checkUserList = function(pageType){
            	var isCheckedAll = true;
            	$.each($rootScope.userManagement[pageType].userList, function(i){
            		if(!$rootScope.userManagement[pageType].userList[i].isChecked){
            			isCheckedAll = false;
            		}
            	});
            	$rootScope.userManagement[pageType].isCheckedAll = isCheckedAll;
            };
            
            /**
             * 회원 정보 목록 페이지 이동
             */
            $scope.selectUserListView = function(pageType){
            	$rootScope.userManagement.pageType = pageType;
            	$rootScope.userManagement[pageType].pageViewType = "list";
            	$rootScope.userManagement[pageType].userInfo = {};
            };
            
            /**
             * 회원 정보 상세보기 페이지 이동
             */
            $scope.selectUserInfoView = function(pageType, userSeq){
            	$rootScope.userManagement.pageType = pageType;
            	$rootScope.userManagement[pageType].pageViewType = "info";
            	
        		var param = {
        				userSeq : userSeq,
        		};
        		userService.getUserInfo(param, function(data){
        			$rootScope.userManagement[pageType].userInfo = data.info;
        			
        			var birthDay = $rootScope.userManagement[pageType].userInfo.birthday;
        			$rootScope.userManagement[pageType].userInfo.birthYear = birthDay.substring(0,4);
        			$rootScope.userManagement[pageType].userInfo.birthMonth = birthDay.substring(4,6);
        			$rootScope.userManagement[pageType].userInfo.birthDay = birthDay.substring(6,birthDay.length);
        			
        			if(!isNull($rootScope.userManagement[pageType].userInfo.telNo)){
        				$rootScope.userManagement[pageType].userInfo.telNo1 = $rootScope.userManagement[pageType].userInfo.telNo.split("-")[0]; 
            			$rootScope.userManagement[pageType].userInfo.telNo2 = $rootScope.userManagement[pageType].userInfo.telNo.split("-")[1];
            			$rootScope.userManagement[pageType].userInfo.telNo3 = $rootScope.userManagement[pageType].userInfo.telNo.split("-")[2];
        			}
        			if(!isNull($rootScope.userManagement[pageType].userInfo.cellNo)){
        				$rootScope.userManagement[pageType].userInfo.cellNo1 = $rootScope.userManagement[pageType].userInfo.cellNo.split("-")[0]; 
        				$rootScope.userManagement[pageType].userInfo.cellNo2 = $rootScope.userManagement[pageType].userInfo.cellNo.split("-")[1];
        				$rootScope.userManagement[pageType].userInfo.cellNo3 = $rootScope.userManagement[pageType].userInfo.cellNo.split("-")[2];
        			}
        			
        			if(!isNull($rootScope.userManagement[pageType].userInfo.userEmail)){
        				$rootScope.userManagement[pageType].userInfo.subEmail1 = $rootScope.userManagement[pageType].userInfo.userEmail.split("@")[0];
        				$rootScope.userManagement[pageType].userInfo.subEmail2 = $rootScope.userManagement[pageType].userInfo.userEmail.split("@")[1];
        			}
        			
        			if($rootScope.userManagement[pageType].userInfo.under14Years == "Y"){
        				var guardianBirthDay = nvltoStr($rootScope.userManagement[pageType].userInfo.guardianBirthday,'');
            			$rootScope.userManagement[pageType].userInfo.guardianBirthYear = guardianBirthDay.substring(0,4);
            			$rootScope.userManagement[pageType].userInfo.guardianBirthMonth = guardianBirthDay.substring(4,6);
            			$rootScope.userManagement[pageType].userInfo.guardianBirthDay = guardianBirthDay.substring(6,guardianBirthDay.length);

            			var guardianCellNo = nvltoStr($rootScope.userManagement[pageType].userInfo.guardianCellNo,'');
        				$rootScope.userManagement[pageType].userInfo.guardianCellNo1 = guardianCellNo.split("-")[0]; 
        				$rootScope.userManagement[pageType].userInfo.guardianCellNo2 = guardianCellNo.split("-")[1];
        				$rootScope.userManagement[pageType].userInfo.guardianCellNo3 = guardianCellNo.split("-")[2];
        			}
        		});
            };
            
            /**
             * 회원 정보 수정 페이지 이동
             */
            $scope.updateUserView = function(pageType, userSeq){
            	$rootScope.userManagement.pageType = pageType;
            	$rootScope.userManagement[pageType].pageViewType = "modify";
            	
            	/*
            	var userInfoIsNull = false;
            	if($rootScope.userManagement[pageType].userInfo != null){
            		if($rootScope.userManagement[pageType].userInfo.userSeq != userSeq){
            			userInfoIsNull = true;
            		}  
            	}else{
            		userInfoIsNull = true;
            	}
            	
            	if(userInfoIsNull){
            	*/
            		var param = {
            				userSeq : userSeq,
            		};
            		userService.getUserInfo(param, function(data){
            			$rootScope.userManagement[pageType].userInfo = data.info;
            			$scope.getChildCdList("univAreaCd", "univCode", pageType, $rootScope.userManagement[pageType].userInfo.univCode);
            			
            			var birthDay = $rootScope.userManagement[pageType].userInfo.birthday;
            			$rootScope.userManagement[pageType].userInfo.birthYear = birthDay.substring(0,4);
            			$rootScope.userManagement[pageType].userInfo.birthMonth = birthDay.substring(4,6);
            			$scope.changeDate(pageType);
            			$rootScope.userManagement[pageType].userInfo.birthDay = birthDay.substring(6,birthDay.length);
            			
            			if(!isNull($rootScope.userManagement[pageType].userInfo.telNo)){
            				$rootScope.userManagement[pageType].userInfo.telNo1 = $rootScope.userManagement[pageType].userInfo.telNo.split("-")[0]; 
                			$rootScope.userManagement[pageType].userInfo.telNo2 = $rootScope.userManagement[pageType].userInfo.telNo.split("-")[1];
                			$rootScope.userManagement[pageType].userInfo.telNo3 = $rootScope.userManagement[pageType].userInfo.telNo.split("-")[2];
            			}
            			if(!isNull($rootScope.userManagement[pageType].userInfo.cellNo)){
            				$rootScope.userManagement[pageType].userInfo.cellNo1 = $rootScope.userManagement[pageType].userInfo.cellNo.split("-")[0]; 
            				$rootScope.userManagement[pageType].userInfo.cellNo2 = $rootScope.userManagement[pageType].userInfo.cellNo.split("-")[1];
            				$rootScope.userManagement[pageType].userInfo.cellNo3 = $rootScope.userManagement[pageType].userInfo.cellNo.split("-")[2];
            			}
            			
            			if(!isNull($rootScope.userManagement[pageType].userInfo.userEmail)){
            				$rootScope.userManagement[pageType].userInfo.subEmail1 = $rootScope.userManagement[pageType].userInfo.userEmail.split("@")[0];
            				$rootScope.userManagement[pageType].userInfo.subEmail2 = $rootScope.userManagement[pageType].userInfo.userEmail.split("@")[1];
            			}
            			
            			if($rootScope.userManagement[pageType].userInfo.under14Years == "Y"){
            				var guardianBirthDay = nvltoStr($rootScope.userManagement[pageType].userInfo.guardianBirthday,'');
                			$rootScope.userManagement[pageType].userInfo.guardianBirthYear = guardianBirthDay.substring(0,4);
                			$rootScope.userManagement[pageType].userInfo.guardianBirthMonth = guardianBirthDay.substring(4,6);
                			$rootScope.userManagement[pageType].userInfo.guardianBirthDay = guardianBirthDay.substring(6,guardianBirthDay.length);

                			var guardianCellNo = nvltoStr($rootScope.userManagement[pageType].userInfo.guardianCellNo,'');
            				$rootScope.userManagement[pageType].userInfo.guardianCellNo1 = guardianCellNo.split("-")[0]; 
            				$rootScope.userManagement[pageType].userInfo.guardianCellNo2 = guardianCellNo.split("-")[1];
            				$rootScope.userManagement[pageType].userInfo.guardianCellNo3 = guardianCellNo.split("-")[2];
            			}
            			
            		});
            	/*}*/
            };
            
            /**
             * 회원 강제탈퇴 팝업
             */
            $scope.updateUserForcedWithdraw = function(pageType){
            	var userSeqList = "";
            	var alreadyWithdraw = false;
            	$.each($rootScope.userManagement[pageType].userList, function(i, userInfo){
        			if(userInfo.isChecked){
        				userSeqList += userInfo.userSeq + ",";
        				if(userInfo.userStatusCd == Const.code.USER_STATUS_FORCED_WITHDRAW || userInfo.userStatusCd == Const.code.USER_STATUS_WITHDRAW) {
        					alreadyWithdraw = true;
        				}
        			}
            	});
            	
            	if(isNull(userSeqList)){
            		commonService.alert("회원을 선택해주세요.");
            		return;
            	}
            	
            	if(alreadyWithdraw){
            		commonService.alert("이미 탈퇴한 회원이 포함되어 있습니다.");
            		return;
            	}
            	
            	userSeqList = userSeqList.length > 0 ? userSeqList.substring(0, userSeqList.length-1) : userSeqList;
            	
            	ngDialog.open({
                    template: Const.contextPath + 'common/userForcedWithdrawPop.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 690,
                    controller: function($rootScope, $scope, userManagementService, commonService, $cookies, Const) {
                    	$scope.withdrawReason = null;
                    	$scope.userSeqList = userSeqList;
                    	
                    	/**
                         * 글자수 200자 체크
                         */
                        $("textarea#withdrawReason").on("keyup", function() {
                            if($(this).val().length > 200) {
                            	commonService.alert("회원탈퇴 사유는 200자 이상 초과할 수 없습니다.");
                            	$(this).val($(this).val().substring(0, 200));
                            }
                        });
                    	
                        /**
                         * 회원 탈퇴처리
                         */
    					$scope.updateForcedWithdraw = function() {
    						if(isNull($scope.withdrawReason)){
    							commonService.alert("탈퇴 사유를 입력해주세요.", function(){
    								$("textarea#withdrawReason").focus();
    							});
    		            		return;
    						}
    						
    						commonService.confirm("회원을 탈퇴시키면 복구가 불가능합니다.\n탈퇴 시키겠습니까?", function(){
    							var param = {
		    							userSeqList : $scope.userSeqList,
		    							withdrawReason : $scope.withdrawReason,
		    							statusCode : Const.code.USER_STATUS_FORCED_WITHDRAW,
	    						};
	    						userManagementService.updateUserDetail(param, function(data){
	    							$scope.closeThisDialog();
	    							$rootScope.userManagement.scope.search('basic', true);
	    						});
    						});
    					};
    					
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        };
                    }
                });
            };
            
            /**
        	 * 회원 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(pageType){
        		if($rootScope.userManagement[pageType].searchYn != "Y"){
        			$scope.search(pageType, true);
            	}
        		
        		var param = {
        			searchPageType		: 	pageType,
    	        	searchUserType		:	$rootScope.userManagement[pageType].searchUserType,
    	        	searchUnivArea		:	$rootScope.userManagement[pageType].searchUnivArea,
    	        	searchUniv			:	$rootScope.userManagement[pageType].searchUniv,
    	        	searchUserStatus 	:	$rootScope.userManagement[pageType].searchUserStatus,
    	        	searchPeriodType 	:	$rootScope.userManagement[pageType].searchPeriodType,
    	        	searchStartDt 		:	replaceAll(nvltoStr($rootScope.userManagement[pageType].searchStartDt,''), '.', '-'),
    	        	searchEndDt 		:	replaceAll(nvltoStr($rootScope.userManagement[pageType].searchEndDt,''), '.', '-'),
    	        	searchKeyType 		:	$rootScope.userManagement[pageType].searchKeyType,
    	        	searchKey 			:	$rootScope.userManagement[pageType].searchKey,
    	        	sort				:	$rootScope.userManagement[pageType].sort,
    	        	order				:	$rootScope.userManagement[pageType].order,
    	        	isPaging			: 	'N',
        		};
        		
        		$("<input></input>").attr({type:"hidden", name:"searchPageType",	value:param.searchPageType	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUserType",	value:param.searchUserType	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUnivArea",	value:param.searchUnivArea	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUniv",		value:param.searchUniv		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUserStatus",	value:param.searchUserStatus}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchPeriodType",	value:param.searchPeriodType}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchStartDt",		value:param.searchStartDt	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchEndDt",		value:param.searchEndDt		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchKeyType",		value:param.searchKeyType	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchKey",			value:param.searchKey		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sort",				value:param.sort			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"order",				value:param.order			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"isPaging",			value:"N"					}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sortOnly",			value:"Y"					}).appendTo($("#excelForm"));
        		
        		$("#excelForm").attr("action", Const.contextPath + "userManagement/userListExcelDown.do").submit();
        		$("#excelForm").html("");
        	};
        	
        	/********** 회원 정보 수정 관련 start **********/
        	
        	/**
             * 월별 일 목록 세팅
             */
            $scope.changeDate = function(pageType) {
            	var year = $rootScope.userManagement[pageType].userInfo.birthYear;
            	var month = $rootScope.userManagement[pageType].userInfo.birthMonth;
            	var curDate = $rootScope.userManagement[pageType].userInfo.birthDay;
            	var dayArr = [];
    		    for(var i = 1; i < lastDay(year, month) + 1; i++) {
    		 	    dayArr.push({code : leadingZeros(i,2), codeName : leadingZeros(i,2)});  
    		    }
    		    
    		    $rootScope.userManagement[pageType].birthDayList = dayArr;
    		    if(curDate <= lastDay(year, month)) {
    		    	$rootScope.userManagement[pageType].userInfo.birthDay = curDate;
    		    }
            };
    		
    		/**
             * 이메일 도메인 셀렉트박스 이벤트
             */
            $scope.changeEmailDomain = function(pageType, target, select) {
            	if(isNull($rootScope.userManagement[pageType].userInfo[select])){
            		$("[ng-model='$root.userManagement."+pageType+".userInfo."+target+"']").attr("readonly", false);
            		$rootScope.userManagement[pageType].userInfo[target] = "";
            	}else{
            		$("[ng-model='$root.userManagement."+pageType+".userInfo."+target+"']").attr("readonly", true);
            		$rootScope.userManagement[pageType].userInfo[target] = $rootScope.userManagement[pageType].userInfo[select];
            	}
            };
            
            /**
             * 회원 정보 수정 버튼
             */
            $scope.updateUserInfo = function(pageType) {
            	if($scope.checkValidate(pageType)){
            		commonService.confirm('회원정보를 수정 하시겠습니까?', function() {
            			var param = {};
            			if([Const.code.USER_TYPE_UNIV, Const.code.USER_TYPE_STUDENT].indexOf($rootScope.userManagement[pageType].userInfo.userType) > -1){
            				param = {
                					univCode		: $rootScope.userManagement[pageType].userInfo.univCode,
                					department	: $rootScope.userManagement[pageType].userInfo.department,
                					studentNumber: $rootScope.userManagement[pageType].userInfo.studentNumber,
                					birthday	: $rootScope.userManagement[pageType].userInfo.birthYear + $rootScope.userManagement[pageType].userInfo.birthMonth + $rootScope.userManagement[pageType].userInfo.birthDay,
                					telNo		: $rootScope.userManagement[pageType].userInfo.telNo1 + '-' + $rootScope.userManagement[pageType].userInfo.telNo2 + '-' + $rootScope.userManagement[pageType].userInfo.telNo3,
                					cellNo		: $rootScope.userManagement[pageType].userInfo.cellNo1 + '-' + $rootScope.userManagement[pageType].userInfo.cellNo2 + '-' + $rootScope.userManagement[pageType].userInfo.cellNo3,
                					userEmail	: $rootScope.userManagement[pageType].userInfo.subEmail1 + '@' + $rootScope.userManagement[pageType].userInfo.subEmail2,
                					userSeq		: $rootScope.userManagement[pageType].userInfo.userSeq,
                					userId		: $rootScope.userManagement[pageType].userInfo.userId
                			}            			
            			}else if([Const.code.USER_TYPE_LLLEARN, Const.code.USER_TYPE_CITIZEN].indexOf($rootScope.userManagement[pageType].userInfo.userType) > -1){
            				param = {
            						univCode		: $rootScope.userManagement[pageType].userInfo.univCode,
                					department	: $rootScope.userManagement[pageType].userInfo.department,
                					studentNumber: $rootScope.userManagement[pageType].userInfo.studentNumber,
                					birthday	: $rootScope.userManagement[pageType].userInfo.birthYear + $rootScope.userManagement[pageType].userInfo.birthMonth + $rootScope.userManagement[pageType].userInfo.birthDay,
                					telNo		: $rootScope.userManagement[pageType].userInfo.telNo1 + '-' + $rootScope.userManagement[pageType].userInfo.telNo2 + '-' + $rootScope.userManagement[pageType].userInfo.telNo3,
                					cellNo		: $rootScope.userManagement[pageType].userInfo.cellNo1 + '-' + $rootScope.userManagement[pageType].userInfo.cellNo2 + '-' + $rootScope.userManagement[pageType].userInfo.cellNo3,
                					userEmail	: $rootScope.userManagement[pageType].userInfo.subEmail1 + '@' + $rootScope.userManagement[pageType].userInfo.subEmail2,
                					userSeq		: $rootScope.userManagement[pageType].userInfo.userSeq,
                					userId		: $rootScope.userManagement[pageType].userInfo.userId
                			}
            			}
            			if(param != {}){
            				userService.updateUserInfo(param, function(data) {
            					$scope.selectUserListView(pageType);
            					$scope.search(pageType, true);
            				});
            			}
            		});
            	}else{
            		
            	}
            }
            
            /**
             * 회원 정보 validate check
             */
            $scope.checkValidate = function(pageType){
            	if([Const.code.USER_TYPE_UNIV, Const.code.USER_TYPE_STUDENT].indexOf($rootScope.userManagement[pageType].userInfo.userType) > -1){
            		if(isNull($rootScope.userManagement[pageType].userInfo.univAreaCd)){
            			commonService.alert("소속 대학교를 선택해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.univAreaCd']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.userManagement[pageType].userInfo.univCode)){
            			commonService.alert("소속 대학교를 선택해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.univCode']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.userManagement[pageType].userInfo.department)){
            			commonService.alert("학과명(부서명)을 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.department']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.userManagement[pageType].userInfo.studentNumber) && $rootScope.userManagement[pageType].userInfo.userType == Const.code.USER_TYPE_STUDENT){
            			commonService.alert("학번을 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.studentNumber']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.userManagement[pageType].userInfo.cellNo2)){
            			commonService.alert("휴대폰번호를 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.cellNo2']").focus());
            			return false;
            		}else{
            			if($rootScope.userManagement[pageType].userInfo.cellNo2.length < 3){
            				commonService.alert("휴대폰번호를 정확히 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.cellNo2']").focus());
                			return false;
            			}
            		}
            		
            		if(isNull($rootScope.userManagement[pageType].userInfo.cellNo3)){
            			commonService.alert("휴대폰번호를 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.cellNo3']").focus());
            			return false;
            		}else{
            			if($rootScope.userManagement[pageType].userInfo.cellNo3.length < 4){
            				commonService.alert("휴대폰번호를 정확히 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.cellNo3']").focus());
                			return false;
            			}
            		}
            		
            		if(isNull($rootScope.userManagement[pageType].userInfo.subEmail1)){
            			commonService.alert("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.subEmail1']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.userManagement[pageType].userInfo.subEmail2)){
            			commonService.alert("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.subEmail2']").focus());
            			return false;
            		}
            		
            		if(!isEmailAddr($rootScope.userManagement[pageType].userInfo.subEmail1+"@"+$rootScope.userManagement[pageType].userInfo.subEmail2)){
            			commonService.alert("비밀번호 변경/알림용 이메일이 올바르지 않습니다. 다시 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.subEmail2']").focus());
            			return false;
            		}
            	}else if([Const.code.USER_TYPE_LLLEARN, Const.code.USER_TYPE_CITIZEN].indexOf($rootScope.userManagement[pageType].userInfo.userType) > -1){
            		if(isNull($rootScope.userManagement[pageType].userInfo.univAreaCd)){
            			commonService.alert("소속 대학교를 선택해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.univAreaCd']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.userManagement[pageType].userInfo.univCode)){
            			commonService.alert("소속 대학교를 선택해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.univCode']").focus());
            			return false;
            		}
            		/*
            		if(isNull($rootScope.userManagement[pageType].userInfo.department)){
            			commonService.alert("학과명(부서명)을 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.department']").focus());
            			return false;
            		}
            		*/
            		if($rootScope.userManagement[pageType].userInfo.under14Year != "Y"){
            			if(isNull($rootScope.userManagement[pageType].userInfo.cellNo2)){
            				commonService.alert("휴대폰번호를 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.cellNo2']").focus());
            				return false;
            			}else{
            				if($rootScope.userManagement[pageType].userInfo.cellNo2.length < 3){
            					commonService.alert("휴대폰번호를 정확히 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.cellNo2']").focus());
            					return false;
            				}
            			}
            			
            			if(isNull($rootScope.userManagement[pageType].userInfo.cellNo3)){
            				commonService.alert("휴대폰번호를 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.cellNo3']").focus());
            				return false;
            			}else{
            				if($rootScope.userManagement[pageType].userInfo.cellNo3.length < 4){
            					commonService.alert("휴대폰번호를 정확히 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.cellNo3']").focus());
            					return false;
            				}
            			}
            		}
            		
            		if(isNull($rootScope.userManagement[pageType].userInfo.subEmail1)){
            			commonService.alert("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.subEmail1']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.userManagement[pageType].userInfo.subEmail2)){
            			commonService.alert("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.subEmail2']").focus());
            			return false;
            		}
            		
            		if(!isEmailAddr($rootScope.userManagement[pageType].userInfo.subEmail1+"@"+$rootScope.userManagement[pageType].userInfo.subEmail2)){
            			commonService.alert("비밀번호 변경/알림용 이메일이 올바르지 않습니다. 다시 입력해주세요.", $("[ng-model='$root.userManagement.basic.userInfo.subEmail2']").focus());
            			return false;
            		}
            		
            	}else{
            		return false;
            	}
            	return true;
            }
            /********** 회원 정보 수정 관련 end **********/

            /********** 회원 가입/탈퇴 승인 대기 관련 start **********/
            $scope.updateUserConfirm = function(pageType, userSeq){
            	var userSeqList = "";
            	if(isNull(userSeq)){
            		var alreadyReject = false;
            		$.each($rootScope.userManagement[pageType].userList, function(i, userInfo){
            			if(userInfo.isChecked){
            				userSeqList += userInfo.userSeq + ",";
            				if(pageType == "account"){
            					if(!isNull(userInfo.accountRejectReason)) {
            						alreadyReject = true;
            					}
            				}else if(pageType == "withdraw"){
            					if(!isNull(userInfo.withdrawRejectReason)) {
                					alreadyReject = true;
                				}	
            				}
            			}
            		});
            		
            		if(isNull(userSeqList)){
            			commonService.alert("회원을 선택해주세요.");
            			return;
            		}
            		
            		if(alreadyReject){
            			commonService.alert("이미 반려한 회원이 포함되어 있습니다.");
            			return;
            		}
            		
            		userSeqList = userSeqList.length > 0 ? userSeqList.substring(0, userSeqList.length-1) : userSeqList;
            	}
            	
            	commonService.confirm("승인하시겠습니까?", function(){
	            	var param = {
	            		searchPageType : pageType,
	            		userSeq : userSeq,
	            		userSeqList : userSeqList,
	            	};
	            	userManagementService.updateUserConfirm(param, function(data){
	            		if(data.resultCode == "0"){
	        				$scope.search("basic", true);
        					$scope.search(pageType, true);
	            		}
	            	});
            	});
            };
            
            $scope.updateUserRejectReason = function(pageType, userSeq){
            	ngDialog.open({
                    template: Const.contextPath + 'common/userRejectPop.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 690,
                    controller: function($rootScope, $scope, userManagementService, commonService, $cookies, Const) {
                    	$scope.popupViewType = "modify";
                    	$scope.rejectReason = null;
                    	
                    	/**
                         * 글자수 200자 체크
                         */
                        $("textarea#rejectReason").on("keyup", function() {
                            if($(this).val().length > 200) {
                            	commonService.alert("반려 사유는 200자 이상 초과할 수 없습니다.");
                            	$(this).val($(this).val().substring(0, 200));
                            }
                        });
                    	
                        /**
                         * 회원 탈퇴처리
                         */
    					$scope.updateReject = function() {
    						if(isNull($scope.rejectReason)){
    							commonService.alert("반려 사유를 입력해주세요.", function(){
    								$("textarea#rejectReason").focus();
    							});
    		            		return;
    						}
    						
    						commonService.confirm("반려 처리하시겠습니까?", function(){
    							var param = {
		    							userSeq : userSeq,
		    							//accountRejectReason : $scope.accountRejectReason,
	    						};
    							param[pageType+"RejectReason"] = $scope.rejectReason;
	    						userManagementService.updateUserDetail(param, function(data){
	    							$scope.closeThisDialog();
	    							$rootScope.userManagement.scope.search('basic', true);
	    							$rootScope.userManagement.scope.search(pageType, true);
	    						});
    						});
    					};
    					
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        };
                    }
                });
            };
            
            $scope.selectUserRejectReason = function(pageType, userListIdx){
            	ngDialog.open({
                    template: Const.contextPath + 'common/userRejectPop.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 690,
                    controller: function($rootScope, $scope, userManagementService, commonService, $cookies, Const) {
                    	$scope.userListIdx = userListIdx;
                    	$scope.popupViewType = "info";
                    	$scope.rejectReason = $rootScope.userManagement[pageType].userList[$scope.userListIdx][pageType+"RejectReason"];
                    	
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        };
                    }
                });
            };
    		/********** 회원 가입 승인 대기 관련 end **********/
        });
})());