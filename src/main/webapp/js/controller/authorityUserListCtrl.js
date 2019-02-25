((function() {
	angular.module('appModule')
		.controller('authorityUserListCtrl', function($rootScope, $scope, $compile, ngDialog, commonService, authorityService, Const) {
			var currentDate = new Date();
			var now = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
			$scope.checked = [];
			var userChkList = $rootScope.authority.personal.personalInfo.userAuthChkList = [];
			var userClickList = $rootScope.authority.personal.personalInfo.userAuthClkList = [];
			var chkArray = $rootScope.authority.personal.chkArray = [];
 			var clkArray = $rootScope.authority.personal.clkArray = [];
			var sumArray = $rootScope.authority.personal.personalInfo.sumUserAuthList = [];
			
			/**
			 * 학교 지역 목록
			 * 
			 */
        	if($rootScope.authority.personal.searchUnivAreaList.length == 1){
            	commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
            		if(data.codeList != null && data.codeList.length > 0){
            			$rootScope.authority.personal.searchUnivAreaList = [];
            			$rootScope.authority.personal.searchUnivAreaList.push({code:"", codeName:"지역 전체"});
            			$rootScope.authority.personal.univAreaCodeList = [];
            			$rootScope.authority.personal.univAreaCodeList.push({code:"", codeName:"지역 선택"});
            			$.each(data.codeList, function(i, codeInfo){
            				$rootScope.authority.personal.searchUnivAreaList.push({code : codeInfo.code, codeName : codeInfo.codeName});
            				$rootScope.authority.personal.univAreaCodeList.push({code : codeInfo.code, codeName : codeInfo.codeName});
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
        		$rootScope.authority.personal[childModel+"List"] = [];
        		
        		if(childModel == "searchUniv"){
        			if(isNull($rootScope.authority.personal[parentModel])) {
        				$rootScope.authority.personal[childModel+"List"].push({code : "", codeName : "대학교 전체"});
        				return;
        			}
        			commonService.getCodeList($rootScope.authority.personal[parentModel], function(data) {
                		if(data.codeList != null && data.codeList.length > 0){
            				$rootScope.authority.personal[childModel+"List"].push({code : "", codeName : "대학교 전체"});
                			$.each(data.codeList, function(i, codeInfo){
                            	$rootScope.authority.personal[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
                            });
                			if(isNull(defaultValue)) {
                				$rootScope.authority.personal[childModel] = $rootScope.authority.personal[childModel+"List"][0].code;
                			}
                			else {
                				$rootScope.authority.personal[childModel] = defaultValue;
                			}
                		}
                		if(callBack) {
                			callBack();
                		}
                    });
        		}
        		
        		if(childModel == "univCode"){
        			if(isNull($rootScope.authority.personal.personalInfo[parentModel])) return;
        			commonService.getCodeList($rootScope.authority.personal.personalInfo[parentModel], function(data) {
        				if(data.codeList != null && data.codeList.length > 0){
	        				$rootScope.authority.personal[childModel+"List"].push({code : "", codeName : "대학교 선택"});
	            			$.each(data.codeList, function(i, codeInfo){
	                        	$rootScope.authority.personal[childModel+"List"].push({code : codeInfo.code, codeName : codeInfo.codeName});
	                        });
	            			//$rootScope.authority.personal[childModel] = $rootScope.authority.personal[childModel+"List"][0].code;
	            		}
        			});
        		}
        	};
			
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
            	$rootScope.authority.personal.nowGroupParentSeq = obj;
            };
        	
        	/**
             * 메뉴 목록 한번에 가져오기
             */
			$scope.getMenuAuthForUser = function(seq) {
				var param = {
						userSeq: seq
				};
				
				authorityService.getMenuAuthForGroup(param, function(data) {
					
					//트리로 변환할 배열
					var list =  data.menuAuth;
					$scope.list = JSON.stringify(list, null, '   ');    
					
					//트리 모델로 변환
					$rootScope.authority.personal.tree = $scope.treeModel(list, null);	
					
					$.each($rootScope.authority.personal.tree, function(i, d) {
						if(d.children === undefined) {
							d.pm = 'minus';
						}
					});
					
					$rootScope.authority.personal.jsonTree = JSON.stringify($rootScope.authority.personal.tree, null, '   ');
					
					authorityService.getMenuAuthForUser(param, function(data) {
						
						if(data.menuAuth !== undefined) {
							$.each(data.menuAuth, function(i, items) {
	            				$scope.clickToggle(items.menuSeq);
	            				if (items.menuSeq) {
	                        		$("#chk_"+items.menuSeq).prop("checked", true);
	                        	}
	                        	else {
	                        		$("#chk_"+items.menuSeq).prop("checked", false);
	                        	}
							});
						}
					}); 		
	            });
			}
			
			/**
			 * 권한 그룹 목록 조회
			 * @param redrawPage boolean (페이징 영역 설정값 초기화 및 재구성 여부)
			 */
			$scope.search = function(redrawPage) {
				sumArray = [];
            	userChkList = [];
            	userClickList = [];
            	$rootScope.authority.personal.personalInfo = {};
            	$('#tree-root').children().remove();
            	sumArray = [];
            	userChkList = [];
            	userClickList = [];
            	
				var param = {
						searchUnivArea		: $rootScope.authority.personal.searchUnivArea,
						searchUniv			: $rootScope.authority.personal.searchUniv,
						searchOption		: $rootScope.authority.personal.searchOption,
						searchKeywords		: $rootScope.authority.personal.searchKeywords,
				}
				
				authorityService.getUnivManagerList(param, function(data) {
					$rootScope.authority.personal.searchYn = 'Y';
					$rootScope.authority.personal.univManagerList = data.univManagerList;
				});
			}
			
			//사용자 권한에 따른 학교구분 검색조건 세팅
    		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
    			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
            ){
    			$rootScope.authority.personal.searchUnivArea = $rootScope.userSession.univAreaCd;
    			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
    			$rootScope.authority.personal.searchUniv = $rootScope.userSession.univCode;
    			
    			$("[ng-model='$root.authority.personal.searchUnivArea']").attr("disabled", true);
    			$("[ng-model='$root.authority.personal.searchUniv']").attr("disabled", true);
    		}
    		
    		// 검색조건 초기화
        	$scope.resetSearchFiled = function(){
    			$rootScope.authority.personal.searchUnivArea		= null;
    			$rootScope.authority.personal.searchUniv			= null;
    			$rootScope.authority.personal.searchOption		 	= null;
    			$rootScope.authority.personal.searchKeywords		= null;
    			
    			//사용자 권한에 따른 학교구분 검색조건 세팅
        		if( $rootScope.userSession.userType == Const.code.USER_TYPE_UNIV ||
        			$rootScope.userSession.userType == Const.code.USER_TYPE_LLLEARN
                ){
        			$rootScope.authority.personal.searchUnivArea = $rootScope.userSession.univAreaCd;
        			$scope.getChildCdList("searchUnivArea", "searchUniv", $rootScope.userSession.univCode);
        			$rootScope.authority.personal.searchUniv = $rootScope.userSession.univCode;
        			
        			$("[ng-model='$root.authority.personal.searchUnivArea']").attr("disabled", true);
        			$("[ng-model='$root.authority.personal.searchUniv']").attr("disabled", true);
        		}
        	};
			
            //페이지 로드시 목록을 조회하기 위함.
        	$scope.search(false);
			
        	/**
        	 * 담당자 클릭
        	 * 
        	 */
        	var clickMgrList = $scope.clickMgrList = function(seq, idx) {
        		$('.tr-mgr').removeClass('active').addClass('deactive');
            	
            	if($('#tr-mgr-'+idx).hasClass('deactive')) {
            		$('#tr-mgr-'+idx).addClass('active').removeClass('deactive');
            	}
            	else if($('#tr-mgr-'+idx).hasClass('active')) {
            		$('#tr-mgr-'+idx).addClass('deactive').removeClass('active');
            	}
            	
            	$scope.getMenuAuthForUser(seq);
            	sumArray = [];
            	userChkList = [];
            	userClickList = [];
            	
        		var param = {userSeq : seq};
        		authorityService.getUnivMgrInfo(param, function(data) {
        			$rootScope.authority.personal.personalInfo.univCode = data.mgrInfo.univCode;
        			$rootScope.authority.personal.personalInfo.univCodeName = data.mgrInfo.univCodeName;
        			$rootScope.authority.personal.personalInfo.userSeq = data.mgrInfo.userSeq;
        			$rootScope.authority.personal.personalInfo.userName = data.mgrInfo.userName;
        			$rootScope.authority.personal.personalInfo.userId = data.mgrInfo.userId;
        			$rootScope.authority.personal.personalInfo.managerAuthorityType = data.mgrInfo.managerAuthorityType;
        			$rootScope.authority.personal.personalInfo.sessionUser = $rootScope.userSession.userName;
        			$rootScope.authority.personal.personalInfo.regDt = now;
        			
        		});
        		setAttachedGroupList(param);
        	}
        	
        	/**
        	 * 권한목록 불러오기
        	 * 
        	 */
        	var setAttachedGroupList = $scope.setAttachedGroupList = function(param) {
        		authorityService.getAttachedGroupList(param, function(data) {
        			if (data.groupList) {
        				$rootScope.authority.personal.attachedGroupList = data.groupList;
        			} else {
        				$rootScope.authority.personal.attachedGroupList = [];
        			}
        		});
        	};
        	
        	/**
        	 * 권한목록 추가 버튼
        	 * 
        	 */
        	$scope.addGroupClick = function() {
        		var param = {
        				univCode 	: $rootScope.authority.personal.personalInfo.univCode,
        				userSeq		: $rootScope.authority.personal.personalInfo.userSeq
        			};
        		
        		if(!$rootScope.authority.personal.personalInfo.userSeq) {
        			commonService.alert("담당자를 선택하세요.");
        			return;
        		}
        		
                ngDialog.open({
                    template: Const.contextPath + 'html/authority/authAttachedGroupList.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 356,
                    controller: function($scope) {
                        authorityService.getUnAttachedGroupList(param, function(data) {
                        	$rootScope.authority.personal.unAttachedGroupList = data.groupList;
                        });

                        /**
                         * 그룹 추가 저장
                         */
                        $scope.saveGroup = function() {
                            var groupSeqList = [];
                            $rootScope.authority.personal.unAttachedGroupList.forEach(function(data) {
                                if (data.checked) {
                                	groupSeqList.push(data.groupSeq);
                                }
                            });

                            if (groupSeqList.length) {
                                var params = {
                                    userSeq: $rootScope.authority.personal.personalInfo.userSeq,
                                    groupSeqList: groupSeqList
                                };
                                authorityService.addGroup(params, function (data) {
                                	$scope.closeThisDialog();
                                	clickMgrList($rootScope.authority.personal.personalInfo.userSeq);
                                });
                            } else {
                                commonService.alert("권한을 선택해주세요.");
                            }
                        };
                    }
                });
            };
           
            
            /**
             * 권한그룹 선택
             * 
             */
            $scope.selectGroup = function(seq, idx) {
            	$('.li-group').removeClass('active').addClass('deactive');
            	
            	if($('#li-group-'+idx).hasClass('deactive')) {
            		$('#li-group-'+idx).addClass('active').removeClass('deactive');
            	}
            	else if($('#li-group-'+idx).hasClass('active')) {
            		$('#li-group-'+idx).addClass('deactive').removeClass('active');
            	}
            	
            	$rootScope.authority.personal.selGroupSeq = seq;
//            	$scope.getMenuAuthForUser($rootScope.authority.personal.personalInfo.userSeq);
            	
            	if(!isNull(seq)) {
            		var param = {
							groupSeq : seq,
							userSeq  : $rootScope.authority.personal.personalInfo.userSeq
					}
            		authorityService.getUserMenuInfo(param, function(data) {
            			
            			$rootScope.authority.personal.personalInfo.menuList		= data.groupInfo.menuList; 
            			$rootScope.authority.personal.personalInfo.parentList	= data.groupInfo.parentList; 
            			
            			$.each($rootScope.authority.personal.personalInfo.parentList, function(i, items) {
            				$scope.clickToggle(items);
						});
						
            			$.each($rootScope.authority.personal.personalInfo.menuList, function(i, items) {
            				$scope.checkbox(items);
            			});
            		});
            	}
            }
            
            $scope.removeGroup = function() {
            	var selected = $rootScope.authority.personal.selGroupSeq;
            	
                var params = {
                    groupSeq : selected,
                    userSeq  : $rootScope.authority.personal.personalInfo.userSeq
                }
                
                authorityService.removeGroup(params, function() {
                	$scope.getMenuAuthForUser($rootScope.authority.personal.personalInfo.userSeq);
                	clickMgrList($rootScope.authority.personal.personalInfo.userSeq);
                });
            }
            
            /**
             * 체크박스 클릭
             */
            $scope.checkbox = function(idx) {
            	var param = {
            			userSeq : $rootScope.authority.personal.personalInfo.userSeq,
            			menuSeq : idx
            	};
            	if ($("#chk_"+idx).is(":checked") === true) {
            		$("#chk_"+idx).prop("checked", false);
            		authorityService.deleteMenuAuthForUser(param, function() {
            		});
            	}
            	else {
            		$("#chk_"+idx).prop("checked", true);
            		authorityService.saveMenuAuthForUser(param, function() {
            		});
            	}
			}
            
            /**
             * 담당 타입( 정, 부 ) 선택
             */
        	$scope.getManagerAuthorityType = function() {
            	var personalInfo = {};
            	var resultStr = "";
            	
            	personalInfo = $rootScope.authority.personal.personalInfo;
            	
            	if(!isNull(personalInfo)){
            		var mgrAuthType = personalInfo.managerAuthorityType;
            		if(mgrAuthType === 1){
            			resultStr = "정";
            		}else if(mgrAuthType === 2){
            			resultStr = "부";
            		}
            	}
            	return resultStr;
            };
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
		});
})());

























