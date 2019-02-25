((function() {
    angular.module('appModule')
        .controller('subjectCtrl', function($scope, $rootScope, subjectService, commonService, Const, ngDialog) {
        	$rootScope.semester.subject.scope = $scope;
        	$scope.listTitleYear = "";
			$scope.listTitleSemester = "";
			$scope.listTitleUniv = "";
			
			$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.semester.subject.searchUnivArea']").attr("disabled", true);
    				$("[ng-model='$root.semester.subject.searchUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
			
			/**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.semester.subject[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.semester.subject[parentModel])) return;
        			commonService.getCodeList($rootScope.semester.subject[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.semester.subject[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.semester.subject[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			$rootScope.semester.subject[childModel] = $rootScope.semester.subject[childModel+"List"][0].code;
                			if(isNull(defaultValue)){
                				$rootScope.semester.subject[childModel] = $rootScope.semester.subject[childModel+"List"][0].code;
                			}else{
                				$rootScope.semester.subject[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.semester.subject.subjectInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.semester.subject.subjectInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.semester.subject[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.semester.subject[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			if(isNull(defaultValue)){
	            				$rootScope.semester.subject.subjectInfo[childModel] = $rootScope.semester.subject[childModel+"List"][0].code;
	            			}else{
                				$rootScope.semester.subject.subjectInfo[childModel] = defaultValue;
                			}
	            		}
        			});
        		}
        	};
			

            //기본 셀렉트 박스 데이터 조회 start
        	//년도 세팅
        	if($rootScope.semester.subject.searchYearList.length == 1){
        		$rootScope.semester.subject.searchYearList = [{code : "", codeName : "전체"}];
        		$rootScope.semester.subject.yearList = [{code : "", codeName : "년도 선택"}];
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()+2;
	        	for(var i = curYear; i >= nowDate.getFullYear(); i--) {
	    	 	   	$rootScope.semester.subject.searchYearList.push({code:i, codeName:i});
	    	 	   	$rootScope.semester.subject.yearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.semester.subject.searchYear = nowDate.getFullYear()+"";
        	}
        	
        	//학교 지역 목록
        	if($rootScope.semester.subject.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.semester.subject.searchUnivAreaList = [];
            			$rootScope.semester.subject.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.semester.subject.univAreaCodeList = [];
            			$rootScope.semester.subject.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.semester.subject.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.semester.subject.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			
            			//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                        ){
                			$rootScope.semester.subject.searchUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.semester.subject.searchUnivArea, function(data){
                				$rootScope.semester.subject.searchUniv = $rootScope.userSession.univCode;
                				$scope.diabledSelectUniv();
            					$rootScope.semester.subject.isUnivComplete = true;
            					$scope.initSearch();
                			});
                			
                		}else{
                			$rootScope.semester.subject.searchUnivArea = $rootScope.semester.subject.searchUnivAreaList[1].code;
                			$scope.getChildCdList("searchUnivArea", "searchUniv", null, function(data){
            					$rootScope.semester.subject.searchUniv = $rootScope.semester.subject.searchUnivList[1].code;
            					$rootScope.semester.subject.isUnivComplete = true;
            					$scope.initSearch();
                			});
                		}
            		}
            	});
            };
            
            //학기 분류 목록 조회
        	if($rootScope.semester.subject.searchSemesterCodeList.length == 1){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.semester.subject.searchSemesterCodeList = [];
            			$rootScope.semester.subject.searchSemesterCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.semester.subject.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            			$rootScope.semester.subject.searchSemesterCode = $rootScope.semester.subject.searchSemesterCodeList[1].code;
            			$rootScope.semester.subject.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //학년 목록 조회
        	if($rootScope.semester.subject.subjectGradeList.length == 0){
            	commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.semester.subject.subjectGradeList = [];
            			$rootScope.semester.subject.searchSubjectGradeCodeList = [];
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.semester.subject.subjectGradeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.semester.subject.searchSubjectGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
            
        	//기본 셀렉트 박스 데이터 조회 end
        	$scope.resetSearchFiled = function(){
    			$rootScope.semester.subject.searchUnivArea		= null;
    			$rootScope.semester.subject.searchUniv			= null;
    			$rootScope.semester.subject.searchYear			= null;
    			$rootScope.semester.subject.searchSemesterCode  = null;
    			$rootScope.semester.subject.searchSubjectGradeCode = null;
    			$rootScope.semester.subject.searchClassAcceptType = null;
    			$rootScope.semester.subject.searchType = null;
    			$rootScope.semester.subject.searchKey = null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.semester.subject.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.semester.subject.searchUnivArea, function(data){
        				$rootScope.semester.subject.searchUniv = $rootScope.userSession.univCode;
        				$scope.diabledSelectUniv();
    					$rootScope.semester.subject.isUnivComplete = true;
        			});
        			
        		}else{
        			$rootScope.semester.subject.searchUnivArea = $rootScope.semester.subject.searchUnivAreaList[1].code;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.semester.subject.searchUnivArea, function(data){
    					$rootScope.semester.subject.searchUniv = $rootScope.semester.subject.searchUnivList[1].code;
    					$rootScope.semester.subject.isUnivComplete = true;
        			});
        		}
        		
        		
        		//년도 초기화
        		var nowDate = new Date();
	        	$rootScope.semester.subject.searchYear = nowDate.getFullYear()+"";
	        	
	        	//학기 초기화
	        	$rootScope.semester.subject.searchSemesterCode = $rootScope.semester.subject.searchSemesterCodeList[1].code;
        	};
        	
        	/**
        	 * 목록 상단 타이틀 세팅
        	 * ex) xxxx년 x학기 xxx대학교
        	 */
        	$scope.setListTitle = function(){
        		var year = $rootScope.semester.subject.searchYear;
        		var semesterCode = $rootScope.semester.subject.searchSemesterCode;
        		var semesterCodeName = $("[ng-model='$root.semester.subject.searchSemesterCode'] > option:selected").text()
        		var univCode = $rootScope.semester.subject.searchUniv;
        		var univCodeName = $("[ng-model='$root.semester.subject.searchUniv'] > option:selected").text()
        		
        		if(!isNull(year) && !isNull(semesterCode) && !isNull(univCode)){
        			$scope.listTitleYear = year;
        			$scope.listTitleSemester = semesterCodeName;
        			$scope.listTitleUniv = univCodeName;
        		}else{
        			$scope.listTitleYear = "";
        			$scope.listTitleSemester = "";
        			$scope.listTitleUniv = "";
        		}
        	}
        	
        	/**
             * 검색영역 validate check
             */
            $scope.checkValidateSearch = function(){
            	$scope.setListTitle();
			    if(isNull($rootScope.semester.subject.searchYear)){
					commonService.alert("검색영역에서 년도를 선택해주세요.");
					return false
				}
				
				if(isNull($rootScope.semester.subject.searchSemesterCode)){
					commonService.alert("검색영역에서 학기를 입력해주세요.");
					return false;
				}
				
				if(isNull($rootScope.semester.subject.searchUniv)){
					commonService.alert("검색영역에서 대학을 선택해주세요.");
					return false;
				}
				return true;
            }
        	
        	/**
        	 * 학기 과목 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(redrawPage){
        		if(!$scope.checkValidateSearch()){
        			return;
        		}
        		
        		var param = {
    	        	searchUnivArea			:	$rootScope.semester.subject.searchUnivArea,
    	        	searchUniv				:	$rootScope.semester.subject.searchUniv,
    	        	searchYear				:	$rootScope.semester.subject.searchYear,
    	        	searchSemesterCode		:	$rootScope.semester.subject.searchSemesterCode,
    	        	searchSubjectGradeCode	:	$rootScope.semester.subject.searchSubjectGradeCode,
    	        	searchClassAcceptType	:	$rootScope.semester.subject.searchClassAcceptType,
    	        	searchKey				:	$rootScope.semester.subject.searchKey,
    	        	searchType				:	$rootScope.semester.subject.searchType,
    	        	sort					:	$rootScope.semester.subject.sort,
    	        	order					:	$rootScope.semester.subject.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["subjectListPaging"])? 1 : pagingGlobalVar["subjectListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.semester.subject.maxRowCnt,
        		};
        		
        		subjectService.getSubjectList(param, function(data){
        			$rootScope.semester.subject.searchYn = "Y";
					$rootScope.semester.subject.subjectList = data.subjectList;
					if(data.subjectList.length > 0){
						var totCnt = data.subjectList[0].totalCnt*1;
						var nowPage = $rootScope.semester.subject.nowPage*1;
						var maxRowCnt = $rootScope.semester.subject.maxRowCnt*1;
						$rootScope.semester.subject.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.semester.subject.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["subjectListPaging"]) || redrawPage){
							$("#subjectListPaging").html("");
							$("#subjectListPaging").createPaging({
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
						$rootScope.semester.subject.totalCnt = 0;
					}
					
					$scope.setListTitle();
        		});
        	};
        	
        	//페이지 로드시 과목 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.semester.subject.isUnivComplete && $rootScope.semester.subject.isSemesterComplete) {
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
        		
        		$rootScope.semester.subject.sort = sort;
        		$rootScope.semester.subject.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
            /**
             * 학기 과목 정보 목록 페이지 이동
             */
            $scope.getSubjectListView = function(){
            	$rootScope.semester.subject.pageViewType = "list";
            	$rootScope.semester.subject.subjectInfo = {};
            };
            
            /**
             * 학기 과목 정보 등록/수정 페이지 이동
             */
            $scope.saveSubjectView = function(subjectInfo, idx){
            	if(!isNull(subjectInfo)){
            		$rootScope.semester.subject.pageViewType = "modify";
            		var param = {
            				semesterCode	: subjectInfo.semesterCode,
            				year			: subjectInfo.year,
            				univCode		: subjectInfo.univCode,
            				subjectNum		: subjectInfo.subjectNum,
            				classNum		: subjectInfo.classNum,
            		};
            		subjectService.getSubjectInfo(param, function(data){
            			$rootScope.semester.subject.subjectInfo = data.subjectInfo;
            			
            			if($rootScope.semester.subject.subjectInfo.univCode.indexOf("|") > -1){
            				var univCodeArr = $rootScope.semester.subject.subjectInfo.univCode.split("|");
            				if(univCodeArr.length > 1){
            					$rootScope.semester.subject.subjectInfo.univAreaCode = univCodeArr[0];
            					$rootScope.semester.subject.subjectInfo.univCode = univCodeArr[1];
            				}
            			}
            			
        				$rootScope.semester.subject.subjectInfo.regUserName = $rootScope.userSession.userName;
        				$rootScope.semester.subject.subjectInfo.regUserSeq = $rootScope.userSession.userSeq;
        				$rootScope.semester.subject.subjectInfo.newSubjectNum = $rootScope.semester.subject.subjectInfo.subjectNum;
        				$rootScope.semester.subject.subjectInfo.newClassNum = $rootScope.semester.subject.subjectInfo.classNum;
            		});
            	}else{
            		if(!$scope.checkValidateSearch()){
            			return;
            		}
            		
    				$rootScope.semester.subject.pageViewType = "modify";
            		$rootScope.semester.subject.subjectInfo.semesterCode = $rootScope.semester.subject.searchSemesterCode;
            		$rootScope.semester.subject.subjectInfo.year = $rootScope.semester.subject.searchYear;
            		$rootScope.semester.subject.subjectInfo.univCode = $rootScope.semester.subject.searchUniv;
            		$rootScope.semester.subject.subjectInfo.subjectGradeCode = $rootScope.semester.subject.searchSubjectGradeCode
            		
            		$rootScope.semester.subject.subjectInfo.semesterCodeName = $("[ng-model='$root.semester.subject.searchSemesterCode'] > option:selected").text();
            		$rootScope.semester.subject.subjectInfo.univCodeName = $("[ng-model='$root.semester.subject.searchUniv'] > option:selected").text();
            		$rootScope.semester.subject.subjectInfo.univAreaCodeName = $("[ng-model='$root.semester.subject.searchUnivArea'] > option:selected").text();
            		
            		$rootScope.semester.subject.subjectInfo.timeList = null;
            		
            		$rootScope.semester.subject.subjectInfo.regUserName = $rootScope.userSession.userName;
    				$rootScope.semester.subject.subjectInfo.regUserSeq = $rootScope.userSession.userSeq;
            	}
            };
            
            /**
        	 * 학기 과목 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if(!$scope.checkValidateSearch()){
        			return;
        		}
        		if($rootScope.semester.subject.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    				searchUnivArea			:	$rootScope.semester.subject.searchUnivArea,
    	        	searchUniv				:	$rootScope.semester.subject.searchUniv,
    	        	searchYear				:	$rootScope.semester.subject.searchYear,
    	        	searchSemesterCode		:	$rootScope.semester.subject.searchSemesterCode,
    	        	searchSubjectGradeCode	:	$rootScope.semester.subject.searchSubjectGradeCode,
    	        	searchClassAcceptType	:	$rootScope.semester.subject.searchClassAcceptType,
    	        	searchKey				:	$rootScope.semester.subject.searchKey,
    	        	searchType				:	$rootScope.semester.subject.searchType,
    	        	sort					:	$rootScope.semester.subject.sort,
    	        	order					:	$rootScope.semester.subject.order,
    	        	isPaging				: 	'N',
        		};
        		
        		$("<input></input>").attr({type:"hidden", name:"searchUnivArea",		value:param.searchUnivArea			}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchUniv",			value:param.searchUniv				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchYear",			value:param.searchYear				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchSemesterCode",	value:param.searchSemesterCode		}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchSubjectGradeCode",value:param.searchSubjectGradeCode	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchClassAcceptType",	value:param.searchClassAcceptType	}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchKey",				value:param.searchKey				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"searchType",			value:param.searchType				}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sort",					value:param.sort					}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"order",					value:param.order					}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"isPaging",				value:"N"							}).appendTo($("#excelForm"));
        		$("<input></input>").attr({type:"hidden", name:"sortOnly",				value:"Y"							}).appendTo($("#excelForm"));
        		
        		$("#excelForm").attr("action", Const.contextPath + "subject/downloadSubjectList.do").submit();
        		$("#excelForm").html("");
        	};
        	
        	/**
        	 * 요일 및 시간 추가
        	 */
        	$scope.addSubjectTime = function(){
        		var lastIndex = 0;
        		var id = $(".miniList > tbody > tr").last().find("[name='dayOfWeek']").attr("id");
        		lastIndex = id.substring(id.indexOf("_")+1, id.length)*1;
        		if(typeof lastIndex === "string"){
        			lastIndex = 0;
        		}else{
        			lastIndex += 1;
        		}
        		
        		var html = '';
        		html += '<tr id="subjectTimeList_'+lastIndex+'">';
        		html += 	'<td>';
        		html +=			'<input type="hidden" name="subjectTimeSeq" id="subjectTimeSeq_'+lastIndex+'" value="0"/>';
        		html += 		'<select name="dayOfWeek" id="dayOfWeek_'+lastIndex+'" class="_selectBox _fL wx70">';
        		html += 			'<option value="">선택</option>';
        		html += 			'<option value="2">월</option>';
        		html += 			'<option value="3">화</option>';
        		html += 			'<option value="4">수</option>';
        		html += 			'<option value="5">목</option>';
        		html += 			'<option value="6">금</option>';
        		html += 			'<option value="7">토</option>';
        		html += 			'<option value="1">일</option>';
        		html += 		'</select>';
        		html += 	'</td>';
        		html += 	'<td>';
        		html += 		'<input type="text" name="start_time_hour" id="start_time_hour_'+lastIndex+'" placeholder="" class="w15">';
        		html += 		'<label for="time_hour" class="pl10">시</label>';
        		html += 		'<input type="text" name="start_time_minute" id="start_time_minute_'+lastIndex+'" placeholder="" class="w15">';
        		html += 		'<label for="time_minute" class="pl10">분</label>';
        		html += 		'<input type="text" name="end_time_hour" id="end_time_hour_'+lastIndex+'" placeholder="" class="w15 ml20">';
        		html += 		'<label for="time_hour" class="pl10">시</label>';
        		html += 		'<input type="text" name="end_time_minute" id="end_time_minute_'+lastIndex+'" placeholder="" class="w15">';
        		html += 		'<label for="time_minute" class="pl10">분</label>';
        		html += 	'</td>';
        		html += 	'<td>';
        		html += 		'<input kr-input type="text" name="classRoom" id="classRoom_'+lastIndex+'" placeholder="" class="w100" maxlength="50" kr-input>';
        		html += 	'</td>';
        		html += 	'<td>';
        		html +=			'<span class="_button _minimum _green"><a href="javascript:void(0);" onclick="javascript:removeSubjectTime('+lastIndex+');">삭제</a></span>';
        		html += 	'</td>';
        		html += '</tr>';
        		
        		
        		//ie 브라우저용 input영역의 키입력관련 처리
        		$(".miniList > tbody").append(html);
        		$(".miniList > tbody").find("input[type='text'][kr-input]").each(function(){
        			$(this).off('compositionstart');
    				$(this).on('compositionstart', function(e) {
                        e.stopImmediatePropagation();
                    });
        		});
        	};
        	
        	/**
        	 * 요일 및 시간 제거
        	 * @param idx 리스트 인덱스 
        	 */
        	$scope.removeSubjectTime = function(idx){
        		if($rootScope.semester.subject.subjectInfo.removeSubjectTimeSeq ==  null){
        			$rootScope.semester.subject.subjectInfo.removeSubjectTimeSeq = [];
        		}
        		$rootScope.semester.subject.subjectInfo.removeSubjectTimeSeq.push($("#subjectTimeSeq_"+idx).val());
        		$("#subjectTimeList_"+idx).remove();
    		};
        	
            /**
             * 학기 과목 정보 저장 버튼
             */
            $scope.saveSubjectInfo = function() {
            	console.log("g", $("[ng-model='$root.semester.subject.subjectInfo.subjectGradeCode']").val());
            	console.log("gs", $("[ng-model='$root.semester.subject.subjectInfo.department']").val());
            	if($scope.checkValidate()){
            		commonService.confirm('과목을 저장 하시겠습니까?', function() {
            			var	param = {
        						semesterCode	: $rootScope.semester.subject.subjectInfo.semesterCode,
        						year			: $rootScope.semester.subject.subjectInfo.year,
        						univCode		: $rootScope.semester.subject.subjectInfo.univCode,
        						subjectGradeCode: $rootScope.semester.subject.subjectInfo.subjectGradeCode,
        						subjectNum		: $rootScope.semester.subject.subjectInfo.subjectNum,
        						classNum		: $rootScope.semester.subject.subjectInfo.classNum,
        						newSubjectNum	: $rootScope.semester.subject.subjectInfo.newSubjectNum,
        						newClassNum		: $rootScope.semester.subject.subjectInfo.newClassNum,
        						completeType	: $rootScope.semester.subject.subjectInfo.completeType,
        						subjectName		: $rootScope.semester.subject.subjectInfo.subjectName,
        						subjectNameEn	: $rootScope.semester.subject.subjectInfo.subjectNameEn,
        						department		: $rootScope.semester.subject.subjectInfo.department,
        						subjectPoint	: $rootScope.semester.subject.subjectInfo.subjectPoint,
        						teacherName		: $rootScope.semester.subject.subjectInfo.teacherName,
        						maxStudentCnt	: $rootScope.semester.subject.subjectInfo.maxStudentCnt,
        						maxEtcCnt		: $rootScope.semester.subject.subjectInfo.maxEtcCnt,
        						memo			: $rootScope.semester.subject.subjectInfo.memo,
        						curriculumUrl	: $rootScope.semester.subject.subjectInfo.curriculumUrl,
        						removeSubjectTimeSeqList : ($rootScope.semester.subject.subjectInfo.removeSubjectTimeSeq != null) ? $rootScope.semester.subject.subjectInfo.removeSubjectTimeSeq.join(",") : null
            			};
            			var subjectTimeSeq = [];
            			var dayOfWeek = [];
            			var startTime = [];
            			var endTime = [];
            			var classRoom = [];
            			$(".miniList > tbody > tr").each(function(i){
            				var $tr = $(this);
            				subjectTimeSeq.push($tr.find("[name='subjectTimeSeq']").val());
        					dayOfWeek.push($tr.find("[name='dayOfWeek']").val());
        					startTime.push(leadingZeros($tr.find("[name='start_time_hour']").val(),2) + "" + leadingZeros($tr.find("[name='start_time_minute']").val(),2));
        					endTime.push(leadingZeros($tr.find("[name='end_time_hour']").val(),2) + "" + leadingZeros($tr.find("[name='end_time_minute']").val(),2));
        					classRoom.push($tr.find("[name='classRoom']").val());
                    	});
            			param.subjectTimeSeq = subjectTimeSeq;
            			param.dayOfWeek = dayOfWeek;
            			param.startTime = startTime;
            			param.endTime = endTime;
            			param.classRoom = classRoom;
            			
        				subjectService.saveSubjectInfo(param, function(data) {
        					if(data.resultCode == "0"){
        						$("[name='subjectTimeSeq']").each(function(){
        							if(this.value*1 == 0){
        								$(this).parent().parent().remove();
        							}
    							});
        						$scope.getSubjectListView();
        						$scope.search(true);
        					}else if(data.resultCode == "SJ00"){
        						commonService.alert("이미 등록되어있는 교과번호/분반 정보가 있습니다.", $("[ng-model='$root.semester.subject.subjectInfo.subjectNum']").focus());
        					}else{
        						commonService.serverError(data);
        					}
        				});
            		});
            	}
            }
            
            /**
             * 학기 과목 정보 validate check
             */
            $scope.checkValidate = function(){
            	if(isNull($rootScope.semester.subject.subjectInfo.subjectGradeCode)){
        			commonService.alert("학년을 선택해주세요.", function(){
        				$("[ng-model='$root.semester.subject.subjectInfo.subjectGradeCode']").focus();
        			});
        			return false;
        		}
            	
            	if(isNull($rootScope.semester.subject.subjectInfo.newSubjectNum)){
        			commonService.alert("교과번호를 입력해주세요.", function(){
        				$("[ng-model='$root.semester.subject.subjectInfo.subjectNum']").focus();
        			});
        			return false;
        		}
            	
            	if(isNull($rootScope.semester.subject.subjectInfo.newClassNum)){
        			commonService.alert("분반을 입력해주세요.", function(){
        				$("[ng-model='$root.semester.subject.subjectInfo.classNum']").focus();
        			});
        			return false;
        		}
            	
            	if(isNull($rootScope.semester.subject.subjectInfo.subjectName)){
        			commonService.alert("과목명을 입력해주세요.", function(){
        				$("[ng-model='$root.semester.subject.subjectInfo.classNum']").focus();
        			});
        			return false;
        		}
            	
            	if(isNull($rootScope.semester.subject.subjectInfo.department)){
        			commonService.alert("학과명을 입력해주세요.", function(){
        				$("[ng-model='$root.semester.subject.subjectInfo.department']").focus();
        			});
        			return false;
        		}
            	
            	if(isNull($rootScope.semester.subject.subjectInfo.subjectPoint)){
        			commonService.alert("학점을 입력해주세요.", function(){
        				$("[ng-model='$root.semester.subject.subjectInfo.subjectPoint']").focus();
        			});
        			return false;
        		}
            	
            	if(isNull($rootScope.semester.subject.subjectInfo.teacherName)){
        			commonService.alert("담당교수명을 입력해주세요.", function(){
        				$("[ng-model='$root.semester.subject.subjectInfo.teacherName']").focus();
        			});
        			return false;
        		}
            	
            	if(isNull($rootScope.semester.subject.subjectInfo.maxStudentCnt) && isNull($rootScope.semester.subject.subjectInfo.maxEtcCnt)){
        			commonService.alert("인원을 입력해주세요.", function(){
        				$("[ng-model='$root.semester.subject.subjectInfo.maxStudentCnt']").focus();
        			});
        			return false;
        		}
            	
            	var checkTime = true;
            	$(".miniList > tbody > tr").each(function(i){
            		var $tr = $(this);
            		if(isNull($tr.find("[name='dayOfWeek']").val())){
            			commonService.alert("요일을 선택해주세요.", function(){
            				$tr.find("[name='dayOfWeek']").focus();
            			});
            			checkTime = false;
            			return false;
            		}
            		
            		if(isNull($tr.find("[name='start_time_hour']").val())){
            			commonService.alert("시간을 입력해주세요.", function(){
            				$tr.find("[name='start_time_hour']").focus();
            			});
            			checkTime = false;
            			return false;
            		}
            		
            		if(isNull($tr.find("[name='start_time_minute']").val())){
            			commonService.alert("시간을 입력해주세요.", function(){
            				$tr.find("[name='start_time_minute']").focus();
            			});
            			checkTime = false;
            			return false;
            		}
            		
            		if(isNull($tr.find("[name='end_time_hour']").val())){
            			commonService.alert("시간을 입력해주세요.", function(){
            				$tr.find("[name='end_time_hour']").focus();
            			});
            			checkTime = false;
            			return false;
            		}
            		
            		if(isNull($tr.find("[name='end_time_minute']").val())){
            			commonService.alert("시간을 입력해주세요.", function(){
            				$tr.find("[name='end_time_minute']").focus();
            			});
            			checkTime = false;
            			return false;
            		}
            		
            		if(isNull($tr.find("[name='classRoom']").val())){
            			commonService.alert("강의실을 입력해주세요.", function(){
            				$tr.find("[name='classRoom']").focus();
            			});
            			checkTime = false;
            			return false;
            		}
            	});
            	if(!checkTime){
            		return false;
            	}
            	
            	return true;
            };
            
            /**
             * 학기 과목 정보 삭제 버튼
             */
            $scope.deleteSubjectInfo = function() {
        		commonService.confirm('삭제 하시겠습니까?', function() {
        			var	param = {
        					semesterCode	: $rootScope.semester.subject.subjectInfo.semesterCode,
    						year			: $rootScope.semester.subject.subjectInfo.year,
    						univCode		: $rootScope.semester.subject.subjectInfo.univCode,
    						subjectGradeCode: $rootScope.semester.subject.subjectInfo.subjectGradeCode,
    						subjectNum		: $rootScope.semester.subject.subjectInfo.subjectNum,
    						classNum		: $rootScope.semester.subject.subjectInfo.classNum
        			};
        			
    				subjectService.deleteSubjectInfo(param, function(data) {
    					$scope.getSubjectListView();
    					$scope.search(true);
    				});
        		});
            };
            
            /********** 학기 과목 정보 수정 관련 end **********/
            
            /**
             * 업로드 양식 다운로드 팝업
             */
            $scope.downloadDocFormPop = function() {
            	ngDialog.open({
                    template: Const.contextPath + 'html/excel/downloadFormOfSubject.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 740,
                    controller: function($rootScope, $scope, subjectService, commonService, $cookies, Const) {
                        /**
                         * 업로드 양식 다운로드
                         */
    					$scope.downloadDocForm = function() {
    						window.location.href = Const.contextPath + 'resources/template/upload_과목등록.xlsx';
    					};
    					
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        };
                    }
                });
            };
            
            /**
             * 과목 업로드
             */
            $scope.saveSubjectBatchPop = function() {
            	if(!$scope.checkValidateSearch()){
        			return;
        		}
            	ngDialog.open({
                    template: Const.contextPath + 'html/excel/uploadFormOfSubject.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 740,
                    controller: function($rootScope, $scope, userManagementService, commonService, $cookies, Const, FileUploader) {
                    	$scope.uploader = null;
                    	/**
                         * 업로더 설정
                         */
                        if (!$scope.uploader) {
                            $scope.uploader = new FileUploader({
                                url: Const.contextPath + 'subject/saveSubjectWithFile.ajax',
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
    					$scope.saveSubjectWithFile = function() {
    						$scope.uploader.formData = [];
            				$.each($scope.uploader.queue, function(i, item){
            					item.formData.push({semesterCode : $rootScope.semester.subject.searchSemesterCode});
        						item.formData.push({year : $rootScope.semester.subject.searchYear});
    							item.formData.push({univCode : $rootScope.semester.subject.searchUniv});
                				item.onSuccess = function(response) {
                					if(response.resultCode == "0"){
                						commonService.alert('과목 업로드가 완료되었습니다.',function(){
                							$scope.closeLayerPopup();
                    						$rootScope.semester.subject.scope.search(true);
                						});
                					}else{
                						$scope.closeLayerPopup();
                						$rootScope.semester.subject.scope.resultSubjectBatchPop(response);
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
             * 과목 업로드 결과
             */
            $scope.resultSubjectBatchPop = function(resultData) {
            	var tempList = null;
            	$.each(resultData.checkResultList, function(i, resultInfo){
            		if(isNull(resultInfo.failMap.classNum)){
            			tempList = resultData.checkResultList.slice(0, (i));
            			return false;
            		}
            	});
            	if(tempList.length == 0){
            		commonService.alert("과목 업로드가 완료되었습니다.", $scope.search(true));
            		return;
            	}
            	ngDialog.open({
                    template: Const.contextPath + 'html/excel/uploadResultOfSubject.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 800,
                    controller: function($rootScope, $scope, userManagementService, commonService, $cookies, Const, FileUploader) {
                    	$scope.checkResultList = tempList;
                    	
                    	$scope.getFieldNames = function(cellNameBfr){
                    		var cellNameAftr = "";
                    		switch(cellNameBfr){
	                    		case "subjectGradeCode": cellNameAftr = "학년"; break;
	                    		case "subjectNum": cellNameAftr = "과목번호"; break;
	                    		case "completeType": cellNameAftr = "이수구분"; break;
	                    		case "subjectName": cellNameAftr = "과목명"; break;
	                    		case "subjectPoint": cellNameAftr = "학점"; break;
	                    		case "classNum": cellNameAftr = "분반"; break;
	                    		case "subjectTimeInfo": cellNameAftr = "요일 및 시간"; break;
	                    		case "classRoom": cellNameAftr = "강의실"; break;
	                    		case "teacherName": cellNameAftr = "담당교수"; break;
	                    		case "memo": cellNameAftr = "수강대상/유의사항"; break;
	                    		case "department": cellNameAftr = "학과"; break;
	                    		case "maxTotalCnt": cellNameAftr = "수강인원"; break;
	                    		case "maxStudentCnt": cellNameAftr = "학생"; break;
	                    		case "maxEtcCnt": cellNameAftr = "청강생"; break;
	                    		case "curriculumUrl": cellNameAftr = "강의계획서 파일 다운로드 URL"; break;
                    		}
                    		return cellNameAftr;
                    	}
                    	
                        $scope.closeLayerPopup = function() {
                        	$scope.uploader.clearQueue();
                        	$scope.closeThisDialog();
                        	$rootScope.semester.subject.scope.search(true);
                        };
                    }
                });
            };
        });
})());