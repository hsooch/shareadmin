((function() {
    angular.module('appModule')
        .controller('semesterGuideCtrl', function($scope, $rootScope, semesterGuideService, commonService, Const, ngDialog, FileUploader) {
        	$rootScope.semesterGuide.scope = $scope;

        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.semesterGuide.searchUnivArea']").attr("disabled", true);
    				$("[ng-model='$root.semesterGuide.searchUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
        	
        	/**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.semesterGuide[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.semesterGuide[parentModel])) return;
        			commonService.getCodeList($rootScope.semesterGuide[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.semesterGuide[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.semesterGuide[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)){
                				$rootScope.semesterGuide[childModel] = $rootScope.semesterGuide[childModel+"List"][1].code;
                			}else{
                				$rootScope.semesterGuide[childModel] = defaultValue;
                			}
                		}
                		
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.semesterGuide.semesterInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.semesterGuide.semesterInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.semesterGuide[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.semesterGuide[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			if(isNull(defaultValue)){
	            				$rootScope.semesterGuide.semesterInfo[childModel] = $rootScope.semesterGuide[childModel+"List"][1].code;
	            			}else{
                				$rootScope.semesterGuide.semesterInfo[childModel] = defaultValue;
                			}
	            		}
        			});
        		}
        	};
        	
            //기본 셀렉트 박스 데이터 조회 start
        	//년도 세팅
        	if($rootScope.semesterGuide.searchYearList.length == 1){
        		$rootScope.semesterGuide.searchYearList = [{code : "", codeName : "전체"}];
        		$rootScope.semesterGuide.yearList = [{code : "", codeName : "년도 선택"}];
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()+2;
	        	for(var i = curYear; i >= nowDate.getFullYear(); i--) {
	    	 	   	$rootScope.semesterGuide.searchYearList.push({code:i, codeName:i});
	    	 	   	$rootScope.semesterGuide.yearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.semesterGuide.searchYear = nowDate.getFullYear()+"";
        	}
        	
        	//학교 지역 목록
        	if($rootScope.semesterGuide.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.semesterGuide.searchUnivAreaList = [];
            			$rootScope.semesterGuide.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.semesterGuide.univAreaCodeList = [];
            			$rootScope.semesterGuide.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.semesterGuide.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.semesterGuide.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			
            			//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                        ){
                			$rootScope.semesterGuide.searchUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode, function(){
                				$rootScope.semesterGuide.searchUniv = $rootScope.userSession.univCode;
                				$scope.diabledSelectUniv();
            					$rootScope.semesterGuide.isUnivComplete = true;
            					$scope.initSearch();
                			});
                			
                		}else{
                			$rootScope.semesterGuide.searchUnivArea = $rootScope.semesterGuide.searchUnivAreaList[1].code;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", null, function(){
            					$rootScope.semesterGuide.searchUniv = $rootScope.semesterGuide.searchUnivList[1].code;
            					$rootScope.semesterGuide.isUnivComplete = true;
            					$scope.initSearch();
                			});
                		}
            			
            		}
            	});
            };
            
            //학기 분류 목록 조회
        	if($rootScope.semesterGuide.searchSemesterCodeList.length == 1){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.semesterGuide.searchSemesterCodeList = [];
            			$rootScope.semesterGuide.searchSemesterCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.semesterGuide.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			
            			$rootScope.semesterGuide.searchSemesterCode = $rootScope.semesterGuide.searchSemesterCodeList[1].code;
            			$rootScope.semesterGuide.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //달력
    		$("[ng-model='$root.semesterGuide.semesterInfo.receiptStartDay']").datepicker(getDatePickerConfig("dateField"));
    		$("[ng-model='$root.semesterGuide.semesterInfo.receiptEndDay']").datepicker(getDatePickerConfig("dateField"));
    		
    		/**
             * 업로더 설정
             */
            if (!$rootScope.semesterGuide.uploader) {
                $rootScope.semesterGuide.uploader = new FileUploader({
                    url: Const.contextPath + 'semester/saveGuideInfoWithFile.ajax',
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
    			$rootScope.semesterGuide.searchUnivArea		= null;
    			$rootScope.semesterGuide.searchUniv			= null;
    			$rootScope.semesterGuide.searchYear			= null;
    			$rootScope.semesterGuide.searchSemesterCode = null;
    			$rootScope.semesterGuide.searchDisplayYn = null;
    			$rootScope.semesterGuide.searchSemesterStatus = null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.semesterGuide.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode, function(){
        				$rootScope.semesterGuide.searchUniv = $rootScope.userSession.univCode;
        				$scope.diabledSelectUniv();
        			});
        			
        		}else{
        			$rootScope.semesterGuide.searchUnivArea = $rootScope.semesterGuide.searchUnivAreaList[1].code;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", null, function(){
    					$rootScope.semesterGuide.searchUniv = $rootScope.semesterGuide.searchUnivList[1].code;
        			});
        		}
        		
        		//년도 초기화
        		var nowDate = new Date();
	        	$rootScope.semesterGuide.searchYear = nowDate.getFullYear()+"";
	        	
	        	//학기 초기화
	        	$rootScope.semesterGuide.searchSemesterCode = $rootScope.semesterGuide.searchSemesterCodeList[1].code;
	        	
	        	console.log("$rootScope.semesterGuide.searchYear",$rootScope.semesterGuide.searchYear);
	        	console.log("$rootScope.semesterGuide.searchSemesterCode",$rootScope.semesterGuide.searchSemesterCode);
        	};
        	
        	/**
        	 * 학기 접수기간/안내문 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(redrawPage){
        		var param = {
    	        	searchUnivArea		:	$rootScope.semesterGuide.searchUnivArea,
    	        	searchUniv			:	$rootScope.semesterGuide.searchUniv,
    	        	searchYear 			:	$rootScope.semesterGuide.searchYear,
    	        	searchSemesterCode	:	$rootScope.semesterGuide.searchSemesterCode,
    	        	searchDisplayYn		:	$rootScope.semesterGuide.searchDisplayYn,
    	        	searchSemesterStatus:	$rootScope.semesterGuide.searchSemesterStatus,
    	        	sort				:	$rootScope.semesterGuide.sort,
    	        	order				:	$rootScope.semesterGuide.order,
    	        	//isPaging			: 	'Y',
    	        	nowPage				:	isNull(pagingGlobalVar["semesterListWithGuidePaging"])? 1 : pagingGlobalVar["semesterListWithGuidePaging"].nowPage,
    	        	rowCnt				:	$rootScope.semesterGuide.maxRowCnt,
        		};
        		
        		semesterGuideService.getSemesterListWithGuide(param, function(data){
        			$rootScope.semesterGuide.searchYn = "Y";
					$rootScope.semesterGuide.semesterListWithGuide = data.semesterListWithGuide;
					if(data.semesterListWithGuide.length > 0){
						var totCnt = data.semesterListWithGuide[0].totalCnt*1;
						var nowPage = $rootScope.semesterGuide.nowPage*1;
						var maxRowCnt = $rootScope.semesterGuide.maxRowCnt*1;
						$rootScope.semesterGuide.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.semesterGuide.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["semesterListWithGuidePaging"]) || redrawPage){
							$("#semesterListWithGuidePaging").html("");
							$("#semesterListWithGuidePaging").createPaging({
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
						$rootScope.semesterGuide.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 로드시 학기 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.semesterGuide.isUnivComplete && $rootScope.semesterGuide.isSemesterComplete) {
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
        		
        		$rootScope.semesterGuide.sort = sort;
        		$rootScope.semesterGuide.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
            /**
             * 학기 접수기간/안내문 정보 목록 페이지 이동
             */
            $scope.getSemesterListWithGuideView = function(){
            	$rootScope.semesterGuide.pageViewType = "list";
            	$rootScope.semesterGuide.semesterInfo = {};
            };
            
            /**
             * 학기 접수기간/안내문 정보 등록/수정 페이지 이동
             */
            $scope.saveSemesterView = function(pageViewType, semesterInfo, idx){
            	if(!isNull(semesterInfo)){
            		var param = {
            				semesterCode : semesterInfo.semesterCode,
            				year : semesterInfo.year,
            				univCode : semesterInfo.univCode,
            				docType : 1
            				
            		};
            		semesterGuideService.getGuideInfo(param, function(data){
            			$rootScope.semesterGuide.semesterInfo = data.semesterInfo;
            			
            			if($rootScope.semesterGuide.semesterInfo.univCode.indexOf("|") > -1){
            				var univCodeArr = $rootScope.semesterGuide.semesterInfo.univCode.split("|");
            				if(univCodeArr.length > 1){
            					$rootScope.semesterGuide.semesterInfo.univAreaCode = univCodeArr[0];
            					$rootScope.semesterGuide.semesterInfo.univCode = univCodeArr[1];
            				}
            			}
            			
            			$rootScope.semesterGuide.pageViewType = pageViewType;
            			
            			if(isNull($rootScope.semesterGuide.semesterInfo.guideDisplayYn)){
            				$rootScope.semesterGuide.semesterInfo.guideRegUserName = $rootScope.userSession.userName;
            				$rootScope.semesterGuide.semesterInfo.guideRegUserSeq = $rootScope.userSession.userSeq;
            				$rootScope.semesterGuide.semesterInfo.guideDisplayYn = 'N';
            				
            			}else{
            				var receiptStartDay = $rootScope.semesterGuide.semesterInfo.receiptStartDay;
            				var receiptEndDay = $rootScope.semesterGuide.semesterInfo.receiptEndDay;
            				if(receiptStartDay.length == 8){ $rootScope.semesterGuide.semesterInfo.receiptStartDay = receiptStartDay.substring(0,4)+"."+receiptStartDay.substring(4,6)+"."+receiptStartDay.substring(6,8); }
            				if(receiptEndDay.length == 8){ $rootScope.semesterGuide.semesterInfo.receiptEndDay = receiptEndDay.substring(0,4)+"."+receiptEndDay.substring(4,6)+"."+receiptEndDay.substring(6,8); }
            			}
            			
            			CKEDITOR.instances["contents"].setData($rootScope.semesterGuide.semesterInfo.contents);
            			
            			/**
                         * 업로더 설정
                         */
                        if (!$rootScope.semesterGuide.uploader) {
                            $rootScope.semesterGuide.uploader = new FileUploader({
                                url: Const.contextPath + 'semester/saveGuideInfoWithFile.ajax',
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
                        }else{
                        	if ($rootScope.semesterGuide.uploader.queue.length > 0) {
                                $rootScope.semesterGuide.uploader.clearQueue();
                            }
                        }
            		});
            	}
            };
            
            /**
        	 * 학기 접수기간/안내문 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if($rootScope.semesterGuide.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    				searchUnivArea		:	$rootScope.semesterGuide.searchUnivArea,
    	        	searchUniv			:	$rootScope.semesterGuide.searchUniv,
    	        	searchYear 			:	$rootScope.semesterGuide.searchYear,
    	        	searchSemesterCode	:	$rootScope.semesterGuide.searchSemesterCode,
    	        	searchDisplayYn		:	$rootScope.semesterGuide.searchDisplayYn,
    	        	searchSemesterStatus:	$rootScope.semesterGuide.searchSemesterStatus,
    	        	sort				:	$rootScope.semesterGuide.sort,
    	        	order				:	$rootScope.semesterGuide.order,
    	        	isPaging			: 	'N',
        		};
        		
        		$("<input></input>").attr({type:"hidden", name:"searchUnivArea",	value:param.searchUnivArea	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUniv",		value:param.searchUniv		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchYear",		value:param.searchYear		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchSemesterCode",value:param.searchSemesterCode	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sort",				value:param.sort			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"order",				value:param.order			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"isPaging",			value:"N"					}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sortOnly",			value:"Y"					}).appendTo($("#excelForm"));
        		
        		$("#excelForm").attr("action", Const.contextPath + "semester/downloadSemesterListWithGuide.do").submit();
        		$("#excelForm").html("");
        	};
        	
        	$scope.addSemester = function(){
        		
        	};
        	
            /**
             * 학기 접수기간/안내문 정보 저장 버튼
             */
            $scope.saveSemesterInfo = function() {
            	if($scope.checkValidate()){
            		commonService.confirm('접수기간의 시작일에 접수를 시작하여 종료일에 마감됩니다.\n저장 하시겠습니까?', function() {
            			if ($rootScope.semesterGuide.uploader.queue.length) {
            				$rootScope.semesterGuide.uploader.formData = [];
            				$.each($rootScope.semesterGuide.uploader.queue, function(i, item){
            					item.formData.push({semesterCode : $rootScope.semesterGuide.semesterInfo.semesterCode});
        						item.formData.push({year : $rootScope.semesterGuide.semesterInfo.year});
    							item.formData.push({univCode : $rootScope.semesterGuide.semesterInfo.univCode});
            					item.formData.push({receiptStartDay	: $rootScope.semesterGuide.semesterInfo.receiptStartDay.replace(/[^0-9]/gi,"")});
            					item.formData.push({receiptEndDay	: $rootScope.semesterGuide.semesterInfo.receiptEndDay.replace(/[^0-9]/gi,"")});
            					item.formData.push({guideDisplayYn	: defaultIfEmpty($rootScope.semesterGuide.semesterInfo.guideDisplayYn, "N")});
            					item.formData.push({contents		: CKEDITOR.instances['contents'].getData()});
            					item.formData.push({removeFileKeys	: nvltoStr($rootScope.semesterGuide.semesterInfo.removeFileKeys)});
                				/*item.onSuccess = function() {
	                                commonService.alert('저장되었습니다.');
	                                $scope.getSemesterListWithGuideView();
            						$scope.search(true);
	                            };*/
	                            item.onError = function(response, status) {
	                                console.error('logo upload error status => ', status);
	                                commonService.etcError(response);
	                            };
            				});
            				$rootScope.semesterGuide.uploader.onCompleteAll = function(){
            					commonService.alert('저장되었습니다.');
            					$scope.getSemesterListWithGuideView();
        						$scope.search(true);
            				};
                            $rootScope.semesterGuide.uploader.uploadAll();
                        } else {
                        	var	param = {
                					semesterCode	: $rootScope.semesterGuide.semesterInfo.semesterCode,
                					year			: $rootScope.semesterGuide.semesterInfo.year,
                					univCode		: $rootScope.semesterGuide.semesterInfo.univCode,
                					receiptStartDay	: $rootScope.semesterGuide.semesterInfo.receiptStartDay.replace(/[^0-9]/gi,""),
                					receiptEndDay	: $rootScope.semesterGuide.semesterInfo.receiptEndDay.replace(/[^0-9]/gi,""),
                					guideDisplayYn	: defaultIfEmpty($rootScope.semesterGuide.semesterInfo.guideDisplayYn, "N"),
    	        					contents		: CKEDITOR.instances['contents'].getData(),
    	        					removeFileKeys	: nvltoStr($rootScope.semesterGuide.semesterInfo.removeFileKeys),
                			};
                            
                            semesterGuideService.saveGuideInfo(param, function(data) {
            					if(data.resultCode == "0"){
            						$scope.getSemesterListWithGuideView();
            						$scope.search(true);
            					}else{
            						commonService.serverError(data);
            					}
            				});
                        }
            		});
            	}
            }
            
            /**
             * 학기 접수기간/안내문 정보 validate check
             */
            $scope.checkValidate = function(){
        		if(isNull($rootScope.semesterGuide.semesterInfo.receiptStartDay)){
        			commonService.alert("접수 시작 기간을 선택해주세요.");
        			return false;
        		}else{
        			if(!isNull($rootScope.semesterGuide.semesterInfo.receiptEndDay)){
        				if($rootScope.semesterGuide.semesterInfo.receiptStartDay > $rootScope.semesterGuide.semesterInfo.receiptEndDay){
        					commonService.alert("접수 시작일이 종료일보다 뒤에 있을 수 없습니다.");
                			return false;
        				} 
        			}
        		}
        		
        		if(isNull($rootScope.semesterGuide.semesterInfo.receiptEndDay)){
        			commonService.alert("접수 종료 기간을 선택해주세요.");
        			return false;
        		}
        		
        		if(isNull(CKEDITOR.instances['contents'].getData())){
        			commonService.alert("안내문 내용을 입력해주세요.");
        			return false;
        		}
        		
            	return true;
            };
            
            /**
             * 학기 접수기간/안내문 정보 삭제 버튼
             */
            $scope.deleteGuideInfo = function() {
        		commonService.confirm('삭제 하시겠습니까?', function() {
        			var	param = {
        					semesterCode: $rootScope.semesterGuide.semesterInfo.semesterCode,
        					year		: $rootScope.semesterGuide.semesterInfo.year,
        					univCode	: $rootScope.semesterGuide.semesterInfo.univCode,
        			};
        			
    				semesterGuideService.deleteGuideInfo(param, function(data) {
    					$scope.getSemesterListWithGuideView();
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
            		if(!isNull($rootScope.semesterGuide.semesterInfo.removeFileKeys)){
            			$rootScope.semesterGuide.semesterInfo.removeFileKeys += ",";
            		}else{
            			$rootScope.semesterGuide.semesterInfo.removeFileKeys = "";
            		}
            		$rootScope.semesterGuide.semesterInfo.removeFileKeys += $("#fileKey_"+idx).val();
            		$("#fileKey_"+idx).parent().parent().remove();
            	}
            };
            /********** 학기 접수기간/안내문 정보 수정 관련 end **********/
            
            $scope.getSemesterGuideStatus = function(idx) {
            	var semesterInfo = {};
            	var resultStr = "";
            	if(!isNull(idx)){
            		semesterInfo = $rootScope.semesterGuide.semesterListWithGuide[idx];
            	}else{
            		semesterInfo = $rootScope.semesterGuide.semesterInfo;
            	}
            	
            	if(!isNull(semesterInfo)){
            		var nowDate = new Date();
            		var nowDateStr = nowDate.getFullYear()+""+lpad(nowDate.getMonth()+1, 2)+""+lpad(nowDate.getDate(), 2);
            		
            		var receiptStartDay = nvltoStr(semesterInfo.receiptStartDay,"").replace(/[.]/gi, '');
            		var receiptEndDay = nvltoStr(semesterInfo.receiptEndDay,"").replace(/[.]/gi, '');
            		
            		if(nowDateStr >= receiptStartDay && nowDateStr <= receiptEndDay){
            			$rootScope.semesterGuide.semesterInfo.guideStatus = "02";
            			resultStr = "접수중";
            		}else if(nowDateStr < receiptStartDay){
            			$rootScope.semesterGuide.semesterInfo.guideStatus = "01";
            			resultStr = "대기";
            		}else if(!isNull(semesterInfo.guideSemesterCode)){
            			$rootScope.semesterGuide.semesterInfo.guideStatus = "03";
            			resultStr = "마감";
            		}
            	}
            	
            	return resultStr;
            };
        });
})());