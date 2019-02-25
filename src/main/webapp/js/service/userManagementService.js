((function() {
    angular.module('appModule')
        .service('userManagementService', function($http, $httpParamSerializer, Const, commonService) {

            /**
             * 회원관리 사용자 목록 조회
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.selectUserList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'userManagement/selectUserList.ajax',
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
             * 회원 상태 수정
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.updateUserDetail = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'userManagement/updateUserDetail.ajax',
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
             * 회원 가입/탈퇴 신청 승인
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.updateUserConfirm = function (param, callBack) {
            	if(isNull(param.searchPageType)) return;
            	
            	var ajaxUrl = '';
            	if(param.searchPageType == "account") ajaxUrl = "/updateUserAccountConfirm.ajax";
            	else if(param.searchPageType == "withdraw") ajaxUrl = "/updateUserWithdrawConfirm.ajax";
            	else return;
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'userManagement'+ajaxUrl,
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