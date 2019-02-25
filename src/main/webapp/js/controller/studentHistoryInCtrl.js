((function() {
    angular.module('appModule')
        .controller('studentHistoryInCtrl', function($scope, $rootScope, exchangeResultService, commonService, Const, ngDialog, FileUploader) {
        	$rootScope.exchange.studentIn.scope = $scope;
    		
        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.exchange.studentIn.searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.exchange.studentIn.searchUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
        	
            /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.exchange.studentIn[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv" || childModel == "searchUserUniv"){
        			if(isNull($rootScope.exchange.studentIn[parentModel])) {
        				$rootScope.exchange.studentIn[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				return;
        			}
        			commonService.getCodeList($rootScope.exchange.studentIn[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.exchange.studentIn[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.exchange.studentIn[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)){
                				$rootScope.exchange.studentIn[childModel] = $rootScope.exchange.studentIn[childModel+"List"][0].code;
                			}else{
                				$rootScope.exchange.studentIn[childModel] = defaultValue;
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
        	if($rootScope.exchange.studentIn.searchYearList.length == 0){
        		//$rootScope.exchange.studentIn.searchYearList = [{code : "", codeName : "전체"}];
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()-2;
	        	for(var i = nowDate.getFullYear(); i >= curYear; i--) {
	    	 	   	$rootScope.exchange.studentIn.searchYearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.exchange.studentIn.searchYear = nowDate.getFullYear()+"";
        	}
            
            //학기 분류 목록 조회
        	if($rootScope.exchange.studentIn.searchSemesterCodeList.length == 0){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			//$rootScope.exchange.studentIn.searchSemesterCodeList = [];
            			//$rootScope.exchange.studentIn.searchSemesterCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.studentIn.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
        				$rootScope.exchange.studentIn.searchSemesterCode = $rootScope.exchange.studentIn.searchSemesterCodeList[0].code;
        				$rootScope.exchange.studentIn.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //학년 분류 목록 조회
        	if($rootScope.exchange.studentIn.searchStudentGradeCodeList.length == 0){
            	commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.studentIn.searchStudentGradeCodeList = [];
            			$rootScope.exchange.studentIn.searchStudentGradeCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.studentIn.searchStudentGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
        	
        	//학교 지역 목록
        	if($rootScope.exchange.studentIn.searchUnivAreaList.length == 0){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			//$rootScope.exchange.studentIn.searchUnivAreaList = [];
            			//$rootScope.exchange.studentIn.searchUnivAreaList.push({code:"", codeName:"지역 전체"});

            			$rootScope.exchange.studentIn.searchUserUnivAreaList = [];
            			$rootScope.exchange.studentIn.searchUserUnivAreaList.push({code:"", codeName:"지역 전체"});

            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.studentIn.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});

            				$rootScope.exchange.studentIn.searchUserUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});

                    	//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
                			$rootScope.exchange.studentIn.searchUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode, function(){
                				$rootScope.exchange.studentIn.searchUniv = $rootScope.userSession.univCode;

                				$scope.diabledSelectUniv();

                    			$rootScope.exchange.studentIn.isUnivComplete = true;
	        					$scope.initSearch();
                			});
                		} else {
	            			$rootScope.exchange.studentIn.searchUnivArea = $rootScope.exchange.studentIn.searchUnivAreaList[0].code;
	            			$scope.getChildCdList("searchUnivArea", "searchUniv", null, function(data){
	        					$rootScope.exchange.studentIn.searchUniv = $rootScope.exchange.studentIn.searchUnivList[1].code;
	        					$rootScope.exchange.studentIn.isUnivComplete = true;
	        					$scope.initSearch();
	            			});
                		}
            		}
            	});
            };
        	//기본 셀렉트 박스 데이터 조회 end
            	
            // 검색 조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.exchange.studentIn.searchStudentGradeCode	= "";
    			$rootScope.exchange.studentIn.searchUserUnivArea		= $rootScope.exchange.studentIn.searchUserUnivAreaList[0].code;
    			$rootScope.exchange.studentIn.searchUserUnivList		= [{code : "", codeName : "대학교 전체"}];
    			$rootScope.exchange.studentIn.searchUserUniv			= "";
    			$rootScope.exchange.studentIn.searchYear				= $rootScope.exchange.studentIn.searchYearList[0].code+"";
    			$rootScope.exchange.studentIn.searchSemesterCode		= $rootScope.exchange.studentIn.searchSemesterCodeList[0].code;
    			$rootScope.exchange.studentIn.searchType				= "";
    			$rootScope.exchange.studentIn.searchKey				= "";
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        			$rootScope.exchange.studentIn.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode, function(){
        				$rootScope.exchange.studentIn.searchUniv = $rootScope.userSession.univCode;
        				
        				$scope.diabledSelectUniv();

        				$rootScope.exchange.studentIn.isUnivComplete = true;
        			});
        		} else {
        			$rootScope.exchange.studentIn.searchUnivArea = $rootScope.exchange.studentIn.searchUnivAreaList[1].code;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.studentIn.searchUnivArea, function(data){
    					$rootScope.exchange.studentIn.searchUniv = $rootScope.exchange.studentIn.searchUnivList[1].code;
    					$rootScope.exchange.studentIn.isUnivComplete = true;
        			});
        		}
        	};
        	
        	/**
        	 * 수강결과 등록 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(redrawPage){
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.studentIn.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.studentIn.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.studentIn.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.studentIn.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.studentIn.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.studentIn.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.studentIn.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.studentIn.searchType,
    	        	searchKey				:	$rootScope.exchange.studentIn.searchKey,
    	        	sort					:	$rootScope.exchange.studentIn.sort,
    	        	order					:	$rootScope.exchange.studentIn.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["studentInListPaging"]) ? 1 : pagingGlobalVar["studentInListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.exchange.studentIn.maxRowCnt,
        		};
        		
        		exchangeResultService.getStudentInList(param, function(data){
        			$rootScope.exchange.studentIn.searchYn = "Y";
					$rootScope.exchange.studentIn.studentInList = data.studentInList;
					console.log(data);
					if(data.studentInList.length > 0){
						var totCnt = data.studentInList[0].totalCnt*1;
						var nowPage = $rootScope.exchange.studentIn.nowPage*1;
						var maxRowCnt = $rootScope.exchange.studentIn.maxRowCnt*1;
						$rootScope.exchange.studentIn.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.exchange.studentIn.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["studentInListPaging"]) || redrawPage){
							$("#studentInListPaging").html("");
							$("#studentInListPaging").createPaging({
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
						$rootScope.exchange.studentIn.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 로드시 수강결과 등록 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.exchange.studentIn.isUnivComplete && $rootScope.exchange.studentIn.isSemesterComplete) {
                	$scope.search(false);
        		}
        	};

        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        		if($rootScope.exchange.studentIn.isUnivComplete && $rootScope.exchange.studentIn.isSemesterComplete) {
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
        		
        		$rootScope.exchange.studentIn.sort = sort;
        		$rootScope.exchange.studentIn.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
            /**
        	 * 수강결과 등록(IN) 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if($rootScope.exchange.studentIn.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.studentIn.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.studentIn.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.studentIn.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.studentIn.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.studentIn.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.studentIn.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.studentIn.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.studentIn.searchType,
    	        	searchKey				:	$rootScope.exchange.studentIn.searchKey,
    	        	sort					:	$rootScope.exchange.studentIn.sort,
    	        	order					:	$rootScope.exchange.studentIn.order,
    	        	isPaging				: 	'N'
        		};

        		$("#excelForm").html('');
        		$.each(param, function(key, value){
        			$("<input></input>").attr({type:"hidden", name:key, value:value}).appendTo($("#excelForm"));
        		});
        		
        		$("#excelForm").attr("action", Const.contextPath + "exchangeResult/downStudentInList.do").submit();
        		$("#excelForm").html("");
        	};
        	
        	/**
             * 검색영역 validate check
             */
            $scope.checkValidateSearch = function(){
			    if(isNull($rootScope.exchange.studentIn.searchYear)){
					commonService.alert("검색영역에서 년도를 선택해주세요.");
					return false
				}
				
				if(isNull($rootScope.exchange.studentIn.searchSemesterCode)){
					commonService.alert("검색영역에서 학기를 선택해주세요.");
					return false;
				}
				
				if(isNull($rootScope.exchange.studentIn.searchUniv)){
					commonService.alert("검색영역에서 대학을 선택해주세요.");
					return false;
				}
				return true;
            }

        });
})());