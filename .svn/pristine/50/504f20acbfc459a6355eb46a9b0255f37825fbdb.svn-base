((function() {
    angular.module('appModule')
        .service('userService', function($http, $httpParamSerializer, Const, commonService) {

        	/**
             * 종류별 약관 목록 조회.
             * @param callBack Call Back Function
             */
            this.getTerms = function (type, callBack) {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'user/regist/terms/' + type + '.ajax'
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
             * 조건에 따른 사용자 수
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getUserCount = function (param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'user/getUserCount.ajax',
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
             * 사용자 메뉴 정보를 조회 한다.
             * @param callBack Call Back Function
             */
            this.getMenuList = function(callBack) {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'main/user/menu.ajax'
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
             * 이메일인증 요청.
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.sendEmailAuthReq = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'cert/emailCertificationReq.ajax',
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
             * 이메일인증 확인.
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.checkEmailAuth = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'cert/emailCertificationCheck.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    dataType : 'json',
                    data :$httpParamSerializer(param),
                    noLoading : true,
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
             * 회원가입 신청
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.insertUserAccount = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'user/insertUserAccount.ajax',
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
             * 비밀번호 변경
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.updateUserPwd = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'user/updateUserPwd.ajax',
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
             * 사용자 정보 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.selectUserId = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'user/selectUserId.ajax',
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
             * 회원탈퇴 신청
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.withdrawMember = function (param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'user/withdrawMember.ajax',
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
             * 유저 정보를 조회 한다.
             *
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getUserInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'user/getUserInfo.ajax',
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
             * 유저 정보를 수정한다
             * 
             * @param parameter object
             * @param callBack Call Back Function
             */
            this.updateUserInfo = function (param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'user/updateUserInfo.ajax',
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
            
            this.selectUserList = function(param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'user/selectUserList.ajax',
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
            
        });
})());