((function() {
    angular.module('appModule')
        .controller('registScoreInCtrl', function($scope, $rootScope, exchangeResultService, commonService, Const, ngDialog, FileUploader) {
        	$rootScope.exchange.scoreIn.scope = $scope;
    		
        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.exchange.scoreIn.searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.exchange.scoreIn.searchUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
        	
            /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.exchange.scoreIn[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv" || childModel == "searchUserUniv"){
        			if(isNull($rootScope.exchange.scoreIn[parentModel])) {
        				$rootScope.exchange.scoreIn[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				$rootScope.exchange.scoreIn[childModel] = "";
        				return;
        			}
        			commonService.getCodeList($rootScope.exchange.scoreIn[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.exchange.scoreIn[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.exchange.scoreIn[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)){
                				$rootScope.exchange.scoreIn[childModel] = $rootScope.exchange.scoreIn[childModel+"List"][0].code;
                			}else{
                				$rootScope.exchange.scoreIn[childModel] = defaultValue;
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
        	if($rootScope.exchange.scoreIn.searchYearList.length == 0){
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()-2;
	        	for(var i = nowDate.getFullYear(); i >= curYear; i--) {
	    	 	   	$rootScope.exchange.scoreIn.searchYearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.exchange.scoreIn.searchYear = nowDate.getFullYear()+"";
        	}
            
            //학기 분류 목록 조회
        	if($rootScope.exchange.scoreIn.searchSemesterCodeList.length == 0){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.scoreIn.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
        				$rootScope.exchange.scoreIn.searchSemesterCode = $rootScope.exchange.scoreIn.searchSemesterCodeList[0].code;
        				$rootScope.exchange.scoreIn.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //학년 분류 목록 조회
        	if($rootScope.exchange.scoreIn.searchStudentGradeCodeList.length == 0){
            	commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.scoreIn.searchStudentGradeCodeList = [];
            			$rootScope.exchange.scoreIn.searchStudentGradeCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.scoreIn.searchStudentGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
        	
        	//학교 지역 목록
        	if($rootScope.exchange.scoreIn.searchUnivAreaList.length == 0){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.scoreIn.searchUserUnivAreaList = [];
            			$rootScope.exchange.scoreIn.searchUserUnivAreaList.push({code:"", codeName:"지역 전체"});

            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.scoreIn.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});

            				$rootScope.exchange.scoreIn.searchUserUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});

                    	//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
                			$rootScope.exchange.scoreIn.searchUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode, function(){
                				$rootScope.exchange.scoreIn.searchUniv = $rootScope.userSession.univCode;

                				$scope.diabledSelectUniv();

                    			$rootScope.exchange.scoreIn.isUnivComplete = true;
	        					$scope.initSearch();
                			});
                		} else {
	            			$rootScope.exchange.scoreIn.searchUnivArea = $rootScope.exchange.scoreIn.searchUnivAreaList[0].code;
	            			$scope.getChildCdList("searchUnivArea", "searchUniv", null, function(data){
	        					$rootScope.exchange.scoreIn.searchUniv = $rootScope.exchange.scoreIn.searchUnivList[1].code;
	        					$rootScope.exchange.scoreIn.isUnivComplete = true;
	        					$scope.initSearch();
	            			});
                		}
            		}
            	});
            };
        	//기본 셀렉트 박스 데이터 조회 end
            	
            // 검색 조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.exchange.scoreIn.searchStudentGradeCode	= "";
    			$rootScope.exchange.scoreIn.searchUserUnivArea		= $rootScope.exchange.scoreIn.searchUserUnivAreaList[0].code;
    			$rootScope.exchange.scoreIn.searchUserUnivList		= [{code : "", codeName : "대학교 전체"}];
    			$rootScope.exchange.scoreIn.searchUserUniv			= "";
    			$rootScope.exchange.scoreIn.searchYear				= $rootScope.exchange.scoreIn.searchYearList[0].code+"";
    			$rootScope.exchange.scoreIn.searchSemesterCode		= $rootScope.exchange.scoreIn.searchSemesterCodeList[0].code;
    			$rootScope.exchange.scoreIn.searchType				= "";
    			$rootScope.exchange.scoreIn.searchKey				= "";
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        			$rootScope.exchange.scoreIn.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode, function(){
        				$rootScope.exchange.scoreIn.searchUniv = $rootScope.userSession.univCode;
        				
        				$scope.diabledSelectUniv();

        				$rootScope.exchange.scoreIn.isUnivComplete = true;
        			});
        		} else {
        			$rootScope.exchange.scoreIn.searchUnivArea = $rootScope.exchange.scoreIn.searchUnivAreaList[1].code;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.exchange.scoreIn.searchUnivArea, function(data){
    					$rootScope.exchange.scoreIn.searchUniv = $rootScope.exchange.scoreIn.searchUnivList[1].code;
    					$rootScope.exchange.scoreIn.isUnivComplete = true;
        			});
        		}
        	};
        	
        	/**
        	 * 성적정보 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(redrawPage){
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.scoreIn.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.scoreIn.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.scoreIn.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.scoreIn.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.scoreIn.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.scoreIn.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.scoreIn.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.scoreIn.searchType,
    	        	searchKey				:	$rootScope.exchange.scoreIn.searchKey,
    	        	isSearchScore			:	'Y',
    	        	sort					:	$rootScope.exchange.scoreIn.sort,
    	        	order					:	$rootScope.exchange.scoreIn.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["exchangeResultListPaging"]) || redrawPage ? 1 : pagingGlobalVar["exchangeResultListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.exchange.scoreIn.maxRowCnt,
        		};
        		
        		exchangeResultService.getExchangeResultList(param, function(data){
        			$rootScope.exchange.scoreIn.searchYn = "Y";
					$rootScope.exchange.scoreIn.exchangeResultList = data.exchangeResultList;
					if(data.exchangeResultList.length > 0){
						var totCnt = data.exchangeResultList[0].totalCnt*1;
						var nowPage = $rootScope.exchange.scoreIn.nowPage*1;
						var maxRowCnt = $rootScope.exchange.scoreIn.maxRowCnt*1;
						$rootScope.exchange.scoreIn.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.exchange.scoreIn.nowPage = nowPage;
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
						$rootScope.exchange.scoreIn.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 최초 로드시 성적정보 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.exchange.scoreIn.isUnivComplete && $rootScope.exchange.scoreIn.isSemesterComplete) {
                	$scope.search(false);
        		}
        	};

        	//페이지 재 로드시 성적정보 목록을 조회하기 위함.
        	if($rootScope.exchange.scoreIn.isUnivComplete && $rootScope.exchange.scoreIn.isSemesterComplete) {
            	$scope.search(false);
    		}

        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        		if($rootScope.exchange.scoreIn.isUnivComplete && $rootScope.exchange.scoreIn.isSemesterComplete) {
        			$scope.diabledSelectUniv();
    			}
    		}
        	
        	/**
        	 * 성적 정보 팝업창
        	 */
        	$scope.getRegistScoreInfo = function(seq) {
        		var param = { exchangeResultSeq : seq, isSearchScore : 'Y' };
        		
        		ngDialog.open({
                    template: Const.contextPath + 'html/exchange/registScoreInfoPopup.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 712,
                    controller: function($scope) {
                    	exchangeResultService.getExchangeResultInfo(param, function(data) {
                        	$rootScope.exchange.registScoreInfo = data.exchangeResultInfo;
                        	$rootScope.exchange.scorePageType = 'in';
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
        		
        		$rootScope.exchange.scoreIn.sort = sort;
        		$rootScope.exchange.scoreIn.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(false);
        	};
        	
            /**
        	 * 성적 등록(IN) 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(excelType){
        		if($rootScope.exchange.scoreIn.searchYn != "Y"){
        			$scope.search(false);
            	}
        		
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.scoreIn.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.scoreIn.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.scoreIn.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.scoreIn.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.scoreIn.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.scoreIn.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.scoreIn.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.scoreIn.searchType,
    	        	searchKey				:	$rootScope.exchange.scoreIn.searchKey,
    	        	isSearchScore			:	'Y',
    	        	excelType				:	excelType,
    	        	filePath				:	'resources/template/upload_grade_result.xlsx',
    	        	sort					:	excelType=='upload' ? 'userUnivCode':$rootScope.exchange.scoreIn.sort,
    	        	order					:	excelType=='upload' ? 'asc':$rootScope.exchange.scoreIn.order,
    	        	isPaging				: 	excelType=='upload' ? 'Y':'N',
    	        	sortOnly				: 	excelType=='upload' ? 'Y':'N'
        		};

        		$("#excelForm").html('');
        		$.each(param, function(key, value){
        			$("<input></input>").attr({type:"hidden", name:key, value:value}).appendTo($("#excelForm"));
        		});
        		
        		$("#excelForm").attr("action", Const.contextPath + "exchangeResult/downRegistScoreInList.do").submit();
        		$("#excelForm").html("");
        	};
        	
        	/**
             * 검색영역 validate check
             */
            $scope.checkValidateSearch = function(){
			    if(isNull($rootScope.exchange.scoreIn.searchYear)){
					commonService.alert("검색영역에서 년도를 선택해주세요.");
					return false
				}
				
				if(isNull($rootScope.exchange.scoreIn.searchSemesterCode)){
					commonService.alert("검색영역에서 학기를 선택해주세요.");
					return false;
				}
				
				if(isNull($rootScope.exchange.scoreIn.searchUniv)){
					commonService.alert("검색영역에서 학교구분의 대학을 선택해주세요.");
					return false;
				}
				return true;
            }

            /**
             * 업로드 양식 다운로드
             */
			$scope.downloadDocForm = function() {
				window.location.href = Const.contextPath + 'resources/template/upload_grade_result.xlsx';
				//$scope.excelDown('upload');
			};
            
            /**
             * 성적 정보 업로드
             */
            $scope.uploadScoreDataPop = function() {
            	if(!$scope.checkValidateSearch()){
        			return;
        		}
            	ngDialog.open({
                    template: Const.contextPath + 'html/exchange/uploadFormOfRegistScore.html',
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
                                url: Const.contextPath + 'exchangeResult/uploadScoreData.ajax',
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
    					$scope.uploadScoreData = function() {
    						$scope.uploader.formData = [];
            				$.each($scope.uploader.queue, function(i, item){
            					item.formData.push({univCode : $rootScope.exchange.scoreIn.searchUniv});
        						item.formData.push({year : $rootScope.exchange.scoreIn.searchYear});
        						item.formData.push({semesterCode : $rootScope.exchange.scoreIn.searchSemesterCode});

        						item.onSuccess = function(response) {
                					if(response.resultCode == "0"){
                						commonService.alert('저장되었습니다.',function(){
                							$scope.closeLayerPopup();
                    						$rootScope.exchange.scoreIn.scope.search(true);
                						});
                					}else{
                						$scope.closeLayerPopup();
                						$rootScope.exchange.scoreIn.scope.resultScoreUploadPop(response);
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
             * 성적 업로드 결과
             */
            $scope.resultScoreUploadPop = function(resultData) {
            	ngDialog.open({
                    template: Const.contextPath + 'html/exchange/uploadResultOfExchangeResult.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 800,
                    controller: function($rootScope, $scope, commonService, $cookies, Const, FileUploader) {
                    	var tempList = null;
                    	$scope.checkResultList = resultData.checkResultList;
                    	
                    	$scope.getFieldNames = function(cellNameBfr){
                    		var cellNameAftr = "";
                    		switch(cellNameBfr){
	                    		case "userUnivCode": cellNameAftr = "소속대학"; break;
	                    		case "studentNumber": cellNameAftr = "소속대학 학번"; break;
	                    		case "subjectNum": cellNameAftr = "성명"; break;
	                    		case "subjectNum": cellNameAftr = "교과번호"; break;
	                    		case "subjectNum": cellNameAftr = "이수구분"; break;
	                    		case "subjectNum": cellNameAftr = "과목명"; break;
	                    		case "subjectNum": cellNameAftr = "학점"; break;
	                    		case "classNum": cellNameAftr = "분반"; break;
	                    		case "subjectDepartment": cellNameAftr = "교류대학 학과"; break;
	                    		case "teacherName": cellNameAftr = "담당교수"; break;
	                    		case "mouStudentNumber": cellNameAftr = "교류대학 학번"; break;
	                    		case "subjectNameEn": cellNameAftr = "과목명 영문"; break;
	                    		case "score": cellNameAftr = "성적"; break;
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
        	
        	/**
        	 * 성적 저장
        	 */
        	$scope.saveScore = function(exchangeResultInfo) {
        		var seq = exchangeResultInfo.exchangeResultSeq;

        		if(!$scope.checkValidateSearch()){
        			return false;
        		}

            	if(isNull($('#score_'+seq).val())) {
        			commonService.alert("성적을 입력해주세요.", function(){
        				$('#score_'+seq).focus();
        			});
                    return false;
        		}

            	if(parseInt($('#score_'+seq).val()) > 100) {
        			commonService.alert("성적을 100 이하로 입력해주세요.", function(){
        				$('#score_'+seq).focus();
        			});
                    return false;
        		}

        		commonService.confirm('성적을 저장 하시겠습니까?', function() {
        			
	        		var param = { 
	        			univCode			: $rootScope.exchange.scoreIn.searchUniv,
	    	        	year 				: $rootScope.exchange.scoreIn.searchYear,
	    	        	semesterCode		: $rootScope.exchange.scoreIn.searchSemesterCode,
	    	        	subjectNum			: exchangeResultInfo.subjectNum,
	    	        	classNum			: exchangeResultInfo.classNum,
	    	        	userUnivCode		: exchangeResultInfo.userUnivCode,
	    	        	studentNumber		: exchangeResultInfo.studentNumber,
	        			exchangeResultSeq	: seq,
	        			score				: $('#score_'+seq).val()
	        		};
	        		
	            	exchangeResultService.saveScore(param, function(data) {
						$scope.search();
	                });
        		});
        	}

        });
})());