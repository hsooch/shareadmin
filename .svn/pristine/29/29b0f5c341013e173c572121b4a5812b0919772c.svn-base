((function() {
	angular.module('appModule') 	
		.controller('seminarListCtrl', function($scope, $rootScope, $compile, commonService, seminarService, Const, FileUploader) {
			$rootScope.seminar.list.scope = $scope;
			var currentDate = new Date();
			var now = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
			
			/**
             * 썸네일 업로더 설정
             */	
            if (!$rootScope.seminar.list.uploader) {
                $rootScope.seminar.list.uploader = new FileUploader({
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
            if (!$rootScope.seminar.list.multiUploader) {
            	$rootScope.seminar.list.multiUploader = new FileUploader({
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
        	if($rootScope.seminar.list.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.seminar.list.searchUnivAreaList = [];
            			$rootScope.seminar.list.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.seminar.list.univAreaCodeList = [];
            			$rootScope.seminar.list.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.seminar.list.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.seminar.list.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };

        	$("[ng-model='$root.seminar.list.seminarInfo.applyStartDay']").datepicker(getDatePickerConfig("dateField"));
    		$("[ng-model='$root.seminar.list.seminarInfo.applyEndDay']").datepicker(getDatePickerConfig("dateField"));
    		$("[ng-model='$root.seminar.list.seminarInfo.classDay']").datepicker(getDatePickerConfig("dateField"));
    		
			/**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.seminar.list[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.seminar.list[parentModel])) {
        				$rootScope.seminar.list[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				return;
        			}
        			commonService.getCodeList($rootScope.seminar.list[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.seminar.list[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.seminar.list[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)) {
                				$rootScope.seminar.list[childModel] = $rootScope.seminar.list[childModel+"List"][0].code;
                			}
                			else {
                				$rootScope.seminar.list[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.seminar.list.seminarInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.seminar.list.seminarInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.seminar.list[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.seminar.list[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			//$rootScope.seminar.list[childModel] = $rootScope.seminar.list[childModel+"List"][0].code;
	            		}
        			});
        		}
        	};
        	
        	// 검색조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.seminar.list.searchUnivArea		= null;
    			$rootScope.seminar.list.searchUniv			= null;
    			$rootScope.seminar.list.searchSeminarType	= null;
    			$rootScope.seminar.list.searchExchangeYn	= null;
    			$rootScope.seminar.list.searchDisplayYn		= null;
    			$rootScope.seminar.list.searchSeminarStatus	= null;
    			$rootScope.seminar.list.searchEtcOption		= null;
    			$rootScope.seminar.list.searchKeywords		= null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.seminar.list.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
        			$rootScope.seminar.list.searchUniv = $rootScope.userSession.univCode;
        			
        			$("[ng-model='$root.seminar.list.searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.seminar.list.searchUniv']").attr("disabled", true);
        		}
        	};
			
			/**
			 * 세미나 목록 페이지 이동
			 */
			$scope.goSeminarListView = function() {
				$rootScope.seminar.list.pageViewType = "list";
				$rootScope.seminar.list.seminarInfo = {};
				
				$rootScope.seminar.list.uploader.queue = [];
				$rootScope.seminar.list.multiUploader.queue = [];
				
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
				
				switch ($rootScope.seminar.list.searchSeminarType) {
				case 'seminar':
					searchSeminarType = 1;
					break;
				case 'lecture':
					searchSeminarType = 2;
					break;
				}
				switch ($rootScope.seminar.list.searchDisplayYn) {
				case 'display':
					searchDisplayYn = 'Y';
					break;
				case 'none':
					searchDisplayYn = 'N';
					break;
				}
				var param = {
						searchUnivArea		: $rootScope.seminar.list.searchUnivArea,
						searchUniv			: $rootScope.seminar.list.searchUniv,
						searchSeminarType	: searchSeminarType,
						searchDisplayYn		: searchDisplayYn,
						searchSeminarStatus	: $rootScope.seminar.list.searchSeminarStatus,
						searchEtcOption		: $rootScope.seminar.list.searchEtcOption,
						searchKeywords		: $rootScope.seminar.list.searchKeywords,
						sort				: $rootScope.seminar.list.sort,
						order				: $rootScope.seminar.list.order,
						nowPage				: isNull(pagingGlobalVar["seminarListPaging"])? 1 : pagingGlobalVar["seminarListPaging"].nowPage,
						rowCnt				: $rootScope.seminar.list.maxRowCnt,
						type1				: 1,
						type2				: 2,
				}
				seminarService.getSeminarList(param, function(data) {
					$rootScope.seminar.list.searchYn = "Y";
					$rootScope.seminar.list.seminarList = data.seminarList;
					if (data.seminarList.length > 0) {
						var totCnt = data.seminarList[0].totalCnt*1;
						var nowPage = $rootScope.seminar.list.nowPage*1;
						var maxRowCnt = $rootScope.seminar.list.maxRowCnt*1;
						$rootScope.seminar.list.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.seminar.list.nowPage = nowPage;
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
						$rootScope.seminar.list.totalCnt = 0;
					}
				});
			}
			
			//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
            ){
    			$rootScope.seminar.list.searchUnivArea = $rootScope.userSession.univAreaCd;
    			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
    			$rootScope.seminar.list.searchUniv = $rootScope.userSession.univCode;
    			
    			$("[ng-model='$root.seminar.list.searchUnivArea']").attr("disabled", true);
    			$("[ng-model='$root.seminar.list.searchUniv']").attr("disabled", true);
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
        		
        		$rootScope.seminar.list.sort = sort;
        		$rootScope.seminar.list.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
			
			/**
			 * 세미나 등록 페이지 이동
			 */
			$scope.goSeminarRegistView = function(seminarSeq, idx) {
				$rootScope.seminar.list.pageViewType = "modify";
				
				//사용자 권한에 따른 학교구분 검색조건 세팅
	    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
	    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
	            ){
	    			$rootScope.seminar.list.seminarInfo.univAreaCode = $rootScope.userSession.univAreaCd;
	    			$scope.getChildCdList("univAreaCode", "univCode", $rootScope.userSession.univCode);
	    			$rootScope.seminar.list.seminarInfo.univCode = $rootScope.userSession.univCode;
	    			
	    			$("[ng-model='$root.seminar.list.seminarInfo.univAreaCode']").attr("disabled", true);
	    			$("[ng-model='$root.seminar.list.seminarInfo.univCode']").attr("disabled", true);
	    		}
				
				if (!isNull(seminarSeq)) {
					$rootScope.seminar.list.isModify = true;
					var param = {
							seminarSeq : seminarSeq
					};
					seminarService.getSeminarInfo(param, function(data) {
						$rootScope.seminar.list.seminarInfo = data.seminarInfo;
						$rootScope.seminar.list.seminarInfo.seminarSeq = seminarSeq;
						$rootScope.seminar.list.seminarInfo.idx = idx;
						
						$rootScope.seminar.list.seminarInfo.seminarType = data.seminarInfo.seminarType;
						$rootScope.seminar.list.seminarInfo.acceptType = data.seminarInfo.acceptType;
						$rootScope.seminar.list.seminarInfo.applyAvailableType = data.seminarInfo.applyAvailableType;
						$rootScope.seminar.list.seminarInfo.exchangeYn = data.seminarInfo.exchangeYn;
						$rootScope.seminar.list.seminarInfo.displayYn = data.seminarInfo.displayYn;
						$rootScope.seminar.list.seminarInfo.applyYn = data.seminarInfo.applyYn;
						
						$rootScope.seminar.list.seminarInfo.classStartHour = data.seminarInfo.classStartTime.substring(0, 2);
						$rootScope.seminar.list.seminarInfo.classStartMinute = data.seminarInfo.classStartTime.substring(2, 4);
						$rootScope.seminar.list.seminarInfo.classEndHour = data.seminarInfo.classEndTime.substring(0, 2);
						$rootScope.seminar.list.seminarInfo.classEndMinute = data.seminarInfo.classEndTime.substring(2, 4);
						
						$rootScope.seminar.list.seminarInfo.imgSrc	= data.seminarInfo.thumbnailUrl;
						CKEDITOR.instances["contents"].setData($rootScope.seminar.list.seminarInfo.contents);
						$scope.getChildCdList("univAreaCode", "univCode");
					});
				}
				else {
					$rootScope.seminar.list.isModify = false;
					$rootScope.seminar.list.seminarInfo.seminarSeq = '';
					$rootScope.seminar.list.seminarInfo.imgSrc = null;
					$('#thumb-img').attr("src", $rootScope.seminar.list.seminarInfo.imgSrc);
					$rootScope.seminar.list.seminarInfo.regUserName = $rootScope.userSession.userName;
					$rootScope.seminar.list.seminarInfo.regUserSeq = $rootScope.userSession.userSeq;
					$rootScope.seminar.list.seminarInfo.regDt = now;

					CKEDITOR.instances["contents"].setData('');
				}
			}
			
			/**
             * 기존에 등록된 첨부파일 삭제
             * @param parameter index
             */
			$scope.removeAttachFile = function(idx){
            	if(!isNull(idx)){
            		if(!isNull($rootScope.seminar.list.seminarInfo.removeFileKeys)){
            			$rootScope.seminar.list.seminarInfo.removeFileKeys += ",";
            		}else{
            			$rootScope.seminar.list.seminarInfo.removeFileKeys = "";
            		}
            		$rootScope.seminar.list.seminarInfo.removeFileKeys += $("#fileKey_"+idx).val();
            		$("#fileKey_"+idx).parent().parent().remove();
            	}
            };
			
			/**
             * 저장을 클릭했을 때 이벤트
             */
            $scope.submit = function() {
                console.log('field value => ', $rootScope.seminar.list.seminarInfo);
                var seminarType;
                var acceptType;
                var applyAvailableType;
                var exchangeYn;
                var displayYn;
                var applyYn;
                
                if($rootScope.seminar.list.seminarInfo.seminarSeq === undefined) {
                	$rootScope.seminar.list.seminarInfo.seminarSeq = null;
                }
                
                switch ($rootScope.seminar.list.seminarInfo.seminarType) {
				case 'seminar':
					seminarType = 1;
					break;
				case 'lecture':
					seminarType = 2;
					break;
				}
                switch ($rootScope.seminar.list.seminarInfo.acceptType) {
                case 'auto':
                	acceptType = 1;
                	break;
                case 'admin':
                	acceptType = 2;
                	break;
                }
                switch ($rootScope.seminar.list.seminarInfo.applyAvailableType) {
                case 'all':
                	applyAvailableType = 1;
                	break;
                case 'only':
                	applyAvailableType = 2;
                	break;
                }
                switch ($rootScope.seminar.list.seminarInfo.exchangeYn) {
                case 'exchange':
                	exchangeYn = 'Y';
                	break;
                case 'unexchangeYn':
                	exchangeYn = 'N';
                	break;
                }
                switch ($rootScope.seminar.list.seminarInfo.displayYn) {
                case 'display':
                	displayYn = 'Y';
                	break;
                case 'none':
                	displayYn = 'N';
                	break;
                }
                switch ($rootScope.seminar.list.seminarInfo.applyYn) {
                case 'apply':
                	applyYn = 'Y';
                	break;
                case 'noapply':
                	applyYn = 'N';
                	break;
                }
                if ($scope.checkValidate()) {
	                if ($rootScope.seminar.list.uploader.queue.length) {
	                	$rootScope.seminar.list.uploader.formData = [];
	                    var item = $rootScope.seminar.list.uploader.queue[0];
	                    var classStartTime = $rootScope.seminar.list.seminarInfo.classStartHour + $rootScope.seminar.list.seminarInfo.classStartMinute;
	                    var classEndTime = $rootScope.seminar.list.seminarInfo.classEndHour + $rootScope.seminar.list.seminarInfo.classEndMinute;
	                    
	                    item.formData.push({seminarSeq			: $rootScope.seminar.list.seminarInfo.seminarSeq});
	                    item.formData.push({seminarType			: seminarType});
	                    item.formData.push({univCode			: $rootScope.seminar.list.seminarInfo.univCode});
	                    item.formData.push({title				: $rootScope.seminar.list.seminarInfo.title});
	                    item.formData.push({applyStartDay		: $rootScope.seminar.list.seminarInfo.applyStartDay.replace(/[^0-9]/gi,"")});
	                    item.formData.push({applyEndDay			: $rootScope.seminar.list.seminarInfo.applyEndDay.replace(/[^0-9]/gi,"")});
	                    item.formData.push({classDay			: $rootScope.seminar.list.seminarInfo.classDay.replace(/[^0-9]/gi,"")});
	                    item.formData.push({maxUserCnt			: $rootScope.seminar.list.seminarInfo.maxUserCnt});
	                    item.formData.push({classStartTime		: classStartTime});
	                    item.formData.push({classEndTime		: classEndTime});
	                    item.formData.push({place				: $rootScope.seminar.list.seminarInfo.place});
	                    item.formData.push({teacherName			: $rootScope.seminar.list.seminarInfo.teacherName});
	                    item.formData.push({acceptType			: acceptType});
	                    item.formData.push({exchangeYn			: exchangeYn});
	                    item.formData.push({displayYn			: displayYn});
	                    item.formData.push({applyYn				: applyYn});
	                    item.formData.push({applyAvailableType	: applyAvailableType});
	                    item.formData.push({thumbnailFileKey	: nvltoStr($rootScope.seminar.list.seminarInfo.thumbnailFileKey,"")});
//	                    item.formData.push({removeFileKeys		: nvltoStr($rootScope.seminar.list.seminarInfo.removeFileKeys)});
	                    item.formData.push({contents			: CKEDITOR.instances['contents'].getData()});
	                    
	                    item.onSuccess = function(response, status) {
	                    	var seq = response.seqSeminar;
	                    	
	                    	if ($rootScope.seminar.list.multiUploader.queue.length) {
	            				$rootScope.seminar.list.multiUploader.formData = [];
	                    	
	            				$.each($rootScope.seminar.list.multiUploader.queue, function(i, items) {
	            					items.formData.push({seminarSeq : seq});
	            					items.formData.push({removeFileKeys : nvltoStr($rootScope.seminar.list.seminarInfo.removeFileKeys)});
	            					
	            					items.onError = function(response, status) {
	            						 console.error('logo upload error status => ', status);
	                                     commonService.etcError(response);
	            					}
	            				});
	            				
	            				$rootScope.seminar.list.multiUploader.onCompleteAll = function(){
	            					$scope.goSeminarListView();
	        						$scope.search(true);
	            				};
	                            $rootScope.seminar.list.multiUploader.uploadAll();
	                    	}
	                    	else {
            					$scope.goSeminarListView();
        						$scope.search(true);
	                    	}
	                    };
	                    item.onError = function(response, status) {
	                        console.error('logo upload error status => ', status);
	                        commonService.etcError(response);
	                    };
	                    commonService.confirm('저장 하시겠습니까?', function() {
	                    	item.upload();
	                    	$scope.goSeminarListView();
	                    	$scope.search(true);
	                    });
	                }
	                else {
	                	if ($rootScope.seminar.list.multiUploader.queue.length) {
            				$rootScope.seminar.list.multiUploader.formData = [];
                    	
            				$.each($rootScope.seminar.list.multiUploader.queue, function(i, items) {
            					items.formData.push({seminarSeq : $rootScope.seminar.list.seminarInfo.seminarSeq});
            					items.formData.push({removeFileKeys : nvltoStr($rootScope.seminar.list.seminarInfo.removeFileKeys)});
            					
            					items.onError = function(response, status) {
            						 console.error('logo upload error status => ', status);
                                     commonService.etcError(response);
            					}
            				});
            				commonService.confirm('저장 하시겠습니까?', function() {
            					$rootScope.seminar.list.multiUploader.onCompleteAll = function(){
                					$scope.goSeminarListView();
            						$scope.search(true);
                				};
                                $rootScope.seminar.list.multiUploader.uploadAll();
    	                    });
                    	}
                    	else {
                    		var param = {
    	                    		seminarSeq			: $rootScope.seminar.list.seminarInfo.seminarSeq,
    	                    		seminarType			: seminarType,
    	                    		univCode			: $rootScope.seminar.list.seminarInfo.univCode,
    	                    		title				: $rootScope.seminar.list.seminarInfo.title,
    	                    		applyStartDay		: $rootScope.seminar.list.seminarInfo.applyStartDay.replace(/[^0-9]/gi,""),
    	                    		applyEndDay			: $rootScope.seminar.list.seminarInfo.applyEndDay.replace(/[^0-9]/gi,""),
    	                    		classDay			: $rootScope.seminar.list.seminarInfo.classDay.replace(/[^0-9]/gi,""),
    	                    		maxUserCnt			: $rootScope.seminar.list.seminarInfo.maxUserCnt,
    	                    		classStartTime		: $rootScope.seminar.list.seminarInfo.classStartHour + $rootScope.seminar.list.seminarInfo.classStartMinute,
    	                    		classEndTime		: $rootScope.seminar.list.seminarInfo.classEndHour + $rootScope.seminar.list.seminarInfo.classEndMinute,
    	                    		place				: $rootScope.seminar.list.seminarInfo.place,
    	                    		teacherName			: $rootScope.seminar.list.seminarInfo.teacherName,
    	                    		acceptType			: acceptType,
    	                    		exchangeYn			: exchangeYn,
    	                    		displayYn			: displayYn,
    	                    		applyYn				: applyYn,
    	                    		applyAvailableType	: applyAvailableType,
    	                    		contents			: CKEDITOR.instances['contents'].getData(),
    	                    		removeFileKeys		: $rootScope.seminar.list.seminarInfo.removeFileKeys
    	                    };
    	                    commonService.confirm('저장 하시겠습니까?', function() {
    	                    	seminarService.saveSeminarInfo(param, function(data) {
        	                    	$scope.goSeminarListView();
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
			$scope.deleteSeminar = function() {
				commonService.confirm('삭제하시겠습니까? ', function() {
					var param = {
							seminarSeq		: $rootScope.seminar.list.seminarInfo.seminarSeq,
					};
					
					seminarService.deleteSeminarInfo(param, function(data) {
						$scope.goSeminarListView();
						$scope.search(true);
					});
				});
			}
            
            /**
             * 상태 코드
             */
            $scope.getSeminarColStr= function(idx, col) {
            	var seminarInfo = {};
            	var resultStr = "";
            	if(!isNull(idx)) {
            		seminarInfo = $rootScope.seminar.list.seminarList[idx];
            	}
            	else {
            		seminarInfo = $rootScope.seminar.list.seminarInfo;
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
	            			$rootScope.seminar.list.seminarInfo.status = "02";
	            			resultStr = "접수중";
	            		}else if(nowDateStr < seminarInfo.applyStartDay){
	            			$rootScope.seminar.list.seminarInfo.status = "01";
	            			resultStr = "대기";
	            		}else if(!isNull(seminarInfo.seminarSeq)){
	            			$rootScope.seminar.list.seminarInfo.status = "03";
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
        		if($rootScope.seminar.list.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
        				searchUnivArea		: $rootScope.seminar.list.searchUnivArea,
						searchUniv			: $rootScope.seminar.list.searchUniv,
						searchSeminarType	: $rootScope.seminar.list.searchSeminarType,
						searchExchangeYn	: $rootScope.seminar.list.searchExchangeYn,
						searchDisplayYn		: $rootScope.seminar.list.searchDisplayYn,
						searchSeminarStatus	: $rootScope.seminar.list.searchSeminarStatus,
						searchEtcOption		: $rootScope.seminar.list.searchEtcOption,
						searchKeywords		: $rootScope.seminar.list.searchKeywords,
						sort				: $rootScope.seminar.list.sort,
						order				: $rootScope.seminar.list.order,
						isPaging			: 'N',
						type1				: 1,
						type2				: 2,
				}
        		
        		$("<input></input>").attr({type:"hidden", name:"searchSeminarType",		value:param.searchSeminarType	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUnivArea",		value:param.searchUnivArea		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUniv",			value:param.searchUniv			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sort",					value:param.sort				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"order",					value:param.order				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"isPaging",				value:"N"						}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sortOnly",				value:"Y"						}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"type1",					value:1							}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"type2",					value:2							}).appendTo($("#excelForm"));
        		
        		$("#excelForm").attr("action", Const.contextPath + "seminar/downloadSeminarList.do").submit();
        		$("#excelForm").html("");
        	};
            
        	/**
			 * 인풋 밸리데이션
			 */
			$scope.checkValidate = function(){
				if(isNull($rootScope.seminar.list.seminarInfo.univAreaCode)){
					commonService.alert("학교 구분을 선택해주세요.", $("[ng-model='$root.seminar.list.seminarInfo.univAreaCode']").focus());
					return false;
				}
				
				if(isNull($rootScope.seminar.list.seminarInfo.univCode)){
					commonService.alert("학교 구분을 선택해주세요.", $("[ng-model='$root.seminar.list.seminarInfo.univCode']").focus());
					return false;
				}
				if(isNull($rootScope.seminar.list.seminarInfo.title)){
					commonService.alert("강좌명을 입력해주세요.");
					return false;
				}
				 
				if(isNull($rootScope.seminar.list.seminarInfo.applyStartDay)){
					commonService.alert("접수 시작 기간을 선택해주세요.");
					return false;
				}else{
					if(!isNull($rootScope.seminar.list.seminarInfo.applyEndDay)){
						if($rootScope.seminar.list.seminarInfo.applyStartDay > $rootScope.seminar.list.seminarInfo.applyEndDay){
							commonService.alert("접수 시작일이 종료일보다 뒤에 있을 수 없습니다.");
							return false;
						} 
					}
				}
        		
				if(isNull($rootScope.seminar.list.seminarInfo.applyEndDay)){
					commonService.alert("접수 종료 기간을 선택해주세요.");
					return false;
				}
        		
				if(isNull($rootScope.seminar.list.seminarInfo.classDay)){
					commonService.alert("강의 날짜를 선택해주세요.");
					return false;
				}
				 
				if(isNull($rootScope.seminar.list.seminarInfo.maxUserCnt)){
					commonService.alert("수강가능인원을 입력해주세요.");
					return false;
				}
				 
				if(isNull($rootScope.seminar.list.seminarInfo.classStartHour || $rootScope.seminar.list.seminarInfo.classStartMinute)){
					commonService.alert("강의 시작시간을 입력해주세요.");
					return false;
				}
				 
				if(isNull($rootScope.seminar.list.seminarInfo.classEndHour || $rootScope.seminar.list.seminarInfo.classEndMinute)){
					commonService.alert("강의 종료시간을 입력해주세요.");
					return false;
				}
				 
				if(isNull($rootScope.seminar.list.seminarInfo.place)){
					commonService.alert("장소를 입력해주세요.");
					return false;
				}
				 
				if(isNull($rootScope.seminar.list.seminarInfo.teacherName)){
					commonService.alert("강사명을 입력해주세요.");
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


















