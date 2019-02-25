((function() {
    angular.module('appModule')
        .service('exchangeConfirmOutService', function($http, $httpParamSerializer, Const, commonService) {

        	/**
             * 학점교류신청 유저 목록 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getApplyExchangeUserList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'exchange/getApplyExchangeUserList.ajax',
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
             * 학점교류 신청 상태 변경
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.changeApplyStatus = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'exchange/changeApplyStatus.ajax',
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