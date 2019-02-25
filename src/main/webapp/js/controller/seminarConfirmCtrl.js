((function() {
	angular.module('appModule') 	
		.controller('seminarConfirmCtrl', function($scope, $rootScope, $compile, ngDialog, commonService, seminarService, Const, FileUploader) {
			$rootScope.seminar.confirm.scope = $scope;
			$scope.checked = [];
			var chkList = $rootScope.seminar.confirm.applyChkList = [];
			var chkArray =  [];
			
			/**
			 * 학교 지역 목록
			 */
        	if($rootScope.seminar.confirm.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.seminar.confirm.searchUnivAreaList = [];
            			$rootScope.seminar.confirm.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.seminar.confirm.univAreaCodeList = [];
            			$rootScope.seminar.confirm.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.seminar.confirm.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.seminar.confirm.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
    		
			/**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.seminar.confirm[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.seminar.confirm[parentModel])) {
        				$rootScope.seminar.confirm[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				return;
        			}
        			commonService.getCodeList($rootScope.seminar.confirm[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.seminar.confirm[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.seminar.confirm[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)) {
                				$rootScope.seminar.confirm[childModel] = $rootScope.seminar.confirm[childModel+"List"][0].code;
                			}
                			else {
                				$rootScope.seminar.confirm[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.seminar.confirm.seminarInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.seminar.confirm.seminarInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.seminar.confirm[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.seminar.confirm[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			//$rootScope.seminar.confirm[childModel] = $rootScope.seminar.confirm[childModel+"List"][0].code;
	            		}
        			});
        		}
        	};
        	
        	// 검색조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.seminar.confirm.searchUnivArea		= null;
    			$rootScope.seminar.confirm.searchUniv			= null;
    			$rootScope.seminar.confirm.searchSeminarType	= null;
    			$rootScope.seminar.confirm.searchSeminarStatus	= null;
    			$rootScope.seminar.confirm.searchEtcOption		= null;
    			$rootScope.seminar.confirm.searchKeywords		= null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.seminar.confirm.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
        			$rootScope.seminar.confirm.searchUniv = $rootScope.userSession.univCode;
        			
        			$("[ng-model='$root.seminar.confirm.searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.seminar.confirm.searchUniv']").attr("disabled", true);
        		}
        	};
        	
        	/**
        	 * 목록 조회
        	 * 
        	 */
        	$scope.search = function(redrawPage) {
        		var searchSeminarType;
				
				switch ($rootScope.seminar.confirm.searchSeminarType) {
				case 'seminar':
					searchSeminarType = 1;
					break;
				case 'lecture':
					searchSeminarType = 2;
					break;
				}
        		var param = {
        				searchUnivArea		: $rootScope.seminar.confirm.searchUnivArea,
						searchUniv			: $rootScope.seminar.confirm.searchUniv,
						searchSeminarType	: searchSeminarType,
						searchSeminarStatus	: $rootScope.seminar.confirm.searchSeminarStatus,
						searchEtcOption		: $rootScope.seminar.confirm.searchEtcOption,
						searchKeywords		: $rootScope.seminar.confirm.searchKeywords,
						sort				: $rootScope.seminar.confirm.sort,
						order				: $rootScope.seminar.confirm.order,
						nowPage				: isNull(pagingGlobalVar["seminarListPaging"])? 1 : pagingGlobalVar["seminarListPaging"].nowPage,
						rowCnt				: $rootScope.seminar.confirm.maxRowCnt,
						type1				: 1,
						type2				: 2,
        		}
        		
        		seminarService.getSeminarList(param, function(data) {
        			$rootScope.seminar.confirm.searchYn = "Y";
					$rootScope.seminar.confirm.seminarList = data.seminarList;
					if (data.seminarList.length > 0) {
						var totCnt = data.seminarList[0].totalCnt*1;
						var nowPage = $rootScope.seminar.confirm.nowPage*1;
						var maxRowCnt = $rootScope.seminar.confirm.maxRowCnt*1;
						$rootScope.seminar.confirm.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.seminar.confirm.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["seminarListPaging"]) || redrawPage){
							$("#seminarListPaging").html("");
							$("#seminarListPaging").createPaging({
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
					}
					else {
						$rootScope.seminar.confirm.totalCnt = 0;
					}
        		});
        		
        	}
        	
        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
            ){
    			$rootScope.seminar.confirm.searchUnivArea = $rootScope.userSession.univAreaCd;
    			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
    			$rootScope.seminar.confirm.searchUniv = $rootScope.userSession.univCode;
    			
    			$("[ng-model='$root.seminar.confirm.searchUnivArea']").attr("disabled", true);
    			$("[ng-model='$root.seminar.confirm.searchUniv']").attr("disabled", true);
    		}
        	
        	//페이지 로드시 목록을 조회하기 위함.
        	$scope.search(false);
        	
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
        		
        		$rootScope.seminar.confirm.sort = sort;
        		$rootScope.seminar.confirm.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
        	/**
        	 * 강좌 정보 팝업창
        	 * 
        	 */
        	$scope.getSeminarInfo = function(seq) {
        		var param = { seminarSeq : seq };
        		
        		ngDialog.open({
                    template: Const.contextPath + 'html/seminar/seminarInfoPopup.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 712,
                    controller: function($scope) {
                        seminarService.getSeminarInfo(param, function(data) {
                        	$rootScope.seminar.confirm.seminarInfo 					= data.seminarInfo;
                        	$rootScope.seminar.confirm.seminarInfo.seminarSeq 		= data.seminarInfo.seminarSeq;
                        	$rootScope.seminar.confirm.seminarInfo.univCodeName 	= data.seminarInfo.univCodeName; 
                        	$rootScope.seminar.confirm.seminarInfo.title		 	= data.seminarInfo.title; 
                        	$rootScope.seminar.confirm.seminarInfo.teacherName 		= data.seminarInfo.teacherName; 
                        	$rootScope.seminar.confirm.seminarInfo.place		 	= data.seminarInfo.place; 
                        	$rootScope.seminar.confirm.seminarInfo.exchangeYn 		= data.seminarInfo.exchangeYn === 'Y' ? '교류' : '비교류'; 
                        	$rootScope.seminar.confirm.seminarInfo.classDay 		= data.seminarInfo.classDay; 
                        	$rootScope.seminar.confirm.seminarInfo.applyStartDay 	= data.seminarInfo.applyStartDay; 
                        	$rootScope.seminar.confirm.seminarInfo.applyEndDay 		= data.seminarInfo.applyEndDay; 
                        	$rootScope.seminar.confirm.seminarInfo.classStartTime 	= data.seminarInfo.classStartTime; 
                        	$rootScope.seminar.confirm.seminarInfo.classEndTime 	= data.seminarInfo.classEndTime; 
                        	$rootScope.seminar.confirm.seminarInfo.seminarStatus 	= data.seminarInfo.seminarStatus;
                        	$rootScope.seminar.confirm.seminarInfo.contents			= data.seminarInfo.contents;
                        	switch (data.seminarInfo.seminarType) {
							case 'seminar':
								$rootScope.seminar.confirm.seminarInfo.seminarType 	= '세미나'; 
								break;
							case 'lecture':
								$rootScope.seminar.confirm.seminarInfo.seminarType 	=  '특강';
								break;
							}
                        	switch (data.seminarInfo.acceptType) {
							case 'auto':
								$rootScope.seminar.confirm.seminarInfo.acceptType = '선착순 자동 승인';
								break;
							case 'admin':
								$rootScope.seminar.confirm.seminarInfo.acceptType = '관리자 승인';
								break;
							}
                        	$('#contents').html($rootScope.seminar.confirm.seminarInfo.contents);
                        });
                    }
        		});
        	}
        	
        	/**
        	 * 목록으로 가기
        	 */
        	$scope.goSeminarListView = function() {
				$rootScope.seminar.confirm.pageViewType = "list";
				$rootScope.seminar.confirm.applyInfo = {};
				$scope.search();
			};
			
			$scope.searchApplyList = function(redrawPage) {
				var searchApplyStatus = null;
				switch ($rootScope.seminar.confirm.applyInfo.searchApplyStatus) {
					case 'apply':
						searchApplyStatus = 1;
						break;
					case 'wait':
						searchApplyStatus = 2;
						break;
					case 'cancel' :
						searchApplyStatus = 3;
						break;
				}
				var param = {
        				seminarSeq 			: $rootScope.seminar.confirm.seminarInfo.seminarSeq,
        				searchApplyStatus	: searchApplyStatus,
						searchUserName		: $rootScope.seminar.confirm.applyInfo.searchUserName,
        				sort				: $rootScope.seminar.confirm.sort,
						order				: $rootScope.seminar.confirm.order,
						nowPage				: isNull(pagingGlobalVar["applyListPaging"])? 1 : pagingGlobalVar["applyListPaging"].nowPage,
						rowCnt				: $rootScope.seminar.confirm.maxRowCnt,	
    			};	
				
				seminarService.getApplyUserList(param, function(data) {
					$rootScope.seminar.confirm.applyList = data.applyList;
					$rootScope.seminar.confirm.checked = [];
					chkArray = [];
					
            		if (data.applyList.length > 0) {
						var totCnt = data.applyList[0].totalCnt*1;
						var nowPage = $rootScope.seminar.confirm.nowPage*1;
						var maxRowCnt = $rootScope.seminar.confirm.maxRowCnt*1;
						$rootScope.seminar.confirm.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.seminar.confirm.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["applyListPaging"]) || redrawPage){
							$("#applyListPaging").html("");
							$("#applyListPaging").createPaging({
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
					}
					else {
						$rootScope.seminar.confirm.totalCnt = 0;
					}
				});
        	}
        
        	/**
        	 * 승인 처리 화면
        	 */
        	$scope.treatApplyInfo = function(seq) {
        		$rootScope.seminar.confirm.pageViewType = 'apply'
        			
        		var param = { seminarSeq : seq };
        			
    			seminarService.getSeminarInfo(param, function(data) {
                	$rootScope.seminar.confirm.seminarInfo 					= data.seminarInfo;
                	$rootScope.seminar.confirm.seminarInfo.seminarSeq 		= data.seminarInfo.seminarSeq;
                	$rootScope.seminar.confirm.seminarInfo.univCodeName 	= data.seminarInfo.univCodeName; 
                	$rootScope.seminar.confirm.seminarInfo.title		 	= data.seminarInfo.title; 
                	$rootScope.seminar.confirm.seminarInfo.teacherName 		= data.seminarInfo.teacherName; 
                	$rootScope.seminar.confirm.seminarInfo.place		 	= data.seminarInfo.place; 
                	$rootScope.seminar.confirm.seminarInfo.exchangeYn 		= data.seminarInfo.exchangeYn === 'Y' ? '교류' : '비교류'; 
                	$rootScope.seminar.confirm.seminarInfo.classDay 		= data.seminarInfo.classDay; 
                	$rootScope.seminar.confirm.seminarInfo.applyStartDay 	= data.seminarInfo.applyStartDay; 
                	$rootScope.seminar.confirm.seminarInfo.applyEndDay 		= data.seminarInfo.applyEndDay; 
                	$rootScope.seminar.confirm.seminarInfo.classStartTime	= data.seminarInfo.classStartTime; 
                	$rootScope.seminar.confirm.seminarInfo.classEndTime 	= data.seminarInfo.classEndTime; 
                	$rootScope.seminar.confirm.seminarInfo.seminarStatus 	= data.seminarInfo.seminarStatus;
                	$rootScope.seminar.confirm.seminarInfo.applyUserCnt 	= data.seminarInfo.applyUserCnt;
                	$rootScope.seminar.confirm.seminarInfo.waitUserCnt 		= data.seminarInfo.waitUserCnt;
                	switch (data.seminarInfo.seminarType) {
					case 'seminar':
						$rootScope.seminar.confirm.seminarInfo.seminarType 	= '세미나'; 
						break;
					case 'lecture':
						$rootScope.seminar.confirm.seminarInfo.seminarType 	=  '특강';
						break;
					}
                	switch (data.seminarInfo.acceptType) {
					case 'auto':
						$rootScope.seminar.confirm.seminarInfo.acceptType = '선착순 자동 승인';
						break;
					case 'admin':
						$rootScope.seminar.confirm.seminarInfo.acceptType = '관리자 승인';
						break;
					}
                	$scope.searchApplyList(false);
                });
        	}
        	
        	/**
        	 * 세미나 신청 승인
        	 * 
        	 */
        	$scope.changeApplyStatus = function(applyStatus) {
    			$.each($rootScope.seminar.confirm.checked, function(i, items) {
        			chkList.push(items);
    			});
    			
    			chkArray = chkList.slice().sort(function(a,b){return a - b}).reduce(function(a,b){if (a.slice(-1)[0] !== b) a.push(b);return a;},[]);
        		
    			var params = {
        				modStatusUserSeq	: $rootScope.userSession.userSeq,
        				userSeq				: chkArray,
        				applyStatus			: applyStatus
        		}
    			if (isNull(chkArray)) {
    				commonService.alert('대상을 선택해 주십시오.');
    				return;
    			}
    			else {
    				if(applyStatus === 1) {
    					commonService.confirm('선택한 청강생을 승인 하시겠습니까?', function() {
    						$scope.change(params);
        				});
    				}
    				else if(applyStatus === 3) {
    					commonService.confirm('선택한 청강생의 승인을 반려 하시겠습니까?', function() {
    						$scope.change(params);
        				});
    				}
    			}
        	}
        	
        	$scope.change = function(params) {
        		seminarService.changeApplyStatus(params, function(data) {
					$scope.searchApplyList($rootScope.seminar.confirm.seminarInfo.seminarSeq, false);
				});
        	}
        	
        	$scope.checkbox = function(idx) {
        		if ($("#thisChk_"+idx).is(":checked") === true) {
        			$("#thisChk_"+idx).prop("checked", false);
        			$scope.checked.splice($scope.checked.indexOf(idx),1);
             	}
        		else {
             		$("#thisChk_"+idx).prop("checked", true);
             		$scope.checked.push(idx);
             	}
             	$rootScope.seminar.confirm.checked = $scope.checked;
        	}
        	
        	/**
             * 상태 코드
             */
            $scope.getSeminarColStr = function(col, idx) {
            	var seminarInfo = {};
            	var resultStr = "";
            	if(!isNull(idx)) {
            		seminarInfo = $rootScope.seminar.confirm.seminarList[idx];
            	}
            	else {
            		seminarInfo = $rootScope.seminar.confirm.seminarInfo;
            	}
            	switch (col) {
				case 'seminarType':
					if(!isNull(seminarInfo)) {
	            		if(seminarInfo.seminarType === 'seminar') {
	            			resultStr = "세미나";
	            		} else if(seminarInfo.seminarType === 'lecture') {
	            			resultStr = "특강";
	            		}
	            	}
	            	return resultStr;
					break;
				case 'displayYn':
					if(!isNull(seminarInfo)) {
	            		if(seminarInfo.displayYn === 'Y') {
	            			resultStr = "노출";
	            		} else if(seminarInfo.displayYn === 'N') {
	            			resultStr = "비노출";
	            		}
	            	}
	            	return resultStr;
					break;
				case 'exchangeYn':
					if(!isNull(seminarInfo)) {
	            		if(seminarInfo.exchangeYn === 'Y') {
	            			resultStr = "교류";
	            		} else if(seminarInfo.exchangeYn === 'N') {
	            			resultStr = "비교류";
	            		}
	            	}
					return resultStr;
					break;
				case 'seminarStatus':
					if(!isNull(seminarInfo)){
	            		var nowDate = new Date();
	            		var nowDateStr = nowDate.getFullYear()+""+lpad(nowDate.getMonth()+1, 2)+""+lpad(nowDate.getDate(), 2);
	            		if(nowDateStr >= seminarInfo.applyStartDay && nowDateStr <= seminarInfo.applyEndDay){
	            			resultStr = "접수중";
	            		}else if(nowDateStr < seminarInfo.applyStartDay){
	            			resultStr = "대기";
	            		}else if(!isNull(seminarInfo.seminarSeq)){
	            			resultStr = "마감";
	            		}
	            	}
	            	return resultStr;
	            	break;
				}
            }
        	
            /**
        	 * 세미나 신청목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if($rootScope.seminar.confirm.searchYn != "Y"){
        			$scope.searchApplyList(true);
            	}
        		
        		var searchApplyStatus = null;
				switch ($rootScope.seminar.confirm.applyInfo.searchApplyStatus) {
					case 'apply':
						searchApplyStatus = 1;
						break;
					case 'wait':
						searchApplyStatus = 2;
						break;
					case 'cancel' :
						searchApplyStatus = 3;
						break;
				}
        		
        		var param = {
        				searchApplyStatus	: searchApplyStatus,
						searchUserName		: $rootScope.seminar.confirm.applyInfo.searchUserName,
						univCodeName		: $rootScope.seminar.confirm.applyInfo.univCodeName,
        				sort				: $rootScope.seminar.confirm.sort,
						order				: $rootScope.seminar.confirm.order,
						isPaging			: 'N'
				}
        		
        		$("<input></input>").attr({type:"hidden", name:"univCodeName",			value:param.univCodeName		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sort",					value:param.sort				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"order",					value:param.order				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"isPaging",				value:"N"						}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sortOnly",				value:"Y"						}).appendTo($("#excelForm"));
        		
        		$("#excelForm").attr("action", Const.contextPath + "seminar/downloadSeminarApplyList.do").submit();
        		$("#excelForm").html("");
        	};
        	
        	
        	
        	
        	
        	
        	
		});
})());


















