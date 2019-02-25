((function() {
    angular.module('appModule')
        .controller('exchangeResultInCtrl', function($scope, $rootScope, exchangeResultService, commonService, Const, ngDialog, FileUploader) {
        	$rootScope.exchange.resultIn.scope = $scope;
    		
        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.exchange.resultIn.searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.exchange.resultIn.searchUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
        	
            /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.exchange.resultIn[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv" || childModel == "searchUserUniv"){
        			if(isNull($rootScope.exchange.resultIn[parentModel])) {
        				$rootScope.exchange.resultIn[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				$rootScope.exchange.resultIn[childModel] = "";
        				return;
        			}
        			commonService.getCodeList($rootScope.exchange.resultIn[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.exchange.resultIn[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.exchange.resultIn[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)){
                				$rootScope.exchange.resultIn[childModel] = $rootScope.exchange.resultIn[childModel+"List"][0].code;
                			}else{
                				$rootScope.exchange.resultIn[childModel] = defaultValue;
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
        	if($rootScope.exchange.resultIn.searchYearList.length == 0){
        		//$rootScope.exchange.resultIn.searchYearList = [{code : "", codeName : "전체"}];
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()-2;
	        	for(var i = nowDate.getFullYear(); i >= curYear; i--) {
	    	 	   	$rootScope.exchange.resultIn.searchYearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.exchange.resultIn.searchYear = nowDate.getFullYear()+"";
        	}
            
            //학기 분류 목록 조회
        	if($rootScope.exchange.resultIn.searchSemesterCodeList.length == 0){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			//$rootScope.exchange.resultIn.searchSemesterCodeList = [];
            			//$rootScope.exchange.resultIn.searchSemesterCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.resultIn.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
        				$rootScope.exchange.resultIn.searchSemesterCode = $rootScope.exchange.resultIn.searchSemesterCodeList[0].code;
        				$rootScope.exchange.resultIn.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //학년 분류 목록 조회
        	if($rootScope.exchange.resultIn.searchStudentGradeCodeList.length == 0){
            	commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.resultIn.searchStudentGradeCodeList = [];
            			$rootScope.exchange.resultIn.searchStudentGradeCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.resultIn.searchStudentGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
        	
        	//학교 지역 목록
        	if($rootScope.exchange.resultIn.searchUnivAreaList.length == 0){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			//$rootScope.exchange.resultIn.searchUnivAreaList = [];
            			//$rootScope.exchange.resultIn.searchUnivAreaList.push({code:"", codeName:"지역 전체"});

            			$rootScope.exchange.resultIn.searchUserUnivAreaList = [];
            			$rootScope.exchange.resultIn.searchUserUnivAreaList.push({code:"", codeName:"지역 전체"});

            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.resultIn.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});

            				$rootScope.exchange.resultIn.searchUserUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});

                    	//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
                			$rootScope.exchange.resultIn.searchUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode, function(){
                				$rootScope.exchange.resultIn.searchUniv = $rootScope.userSession.univCode;

                				$scope.diabledSelectUniv();

                    			$rootScope.exchange.resultIn.isUnivComplete = true;
	        					$scope.initSearch();
                			});
                		} else {
	            			$rootScope.exchange.resultIn.searchUnivArea = $rootScope.exchange.resultIn.searchUnivAreaList[0].code;
	            			$scope.getChildCdList("searchUnivArea", "searchUniv", null, function(data){
	        					$rootScope.exchange.resultIn.searchUniv = $rootScope.exchange.resultIn.searchUnivList[1].code;
	        					$rootScope.exchange.resultIn.isUnivComplete = true;
	        					$scope.initSearch();
	            			});
                		}
            		}
            	});
            };
        	//기본 셀렉트 박스 데이터 조회 end
            	
            // 검색 조건 초기화
        	$scope.resetSearchFiled = function(){
        		$rootScope.exchange.resultIn.searchStudentGradeCode	= "";
    			$rootScope.exchange.resultIn.searchYear				= $rootScope.exchange.resultIn.searchYearList[0].code+"";
    			$rootScope.exchange.resultIn.searchSemesterCode		= $rootScope.exchange.resultIn.searchSemesterCodeList[0].code;
    			$rootScope.exchange.resultIn.searchType				= "";
    			$rootScope.exchange.resultIn.searchKey					= "";
    			$rootScope.exchange.resultIn.searchUserUnivArea 		= null;
    			$rootScope.exchange.resultIn.searchUserUniv 			= null;
    			$rootScope.exchange.resultIn.searchUserUnivList 		= [{code : "", codeName : "대학교 전체"}];
        		
        		
        		//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        			$rootScope.exchange.resultIn.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode, function(){
        				$rootScope.exchange.resultIn.searchUniv = $rootScope.userSession.univCode;
        				
        				$scope.diabledSelectUniv();

        				$rootScope.exchange.resultIn.isUnivComplete = true;
        			});
        		} else {
        			$rootScope.exchange.resultIn.searchUnivArea = $rootScope.exchange.resultIn.searchUnivAreaList[1].code;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.resultIn.searchUnivArea, function(data){
    					$rootScope.exchange.resultIn.searchUniv = $rootScope.exchange.resultIn.searchUnivList[1].code;
    					$rootScope.exchange.resultIn.isUnivComplete = true;
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
    	        	searchUnivArea			:	$rootScope.exchange.resultIn.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.resultIn.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.resultIn.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.resultIn.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.resultIn.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.resultIn.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.resultIn.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.resultIn.searchType,
    	        	searchKey				:	$rootScope.exchange.resultIn.searchKey,
    	        	sort					:	$rootScope.exchange.resultIn.sort,
    	        	order					:	$rootScope.exchange.resultIn.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["exchangeResultListPaging"]) || redrawPage ? 1 : pagingGlobalVar["exchangeResultListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.exchange.resultIn.maxRowCnt,
        		};
        		
        		exchangeResultService.getExchangeResultList(param, function(data){
        			$rootScope.exchange.resultIn.searchYn = "Y";
					$rootScope.exchange.resultIn.exchangeResultList = data.exchangeResultList;
					if(data.exchangeResultList.length > 0){
						var totCnt = data.exchangeResultList[0].totalCnt*1;
						var nowPage = $rootScope.exchange.resultIn.nowPage*1;
						var maxRowCnt = $rootScope.exchange.resultIn.maxRowCnt*1;
						$rootScope.exchange.resultIn.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.exchange.resultIn.nowPage = nowPage;
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
						$rootScope.exchange.resultIn.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 최초 로드시 수강결과 등록 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.exchange.resultIn.isUnivComplete && $rootScope.exchange.resultIn.isSemesterComplete) {
                	$scope.search(false);
        		}
        	};

        	//페이지 재 로드시 수강결과 등록 목록을 조회하기 위함.
        	if($rootScope.exchange.resultIn.isUnivComplete && $rootScope.exchange.resultIn.isSemesterComplete) {
            	$scope.search(false);
    		}

        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        		if($rootScope.exchange.resultIn.isUnivComplete && $rootScope.exchange.resultIn.isSemesterComplete) {
        			$scope.diabledSelectUniv();
    			}
    		}
        	
        	/**
        	 * 수강결과 등록 정보 팝업창
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
                        	$rootScope.exchange.resultPageType = 'in';
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
        		
        		$rootScope.exchange.resultIn.sort = sort;
        		$rootScope.exchange.resultIn.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
            /**
        	 * 수강결과 등록(IN) 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if($rootScope.exchange.resultIn.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.resultIn.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.resultIn.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.resultIn.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.resultIn.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.resultIn.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.resultIn.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.resultIn.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.resultIn.searchType,
    	        	searchKey				:	$rootScope.exchange.resultIn.searchKey,
    	        	sort					:	$rootScope.exchange.resultIn.sort,
    	        	order					:	$rootScope.exchange.resultIn.order,
    	        	isPaging				: 	'N'
        		};

        		$("#excelForm").html('');
        		$.each(param, function(key, value){
        			$("<input></input>").attr({type:"hidden", name:key, value:value}).appendTo($("#excelForm"));
        		});
        		
        		$("#excelForm").attr("action", Const.contextPath + "exchangeResult/downResultInList.do").submit();
        		$("#excelForm").html("");
        	};
        	
            $scope.getApplyResultStatus = function(idx) {
            	var exchangeResultInfo = {};
            	var resultStr = "";
            	if(!isNull(idx)){
            		exchangeResultInfo = $rootScope.exchange.resultIn.exchangeResultList[idx];
            	}else{
            		exchangeResultInfo = $rootScope.exchange.resultIn.exchangeResultInfo;
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
        	
        	/**
             * 검색영역 validate check
             */
            $scope.checkValidateSearch = function(){
			    if(isNull($rootScope.exchange.resultIn.searchYear)){
					commonService.alert("검색영역에서 년도를 선택해주세요.");
					return false
				}
				
				if(isNull($rootScope.exchange.resultIn.searchSemesterCode)){
					commonService.alert("검색영역에서 학기를 선택해주세요.");
					return false;
				}
				
				if(isNull($rootScope.exchange.resultIn.searchUniv)){
					commonService.alert("검색영역에서 학교구분의 대학을 선택해주세요.");
					return false;
				}
				return true;
            }

            /**
             * 업로드 양식 다운로드
             */
			$scope.downloadDocForm = function() {
				window.location.href = Const.contextPath + 'resources/template/upload_exchange_result.xlsx';
			};
            
            /**
             * 수강결과 정보 업로드
             */
            $scope.uploadExchangeResultDataPop = function() {
            	if(!$scope.checkValidateSearch()){
        			return;
        		}
            	ngDialog.open({
                    template: Const.contextPath + 'html/exchange/uploadFormOfExchangeResult.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 740,
                    controller: function($rootScope, $scope, commonService, $cookies, Const, FileUploader) {
                    	$scope.uploader = null;
                    	/**
                         * 업로더 설정
                         */
                        if (!$scope.uploader) {
                            $scope.uploader = new FileUploader({
                                url: Const.contextPath + 'exchangeResult/uploadExchangeResultData.ajax',
                                filters: [
                                    {
                                        name: 'fileSizeFilter',
                                        fn: function (file) {
                                            if (file.size > 10485760) {
                                                commonService.alert('업로드 파일 용량은 10MB 이하만 가능합니다.');
                                                return false;
                                            } else {
                                                return true;
                                            }
                                        }
                                    }, {
                                        name: 'extensionFilter',
                                        fn: function (file) {
                                            var re = /(?:\.([^.]+))?$/;
                                            var ext = re.exec(file.name)[1];
                                            var isAllow = false;

                                            if (ext) {
                                                switch (ext.toUpperCase()) {
                                                    case 'XLSX':
                                                    case 'XLS':
                                                        isAllow = true;
                                                        break;
                                                }
                                            }

                                            if (!isAllow) {
                                                commonService.alert('xlsx, xls파일만 업로드 가능합니다.');
                                            }

                                            return isAllow;
                                        }
                                    }
                                ], onBeforeAddQueue: function (files, options, filters) {
                                    console.log('queue => ', this.queue);
                                    if (this.queue.length !== 0 && files.length > 0) {
                                        this.clearQueue();
                                    }

                                    this.addToQueue(files, options, filters);
                                }
                            });
                        };
                        
                        /**
                         * 일괄 업로드
                         */
    					$scope.uploadExchangeResultData = function() {
    						$scope.uploader.formData = [];
            				$.each($scope.uploader.queue, function(i, item){
            					item.formData.push({univCode : $rootScope.exchange.resultIn.searchUniv});
        						item.formData.push({year : $rootScope.exchange.resultIn.searchYear});
        						item.formData.push({semesterCode : $rootScope.exchange.resultIn.searchSemesterCode});

        						item.onSuccess = function(response) {
                					if(response.resultCode == "0"){
                						commonService.alert('저장되었습니다.',function(){
                							$scope.closeLayerPopup();
                    						$rootScope.exchange.resultIn.scope.search(true);
                						});
                					}else{
                						$scope.closeLayerPopup();
                						$rootScope.exchange.resultIn.scope.resultSubjectBatchPop(response);
                					}
	                            };
	                            item.onError = function(response, status) {
	                                console.error('upload error status => ', status);
	                                commonService.etcError(response);
	                            };
            				});
            				/*
            				$scope.uploader.onCompleteAll = function(){
            					commonService.alert('저장되었습니다.');
            					$scope.getSemesterListWithGuideView();
        						$scope.search(true);
            				};
            				*/
                            $scope.uploader.uploadAll();
    					};
    					
                        $scope.closeLayerPopup = function() {
                        	$scope.uploader.clearQueue();
                        	$scope.closeThisDialog();
                        };
                    }
                });
            };
            
            /**
             * 수강결과 업로드 결과
             */
            $scope.resultSubjectBatchPop = function(resultData) {
            	ngDialog.open({
                    template: Const.contextPath + 'html/exchange/uploadResultOfExchangeResult.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 800,
                    controller: function($rootScope, $scope, commonService, $cookies, Const, FileUploader) {
                    	var tempList = null;
                    	/*$.each(resultData.checkResultList, function(i, resultInfo){
                    		if(isNull(resultInfo.failMap.classNum)){
                    			tempList = resultData.checkResultList.slice(0, (i));
                    			return false;
                    		}
                    	});*/
                    	//$scope.checkResultList = tempList;
                    	$scope.checkResultList = resultData.checkResultList;
                    	
                    	$scope.getFieldNames = function(cellNameBfr){
                    		var cellNameAftr = "";
                    		switch(cellNameBfr){
	                    		case "userUnivName": cellNameAftr = "학생의 소속대학"; break;
	                    		case "studentNumber": cellNameAftr = "학생의 소속대학 학번"; break;
	                    		case "userName": cellNameAftr = "성명"; break;
	                    		case "userGrade": cellNameAftr = "학년"; break;
	                    		case "subjectNum": cellNameAftr = "교과번호"; break;
	                    		case "classNum": cellNameAftr = "분반"; break;
	                    		case "changeSubjectNum": cellNameAftr = "변경 또는 신규 교과번호"; break;
	                    		case "changeClassNum": cellNameAftr = "변경 또는 신규 분반"; break;
	                    		case "changeCompleteType": cellNameAftr = "변경 또는 신규 이수구분"; break;
	                    		case "changeSubjectName": cellNameAftr = "변경 또는 신규 과목명"; break;
	                    		case "changeSubjectPoint": cellNameAftr = "변경 또는 신규 학점"; break;
                    		}
                    		return cellNameAftr;
                    	}
                    	
                        $scope.closeLayerPopup = function() {
                        	$scope.uploader.clearQueue();
                        	$scope.closeThisDialog();
                        };
                    }
                });
            };
        });
})());