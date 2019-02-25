((function() {
    angular.module('appModule')
        .service('loginService', function($http, $httpParamSerializer, Const, commonService, ngDialog) {

            /**
             * 로그인 프로그래스
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.loginProgress = function (param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'login/loginProgress.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    dataType : 'json',
                    data :$httpParamSerializer(param),
                    async : false
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    //if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack(response.data);
                        }
                    //} else {
                        //commonService.serverError(response.data);
                    //}
                }, function error(response) {
                    commonService.etcError(response);
                })
            };
            
            /**
             * 휴면계정 복원
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.updateUserAccountWakeUp = function (param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'login/updateUserAccountWakeUp.ajax',
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
             * 임시비밀번호 이메일발송
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.sendEmailUserPwdTmpr = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'login/sendMailUserPwdTmpr.ajax',
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