((function() {
    angular.module('appModule')
        .controller('managerTypeSettingCtrl', function($scope, $rootScope, commonService, Const, authorityService) {
            console.log("manager type setting in....");


            // 대학교 지역 코드 목록 조회
            if (!$rootScope.authority.typeSet.areaList) {
                commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
                    $rootScope.authority.typeSet.areaList = data.codeList;
                });
            }

            /**
             * 지역 셀렉트 박스에서 지역을 변경할 경우에 대한 이벤트 처리
             */
            $scope.$watch('$root.authority.typeSet.searchParam.areaCode', function(afterVal, beforeVal) {
                if (afterVal !== beforeVal) {
                    $rootScope.authority.typeSet.searchParam.univCode = '';
                    if (afterVal) {
                        commonService.getCodeList(afterVal, function (data) {
                            $rootScope.authority.typeSet.universityList = data.codeList;
                        });
                    }
                }
            });

            /**
             * 검색 초기화 버튼 클릭 이벤트
             */
            $scope.searchParamClear = function() {
                $rootScope.authority.typeSet.searchParam.managerType = '';
                $rootScope.authority.typeSet.searchParam.keywordType = '';
                $rootScope.authority.typeSet.searchParam.keyword = '';
                $rootScope.authority.typeSet.searchParam.areaCode = '';
                $rootScope.authority.typeSet.searchParam.univCode = '';
                
                if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                	){
        			$rootScope.authority.typeSet.searchParam.areaCode = $rootScope.userSession.univAreaCd;
        			commonService.getCodeList($rootScope.authority.typeSet.searchParam.areaCode, function (data) {
                        $rootScope.authority.typeSet.universityList = data.codeList;
                    });
        			$rootScope.authority.typeSet.searchParam.univCode = $rootScope.userSession.univCode;
        		}
            };

            /**
             * 조회 버튼 클릭 이벤트
             */
            $scope.searchManagerList = function(redrawPage) {
                var requestParam = {
                    managerType : $rootScope.authority.typeSet.searchParam.managerType,
                    keywordType : $rootScope.authority.typeSet.searchParam.keywordType,
                    keyword : $rootScope.authority.typeSet.searchParam.keyword,
                    areaCode : $rootScope.authority.typeSet.searchParam.areaCode,
                    univCode : $rootScope.authority.typeSet.searchParam.univCode,
                    nowPage : isNull(pagingGlobalVar["managerListPaging"])? 1 : pagingGlobalVar["managerListPaging"].nowPage,
                    rowCnt :  $rootScope.authority.typeSet.searchParam.maxRowCnt,
                    sort : $rootScope.authority.typeSet.searchParam.sort?$rootScope.authority.typeSet.searchParam.sort:"univName",
                    order : $rootScope.authority.typeSet.searchParam.order?$rootScope.authority.typeSet.searchParam.order:"ASC"
                };

                authorityService.getManagerList(requestParam, function(data) {
                    if (data.managerList) {
                        $rootScope.authority.typeSet.managerList = data.managerList;
                        $rootScope.authority.typeSet.totalCnt = data.managerList[0].totalCnt;
                        
                        var totCnt = data.managerList[0].totalCnt*1;
						var nowPage = $rootScope.authority.typeSet.searchParam.nowPage*1;
						var maxRowCnt = $rootScope.authority.typeSet.searchParam.maxRowCnt*1;
						$rootScope.authority.typeSet.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.authority.typeSet.searchParam.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["managerListPaging"]) || redrawPage){
							$("#managerListPaging").html("");
							$("#managerListPaging").createPaging({
								totalCnt: totCnt,
			                    nowPage: nowPage,
			                    maxRowCnt: maxRowCnt,
			                    showPageCnt: 10,
			                    clickEvent: function(pageTrgtId, pageNum) {
			                        pagingUtils.changePaging(pageTrgtId, pageNum, totCnt);
			                        $scope.searchManagerList();// 페이지 번호 선택시 재검색.
			                    }
							});
		        		}
                    } else {
                        $rootScope.authority.typeSet.managerList = [];
                        $rootScope.authority.typeSet.totalCnt = 0;
                    }
                    
                });
            };

            /**
             * 적용 버튼을 눌렀을 때 이벤트
             *
             * @param manager
             */
            $scope.saveAuthorityType = function(manager) {
                var requestParam = {
                	userSeq : manager.userSeq,
            		managerType : manager.managerType
                };
                authorityService.saveAuthorityType(requestParam,function(){
                	commonService.alert("역할이 변경되었습니다.");
                });
            };
            
          //사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
            ){
    			$rootScope.authority.typeSet.searchParam.areaCode = $rootScope.userSession.univAreaCd;
    			commonService.getCodeList($rootScope.authority.typeSet.searchParam.areaCode, function (data) {
                    $rootScope.authority.typeSet.universityList = data.codeList;
                });
    			$rootScope.authority.typeSet.searchParam.univCode = $rootScope.userSession.univCode;
    			
    			$("[ng-model='$root.authority.typeSet.searchParam.areaCode']").attr("disabled", true);
    			$("[ng-model='$root.authority.typeSet.searchParam.univCode']").attr("disabled", true);
    			
    		}

            // 화면 진입시 최초 조회
            $scope.searchManagerList(false);
            
        	$scope.changeMaxRowCnt = function(){
        		$scope.searchManagerList(true);
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
        		
        		$rootScope.authority.typeSet.searchParam.sort = sort;
        		$rootScope.authority.typeSet.searchParam.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.searchManagerList(true);
        	};
        });
})());