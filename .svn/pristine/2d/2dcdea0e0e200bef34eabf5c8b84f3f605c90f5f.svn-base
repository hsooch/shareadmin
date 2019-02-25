((function() {
    angular.module('appModule')
        .controller('registScoreOutCtrl', function($scope, $rootScope, exchangeResultService, commonService, Const, ngDialog, FileUploader) {
        	$rootScope.exchange.scoreOut.scope = $scope;
    		
        	$scope.diabledSelectUniv = function(){
				if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
						$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
					){
					
					$("[ng-model='$root.exchange.scoreOut.searchUserUnivArea']").attr("disabled", true);
    				$("[ng-model='$root.exchange.scoreOut.searchUserUniv']").attr("disabled", true);
				}
			};
			$scope.diabledSelectUniv();
        	
            /**
        	 * 하위코드 목록 조회
        	 * @param parentCode ng-model name
        	 * @param childCode ng-model name
        	 */
        	$scope.getChildCdList = function(parentModel, childModel, defaultValue, callBack){
        		$rootScope.exchange.scoreOut[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv" || childModel == "searchUserUniv"){
        			if(isNull($rootScope.exchange.scoreOut[parentModel])) {
        				$rootScope.exchange.scoreOut[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				$rootScope.exchange.scoreOut[childModel] = "";
        				return;
        			}
        			commonService.getCodeList($rootScope.exchange.scoreOut[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.exchange.scoreOut[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.exchange.scoreOut[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)){
                				$rootScope.exchange.scoreOut[childModel] = $rootScope.exchange.scoreOut[childModel+"List"][0].code;
                			}else{
                				$rootScope.exchange.scoreOut[childModel] = defaultValue;
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
        	if($rootScope.exchange.scoreOut.searchYearList.length == 0){
	            var nowDate = new Date();
	            var curYear = nowDate.getFullYear()-2;
	        	for(var i = nowDate.getFullYear(); i >= curYear; i--) {
	    	 	   	$rootScope.exchange.scoreOut.searchYearList.push({code:i, codeName:i});
	    	    }
	        	$rootScope.exchange.scoreOut.searchYear = nowDate.getFullYear()+"";
        	}
            
            //학기 분류 목록 조회
        	if($rootScope.exchange.scoreOut.searchSemesterCodeList.length == 0){
            	commonService.getCodeList(Const.code.SEMESTER_TYPE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.scoreOut.searchSemesterCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
        				$rootScope.exchange.scoreOut.searchSemesterCode = $rootScope.exchange.scoreOut.searchSemesterCodeList[0].code;
        				$rootScope.exchange.scoreOut.isSemesterComplete = true;
            			$scope.initSearch();
            		}
            	});
            };
            
            //학년 분류 목록 조회
        	if($rootScope.exchange.scoreOut.searchStudentGradeCodeList.length == 0){
            	commonService.getCodeList(Const.code.SUBJECT_GRADE_CODE, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.scoreOut.searchStudentGradeCodeList = [];
            			$rootScope.exchange.scoreOut.searchStudentGradeCodeList.push({code:"", codeName:"전체"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.scoreOut.searchStudentGradeCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
            		}
            	});
            };
        	
        	//학교 지역 목록
        	if($rootScope.exchange.scoreOut.searchUserUnivAreaList.length == 0){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.exchange.scoreOut.searchUnivAreaList = [];
            			$rootScope.exchange.scoreOut.searchUnivAreaList.push({code:"", codeName:"지역 전체"});

            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.exchange.scoreOut.searchUserUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				
            				$rootScope.exchange.scoreOut.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            			});
                    	
                    	//사용자 권한에 따른 학교구분 검색조건 세팅
                		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
                			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
                			$rootScope.exchange.scoreOut.searchUserUnivArea = $rootScope.userSession.univAreaCd;
                			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", $rootScope.userSession.univCode, function(){
                				$rootScope.exchange.scoreOut.searchUserUniv = $rootScope.userSession.univCode;
                				
                				$scope.diabledSelectUniv();

                				$rootScope.exchange.scoreOut.isUnivComplete = true;
	        					$scope.initSearch();
                			});
                		} else {
	            			$rootScope.exchange.scoreOut.searchUserUnivArea = $rootScope.exchange.scoreOut.searchUserUnivAreaList[0].code;
	            			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", null, function(data){
	        					$rootScope.exchange.scoreOut.searchUserUniv = $rootScope.exchange.scoreOut.searchUserUnivList[1].code;
	        					$rootScope.exchange.scoreOut.isUnivComplete = true;
	        					$scope.initSearch();
	            			});
                		}
            		}
            	});
            };
        	//기본 셀렉트 박스 데이터 조회 end
            	
            // 검색 조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.exchange.scoreOut.searchStudentGradeCode	= "";
    			$rootScope.exchange.scoreOut.searchUnivArea			= $rootScope.exchange.scoreOut.searchUnivAreaList[0].code;
    			$rootScope.exchange.scoreOut.searchUnivList			= [{code : "", codeName : "대학교 전체"}];
    			$rootScope.exchange.scoreOut.searchUniv				= "";
    			$rootScope.exchange.scoreOut.searchYear				= $rootScope.exchange.scoreOut.searchYearList[0].code+"";
    			$rootScope.exchange.scoreOut.searchSemesterCode		= $rootScope.exchange.scoreOut.searchSemesterCodeList[0].code;
    			$rootScope.exchange.scoreOut.searchType				= "";
    			$rootScope.exchange.scoreOut.searchKey				= "";
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        			$rootScope.exchange.scoreOut.searchUserUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", $rootScope.userSession.univCode, function(){
        				$rootScope.exchange.scoreOut.searchUserUniv = $rootScope.userSession.univCode;
        				
        				$scope.diabledSelectUniv();

        				$rootScope.exchange.scoreOut.isUnivComplete = true;
        			});
        		} else {
        			$rootScope.exchange.scoreOut.searchUserUnivArea = $rootScope.exchange.scoreOut.searchUserUnivAreaList[1].code;
        			$scope.getChildCdList("searchUserUnivArea", "searchUserUniv", $rootScope.exchange.scoreOut.searchUserUnivArea, function(data){
    					$rootScope.exchange.scoreOut.searchUserUniv = $rootScope.exchange.scoreOut.searchUserUnivList[1].code;
    					$rootScope.exchange.scoreOut.isUnivComplete = true;
        			});
        		}
        	};
        	
        	/**
        	 * 성적조회(OUT) 목록 조회
        	 * @param pageType String
        	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
        	 */
        	$scope.search = function(redrawPage){
        		var param = {
    	        	searchUnivArea			:	$rootScope.exchange.scoreOut.searchUnivArea,
    	        	searchUniv				:	$rootScope.exchange.scoreOut.searchUniv,
    	        	searchYear 				:	$rootScope.exchange.scoreOut.searchYear,
    	        	searchSemesterCode		:	$rootScope.exchange.scoreOut.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.exchange.scoreOut.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.exchange.scoreOut.searchUserUniv,
    	        	searchStudentGradeCode	:	$rootScope.exchange.scoreOut.searchStudentGradeCode,
    	        	searchType				:	$rootScope.exchange.scoreOut.searchType,
    	        	searchKey				:	$rootScope.exchange.scoreOut.searchKey,
    	        	sort					:	$rootScope.exchange.scoreOut.sort,
    	        	order					:	$rootScope.exchange.scoreOut.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["exchangeResultListPaging"]) || redrawPage ? 1 : pagingGlobalVar["exchangeResultListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.exchange.scoreOut.maxRowCnt,
        		};
        		
        		exchangeResultService.getResultScoreList(param, function(data){
        			$rootScope.exchange.scoreOut.searchYn = "Y";
					$rootScope.exchange.scoreOut.exchangeResultList = data.exchangeResultList;
					if(data.exchangeResultList.length > 0){
						var totCnt = data.exchangeResultList[0].totalCnt*1;
						var nowPage = $rootScope.exchange.scoreOut.nowPage*1;
						var maxRowCnt = $rootScope.exchange.scoreOut.maxRowCnt*1;
						$rootScope.exchange.scoreOut.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.exchange.scoreOut.nowPage = nowPage;
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
						$rootScope.exchange.scoreOut.totalCnt = 0;
					}
        		});
        	};
        	
        	//페이지 최초 로드시 수강결과 등록 목록을 조회하기 위함.
        	$scope.initSearch = function(){
        		if($rootScope.exchange.scoreOut.isUnivComplete && $rootScope.exchange.scoreOut.isSemesterComplete) {
                	$scope.search(false);
        		}
        	};

        	//페이지 재 로드시 수강결과 등록 목록을 조회하기 위함.
        	if($rootScope.exchange.scoreOut.isUnivComplete && $rootScope.exchange.scoreOut.isSemesterComplete) {
            	$scope.search(false);
    		}
        	
        	//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN) {
        		if($rootScope.exchange.scoreOut.isUnivComplete && $rootScope.exchange.scoreOut.isSemesterComplete) {
        			$scope.diabledSelectUniv();
        		}
    		}
        	
        	/**
        	 * 성적 정보 팝업창
        	 * 
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
                        	$rootScope.exchange.scorePageType = 'out';
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
        		
        		$rootScope.exchange.scoreOut.sort = sort;
        		$rootScope.exchange.scoreOut.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
            /**
        	 * 성적조회(OUT) 목록 엑셀 다운로드
        	 * @param pageType String
        	 */
        	$scope.excelDown = function(){
        		if($rootScope.exchange.scoreOut.searchYn != "Y"){
        			$scope.search(true);
            	}
        		
        		var param = {
    	        	searchUnivArea			: $rootScope.exchange.scoreOut.searchUnivArea,
    	        	searchUniv				: $rootScope.exchange.scoreOut.searchUniv,
    	        	searchYear 				: $rootScope.exchange.scoreOut.searchYear,
    	        	searchSemesterCode		: $rootScope.exchange.scoreOut.searchSemesterCode,
    	        	searchUserUnivArea		: $rootScope.exchange.scoreOut.searchUserUnivArea,
    	        	searchUserUniv			: $rootScope.exchange.scoreOut.searchUserUniv,
    	        	searchStudentGradeCode	: $rootScope.exchange.scoreOut.searchStudentGradeCode,
    	        	searchType				: $rootScope.exchange.scoreOut.searchType,
    	        	searchKey				: $rootScope.exchange.scoreOut.searchKey,
    	        	sort					: $rootScope.exchange.scoreOut.sort,
    	        	order					: $rootScope.exchange.scoreOut.order,
    	        	isPaging				: 'N'
        		};

        		$("#excelForm").html('');
        		$.each(param, function(key, value){
        			$("<input></input>").attr({type:"hidden", name:key, value:value}).appendTo($("#excelForm"));
        		});
        		
        		$("#excelForm").attr("action", Const.contextPath + "exchangeResult/downRegistScoreOutList.do").submit();
        		$("#excelForm").html("");
        	};
        	
        	/**
             * 검색영역 validate check
             */
            $scope.checkValidateSearch = function(){
				if(isNull($rootScope.exchange.scoreOut.searchUserUniv)){
					commonService.alert("검색영역에서 학교구분의 대학을 선택해주세요.");
					return false;
				}
				return true;
            }
            
            /**
             * 등급 전환 설정 등록/수정 페이지 이동
             */
            $scope.saveGradeTranceView = function(){
        		if(!$scope.checkValidateSearch()){
        			return false;
        		}
        		
        		ngDialog.open({
                    template: Const.contextPath + 'html/exchange/gradeTranceListPopup.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 700,
                    controller: function($scope, $compile) {
                		
                		$rootScope.exchange.scoreOut.gradeUnivName = $("[ng-model='$root.exchange.scoreOut.searchUserUniv'] > option:selected").text();

                		var	param = {
        					univCode : $rootScope.exchange.scoreOut.searchUserUniv
            			};
                		
        				exchangeResultService.getGradeTranceList(param, function(data) {
                        	$rootScope.exchange.scoreOut.exchangeResultInfo.gradeTranceType = data.universityInfo.gradeTranceType + "";
                        	$rootScope.exchange.scoreOut.exchangeResultInfo.gradeListType2 = data.gradeListType2;
                        	$rootScope.exchange.scoreOut.exchangeResultInfo.gradeListType3 = data.gradeListType3;
                        });
        	        	
        	        	/**
        	        	 * 등급 및 점수범위 추가
        	        	 */
        	        	$scope.addGradeTrance = function(){
        	        		var lastIndex = 0;
        	        		var id = $(".grade_code > ._list > tbody > tr").last().find("[name='type2Name']").attr("id");
        	        		lastIndex = id.substring(id.indexOf("_")+1, id.length)*1;
        	        		if(typeof lastIndex === "string"){
        	        			lastIndex = 0;
        	        		}else{
        	        			lastIndex += 1;
        	        		}
        	        		
        	        		var html = '';
        	        		html += '<tr id="gradeList_'+lastIndex+'">';
        	        		html += 	'<td class="_aL"><input kr-input type="text" name="type2Name" id="type2Name_'+lastIndex+'" placeholder="" class="w100" maxlength="3"></td>';
        	        		html += 	'<td>';
        	        		html += 		'<input type="text" name="type2Min" id="type2Min_'+lastIndex+'" class="w35" maxlength="3" numberOnly>';
        	        		html += 		'<label for="time_minute" class="left0"></label>';
        	        		html += 		'<input type="text" name="type2Max" id="type2Max_'+lastIndex+'" class="w35 ml30" maxlength="3" numberOnly>';
        	        		html += 	'</td>';
        	        		html += 	'<td class="_aL"><input kr-input type="text" name="type3Name" id="type3Name_'+lastIndex+'" placeholder="" class="w100" maxlength="3"></td>';
        	        		html += 	'<td>';
        	        		html += 		'<input type="text" name="type3Min" id="type3Min_'+lastIndex+'" class="w35" maxlength="3" numberOnly>';
        	        		html += 		'<label for="time_minute" class="left0"></label>';
        	        		html += 		'<input type="text" name="type3Max" id="type3Max_'+lastIndex+'" class="w35 ml30" maxlength="3" numberOnly>';
        	        		html += 	'</td>';
        	        		html += 	'<td>';
        	        		html +=			'<span class="_button _minimum _save"><a href="javascript:void(0);" ng-click="removeGradeTrance('+lastIndex+');">삭제</a></span>';
        	        		html += 	'</td>';
        	        		html += '</tr>';

        	        		var newElement = angular.element(html);
        	        		$(".grade_code > ._list > tbody").append(newElement);
        	        		$compile(newElement)($scope);
        	        	};
        	        	
        	        	/**
        	        	 * 등급 및 점수범위 제거
        	        	 * @param idx 리스트 인덱스 
        	        	 */
        	        	$scope.removeGradeTrance = function(idx){
        	        		$("#gradeList_"+idx).remove();
        	    		};
        	        	
        	            /**
        	             * 등급 전환 설정 정보 저장 버튼
        	             */
        	            $scope.saveGradeTranceInfo = function() {
        	            	if($scope.checkValidate()){
        	            		commonService.confirm('등급 및 점수를 저장 하시겠습니까?', function() {

        	            			var	param = {
        	        					univCode		: $rootScope.exchange.scoreOut.searchUserUniv,
        	            				gradeTranceType	: $rootScope.exchange.scoreOut.exchangeResultInfo.gradeTranceType + ""
        	            			};

        	            			var type2Name = [];
        	            			var type2Min = [];
        	            			var type2Max = [];
        	            			var type3Name = [];
        	            			var type3Min = [];
        	            			var type3Max = [];

        	            			$(".grade_code > ._list > tbody > tr").each(function(i){
        	            				var $tr = $(this);
        	            				type2Name.push($tr.find("[name='type2Name']").val());
        	            				type2Min.push($tr.find("[name='type2Min']").val());
        	            				type2Max.push($tr.find("[name='type2Max']").val());
        	            				type3Name.push($tr.find("[name='type3Name']").val());
        	            				type3Min.push($tr.find("[name='type3Min']").val());
        	            				type3Max.push($tr.find("[name='type3Max']").val());
        	                    	});

        	            			param.type2Name	= type2Name;
        	            			param.type2Min	= type2Min;
        	            			param.type2Max	= type2Max;
        	            			param.type3Name	= type3Name;
        	            			param.type3Min	= type3Min;
        	            			param.type3Max	= type3Max;

        	            			exchangeResultService.saveGradeTranceInfo(param, function(data) {
        	        					if(data.resultCode == "0"){
                    						commonService.alert('저장되었습니다.',function(){
                    							$scope.closeLayerPopup();
                        						$rootScope.exchange.scoreOut.scope.search(true);
                    						});
        	        					}else{
        	        						commonService.serverError(data);
        	        					}
        	        				});
        	            		});
        	            	}
        	            }
        	            
        	            /**
        	             * 등급 전환 설정 정보 validate check
        	             */
        	            $scope.checkValidate = function(){
        	            	
        	            	var checkGrade = true;
        	            	$(".grade_code > ._list > tbody > tr").each(function(i){
        	            		var $tr = $(this);
        	            		if(!$scope.isGrade($tr.find("[name='type2Name']").val())){
        	            			commonService.alert("4.5만점 기준의 등급을 영어와 +,- 만 입력해주세요.", function(){
        	            				$tr.find("[name='type2Name']").focus();
        	            			});
        	            			checkGrade = false;
        	            			return false;
        	            		}
        	            		
        	            		if(!$scope.isScore($tr.find("[name='type2Min']").val())){
        	            			commonService.alert("100이하 점수를 입력해주세요.", function(){
        	            				$tr.find("[name='type2Min']").focus();
        	            			});
        	            			checkGrade = false;
        	            			return false;
        	            		}
        	            		
        	            		if(!$scope.isScore($tr.find("[name='type2Max']").val())){
        	            			commonService.alert("100이하 점수를 입력해주세요.", function(){
        	            				$tr.find("[name='type2Max']").focus();
        	            			});
        	            			checkGrade = false;
        	            			return false;
        	            		}
        	            		
        	            		if(!$scope.isGrade($tr.find("[name='type3Name']").val())){
        	            			commonService.alert("4.3만점 기준의 등급을 영어와 +,- 만 입력해주세요.", function(){
        	            				$tr.find("[name='type3Name']").focus();
        	            			});
        	            			checkGrade = false;
        	            			return false;
        	            		}
        	            		
        	            		if(!$scope.isScore($tr.find("[name='type3Min']").val())){
        	            			commonService.alert("100이하 점수를 입력해주세요.", function(){
        	            				$tr.find("[name='type3Min']").focus();
        	            			});
        	            			checkGrade = false;
        	            			return false;
        	            		}
        	            		
        	            		if(!$scope.isScore($tr.find("[name='type3Max']").val())){
        	            			commonService.alert("100이하 점수를 입력해주세요.", function(){
        	            				$tr.find("[name='type3Max']").focus();
        	            			});
        	            			checkGrade = false;
        	            			return false;
        	            		}
        	            		
        	            		if(parseInt($tr.find("[name='type2Min']").val()) >= parseInt($tr.find("[name='type2Max']").val()) || parseInt($tr.find("[name='type3Min']").val()) >= parseInt($tr.find("[name='type3Max']").val())){
        	            			commonService.alert("최소 점수를 최대 점수보다 작게 입력해주세요.");
        	            			checkGrade = false;
        	            			return false;
        	            		}
        	            	});

        	            	return checkGrade;
        	            };
        	            
        	            // 등급 validate check
        	            $scope.isGrade = function(grade){
        	            	if(isNull(grade) || !(/^[a-zA-Z]{1}[+-]{0,2}$/.test(grade))){
        	            		//commonService.alert("영어와 +,- 만 입력해주세요.");
        	            		return false;
        	            	}
        	            	return true;
        	            };
        	            
        	            // 점수 validate check
        	            $scope.isScore = function(score){
        	            	if(isNull(score) || !(/^[0-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/.test(score))){
        	            		//commonService.alert("점수는 100이하로 입력해주세요.");
        	            		return false;
        	            	}
        	            	return true;
        	            };
    					
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        };
                    }
        		});
            };
            
        });
})());