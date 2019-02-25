((function() {
    angular.module('appModule')
        .controller('semesterAcceptGuideCtrl', function($scope, $rootScope, semesterAcceptGuideService, commonService, Const, ngDialog, FileUploader) {
        	$rootScope.semesterAcceptGuide.scope = $scope;
        	var currentDate = new Date();
			$scope.now = currentDate.getFullYear() + '.' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '.' + ('0' + currentDate.getDate()).slice(-2);
			
			$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.semesterAcceptGuide.searchUnivArea']").attr("disabled", true);
    				$("[ng-model='$root.semesterAcceptGuide.searchUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
			
			 /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.semesterAcceptGuide[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv" || childModel == "searchUserUniv"){
        			if(isNull($rootScope.semesterAcceptGuide[parentModel])) return;
        			commonService.getCodeList($rootScope.semesterAcceptGuide[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.semesterAcceptGuide[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.semesterAcceptGuide[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			$rootScope.semesterAcceptGuide[childModel] = $rootScope.semesterAcceptGuide[childModel+"List"][0].code;
                			if(isNull(defaultValue)){
                				$rootScope.semesterAcceptGuide[childModel] = $rootScope.semesterAcceptGuide[childModel+"List"][0].code;
                			}else{
                				$rootScope.semesterAcceptGuide[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.semesterAcceptGuide.semesterInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.semesterAcceptGuide.semesterInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.semesterAcceptGuide[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.semesterAcceptGuide[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			if(isNull(defaultValue)){
	            				$rootScope.semesterAcceptGuide.semesterInfo[childModel] = $rootScope.semesterAcceptGuide[childModel+"List"][0].code;
	            			}else{
                				$rootScope.semesterAcceptGuide.semesterInfo[childModel] = defaultValue;
                			}
	            		}
        			});
        		}
        	};

            //기본 셀렉트 박스 데이터 조회 start
        	//년도 세팅
        	if($rootScope.semesterAcceptGuide.searchYearList.length == 0){
        		//$rootScope.semesterAcceptGuide.searchYearList = [{code : "", codeName : "전체"}];
        		//$rootScope.semesterAcceptGuide.yearList = [{code : "", codeName : "년도 선택"}];
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()-2;
	            for(var i = nowDate.getFullYear(); i >= curYear; i--) {
	    	 	   	$rootScope.semesterAcceptGuide.searchYearList.push({code:i, codeName:i});
	    	 	   	$rootScope.semesterAcceptGuide.yearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.semesterAcceptGuide.searchYear = nowDate.getFullYear()+"";
        	}
            	
        	//학교 지역 목록
        	if($rootScope.semesterAcceptGuide.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.semesterAcceptGuide.searchUnivAreaList = [];
            			$rootScope.semesterAcceptGuide.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.semesterAcceptGuide.univAreaCodeList = [];
            			$rootScope.semesterAcceptGuide.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.semesterAcceptGuide.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.semesterAcceptGuide.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			
            			//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                        ){
                			$rootScope.semesterAcceptGuide.searchUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.semesterAcceptGuide.searchUnivArea, function(data){
                				$rootScope.semesterAcceptGuide.searchUniv = $rootScope.userSession.univCode;
                				$scope.diabledSelectUniv();
            					$rootScope.semesterAcceptGuide.isUnivComplete = true;
            					$scope.initSearch();
                			});
                			
                		}else{
                			$rootScope.semesterAcceptGuide.searchUnivArea = $rootScope.semesterAcceptGuide.searchUnivAreaList[1].code;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.semesterAcceptGuide.searchUnivArea, function(data){
            					$rootScope.semesterAcceptGuide.searchUniv = $rootScope.semesterAcceptGuide.searchUnivList[1].code;
            					$rootScope.semesterAcceptGuide.isUnivComplete = true;
            					$scope.initSearch();
                			});
                		}
            		}
            	});
            };
        	
        	//소속학교 지역 목록
        	if($rootScope.semesterAcceptGuide.searchUserUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.semesterAcceptGuide.searchUserUnivAreaList = [];
            			$rootScope.semesterAcceptGuide.searchUserUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.semesterAcceptGuide.userUnivAreaCodeList = [];
            			$rootScope.semesterAcceptGuide.userUnivAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.semesterAcceptGuide.searchUserUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.semesterAcceptGuide.userUnivAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
            
            //학기 분류 목록 조회
        	if($rootScope.semesterAcceptGuide.searchSemesterCodeList.length == 1){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.semesterAcceptGuide.searchSemesterCodeList = [];
            			$rootScope.semesterAcceptGuide.searchSemesterCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.semesterAcceptGuide.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			$rootScope.semesterAcceptGuide.searchSemesterCode = $rootScope.semesterAcceptGuide.searchSemesterCodeList[1].code;
            			console.log($rootScope.semesterAcceptGuide.searchSemesterCode);
            			$rootScope.semesterAcceptGuide.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //달력
    		$("[ng-model='$root.semesterAcceptGuide.semesterInfo.receiptStartDay']").datepicker(getDatePickerConfig("dateField"));
    		$("[ng-model='$root.semesterAcceptGuide.semesterInfo.receiptEndDay']").datepicker(getDatePickerConfig("dateField"));
    		
    		/**
             * 업로더 설정
             */
            if (!$rootScope.semesterAcceptGuide.uploader) {
                $rootScope.semesterAcceptGuide.uploader = new FileUploader({
                    url: Const.contextPath + 'semester/saveAcceptGuideInfoWithFile.ajax',
                    filters: [
                        {
                            name: 'fileSizeFilter',
                            fn: function (file) {
                                console.log('file => ', file);
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
                                        case 'PPT':
                                        case 'PPTX':
                                        case 'HWP':
                                        case 'DOC':
                                        case 'DOCX':
                                        case 'ZIP':
                                            isAllow = true;
                                            break;
                                    }
                                }

                                if (!isAllow) {
                                    commonService.alert('xlsx, xls, ppt, pptx, hwp, doc, docx 파일만 업로드 가능합니다.');
                                }

                                return isAllow;
                            }
                        }
                    ], onBeforeAddQueue: function (files, options, filters) {
                        console.log('queue => ', this.queue);
                        //if (this.queue.length !== 0 && files.length > 0) {
                            //this.clearQueue();
                        //}

                        this.addToQueue(files, options, filters);
                    }
                });
            }
    		
        	//기본 셀렉트 박스 데이터 조회 end
        	
        	$scope.resetSearchFiled = function(){
    			$rootScope.semesterAcceptGuide.searchUnivArea		= null;
    			$rootScope.semesterAcceptGuide.searchUniv			= null;
    			$rootScope.semesterAcceptGuide.searchYear			= null;
    			$rootScope.semesterAcceptGuide.searchSemesterCode	= null;
    			$rootScope.semesterAcceptGuide.searchSmsStatus		= null;
    			$rootScope.semesterAcceptGuide.searchUserUnivArea	= null;
    			$rootScope.semesterAcceptGuide.searchUserUniv		= null;
    			$rootScope.semesterAcceptGuide.searchSemesterStatus	= null;
    			$rootScope.semesterAcceptGuide.searchType			= null;
    			$rootScope.semesterAcceptGuide.searchKey			= null;
    			
        		//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.semesterAcceptGuide.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.semesterAcceptGuide.searchUnivArea, function(data){
        				$rootScope.semesterAcceptGuide.searchUniv = $rootScope.userSession.univCode;
        				$scope.diabledSelectUniv();
    					$rootScope.semesterAcceptGuide.isUnivComplete = true;
        			});
        			
        		}else{
        			$rootScope.semesterAcceptGuide.searchUnivArea = $rootScope.semesterAcceptGuide.searchUnivAreaList[1].code;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.semesterAcceptGuide.searchUnivArea, function(data){
    					$rootScope.semesterAcceptGuide.searchUniv = $rootScope.semesterAcceptGuide.searchUnivList[1].code;
    					$rootScope.semesterAcceptGuide.isUnivComplete = true;
        			});
        		}
        		
        		
        		//년도 초기화
        		var nowDate = new Date();
	        	$rootScope.semesterAcceptGuide.searchYear = nowDate.getFullYear()+"";
	        	
	        	//학기 초기화
	        	$rootScope.semesterAcceptGuide.searchSemesterCode = $rootScope.semesterAcceptGuide.searchSemesterCodeList[1].code;
        	};
        	
        	/**
        	 * 승인 안내문 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(redrawPage){
        		var param = {
    	        	searchUnivArea		:	$rootScope.semesterAcceptGuide.searchUnivArea,
    	        	searchUniv			:	$rootScope.semesterAcceptGuide.searchUniv,
    	        	searchYear 			:	$rootScope.semesterAcceptGuide.searchYear,
    	        	searchSemesterCode	:	$rootScope.semesterAcceptGuide.searchSemesterCode,
    	        	searchSmsStatus		:	$rootScope.semesterAcceptGuide.searchSmsStatus,
    	        	searchUserUnivArea	:	$rootScope.semesterAcceptGuide.searchUserUnivArea,
    	        	searchUserUniv		:	$rootScope.semesterAcceptGuide.searchUserUniv,
    	        	searchSemesterStatus:	$rootScope.semesterAcceptGuide.searchSemesterStatus,
    	        	sort				:	$rootScope.semesterAcceptGuide.sort,
    	        	order				:	$rootScope.semesterAcceptGuide.order,
    	        	//isPaging			: 	'Y',
    	        	nowPage				:	isNull(pagingGlobalVar["semesterListWithAcceptGuidePaging"])? 1 : pagingGlobalVar["semesterListWithAcceptGuidePaging"].nowPage,
    	        	rowCnt				:	$rootScope.semesterAcceptGuide.maxRowCnt,
        		};
         		semesterAcceptGuideService.getSemesterListWithAcceptGuide(param, function(data){
        			$rootScope.semesterAcceptGuide.searchYn = "Y";
					$rootScope.semesterAcceptGuide.semesterListWithAcceptGuide = data.semesterListWithAcceptGuide;
					if(data.semesterListWithAcceptGuide.length > 0){
						var param2 = {
	            				semesterCode : $rootScope.semesterAcceptGuide.searchSemesterCode,
	            				year : $rootScope.semesterAcceptGuide.searchYear,
	            				univCode : $rootScope.semesterAcceptGuide.searchUniv,
	            				docType : 2
	            		}
						if (!isNull($rootScope.semesterAcceptGuide.searchUniv)) {
							semesterAcceptGuideService.getAcceptGuideInfo(param2, function(data) {
								if(isNull(data.semesterInfo.acceptGuideRegUserSeq)) {
									$rootScope.semesterAcceptGuide.hasGuideInfo = false;
								}
								else {
									$rootScope.semesterAcceptGuide.hasGuideInfo = true;
								}
							});
						}
						else {
							$rootScope.semesterAcceptGuide.hasGuideInfo = false;
						}
						var totCnt = data.semesterListWithAcceptGuide[0].totalCnt*1;
						var nowPage = $rootScope.semesterAcceptGuide.nowPage*1;
						var maxRowCnt = $rootScope.semesterAcceptGuide.maxRowCnt*1;
						$rootScope.semesterAcceptGuide.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.semesterAcceptGuide.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["semesterListWithAcceptGuidePaging"]) || redrawPage){
							$("#semesterListWithAcceptGuidePaging").html("");
							$("#semesterListWithAcceptGuidePaging").createPaging({
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
						$rootScope.semesterAcceptGuide.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 로드시 승인안내문 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.semesterAcceptGuide.isUnivComplete && $rootScope.semesterAcceptGuide.isSemesterComplete) {
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
        		
        		$rootScope.semesterAcceptGuide.sort = sort;
        		$rootScope.semesterAcceptGuide.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
            /**
             * 승인 안내문 정보 목록 페이지 이동
             */
            $scope.getSemesterListWithAcceptGuideView = function(){
            	$rootScope.semesterAcceptGuide.pageViewType = "list";
            	$rootScope.semesterAcceptGuide.semesterInfo = {};
            };
            
            /**
             * 승인 안내문 정보 등록/수정 페이지 이동
             */
            $scope.saveRegistGuideView = function(year, univCode, semesterCode){
            	if (!semesterCode) {
            		commonService.alert('학기를 선택하세요.');
            		return;
            	}
    			var param = {
        				semesterCode : semesterCode,
        				year : year,
        				univCode : univCode,
        				docType : 2
        		}
    			semesterAcceptGuideService.getAcceptGuideInfo(param, function(data){
        			if (!isNull(data.semesterInfo)) {
        				$rootScope.semesterAcceptGuide.pageViewType = 'modify';
        				
        				$rootScope.semesterAcceptGuide.semesterInfo = data.semesterInfo;
	        			CKEDITOR.instances["contents"].setData($rootScope.semesterAcceptGuide.semesterInfo.acceptGuideMailContents);
	        			
	        			/**
	                     * 업로더 설정
	                     */
	                    if (!$rootScope.semesterAcceptGuide.uploader) {
	                        $rootScope.semesterAcceptGuide.uploader = new FileUploader({
	                            url: Const.contextPath + 'semester/saveAcceptGuideInfoWithFile.ajax',
	                            filters: [
	                                {
	                                    name: 'fileSizeFilter',
	                                    fn: function (file) {
	                                        console.log('file => ', file);
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
	                                                case 'PPT':
	                                                case 'PPTX':
	                                                case 'HWP':
	                                                case 'DOC':
	                                                case 'DOCX':
	                                                case 'ZIP':
	                                                    isAllow = true;
	                                                    break;
	                                            }
	                                        }

	                                        if (!isAllow) {
	                                            commonService.alert('xlsx, xls, ppt, pptx, hwp, doc, docx, zip 파일만 업로드 가능합니다.');
	                                        }

	                                        return isAllow;
	                                    }
	                                }
	                            ], onBeforeAddQueue: function (files, options, filters) {
	                                console.log('queue => ', this.queue);
	                                //if (this.queue.length !== 0 && files.length > 0) {
	                                    //this.clearQueue();
	                                //}

	                                this.addToQueue(files, options, filters);
	                            }
	                        });
	                    }
	                    else{
	                    	if ($rootScope.semesterAcceptGuide.uploader.queue.length > 0) {
	                            $rootScope.semesterAcceptGuide.uploader.clearQueue();
	                        }
	                    }
        			}
        			else {
            			$rootScope.semesterAcceptGuide.pageViewType = 'regist';
            			
            			$rootScope.semesterAcceptGuide.semesterInfo.year = year;
            			$rootScope.semesterAcceptGuide.semesterInfo.univCode = univCode;
            			$rootScope.semesterAcceptGuide.semesterInfo.semesterCode = semesterCode;
            			
            			commonService.getCodeName(univCode, function(univCodeName){
            				$rootScope.semesterAcceptGuide.semesterInfo.univCodeName = univCodeName.codeName;
            			});
            			commonService.getCodeName(semesterCode, function(semesterCodeName){
            				$rootScope.semesterAcceptGuide.semesterInfo.semesterCodeName = semesterCodeName.codeName;
            			});
            			
            			CKEDITOR.instances["contents"].setData('');
            		}
        		});
            };
        	
            /**
             * 승인 안내문 정보 저장 버튼
             */
            $scope.saveSemesterInfo = function() {
            	if($scope.checkValidate()){
        			if ($rootScope.semesterAcceptGuide.uploader.queue.length) {
        				$rootScope.semesterAcceptGuide.uploader.formData = [];
        				$.each($rootScope.semesterAcceptGuide.uploader.queue, function(i, item){
        					item.formData.push({semesterCode 			: $rootScope.semesterAcceptGuide.semesterInfo.semesterCode});
    						item.formData.push({year 					: $rootScope.semesterAcceptGuide.semesterInfo.year});
							item.formData.push({univCode 				: $rootScope.semesterAcceptGuide.semesterInfo.univCode});
							item.formData.push({acceptGuideMailTitle	: $rootScope.semesterAcceptGuide.semesterInfo.acceptGuideMailTitle});
							item.formData.push({acceptGuideMailContents	: CKEDITOR.instances['contents'].getData()});
        					item.formData.push({removeFileKeys			: nvltoStr($rootScope.semesterAcceptGuide.semesterInfo.removeFileKeys)});
        					item.formData.push({docType					: 2 });
            				/*item.onSuccess = function() {
                                commonService.alert('저장되었습니다.');
                                $scope.getSemesterListWithAcceptGuideView();
        						$scope.search(true);
                            };*/
                            item.onError = function(response, status) {
                                console.error('logo upload error status => ', status);
                                commonService.etcError(response);
                            };
        				});
        				commonService.confirm('저장 하시겠습니까?', function() {
        					$rootScope.semesterAcceptGuide.uploader.onCompleteAll = function(){
            					$scope.getSemesterListWithAcceptGuideView();
        						$scope.search(true);
            				};
                            $rootScope.semesterAcceptGuide.uploader.uploadAll();
                    	});
                    } else {
                    	var	param = {
                    			semesterCode			: $rootScope.semesterAcceptGuide.semesterInfo.semesterCode,
                    			year					: $rootScope.semesterAcceptGuide.semesterInfo.year,
                    			univCode				: $rootScope.semesterAcceptGuide.semesterInfo.univCode,
                    			acceptGuideMailTitle	: $rootScope.semesterAcceptGuide.semesterInfo.acceptGuideMailTitle,
                    			acceptGuideMailContents	: CKEDITOR.instances['contents'].getData(),
	        					removeFileKeys			: $rootScope.semesterAcceptGuide.semesterInfo.removeFileKeys,
	        					docType					: 2
            			};
                    	
                    	commonService.confirm('저장 하시겠습니까?', function() {
                    		semesterAcceptGuideService.saveAcceptGuideInfo(param, function(data) {
                    			$scope.getSemesterListWithAcceptGuideView();
                    			$scope.search(true);
            				});
                    	});
                    }
            	}
            }
            
            var user = $rootScope.semesterAcceptGuide.semesterInfo.checkedUser = [];
            
            $scope.checkAGList = function(info, idx) {
            	if(!$rootScope.semesterAcceptGuide.isCheked[idx]) {
            		user.splice(user.indexOf(info),1);
            	}
            	else {
            		user.push(info);
            	}
            }
            
            $scope.sendAcceptGuideToAll = function(semesterCode) {
            	if($rootScope.semesterAcceptGuide.hasGuideInfo) {
            		if(!isNull($rootScope.semesterAcceptGuide.semesterListWithAcceptGuide)) {
    	            	$.each($rootScope.semesterAcceptGuide.semesterListWithAcceptGuide, function(i, item) {
    	            		var cell1 = item.cellNo.split('-')[0];
	            			var cell2 = item.cellNo.split('-')[1];
	            			var cell3 = item.cellNo.split('-')[2];
	            			var cell = cell1+''+cell2+''+cell3;
	            			
    	            		$rootScope.semesterAcceptGuide.univCodeName 	= item.univCodeName;
    	            		$rootScope.semesterAcceptGuide.userSeq  		= item.userSeq;
    	        			$rootScope.semesterAcceptGuide.userEmail 		= item.userEmail;
    	        			$rootScope.semesterAcceptGuide.userUnivCode     = item.userUnivCode;
    	        			$rootScope.semesterAcceptGuide.userUnivCodeName = item.userUnivCodeName;
    	        			$rootScope.semesterAcceptGuide.userName 		= item.userName;
    	        			$rootScope.semesterAcceptGuide.mInStNum 		= item.mInStNum;
    	        			$rootScope.semesterAcceptGuide.cellNo 			= cell;
    	        			$rootScope.semesterAcceptGuide.studentNumber 	= item.studentNumber;
    	        			$rootScope.semesterAcceptGuide.univCode			= item.univCode;
    	        			$rootScope.semesterAcceptGuide.year				= item.year;
    	        			$rootScope.semesterAcceptGuide.regUserSeq		= $rootScope.userSession.userSeq;
    	        			
    	        			var param = {
    	        					email 				: 	$rootScope.semesterAcceptGuide.userEmail,
    	        					userUnivCode		:   $rootScope.semesterAcceptGuide.userUnivCode,
    	        					userUnivCodeName	:   $rootScope.semesterAcceptGuide.userUnivCodeName,
    	        					userName			:   $rootScope.semesterAcceptGuide.userName,
    	        					mInStNum			:   $rootScope.semesterAcceptGuide.mInStNum,
    	        					semesterCode 		: 	semesterCode,
    	        					univCodeName		:	$rootScope.semesterAcceptGuide.univCodeName,
    	        					cellNo				: 	$rootScope.semesterAcceptGuide.cellNo,
    	        					studentNumber		:	$rootScope.semesterAcceptGuide.studentNumber,
    	        					univCode			:   $rootScope.semesterAcceptGuide.univCode,
    	        					year				:	$rootScope.semesterAcceptGuide.year,
    	        					docType				: 	2,
    	        					regUserSeq			:   $rootScope.semesterAcceptGuide.regUserSeq,
    	        					userSeq				:	$rootScope.semesterAcceptGuide.userSeq,
    	        					
    	        			}
    	        			semesterAcceptGuideService.sendAcceptGuide(param, function(data) { 
    	        			});
    	            	});
    	            	commonService.alert("메일/문자를 발송 하였습니다. 시스템에 따라 전송결과에 차이가 있을 수 있습니다.");
                	}
                	else {
                		commonService.alert('조회결과에 발송 대상이 없습니다.');
                		return;
                	}
            	}
            	else {
            		commonService.alert('등록된 안내문이 없습니다. 안내문을 등록하신 후 발송해 주세요.');
            		return;
            	}
            }
            
            $scope.sendAcceptGuide = function(semesterCode) {
            	if($rootScope.semesterAcceptGuide.hasGuideInfo) {
	            	if(!isNull(user)) {
	            		$.each(user, function(i, item) {
	            			var cell1 = item.cellNo.split('-')[0];
	            			var cell2 = item.cellNo.split('-')[1];
	            			var cell3 = item.cellNo.split('-')[2];
	            			var cell = cell1+''+cell2+''+cell3;
	            			
	            			$rootScope.semesterAcceptGuide.univCodeName 	= item.univCodeName;
	            			$rootScope.semesterAcceptGuide.userSeq  		= item.userSeq;
	            			$rootScope.semesterAcceptGuide.userEmail 		= item.userEmail;
	            			$rootScope.semesterAcceptGuide.userUnivCode     = item.userUnivCode;
	            			$rootScope.semesterAcceptGuide.userUnivCodeName = item.userUnivCodeName;
	            			$rootScope.semesterAcceptGuide.userName 		= item.userName;
	            			$rootScope.semesterAcceptGuide.mInStNum 		= item.mInStNum;
	            			$rootScope.semesterAcceptGuide.cellNo 			= cell;
	            			$rootScope.semesterAcceptGuide.studentNumber 	= item.studentNumber;
	            			$rootScope.semesterAcceptGuide.univCode			= item.univCode;
	            			$rootScope.semesterAcceptGuide.year				= item.year;
	            			$rootScope.semesterAcceptGuide.regUserSeq		= $rootScope.userSession.userSeq;
	            			
	            			var param = {
	            					email 				: 	$rootScope.semesterAcceptGuide.userEmail,
	            					userUnivCode		:   $rootScope.semesterAcceptGuide.userUnivCode,
	            					userUnivCodeName	:   $rootScope.semesterAcceptGuide.userUnivCodeName,
	            					userName			:   $rootScope.semesterAcceptGuide.userName,
	            					mInStNum			:   $rootScope.semesterAcceptGuide.mInStNum,
	            					semesterCode 		: 	semesterCode,
	            					univCodeName		:	$rootScope.semesterAcceptGuide.univCodeName,
	            					cellNo				: 	$rootScope.semesterAcceptGuide.cellNo,
	            					studentNumber		:	$rootScope.semesterAcceptGuide.studentNumber,
	            					univCode			:   $rootScope.semesterAcceptGuide.univCode,
	            					year				:	$rootScope.semesterAcceptGuide.year,
	            					docType				: 	2,
	            					regUserSeq			:   $rootScope.semesterAcceptGuide.regUserSeq,
	            					userSeq				:	$rootScope.semesterAcceptGuide.userSeq,
	            					
	            			}
	            			semesterAcceptGuideService.sendAcceptGuide(param, function(data) { 
	            			});
	            		});
	            		commonService.alert("메일/문자를 발송 하였습니다. 시스템에 따라 전송결과에 차이가 있을 수 있습니다.");
	            	}
	            	else {
	            		commonService.alert('안내문 발송 대상을 선택해 주십시오.');
	            		return;
	            	}
            	}
            	else {
            		commonService.alert('등록된 안내문이 없습니다. 안내문을 등록하신 후 발송해 주세요.');
            		return;
            	}
            }
            
            $scope.checkAllAGList = function() {
            	//$scope.checkAGList();
            }
            
            /**
             * 승인 안내문 정보 validate check
             */
            $scope.checkValidate = function(){
        		if(isNull(CKEDITOR.instances['contents'].getData())){
        			commonService.alert("안내문 내용을 입력해주세요.");
        			return false;
        		}
        		
            	return true;
            };
            
            /**
             * 승인 안내문 정보 삭제 버튼
             */
            $scope.deleteAcceptGuideInfo = function() {
        		commonService.confirm('삭제 하시겠습니까?', function() {
        			var	param = {
        					semesterSeq	: $rootScope.semesterAcceptGuide.semesterInfo.semesterSeq,
        			};
        			
        			semesterAcceptGuideService.deleteAcceptGuideInfo(param, function(data) {
    					$scope.getSemesterListWithAcceptGuideView();
    					$scope.search(true);
    				});
        		});
            };
            
            /**
             * 기존에 등록된 첨부파일 삭제
             * @param parameter index
             */
            $scope.removeAttachFile = function(idx){
            	if(!isNull(idx)){
            		if(!isNull($rootScope.semesterAcceptGuide.semesterInfo.removeFileKeys)){
            			$rootScope.semesterAcceptGuide.semesterInfo.removeFileKeys += ",";
            		}else{
            			$rootScope.semesterAcceptGuide.semesterInfo.removeFileKeys = "";
            		}
            		$rootScope.semesterAcceptGuide.semesterInfo.removeFileKeys += $("#fileKey_"+idx).val();
            		$("#fileKey_"+idx).parent().parent().remove();
            	}
            };
            /********** 승인 안내문 정보 수정 관련 end **********/
            
            $scope.getSemesterSmsStatus = function(idx) {
            	var semesterInfo = {};
            	var resultStr = "";
            	if(!isNull(idx)){
            		semesterInfo = $rootScope.semesterAcceptGuide.semesterListWithAcceptGuide[idx];
            	}else{
            		semesterInfo = $rootScope.semesterAcceptGuide.semesterInfo;
            	}
            	
            	if(!isNull(semesterInfo)){
            		if(semesterInfo.targetYn == 'N'){
            			resultStr = "대기";
            		}else if(semesterInfo.targetYn == 'Y'){
            			resultStr = "성공";
            		}
            	}
            	
            	return resultStr;
            };
        });
})());