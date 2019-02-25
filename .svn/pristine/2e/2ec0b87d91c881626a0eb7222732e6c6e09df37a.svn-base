((function() {
    angular.module('appModule')
        .controller('applyCancelInCtrl', function($scope, $rootScope, applyCancelInService, commonService, Const, ngDialog) {
        	$rootScope.exchange.cancelIn.scope = $scope;
        	
        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.exchange.cancelIn.searchUnivArea']").attr("disabled", true);
    				$("[ng-model='$root.exchange.cancelIn.searchUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
			
			/**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.exchange.cancelIn[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv" || childModel == "searchUserUniv"){
        			if(isNull($rootScope.exchange.cancelIn[parentModel])) return;
        			commonService.getCodeList($rootScope.exchange.cancelIn[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.exchange.cancelIn[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.exchange.cancelIn[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			$rootScope.exchange.cancelIn[childModel] = $rootScope.exchange.cancelIn[childModel+"List"][0].code;
                			if(isNull(defaultValue)){
                				$rootScope.exchange.cancelIn[childModel] = $rootScope.exchange.cancelIn[childModel+"List"][0].code;
                			}else{
                				$rootScope.exchange.cancelIn[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.exchange.cancelIn.exchangeInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.exchange.cancelIn.exchangeInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.exchange.cancelIn[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.exchange.cancelIn[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			if(isNull(defaultValue)){
	            				$rootScope.exchange.cancelIn.exchangeInfo[childModel] = $rootScope.exchange.cancelIn[childModel+"List"][0].code;
	            			}else{
                				$rootScope.exchange.cancelIn.exchangeInfo[childModel] = defaultValue;
                			}
	            		}
        			});
        		}
        	};
			

            //기본 셀렉트 박스 데이터 조회 start
        	//년도 세팅
        	if($rootScope.exchange.cancelIn.searchYearList.length == 1){
        		$rootScope.exchange.cancelIn.searchYearList = [{code : "", codeName : "전체"}];
        		$rootScope.exchange.cancelIn.yearList = [{code : "", codeName : "년도 선택"}];
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()+2;
	        	for(var i = curYear; i >= nowDate.getFullYear(); i--) {
	    	 	   	$rootScope.exchange.cancelIn.searchYearList.push({code:i, codeName:i});
	    	 	   	$rootScope.exchange.cancelIn.yearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.exchange.cancelIn.searchYear = nowDate.getFullYear()+"";
        	}
        	
        	//학교 지역 목록
        	if($rootScope.exchange.cancelIn.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.cancelIn.searchUnivAreaList = [];
            			$rootScope.exchange.cancelIn.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.exchange.cancelIn.searchUserUnivAreaList = [];
            			$rootScope.exchange.cancelIn.searchUserUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.exchange.cancelIn.univAreaCodeList = [];
            			$rootScope.exchange.cancelIn.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.cancelIn.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.exchange.cancelIn.searchUserUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.exchange.cancelIn.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			
            			//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                        ){
                			$rootScope.exchange.cancelIn.searchUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.cancelIn.searchUnivArea, function(data){
                				$rootScope.exchange.cancelIn.searchUniv = $rootScope.userSession.univCode;
                				$scope.diabledSelectUniv();
            					$rootScope.exchange.cancelIn.isUnivComplete = true;
            					$scope.initSearch();
                			});
                			
                		}else{
                			$rootScope.exchange.cancelIn.searchUnivArea = $rootScope.exchange.cancelIn.searchUnivAreaList[1].code;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.cancelIn.searchUnivArea, function(data){
            					$rootScope.exchange.cancelIn.searchUniv = $rootScope.exchange.cancelIn.searchUnivList[1].code;
            					$rootScope.exchange.cancelIn.isUnivComplete = true;
            					$scope.initSearch();
                			});
                		}
            		}
            	});
            };
            
            //학기 분류 목록 조회
        	if($rootScope.exchange.cancelIn.searchSemesterCodeList.length == 1){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.cancelIn.searchSemesterCodeList = [];
            			$rootScope.exchange.cancelIn.searchSemesterCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.cancelIn.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			$rootScope.exchange.cancelIn.searchSemesterCode = $rootScope.exchange.cancelIn.searchSemesterCodeList[1].code;
            			console.log($rootScope.exchange.cancelIn.searchSemesterCode);
            			$rootScope.exchange.cancelIn.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //학년 목록 조회
        	if($rootScope.exchange.cancelIn.subjectGradeList.length == 0){
            	commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.cancelIn.subjectGradeList = [];
            			$rootScope.exchange.cancelIn.searchStudentGradeCodeList = [];
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.cancelIn.subjectGradeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.exchange.cancelIn.searchStudentGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
            
        	//기본 셀렉트 박스 데이터 조회 end
        	
        	$scope.resetSearchFiled = function(){
        		$rootScope.exchange.cancelIn.searchUnivArea		= null;
    			$rootScope.exchange.cancelIn.searchUniv			= null;
    			$rootScope.exchange.cancelIn.searchYear			= null;
    			$rootScope.exchange.cancelIn.searchSemesterCode  = null;
    			$rootScope.exchange.cancelIn.searchStudentGradeCode = null;
    			$rootScope.exchange.cancelIn.searchUserUnivArea = null;
    			$rootScope.exchange.cancelIn.searchUserUniv = null;
    			$rootScope.exchange.cancelIn.searchUserUnivList = [{code : "", codeName : "대학교 전체"}];
    			$rootScope.exchange.cancelIn.searchType = null;
    			$rootScope.exchange.cancelIn.searchKey = null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.exchange.cancelIn.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.cancelIn.searchUnivArea, function(data){
        				$rootScope.exchange.cancelIn.searchUniv = $rootScope.userSession.univCode;
        				$scope.diabledSelectUniv();
    					$rootScope.exchange.cancelIn.isUnivComplete = true;
        			});
        			
        		}else{
        			$rootScope.exchange.cancelIn.searchUnivArea = $rootScope.exchange.cancelIn.searchUnivAreaList[1].code;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.cancelIn.searchUnivArea, function(data){
    					$rootScope.exchange.cancelIn.searchUniv = $rootScope.exchange.cancelIn.searchUnivList[1].code;
    					$rootScope.exchange.cancelIn.isUnivComplete = true;
        			});
        		}
        		
        		
        		//년도 초기화
        		var nowDate = new Date();
	        	$rootScope.exchange.cancelIn.searchYear = nowDate.getFullYear()+"";
	        	
	        	//학기 초기화
	        	$rootScope.exchange.cancelIn.searchSemesterCode = $rootScope.exchange.cancelIn.searchSemesterCodeList[1].code;
        	};
        	
        	/**
             * 검색영역 validate check
             */
            $scope.checkValidateSearch = function(){
			    if(isNull($rootScope.exchange.cancelIn.searchYear)){
					commonService.alert("검색영역에서 년도를 선택해주세요.");
					return false
				}
				
				if(isNull($rootScope.exchange.cancelIn.searchSemesterCode)){
					commonService.alert("검색영역에서 학기를 입력해주세요.");
					return false;
				}
				
				if(isNull($rootScope.exchange.cancelIn.searchUniv)){
					commonService.alert("검색영역에서 대학을 선택해주세요.");
					return false;
				}
				return true;
            }
        	
        	/**
        	 * 학기 과목 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(redrawPage){
        		if(!$scope.checkValidateSearch()){
        			return;
        		}
        		
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.cancelIn.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.cancelIn.searchUniv,
    	        	searchYear				:	$rootScope.exchange.cancelIn.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.cancelIn.searchSemesterCode,
    	        	searchStudentGradeCode	:	$rootScope.exchange.cancelIn.searchStudentGradeCode,
    	        	searchApplyStatus		:	$rootScope.exchange.cancelIn.searchApplyStatus,
    	        	searchUserUnivArea		:	$rootScope.exchange.cancelIn.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.cancelIn.searchUserUniv,
    	        	searchKey				:	$rootScope.exchange.cancelIn.searchKey,
    	        	searchType				:	$rootScope.exchange.cancelIn.searchType,
    	        	searchPage				:	"cancelIn",
    	        	sort					:	$rootScope.exchange.cancelIn.sort,
    	        	order					:	$rootScope.exchange.cancelIn.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["applyExchangeUserInListPaging"])? 1 : pagingGlobalVar["applyExchangeUserInListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.exchange.cancelIn.maxRowCnt,
        		};
        		applyCancelInService.getApplyExchangeUserList(param, function(data){
        			$rootScope.exchange.cancelIn.searchYn = "Y";
					$rootScope.exchange.cancelIn.applyExchangeUserList = data.applyExchangeUserList;
					if(data.applyExchangeUserList.length > 0){
						var totCnt = data.applyExchangeUserList[0].totalCnt*1;
						var nowPage = $rootScope.exchange.cancelIn.nowPage*1;
						var maxRowCnt = $rootScope.exchange.cancelIn.maxRowCnt*1;
						$rootScope.exchange.cancelIn.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.exchange.cancelIn.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["applyExchangeUserInListPaging"]) || redrawPage){
							$("#applyExchangeUserInListPaging").html("");
							$("#applyExchangeUserInListPaging").createPaging({
								totalCnt: totCnt,
			                    nowPage: nowPage,
			                    maxRowCnt: maxRowCnt,
			                    showPageCnt: 10,
			                    clickEvent: function(pageTrgtId, pageNum) {
			                        pagingUtils.changePaging(pageTrgtId, pageNum, totCnt);
			                        $scope.search();// 페이지 번호 선택시 재검색.
			                    }
							});
		        		}
					}else{
						$rootScope.exchange.cancelIn.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 로드시 신청취소 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.exchange.cancelIn.isUnivComplete && $rootScope.exchange.cancelIn.isSemesterComplete) {
                	$scope.search(false);
        		}
        	};
        	
        	$scope.changeMaxRowCnt = function(){
        		$scope.search(true);
        	};
        	
        	$scope.changeSortOrder = function($event){
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
        		
        		$rootScope.exchange.cancelIn.sort = sort;
        		$rootScope.exchange.cancelIn.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
            /**
             * 학점교류 신청정보 상세보기 팝업
             */
            $scope.applyExchangeInfoView = function(idx){
            	ngDialog.open({
                    template: Const.contextPath + 'html/exchange/applyExchangeInfo.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 740,
                    controller: function($rootScope, $scope, applyCancelInService, subjectService, commonService, $cookies, Const) {
                    	$scope.exchangeInfo = $rootScope.exchange.cancelIn.applyExchangeUserList[idx];
                    	$scope.searchPage = "cancelIn";
                    	//IN 에서 보이는 상세는 다 승인으로 보이게함.
                    	$scope.applyStatusList = [{code : '4', codeName : "승인"},
                    	                          {code : '5', codeName : "승인"},
                    	                          {code : '6', codeName : "승인"}];
                		var param = {
                				semesterCode	: $scope.exchangeInfo.semesterCode,
                				year			: $scope.exchangeInfo.year,
                				univCode		: $scope.exchangeInfo.univCode,
                				subjectNum		: $scope.exchangeInfo.subjectNum,
                				classNum		: $scope.exchangeInfo.classNum,
                		};
                		subjectService.getSubjectInfo(param, function(data){
                			$scope.exchangeInfo.timeList = data.subjectInfo.timeList;
                		});
                    	
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        };
                    }
                });
            };

            
            /**
        	 * 학점교류 신청 유저(IN) 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if(!$scope.checkValidateSearch()){
        			return;
        		}
        		if($rootScope.exchange.cancelIn.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    				searchUnivArea			:	$rootScope.exchange.cancelIn.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.cancelIn.searchUniv,
    	        	searchYear				:	$rootScope.exchange.cancelIn.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.cancelIn.searchSemesterCode,
    	        	searchStudentGradeCode	:	$rootScope.exchange.cancelIn.searchStudentGradeCode,
    	        	searchApplyStatus		:	$rootScope.exchange.cancelIn.searchApplyStatus,
    	        	searchUserUnivArea		:	$rootScope.exchange.cancelIn.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.cancelIn.searchUserUniv,
    	        	searchKey				:	$rootScope.exchange.cancelIn.searchKey,
    	        	searchType				:	$rootScope.exchange.cancelIn.searchType,
    	        	searchPage				:	"cancelIn",
    	        	sort					:	$rootScope.exchange.cancelIn.sort,
    	        	order					:	$rootScope.exchange.cancelIn.order,
    	        	isPaging				: 	'N',
        		};
        		
        		$("<input></input>").attr({type:"hidden", name:"searchUnivArea",		value:param.searchUnivArea			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUniv",			value:param.searchUniv				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchYear",			value:param.searchYear				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchSemesterCode",	value:param.searchSemesterCode		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchStudentGradeCode",value:param.searchStudentGradeCode	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchApplyStatus",		value:param.searchApplyStatus		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUserUnivArea",		value:param.searchUserUnivArea			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUserUniv",			value:param.searchUserUniv				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchKey",				value:param.searchKey				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchType",			value:param.searchType				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchPage",			value:param.searchPage				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sort",					value:param.sort					}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"order",					value:param.order					}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"isPaging",				value:"N"							}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sortOnly",				value:"Y"							}).appendTo($("#excelForm"));
        		
        		$("#excelForm").attr("action", Const.contextPath + "exchange/downloadApplyExchangeUserList.do").submit();
        		$("#excelForm").html("");
        	};
        	
            /**
             * 학점교류 신청취소 상태변경 (교류대학담당자 확인처리)
             */
            $scope.saveMessageConfirm = function(idx, type) {
            	var exchangeInfo = $rootScope.exchange.cancelIn.applyExchangeUserList[idx];
        		commonService.confirm("확인처리 하시겠습니까?", function() {
        			var	param = {
    						semesterCode	: exchangeInfo.semesterCode,
    						year			: exchangeInfo.year,
    						univCode		: exchangeInfo.univCode,
    						subjectNum		: exchangeInfo.subjectNum,
    						classNum		: exchangeInfo.classNum,
    						userUnivCode	: exchangeInfo.userUnivCode,
    						studentNumber	: exchangeInfo.studentNumber,
    						userSeq			: exchangeInfo.userSeq,
    						applyExchangeSeq: exchangeInfo.applyExchangeSeq,
    						messageConfirm	: "Y",
        			};
        			
    				applyCancelInService.changeApplyStatus(param, function(data) {
    					if(data.resultCode == "0"){
    						$scope.search(true);
    					}else{
    						commonService.serverError(data);
    					}
    				});
        		});
            };
            
    		/**
    		 * 담당자 전달 메시지 view
    		 */
    		$scope.viewSendMessage = function(idx){
    			var exchangeInfo = $rootScope.exchange.cancelIn.applyExchangeUserList[idx];
    			ngDialog.open({
                    template: Const.contextPath + 'html/exchange/applyExchangeCancelMessage.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 740,
                    controller: function($rootScope, $scope, applyCancelOutService, subjectService, commonService, $cookies, Const) {
                    	$scope.exchangeInfo = exchangeInfo;
                    	$scope.sendMessage = exchangeInfo.sendMessage;
                    	$scope.saveSendMessage = function() {
                    		var	param = {
            						semesterCode		: exchangeInfo.semesterCode,
            						year				: exchangeInfo.year,
            						univCode			: exchangeInfo.univCode,
            						subjectNum			: exchangeInfo.subjectNum,
            						classNum			: exchangeInfo.classNum,
            						userUnivCode		: exchangeInfo.userUnivCode,
            						studentNumber		: exchangeInfo.studentNumber,
            						userSeq				: exchangeInfo.userSeq,
            						applyExchangeSeq	: exchangeInfo.applyExchangeSeq,
            						applyCancelStatus	: applyCancelStatus,
            						sendMessage			: $scope.sendMessage,
                			};
                			
            				applyCancelOutService.changeApplyStatus(param, function(data) {
            					if(data.resultCode == "0"){
            						$rootScope.exchange.cancelOut.scope.search(true);
            						$scope.closeThisDialog();
            					}else{
            						commonService.serverError(data);
            					}
            				});
                    	};

                    	
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        };
                    }
                }); 
    		};
        });
})());