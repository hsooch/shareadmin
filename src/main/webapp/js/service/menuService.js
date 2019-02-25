((function() {
    angular.module('appModule')
        .service('menuService', function($http, $httpParamSerializer, commonService, Const) {
//            var thisObj = this;

            
            /**
        	 * 메뉴목록 조회
             *
        	 * @param parentSeq 부모시퀀스 Integer
             * @param callBack 처리 후 결과 데이터를 전달할 Call Back Function
        	 */
        	this.getMenuList = function (parentSeq, callBack) {
        		$http({
        			method: 'GET',
        			url: Const.contextPath + 'menu/' + parentSeq + '/getMenuList.ajax'
        		}).then(function success(response) {
        			var rsCd = response.data.resultCode;
        			if (rsCd === Const.successResultCode) {
        				if (callBack) {
        					callBack(response.data);
        				}
        			} else {
        				commonService.serverError(response.data);
        			}
        		}, function error(response) {
        			commonService.etcError(response);
        		});
        	};
            
            /**
             * 메뉴 정보 조회
             * 
             * @param seq 선택한 메뉴의 시퀀스
             * @param callBack 처리 후 결과 데이터를 전달할 Call Back Function
             */
            this.getMenuInfo = function(seq, callBack) {
            	$http({
                    method: 'GET',
                    url: Const.contextPath + 'menu/info/' + seq + '.ajax'
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack(response.data);
                        }
                    } else {
                        commonService.serverError(response.data);
                    }
                }, function error(response) {
                    commonService.etcError(response);
                });
            }
            
            /**
             * 메뉴 정보 저장
             * 
             * @param 메뉴 정보
             * @param callBack 처리 후 결과 데이터를 전달할 Call Back Function 
             */
            this.saveMenuInfo = function(param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'menu/saveMenuInfo.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            		dataType : 'json',
            		data :$httpParamSerializer(param)
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack(response.data);
                        }
                    } else {
                        commonService.serverError(response.data);
                    }
                }, function error(response) {
                    commonService.etcError(response);
                });
            }
            
            /**
             * 메뉴 삭제 (숨김)
             * 
             * @param 메뉴 시퀀스
             * @param callBack 처리 후 결과 데이터를 전달할 Call Back Function
             */
            this.deleteMenuInfo = function (param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'menu/deleteMenuInfo.ajax',
            		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            		dataType : 'json',
            		data :$httpParamSerializer(param)
            	}).then(function success(response) {
            		var rsCd = response.data.resultCode;
            		if (rsCd === Const.successResultCode) {
            			if (callBack) {
            				callBack(response.data);
            			}
            		} else {
            			commonService.serverError(response.data);
            		}
            	}, function error(response) {
            		commonService.etcError(response);
            	});
            };
            
            /**
             * 메뉴 순서 변경
             * 
             * @param 
             * @param 콜백 함수
             */
            this.changeMenuIndex = function (param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'menu/changeMenuIndex.ajax',
            		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            		dataType : 'json',
            		data :$httpParamSerializer(param)
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack(response.data);
                        }
                    } else {
                        commonService.serverError(response.data);
                    }
                }, function error(response) {
                    commonService.etcError(response);
                });
            }
            
            this.getTopMenuIndex = function (callBack) {
            	$http({
            		method: 'GET',
            		url: Const.contextPath + 'menu/getTopMenuIndex.ajax',
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack(response.data);
                        }
                    } else {
                        commonService.serverError(response.data);
                    }
                }, function error(response) {
                    commonService.etcError(response);
                });
            }
            
        });
})());