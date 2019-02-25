((function() {
    angular.module('appModule')
        .controller('semesterCtrl', function($scope, $rootScope, semesterService, commonService, Const, ngDialog) {
        	$rootScope.semester.scope = $scope;
        	
        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.semester.searchUnivArea']").attr("disabled", true);
	    			$("[ng-model='$root.semester.searchUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
        	
            //기본 셀렉트 박스 데이터 조회 start
        	//년도 세팅
        	if($rootScope.semester.searchUnivAreaList.length == 1){
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()+2;
	        	for(var i = curYear; i >= nowDate.getFullYear(); i--) {
	    	 	   	$rootScope.semester.searchYearList.push({code:i, codeName:i});
	    	 	   	$rootScope.semester.yearList.push({code:i, codeName:i});
	    	    }
        	}
        	
        	//학교 지역 목록
        	if($rootScope.semester.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.semester.searchUnivAreaList = [];
            			$rootScope.semester.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.semester.univAreaCodeList = [];
            			$rootScope.semester.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.semester.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.semester.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
            
            //학기 분류 목록 조회
        	if($rootScope.semester.semesterCodeList.length == 1){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.semester.semesterCodeList = [];
            			$rootScope.semester.semesterCodeList.push({code:"", codeName:"학기 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.semester.semesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
            
            //달력
    		$("[ng-model='$root.semester.semesterInfo.semesterStartDay']").datepicker(getDatePickerConfig("dateField"));
    		$("[ng-model='$root.semester.semesterInfo.semesterEndDay']").datepicker(getDatePickerConfig("dateField"));
            
            /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue){
        		$rootScope.semester[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.semester[parentModel])) return;
        			commonService.getCodeList($rootScope.semester[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.semester[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.semester[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)){
                				$rootScope.semester[childModel] = $rootScope.semester[childModel+"List"][0].code;
                			}else{
                				$rootScope.semester[childModel] = defaultValue;
                			}
                		}
                    });
        		}
        		
        		if(childModel == "newUnivCode"){
        			if(isNull($rootScope.semester.semesterInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.semester.semesterInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.semester[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.semester[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			if(isNull(defaultValue)){
	            				$rootScope.semester.semesterInfo[childModel] = $rootScope.semester[childModel+"List"][0].code;
	            			}else{
                				$rootScope.semester.semesterInfo[childModel] = defaultValue;
                			}
	            		}
        			});
        		}
        	};
        	
        	//기본 셀렉트 박스 데이터 조회 end
        	
        	$scope.resetSearchFiled = function(){
    			$rootScope.semester.searchUnivArea		= null;
    			$rootScope.semester.searchUniv			= null;
    			$rootScope.semester.searchYear			= null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.semester.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
        			$rootScope.semester.searchUniv = $rootScope.userSession.univCode;
        			
        			$scope.diabledSelectUniv();
        			
        		}
        	};
        	
        	/**
        	 * 학기 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(redrawPage){
        		var param = {
    	        	searchUnivArea		:	$rootScope.semester.searchUnivArea,
    	        	searchUniv			:	$rootScope.semester.searchUniv,
    	        	searchYear 			:	$rootScope.semester.searchYear,
    	        	sort				:	$rootScope.semester.sort,
    	        	order				:	$rootScope.semester.order,
    	        	//isPaging			: 	'Y',
    	        	nowPage				:	isNull(pagingGlobalVar["semesterListPaging"])? 1 : pagingGlobalVar["semesterListPaging"].nowPage,
    	        	rowCnt				:	$rootScope.semester.maxRowCnt,
        		};
        		
        		semesterService.getSemesterList(param, function(data){
        			$rootScope.semester.searchYn = "Y";
					$rootScope.semester.semesterList = data.semesterList;
					if(data.semesterList.length > 0){
						var totCnt = data.semesterList[0].totalCnt*1;
						var nowPage = $rootScope.semester.nowPage*1;
						var maxRowCnt = $rootScope.semester.maxRowCnt*1;
						$rootScope.semester.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.semester.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["semesterListPaging"]) || redrawPage){
							$("#semesterListPaging").html("");
							$("#semesterListPaging").createPaging({
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
						$rootScope.semester.totalCnt = 0;
					}
        		});
        	};
        	
        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
            ){
    			$rootScope.semester.searchUnivArea = $rootScope.userSession.univAreaCd;
    			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
    			$rootScope.semester.searchUniv = $rootScope.userSession.univCode;
    			
    			$scope.diabledSelectUniv();
    			
    		}
        	
        	//페이지 로드시 학기 목록을 조회하기 위함.
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
        		
        		$rootScope.semester.sort = sort;
        		$rootScope.semester.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
            /**
             * 학기 목록 전체 체크박스 컨트롤
             */
            $scope.checkAllSemesterList = function(){
        		$.each($rootScope.semester.semesterList, function(i){
        			$rootScope.semester.semesterList[i].isChecked = $rootScope.semester.isCheckedAll;
            	});
            };
            
            /**
             * 학기 목록 체크박스
             */
            $scope.checkSemesterList = function(idx){
            	var semesterInfo = $rootScope.semester.semesterList[idx];
            	var param = semesterInfo;
            	param.toCheckList = "Y";
            	
            	semesterService.saveSemesterInfo(param, function(data) {
					if(data.resultCode == "0"){
						$scope.getSemesterListView();
						$scope.search(true);
						
					}else{
						commonService.serverError(data);
						
					}
				});
            };
            
            /**
             * 학기 정보 목록 페이지 이동
             */
            $scope.getSemesterListView = function(){
            	$rootScope.semester.pageViewType = "list";
            	$rootScope.semester.semesterInfo = {};
            };
            
            /**
             * 학기 정보 등록/수정 페이지 이동
             */
            $scope.saveSemesterView = function(semesterInfo, idx){
            	$rootScope.semester.pageViewType = "modify";
            	
            	//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.semester.semesterInfo.univAreaCode = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("univAreaCode", "newUnivCode", $rootScope.userSession.univCode);
        			$rootScope.semester.semesterInfo.newUnivCode = $rootScope.userSession.univCode;
        			
        			$("[ng-model='$root.semester.semesterInfo.univAreaCode']").attr("disabled", true);
        			$("[ng-model='$root.semester.semesterInfo.newUnivCode']").attr("disabled", true);
        			
        		}
            	
            	if(!isNull(semesterInfo)){
            		var param = {
            				semesterCode : semesterInfo.semesterCode,
            				year : semesterInfo.year,
            				univCode : semesterInfo.univCode
            		};
            		semesterService.getSemesterInfo(param, function(data){
            			$rootScope.semester.semesterInfo = data.semesterInfo;
            			
            			if($rootScope.semester.semesterInfo.univCode.indexOf("|") > -1){
            				var univCodeArr = $rootScope.semester.semesterInfo.univCode.split("|");
            				if(univCodeArr.length > 1){
            					$rootScope.semester.semesterInfo.univAreaCode = univCodeArr[0];
            					$rootScope.semester.semesterInfo.univCode = univCodeArr[1];
            				}
            			}
            			
            			var semesterStartDay = $rootScope.semester.semesterInfo.semesterStartDay;
            			var semesterEndDay = $rootScope.semester.semesterInfo.semesterEndDay;
            			if(semesterStartDay.length == 8){ $rootScope.semester.semesterInfo.semesterStartDay = semesterStartDay.substring(0,4)+"."+semesterStartDay.substring(4,6)+"."+semesterStartDay.substring(6,8); }
            			if(semesterEndDay.length == 8){ $rootScope.semester.semesterInfo.semesterEndDay = semesterEndDay.substring(0,4)+"."+semesterEndDay.substring(4,6)+"."+semesterEndDay.substring(6,8); }
            			
            			$scope.getChildCdList("univAreaCode", "newUnivCode", $rootScope.semester.semesterInfo.univCode);
            			$rootScope.semester.semesterInfo.newUnivCode = $rootScope.semester.semesterInfo.univCode; 
            			$rootScope.semester.semesterInfo.newSemesterCode = $rootScope.semester.semesterInfo.semesterCode; 
            			$rootScope.semester.semesterInfo.newYear = $rootScope.semester.semesterInfo.year;
            		
            		});
            	}else{
            		$rootScope.semester.semesterInfo.displayYn = "N";
            		$rootScope.semester.semesterInfo.regUserName = $rootScope.userSession.userName;
					$rootScope.semester.semesterInfo.regUserSeq = $rootScope.userSession.userSeq;
            	}
            };
            
            /**
        	 * 학기 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if($rootScope.semester.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    	        	searchUnivArea		:	$rootScope.semester.searchUnivArea,
    	        	searchUniv			:	$rootScope.semester.searchUniv,
    	        	searchYear 			:	$rootScope.semester.searchYear,
    	        	sort				:	$rootScope.semester.sort,
    	        	order				:	$rootScope.semester.order,
    	        	isPaging			: 	'N',
        		};
        		
        		$("<input></input>").attr({type:"hidden", name:"searchUnivArea",	value:param.searchUnivArea	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUniv",		value:param.searchUniv		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchYear",		value:param.searchYear		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sort",				value:param.sort			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"order",				value:param.order			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"isPaging",			value:"N"					}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sortOnly",			value:"Y"					}).appendTo($("#excelForm"));
        		
        		$("#excelForm").attr("action", Const.contextPath + "semester/downloadSemesterList.do").submit();
        		$("#excelForm").html("");
        	};
        	
        	$scope.addSemester = function(){
        		
        	};
        	
            /**
             * 학기 정보 저장 버튼
             */
            $scope.saveSemesterInfo = function() {
            	if($scope.checkValidate()){
            		commonService.confirm('학기를 저장 하시겠습니까?', function() {
            			var	param = {
            					semesterCode	: $rootScope.semester.semesterInfo.semesterCode,
	        					year			: $rootScope.semester.semesterInfo.year,
	        					univCode		: $rootScope.semester.semesterInfo.univCode,
	        					newSemesterCode	: $rootScope.semester.semesterInfo.newSemesterCode,
	        					newYear			: $rootScope.semester.semesterInfo.newYear,
	        					newUnivCode		: $rootScope.semester.semesterInfo.newUnivCode,
	        					semesterStartDay: $rootScope.semester.semesterInfo.semesterStartDay.replace(/[^0-9]/gi,""),
	        					semesterEndDay	: $rootScope.semester.semesterInfo.semesterEndDay.replace(/[^0-9]/gi,""),
	        					displayYn		: $rootScope.semester.semesterInfo.displayYn,
	        					regUserSeq		: $rootScope.semester.semesterInfo.regUserSeq,
            			};
            			
        				semesterService.saveSemesterInfo(param, function(data) {
        					if(data.resultCode == "0"){
        						$scope.getSemesterListView();
        						$scope.search(true);
        					}else if(data.resultCode == "SM00"){
        						commonService.alert("선택한 년도/학기가 이미 등록되어 있습니다.", $("[ng-model='$root.semester.semesterInfo.semesterCode']").focus());
        					}else if(data.resultCode == "SM01"){
								param.displayOverride = "Y";
        						commonService.confirm("기존에 노출설정된 학기를 해제하고 현재 등록되는 학기를 노출하시겠습니까?"
        							,function(){ // 확인버튼 클릭
        								param.exposedUnivCode = param.newUnivCode;
        								semesterService.saveSemesterInfo(param, function(data2){
        									if(data2.resultCode == "0"){
        										$scope.getSemesterListView();
        										$scope.search(true);
        									}else{
        										commonService.serverError(data2);
        									}
        								});
        							},function(){ // 닫기버튼 클릭
        								semesterService.saveSemesterInfo(param, function(data2){
        									if(data2.resultCode == "0"){
        										$scope.getSemesterListView();
        										$scope.search(true);
        									}else{
        										commonService.serverError(data2);
        									}
        								});
        							}
        						);
        					}else{
        						commonService.serverError(data);
        					}
        				});
            		});
            	}
            }
            
            /**
             * 학기 정보 validate check
             */
            $scope.checkValidate = function(){
        		if(isNull($rootScope.semester.semesterInfo.univAreaCode)){
        			commonService.alert("학교 구분을 선택해주세요.", $("[ng-model='$root.semester.semesterInfo.univAreaCode']").focus());
        			return false;
        		}
        		
        		if(isNull($rootScope.semester.semesterInfo.newUnivCode)){
        			commonService.alert("학교 구분을 선택해주세요.", $("[ng-model='$root.semester.semesterInfo.newUnivCode']").focus());
        			return false;
        		}
        		
        		if(isNull($rootScope.semester.semesterInfo.newYear)){
        			commonService.alert("년도를 선택해주세요..", $("[ng-model='$root.semester.semesterInfo.newYear']").focus());
        			return false;
        		}
        		
        		if(isNull($rootScope.semester.semesterInfo.newSemesterCode)){
        			commonService.alert("학기를 선택해주세요.", $("[ng-model='$root.semester.semesterInfo.newSemesterCode']").focus());
        			return false;
        		}
        		
        		if(isNull($rootScope.semester.semesterInfo.semesterStartDay)){
        			commonService.alert("학기 시작 기간을 선택해주세요.");
        			return false;
        		}else{
        			if(!isNull($rootScope.semester.semesterInfo.semesterEndDay)){
        				if($rootScope.semester.semesterInfo.semesterStartDay > $rootScope.semester.semesterInfo.semesterEndDay){
        					commonService.alert("학기 시작일이 종료일보다 뒤에 있을 수 없습니다.");
                			return false;
        				} 
        			}
        		}
        		
        		if(isNull($rootScope.semester.semesterInfo.semesterEndDay)){
        			commonService.alert("학기 종료 기간을 선택해주세요.");
        			return false;
        		}
        		
            	return true;
            }
            
            /**
             * 학기 정보 삭제 버튼
             */
            $scope.deleteSemesterInfo = function() {
        		commonService.confirm('삭제 하시겠습니까?', function() {
        			var	param = {
        					semesterCode	: $rootScope.semester.semesterInfo.semesterCode,
        					year			: $rootScope.semester.semesterInfo.year,
        					univCode		: $rootScope.semester.semesterInfo.univCode,
        			};
        			
    				semesterService.deleteSemesterInfo(param, function(data) {
    					$scope.getSemesterListView();
    					$scope.search(true);
    				});
        		});
            }
            /********** 학기 정보 수정 관련 end **********/
        });
})());