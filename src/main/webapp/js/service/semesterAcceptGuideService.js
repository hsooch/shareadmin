((function() {
    angular.module('appModule')
        .service('semesterAcceptGuideService', function($http, $httpParamSerializer, Const, commonService) {

        	/**
             * 승인 안내문 목록 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getSemesterListWithAcceptGuide = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'exchange/getApplyExchangeWithAGSendList.ajax',
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
             * 승인 안내문 정보 저장
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.saveAcceptGuideInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/saveAcceptGuideInfo.ajax',
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
             * 승인 안내문 정보 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getAcceptGuideInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/getAcceptGuideInfo.ajax',
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
             * 승인 안내문 정보 삭제
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.deleteAcceptGuideInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/deleteAcceptGuideInfo.ajax',
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
            
            this.sendAcceptGuide = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/sendAcceptGuide.ajax',
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