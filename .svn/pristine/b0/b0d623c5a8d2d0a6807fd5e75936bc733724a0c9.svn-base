((function() {
    angular.module('appModule')
        .controller('codeManagementCtrl', function($scope, $rootScope, $compile, commonService, codeService, Const) {
            $rootScope.university.code.keywords = '';
            
            // admin > 'UGR01000001'
            var userType = $rootScope.userSession.userType;
            $rootScope.university.code.newCode = '';
            
            // ---
            
            /**
             * 하위 코드 추가 기능
             *
             * @param codeList 추가할 코드 목록
             * @param nodeId 추가할 상위 노드 아이디 (없을 시 최상위 노드에 추가)
             */
            $scope.addCode = function (codeList, nodeId) {
                if (!nodeId) {
                    nodeId = "codeRoot";
                }

                var html = '<ul>';
                
                if (codeList && codeList.length > 0) {
                    codeList.sort(function (a, b) {
                        if (a.codeIndex > b.codeIndex) {
                            return -1;
                        } else if (a.codeIndex === b.codeIndex) {
                            return 0;
                        } else if (a.codeIndex < b.codeIndex) {
                            return 1;
                        }
                    });
                }
                var toggle = '';
                
                codeList.forEach(function(code) {
                	if(code.parentCode != null) {
                		toggle = 'minus';
                	}
            		html += '<li class="nodes last open" id="node_'+code.code+'">';
            		html += '<button ng-click="nodeClick(\''+code.code+'\');" type="button" class="toggle '+toggle+'"></button>';
            		html += '<a class="code-name" ng-click="infoClick(\''+code.code+'\');" style="cursor: pointer;background: url();">' + code.codeName + '</a>';
                    html += '</li>';
                });

                html += '</ul>';
               
                angular.element($("#" + nodeId)).append($compile(html)($scope));

//                $rootScope.university.code.contentsHtml = angular.element($("#codeRoot"));
            };
            
            $scope.infoClick = function(code) {
            	var liObj = $("#node_" + code);
        		var ulObj = $("#node_" + code + " > ul");
        		var ulliObj = $("#node_" + code + " > ul > li");
        		if (ulObj.length) {
        			liObj.removeClass("active");
        			$("li.active").removeClass("active");
        			$("#node_" + code).addClass("active");
                    $("#node_" + code).addClass("open");
        		}
        		else  {
        			if(!$("#node_" + code).hasClass("active")) {
        				$("li.active").removeClass("active");
        				$("#node_" + code).addClass("active");
        			}
        		}
            	$scope.getCodeInfo(code);
            }

            /**
             * 아이콘을 클릭시 이벤트
             * @param code 코드 값
             */
            $scope.nodeClick = function(code) {
            	var liObj = $("#node_" + code);
        		var ulObj = $("#node_" + code + " > ul");
        		var ulliObj = $("#node_" + code + " > ul > li");
        		
        		if (ulObj.length) {
            		liObj.removeClass("open");
            		ulObj.remove();
            		if(ulliObj.length) {
            			$("#node_" + code +" > button").removeClass("minus");
                	}
                } else {
            		$("li.active").removeClass("open");
                    $("#node_" + code).addClass("open");
                    $("#node_" + code +" > button").addClass("minus");
                	$scope.openNode(code);
                }
            };
            
            /**
             * 초기 화면 셋팅
             */
            if ($rootScope.university.code.contentsHtml) {
                angular.element($("#codeRoot")).append($rootScope.university.code.contentsHtml);
                $compile($rootScope.university.code.contentsHtml)($scope);
            }
            else {
                commonService.getCodeList(Const.code.ROOT, function(data) {
                    $scope.addCode(data.codeList);
                });
            }
            
            /**
             * 코드명 클릭시 코드정보 조회
             */
            $scope.getCodeInfo = function(code) {
            	codeService.getCodeInfo(code, function(data) {
            		if(data.info) {
            			console.log(data);
            			$rootScope.university.code.parentCode = data.info.parentCode;
	            		$rootScope.university.code.parentCodeName = data.info.parentCodeName != null ? data.info.parentCodeName : '-';
	            		$rootScope.university.code.code = data.info.code;
	            		$rootScope.university.code.codeName = data.info.codeName;
	            		$rootScope.university.code.codeDesc = data.info.codeDesc;
	            		$rootScope.university.code.useYn = data.info.useYn;
	            		$rootScope.university.code.codeIndex = data.info.codeIndex;
	            		$rootScope.university.code.regUserName = data.info.regUserName != null ? data.info.regUserName : '-';
	            		$rootScope.university.code.regDt = data.info.regDt;
	            		$rootScope.university.code.readonlyYn = data.info.readonlyYn;
	            		$rootScope.university.code.lowLastCode = data.info.lowLastCode;
	            		$rootScope.university.code.indexCount = data.info.indexCount;
            		}
            	});
            }
            
            /**
             * 숫자에 0추가
             * @param n = 숫자 width = 자리수
             */
            $scope.pad = function(n, width) {
            	n = n + '';
            	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        	}
            
            /**
             * 신규 코드 추가
             */
            $scope.addNewCode = function() {
        		var selectedNodeId = $('li.active').attr('id');

            	if(selectedNodeId === undefined) {
            		commonService.alert("추가할 코드의 위치를 선택하세요.");
            		return;
            	}
            	
            	var lastCode = $rootScope.university.code.lowLastCode;
            	
            	var pCode = selectedNodeId.split('_')[1];	// 추가할 노드의 부모코드
            	var pCodeName = $('li.active > a').text();
            	if(lastCode) {
            		var codeChar = lastCode.substring(0,3);
            		var codeNum1 = lastCode.substring(3,5);
            		var codeNum2 = lastCode.substring(5,8);
            		var codeNum3 = lastCode.substring(8,lastCode.length);
            		
            		var code = codeChar + codeNum1 + codeNum2 + $scope.pad((parseInt(codeNum3, 10) + 1), 3);
            		
            		var codeIndex = (parseInt(codeNum3, 10) + 1);
            		
            		if($("#"+ selectedNodeId).hasClass("active")) {
            			$rootScope.university.code.parentCode = pCode;
            			$rootScope.university.code.parentCodeName = pCodeName;
            			$rootScope.university.code.code = code;
            			$rootScope.university.code.codeIndex = codeIndex;
            			$rootScope.university.code.codeName = '';
            			$rootScope.university.code.codeDesc = '';
            			$rootScope.university.code.useYn ='Y';
            			$rootScope.university.code.newCode = true;
            			$rootScope.university.code.regUserName = $rootScope.userSession.userName;
            			var now = new Date();
            			var currentDate = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
            			$rootScope.university.code.regDt = currentDate;
            			
            			$("[ng-model='$root.university.code.codeName']").focus();
            		}
            	}
            }
            
            /**
             * 코드 삭제
             */
            $scope.removeCode = function() {
            	var selectedNodeId = $('li.active').attr('id');
            	
            	if(selectedNodeId === undefined) {
            		commonService.alert("삭제할 코드를 선택하세요.");
            		return;
            	}
            	
            	var code = selectedNodeId.split('_')[1];
            	
            	if($rootScope.university.code.readonlyYn === 'Y') {
            		commonService.alert("최상위 코드는 삭제가 불가능합니다.");
            		return;
            	}
            	
            	commonService.confirm("코드를 삭제 하시겠습니가?", function() {
            		var param = {
            				code : code
            		}
            		codeService.removeCode(param, function(data) {
            			var ulObj = $("#" +selectedNodeId);
            			ulObj.remove();
            			commonService.alert("삭제 완료.", function() {
            				$rootScope.university.code.parentCode = '';
                			$rootScope.university.code.parentCodeName = '';
                			$rootScope.university.code.code = '';
                			$rootScope.university.code.codeName = '';
                			$rootScope.university.code.codeDesc = '';
                			$rootScope.university.code.useYn ='Y';
                			$rootScope.university.code.regUserName ='';
            			});
            		})
            	});
            }
            
            /**
             * 노드 열기
             */
            $scope.openNode = function(code) {
                commonService.getCodeList(code, function(data) {
                    $scope.addCode(data.codeList, 'node_' + code);
                    $scope.highlight($rootScope.university.code.keywords);
                });
            }
            
            /**
             * 검색한 단어 하이라이트
             */
            $scope.highlight = function(keyword) {
            	var keyWord = keyword;
            	var replaceD = "<span style='background-color: yellow;'>" + keyWord + "</span>";
            	$(".open > a").each(function() {
        			var text = $(this).text();
            	    text = text.replace(keyWord, replaceD);
            	    $(this).html(text);
            	});
            };
            
            /**
             * 코드명 검색
             */
            $scope.searchCodeName = function() {
            	if(isNull($rootScope.university.code.keywords)) {
            		commonService.alert("검색어를 입력해주세요.", $("[ng-model='$root.university.code.keywords']").focus());
        			return false;
            	}
            	
        		if($('.nodes').hasClass("open")) {
           		 $('.nodes > ul').remove();
        		}
           	
               	var params = {
               			keywords : $rootScope.university.code.keywords
               	}
               	codeService.searchCodeName(params, function(data) {
               		if(data.codeNameList.length === 0) {
               			commonService.alert("검색 결과가 없습니다.");
               		}
               		else {
               			$rootScope.university.code.searchCodeName = [];
               			
               			$.each(data.codeNameList, function(i, codeInfo){
           					$rootScope.university.code.searchCodeName.push({
           						code : codeInfo.code,
           						codeName : codeInfo.codeName
           					});
           					$scope.openNode($rootScope.university.code.searchCodeName[i].code);
           				});
               		}
               	});
            }

            /**
             * 코드 정보 저장
             */
            $scope.saveCodeInfo = function() {
            	if(isNull($rootScope.university.code.codeName)){
					commonService.alert("코드명을 입력해주세요.", function() {
						$("#codeName").focus();
					});
            		return;
				}
            	
            	commonService.confirm("저장 하시겠습니까?", function() {
            		var param = {
            				codeName : $rootScope.university.code.codeName,
            				codeDesc : $rootScope.university.code.codeDesc,
            				useYn : $rootScope.university.code.useYn,
            				userSeq : $rootScope.userSession.userSeq,
            				code : $rootScope.university.code.code,
            				codeIndex : $rootScope.university.code.codeIndex,
            				parentCode : $rootScope.university.code.parentCode
                	}
            		codeService.saveCodeInfo(param, function(data) {
            			commonService.alert("저장 완료.", function() {
            				if($('#codeRoot').hasClass('active')){
                        		location.reload();
                        	}
            				else {
            					$scope.nodeClick($rootScope.university.code.parentCode);
            					$scope.nodeClick($rootScope.university.code.parentCode);
            					$scope.nodeClick($rootScope.university.code.code);
            				}
            			});
            			
            		});
            	});
            }
            
            /**
             * 순서변경
             */
            $scope.changeCodeIndex = function(direction) {
            	var selectedNodeId = $('li.active').attr('id');

            	if(selectedNodeId === undefined) {
            		commonService.alert("순서 변경할 메뉴를 선택하세요.");
            		return;
            	}
            	
            	if(direction === 'up') {
            		$rootScope.university.code.codeIndex += 1;
            		if($rootScope.university.code.codeIndex > $rootScope.university.code.indexCount) {
            			$rootScope.university.code.codeIndex = 1;
            		}
            		var prevNodeId = $('li.active').prev().attr('id');
            		
            		if(prevNodeId === undefined) {
            			commonService.alert("더이상 위로 이동 할 수 없습니다.");
            			return;
            		}
            		
            		var prevCode = prevNodeId.split('_')[1];
            		
            		var param = {
            				codeA : $rootScope.university.code.code,
            				codeB : prevCode,
            		}
            		codeService.changeCodeIndex(param, function(data) {
            			if(prevNodeId !== undefined) {
            				$('li.active').insertBefore($('li.active').prev());
            			}
            			else {
            				return;
            			}
            		});
            	}
            	
            	if(direction === 'down') {
            		$rootScope.university.code.codeIndex -= 1;
            		if ($rootScope.university.code.codeIndex <= -1) {
            			$rootScope.university.code.codeIndex = $rootScope.university.code.indexCount;
            		}
            		var nextNodeId = $('li.active').next().attr('id');
            		
            		if(nextNodeId === undefined) {
            			commonService.alert("더이상 아래로 이동 할 수 없습니다.");
            			return;
            		}
            		
            		var nextCode = nextNodeId.split('_')[1];
            		
            		var param = {
            				codeA : $rootScope.university.code.code,
            				codeB : nextCode,
            		}
            		
            		codeService.changeCodeIndex(param, function(data) {
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
























