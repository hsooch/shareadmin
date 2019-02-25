((function() {
	angular.module('appModule') 	
		.controller('seminarAttendCtrl', function($scope, $rootScope, $compile, commonService, seminarService, Const, FileUploader) {
			
			if (!$rootScope.seminar.attend.uploader) {
				$rootScope.seminar.attend.uploader = new FileUploader({
                	url: Const.contextPath + 'seminar/checkAttendWithCert.ajax',
                	filters: [{
                		name: 'fileSizeFilter',
                		fn: function (file) {
                			console.log('file => ', file);
                			if (file.size > 10485760) {
                				commonService.alert('업로드 파일 용량은 1MB 이하만 가능합니다.');
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
                	}], onBeforeAddQueue: function (files, options, filters) {
                		if (this.queue.length !== 0 && files.length > 0) {
                			this.clearQueue();
                		}
                		
                		this.addToQueue(files, options, filters);
                		console.log('queue => ', this.queue);
                	}
                });
			}
			
			
			/**
			 * 학교 지역 목록
			 */
        	if($rootScope.seminar.attend.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.seminar.attend.searchUnivAreaList = [];
            			$rootScope.seminar.attend.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.seminar.attend.univAreaCodeList = [];
            			$rootScope.seminar.attend.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.seminar.attend.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.seminar.attend.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
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
        		$rootScope.seminar.attend[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.seminar.attend[parentModel])) {
        				$rootScope.seminar.attend[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				return;
        			}
        			commonService.getCodeList($rootScope.seminar.attend[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.seminar.attend[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.seminar.attend[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)) {
                				$rootScope.seminar.attend[childModel] = $rootScope.seminar.attend[childModel+"List"][0].code;
                			}
                			else {
                				$rootScope.seminar.attend[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.seminar.attend.seminarInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.seminar.attend.seminarInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.seminar.attend[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.seminar.attend[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			//$rootScope.seminar.attend[childModel] = $rootScope.seminar.attend[childModel+"List"][0].code;
	            		}
        			});
        		}
        	};
        	
        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
            ){
    			$rootScope.seminar.attend.searchUnivArea = $rootScope.userSession.univAreaCd;
    			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
    			$rootScope.seminar.attend.searchUniv = $rootScope.userSession.univCode;
    			
    			$("[ng-model='$root.seminar.attend.searchUnivArea']").attr("disabled", true);
    			$("[ng-model='$root.seminar.attend.searchUniv']").attr("disabled", true);
    		}
        	
        	// 검색조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.seminar.attend.searchUnivArea		= null;
    			$rootScope.seminar.attend.searchUniv			= null;
    			$rootScope.seminar.attend.searchSeminarType		= null;
    			$rootScope.seminar.attend.searchSeminarStatus	= null;
    			$rootScope.seminar.attend.searchEtcOption		= null;
    			$rootScope.seminar.attend.searchKeywords		= null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.seminar.attend.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
        			$rootScope.seminar.attend.searchUniv = $rootScope.userSession.univCode;
        			
        			$("[ng-model='$root.seminar.attend.searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.seminar.attend.searchUniv']").attr("disabled", true);
        		}
        	};
        	
        	/**
        	 * 목록 보기
        	 */
        	$scope.search = function(redrawPage) {
        		var searchSeminarType;
				
				switch ($rootScope.seminar.attend.searchSeminarType) {
				case 'seminar':
					searchSeminarType = 1;
					break;
				case 'lecture':
					searchSeminarType = 2;
					break;
				}
        		var param = {
        				searchUnivArea		: $rootScope.seminar.attend.searchUnivArea,
						searchUniv			: $rootScope.seminar.attend.searchUniv,
						searchSeminarType	: searchSeminarType,
						searchSeminarStatus	: $rootScope.seminar.attend.searchSeminarStatus,
						searchEtcOption		: $rootScope.seminar.attend.searchEtcOption,
						searchKeywords		: $rootScope.seminar.attend.searchKeywords,
						sort				: $rootScope.seminar.attend.sort,
						order				: $rootScope.seminar.attend.order,
						nowPage				: isNull(pagingGlobalVar["seminarListPaging"])? 1 : pagingGlobalVar["seminarListPaging"].nowPage,
						rowCnt				: $rootScope.seminar.attend.maxRowCnt,
						type1				: 1,
						type2				: 2,
        		}
        		
        		seminarService.getSeminarList(param, function(data) {
        			$rootScope.seminar.attend.searchYn = "Y";
					$rootScope.seminar.attend.seminarList = data.seminarList;
					
					if (data.seminarList.length > 0) {
						var totCnt = data.seminarList[0].totalCnt*1;
						var nowPage = $rootScope.seminar.attend.nowPage*1;
						var maxRowCnt = $rootScope.seminar.attend.maxRowCnt*1;
						$rootScope.seminar.attend.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.seminar.attend.nowPage = nowPage;
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
						$rootScope.seminar.attend.totalCnt = 0;
					}
        		});
        	}
        	
        	// 페이지 로드시 목록을 조회
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
        		
        		$rootScope.seminar.attend.sort = sort;
        		$rootScope.seminar.attend.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
        	/**
        	 * 목록으로 가기
        	 */
        	$scope.goSeminarAttendListView = function() {
				$rootScope.seminar.attend.pageViewType = "list";
				$rootScope.seminar.attend.attendInfo = {};
				$scope.search();
			};
        	
        	/**
        	 * 출석처리
        	 */
        	$scope.attend = function(seq, idx) {
        		$rootScope.seminar.attend.pageViewType = "attend";
        		$rootScope.seminar.attend.seminarInfo = {};
				var param = {
						seminarSeq : seq
				};
				seminarService.getSeminarInfo(param, function(data) {
					$rootScope.seminar.attend.seminarInfo = data.seminarInfo;
					$rootScope.seminar.attend.attendList = [];
					
					var seminarType;
					var availableType;
					var acceptType;
					var exchangeYn;
					switch (data.seminarInfo.seminarType) {
					case 'seminar':
						seminarType = '세미나';
						break;
					case 'lecture':
						seminarType = '특강';
						break;
					}
					switch (data.seminarInfo.applyAvailableType) {
					case 'all':
						availableType = '모든 학교 학생';
						break;
					case 'only':
						availableType = '소속 대학 학생만';
						break;
					}
					switch (data.seminarInfo.acceptType) {
					case 'auto':
						acceptType = '선착순 자동 승인';
						break;
					case 'admin':
						acceptType = '관리자 직접 승인';
						break;
					}
					switch (data.seminarInfo.exchangeYn) {
					case 'exchange':
						exchangeYn = '교류';
						break;
					case 'unexchange':
						exchangeYn = '비교류';
						break;
					}
					$rootScope.seminar.attend.seminarInfo.seminarType = seminarType;
					$rootScope.seminar.attend.seminarInfo.applyAvailableType = availableType;
					$rootScope.seminar.attend.seminarInfo.acceptType = acceptType;
					$rootScope.seminar.attend.seminarInfo.exchangeYn = exchangeYn;
					$rootScope.seminar.attend.attendCnt = 0;
					
					seminarService.getAttendList(param, function(datas) {
						if(!isNull(datas)) {
							$rootScope.seminar.attend.attendList = datas.attendList;
							var applyUserCnt = $rootScope.seminar.attend.seminarInfo.applyUserCnt;
							var attendUserCnt = $rootScope.seminar.attend.seminarInfo.attendUserCnt;
							
							$.each($rootScope.seminar.attend.attendList, function(i, attend) {
								console.log(attend);
								$rootScope.seminar.attend.attendPercent = attendUserCnt / applyUserCnt * 100;
								
								$rootScope.seminar.attend.attendList[i].uploader = new FileUploader({
				                	url: Const.contextPath + 'seminar/checkAttendWithCert.ajax',
				                	filters: [{
				                		name: 'fileSizeFilter',
				                		fn: function (file) {
				                			console.log('file => ', file);
				                			if (file.size > 10485760) {
				                				commonService.alert('업로드 파일 용량은 1MB 이하만 가능합니다.');
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
				                	}], onBeforeAddQueue: function (files, options, filters) {
				                		if (this.queue.length !== 0 && files.length > 0) {
				                			this.clearQueue();
				                		}
				                		
				                		this.addToQueue(files, options, filters);
				                		console.log('queue => ', this.queue);
				                		if ($rootScope.seminar.attend.attendList[i].uploader.queue.length) {
						        			var applyInfo = $rootScope.seminar.attend.attendList[i];
							            	var param = applyInfo;
							            	param.attendanceYn = "Y";
							            	
						                    var item = $rootScope.seminar.attend.attendList[i].uploader.queue[0];
						                    item.formData.push({attendanceUserSeq: $rootScope.userSession.userSeq});
						                    item.formData.push({certFileKey: nvltoStr(applyInfo.certFileKey,"")});
						                    item.formData.push({seminarSeq: applyInfo.seminarSeq});
						                    item.formData.push({userSeq: applyInfo.userSeq});
						                    item.formData.push({attendanceYn: param.attendanceYn});
						                    item.onSuccess = function() {
						                    	
						                        //commonService.alert('저장되었습니다.');
						                    };
						                    item.onError = function(response, status) {
						                        console.error('logo upload error status => ', status);
						                        commonService.etcError(response);
						                    };
						                    item.upload();
						                    $rootScope.seminar.attend.seminarInfo.attendUserCnt++;
					                		$rootScope.seminar.attend.attendPercent = $rootScope.seminar.attend.seminarInfo.attendUserCnt / $rootScope.seminar.attend.seminarInfo.applyUserCnt * 100;
						                } 
				                	}
				                });
							});
						}
						else {
							$rootScope.seminar.attend.attendList = [];
						}
						$rootScope.seminar.attend.certDeleteYn = 'N';
					});
					
				});
        	} 
        	
        	$scope.unCheckAttend = function(info, idx) {
        		var applyInfo = $rootScope.seminar.attend.attendList[idx];
            	var param = applyInfo;
            	param.attendanceYn = "N";
//            	$('#thisChk'+idx).removeClass('checked');
            	$rootScope.seminar.attend.attendclass = '';
            	
            	var params = {
            			attendanceUserSeq: $rootScope.userSession.userSeq,
                        seminarSeq: info.seminarSeq,
                        userSeq: info.userSeq,
                        attendanceYn:  param.attendanceYn	
            	}
            	
            	if(param.certFileKey) {
            		commonService.confirm('수강확인증이 등록되어 있습니다. 정말로 해제하시겠습니까?', function() {
            			seminarService.unCheckAttend(params, function() {
            				$rootScope.seminar.attend.seminarInfo.attendUserCnt--;
            				$rootScope.seminar.attend.attendPercent = $rootScope.seminar.attend.seminarInfo.attendUserCnt / $rootScope.seminar.attend.seminarInfo.applyUserCnt * 100; 
            			});
            		});
            	}
            	else {
            		seminarService.unCheckAttend(params, function() {
            			$rootScope.seminar.attend.seminarInfo.attendUserCnt--;
            			$rootScope.seminar.attend.attendPercent = $rootScope.seminar.attend.seminarInfo.attendUserCnt / $rootScope.seminar.attend.seminarInfo.applyUserCnt * 100;
        			});
            	}
            		
        	}
        	
        	$scope.checkAttend = function(info, idx) {
        		if ($('#thisChk'+idx).hasClass('checked')) {
        			$scope.unCheckAttend(info, idx);
        		}
        		else {
        			var applyInfo = $rootScope.seminar.attend.attendList[idx];
                	var param = applyInfo;
                	param.attendanceYn = "Y";
                	
                	var params = {
                			attendanceUserSeq: $rootScope.userSession.userSeq,
                            seminarSeq: info.seminarSeq,
                            userSeq: info.userSeq,
                            attendanceYn:  param.attendanceYn
                	}
                	seminarService.checkAttend(params, function() {
                		//commonService.alert('저장되었습니다.');
                		$rootScope.seminar.attend.attendclass = 'checked';
                		$rootScope.seminar.attend.seminarInfo.attendUserCnt++;
                		$rootScope.seminar.attend.attendPercent = $rootScope.seminar.attend.seminarInfo.attendUserCnt / $rootScope.seminar.attend.seminarInfo.applyUserCnt * 100;
                	});
        		}
        	}
        	
        	
        	$scope.removeCert = function(info, idx) {
        		var param = {
        				seminarSeq : info.seminarSeq,
        				userSeq: info.userSeq
        		}
        		commonService.confirm('삭제 하시겠습니까?', function() {
        			seminarService.removeCert(param, function() {
        				$('#certFileName'+idx).remove();
        				$('#certFileClose'+idx).remove();
        			});
        		});
        	}
        	
        	
        	/**
        	 * 상태 코드
        	 */
        	$scope.getSeminarColStr = function(col, idx) {
            	var seminarInfo = {};
            	var resultStr = "";
            	if(!isNull(idx)) {
            		seminarInfo = $rootScope.seminar.attend.seminarList[idx];
            	}
            	else {
            		seminarInfo = $rootScope.seminar.attend.seminarInfo;
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
        	
        	
		});
})());


















