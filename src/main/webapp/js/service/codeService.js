((function() {
    angular.module('appModule')
        .service('codeService', function($http, $httpParamSerializer, commonService, Const) {
            var thisObj = this;

        	/**
        	 * 지역과 대학교 코드목록 조회 (트리구조로 데이터 나옴)
             *
        	 * @param rootCode 대학교 목록의 최상위 코드
             * @param callBack 처리 후 결과 데이터를 전달할 Call Back Function
        	 */
            this.getUniversityCodeList = function (rootCode, callBack) {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'code/university/list/' + rootCode + '.ajax'
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
             * 코드 정보 조회
             * 
             * @param code 클릭한 코드
             * @param callBack 처리 후 결과 데이터를 전달할 Call Back Function
             */
            this.getCodeInfo = function(code, callBack) {
            	$http({
                    method: 'GET',
                    url: Const.contextPath + 'code/university/info/' + code + '.ajax'
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
             * 코드 정보 저장
             * 
             * @param 코드 정보
             * @param callBack 처리 후 결과 데이터를 전달할 Call Back Function 
             */
            this.saveCodeInfo = function(param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'code/university/saveCodeInfo.ajax',
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
             * 코드명 조회
             * 
             * @param 코드명
             * @param callBack 처리 후 결과 데이터를 전달할 Call Back Function
             */
            this.searchCodeName = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'code/university/searchCodeName.ajax',
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
                })
            };
            
            /**
             * 코드 삭제 (숨김)
             * 
             * @param 코드
             * @param callBack 처리 후 결과 데이터를 전달할 Call Back Function
             */
            this.removeCode = function (param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'code/university/removeCode.ajax',
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
            	})
            };
            
            /**
             * code 순서 변경
             * 
             * @param 
             * @param 콜백 함수
             */
            this.changeCodeIndex = function (param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'code/changeCodeIndex.ajax',
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
            
        })
})());