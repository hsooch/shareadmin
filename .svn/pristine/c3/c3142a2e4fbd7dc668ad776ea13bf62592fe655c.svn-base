((function() {
    angular.module('appModule')
        .service('seminarService', function($http, $httpParamSerializer, commonService, Const) {
            
        	//////////////////////// 세미나 등록/조회
        	
        	/**
             * 세미나관리 강좌 목록 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getSeminarList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'seminar/getSeminarList.ajax',
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
             * 세미나 정보를 저장한다.
             *
             * @param data 세미나 정보 데이터
             * @param callBack Call Back Function
             */
            this.saveSeminarInfo = function (data, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'seminar/submit.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data :$httpParamSerializer(data)
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack();
                        }
                    } else {
                        commonService.serverError(response.data);
                    }
                }, function error(response) {
                    commonService.etcError(response);
                })
            };

            /**
             * 세미나 정보를 조회 한다.
             *
             * @param seq 세미나 시퀀스
             * @param callBack Call Back Function
             */
            this.getSeminarInfo = function (param, callBack) {
                $http({
                	method: 'POST',
                    url: Const.contextPath + 'seminar/getSeminarInfo.ajax',
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
             * 세미나 정보 삭제
             */
            this.deleteSeminarInfo = function (param, callBack) {
                $http({
                	method: 'POST',
                    url: Const.contextPath + 'seminar/deleteSeminarInfo.ajax',
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
            
            ////////////////////////세미나 등록/조회
            
            ////////////////////////세미나 신청
            /**
             * 세미나 신청 목록
             */
            this.getApplyUserList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'seminar/getApplyUserList.ajax',
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
             * 세미나 신청 승인
             */
            this.changeApplyStatus = function(param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'seminar/changeApplyStatus.ajax',
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
            }
            
            
            ////////////////////////세미나 신청

            this.getAttendList = function(param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'seminar/getAttendUserList.ajax',
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
            }
            
            ////////////// 세미나 출석
            /**
             * 세미나 출석 체크.
             *
             * @param data 세미나 정보 데이터
             * @param callBack Call Back Function
             */
            this.checkAttend = function (data, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'seminar/checkAttend.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data :$httpParamSerializer(data)
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack();
                        }
                    } else {
                        commonService.serverError(response.data);
                    }
                }, function error(response) {
                    commonService.etcError(response);
                })
            };
            
            this.unCheckAttend = function (data, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'seminar/unCheckAttend.ajax',
            		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            		data :$httpParamSerializer(data)
            	}).then(function success(response) {
            		var rsCd = response.data.resultCode;
            		if (rsCd === Const.successResultCode) {
            			if (callBack) {
            				callBack();
            			}
            		} else {
            			commonService.serverError(response.data);
            		}
            	}, function error(response) {
            		commonService.etcError(response);
            	})
            };
            
            /**
             * 확인증 삭제
             */
            this.removeCert = function(data, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'seminar/removeCert.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data :$httpParamSerializer(data)
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack();
                        }
                    } else {
                        commonService.serverError(response.data);
                    }
                }, function error(response) {
                    commonService.etcError(response);
                })
            }
            
        });
})());