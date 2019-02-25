((function() {
    angular.module('appModule')
        .service('subjectService', function($http, $httpParamSerializer, Const, commonService) {

        	/**
             * 학기 과목 목록 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getSubjectList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'subject/getSubjectList.ajax',
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
             * 학기 과목 정보 저장
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.saveSubjectInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'subject/saveSubjectInfo.ajax',
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
             * 학기 과목 정보 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.getSubjectInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'subject/getSubjectInfo.ajax',
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
             * 학기 과목 정보 삭제
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.deleteSubjectInfo = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'subject/deleteSubjectInfo.ajax',
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