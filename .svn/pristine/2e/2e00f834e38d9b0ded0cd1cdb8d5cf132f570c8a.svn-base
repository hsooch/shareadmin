((function() {
    angular.module('appModule')
        .controller('studentHistoryOutCtrl', function($scope, $rootScope, exchangeResultService, commonService, Const, ngDialog, FileUploader) {
        	$rootScope.exchange.studentOut.scope = $scope;
    		
        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.exchange.studentOut.searchUserUnivArea']").attr("disabled", true);
    				$("[ng-model='$root.exchange.studentOut.searchUserUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
        	
            /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.exchange.studentOut[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv" || childModel == "searchUserUniv"){
        			if(isNull($rootScope.exchange.studentOut[parentModel])) {
        				$rootScope.exchange.studentOut[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				return;
        			}
        			commonService.getCodeList($rootScope.exchange.studentOut[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.exchange.studentOut[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.exchange.studentOut[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)){
                				$rootScope.exchange.studentOut[childModel] = $rootScope.exchange.studentOut[childModel+"List"][0].code;
                			}else{
                				$rootScope.exchange.studentOut[childModel] = defaultValue;
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
        	if($rootScope.exchange.studentOut.searchYearList.length == 0){
        		//$rootScope.exchange.studentOut.searchYearList = [{code : "", codeName : "전체"}];
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()-2;
	        	for(var i = nowDate.getFullYear(); i >= curYear; i--) {
	    	 	   	$rootScope.exchange.studentOut.searchYearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.exchange.studentOut.searchYear = nowDate.getFullYear()+"";
        	}
            
            //학기 분류 목록 조회
        	if($rootScope.exchange.studentOut.searchSemesterCodeList.length == 0){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			//$rootScope.exchange.studentOut.searchSemesterCodeList = [];
            			//$rootScope.exchange.studentOut.searchSemesterCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.studentOut.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
        				$rootScope.exchange.studentOut.searchSemesterCode = $rootScope.exchange.studentOut.searchSemesterCodeList[0].code;
        				$rootScope.exchange.studentOut.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //학년 분류 목록 조회
        	if($rootScope.exchange.studentOut.searchStudentGradeCodeList.length == 0){
            	commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.studentOut.searchStudentGradeCodeList = [];
            			$rootScope.exchange.studentOut.searchStudentGradeCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.studentOut.searchStudentGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
        	
        	//학교 지역 목록
        	if($rootScope.exchange.studentOut.searchUserUnivAreaList.length == 0){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.studentOut.searchUnivAreaList = [];
            			$rootScope.exchange.studentOut.searchUnivAreaList.push({code:"", codeName:"지역 전체"});

            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.studentOut.searchUserUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				
            				$rootScope.exchange.studentOut.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
                    	
                    	//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
                			$rootScope.exchange.studentOut.searchUserUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", $rootScope.userSession.univCode, function(){
                				$rootScope.exchange.studentOut.searchUserUniv = $rootScope.userSession.univCode;
                				
                				$scope.diabledSelectUniv();

                				$rootScope.exchange.studentOut.isUnivComplete = true;
	        					$scope.initSearch();
                			});
                		} else {
	            			$rootScope.exchange.studentOut.searchUserUnivArea = $rootScope.exchange.studentOut.searchUserUnivAreaList[0].code;
	            			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", null, function(data){
	        					$rootScope.exchange.studentOut.searchUserUniv = $rootScope.exchange.studentOut.searchUserUnivList[1].code;
	        					$rootScope.exchange.studentOut.isUnivComplete = true;
	        					$scope.initSearch();
	            			});
                		}
            		}
            	});
            };
        	//기본 셀렉트 박스 데이터 조회 end
            	
            // 검색 조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.exchange.studentOut.searchStudentGradeCode	= "";
    			$rootScope.exchange.studentOut.searchUnivArea			= $rootScope.exchange.studentOut.searchUnivAreaList[0].code;
    			$rootScope.exchange.studentOut.searchUnivList			= [{code : "", codeName : "대학교 전체"}];
    			$rootScope.exchange.studentOut.searchUserUniv			= "";
    			$rootScope.exchange.studentOut.searchYear				= $rootScope.exchange.studentOut.searchYearList[0].code+"";
    			$rootScope.exchange.studentOut.searchSemesterCode		= $rootScope.exchange.studentOut.searchSemesterCodeList[0].code;
    			$rootScope.exchange.studentOut.searchType				= "";
    			$rootScope.exchange.studentOut.searchKey				= "";
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        			$rootScope.exchange.studentOut.searchUserUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", $rootScope.userSession.univCode, function(){
        				$rootScope.exchange.studentOut.searchUserUniv = $rootScope.userSession.univCode;
        				
        				$scope.diabledSelectUniv();

        				$rootScope.exchange.studentOut.isUnivComplete = true;
        			});
        		} else {
        			$rootScope.exchange.studentOut.searchUserUnivArea = $rootScope.exchange.studentOut.searchUserUnivAreaList[1].code;
        			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", $rootScope.exchange.studentOut.searchUserUnivArea, function(data){
    					$rootScope.exchange.studentOut.searchUserUniv = $rootScope.exchange.studentOut.searchUserUnivList[1].code;
    					$rootScope.exchange.studentOut.isUnivComplete = true;
        			});
        		}
        	};
        	
        	/**
        	 * 학생이력 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(redrawPage){
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.studentOut.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.studentOut.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.studentOut.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.studentOut.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.studentOut.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.studentOut.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.studentOut.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.studentOut.searchType,
    	        	searchKey				:	$rootScope.exchange.studentOut.searchKey,
    	        	sort					:	$rootScope.exchange.studentOut.sort,
    	        	order					:	$rootScope.exchange.studentOut.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["studentOutListPaging"]) || redrawPage ? 1 : pagingGlobalVar["studentOutListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.exchange.studentOut.maxRowCnt,
        		};
        		
        		exchangeResultService.getStudentOutList(param, function(data){
        			$rootScope.exchange.studentOut.searchYn = "Y";
					$rootScope.exchange.studentOut.studentOutList = data.studentOutList;
					if(data.studentOutList.length > 0){
						var totCnt = data.studentOutList[0].totalCnt*1;
						var nowPage = $rootScope.exchange.studentOut.nowPage*1;
						var maxRowCnt = $rootScope.exchange.studentOut.maxRowCnt*1;
						$rootScope.exchange.studentOut.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.exchange.studentOut.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["studentOutListPaging"]) || redrawPage){
							$("#studentOutListPaging").html("");
							$("#studentOutListPaging").createPaging({
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
						$rootScope.exchange.studentOut.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 로드시 학생이력 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.exchange.studentOut.isUnivComplete && $rootScope.exchange.studentOut.isSemesterComplete) {
                	$scope.search(false);
        		}
        	};

        	//페이지 재 로드시 학생이력 목록을 조회하기 위함.
        	if($rootScope.exchange.studentOut.isUnivComplete && $rootScope.exchange.studentOut.isSemesterComplete) {
            	$scope.search(false);
    		}

        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        		if($rootScope.exchange.studentOut.isUnivComplete && $rootScope.exchange.studentOut.isSemesterComplete) {
        			$scope.diabledSelectUniv();
    			}
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
        		
        		$rootScope.exchange.studentOut.sort = sort;
        		$rootScope.exchange.studentOut.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
            /**
        	 * 학생별 이력 조회(IN) 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if($rootScope.exchange.studentOut.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.studentOut.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.studentOut.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.studentOut.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.studentOut.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.studentOut.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.studentOut.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.studentOut.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.studentOut.searchType,
    	        	searchKey				:	$rootScope.exchange.studentOut.searchKey,
    	        	sort					:	$rootScope.exchange.studentOut.sort,
    	        	order					:	$rootScope.exchange.studentOut.order,
    	        	isPaging				: 	'N'
        		};

        		$("#excelForm").html('');
        		$.each(param, function(key, value){
        			$("<input></input>").attr({type:"hidden", name:key, value:value}).appendTo($("#excelForm"));
        		});
        		
        		$("#excelForm").attr("action", Const.contextPath + "exchangeResult/downStudentOutList.do").submit();
        		$("#excelForm").html("");
        	};
        	
        	/**
             * 검색영역 validate check
             */
            $scope.checkValidateSearch = function(){
			    if(isNull($rootScope.exchange.studentOut.searchYear)){
					commonService.alert("검색영역에서 년도를 선택해주세요.");
					return false
				}
				
				if(isNull($rootScope.exchange.studentOut.searchSemesterCode)){
					commonService.alert("검색영역에서 학기를 선택해주세요.");
					return false;
				}
				
				if(isNull($rootScope.exchange.studentOut.searchUniv)){
					commonService.alert("검색영역에서 학교구분의 대학을 선택해주세요.");
					return false;
				}
				return true;
            }

        });
})());