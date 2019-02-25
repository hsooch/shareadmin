((function() {
    angular.module('appModule')
        .service('semesterService', function($http, $httpParamSerializer, Const, commonService) {

            /**
             * 학기 목록 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getSemesterList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/getSemesterList.ajax',
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
             * 학기 정보 저장
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.saveSemesterInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/saveSemesterInfo.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    dataType : 'json',
                    data :$httpParamSerializer(param)
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
             * 학기 정보 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getSemesterInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/getSemesterInfo.ajax',
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
             * 학기 정보 삭제
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.deleteSemesterInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'semester/deleteSemesterInfo.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    dataType : 'json',
                    data :$httpParamSerializer(param)
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
        })
})());