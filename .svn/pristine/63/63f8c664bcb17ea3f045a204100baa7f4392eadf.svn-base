((function() {
	angular.module('appModule')
		.controller('menuManagementCtrl', function($scope, $rootScope, $compile, commonService, menuService, Const) {
			
			/**
	         * 초기 화면 셋팅
	         */
			menuService.getMenuList(Const.code.ROOT, function(data) {
                $scope.addMenu(data.menuList);
            });
			
			/**
			 * 하위 메뉴 추가 기능
			 * 
			 * @param menuList 추가할 코드 목록
		     * @param nodeId 추가할 상위 노드 아이디 (없을 시 최상위 노드에 추가)
			 */
			$scope.addMenu = function (menuList, nodeId) {
			    if (!nodeId) {
			        nodeId = "codeRoot";
			    }
			
				var html = '<ul>';
				
				if (menuList && menuList.length > 0) {
					menuList.sort(function (a, b) {
				        if (a.menuIndex < b.menuIndex) {
				            return -1;
				        } else if (a.menuIndex === b.menuIndex) {
				            return 0;
				        } else if (a.menuIndex > b.menuIndex) {
				            return 1;
				        }
				    });
				}
				
				var toggle = '';
				
				menuList.forEach(function(menu) {
					if(menu.parentSeq != null || menu.lowCount === 0) {
                		toggle = 'minus';
                	}
					else {
						toggle = '';
					}
					html += '<li class="nodes last open" id="node_'+menu.menuSeq+'">';
					html += '<button ng-click="nodeClick(\''+menu.menuSeq+'\');" type="button" class="toggle '+toggle+'"></button>';
					html += '<a class="menu-name" ng-click="infoClick(\''+menu.menuSeq+'\');" style="cursor: pointer;background: url();">' + menu.menuName + '</a>';
				    html += '</li>';
				});
				
				html += '</ul>';
				   
			    angular.element($("#" + nodeId)).append($compile(html)($scope));
			};
			
			$scope.infoClick = function(seq) {
            	var liObj = $("#node_" + seq);
        		var ulObj = $("#node_" + seq + " > ul");
        		var ulliObj = $("#node_" + seq + " > ul > li");
        		if (ulObj.length) {
        			liObj.removeClass("active");
        			$("li.active").removeClass("active");
        			$("#node_" + seq).addClass("active");
                    $("#node_" + seq).addClass("open");
        		}
        		else  {
        			if(!$("#node_" + seq).hasClass("active")) {
        				$("li.active").removeClass("active");
        				$("#node_" + seq).addClass("active");
        			}
        		}
            	$scope.getMenuInfo(seq);
            }
			
			/**
             * 트리 클릭시 이벤트
             * @param seq 시퀀스 값
             */
            $scope.nodeClick = function(seq) {
            	var liObj = $("#node_" + seq);
        		var ulObj = $("#node_" + seq + " > ul");
        		var ulliObj = $("#node_" + seq + " > ul > li");
        		$('#codeRoot').addClass('deactive').removeClass('active');
        		
        		if (ulObj.length) {
            		liObj.removeClass("open");
            		ulObj.remove();
            		if(ulliObj.length) {
            			$("#node_" + seq +" > button").removeClass("minus");
                	}
                } else {
            		$("li.active").removeClass("open");
                    $("#node_" + seq).addClass("open");
                    $("#node_" + seq +" > button").addClass("minus");
                	$scope.openNode(seq);
                }
            };
			
            /**
             * 노드 열기
             */
            $scope.openNode = function(seq) {
                menuService.getMenuList(seq, function(data) {
                    $scope.addMenu(data.menuList, 'node_' + seq);
                });
            }
            
            /**
             * 메뉴명 클릭시 정보 조회
             */
            $scope.getMenuInfo = function(seq) {
            	menuService.getMenuInfo(seq, function(data) {
            		if(data.info) {
            			console.log(data);
	            		$rootScope.menu.parentSeq = data.info.parentSeq;
	            		$rootScope.menu.parentMenuName = data.info.parentMenuName;
	            		$rootScope.menu.seq = data.info.menuSeq;
	            		$rootScope.menu.menuName = data.info.menuName;
	            		$rootScope.menu.menuUrl = data.info.menuUrl;
	            		$rootScope.menu.menuIndex = data.info.menuIndex;
	            		$rootScope.menu.regUserSeq = data.info.regUserSeq;
	            		$rootScope.menu.regUserName = data.info.regUserName;
	            		$rootScope.menu.regDt = data.info.regDt;
	            		$rootScope.menu.displayYn = data.info.displayYn;
	            		$rootScope.menu.readonlyYn = data.info.readonlyYn;
	            		$rootScope.menu.delYn = data.info.delYn;
	            		$rootScope.menu.indexCount = data.info.indexCount;
	            		$rootScope.menu.lastIndex = data.info.lastIndex;
	            		$rootScope.menu.depth = data.info.depth;
            		}
            	});
            }
            
            /**
             * 메뉴 정보 저장
             */
            $scope.saveMenuInfo = function() {
            	if(isNull($rootScope.menu.menuName)){
					commonService.alert("메뉴명을 입력해주세요.", function() {
						$("#menuName").focus();
					});
            		return;
				}
            	
            	commonService.confirm("저장 하시겠습니까?", function() {
            		var param = {
    	            		seq : $rootScope.menu.seq,
    	            		menuName : $rootScope.menu.menuName,
    	            		menuUrl : $rootScope.menu.menuUrl,
    	            		regUserSeq : $rootScope.menu.regUserSeq,
    	            		regDt : $rootScope.menu.regDt,
    	            		displayYn : $rootScope.menu.displayYn,
    	            		parentSeq : $rootScope.menu.parentSeq,
    	            		depth : $rootScope.menu.depth,
    	            		lastIndex : $rootScope.menu.lastIndex,
    	            		menuIndex : $rootScope.menu.menuIndex
                	}
            		menuService.saveMenuInfo(param, function(data) {
            			commonService.alert("저장 완료.", function() {
            				if($('#codeRoot').hasClass('active')){
                        		location.reload();
                        	}
            				else {
            					$scope.nodeClick($rootScope.menu.parentSeq);
            					$scope.nodeClick($rootScope.menu.parentSeq);
            				}
            			});
            		});	
            	});
            }            
            
            /**
             * 메뉴 삭제
             */
            $scope.deleteMenuInfo = function() {
            	var selectedNodeId = $('li.active').attr('id');
            	
            	if(selectedNodeId === undefined) {
            		commonService.alert("삭제할 메뉴를 선택하세요.");
            		return;
            	}
            	
            	var seq = selectedNodeId.split('_')[1];
            	
            	if($rootScope.menu.readonlyYn === 'Y') {
            		commonService.alert("최상위 메뉴는 삭제가 불가능합니다.");
            		return;
            	}
            	
            	commonService.confirm("메뉴를 삭제 하시겠습니가?", function() {
            		var param = {
            				seq : seq
            		}
            		menuService.deleteMenuInfo(param, function(data) {
            			var ulObj = $("#" +selectedNodeId);
            			ulObj.remove();
            			commonService.alert("삭제 완료.", function() {
            				$rootScope.menu.parentMenuName = '';
            				$rootScope.menu.menuName = '';
            				$rootScope.menu.menuUrl = '';
            				$rootScope.menu.displayYn = '';
            				$rootScope.menu.regUserName = '';
            			});
            		});
            	});
            };
            
            $scope.clickRootMenu = function() {
            	if($('#codeRoot').hasClass('deactive')) {
            		$("li.active > ul").remove();
            		$("li.active").removeClass("active");
            		$("li.active").removeClass("open");
            		$('#codeRoot').addClass('active').removeClass('deactive');
            	}
            	else if($('#codeRoot').hasClass('active')) {
            		$('#codeRoot').addClass('deactive').removeClass('active');
            	}
            }
            
            /**
             * 최상위 메뉴 추가
             */
            $scope.addTopMenu = function() {
            	menuService.getTopMenuIndex(function(data) {
            		$rootScope.menu.seq = null;
                	$rootScope.menu.parentSeq = null;
        			$rootScope.menu.parentMenuName = null;
        			$rootScope.menu.menuIndex = isNull(data.idx) ? 1 : data.idx + 1;
        			$rootScope.menu.depth = 1;
        			$rootScope.menu.menuName = '';
        			$rootScope.menu.menuUrl = '';
        			$rootScope.menu.mainYn ='N';
        			$rootScope.menu.regUserSeq = $rootScope.userSession.userSeq;
        			var now = new Date();
        			var currentDate = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
        			$rootScope.menu.regDt = currentDate;
        			
        			$("[ng-model='$root.menu.menuName']").focus();
            	});
            	
            }
            
            /**
             * 신규 메뉴 추가
             */
            $scope.addNewMenu = function() {
            	if($('#codeRoot').hasClass('active')){
            		$scope.addTopMenu();
            	}
            	else {
            		var selectedNodeId = $('li.active').attr('id');

                	if(selectedNodeId === undefined) {
                		commonService.alert("추가할 메뉴의 위치를 선택하세요.");
                		return;
                	}
                	
                	var lastIndex = $rootScope.menu.lastIndex;
                	var index = isNull(lastIndex) ? 1 : parseInt(lastIndex) + 1;
                	var depth = $rootScope.menu.depth + 1;
                	
                	var pSeq = selectedNodeId.split('_')[1];	// 추가할 노드의 부모 시퀀스
                	var pMenuName = $('li.active > a').text();
                	
            		if($("#"+ selectedNodeId).hasClass("active")) {
            			$rootScope.menu.seq = null;
            			$rootScope.menu.parentSeq = pSeq;
            			$rootScope.menu.parentMenuName = pMenuName;
            			$rootScope.menu.menuIndex = index;
            			$rootScope.menu.depth = depth;
            			$rootScope.menu.menuName = '';
            			$rootScope.menu.menuUrl = '';
            			$rootScope.menu.mainYn ='N';
            			$rootScope.menu.regUserSeq = $rootScope.userSession.userSeq;
            			var now = new Date();
            			var currentDate = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
            			$rootScope.menu.regDt = currentDate;
            			
            			$("[ng-model='$root.menu.menuName']").focus();
            		}
            	}
            }
           
            /**
             * 순서변경
             */
            $scope.changeMenuIndex = function(direction) {
            	var selectedNodeId = $('li.active').attr('id');

            	console.log(selectedNodeId);
            	
            	if(selectedNodeId === undefined) {
            		commonService.alert("순서 변경할 메뉴를 선택하세요.");
            		return;
            	}
            	
            	if(direction === 'up') {
            		$rootScope.menu.menuIndex += 1;
            		if($rootScope.menu.menuIndex > $rootScope.menu.indexCount) {
            			$rootScope.menu.menuIndex = 1;
            		}
            		var prevNodeId = $('li.active').prev().attr('id');
            		
            		if(prevNodeId === undefined) {
            			commonService.alert("더이상 위로 이동 할 수 없습니다.");
            			return;
            		}
            		
            		var prevSeq = parseInt(prevNodeId.split('_')[1]);
            		
            		var param = {
            				seqA : $rootScope.menu.seq,
            				seqB : prevSeq,
            				depth : $rootScope.menu.depth
            		}
            		
            		menuService.changeMenuIndex(param, function(data) {
            			if(prevNodeId !== undefined) {
            				$('li.active').insertBefore($('li.active').prev());
            			}
            			else {
            				return;
            			}
            		});
            	}
            	
            	if(direction === 'down') {
            		$rootScope.menu.menuIndex -= 1;
            		if ($rootScope.menu.menuIndex <= -1) {
            			$rootScope.menu.menuIndex = $rootScope.menu.indexCount;
            		}
            		var nextNodeId = $('li.active').next().attr('id');
            		
            		if(nextNodeId === undefined) {
            			commonService.alert("더이상 아래로 이동 할 수 없습니다.");
            			return;
            		}
            		
            		var nextSeq = parseInt(nextNodeId.split('_')[1]);
            		
            		var param = {
            				seqA : $rootScope.menu.seq,
            				seqB : nextSeq,
            				depth : $rootScope.menu.depth
            		}
            		
            		menuService.changeMenuIndex(param, function(data) {
            			if(nextNodeId !== undefined) {
            				$('li.active').insertAfter($('li.active').next());
            			}
            			else {
            				return;
            			}
            		});
            	}
            };
            
		});
})());


















