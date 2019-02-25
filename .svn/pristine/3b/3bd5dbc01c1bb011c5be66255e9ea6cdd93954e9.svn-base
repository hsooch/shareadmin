((function() {
    angular.module('appModule')
        .service('semesterGuideService', function($http, $httpParamSerializer, Const, commonService) {

        	/**
             * 학기 접수기간/안내문 목록 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getSemesterListWithGuide = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/getSemesterListWithGuide.ajax',
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
             * 학기 접수기간/안내문 정보 저장
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.saveGuideInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/saveGuideInfo.ajax',
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
             * 학기 접수기간/안내문 정보 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getGuideInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/getGuideInfo.ajax',
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
             * 학기 접수기간/안내문 정보 삭제
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.deleteGuideInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/deleteGuideInfo.ajax',
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