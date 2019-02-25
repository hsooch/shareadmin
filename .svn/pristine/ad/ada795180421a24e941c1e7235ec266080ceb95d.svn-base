((function() {
    angular.module('appModule')
        .service('exchangeResultService', function($http, $httpParamSerializer, Const, commonService) {

        	/**
             * 수강결과 등록 목록 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getExchangeResultList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'exchangeResult/getExchangeResultList.ajax',
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
             * 수강결과 등록 정보 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getExchangeResultInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'exchangeResult/getExchangeResultInfo.ajax',
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
             * 성적 정보 저장
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.saveScore = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'exchangeResult/saveScore.ajax',
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
             * 성적 등급 정보가 포함된 결과 목록 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getResultScoreList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'exchangeResult/getResultScoreList.ajax',
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
             * 성적 등급 전환 목록 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getGradeTranceList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'exchangeResult/getGradeTranceList.ajax',
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
             * 성적 등급 전환 정보 저장
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.saveGradeTranceInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'exchangeResult/saveGradeTranceInfo.ajax',
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
             * 학생별 이력 목록(OUT) 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getStudentOutList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'exchangeResult/getStudentOutList.ajax',
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
             * 학생별 이력 목록(IN) 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getStudentInList = function (param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'exchangeResult/getStudentInList.ajax',
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
            
        })
})());