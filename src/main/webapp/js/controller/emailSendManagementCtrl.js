((function() {
    angular.module('appModule')
        .controller('emailSendManagementCtrl', function($scope, $rootScope, emailSendManagementService, userService, commonService, Const, ngDialog) {
        	$rootScope.message.emailSendManagement.scope = $scope;
        	console.log("$rootScope.message =>",$rootScope.message);
        	
            $scope.changeTab = function(tabIdx){
            	$rootScope.message.emailSendManagement.nowMgmtTab = tabIdx*1;
            	var pageType = $rootScope.message.emailSendManagement.pageTypeArr[$rootScope.message.emailSendManagement.nowMgmtTab];
            	$rootScope.message.emailSendManagement.pageType = pageType;
            	
            	if($rootScope.message.emailSendManagement[pageType].searchYn != "Y"){
            		$scope.search(pageType, true);
            	}
            };
            
            /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 *//*
        	$scope.getChildCdList = function(parentModel, childModel, pageType, defaultValue){
        		$rootScope.message.emailSendManagement[pageType][childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.message.emailSendManagement[pageType][parentModel])) return;
        			commonService.getCodeList($rootScope.message.emailSendManagement[pageType][parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.message.emailSendManagement[pageType][childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.message.emailSendManagement[pageType][childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)){
                				$rootScope.message.emailSendManagement[pageType][childModel] = $rootScope.message.emailSendManagement[pageType][childModel+"List"][0].code;
                			}else{
                				$rootScope.message.emailSendManagement[pageType][childModel] = defaultValue;
                			}
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.message.emailSendManagement[pageType].userInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.message.emailSendManagement[pageType].userInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.message.emailSendManagement[pageType][childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.message.emailSendManagement[pageType][childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			if(isNull(defaultValue)){
	            				$rootScope.message.emailSendManagement[pageType].userInfo[childModel] = $rootScope.message.emailSendManagement[pageType][childModel+"List"][0].code;
	            			}else{
	            				$rootScope.message.emailSendManagement[pageType].userInfo[childModel] = defaultValue;
                			}
	            		}
        			});
        		}
        	};
            
            //기본 셀렉트 박스 데이터 조회
            $.each($rootScope.message.emailSendManagement.pageTypeArr, function(i, pageType){
            	
            	//달력
        		$("[ng-model='$root.emailSendManagement."+pageType+".searchStartDt']").datepicker(getDatePickerConfig("dateField"));
        		$("[ng-model='$root.emailSendManagement."+pageType+".searchEndDt']").datepicker(getDatePickerConfig("dateField"));
        		
            	//회원 유형 목록
            	if($rootScope.message.emailSendManagement[pageType].searchUserTypeList.length == 1){
            		commonService.getCodeList(Const.code.USER_TYPE_ROOT, function(data) {
            			if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.message.emailSendManagement[pageType].searchUserTypeList = [];
            				$rootScope.message.emailSendManagement[pageType].searchUserTypeList.push({code:"", codeName:"전체"});
            				$.each(data.codeList, function(i, codeInfo){
            					$rootScope.message.emailSendManagement[pageType].searchUserTypeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				});
            			}
            		});
            	};
            	
            	//학교 지역 목록
            	if($rootScope.message.emailSendManagement[pageType].searchUnivAreaList.length == 1){
                	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
                			$rootScope.message.emailSendManagement[pageType].searchUnivAreaList = [];
                			$rootScope.message.emailSendManagement[pageType].searchUnivAreaList.push({code:"", codeName:"지역 전체"});
                			$rootScope.message.emailSendManagement[pageType].univAreaCdList = [];
                			$rootScope.message.emailSendManagement[pageType].univAreaCdList.push({code:"", codeName:"지역 선택"});
                			$.each(data.codeList, function(i, codeInfo){
                				$rootScope.message.emailSendManagement[pageType].searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
                				$rootScope.message.emailSendManagement[pageType].univAreaCdList.push({code : codeInfo.code, codeName : codeInfo.codeName});
                			});
                		}
                	});
                };
                
                
                //회원 상태 코드 목록
            	if($rootScope.message.emailSendManagement[pageType].searchUserStatusList.length == 1){
                	commonService.getCodeList(Const.code.USER_STATUS_ROOT, function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
                			$rootScope.message.emailSendManagement[pageType].searchUserStatusList = [];
                			$rootScope.message.emailSendManagement[pageType].searchPeriodTypeList = [];
                			$rootScope.message.emailSendManagement[pageType].searchUserStatusList.push({code:"", codeName:"전체"});
                			$rootScope.message.emailSendManagement[pageType].searchPeriodTypeList.push({code:"", codeName:"전체"});
                			$.each(data.codeList, function(i, codeInfo){
                				$rootScope.message.emailSendManagement[pageType].searchUserStatusList.push({code : codeInfo.code, codeName : codeInfo.codeName});
                				$rootScope.message.emailSendManagement[pageType].searchPeriodTypeList.push({code : codeInfo.code, codeName : codeInfo.codeName+"일"});
                			});
                		}
                	});
                };
                
                //사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.message.emailSendManagement[pageType].searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", pageType, $rootScope.userSession.univCode);
        			$rootScope.message.emailSendManagement[pageType].searchUniv = $rootScope.userSession.univCode;
        			
        			$("[ng-model='$root.emailSendManagement."+pageType+".searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.emailSendManagement."+pageType+".searchUniv']").attr("disabled", true);
        			
        		}
            });
            
            //email domain 목록 
            if($rootScope.message.emailSendManagement.emailDomainList.length == 0){
	        	commonService.getCodeList(Const.code.EMAIL_DOMAIN_ROOT, function(data) {
	        		if(data.codeList != null && data.codeList.length > 0){
	        			$rootScope.message.emailSendManagement.emailDomainList = [];
	        			$rootScope.message.emailSendManagement.emailDomainList.push({code:"", codeName:"직접입력"});
	        			$.each(data.codeList, function(i, codeInfo){
	        				$rootScope.message.emailSendManagement.emailDomainList.push({code : codeInfo.codeName, codeName : codeInfo.codeName});
	                    });
	        		}
	            });
            }
        	
        	//전화 지역번호 목록
            if($rootScope.message.emailSendManagement.telNoList.length == 0){
            	commonService.getCodeList(Const.code.TEL_NUMBER_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.message.emailSendManagement.telNoList.push({code : codeInfo.codeName, codeName : codeInfo.codeName});
            			});
            			$rootScope.message.emailSendManagement.basic.userInfo.telNo1 = $rootScope.message.emailSendManagement.telNoList[0].code;
            		}
            	});
            }
        	
        	//모바일 전화번호 목록
            if($rootScope.message.emailSendManagement.cellNoList.length == 0){
	        	commonService.getCodeList(Const.code.MOBILE_NUMBER_ROOT, function(data) {
	        		if(data.codeList != null && data.codeList.length > 0){
	        			$.each(data.codeList, function(i, codeInfo){
	        				$rootScope.message.emailSendManagement.cellNoList.push({code : codeInfo.codeName, codeName : codeInfo.codeName});
	                    });
	        			$rootScope.message.emailSendManagement.basic.userInfo.cellNo1 = $rootScope.message.emailSendManagement.cellNoList[0].code;
	        		}
	            });
            }
            
        	$scope.resetSearchFiled = function(pageType){
    			$rootScope.message.emailSendManagement[pageType].searchUserType		= null;
    			$rootScope.message.emailSendManagement[pageType].searchUnivArea		= null;
    			$rootScope.message.emailSendManagement[pageType].searchUniv			= null;
    			$rootScope.message.emailSendManagement[pageType].searchUserStatus	= null;
    			$rootScope.message.emailSendManagement[pageType].searchPeriodType	= null;
    			$rootScope.message.emailSendManagement[pageType].searchStartDt		= null;
    			$rootScope.message.emailSendManagement[pageType].searchEndDt		= null;
    			$rootScope.message.emailSendManagement[pageType].searchKeyType		= null;
    			$rootScope.message.emailSendManagement[pageType].searchKey			= null;
        	};
        	*/
        	/**
        	 * 회원 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(pageType, redrawPage){
        		console.log(pageType, redrawPage);
        		if(pageType.toLowerCase().indexOf("result") > -1){
        			//발송이력 조회
        			var param = {
        					searchMsgType		: 	$rootScope.message.emailSendManagement[pageType].searchMsgType,
        					searchUnivArea		:	$rootScope.message.emailSendManagement[pageType].searchUnivArea,
        					searchUniv			:	$rootScope.message.emailSendManagement[pageType].searchUniv,
        					searchStartDt 		:	replaceAll(nvltoStr($rootScope.message.emailSendManagement[pageType].searchStartDt,''), '.', '-'),
        					searchEndDt 		:	replaceAll(nvltoStr($rootScope.message.emailSendManagement[pageType].searchEndDt,''), '.', '-'),
        					searchTitle 		:	$rootScope.message.emailSendManagement[pageType].searchTitle,
        					sort				:	$rootScope.message.emailSendManagement[pageType].sort,
        					order				:	$rootScope.message.emailSendManagement[pageType].order,
        					//isPaging			: 	'Y',
        					nowPage				:	isNull(pagingGlobalVar[pageType+"Paging"])? 1 : pagingGlobalVar[pageType+"Paging"].nowPage,
        							rowCnt				:	$rootScope.message.emailSendManagement[pageType].maxRowCnt,
        			};
        			
        			emailSendManagementService.getMessageList(param, function(data){
        				$rootScope.message.emailSendManagement[pageType].searchYn = "Y";
        				$rootScope.message.emailSendManagement[pageType].messageList = data.messageList;
        				if(data.messageList.length > 0){
        					var totCnt = data[pageType][0].totalCnt*1;
        					var nowPage = $rootScope.message.emailSendManagement[pageType].nowPage*1;
        					var maxRowCnt = $rootScope.message.emailSendManagement[pageType].maxRowCnt*1;
        					$rootScope.message.emailSendManagement[pageType].totalCnt = totCnt;
        					var maxPage = (totCnt/maxRowCnt)+1;
        					if(nowPage > maxPage){
        						nowPage = maxPage;
        						$rootScope.message.emailSendManagement[pageType].nowPage = nowPage;
        					}
        					
        					//paging 유무 확인 후 없으면 paging영역 재구성 
        					if(isNull(pagingGlobalVar[pageType+"Paging"]) || redrawPage){
        						$("#"+pageType+"Paging").html("");
        						$("#"+pageType+"Paging").createPaging({
        							totalCnt: totCnt,
        							nowPage: nowPage,
        							maxRowCnt: maxRowCnt,
        							showPageCnt: 10,
        							clickEvent: function(pageTrgtId, pageNum) {
        								pagingUtils.changePaging(pageTrgtId, pageNum, totCnt);
        								$scope.search($rootScope.message.emailSendManagement.pageType);// 페이지 번호 선택시 재검색.
        							}
        						});
        					}
        				}else{
        					$rootScope.message.emailSendManagement[pageType].totalCnt = 0;
        				}
        			});
        		}else{
        			//이메일발송 대상 조회
        		}
        	};
        	
        	//페이지 로드시 사용자 목록을 조회하기 위함.
        	$scope.search($rootScope.message.emailSendManagement.pageType, false);
        	
        	$scope.changeMaxRowCnt = function(pageType){
        		$scope.search(pageType, true);
        	};
        	
        	$scope.changeSortOrder = function($event){
        		var pageType = $rootScope.message.emailSendManagement.pageType;
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
        		
        		$rootScope.message.emailSendManagement[pageType].sort = sort;
        		$rootScope.message.emailSendManagement[pageType].order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(pageType, true);
        	};
        	
            /**
             * 회원 목록 전체 체크박스 컨트롤
             *//*
            $scope.checkAllUserList = function(pageType){
        		$.each($rootScope.message.emailSendManagement[pageType].userList, function(i){
        			$rootScope.message.emailSendManagement[pageType].userList[i].isChecked = $rootScope.message.emailSendManagement[pageType].isCheckedAll;
            	});
            };
            
            *//**
             * 회원 정보 목록 페이지 이동
             *//*
            $scope.selectUserListView = function(pageType){
            	$rootScope.message.emailSendManagement.pageType = pageType;
            	$rootScope.message.emailSendManagement[pageType].pageViewType = "list";
            	$rootScope.message.emailSendManagement[pageType].userInfo = {};
            };
            
            *//**
             * 회원 정보 상세보기 페이지 이동
             *//*
            $scope.selectUserInfoView = function(pageType, userSeq){
            	$rootScope.message.emailSendManagement.pageType = pageType;
            	$rootScope.message.emailSendManagement[pageType].pageViewType = "info";
            	
        		var param = {
        				userSeq : userSeq,
        		};
        		userService.getUserInfo(param, function(data){
        			$rootScope.message.emailSendManagement[pageType].userInfo = data.info;
        		});
            };
            
            *//**
             * 회원 정보 수정 페이지 이동
             *//*
            $scope.updateUserView = function(pageType, userSeq){
            	$rootScope.message.emailSendManagement.pageType = pageType;
            	$rootScope.message.emailSendManagement[pageType].pageViewType = "modify";
            	
            	
            	var userInfoIsNull = false;
            	if($rootScope.message.emailSendManagement[pageType].userInfo != null){
            		if($rootScope.message.emailSendManagement[pageType].userInfo.userSeq != userSeq){
            			userInfoIsNull = true;
            		}  
            	}else{
            		userInfoIsNull = true;
            	}
            	
            	if(userInfoIsNull){
            	
            		var param = {
            				userSeq : userSeq,
            		};
            		userService.getUserInfo(param, function(data){
            			$rootScope.message.emailSendManagement[pageType].userInfo = data.info;
            			
            			$scope.getChildCdList("univAreaCd", "univCode", pageType);
            			
            			var birthDay = $rootScope.message.emailSendManagement[pageType].userInfo.birthday;
            			$rootScope.message.emailSendManagement[pageType].userInfo.birthYear = birthDay.substring(0,4);
            			$rootScope.message.emailSendManagement[pageType].userInfo.birthMonth = birthDay.substring(4,6);
            			$scope.changeDate(pageType);
            			$rootScope.message.emailSendManagement[pageType].userInfo.birthDay = birthDay.substring(6,birthDay.length);
            			
            			if(!isNull($rootScope.message.emailSendManagement[pageType].userInfo.telNo)){
            				$rootScope.message.emailSendManagement[pageType].userInfo.telNo1 = $rootScope.message.emailSendManagement[pageType].userInfo.telNo.split("-")[0]; 
                			$rootScope.message.emailSendManagement[pageType].userInfo.telNo2 = $rootScope.message.emailSendManagement[pageType].userInfo.telNo.split("-")[1];
                			$rootScope.message.emailSendManagement[pageType].userInfo.telNo3 = $rootScope.message.emailSendManagement[pageType].userInfo.telNo.split("-")[2];
            			}
            			if(!isNull($rootScope.message.emailSendManagement[pageType].userInfo.cellNo)){
            				$rootScope.message.emailSendManagement[pageType].userInfo.cellNo1 = $rootScope.message.emailSendManagement[pageType].userInfo.cellNo.split("-")[0]; 
            				$rootScope.message.emailSendManagement[pageType].userInfo.cellNo2 = $rootScope.message.emailSendManagement[pageType].userInfo.cellNo.split("-")[1];
            				$rootScope.message.emailSendManagement[pageType].userInfo.cellNo3 = $rootScope.message.emailSendManagement[pageType].userInfo.cellNo.split("-")[2];
            			}
            			
            			if(!isNull($rootScope.message.emailSendManagement[pageType].userInfo.subEmail)){
            				$rootScope.message.emailSendManagement[pageType].userInfo.subEmail1 = $rootScope.message.emailSendManagement[pageType].userInfo.subEmail.split("@")[0];
            				$rootScope.message.emailSendManagement[pageType].userInfo.subEmail2 = $rootScope.message.emailSendManagement[pageType].userInfo.subEmail.split("@")[1];
            			}
            		});
            	}
            };
            
            *//**
             * 회원 강제탈퇴 팝업
             *//*
            $scope.updateUserForcedWithdraw = function(pageType){
            	var userSeqList = "";
            	var alreadyWithdraw = false;
            	$.each($rootScope.message.emailSendManagement[pageType].userList, function(i, userInfo){
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
                    controller: function($rootScope, $scope, emailSendManagementService, commonService, $cookies, Const) {
                    	$scope.withdrawReason = null;
                    	$scope.userSeqList = userSeqList;
                    	
                    	*//**
                         * 글자수 200자 체크
                         *//*
                        $("textarea#withdrawReason").on("keyup", function() {
                            if($(this).val().length > 200) {
                            	commonService.alert("회원탈퇴 사유는 200자 이상 초과할 수 없습니다.");
                            	$(this).val($(this).val().substring(0, 200));
                            }
                        });
                    	
                        *//**
                         * 회원 탈퇴처리
                         *//*
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
	    						emailSendManagementService.updateUserDetail(param, function(data){
	    							$scope.closeThisDialog();
	    							$rootScope.message.emailSendManagement.scope.search('basic', true);
	    						});
    						});
    					};
    					
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        };
                    }
                });
            };
            
            *//**
        	 * 회원 목록 엑셀 다운로드
        	 * @param pageType String
        	 *//*
        	$scope.excelDown = function(pageType){
        		if($rootScope.message.emailSendManagement[pageType].searchYn != "Y"){
        			$scope.search(pageType, true);
            	}
        		
        		var param = {
        			searchPageType		: 	pageType,
    	        	searchUserType		:	$rootScope.message.emailSendManagement[pageType].searchUserType,
    	        	searchUnivArea		:	$rootScope.message.emailSendManagement[pageType].searchUnivArea,
    	        	searchUniv			:	$rootScope.message.emailSendManagement[pageType].searchUniv,
    	        	searchUserStatus 	:	$rootScope.message.emailSendManagement[pageType].searchUserStatus,
    	        	searchPeriodType 	:	$rootScope.message.emailSendManagement[pageType].searchPeriodType,
    	        	searchStartDt 		:	replaceAll(nvltoStr($rootScope.message.emailSendManagement[pageType].searchStartDt,''), '.', '-'),
    	        	searchEndDt 		:	replaceAll(nvltoStr($rootScope.message.emailSendManagement[pageType].searchEndDt,''), '.', '-'),
    	        	searchKeyType 		:	$rootScope.message.emailSendManagement[pageType].searchKeyType,
    	        	searchKey 			:	$rootScope.message.emailSendManagement[pageType].searchKey,
    	        	sort				:	$rootScope.message.emailSendManagement[pageType].sort,
    	        	order				:	$rootScope.message.emailSendManagement[pageType].order,
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
        		
        		$("#excelForm").attr("action", Const.contextPath + "emailSendManagement/userListExcelDown.do").submit();
        		$("#excelForm").html("");
        	};
        	
        	*//********** 회원 정보 수정 관련 start **********//*
        	
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
        	$rootScope.message.emailSendManagement.birthYearList = yearArr;
        	$rootScope.message.emailSendManagement.birthMonthList = monthArr;
        	
        	*//**
             * 월별 일 목록 세팅
             *//*
            $scope.changeDate = function(pageType) {
            	var year = $rootScope.message.emailSendManagement[pageType].userInfo.birthYear;
            	var month = $rootScope.message.emailSendManagement[pageType].userInfo.birthMonth;
            	var curDate = $rootScope.message.emailSendManagement[pageType].userInfo.birthDay;
            	var dayArr = [];
    		    for(var i = 1; i < lastDay(year, month) + 1; i++) {
    		 	    dayArr.push({code : leadingZeros(i,2), codeName : leadingZeros(i,2)});  
    		    }
    		    
    		    $rootScope.message.emailSendManagement[pageType].birthDayList = dayArr;
    		    if(curDate <= lastDay(year, month)) {
    		    	$rootScope.message.emailSendManagement[pageType].userInfo.birthDay = curDate;
    		    }
            };
    		
    		*//**
             * 이메일 도메인 셀렉트박스 이벤트
             *//*
            $scope.changeEmailDomain = function(pageType, target, select) {
            	if(isNull($rootScope.message.emailSendManagement[pageType].userInfo[select])){
            		$("[ng-model='$root.emailSendManagement."+pageType+".userInfo."+target+"']").attr("readonly", false);
            		$rootScope.message.emailSendManagement[pageType].userInfo[target] = "";
            	}else{
            		$("[ng-model='$root.emailSendManagement."+pageType+".userInfo."+target+"']").attr("readonly", true);
            		$rootScope.message.emailSendManagement[pageType].userInfo[target] = $rootScope.message.emailSendManagement[pageType].userInfo[select];
            	}
            };
            
            *//**
             * 회원 정보 수정 버튼
             *//*
            $scope.updateUserInfo = function(pageType) {
            	if($scope.checkValidate(pageType)){
            		commonService.confirm('회원정보를 수정 하시겠습니까?', function() {
            			var param = {};
            			if([Const.code.USER_TYPE_UNIV, Const.code.USER_TYPE_STUDENT].indexOf($rootScope.message.emailSendManagement[pageType].userInfo.userType) > -1){
            				param = {
                					univCode		: $rootScope.message.emailSendManagement[pageType].userInfo.univCode,
                					department	: $rootScope.message.emailSendManagement[pageType].userInfo.department,
                					birthday	: $rootScope.message.emailSendManagement[pageType].userInfo.birthYear + $rootScope.message.emailSendManagement[pageType].userInfo.birthMonth + $rootScope.message.emailSendManagement[pageType].userInfo.birthDay,
                					telNo		: $rootScope.message.emailSendManagement[pageType].userInfo.telNo1 + '-' + $rootScope.message.emailSendManagement[pageType].userInfo.telNo2 + '-' + $rootScope.message.emailSendManagement[pageType].userInfo.telNo3,
                					cellNo		: $rootScope.message.emailSendManagement[pageType].userInfo.cellNo1 + '-' + $rootScope.message.emailSendManagement[pageType].userInfo.cellNo2 + '-' + $rootScope.message.emailSendManagement[pageType].userInfo.cellNo3,
                					subEmail	: $rootScope.message.emailSendManagement[pageType].userInfo.subEmail1 + '@' + $rootScope.message.emailSendManagement[pageType].userInfo.subEmail2,
                					userSeq		: $rootScope.message.emailSendManagement[pageType].userInfo.userSeq,
                					userId		: $rootScope.message.emailSendManagement[pageType].userInfo.userId
                			}            			
            			}else if([Const.code.USER_TYPE_LLLEARN, Const.code.USER_TYPE_CITIZEN].indexOf($rootScope.message.emailSendManagement[pageType].userInfo.userType) > -1){
            				param = {
            						univCode		: $rootScope.message.emailSendManagement[pageType].userInfo.univCode,
                					department	: $rootScope.message.emailSendManagement[pageType].userInfo.department,
                					birthday	: $rootScope.message.emailSendManagement[pageType].userInfo.birthYear + $rootScope.message.emailSendManagement[pageType].userInfo.birthMonth + $rootScope.message.emailSendManagement[pageType].userInfo.birthDay,
                					telNo		: $rootScope.message.emailSendManagement[pageType].userInfo.telNo1 + '-' + $rootScope.message.emailSendManagement[pageType].userInfo.telNo2 + '-' + $rootScope.message.emailSendManagement[pageType].userInfo.telNo3,
                					cellNo		: $rootScope.message.emailSendManagement[pageType].userInfo.cellNo1 + '-' + $rootScope.message.emailSendManagement[pageType].userInfo.cellNo2 + '-' + $rootScope.message.emailSendManagement[pageType].userInfo.cellNo3,
                					subEmail	: $rootScope.message.emailSendManagement[pageType].userInfo.subEmail1 + '@' + $rootScope.message.emailSendManagement[pageType].userInfo.subEmail2,
                					userSeq		: $rootScope.message.emailSendManagement[pageType].userInfo.userSeq,
                					userId		: $rootScope.message.emailSendManagement[pageType].userInfo.userId
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
            
            *//**
             * 회원 정보 validate check
             *//*
            $scope.checkValidate = function(pageType){
            	if([Const.code.USER_TYPE_UNIV, Const.code.USER_TYPE_STUDENT].indexOf($rootScope.message.emailSendManagement[pageType].userInfo.userType) > -1){
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.univAreaCd)){
            			commonService.alert("소속 대학교를 선택해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.univAreaCd']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.univCode)){
            			commonService.alert("소속 대학교를 선택해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.univCode']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.department)){
            			commonService.alert("학과명(부서명)을 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.department']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.studentNumber) && $rootScope.message.emailSendManagement[pageType].userInfo.userType == Const.code.USER_TYPE_STUDENT){
            			commonService.alert("학번을 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.studentNumber']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.cellNo2)){
            			commonService.alert("휴대폰번호를 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.cellNo2']").focus());
            			return false;
            		}else{
            			if($rootScope.message.emailSendManagement[pageType].userInfo.cellNo2.length < 3){
            				commonService.alert("휴대폰번호를 정확히 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.cellNo2']").focus());
                			return false;
            			}
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.cellNo3)){
            			commonService.alert("휴대폰번호를 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.cellNo3']").focus());
            			return false;
            		}else{
            			if($rootScope.message.emailSendManagement[pageType].userInfo.cellNo3.length < 4){
            				commonService.alert("휴대폰번호를 정확히 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.cellNo3']").focus());
                			return false;
            			}
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.subEmail1)){
            			commonService.alert("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.subEmail1']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.subEmail2)){
            			commonService.alert("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.subEmail2']").focus());
            			return false;
            		}
            		
            		if(!isEmailAddr($rootScope.message.emailSendManagement[pageType].userInfo.subEmail1+"@"+$rootScope.message.emailSendManagement[pageType].userInfo.subEmail2)){
            			commonService.alert("비밀번호 변경/알림용 이메일이 올바르지 않습니다. 다시 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.subEmail2']").focus());
            			return false;
            		}
            	}else if([Const.code.USER_TYPE_LLLEARN, Const.code.USER_TYPE_CITIZEN].indexOf($rootScope.message.emailSendManagement[pageType].userInfo.userType) > -1){
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.univAreaCd)){
            			commonService.alert("소속 대학교를 선택해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.univAreaCd']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.univCode)){
            			commonService.alert("소속 대학교를 선택해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.univCode']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.department)){
            			commonService.alert("학과명(부서명)을 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.department']").focus());
            			return false;
            		}
            		
            		if($rootScope.message.emailSendManagement[pageType].userInfo.under14Year != "Y"){
            			if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.cellNo2)){
            				commonService.alert("휴대폰번호를 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.cellNo2']").focus());
            				return false;
            			}else{
            				if($rootScope.message.emailSendManagement[pageType].userInfo.cellNo2.length < 3){
            					commonService.alert("휴대폰번호를 정확히 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.cellNo2']").focus());
            					return false;
            				}
            			}
            			
            			if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.cellNo3)){
            				commonService.alert("휴대폰번호를 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.cellNo3']").focus());
            				return false;
            			}else{
            				if($rootScope.message.emailSendManagement[pageType].userInfo.cellNo3.length < 4){
            					commonService.alert("휴대폰번호를 정확히 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.cellNo3']").focus());
            					return false;
            				}
            			}
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.subEmail1)){
            			commonService.alert("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.subEmail1']").focus());
            			return false;
            		}
            		
            		if(isNull($rootScope.message.emailSendManagement[pageType].userInfo.subEmail2)){
            			commonService.alert("비밀번호 변경/알림용 이메일을 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.subEmail2']").focus());
            			return false;
            		}
            		
            		if(!isEmailAddr($rootScope.message.emailSendManagement[pageType].userInfo.subEmail1+"@"+$rootScope.message.emailSendManagement[pageType].userInfo.subEmail2)){
            			commonService.alert("비밀번호 변경/알림용 이메일이 올바르지 않습니다. 다시 입력해주세요.", $("[ng-model='$root.emailSendManagement.basic.userInfo.subEmail2']").focus());
            			return false;
            		}
            		
            	}else{
            		return false;
            	}
            	return true;
            }
            *//********** 회원 정보 수정 관련 end **********//*

            *//********** 회원 가입/탈퇴 승인 대기 관련 start **********//*
            $scope.updateUserConfirm = function(pageType, userSeq){
            	var userSeqList = "";
            	if(isNull(userSeq)){
            		var alreadyReject = false;
            		$.each($rootScope.message.emailSendManagement[pageType].userList, function(i, userInfo){
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
	            	emailSendManagementService.updateUserConfirm(param, function(data){
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
                    controller: function($rootScope, $scope, emailSendManagementService, commonService, $cookies, Const) {
                    	$scope.popupViewType = "modify";
                    	$scope.rejectReason = null;
                    	
                    	*//**
                         * 글자수 200자 체크
                         *//*
                        $("textarea#rejectReason").on("keyup", function() {
                            if($(this).val().length > 200) {
                            	commonService.alert("반려 사유는 200자 이상 초과할 수 없습니다.");
                            	$(this).val($(this).val().substring(0, 200));
                            }
                        });
                    	
                        *//**
                         * 회원 탈퇴처리
                         *//*
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
	    						emailSendManagementService.updateUserDetail(param, function(data){
	    							$scope.closeThisDialog();
	    							$rootScope.message.emailSendManagement.scope.search('basic', true);
	    							$rootScope.message.emailSendManagement.scope.search(pageType, true);
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
                    controller: function($rootScope, $scope, emailSendManagementService, commonService, $cookies, Const) {
                    	$scope.userListIdx = userListIdx;
                    	$scope.popupViewType = "info";
                    	$scope.rejectReason = $rootScope.message.emailSendManagement[pageType].userList[$scope.userListIdx][pageType+"RejectReason"];
                    	
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        };
                    }
                });
            };
    		*//********** 회원 가입 승인 대기 관련 end **********/
        });
})());