((function() {
    angular.module('appModule')
        .service('commonService', function($http, $httpParamSerializer, Const, ngDialog, $rootScope) {
            var thisObj = this;

        	/**
        	 * 코드목록 조회
             *
        	 * @param parentCode 부모코드 문자열
             * @param callBack 처리 후 결과 데이터를 전달할 Call Back Function
        	 */
            this.getCodeList = function (parentCode, callBack) {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'code/' + parentCode + '/selectCodeList.ajax',
                    async:false
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack(response.data);
                        }
                    } else {
                        thisObj.serverError(response.data);
                    }
                }, function error(response) {
                    thisObj.etcError(response);
                });
            };

            /**
             * 코드목록 조회
             */
            this.setUserSessionInRootScope = function () {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'commons/session.ajax'
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (response.data.session) {
                            $rootScope.userSession = response.data.session;
                        }
                    } else {
                        thisObj.serverError(response.data);
                    }
                }, function error(response) {
                    thisObj.etcError(response);
                });
            };

            /**
             * 서버에서 정상 적으로 결과코드를 받지 못하고 오류가 발생 했을 때 메세지 출력
             *
             * @param response HTTP Response
             */
            this.etcError = function(response) {
                $rootScope.httpLoadingCnt--;
                ngDialog.open({
                    template: Const.contextPath + 'html/common/etcError.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 356,
                    controller: function() {
                        console.error('ETC Error', response);
                    }
                });
            };

            /**
             * 서버에서 의도치 않은 결과 코드가 발생했을 때 메세지 출력
             *
             * @param data 결과 데이터
             */
            this.serverError = function(data) {
                if (data.resultCode === 'LE04') {
                    location.href = Const.contextPath + 'login/login.do';
                } else {
                    ngDialog.open({
                        template: Const.contextPath + 'html/common/serverError.html',
                        showClose: false,
                        closeByDocument: false,
                        width: 600,
                        controller: function ($scope) {
                            $scope.resultCode = data.resultCode;
                            $scope.logKey = data.logKey;
                        }
                    });
                }
            };
            
            /**
             * 서버에서 의도치 않은 결과 코드가 발생했을 때 메세지 출력 (로그인, 회원가입화면 용)
             *
             * @param data 결과 데이터
             */
            this.serverErrorForLogin = function(data) {
                if (data.resultCode === 'LE04') {
                    location.href = Const.contextPath + 'login/login.do';
                } else {
                    ngDialog.open({
                        template: Const.contextPath + 'html/common/serverErrorForLogin.html',
                        showClose: false,
                        closeByDocument: false,
                        width: 600,
                        controller: function ($scope) {
                            $scope.resultCode = data.resultCode;
                            $scope.logKey = data.logKey;
                            $scope.submitClick = function() {
                                $scope.closeThisDialog();
                            };
                            $rootScope.$on('ngDialog.opened', function (e, $dialog) {
                                $("div.modal.fade").addClass("in");
                                //$("div.modal.fade").find("div.btn-area").focus();
                            });
                        }
                    });
                }
            };

            /**
             * Alert 레이어 팝업 호출
             *
             * @param message 출력할 메세지
             * @param afterFunc 확인 이 후 실행할 Function
             */
            this.alert = function (message, afterFunc) {
                ngDialog.open({
                    template: Const.contextPath + 'html/common/alertMessage.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 500,
                    controller: function($scope) {
                        $scope.message = message;

                        $scope.submitClick = function() {
                            if (afterFunc && afterFunc instanceof Function) {
                                afterFunc();
                            }
                            $scope.closeThisDialog();
                        };
                    }
                });
            };
            
            /**
             * Alert 레이어 팝업 호출 (로그인 페이지용)
             *
             * @param message 출력할 메세지
             * @param afterFunc 확인 이 후 실행할 Function
             */
            this.alertForLogin = function (message, afterFunc) {
                ngDialog.open({
                    template: Const.contextPath + 'html/common/alertMessageForLogin.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 500,
                    controller: function($scope) {
                        $scope.message = message;
                        $scope.submitClick = function() {
                            if (afterFunc && afterFunc instanceof Function) {
                                afterFunc();
                            }
                            $scope.closeThisDialog();
                        };
                        
                        $rootScope.$on('ngDialog.opened', function (e, $dialog) {
                            $("div.modal.fade").addClass("in");
                            //$("div.modal.fade").find("div.btn-area").focus();
                        });
                    }
                });
            };

            /**
             * Confirm 레이어 팝업 호출
             *
             * @param message 출력할 메세지
             * @param afterFunc 확인 이 후 실행할 Function
             */
            this.confirm = function (message, afterFunc, closeFunc) {
                ngDialog.open({
                    template: Const.contextPath + 'html/common/confirmMessage.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 356,
                    controller: function($scope) {
                        $scope.message = message;
                        $("div.modal.fade").addClass("in");
                        $scope.submitClick = function() {
                            if (afterFunc && afterFunc instanceof Function) {
                                afterFunc();
                            }
                            $scope.closeThisDialog();
                        };
                        
                        $scope.closeClick = function() {
                        	if (closeFunc && closeFunc instanceof Function) {
                        		closeFunc();
                            }
                        	$scope.closeThisDialog();
                        };
                    }
                });
            };
            
            /**
             * Confirm 레이어 팝업 호출(로그인 페이지용)
             *
             * @param message 출력할 메세지
             * @param afterFunc 확인 이 후 실행할 Function
             */
            this.confirmForLogin = function (message, afterFunc) {
                ngDialog.open({
                    template: Const.contextPath + 'html/common/confirmMessageForLogin.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 356,
                    controller: function($scope) {
                        $scope.message = message;

                        $scope.submitClick = function() {
                            if (afterFunc && afterFunc instanceof Function) {
                                afterFunc();
                            }
                            $scope.closeThisDialog();
                        };
                    }
                });
            };
            
            /**
             * EPKI 초기화
             * @param output String
             * @param callBack Call Back Function
             */
            this.initEpki = function (callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'cert/initEpki.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    dataType : 'json'
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack(response.data);
                        }
                    } else {
                        thisObj.serverErrorForLogin(response.data);
                    }
                }, function error(response) {
                    thisObj.etcError(response);
                })
            };
            
            /**
             * EPKI 세션요청 결과를 세션에 세팅
             * @param output String
             * @param callBack Call Back Function
             */
            this.setRequestSessionEpki = function (output, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'cert/setRequestSessionEpki.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    dataType : 'json',
                    data :$httpParamSerializer({secureChannelRequest:output})
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack(response.data);
                        }
                    } else {
                        thisObj.serverErrorForLogin(response.data);
                    }
                }, function error(response) {
                    thisObj.etcError(response);
                })
            };
            
            
            /**
             * EPKI 인증 결과값 복호화
             * @param output String
             * @param callBack Call Back Function
             */
            this.decodeEpkiCertificationResult = function (output, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'cert/decodeEpkiCertificationResult.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    dataType : 'json',
                    data :$httpParamSerializer({loginRequest:output})
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack(response.data);
                        }
                    } else {
                        thisObj.serverErrorForLogin(response.data);
                    }
                }, function error(response) {
                    thisObj.etcError(response);
                })
            };
            
            /**
             * code 로 codeName 가져오기
             * 
             */
            this.getCodeName = function (code, callBack) {
            	$http({
                    method: 'GET',
                    url: Const.contextPath + 'code/getCodeName/' + code + '.ajax'
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack(response.data);
                        }
                    } else {
                        thisObj.serverError(response.data);
                    }
                }, function error(response) {
                    thisObj.etcError(response);
                })
            }
            
        })
})());