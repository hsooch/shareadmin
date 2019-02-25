((function() {
    angular.module('appModule')
        .controller('exchangeConfirmInCtrl', function($scope, $rootScope, exchangeConfirmInService, commonService, Const, ngDialog) {
        	$rootScope.exchange.confirmIn.scope = $scope;
        	
        	$scope.diabledSelectUniv = function(){
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
            			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                    ){
            		
        			$("[ng-model='$root.exchange.confirmIn.searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.exchange.confirmIn.searchUniv']").attr("disabled", true);
        		}
        	};
        	$scope.diabledSelectUniv();
        	
			/**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.exchange.confirmIn[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv" || childModel == "searchUserUniv"){
        			if(isNull($rootScope.exchange.confirmIn[parentModel])) return;
        			commonService.getCodeList($rootScope.exchange.confirmIn[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.exchange.confirmIn[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.exchange.confirmIn[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			$rootScope.exchange.confirmIn[childModel] = $rootScope.exchange.confirmIn[childModel+"List"][0].code;
                			if(isNull(defaultValue)){
                				$rootScope.exchange.confirmIn[childModel] = $rootScope.exchange.confirmIn[childModel+"List"][0].code;
                			}else{
                				$rootScope.exchange.confirmIn[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.exchange.confirmIn.exchangeInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.exchange.confirmIn.exchangeInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.exchange.confirmIn[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.exchange.confirmIn[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			if(isNull(defaultValue)){
	            				$rootScope.exchange.confirmIn.exchangeInfo[childModel] = $rootScope.exchange.confirmIn[childModel+"List"][0].code;
	            			}else{
                				$rootScope.exchange.confirmIn.exchangeInfo[childModel] = defaultValue;
                			}
	            		}
        			});
        		}
        	};
			

            //기본 셀렉트 박스 데이터 조회 start
        	//년도 세팅
        	if($rootScope.exchange.confirmIn.searchYearList.length == 1){
        		$rootScope.exchange.confirmIn.searchYearList = [{code : "", codeName : "전체"}];
        		$rootScope.exchange.confirmIn.yearList = [{code : "", codeName : "년도 선택"}];
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()+2;
	        	for(var i = curYear; i >= nowDate.getFullYear(); i--) {
	    	 	   	$rootScope.exchange.confirmIn.searchYearList.push({code:i, codeName:i});
	    	 	   	$rootScope.exchange.confirmIn.yearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.exchange.confirmIn.searchYear = nowDate.getFullYear()+"";
        	}
        	
        	//학교 지역 목록
        	if($rootScope.exchange.confirmIn.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.confirmIn.searchUnivAreaList = [];
            			$rootScope.exchange.confirmIn.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.exchange.confirmIn.searchUserUnivAreaList = [];
            			$rootScope.exchange.confirmIn.searchUserUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.exchange.confirmIn.univAreaCodeList = [];
            			$rootScope.exchange.confirmIn.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.confirmIn.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.exchange.confirmIn.searchUserUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.exchange.confirmIn.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			
            			//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                        ){
                			$rootScope.exchange.confirmIn.searchUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.confirmIn.searchUnivArea, function(data){
                				$rootScope.exchange.confirmIn.searchUniv = $rootScope.userSession.univCode;
            					$rootScope.exchange.confirmIn.isUnivComplete = true;
            					$scope.diabledSelectUniv();
            					$scope.initSearch();
                			});
                			
                		}else{
                			$rootScope.exchange.confirmIn.searchUnivArea = $rootScope.exchange.confirmIn.searchUnivAreaList[1].code;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.confirmIn.searchUnivArea, function(data){
            					$rootScope.exchange.confirmIn.searchUniv = $rootScope.exchange.confirmIn.searchUnivList[1].code;
            					$rootScope.exchange.confirmIn.isUnivComplete = true;
            					$scope.initSearch();
                			});
                		}
            		}
            	});
            };
            
            //학기 분류 목록 조회
        	if($rootScope.exchange.confirmIn.searchSemesterCodeList.length == 1){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.confirmIn.searchSemesterCodeList = [];
            			$rootScope.exchange.confirmIn.searchSemesterCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.confirmIn.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			$rootScope.exchange.confirmIn.searchSemesterCode = $rootScope.exchange.confirmIn.searchSemesterCodeList[1].code;
            			console.log($rootScope.exchange.confirmIn.searchSemesterCode);
            			$rootScope.exchange.confirmIn.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //학년 목록 조회
        	if($rootScope.exchange.confirmIn.subjectGradeList.length == 0){
            	commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.confirmIn.subjectGradeList = [];
            			$rootScope.exchange.confirmIn.searchStudentGradeCodeList = [];
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.confirmIn.subjectGradeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.exchange.confirmIn.searchStudentGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
            
        	//기본 셀렉트 박스 데이터 조회 end
        	
        	$scope.resetSearchFiled = function(){
        		$rootScope.exchange.confirmIn.searchUnivArea		= null;
    			$rootScope.exchange.confirmIn.searchUniv			= null;
    			$rootScope.exchange.confirmIn.searchYear			= null;
    			$rootScope.exchange.confirmIn.searchSemesterCode  = null;
    			$rootScope.exchange.confirmIn.searchStudentGradeCode = null;
    			$rootScope.exchange.confirmIn.searchUserUnivArea = null;
    			$rootScope.exchange.confirmIn.searchUserUniv = null;
    			$rootScope.exchange.confirmIn.searchUserUnivList = [{code : "", codeName : "대학교 전체"}];
    			$rootScope.exchange.confirmIn.searchType = null;
    			$rootScope.exchange.confirmIn.searchKey = null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.exchange.confirmIn.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.confirmIn.searchUnivArea, function(data){
        				$rootScope.exchange.confirmIn.searchUniv = $rootScope.userSession.univCode;
        				$scope.diabledSelectUniv();
    					$rootScope.exchange.confirmIn.isUnivComplete = true;
        			});
        			
        		}else{
        			$rootScope.exchange.confirmIn.searchUnivArea = $rootScope.exchange.confirmIn.searchUnivAreaList[1].code;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.confirmIn.searchUnivArea, function(data){
    					$rootScope.exchange.confirmIn.searchUniv = $rootScope.exchange.confirmIn.searchUnivList[1].code;
    					$rootScope.exchange.confirmIn.isUnivComplete = true;
        			});
        		}
        		
        		
        		//년도 초기화
        		var nowDate = new Date();
	        	$rootScope.exchange.confirmIn.searchYear = nowDate.getFullYear()+"";
	        	
	        	//학기 초기화
	        	$rootScope.exchange.confirmIn.searchSemesterCode = $rootScope.exchange.confirmIn.searchSemesterCodeList[1].code;
        	};
        	
        	/**
             * 검색영역 validate check
             */
            $scope.checkValidateSearch = function(){
			    if(isNull($rootScope.exchange.confirmIn.searchYear)){
					commonService.alert("검색영역에서 년도를 선택해주세요.");
					return false
				}
				
				if(isNull($rootScope.exchange.confirmIn.searchSemesterCode)){
					commonService.alert("검색영역에서 학기를 입력해주세요.");
					return false;
				}
				
				if(isNull($rootScope.exchange.confirmIn.searchUniv)){
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
    	        	searchUnivArea			:	$rootScope.exchange.confirmIn.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.confirmIn.searchUniv,
    	        	searchYear				:	$rootScope.exchange.confirmIn.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.confirmIn.searchSemesterCode,
    	        	searchStudentGradeCode	:	$rootScope.exchange.confirmIn.searchStudentGradeCode,
    	        	searchApplyStatus		:	$rootScope.exchange.confirmIn.searchApplyStatus,
    	        	searchUserUnivArea		:	$rootScope.exchange.confirmIn.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.confirmIn.searchUserUniv,
    	        	searchKey				:	$rootScope.exchange.confirmIn.searchKey,
    	        	searchType				:	$rootScope.exchange.confirmIn.searchType,
    	        	searchPage				:	"confirmIn",
    	        	sort					:	$rootScope.exchange.confirmIn.sort,
    	        	order					:	$rootScope.exchange.confirmIn.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["applyExchangeUserInListPaging"])? 1 : pagingGlobalVar["applyExchangeUserInListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.exchange.confirmIn.maxRowCnt,
        		};
        		exchangeConfirmInService.getApplyExchangeUserList(param, function(data){
        			$rootScope.exchange.confirmIn.searchYn = "Y";
					$rootScope.exchange.confirmIn.applyExchangeUserList = data.applyExchangeUserList;
					if(data.applyExchangeUserList.length > 0){
						var totCnt = data.applyExchangeUserList[0].totalCnt*1;
						var nowPage = $rootScope.exchange.confirmIn.nowPage*1;
						var maxRowCnt = $rootScope.exchange.confirmIn.maxRowCnt*1;
						$rootScope.exchange.confirmIn.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.exchange.confirmIn.nowPage = nowPage;
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
						$rootScope.exchange.confirmIn.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 로드시 학기 목록을 조회하기 위함.
    		//페이지 로드시 수강결과 등록 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.exchange.confirmIn.isUnivComplete && $rootScope.exchange.confirmIn.isSemesterComplete) {
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
        		
        		$rootScope.exchange.confirmIn.sort = sort;
        		$rootScope.exchange.confirmIn.order = order;
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
                    controller: function($rootScope, $scope, exchangeConfirmInService, subjectService, commonService, $cookies, Const) {
                    	$scope.exchangeInfo = $rootScope.exchange.confirmIn.applyExchangeUserList[idx];
                    	$scope.searchPage = "confirmIn";
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
        		if($rootScope.exchange.confirmIn.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    				searchUnivArea			:	$rootScope.exchange.confirmIn.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.confirmIn.searchUniv,
    	        	searchYear				:	$rootScope.exchange.confirmIn.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.confirmIn.searchSemesterCode,
    	        	searchStudentGradeCode	:	$rootScope.exchange.confirmIn.searchStudentGradeCode,
    	        	searchApplyStatus		:	$rootScope.exchange.confirmIn.searchApplyStatus,
    	        	searchUserUnivArea		:	$rootScope.exchange.confirmIn.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.confirmIn.searchUserUniv,
    	        	searchKey				:	$rootScope.exchange.confirmIn.searchKey,
    	        	searchType				:	$rootScope.exchange.confirmIn.searchType,
    	        	searchPage				:	"confirmIn",
    	        	sort					:	$rootScope.exchange.confirmIn.sort,
    	        	order					:	$rootScope.exchange.confirmIn.order,
    	        	isPaging				: 	'N',
        		};
        		
        		$("<input></input>").attr({type:"hidden", name:"searchUnivArea",		value:param.searchUnivArea			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUniv",			value:param.searchUniv				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchYear",			value:param.searchYear				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchSemesterCode",	value:param.searchSemesterCode		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchStudentGradeCode",value:param.searchStudentGradeCode	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchApplyStatus",		value:param.searchApplyStatus		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUserUnivArea",	value:param.searchUserUnivArea			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUserUniv",		value:param.searchUserUniv				}).appendTo($("#excelForm"));
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
            	var exchangeInfo = $rootScope.exchange.confirmIn.applyExchangeUserList[idx];
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
            	
            	if(applyStatus*1 == 3 || applyStatus*1 == 6){
            		ngDialog.open({
                        template: Const.contextPath + 'html/exchange/applyExchangeRejectReason.html',
                        showClose: false,
                        closeByDocument: false,
                        width: 740,
                        controller: function($rootScope, $scope, exchangeConfirmInService, subjectService, commonService, $cookies, Const) {
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
                    			
                				exchangeConfirmInService.changeApplyStatus(param, function(data) {
                					if(data.resultCode == "0"){
                						$rootScope.exchange.confirmIn.scope.search(true);
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
            			
        				exchangeConfirmInService.changeApplyStatus(param, function(data) {
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
        		$.each($rootScope.exchange.confirmIn.applyExchangeUserList, function(i){
        			$rootScope.exchange.confirmIn.applyExchangeUserList[i].isChecked = $rootScope.exchange.confirmIn.isCheckedAll;
            	});
            };
            $scope.checkUserList = function(){
            	var isCheckedAll = true;
            	$.each($rootScope.exchange.confirmIn.applyExchangeUserList, function(i){
            		if(!$rootScope.exchange.confirmIn.applyExchangeUserList[i].isChecked){
            			isCheckedAll = false;
            		}
            	});
            	$rootScope.exchange.confirmIn.isCheckedAll = isCheckedAll;
            	console.log(isCheckedAll);
            };
            
            $scope.getCheckedApplyExchageSeqList = function(applyStatus){
            	var applyExchangeSeqList = [];
    			$.each($rootScope.exchange.confirmIn.applyExchangeUserList, function(i){
            		if($rootScope.exchange.confirmIn.applyExchangeUserList[i].isChecked && $rootScope.exchange.confirmIn.applyExchangeUserList[i].applyStatus*1 == applyStatus){
            			applyExchangeSeqList.push($rootScope.exchange.confirmIn.applyExchangeUserList[i].applyExchangeSeq);
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
    						applyExchangeSeqList: $scope.getCheckedApplyExchageSeqList(4),
    						applyStatus		: 5,
        			};
        			
    				exchangeConfirmInService.changeApplyStatus(param, function(data) {
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
                    controller: function($rootScope, $scope, exchangeConfirmInService, subjectService, commonService, $cookies, Const) {
                    	$scope.exchangeInfo = null;
                    	$scope.rejectReason = null;
                    	$scope.saveRejectReason = function() {
                    		var	param = {
                    				applyExchangeSeqList: $rootScope.exchange.confirmIn.scope.getCheckedApplyExchageSeqList(4),
            						applyStatus		: 6,
            						rejectReason	: $scope.rejectReason,
                			};
                			
            				exchangeConfirmInService.changeApplyStatus(param, function(data) {
            					if(data.resultCode == "0"){
            						$rootScope.exchange.confirmIn.scope.search(true);
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
	         * 학번 발급.
	         */
            $scope.changeStudentNumber = function(idx, type){
            	var mInStNum = $rootScope.exchange.confirmIn.applyExchangeUserList[idx].newMInStNum;
            	if(isNull(mInStNum)){
            		commonService.alert("학번을 입력해주세요.", function(){
            			$("#newMInStNum_"+idx).focus();
            		});
            		return;
            	}
            	
    			var	param = {
    					applyExchangeSeq: $rootScope.exchange.confirmIn.applyExchangeUserList[idx].applyExchangeSeq,
    					mInStNum		: mInStNum,
        			};
    			
				exchangeConfirmInService.changeApplyStatus(param, function(data) {
					if(data.resultCode == "0"){
						$scope.search(true);
					}else{
						commonService.serverError(data);
					}
				});
    		};
        });
})());