((function() {
    angular.module('appModule')
        .controller('applyCancelOutCtrl', function($scope, $rootScope, applyCancelOutService, commonService, Const, ngDialog) {
        	$rootScope.exchange.cancelOut.scope = $scope;
			
        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					$.each($rootScope.exchange.cancelOut.viewPage, function(j){
						$("[ng-model='$root.exchange.cancelOut.viewPage["+j+"].searchUnivArea']").attr("disabled", true);
						$("[ng-model='$root.exchange.cancelOut.viewPage["+j+"].searchUniv']").attr("disabled", true);
					});
				}
			};
			$scope.diabledSelectUniv();
        	
        	$scope.changeTab = function(tabIdx){
        		$rootScope.exchange.cancelOut.nowMgmtTab = tabIdx*1;
            	
            	if($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchYn != "Y"){
            		$scope.search(true);
            	}
            };
        	
			/**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, nowMgmtTab, callBack){
        		$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab][childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.exchange.cancelOut.viewPage[nowMgmtTab][parentModel])) return;
        			commonService.getCodeList($rootScope.exchange.cancelOut.viewPage[nowMgmtTab][parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
                			$rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel+"List"] = [];
            				$rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			$rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel] = $rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel+"List"][0].code;
                			if(isNull(defaultValue)){
                				$rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel] = $rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel+"List"][0].code;
                			}else{
                				$rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.exchange.cancelOut.viewPage[nowMgmtTab].exchangeInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.exchange.cancelOut.viewPage[nowMgmtTab].exchangeInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
        					$rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel+"List"] = [];
        					$rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	            				$rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			if(isNull(defaultValue)){
	            				$rootScope.exchange.cancelOut.viewPage[nowMgmtTab].exchangeInfo[childModel] = $rootScope.exchange.cancelOut.viewPage[nowMgmtTab][childModel+"List"][0].code;
	            			}else{
                				$rootScope.exchange.cancelOut.viewPage[nowMgmtTab].exchangeInfo[childModel] = defaultValue;
                			}
	            		}
        			});
        		}
        	};
			

            //기본 셀렉트 박스 데이터 조회 start
        	//년도 세팅
        	$.each($rootScope.exchange.cancelOut.viewPage, function(j){
        		
        		if($rootScope.exchange.cancelOut.viewPage[j].searchYearList.length == 1){
        			$rootScope.exchange.cancelOut.viewPage[j].searchYearList = [{code : "", codeName : "전체"}];
        			$rootScope.exchange.cancelOut.viewPage[j].yearList = [{code : "", codeName : "년도 선택"}];
        			var nowDate = new Date();
        			var curYear = nowDate.getFullYear()+2;
        			for(var i = curYear; i >= nowDate.getFullYear(); i--) {
        				$rootScope.exchange.cancelOut.viewPage[j].searchYearList.push({code:i, codeName:i});
        				$rootScope.exchange.cancelOut.viewPage[j].yearList.push({code:i, codeName:i});
        			}
        			$rootScope.exchange.cancelOut.viewPage[j].searchYear = nowDate.getFullYear()+"";
        		}
        		
        		//학교 지역 목록
        		if($rootScope.exchange.cancelOut.viewPage[j].searchUnivAreaList.length == 1){
        			commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
        					$rootScope.exchange.cancelOut.viewPage[j].searchUnivAreaList = [];
        					$rootScope.exchange.cancelOut.viewPage[j].searchUnivAreaList.push({code:"", codeName:"지역 전체"});
        					$rootScope.exchange.cancelOut.viewPage[j].univAreaCodeList = [];
        					$rootScope.exchange.cancelOut.viewPage[j].univAreaCodeList.push({code:"", codeName:"지역 선택"});
        					$.each(data.codeList, function(i, codeInfo){
        						$rootScope.exchange.cancelOut.viewPage[j].searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
        						$rootScope.exchange.cancelOut.viewPage[j].univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
        					});
        					
        					//사용자 권한에 따른 학교구분 검색조건 세팅
        					if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        							$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
        					){
        						$rootScope.exchange.cancelOut.viewPage[j].searchUnivArea = $rootScope.userSession.univAreaCd;
        						$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.cancelOut.viewPage[j].searchUnivArea, j, function(data){
        							$rootScope.exchange.cancelOut.viewPage[j].searchUniv = $rootScope.userSession.univCode;
        							$("[ng-model='$root.exchange.cancelOut.viewPage["+j+"].searchUnivArea']").attr("disabled", true);
        							$("[ng-model='$root.exchange.cancelOut.viewPage["+j+"].searchUniv']").attr("disabled", true);
        							$rootScope.exchange.cancelOut.viewPage[j].isUnivComplete = true;
        							$scope.initSearch();
        						});
        						
        					}else{
        						console.log("J : ", j);
        						$rootScope.exchange.cancelOut.viewPage[j].searchUnivArea = $rootScope.exchange.cancelOut.viewPage[j].searchUnivAreaList[1].code;
        						$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.cancelOut.viewPage[j].searchUnivArea, j, function(data){
        							$rootScope.exchange.cancelOut.viewPage[j].searchUniv = $rootScope.exchange.cancelOut.viewPage[j].searchUnivList[1].code;
        							$rootScope.exchange.cancelOut.viewPage[j].isUnivComplete = true;
        							$scope.initSearch();
        						});
        					}
        				}
        			});
        		};
        		
        		//학기 분류 목록 조회
        		if($rootScope.exchange.cancelOut.viewPage[j].searchSemesterCodeList.length == 1){
        			commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
        					$rootScope.exchange.cancelOut.viewPage[j].searchSemesterCodeList = [];
        					$rootScope.exchange.cancelOut.viewPage[j].searchSemesterCodeList.push({code:"", codeName:"전체"});
        					$.each(data.codeList, function(i, codeInfo){
        						$rootScope.exchange.cancelOut.viewPage[j].searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
        					});
        					$rootScope.exchange.cancelOut.viewPage[j].searchSemesterCode = $rootScope.exchange.cancelOut.viewPage[j].searchSemesterCodeList[1].code;
        					console.log($rootScope.exchange.cancelOut.viewPage[j].searchSemesterCode);
        					$rootScope.exchange.cancelOut.viewPage[j].isSemesterComplete = true;
        					$scope.initSearch();
        				}
        			});
        		};
        		
        		//학년 목록 조회
        		if($rootScope.exchange.cancelOut.viewPage[j].subjectGradeList.length == 0){
        			commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
        					$rootScope.exchange.cancelOut.viewPage[j].subjectGradeList = [];
        					$rootScope.exchange.cancelOut.viewPage[j].searchStudentGradeCodeList = [];
        					$.each(data.codeList, function(i, codeInfo){
        						$rootScope.exchange.cancelOut.viewPage[j].subjectGradeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
        						$rootScope.exchange.cancelOut.viewPage[j].searchStudentGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
        					});
        				}
        			});
        		};
        		
        	});
            
        	//기본 셀렉트 박스 데이터 조회 end
        	
        	$scope.resetSearchFiled = function(){
    			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUnivArea		= null;
    			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUniv			= null;
    			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchYear			= null;
    			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchSemesterCode  = null;
    			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchStudentGradeCode = null;
    			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUserUnivArea = null;
    			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchMessageConfirm = null;
    			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchApplyStatus = null;
    			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchType = null;
    			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchKey = null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUnivArea, $rootScope.exchange.cancelOut.nowMgmtTab, function(data){
        				$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUniv = $rootScope.userSession.univCode;
        				$scope.diabledSelectUniv();
    					$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].isUnivComplete = true;
        			});
        			
        		}else{
        			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUnivArea = $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUnivAreaList[1].code;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUnivArea, $rootScope.exchange.cancelOut.nowMgmtTab, function(data){
    					$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUniv = $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUnivList[1].code;
    					$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].isUnivComplete = true;
        			});
        		}
        		
        		
        		//년도 초기화
        		var nowDate = new Date();
	        	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchYear = nowDate.getFullYear()+"";
	        	
	        	//학기 초기화
	        	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchSemesterCode = $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchSemesterCodeList[1].code;
        	};
        	
        	/**
             * 검색영역 validate check
             */
            $scope.checkValidateSearch = function(){
			    if(isNull($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchYear)){
					commonService.alert("검색영역에서 년도를 선택해주세요.");
					return false
				}
				
				if(isNull($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchSemesterCode)){
					commonService.alert("검색영역에서 학기를 입력해주세요.");
					return false;
				}
				
				if(isNull($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUniv)){
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
    	        	searchUnivArea			:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUniv,
    	        	searchYear				:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchSemesterCode,
    	        	searchStudentGradeCode	:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchStudentGradeCode,
    	        	searchMessageConfirm	:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchMessageConfirm,
    	        	searchApplyStatus		:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchApplyStatus,
    	        	searchKey				:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchKey,
    	        	searchType				:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchType,
    	        	searchPage				:   "cancelOut"+$rootScope.exchange.cancelOut.nowMgmtTab,
    	        	sort					:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].sort,
    	        	order					:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["applyExchangeUserOutListPaging"])? 1 : pagingGlobalVar["applyExchangeUserOutListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].maxRowCnt,
        		};
        		applyCancelOutService.getApplyExchangeUserList(param, function(data){
        			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchYn = "Y";
					$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList = data.applyExchangeUserList;
					if(data.applyExchangeUserList.length > 0){
						var totCnt = data.applyExchangeUserList[0].totalCnt*1;
						var nowPage = $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].nowPage*1;
						var maxRowCnt = $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].maxRowCnt*1;
						$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].nowPage = nowPage;
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
						$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 로드시 학기 목록을 조회하기 위함.
    		//페이지 로드시 수강결과 등록 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].isUnivComplete && $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].isSemesterComplete) {
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
        		
        		$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].sort = sort;
        		$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].order = order;
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
                    controller: function($rootScope, $scope, applyCancelOutService, subjectService, commonService, $cookies, Const) {
                    	$scope.exchangeInfo = $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList[idx];
                    	$scope.searchPage = "cancelOut";
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
        		if($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    				searchUnivArea			:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchUniv,
    	        	searchYear				:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchSemesterCode,
    	        	searchStudentGradeCode	:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchStudentGradeCode,
    	        	searchMessageConfirm	:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchMessageConfirm,
    	        	searchApplyStatus		:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchApplyStatus,
    	        	searchKey				:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchKey,
    	        	searchType				:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].searchType,
    	        	searchPage				:	"cancelOut"+$rootScope.exchange.cancelOut.nowMgmtTab,
    	        	sort					:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].sort,
    	        	order					:	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].order,
    	        	isPaging				: 	'N',
        		};
        		
        		$("<input></input>").attr({type:"hidden", name:"searchUnivArea",		value:param.searchUnivArea			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUniv",			value:param.searchUniv				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchYear",			value:param.searchYear				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchSemesterCode",	value:param.searchSemesterCode		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchStudentGradeCode",value:param.searchStudentGradeCode	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchMessageConfirm",	value:param.searchMessageConfirm	}).appendTo($("#excelForm"));
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
            	var exchangeInfo = $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList[idx];
            	var applyStatus = null;
            	var withoutRejectReason = true;
            	var confirmTxt = "선택한 학생을 승인하시겠습니까?";
            	if(type == "confirm"){
            		applyCancelStatus = exchangeInfo.cancelConfmRejectStatus;
            	}else if(type == "transfer"){
            		applyCancelStatus = "4";
            		confirmTxt = "선택한 학생을 교류대학으로 이관 하시겠습니까?";
            	}else{
            		return;
            	}
            	if(applyCancelStatus*1 == 3){
            		ngDialog.open({
                        template: Const.contextPath + 'html/exchange/applyExchangeRejectReason.html',
                        showClose: false,
                        closeByDocument: false,
                        width: 740,
                        controller: function($rootScope, $scope, applyCancelOutService, subjectService, commonService, $cookies, Const) {
                        	$scope.exchangeInfo = exchangeInfo;
                        	$scope.rejectReason = exchangeInfo.cancelRejectReason;
                        	$scope.saveRejectReason = function() {
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
                						cancelRejectReason	: $scope.rejectReason,
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
            		withoutRejectReason = false;
            	}else if(applyCancelStatus*1 == 4){
            		commonService.confirm(confirmTxt, function() {
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
            		});
            		withoutRejectReason = false;
            	}
            	if(withoutRejectReason){
            		commonService.confirm(confirmTxt, function() {
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
            			};
            			
        				applyCancelOutService.changeApplyStatus(param, function(data) {
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
            	console.log($rootScope.exchange.cancelOut.nowMgmtTab);
            	console.log($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].isCheckedAll);
        		$.each($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList, function(i){
        			console.log($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList[i].isChecked);
        			$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList[i].isChecked = $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].isCheckedAll;
            	});
            };
            $scope.checkUserList = function(){
            	var isCheckedAll = true;
            	$.each($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList, function(i){
            		if(!$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList[i].isChecked){
            			isCheckedAll = false;
            		}
            	});
            	$rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].isCheckedAll = isCheckedAll;
            };
            
            $scope.getCheckedApplyExchageSeqList = function(applyStatus){
            	var applyExchangeSeqList = [];
    			$.each($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList, function(i){
            		if($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList[i].isChecked && $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList[i].applyCancelStatus*1 == applyStatus){
            			applyExchangeSeqList.push($rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList[i].applyExchangeSeq);
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
    						applyCancelStatus		: 2,
        			};
        			
    				applyCancelOutService.changeApplyStatus(param, function(data) {
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
                    controller: function($rootScope, $scope, applyCancelOutService, subjectService, commonService, $cookies, Const) {
                    	$scope.exchangeInfo = null;
                    	$scope.rejectReason = null;
                    	$scope.saveRejectReason = function() {
                    		var	param = {
                    				applyExchangeSeqList: $rootScope.exchange.cancelOut.scope.getCheckedApplyExchageSeqList(1),
            						applyCancelStatus		: 3,
            						cancelRejectReason	: $scope.rejectReason,
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
    		
    		/**
	         * 선택 이관
	         */
            $scope.transferApplyExchange = function(){
            	var applyExchangeSeqList = $scope.getCheckedApplyExchageSeqList(2);
            	commonService.confirm("선택한 학생을 교류대학으로 이관 하시겠습니까?", function() {
    				ngDialog.open({
                        template: Const.contextPath + 'html/exchange/applyExchangeCancelMessage.html',
                        showClose: false,
                        closeByDocument: false,
                        width: 740,
                        controller: function($rootScope, $scope, applyCancelOutService, subjectService, commonService, $cookies, Const) {
                        	$scope.sendMessage = null;
                        	$scope.saveSendMessage = function() {
                        		var	param = {
                						applyExchangeSeqList: applyExchangeSeqList,
                						applyCancelStatus	: 4,
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
        		});
    		};
    		
    		/**
    		 * 담당자 전달 메시지 view
    		 */
    		$scope.viewSendMessage = function(idx){
    			var exchangeInfo = $rootScope.exchange.cancelOut.viewPage[$rootScope.exchange.cancelOut.nowMgmtTab].applyExchangeUserList[idx];
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