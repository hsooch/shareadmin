((function() {
    angular.module('appModule')
        .controller('exchangeResultOutCtrl', function($scope, $rootScope, exchangeResultService, commonService, Const, ngDialog, FileUploader) {
        	$rootScope.exchange.resultOut.scope = $scope;
    		
        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.exchange.resultOut.searchUserUnivArea']").attr("disabled", true);
    				$("[ng-model='$root.exchange.resultOut.searchUserUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
        	
            /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.exchange.resultOut[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv" || childModel == "searchUserUniv"){
        			if(isNull($rootScope.exchange.resultOut[parentModel])) {
        				$rootScope.exchange.resultOut[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				$rootScope.exchange.resultOut[childModel] = "";
        				return;
        			}
        			commonService.getCodeList($rootScope.exchange.resultOut[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.exchange.resultOut[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.exchange.resultOut[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)){
                				$rootScope.exchange.resultOut[childModel] = $rootScope.exchange.resultOut[childModel+"List"][0].code;
                			}else{
                				$rootScope.exchange.resultOut[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        	};

            //기본 셀렉트 박스 데이터 조회 start
        	//년도 세팅
        	if($rootScope.exchange.resultOut.searchYearList.length == 0){
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()-2;
	        	for(var i = nowDate.getFullYear(); i >= curYear; i--) {
	    	 	   	$rootScope.exchange.resultOut.searchYearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.exchange.resultOut.searchYear = nowDate.getFullYear()+"";
        	}
            
            //학기 분류 목록 조회
        	if($rootScope.exchange.resultOut.searchSemesterCodeList.length == 0){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.resultOut.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
        				$rootScope.exchange.resultOut.searchSemesterCode = $rootScope.exchange.resultOut.searchSemesterCodeList[0].code;
        				$rootScope.exchange.resultOut.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //학년 분류 목록 조회
        	if($rootScope.exchange.resultOut.searchStudentGradeCodeList.length == 0){
            	commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.resultOut.searchStudentGradeCodeList = [];
            			$rootScope.exchange.resultOut.searchStudentGradeCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.resultOut.searchStudentGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
        	
        	//학교 지역 목록
        	if($rootScope.exchange.resultOut.searchUserUnivAreaList.length == 0){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.resultOut.searchUnivAreaList = [];
            			$rootScope.exchange.resultOut.searchUnivAreaList.push({code:"", codeName:"지역 전체"});

            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.resultOut.searchUserUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				
            				$rootScope.exchange.resultOut.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
                    	
                    	//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
                			$rootScope.exchange.resultOut.searchUserUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", $rootScope.userSession.univCode, function(){
                				$rootScope.exchange.resultOut.searchUserUniv = $rootScope.userSession.univCode;
                				
                				$scope.diabledSelectUniv();

                				$rootScope.exchange.resultOut.isUnivComplete = true;
	        					$scope.initSearch();
                			});
                		} else {
	            			$rootScope.exchange.resultOut.searchUserUnivArea = $rootScope.exchange.resultOut.searchUserUnivAreaList[0].code;
	            			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", null, function(data){
	        					$rootScope.exchange.resultOut.searchUserUniv = $rootScope.exchange.resultOut.searchUserUnivList[1].code;
	        					$rootScope.exchange.resultOut.isUnivComplete = true;
	        					$scope.initSearch();
	            			});
                		}
            		}
            	});
            };
        	//기본 셀렉트 박스 데이터 조회 end
            	
            // 검색 조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.exchange.resultOut.searchStudentGradeCode	= "";
    			$rootScope.exchange.resultOut.searchYear				= $rootScope.exchange.resultOut.searchYearList[0].code+"";
    			$rootScope.exchange.resultOut.searchSemesterCode		= $rootScope.exchange.resultOut.searchSemesterCodeList[0].code;
    			$rootScope.exchange.resultOut.searchType				= "";
    			$rootScope.exchange.resultOut.searchKey					= "";
    			$rootScope.exchange.resultOut.searchUnivArea 		= null;
    			$rootScope.exchange.resultOut.searchUniv 			= null;
    			$rootScope.exchange.resultOut.searchUnivList 		= [{code : "", codeName : "대학교 전체"}];
        		
        		
        		//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        			$rootScope.exchange.resultOut.searchUserUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", $rootScope.userSession.univCode, function(){
        				$rootScope.exchange.resultOut.searchUserUniv = $rootScope.userSession.univCode;
        				
        				$scope.diabledSelectUniv();

        				$rootScope.exchange.resultOut.isUnivComplete = true;
        			});
        		} else {
        			$rootScope.exchange.resultOut.searchUserUnivArea = $rootScope.exchange.resultOut.searchUserUnivAreaList[1].code;
        			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", $rootScope.exchange.resultOut.searchUserUnivArea, function(data){
    					$rootScope.exchange.resultOut.searchUserUniv = $rootScope.exchange.resultOut.searchUserUnivList[1].code;
    					$rootScope.exchange.resultOut.isUnivComplete = true;
        			});
        		}
        	};
        	
        	/**
        	 * 수강결과 조회(OUT) 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(redrawPage){
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.resultOut.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.resultOut.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.resultOut.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.resultOut.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.resultOut.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.resultOut.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.resultOut.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.resultOut.searchType,
    	        	searchKey				:	$rootScope.exchange.resultOut.searchKey,
    	        	sort					:	$rootScope.exchange.resultOut.sort,
    	        	order					:	$rootScope.exchange.resultOut.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["exchangeResultListPaging"]) || redrawPage ? 1 : pagingGlobalVar["exchangeResultListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.exchange.resultOut.maxRowCnt,
        		};
        		
        		exchangeResultService.getExchangeResultList(param, function(data){
        			$rootScope.exchange.resultOut.searchYn = "Y";
					$rootScope.exchange.resultOut.exchangeResultList = data.exchangeResultList;
					if(data.exchangeResultList.length > 0){
						var totCnt = data.exchangeResultList[0].totalCnt*1;
						var nowPage = $rootScope.exchange.resultOut.nowPage*1;
						var maxRowCnt = $rootScope.exchange.resultOut.maxRowCnt*1;
						$rootScope.exchange.resultOut.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.exchange.resultOut.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["exchangeResultListPaging"]) || redrawPage){
							$("#exchangeResultListPaging").html("");
							$("#exchangeResultListPaging").createPaging({
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
						$rootScope.exchange.resultOut.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 로드시 수강결과 조회 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.exchange.resultOut.isUnivComplete && $rootScope.exchange.resultOut.isSemesterComplete) {
                	$scope.search(false);
        		}
        	};

        	//페이지 재 로드시 수강결과 조회 목록을 조회하기 위함.
        	if($rootScope.exchange.resultOut.isUnivComplete && $rootScope.exchange.resultOut.isSemesterComplete) {
            	$scope.search(false);
    		}
        	
        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        		if($rootScope.exchange.resultOut.isUnivComplete && $rootScope.exchange.resultOut.isSemesterComplete) {
        			$scope.diabledSelectUniv();
        		}
    		}
        	
        	/**
        	 * 수강결과 정보 팝업창
        	 * 
        	 */
        	$scope.getExchangeResultInfo = function(seq) {
        		var param = { exchangeResultSeq : seq };
        		
        		ngDialog.open({
                    template: Const.contextPath + 'html/exchange/exchangeResultInfoPopup.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 712,
                    controller: function($scope) {
                    	exchangeResultService.getExchangeResultInfo(param, function(data) {
                        	$rootScope.exchange.exchangeResultInfo = data.exchangeResultInfo;
                        	$rootScope.exchange.resultPageType = 'out';
                        });
                    }
        		});
        	}
        	
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
        		
        		$rootScope.exchange.resultOut.sort = sort;
        		$rootScope.exchange.resultOut.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
            /**
        	 * 수강결과 조회(OUT) 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if($rootScope.exchange.resultOut.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.resultOut.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.resultOut.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.resultOut.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.resultOut.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.resultOut.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.resultOut.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.resultOut.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.resultOut.searchType,
    	        	searchKey				:	$rootScope.exchange.resultOut.searchKey,
    	        	sort					:	$rootScope.exchange.resultOut.sort,
    	        	order					:	$rootScope.exchange.resultOut.order,
    	        	isPaging				: 	'N'
        		};

        		$("#excelForm").html('');
        		$.each(param, function(key, value){
        			$("<input></input>").attr({type:"hidden", name:key, value:value}).appendTo($("#excelForm"));
        		});
        		
        		$("#excelForm").attr("action", Const.contextPath + "exchangeResult/downResultOutList.do").submit();
        		$("#excelForm").html("");
        	};
        	
            $scope.getApplyResultStatus = function(idx) {
            	var exchangeResultInfo = {};
            	var resultStr = "";
            	if(!isNull(idx)){
            		exchangeResultInfo = $rootScope.exchange.resultOut.exchangeResultList[idx];
            	}else{
            		exchangeResultInfo = $rootScope.exchange.resultOut.exchangeResultInfo;
            	}
            	
            	if(!isNull(exchangeResultInfo)){
            		if(exchangeResultInfo.applyResult == '1'){
            			resultStr = "동일";
            		}else if(exchangeResultInfo.applyResult == '2'){
            			resultStr = "추가";
            		}else if(exchangeResultInfo.applyResult == '3'){
            			resultStr = "변경";
            		}else if(exchangeResultInfo.applyResult == '4'){
            			resultStr = "삭제";
            		}
            	}
            	
            	return resultStr;
            };
            
        });
})());