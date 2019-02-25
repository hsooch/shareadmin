((function() {
    angular.module('appModule')
        .service('smsSendManagementService', function($http, $httpParamSerializer, Const, commonService) {

            /**
             * 서버에 사진 업로드
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.uploadImage = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'message/uploadImage.ajax',
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
                    url: Const.contextPath + 'message/updateUserDetail.ajax',
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
                    url: Const.contextPath + 'emailSendManagement'+ajaxUrl,
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
             * 발신자 목록 불러오기
             */
            this.getSenderList = function(param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'message/getSenderList.ajax',
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
            
            /**
             * 발신자 목록 불러오기
             */
            this.getCheckedSenderList = function(param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'message/getCheckedSenderList.ajax',
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
            
            /**
             * 문자 전송
             */
            this.sendSms = function(param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'message/sendSms.ajax',
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
            
            /**
             * 발송이력 목록
             */
            this.getSmsResultList = function(param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'message/getSmsResultList.ajax',
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
            
            /**
             * 발송 내용
             * 
             */
            this.getMessageInfo = function(param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'message/getMessageInfo.ajax',
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
            
            /**
             * 발송결과 상세
             */
            this.getSendResultInfo = function(param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'message/getSendResultInfo.ajax',
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
            
        });
})());