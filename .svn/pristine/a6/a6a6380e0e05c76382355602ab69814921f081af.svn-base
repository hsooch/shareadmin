((function() {
	angular.module('appModule')
		.controller('authorityGroupListCtrl', function($rootScope, $scope, $compile, commonService, authorityService, userService, Const) {
			var currentDate = new Date();
			var now = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
        	$scope.checked = [];
        	
        	/**
        	 * 유저 목록
        	 * 
        	 */
        	if($rootScope.authority.group.searhUserList.length == 1) {
        		var param = {};
        		userService.selectUserList(param, function(data) {
        			if(data.userList != null && data.userList.length > 0) {
        				$rootScope.authority.group.searchUserList = [];
        				$rootScope.authority.group.searchUserList.push({userSeq:"", userName:"작성자 검색"});
        				$.each(data.userList, function(i, userInfo) {
        					$rootScope.authority.group.searchUserList.push({userSeq : userInfo.userSeq, userName : userInfo.userName});
        				});
        			}
        		});
        	}
        	
			/**
			 * 학교 지역 목록
			 * 
			 */
        	if($rootScope.authority.group.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.authority.group.searchUnivAreaList = [];
            			$rootScope.authority.group.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.authority.group.univAreaCodeList = [];
            			$rootScope.authority.group.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.authority.group.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.authority.group.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
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
        		$rootScope.authority.group[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.authority.group[parentModel])) {
        				$rootScope.authority.group[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				return;
        			}
        			commonService.getCodeList($rootScope.authority.group[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.authority.group[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.authority.group[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)) {
                				$rootScope.authority.group[childModel] = $rootScope.authority.group[childModel+"List"][0].code;
                			}
                			else {
                				$rootScope.authority.group[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.authority.group.groupInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.authority.group.groupInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.authority.group[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.authority.group[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			//$rootScope.authority.group[childModel] = $rootScope.authority.group[childModel+"List"][0].code;
	            		}
        			});
        		}
        	};
			
			/**
			 * 권한그룹 목록 페이지 이동
			 * 
			 */
        	$scope.goGroupListView = function() {
				$rootScope.authority.group.pageViewType = "list";
//				$rootScope.authority.group.groupInfo = {};
				$rootScope.authority.group.groupInfo.checked = [];
				var cfd = $rootScope.authority.group.chkForDel = [];
	        	var huc = $rootScope.authority.group.haveUserCnt = [];
				$scope.checked = [];
				$scope.search();
			};
			
			/**
			 * 권한 그룹 목록 조회
			 * 
			 * @param redrawPage boolean (페이징 영역 설정값 초기화 및 재구성 여부)
			 */
			$scope.search = function(redrawPage) {
				
				$("#basicCheckAll").prop("checked", false);
				var param = {
						searchUnivArea		: $rootScope.authority.group.searchUnivArea,
						searchUniv			: $rootScope.authority.group.searchUniv,
						searchUseYn			: $rootScope.authority.group.searchUseYn,
						searchOption		: $rootScope.authority.group.searchOption,
						searchKeywords		: $rootScope.authority.group.searchKeywords,
						searchUser			: $rootScope.authority.group.searchUser,
						sort				: $rootScope.authority.group.sort,
						order				: $rootScope.authority.group.order,
						nowPage				: isNull(pagingGlobalVar["groupListPaging"])? 1 : pagingGlobalVar["groupListPaging"].nowPage,
						rowCnt				: $rootScope.authority.group.maxRowCnt,
				}
				
				authorityService.getGroupList(param, function(data) {
					$rootScope.authority.group.searchYn = 'Y';
					$rootScope.authority.group.groupList = data.groupList;
					if (data.groupList.length > 0) {
						var totCnt = data.groupList[0].totalCnt*1;
						var nowPage = $rootScope.authority.group.nowPage*1;
						var maxRowCnt = $rootScope.authority.group.maxRowCnt*1;
						$rootScope.authority.group.totalCnt = totCnt;
						var maxPage = (totCnt/maxRowCnt)+1;
						if(nowPage > maxPage){
							nowPage = maxPage;
							$rootScope.authority.group.nowPage = nowPage;
						}
						
						//paging 유무 확인 후 없으면 paging영역 재구성 
						if(isNull(pagingGlobalVar["groupListPaging"]) || redrawPage){
							$("#groupListPaging").html("");
							$("#groupListPaging").createPaging({
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
						$rootScope.authority.group.totalCnt = 0;
					}
				});
			}
			
			//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
            ){
    			$rootScope.authority.group.searchUnivArea = $rootScope.userSession.univAreaCd;
    			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
    			$rootScope.authority.group.searchUniv = $rootScope.userSession.univCode;
    			
    			$("[ng-model='$root.authority.group.searchUnivArea']").attr("disabled", true);
    			$("[ng-model='$root.authority.group.searchUniv']").attr("disabled", true);
    		}
    		
    		// 검색조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.authority.group.searchUnivArea		= null;
    			$rootScope.authority.group.searchUniv			= null;
    			$rootScope.authority.group.searchUseYn			= null;
    			$rootScope.authority.group.searchOption		 	= null;
    			$rootScope.authority.group.searchKeywords		= null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
    			if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
	    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
	            ){
	    			$rootScope.authority.group.searchUnivArea = $rootScope.userSession.univAreaCd;
	    			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
	    			$rootScope.authority.group.searchUniv = $rootScope.userSession.univCode;
	    			
	    			$("[ng-model='$root.authority.group.searchUnivArea']").attr("disabled", true);
	    			$("[ng-model='$root.authority.group.searchUniv']").attr("disabled", true);
	    		}
        	};
			
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
        		
        		$rootScope.authority.group.sort = sort;
        		$rootScope.authority.group.order = order;
        		$(elemObj).attr("data-order", order);
        		$scope.search(true);
        	};
        	
        	/**
        	 * 삭제 체크박스
        	 * 
        	 */
        	var cfd = $rootScope.authority.group.chkForDel = [];
        	var huc = $rootScope.authority.group.haveUserCnt = [];
        	var n = $rootScope.authority.group.userCnt = 0;
        	$scope.c = [];
        	$scope.h = [];
        	$scope.chkForDel = function(seq, cnt) {
        		
        		if ($("#thisChk_"+seq).is(":checked") === true) {
            		$("#thisChk_"+seq).prop("checked", false);
            		$scope.c.splice($scope.c.indexOf(seq),1);
            		$scope.h.splice($scope.h.indexOf(cnt),1);
            		n = n - cnt;
            	}
            	else {
            		$("#thisChk_"+seq).prop("checked", true);
            		$scope.c.push(seq);
            		$scope.h.push(cnt);
            		n = n + cnt;
            	}
        		cfd = $scope.c;
        		huc = $scope.h;
        	}
        	
        	/**
        	 * 다클릭
        	 * 
        	 */
        	$scope.clickAll = function() {
        		$.each($rootScope.authority.group.groupList, function(i, group) {
        			$scope.chkForDel(group.groupSeq, group.haveUserCnt);
        		});
        	}
        	
        	$scope.dg = function(seq) {
        		commonService.confirm('삭제 하시겠습니까?', function() {
					var param = {groupSeq : seq};
					authorityService.deleteGroup(param, function() {
						$scope.goGroupListView();
					});
				});
        	}
        	
        	/**
        	 * 목록 삭제
        	 */
        	$scope.deleteList = function() {
        		if(cfd.length > 0) {
	    			if(n > 0) {
	    				commonService.alert('사용중인 권한 그룹이 있습니다. 권한 그룹에서 사용자를 해제하신 후 다시 시도해주세요');
	    			}
	    			else {
	    				commonService.confirm('삭제 하시겠습니까?', function() {
	    					var param = {groupSeq : cfd};
	    					authorityService.deleteGroup(param, function() {
	    						$scope.search(false);
	    					});
	    				});
	    			}
        		}
        		else {
        			commonService.alert('권한 그룹을 선택해주세요.');
        		}
        	}
			
			/**
			 * 권한그룹 등록 페이지 이동
			 */
			$scope.goGroupRegistView = function(groupSeq, idx) {
				$rootScope.authority.group.pageViewType = "regist";

				
				$rootScope.authority.group.groupInfo.useYn = "Y";
				
				//사용자 권한에 따른 학교구분 검색조건 세팅
	    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
	    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
	            ){
	    			$rootScope.authority.group.groupInfo.univAreaCode = $rootScope.userSession.univAreaCd;
	    			$scope.getChildCdList("univAreaCode", "univCode", $rootScope.userSession.univCode);
	    			$rootScope.authority.group.groupInfo.univCode = $rootScope.userSession.univCode;
	    			
	    			$("[ng-model='$root.authority.group.groupInfo.univAreaCode']").attr("disabled", true);
	    			$("[ng-model='$root.authority.group.groupInfo.univCode']").attr("disabled", true);
	    		}
	    		
	    		var param = {};
				
				$scope.getMenuAuthForGroup();
				
				if(!isNull(groupSeq)) {
					var param = {
							groupSeq : groupSeq
					}
					authorityService.getGroupInfo(param, function(data) {
						$rootScope.authority.group.groupInfo 				= data.groupInfo;
						$rootScope.authority.group.groupInfo.groupSeq 		= groupSeq;
						$rootScope.authority.group.groupInfo.idx 			= idx;
						$rootScope.authority.group.groupInfo.groupName		= data.groupInfo.groupName;
						$rootScope.authority.group.groupInfo.groupDesc		= data.groupInfo.groupDesc;
						$rootScope.authority.group.groupInfo.univCode		= data.groupInfo.univCode;
						$rootScope.authority.group.groupInfo.univAreaCode	= data.groupInfo.univAreaCode;
						$rootScope.authority.group.groupInfo.useYn			= data.groupInfo.useYn;
						$rootScope.authority.group.groupInfo.regDt			= data.groupInfo.regDt;
						$rootScope.authority.group.groupInfo.regUserSeq		= data.groupInfo.regUserSeq;
						$rootScope.authority.group.groupInfo.checked		= data.groupInfo.menuList; 
						$rootScope.authority.group.groupInfo.clicked		= data.groupInfo.parentList; 
						$rootScope.authority.group.groupInfo.uc				= data.groupInfo.haveUserCnt;
					
						$scope.getChildCdList("univAreaCode", "univCode");
						
						$.each($rootScope.authority.group.groupInfo.clicked, function(i, items) {
							$scope.clickToggle(items);
						});
						
						$.each($rootScope.authority.group.groupInfo.checked, function(i, items) {
							$scope.checkbox(items);
						});
					});
				}
				else {
					$rootScope.authority.group.groupInfo.groupSeq = '';
					$rootScope.authority.group.groupInfo.regUserName = $rootScope.userSession.userName;
					$rootScope.authority.group.groupInfo.regUserSeq = $rootScope.userSession.userSeq;
					$rootScope.authority.group.groupInfo.groupName = '';
					$rootScope.authority.group.groupInfo.groupDesc = '';
					$rootScope.authority.group.groupInfo.regDt = now;
				}
			}
			
			/**
			 * 권한그룹 저장
			 * 	
			 */
			$scope.saveGroupInfo = function() {
				
				if($scope.checkValidate()) {
					var params = {
							groupSeq	: $rootScope.authority.group.groupInfo.groupSeq,
							univCode 	: $rootScope.authority.group.groupInfo.univCode,
							groupName 	: $rootScope.authority.group.groupInfo.groupName,
							useYn 		: $rootScope.authority.group.groupInfo.useYn,
							groupDesc 	: $rootScope.authority.group.groupInfo.groupDesc,
							regUserSeq	: $rootScope.userSession.userSeq,
							menuSeq		: $rootScope.authority.group.groupInfo.checked
					}
					
					commonService.confirm('저장 하시겠습니까?', function() {
						authorityService.saveGroupInfo(params, function(data) {
							$scope.goGroupListView();
							$scope.search(true);
						});
					});
				}
			}
			
			
//////////////////////////////////////////////////////////////////////////////////////////////////////////////		
			/**
             * 메뉴 목록 한번에 가져오기
             */
			$scope.getMenuAuthForGroup = function() {
				var param = {};
				
				authorityService.getMenuAuthForGroup(param, function(data) {
					//트리로 변환할 배열
					var list =  data.menuAuth;
					$scope.list = JSON.stringify(list, null, '   ');    

					//트리 모델로 변환
					$rootScope.authority.group.tree = $scope.treeModel(list, null);	
					
					$.each($rootScope.authority.group.tree, function(i, d) {
						if(d.children === undefined) {
	            			d.pm = 'minus';
						} 
					});
					
					$rootScope.authority.group.jsonTree = JSON.stringify($rootScope.authority.group.tree, null, '   ');
	            });
			}
			
			/**
			 * 인풋 밸리데이션
			 */
			$scope.checkValidate = function(){
				if(isNull($rootScope.authority.group.groupInfo.univAreaCode)){
					commonService.alert("학교 구분을 선택해주세요.", $("[ng-model='$root.authority.group.groupInfo.univAreaCode']").focus());
					return false;
				}
				
				if(isNull($rootScope.authority.group.groupInfo.univCode)){
					commonService.alert("학교 구분을 선택해주세요.", $("[ng-model='$root.authority.group.groupInfo.univCode']").focus());
					return false;
				}
				
				if(isNull($rootScope.authority.group.groupInfo.groupName)){
					commonService.alert("권한 그룹명을 입력해주세요.");
					$('#groupName').focus();
					return false;
				}
				
				if(isNull($rootScope.authority.group.groupInfo.checked)) {
					commonService.alert("권한 그룹명에 부여할 메뉴를 선택해주세요.");
					return false;
				}
				
				return true;
			}
			
			/**
			 * 글자수 200자 체크
			 */
			$('#groupName').on('keyup', function() {
                if($(this).val().length > 30) {
                	commonService.alert('이름은 30자 이상 초과할 수 없습니다.');
                    $(this).val($(this).val().substring(0, 30));
                }
            });
			
			/**
			 * 트리 변환
			 * 
			 */
			$scope.treeModel = function (arrayList, rootId) {
				var rootNodes = [];
				var traverse = function (nodes, item, index) {
					if (nodes instanceof Array) {
						return nodes.some(function (node) {
							if (node.menuSeq === item.parentSeq) {
								node.children = node.children || [];
								return node.children.push(arrayList.splice(index, 1)[0]);
							}
							
							return traverse(node.children, item, index);
						});
					}
				};

				while (arrayList.length > 0) {
					arrayList.some(function (item, index) {
						if (item.parentSeq === rootId) {
							return rootNodes.push(arrayList.splice(index, 1)[0]);
						}

						return traverse(rootNodes, item, index);
					});
				}
				return rootNodes;
			};
			
			/**
             * 트리 클릭
             */
            $scope.clickToggle = function(obj) {
            	if(($('#toggle_'+obj).parent().find('ul').css('display')) === 'none') {
            		$('#toggle_'+obj).addClass('minus');
            	}
            	else if(($('#toggle_'+obj).parent().find('ul').css('display')) === 'block') {
            		if($('#toggle_'+obj).parent().find('li').length > 0) {
            			$('#toggle_'+obj).removeClass('minus');
            		}
            	}
            	$('#ul_'+obj).toggle();
            	$rootScope.authority.group.nowGroupParentSeq = obj;
            };
            
            /**
             * 서브트리 클릭
             */
            $scope.clickSubToggle = function(obj, parent) {
            	$rootScope.authority.group.nowGroupSeq = obj.menuSeq;
//            	$rootScope.autority.group.nowGroupParentSeq = parent.menuName
            }
            
            /**
             * 체크박스 클릭
             */
            $scope.checkbox = function(idx) {
            	if ($("#chk_"+idx).is(":checked") === true) {
            		$("#chk_"+idx).prop("checked", false);
            		$scope.checked.splice($scope.checked.indexOf(idx),1);
            	}
            	else {
            		$("#chk_"+idx).prop("checked", true);
            		$scope.checked.push(idx);
            	}
            
            	$rootScope.authority.group.groupInfo.checked = $scope.checked;
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		});
})());