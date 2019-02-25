((function() {
    angular.module('appModule')
        .controller('exchangeConfirmOutCtrl', function($scope, $rootScope, exchangeConfirmOutService, commonService, Const, ngDialog) {
        	$rootScope.exchange.confirmOut.scope = $scope;
			
        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.exchange.confirmOut.searchUnivArea']").attr("disabled", true);
    				$("[ng-model='$root.exchange.confirmOut.searchUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
        	
			/**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.exchange.confirmOut[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.exchange.confirmOut[parentModel])) return;
        			commonService.getCodeList($rootScope.exchange.confirmOut[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.exchange.confirmOut[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.exchange.confirmOut[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			$rootScope.exchange.confirmOut[childModel] = $rootScope.exchange.confirmOut[childModel+"List"][0].code;
                			if(isNull(defaultValue)){
                				$rootScope.exchange.confirmOut[childModel] = $rootScope.exchange.confirmOut[childModel+"List"][0].code;
                			}else{
                				$rootScope.exchange.confirmOut[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.exchange.confirmOut.exchangeInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.exchange.confirmOut.exchangeInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.exchange.confirmOut[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.exchange.confirmOut[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			if(isNull(defaultValue)){
	            				$rootScope.exchange.confirmOut.exchangeInfo[childModel] = $rootScope.exchange.confirmOut[childModel+"List"][0].code;
	            			}else{
                				$rootScope.exchange.confirmOut.exchangeInfo[childModel] = defaultValue;
                			}
	            		}
        			});
        		}
        	};
			

            //기본 셀렉트 박스 데이터 조회 start
        	//년도 세팅
        	if($rootScope.exchange.confirmOut.searchYearList.length == 1){
        		$rootScope.exchange.confirmOut.searchYearList = [{code : "", codeName : "전체"}];
        		$rootScope.exchange.confirmOut.yearList = [{code : "", codeName : "년도 선택"}];
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()+2;
	        	for(var i = curYear; i >= nowDate.getFullYear(); i--) {
	    	 	   	$rootScope.exchange.confirmOut.searchYearList.push({code:i, codeName:i});
	    	 	   	$rootScope.exchange.confirmOut.yearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.exchange.confirmOut.searchYear = nowDate.getFullYear()+"";
        	}
        	
        	//학교 지역 목록
        	if($rootScope.exchange.confirmOut.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.confirmOut.searchUnivAreaList = [];
            			$rootScope.exchange.confirmOut.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.exchange.confirmOut.univAreaCodeList = [];
            			$rootScope.exchange.confirmOut.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.confirmOut.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.exchange.confirmOut.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			
            			//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                        ){
                			$rootScope.exchange.confirmOut.searchUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.confirmOut.searchUnivArea, function(data){
                				$rootScope.exchange.confirmOut.searchUniv = $rootScope.userSession.univCode;
                				$scope.diabledSelectUniv();
            					$rootScope.exchange.confirmOut.isUnivComplete = true;
            					$scope.initSearch();
                			});
                			
                		}else{
                			$rootScope.exchange.confirmOut.searchUnivArea = $rootScope.exchange.confirmOut.searchUnivAreaList[1].code;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.confirmOut.searchUnivArea, function(data){
            					$rootScope.exchange.confirmOut.searchUniv = $rootScope.exchange.confirmOut.searchUnivList[1].code;
            					$rootScope.exchange.confirmOut.isUnivComplete = true;
            					$scope.initSearch();
                			});
                		}
            		}
            	});
            };
            
            //학기 분류 목록 조회
        	if($rootScope.exchange.confirmOut.searchSemesterCodeList.length == 1){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.confirmOut.searchSemesterCodeList = [];
            			$rootScope.exchange.confirmOut.searchSemesterCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.confirmOut.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			$rootScope.exchange.confirmOut.searchSemesterCode = $rootScope.exchange.confirmOut.searchSemesterCodeList[1].code;
            			$rootScope.exchange.confirmOut.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //학년 목록 조회
        	if($rootScope.exchange.confirmOut.subjectGradeList.length == 0){
            	commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.confirmOut.subjectGradeList = [];
            			$rootScope.exchange.confirmOut.searchStudentGradeCodeList = [];
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.confirmOut.subjectGradeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.exchange.confirmOut.searchStudentGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
            
        	//기본 셀렉트 박스 데이터 조회 end
        	$scope.resetSearchFiled = function(){
    			$rootScope.exchange.confirmOut.searchUnivArea		= null;
    			$rootScope.exchange.confirmOut.searchUniv			= null;
    			$rootScope.exchange.confirmOut.searchYear			= null;
    			$rootScope.exchange.confirmOut.searchSemesterCode  = null;
    			$rootScope.exchange.confirmOut.searchStudentGradeCode = null;
    			$rootScope.exchange.confirmOut.searchApplyStatus = null;
    			$rootScope.exchange.confirmOut.searchType = null;
    			$rootScope.exchange.confirmOut.searchKey = null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.exchange.confirmOut.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.confirmOut.searchUnivArea, function(data){
        				$rootScope.exchange.confirmOut.searchUniv = $rootScope.userSession.univCode;
        				$scope.diabledSelectUniv();
    					$rootScope.exchange.confirmOut.isUnivComplete = true;
        			});
        			
        		}else{
        			$rootScope.exchange.confirmOut.searchUnivArea = $rootScope.exchange.confirmOut.searchUnivAreaList[1].code;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.confirmOut.searchUnivArea, function(data){
    					$rootScope.exchange.confirmOut.searchUniv = $rootScope.exchange.confirmOut.searchUnivList[1].code;
    					$rootScope.exchange.confirmOut.isUnivComplete = true;
        			});
        		}
        		
        		
        		//년도 초기화
        		var nowDate = new Date();
	        	$rootScope.exchange.confirmOut.searchYear = nowDate.getFullYear()+"";
	        	
	        	//학기 초기화
	        	$rootScope.exchange.confirmOut.searchSemesterCode = $rootScope.exchange.confirmOut.searchSemesterCodeList[1].code;
        	};
        	
        	/**
             * 검색영역 validate check
             */
            $scope.checkValidateSearch = function(){
			    if(isNull($rootScope.exchange.confirmOut.searchYear)){
					commonService.alert("검색영역에서 년도를 선택해주세요.");
					return false
				}
				
				if(isNull($rootScope.exchange.confirmOut.searchSemesterCode)){
					commonService.alert("검색영역에서 학기를 입력해주세요.");
					return false;
				}
				
				if(isNull($rootScope.exchange.confirmOut.searchUniv)){
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
    	        	searchUnivArea			:	$rootScope.exchange.confirmOut.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.confirmOut.searchUniv,
    	        	searchYear				:	$rootScope.exchange.confirmOut.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.confirmOut.searchSemesterCode,
    	        	searchStudentGradeCode	:	$rootScope.exchange.confirmOut.searchStudentGradeCode,
    	        	searchApplyStatus		:	$rootScope.exchange.confirmOut.searchApplyStatus,
    	        	searchKey				:	$rootScope.exchange.confirmOut.searchKey,
    	        	searchType				:	$rootScope.exchange.confirmOut.searchType,
    	        	searchPage				:   "confirmOut",
    	        	sort					:	$rootScope.exchange.confirmOut.sort,
    	        	order					:	$rootScope.exchange.confirmOut.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["applyExchangeUserOutListPaging"])? 1 : pagingGlobalVar["applyExchangeUserOutListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.exchange.confirmOut.maxRowCnt,
        		};
        		exchangeConfirmOutService.getApplyExchangeUserList(param, function(data){
        			$rootScope.exchange.confirmOut.searchYn = "Y";
					$rootScope.exchange.confirmOut.applyExchangeUserList = data.applyExchangeUserList;
					if(data.applyExchangeUserList.length > 0){
						var totCnt = data.applyExchangeUserList[0].totalCnt*1;
						var nowPage = $rootScope.exchange.confirmOut.nowPage*1;
						var maxRowCnt = $rootScope.exchange.confirmOut.maxRowCnt*1;
						$rootScope.exchange.confirmOut.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.exchange.confirmOut.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["applyExchangeUserOutListPaging"]) || redrawPage){
							$("#applyExchangeUserOutListPaging").html("");
							$("#applyExchangeUserOutListPaging").createPaging({
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
						$rootScope.exchange.confirmOut.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 로드시 학기 목록을 조회하기 위함.
    		//페이지 로드시 수강결과 등록 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.exchange.confirmOut.isUnivComplete && $rootScope.exchange.confirmOut.isSemesterComplete) {
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
        		
        		$rootScope.exchange.confirmOut.sort = sort;
        		$rootScope.exchange.confirmOut.order = order;
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
                    controller: function($rootScope, $scope, exchangeConfirmOutService, subjectService, commonService, $cookies, Const) {
                    	$scope.exchangeInfo = $rootScope.exchange.confirmOut.applyExchangeUserList[idx];
                    	$scope.searchPage = "confirmOut";
                    	$scope.applyStatusList = [{code : '1', codeName : "대기"}, {code : '2', codeName : "승인"}, {code : '3', codeName : "반려"}];
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
        	 * 학점교류 신청 유저(OUT) 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if(!$scope.checkValidateSearch()){
        			return;
        		}
        		if($rootScope.exchange.confirmOut.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    				searchUnivArea			:	$rootScope.exchange.confirmOut.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.confirmOut.searchUniv,
    	        	searchYear				:	$rootScope.exchange.confirmOut.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.confirmOut.searchSemesterCode,
    	        	searchStudentGradeCode	:	$rootScope.exchange.confirmOut.searchStudentGradeCode,
    	        	searchApplyStatus	:	$rootScope.exchange.confirmOut.searchApplyStatus,
    	        	searchKey				:	$rootScope.exchange.confirmOut.searchKey,
    	        	searchType				:	$rootScope.exchange.confirmOut.searchType,
    	        	searchPage				:	"confirmOut",
    	        	sort					:	$rootScope.exchange.confirmOut.sort,
    	        	order					:	$rootScope.exchange.confirmOut.order,
    	        	isPaging				: 	'N',
        		};
        		
        		$("<input></input>").attr({type:"hidden", name:"searchUnivArea",		value:param.searchUnivArea			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUniv",			value:param.searchUniv				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchYear",			value:param.searchYear				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchSemesterCode",	value:param.searchSemesterCode		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchStudentGradeCode",value:param.searchStudentGradeCode	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchApplyStatus",		value:param.searchApplyStatus		}).appendTo($("#excelForm"));
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
             * 학점교류 신청 상태변경(승인/반려/이관)
             */
            $scope.changeApplyStatus = function(idx, type) {
            	var exchangeInfo = $rootScope.exchange.confirmOut.applyExchangeUserList[idx];
            	var applyStatus = null;
            	var withoutRejectReason = true;
            	var confirmTxt = "선택한 학생을 승인하시겠습니까?";
            	if(type == "confirm"){
            		applyStatus = exchangeInfo.confmRejectStatus;
            	}else if(type == "transfer"){
            		applyStatus = "4";
            		confirmTxt = "선택한 학생을 교류대학으로 이관 하시겠습니까?";
            	}else{
            		return;
            	}
            	console.log(applyStatus);
            	if(applyStatus*1 == 3 || applyStatus*1 == 6){
            		ngDialog.open({
                        template: Const.contextPath + 'html/exchange/applyExchangeRejectReason.html',
                        showClose: false,
                        closeByDocument: false,
                        width: 740,
                        controller: function($rootScope, $scope, exchangeConfirmOutService, subjectService, commonService, $cookies, Const) {
                        	$scope.exchangeInfo = exchangeInfo;
                        	$scope.rejectReason = exchangeInfo.rejectReason;
                        	$scope.saveRejectReason = function() {
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
                						applyStatus		: applyStatus,
                						rejectReason	: $scope.rejectReason,
                    			};
                    			
                				exchangeConfirmOutService.changeApplyStatus(param, function(data) {
                					if(data.resultCode == "0"){
                						$rootScope.exchange.confirmOut.scope.search(true);
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
            		withoutRejectReason = false;
            	}
            	if(withoutRejectReason){
            		commonService.confirm(confirmTxt, function() {
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
        						applyStatus		: applyStatus,
            			};
            			
        				exchangeConfirmOutService.changeApplyStatus(param, function(data) {
        					if(data.resultCode == "0"){
        						$scope.search(true);
        					}else{
        						commonService.serverError(data);
        					}
        				});
            		});
            	}
            };
            
            /**
             * 학점교류신청 목록 전체 체크박스 컨트롤
             */
            $scope.checkAllUserList = function(){
        		$.each($rootScope.exchange.confirmOut.applyExchangeUserList, function(i){
        			$rootScope.exchange.confirmOut.applyExchangeUserList[i].isChecked = $rootScope.exchange.confirmOut.isCheckedAll;
            	});
            };
            $scope.checkUserList = function(){
            	var isCheckedAll = true;
            	$.each($rootScope.exchange.confirmOut.applyExchangeUserList, function(i){
            		if(!$rootScope.exchange.confirmOut.applyExchangeUserList[i].isChecked){
            			isCheckedAll = false;
            		}
            	});
            	$rootScope.exchange.confirmOut.isCheckedAll = isCheckedAll;
            };
            
            $scope.getCheckedApplyExchageSeqList = function(applyStatus){
            	var applyExchangeSeqList = [];
    			$.each($rootScope.exchange.confirmOut.applyExchangeUserList, function(i){
            		if($rootScope.exchange.confirmOut.applyExchangeUserList[i].isChecked && $rootScope.exchange.confirmOut.applyExchangeUserList[i].applyStatus*1 == applyStatus){
            			applyExchangeSeqList.push($rootScope.exchange.confirmOut.applyExchangeUserList[i].applyExchangeSeq);
            		}
            	});
    			return applyExchangeSeqList.length>0?applyExchangeSeqList.join(","):null;
            };
            
            /**
             * 선택 승인
             */
    		$scope.acceptApplyExchange = function(){
    			commonService.confirm("선택한 학생을 승인하시겠습니까?", function() {
        			var	param = {
    						applyExchangeSeqList: $scope.getCheckedApplyExchageSeqList(1),
    						applyStatus		: 2,
        			};
        			
    				exchangeConfirmOutService.changeApplyStatus(param, function(data) {
    					if(data.resultCode == "0"){
    						$scope.search(true);
    					}else{
    						commonService.serverError(data);
    					}
    				});
        		});
    		};
    		
    		/**
    		 * 선택 반려
    		 */
            $scope.rejectApplyExchange = function(){
            	ngDialog.open({
                    template: Const.contextPath + 'html/exchange/applyExchangeRejectReason.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 740,
                    controller: function($rootScope, $scope, exchangeConfirmOutService, subjectService, commonService, $cookies, Const) {
                    	$scope.exchangeInfo = null;
                    	$scope.rejectReason = null;
                    	$scope.saveRejectReason = function() {
                    		var	param = {
                    				applyExchangeSeqList: $rootScope.exchange.confirmOut.scope.getCheckedApplyExchageSeqList(1),
            						applyStatus		: 3,
            						rejectReason	: $scope.rejectReason,
                			};
                			
            				exchangeConfirmOutService.changeApplyStatus(param, function(data) {
            					if(data.resultCode == "0"){
            						$rootScope.exchange.confirmOut.scope.search(true);
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
    		
    		/**
	         * 선택 이관
	         */
            $scope.transferApplyExchange = function(){
            	commonService.confirm("선택한 학생을 교류대학으로 이관 하시겠습니까?", function() {
        			var	param = {
    						applyExchangeSeqList: $scope.getCheckedApplyExchageSeqList(2),
    						applyStatus		: 4,
        			};
        			
    				exchangeConfirmOutService.changeApplyStatus(param, function(data) {
    					if(data.resultCode == "0"){
    						$scope.search(true);
    					}else{
    						commonService.serverError(data);
    					}
    				});
        		});
    		};
        });
})());