((function() {
	angular.module('appModule') 	
		.controller('contestCtrl', function($scope, $rootScope, $compile, commonService, seminarService, Const, FileUploader) {
			$rootScope.seminar.contest.scope = $scope;
			var currentDate = new Date();
			var now = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
			
			/**
             * 썸네일 업로더 설정
             */	
            if (!$rootScope.seminar.contest.uploader) {
                $rootScope.seminar.contest.uploader = new FileUploader({
                    url: Const.contextPath + 'seminar/submitWithThumbnail.ajax',
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
                                        case 'JPG':
                                        case 'JPEG':
                                        case 'GIF':
                                        case 'BMP':
                                        case 'PNG':
                                            isAllow = true;
                                            break;
                                    }
                                }

                                if (!isAllow) {
                                    commonService.alert('JPG, JPEG, PNG, GIF, BMP 파일만 업로드 가능합니다.');
                                }

                                return isAllow;
                            }
                        }
                    ], onBeforeAddQueue: function (files, options, filters) {
                        if (this.queue.length !== 0 && files.length > 0) {
                            this.clearQueue();
                        }

                        this.addToQueue(files, options, filters);
                        console.log('queue => ', this.queue);
                    }
                });
            }
            
            /**
             * 파일 업로더 설정
             */	
            if (!$rootScope.seminar.contest.multiUploader) {
            	$rootScope.seminar.contest.multiUploader = new FileUploader({
            		url: Const.contextPath + 'seminar/submitWithFiles.ajax',
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
//            		        	  if (this.queue.length !== 0 && files.length > 0) {
//            		        		  this.clearQueue();
//            		        	  }
    		        	  
    		        	  this.addToQueue(files, options, filters);
    		          }
            	});
            }
            
			//학교 지역 목록
        	if($rootScope.seminar.contest.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.seminar.contest.searchUnivAreaList = [];
            			$rootScope.seminar.contest.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.seminar.contest.univAreaCodeList = [];
            			$rootScope.seminar.contest.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.seminar.contest.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.seminar.contest.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };

        	$("[ng-model='$root.seminar.contest.contestInfo.applyStartDay']").datepicker(getDatePickerConfig("dateField"));
    		$("[ng-model='$root.seminar.contest.contestInfo.applyEndDay']").datepicker(getDatePickerConfig("dateField"));
    		$("[ng-model='$root.seminar.contest.contestInfo.classDay']").datepicker(getDatePickerConfig("dateField"));
    		
			/**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.seminar.contest[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.seminar.contest[parentModel])) {
        				$rootScope.seminar.contest[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				return;
        			}
        			commonService.getCodeList($rootScope.seminar.contest[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.seminar.contest[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.seminar.contest[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)) {
                				$rootScope.seminar.contest[childModel] = $rootScope.seminar.contest[childModel+"List"][0].code;
                			}
                			else {
                				$rootScope.seminar.contest[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.seminar.contest.contestInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.seminar.contest.contestInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.seminar.contest[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.seminar.contest[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			//$rootScope.seminar.contest[childModel] = $rootScope.seminar.contest[childModel+"List"][0].code;
	            		}
        			});
        		}
        	};
        	
        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
            ){
    			$rootScope.seminar.contest.searchUnivArea = $rootScope.userSession.univAreaCd;
    			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
    			$rootScope.seminar.contest.searchUniv = $rootScope.userSession.univCode;
    			
    			$("[ng-model='$root.seminar.contest.searchUnivArea']").attr("disabled", true);
    			$("[ng-model='$root.seminar.contest.searchUniv']").attr("disabled", true);
    		}
        	
        	// 검색조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.seminar.contest.searchUnivArea		= null;
    			$rootScope.seminar.contest.searchUniv			= null;
    			$rootScope.seminar.contest.searchSeminarType	= null;
    			$rootScope.seminar.contest.searchDisplayYn		= null;
    			$rootScope.seminar.contest.searchEtcOption		= null;
    			$rootScope.seminar.contest.searchKeywords		= null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.seminar.contest.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
        			$rootScope.seminar.contest.searchUniv = $rootScope.userSession.univCode;
        			
        			$("[ng-model='$root.seminar.contest.searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.seminar.contest.searchUniv']").attr("disabled", true);
        		}
        	};
			
			/**
			 * 세미나 목록 페이지 이동
			 */
			$scope.goContestListView = function() {
				$rootScope.seminar.contest.pageViewType = "list";
				$rootScope.seminar.contest.contestInfo = {};
				
				$rootScope.seminar.contest.uploader.queue = [];
				$rootScope.seminar.contest.multiUploader.queue = [];
				
				$scope.search();
			};
			
			/**
        	 * 세미나 목록 조회
        	 * 
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
			$scope.search = function(redrawPage) {
				var searchSeminarType;
				var searchDisplayYn;
				
				switch ($rootScope.seminar.contest.searchSeminarType) {
				case 'contest':
					searchSeminarType = 3;
					break;
				case 'competition':
					searchSeminarType = 4;
					break;
				}
				switch ($rootScope.seminar.contest.searchDisplayYn) {
				case 'display':
					searchDisplayYn = 'Y';
					break;
				case 'none':
					searchDisplayYn = 'N';
					break;
				}
				var param = {
						searchUnivArea		: $rootScope.seminar.contest.searchUnivArea,
						searchUniv			: $rootScope.seminar.contest.searchUniv,
						searchSeminarType	: searchSeminarType,
						searchDisplayYn		: searchDisplayYn,
						searchEtcOption		: $rootScope.seminar.contest.searchEtcOption,
						searchKeywords		: $rootScope.seminar.contest.searchKeywords,
						sort				: $rootScope.seminar.contest.sort,
						order				: $rootScope.seminar.contest.order,
						nowPage				: isNull(pagingGlobalVar["contestListPaging"])? 1 : pagingGlobalVar["contestListPaging"].nowPage,
						rowCnt				: $rootScope.seminar.contest.maxRowCnt,
						type1				: 3,
						type2				: 4
				}
				
				seminarService.getSeminarList(param, function(data) {
					$rootScope.seminar.contest.searchYn = "Y";
					$rootScope.seminar.contest.contestList = data.seminarList;
					if (data.seminarList.length > 0) {
						var totCnt = data.seminarList[0].totalCnt*1;
						var nowPage = $rootScope.seminar.contest.nowPage*1;
						var maxRowCnt = $rootScope.seminar.contest.maxRowCnt*1;
						$rootScope.seminar.contest.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.seminar.contest.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["contestListPaging"]) || redrawPage){
							$("#contestListPaging").html("");
							$("#contestListPaging").createPaging({
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
						$rootScope.seminar.contest.totalCnt = 0;
					}
				});
			}
			
			//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
            ){
    			$rootScope.seminar.contest.searchUnivArea = $rootScope.userSession.univAreaCd;
    			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
    			$rootScope.seminar.contest.searchUniv = $rootScope.userSession.univCode;
    			
    			$("[ng-model='$root.seminar.contest.searchUnivArea']").attr("disabled", true);
    			$("[ng-model='$root.seminar.contest.searchUniv']").attr("disabled", true);
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
        		
        		$rootScope.seminar.contest.sort = sort;
        		$rootScope.seminar.contest.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
			
			/**
			 * 세미나 등록 페이지 이동
			 */
			$scope.goContestRegistView = function(seminarSeq, idx) {
				$rootScope.seminar.contest.pageViewType = "modify";
				
				//사용자 권한에 따른 학교구분 검색조건 세팅
	    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
	    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
	            ){
	    			$rootScope.seminar.contest.contestInfo.univAreaCode = $rootScope.userSession.univAreaCd;
	    			$scope.getChildCdList("univAreaCode", "univCode", $rootScope.userSession.univCode);
	    			$rootScope.seminar.contest.contestInfo.univCode = $rootScope.userSession.univCode;
	    			
	    			$("[ng-model='$root.seminar.contest.contestInfo.univAreaCode']").attr("disabled", true);
	    			$("[ng-model='$root.seminar.contest.contestInfo.univCode']").attr("disabled", true);
	    		}
				
				if (!isNull(seminarSeq)) {
					$rootScope.seminar.contest.isModify = true;
					var param = {
							seminarSeq : seminarSeq
					};
					seminarService.getSeminarInfo(param, function(data) {
						$rootScope.seminar.contest.contestInfo = data.seminarInfo;
						$rootScope.seminar.contest.contestInfo.seminarSeq = seminarSeq;
						$rootScope.seminar.contest.contestInfo.idx = idx;
						
						$rootScope.seminar.contest.contestInfo.seminarType = data.seminarInfo.seminarType;
						$rootScope.seminar.contest.contestInfo.exchangeYn = data.seminarInfo.exchangeYn;
						$rootScope.seminar.contest.contestInfo.displayYn = data.seminarInfo.displayYn;
						
						$rootScope.seminar.contest.contestInfo.classStartHour = data.seminarInfo.classStartTime.substring(0, 2);
						$rootScope.seminar.contest.contestInfo.classStartMinute = data.seminarInfo.classStartTime.substring(2, 4);
						$rootScope.seminar.contest.contestInfo.classEndHour = data.seminarInfo.classEndTime.substring(0, 2);
						$rootScope.seminar.contest.contestInfo.classEndMinute = data.seminarInfo.classEndTime.substring(2, 4);
						
						$rootScope.seminar.contest.contestInfo.imgSrc	= data.seminarInfo.thumbnailUrl;
						
						CKEDITOR.instances["contents"].setData($rootScope.seminar.contest.contestInfo.contents);
						
						$scope.getChildCdList("univAreaCode", "univCode");
					});
				}
				else {
					$rootScope.seminar.contest.isModify = false;
					$rootScope.seminar.contest.contestInfo.seminarSeq = '';
					$rootScope.seminar.contest.contestInfo.imgSrc = null;
					$('#thumb-img').attr("src", $rootScope.seminar.contest.contestInfo.imgSrc);
					$rootScope.seminar.contest.contestInfo.regUserName = $rootScope.userSession.userName;
					$rootScope.seminar.contest.contestInfo.regUserSeq = $rootScope.userSession.userSeq;
					$rootScope.seminar.contest.contestInfo.regDt = now;

					CKEDITOR.instances["contents"].setData('');
				}
			}
			
			/**
             * 기존에 등록된 첨부파일 삭제
             * @param parameter index
             */
			$scope.removeAttachFile = function(idx){
            	if(!isNull(idx)){
            		if(!isNull($rootScope.seminar.contest.contestInfo.removeFileKeys)){
            			$rootScope.seminar.contest.contestInfo.removeFileKeys += ",";
            		}else{
            			$rootScope.seminar.contest.contestInfo.removeFileKeys = "";
            		}
            		$rootScope.seminar.contest.contestInfo.removeFileKeys += $("#fileKey_"+idx).val();
            		$("#fileKey_"+idx).parent().parent().remove();
            	}
            };
			
			/**
             * 저장을 클릭했을 때 이벤트
             */
            $scope.submit = function() {
                console.log('field value => ', $rootScope.seminar.contest.contestInfo);
                var seminarType;
                var exchangeYn;
                var displayYn;
                

                if($rootScope.seminar.contest.contestInfo.seminarSeq === undefined) {
                	$rootScope.seminar.contest.contestInfo.seminarSeq = null;
                }
                
                switch ($rootScope.seminar.contest.contestInfo.seminarType) {
				case 'contest':
					seminarType = 3;
					break;
				case 'competition':
					seminarType = 4;
					break;
				}
                switch ($rootScope.seminar.contest.contestInfo.exchangeYn) {
                case 'exchange':
                	exchangeYn = 'Y';
                	break;
                case 'unexchange':
                	exchangeYn = 'N';
                	break;
                }
                switch ($rootScope.seminar.contest.contestInfo.displayYn) {
                case 'display':
                	displayYn = 'Y';
                	break;
                case 'none':
                	displayYn = 'N';
                	break;
                }
                if ($scope.checkValidate()) {
	                if ($rootScope.seminar.contest.uploader.queue.length) {
	                	$rootScope.seminar.contest.uploader.formData = [];
	                    var item = $rootScope.seminar.contest.uploader.queue[0];
	                    var classStartTime = $rootScope.seminar.contest.contestInfo.classStartHour + $rootScope.seminar.contest.contestInfo.classStartMinute;
	                    var classEndTime = $rootScope.seminar.contest.contestInfo.classEndHour + $rootScope.seminar.contest.contestInfo.classEndMinute;
	                    
	                    item.formData.push({seminarSeq			: $rootScope.seminar.contest.contestInfo.seminarSeq});
	                    item.formData.push({seminarType			: seminarType});
	                    item.formData.push({univCode			: $rootScope.seminar.contest.contestInfo.univCode});
	                    item.formData.push({title				: $rootScope.seminar.contest.contestInfo.title});
	                    item.formData.push({applyStartDay		: $rootScope.seminar.contest.contestInfo.applyStartDay.replace(/[^0-9]/gi,"")});
	                    item.formData.push({applyEndDay			: $rootScope.seminar.contest.contestInfo.applyEndDay.replace(/[^0-9]/gi,"")});
	                    item.formData.push({classDay			: $rootScope.seminar.contest.contestInfo.classDay.replace(/[^0-9]/gi,"")});
	                    item.formData.push({classStartTime		: classStartTime});
	                    item.formData.push({classEndTime		: classEndTime});
	                    item.formData.push({place				: $rootScope.seminar.contest.contestInfo.place});
	                    item.formData.push({exchangeYn			: exchangeYn});
	                    item.formData.push({displayYn			: displayYn});
	                    item.formData.push({thumbnailFileKey	: nvltoStr($rootScope.seminar.contest.contestInfo.thumbnailFileKey,"")});
//	                    item.formData.push({removeFileKeys		: nvltoStr($rootScope.seminar.contest.contestInfo.removeFileKeys)});
	                    item.formData.push({contents			: CKEDITOR.instances['contents'].getData()});
	                    
	                    item.onSuccess = function(response, status) {
	                    	var seq = response.seqSeminar;
	                    	
	                    	if ($rootScope.seminar.contest.multiUploader.queue.length) {
	            				$rootScope.seminar.contest.multiUploader.formData = [];
	                    	
	            				$.each($rootScope.seminar.contest.multiUploader.queue, function(i, items) {
	            					items.formData.push({seminarSeq : seq});
	            					items.formData.push({removeFileKeys : nvltoStr($rootScope.seminar.contest.contestInfo.removeFileKeys)});
	            					
	            					items.onError = function(response, status) {
	            						 console.error('logo upload error status => ', status);
	                                     commonService.etcError(response);
	            					}
	            				});
	            				$rootScope.seminar.contest.multiUploader.onCompleteAll = function(){
	            					$scope.goContestListView();
	        						$scope.search(true);
	            				};
	                            $rootScope.seminar.contest.multiUploader.uploadAll();
	                    	}
	                    	else {
            					$scope.goContestListView();
        						$scope.search(true);
	                    	}
	                    };
	                    item.onError = function(response, status) {
	                        console.error('logo upload error status => ', status);
	                        commonService.etcError(response);
	                    };
	                    commonService.confirm('저장 하시겠습니까?', function() {
	                    	item.upload();
	                    	$scope.goContestListView();
    						$scope.search(true);
	                    });
	                } else {
	                	if ($rootScope.seminar.contest.multiUploader.queue.length) {
            				$rootScope.seminar.contest.multiUploader.formData = [];
                    	
            				$.each($rootScope.seminar.contest.multiUploader.queue, function(i, items) {
            					items.formData.push({seminarSeq : $rootScope.seminar.contest.contestInfo.seminarSeq});
            					items.formData.push({removeFileKeys : nvltoStr($rootScope.seminar.contest.contestInfo.removeFileKeys)});
            					
            					items.onError = function(response, status) {
            						 console.error('logo upload error status => ', status);
                                     commonService.etcError(response);
            					}
            				});
            				commonService.confirm('저장 하시겠습니까?', function() {
            					$rootScope.seminar.contest.multiUploader.onCompleteAll = function(){
                					$scope.goContestListView();
            						$scope.search(true);
                				};
                                $rootScope.seminar.contest.multiUploader.uploadAll();
    	                    });
                    	}
                    	else {
                    		var param = {
    	                    		seminarSeq			: $rootScope.seminar.contest.contestInfo.seminarSeq,
    	                    		seminarType			: seminarType,
    	                    		univCode			: $rootScope.seminar.contest.contestInfo.univCode,
    	                    		title				: $rootScope.seminar.contest.contestInfo.title,
    	                    		applyStartDay		: $rootScope.seminar.contest.contestInfo.applyStartDay.replace(/[^0-9]/gi,""),
    	                    		applyEndDay			: $rootScope.seminar.contest.contestInfo.applyEndDay.replace(/[^0-9]/gi,""),
    	                    		classDay			: $rootScope.seminar.contest.contestInfo.classDay.replace(/[^0-9]/gi,""),
    	                    		classStartTime		: $rootScope.seminar.contest.contestInfo.classStartHour + $rootScope.seminar.contest.contestInfo.classStartMinute,
    	                    		classEndTime		: $rootScope.seminar.contest.contestInfo.classEndHour + $rootScope.seminar.contest.contestInfo.classEndMinute,
    	                    		place				: $rootScope.seminar.contest.contestInfo.place,
    	                    		exchangeYn			: exchangeYn,
    	                    		displayYn			: displayYn,
    	                    		contents			: CKEDITOR.instances['contents'].getData(),
    	                    		removeFileKeys		: $rootScope.seminar.contest.contestInfo.removeFileKeys
    	                    };
    	                    
                    		commonService.confirm('저장 하시겠습니까?', function() {
    	                    	seminarService.saveSeminarInfo(param, function(data) {
    	                    		$scope.goContestListView();
    	                    		$scope.search(true);
        	                    });
    	                    });
                    	}
	                }
	            };
            }
            
            /**
			 * 삭제
			 */
			$scope.deleteContest = function() {
				commonService.confirm('삭제하시겠습니까? ', function() {
					var param = {
							seminarSeq		: $rootScope.seminar.contest.contestInfo.seminarSeq,
					};
					
					seminarService.deleteSeminarInfo(param, function(data) {
						$scope.goContestListView();
						$scope.search(true);
					});
				});
			}
            
            /**
             * 상태 코드
             */
            $scope.getSeminarColStr= function(idx, col) {
            	var contestInfo = {};
            	var resultStr = "";
            	if(!isNull(idx)) {
            		contestInfo = $rootScope.seminar.contest.contestList[idx];
            	}
            	else {
            		contestInfo = $rootScope.seminar.contest.contestInfo;
            	}
            	
            	switch (col) {
				case 'seminarType':
					if(!isNull(contestInfo)) {
	            		if(contestInfo.seminarType === 'contest') {
	            			resultStr = "공모전";
	            		} else if(contestInfo.seminarType === 'competition') {
	            			resultStr = "경시대회";
	            		}
	            	}
	            	return resultStr;
					break;
				case 'displayYn':
					if(!isNull(contestInfo)) {
	            		if(contestInfo.displayYn === 'Y') {
	            			resultStr = "노출";
	            		} else if(contestInfo.displayYn === 'N') {
	            			resultStr = "비노출";
	            		}
	            	}
	            	return resultStr;
					break;
				case 'exchangeYn':
					if(!isNull(contestInfo)) {
	            		if(contestInfo.exchangeYn === 'Y') {
	            			resultStr = "교류";
	            		} else if(contestInfo.exchangeYn === 'N') {
	            			resultStr = "비교류";
	            		}
	            	}
					return resultStr;
					break;
				case 'seminarStatus':
					if(!isNull(contestInfo)){
	            		var nowDate = new Date();
	            		var nowDateStr = nowDate.getFullYear()+""+lpad(nowDate.getMonth()+1, 2)+""+lpad(nowDate.getDate(), 2);
	            		if(nowDateStr >= contestInfo.applyStartDay && nowDateStr <= contestInfo.applyEndDay){
	            			$rootScope.seminar.contest.contestInfo.status = "02";
	            			resultStr = "접수중";
	            		}else if(nowDateStr < contestInfo.applyStartDay){
	            			$rootScope.seminar.contest.contestInfo.status = "01";
	            			resultStr = "대기";
	            		}else if(!isNull(contestInfo.seminarSeq)){
	            			$rootScope.seminar.contest.contestInfo.status = "03";
	            			resultStr = "마감";
	            		}
	            	}
	            	return resultStr;
	            	break;
				}
            }

			/**
        	 * 세미나 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if($rootScope.seminar.contest.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
        				searchUnivArea		: $rootScope.seminar.contest.searchUnivArea,
						searchUniv			: $rootScope.seminar.contest.searchUniv,
						searchSeminarType	: $rootScope.seminar.contest.searchSeminarType,
						searchDisplayYn		: $rootScope.seminar.contest.searchDisplayYn,
						searchEtcOption		: $rootScope.seminar.contest.searchEtcOption,
						searchKeywords		: $rootScope.seminar.contest.searchKeywords,
						sort				: $rootScope.seminar.contest.sort,
						order				: $rootScope.seminar.contest.order,
						isPaging			: 'N',
						type1				: 3,
						type2				: 4,
				}
        		
        		$("<input></input>").attr({type:"hidden", name:"searchSeminarType",		value:param.searchSeminarType	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUnivArea",		value:param.searchUnivArea		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUniv",			value:param.searchUniv			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sort",					value:param.sort				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"order",					value:param.order				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"isPaging",				value:"N"						}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sortOnly",				value:"Y"						}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"type1",					value:3							}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"type2",					value:4							}).appendTo($("#excelForm"));
        		
        		$("#excelForm").attr("action", Const.contextPath + "seminar/downloadContestList.do").submit();
        		$("#excelForm").html("");
        	};
            
        	/**
			 * 인풋 밸리데이션
			 */
			$scope.checkValidate = function(){
				if(isNull($rootScope.seminar.contest.contestInfo.univAreaCode)){
					commonService.alert("학교 구분을 선택해주세요.", $("[ng-model='$root.seminar.contest.contestInfo.univAreaCode']").focus());
					return false;
				}
				
				if(isNull($rootScope.seminar.contest.contestInfo.univCode)){
					commonService.alert("학교 구분을 선택해주세요.", $("[ng-model='$root.seminar.contest.contestInfo.univCode']").focus());
					return false;
				}
				if(isNull($rootScope.seminar.contest.contestInfo.title)){
					commonService.alert("제목을 입력해주세요.");
					return false;
				}
				 
				if(isNull($rootScope.seminar.contest.contestInfo.applyStartDay)){
					commonService.alert("접수 시작 기간을 선택해주세요.");
					return false;
				}else{
					if(!isNull($rootScope.seminar.contest.contestInfo.applyEndDay)){
						if($rootScope.seminar.contest.contestInfo.applyStartDay > $rootScope.seminar.contest.contestInfo.applyEndDay){
							commonService.alert("접수 시작일이 종료일보다 뒤에 있을 수 없습니다.");
							return false;
						} 
					}
				}
        		
				if(isNull($rootScope.seminar.contest.contestInfo.applyEndDay)){
					commonService.alert("접수 종료 기간을 선택해주세요.");
					return false;
				}
				 
				if(isNull(CKEDITOR.instances['contents'].getData())){
					commonService.alert("강좌 내용을 입력해주세요.");
					return false;
				}
				 
				return true;
			};
		});
})());


















