((function() {
    angular.module('appModule')
        .service('authorityService', function($http, $httpParamSerializer, Const, commonService) {

            /**
             * 매니저 유형 정보가 포함된 목록을 조회한다.
             *
             * @param requestParam 검색 파라미터
             * @param callBack Call Back Function
             */
            this.getManagerList = function (requestParam, callBack) {
                console.log('request param => ', requestParam);
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'authority/managerList.ajax',
                    params: requestParam
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
             * 담당자 유형 정보 수정
             * @param parameter Object
             * @param callBack Call Back Function
             */
            this.saveAuthorityType = function (requestParam, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'authority/saveAuthorityType.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    dataType : 'json',
                    data :$httpParamSerializer(requestParam)
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
            
            // -- authority.group
            
            /**
             * 그룹 권한 목록 조회
             */
            this.getGroupList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'authority/getGroupList.ajax',
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
             * 그룹 권한 정보를 조회 한다.
             *
             * @param param 그룹 시퀀스
             * @param callBack Call Back Function
             */
            this.getGroupInfo = function (param, callBack) {
                $http({
                	method: 'POST',
                    url: Const.contextPath + 'authority/getGroupInfo.ajax',
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
             * 메뉴 그룹권한
             * 
             */
            this.getMenuAuthForGroup = function(requestParam, callBack) {
            	 $http({
                     method: 'POST',
                     url: Const.contextPath + 'authority/getMenuAuthForGroup.ajax',
                     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                     dataType : 'json',
                     data :$httpParamSerializer(requestParam)
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
            
            /**
             * 저장
             */
            this.saveGroupInfo = function(param, callBack) {
            	 $http({
                     method: 'POST',
                     url: Const.contextPath + 'authority/saveGroupInfo.ajax',
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
            
            /**
             * 삭제
             */
            this.deleteGroup = function(param, callBack) {
            	 $http({
                     method: 'POST',
                     url: Const.contextPath + 'authority/deleteGroup.ajax',
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
            
            // /// -- authority.group
         
            // -- authority.personal
            /**
             * 개인별 보유권한그룹 리스트
             */
            this.getMenuAuthForUser = function(param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'authority/getMenuAuthForUser.ajax',
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
            
            this.getUserMenuInfo = function(param, callBack) {
                $http({
                	method: 'POST',
                    url: Const.contextPath + 'authority/getUserMenuInfo.ajax',
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
        
            this.getUnivManagerList = function(param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'authority/getUnivManagerList.ajax',
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
            
            this.getUnivMgrInfo = function(param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'authority/getUnivMgrInfo.ajax',
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
            
            this.getUnAttachedGroupList = function (param, callBack) {
            	$http({
            		method: 'POST',
            		url: Const.contextPath + 'authority/getUnAttachedGroupList.ajax',
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
            
            this.addGroup = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'authority/addGroup.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
            
            this.getAttachedGroupList = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'authority/getAttachedGroupList.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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

            this.removeGroup = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'authority/removeGroup.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
            
            this.saveMenuAuthForUser = function(param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'authority/saveMenuAuthForUser.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
            
            this.deleteMenuAuthForUser = function(param, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'authority/deleteMenuAuthForUser.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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

            // /// -- authority.personal
            
        });
})());