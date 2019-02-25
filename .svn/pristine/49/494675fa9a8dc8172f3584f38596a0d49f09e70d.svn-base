((function() {
    angular.module('appModule')
        .service('universityService', function($http, $httpParamSerializer, Const, commonService) {

            /**
             * 대학교 정보를 저장한다.
             *
             * @param data 대학 정보 데이터
             * @param callBack Call Back Function
             */
            this.saveUniversityInfo = function (data, callBack) {
            	$http({
                    method: 'POST',
                    url: Const.contextPath + 'university/submit.ajax',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data :$httpParamSerializer(data)
                }).then(function success(response) {
                    var rsCd = response.data.resultCode;
                    if (rsCd === Const.successResultCode) {
                        if (callBack) {
                            callBack();
                        }
                    } else {
                        commonService.serverError(response.data);
                    }
                }, function error(response) {
                    commonService.etcError(response);
                })
            };

            /**
             * 대학교 정보를 조회 한다.
             *
             * @param code 대학교 코드
             * @param callBack Call Back Function
             */
            this.getUniversityInfo = function (code, callBack) {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'university/info/' + code + '.ajax'
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
             * 참여중인 MOU 협의회 목록
             *
             * @param univCode 대학교 코드
             * @param callBack Call Back Function
             */
            this.getAttachedGroupList = function (univCode, callBack) {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'university/mou/getAttachedGroupList.ajax',
                    params: {univCode: univCode}
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
             * 참여중이 아닌 MOU 협의회 목록
             *
             * @param univCode 대학교 코드
             * @param callBack Call Back Function
             */
            this.getUnAttachedGroupList = function (univCode, callBack) {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'university/mou/getUnAttachedGroupList.ajax',
                    params: {univCode: univCode}
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
             * 참여할 MOU 협의회 추가
             *
             * @param param 대학 코드와 협의회 코드 목록 파라미터
             * @param callBack Call Back Function
             */
            this.addMouGroup = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'university/mou/addMouGroup.ajax',
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

            /**
             * 참여중인 MOU 협의회 제거
             *
             * @param param 대학 코드와 협의회 코드 목록 파라미터
             * @param callBack Call Back Function
             */
            this.removeMouGroup = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'university/mou/removeMouGroup.ajax',
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

            /**
             * MOU 개별 협약 대학 리스트
             *
             * @param univCode 대학 코드
             * @param callBack Call Back Function
             */
            this.getIndividualMouList = function (univCode, callBack) {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'university/mou/getIndividualMouList.ajax',
                    params: {univCode: univCode}
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
             * MOU 설정이 되어 있지 않은 대학 목록 조회
             *
             * @param areaCode 지역 코드
             * @param univCode 조회 대상 대학 코드
             * @param callBack Call Back Function
             */
            this.getUnivListWithoutMou = function (areaCode, univCode, callBack) {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'university/mou/getUnivListWithoutMou.ajax',
                    params: {areaCode: areaCode, univCode: univCode}
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
             * 개별 협약 대학 추가
             *
             * @param param 대학 코드 및 MOU로 설정할 대학 코드 목록
             * @param callBack Call Back Function
             */
            this.addIndividualMouUniv = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'university/mou/addIndividualMouUniv.ajax',
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

            /**
             * 개별 협약 대학 삭제
             *
             * @param param 대학 코드 및 삭제할 MOU 대학 코드 목록
             * @param callBack Call Back Function
             */
            this.removeIndividualMouUniv = function (param, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'university/mou/removeIndividualMouUniv.ajax',
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

            /**
             * 개별 및 협의회에 속한 MOU 대학 목록 조회
             *
             * @param univCode 대학 코드
             * @param isUnderLine 지역 구분 라인 삽입 여부
             * @param callBack Call Back Function
             */
            this.getMouUnivList = function (univCode, isUnderLine, callBack) {
                $http({
                    method: 'GET',
                    url: Const.contextPath + 'university/mou/getMouUnivList.ajax',
                    params: {univCode: univCode, isUnderLine: isUnderLine}
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
             * MOU 대학의 교류 신청 인원 제한 설정
             *
             * @param data json 으로 변환할 데이터
             * @param callBack Call Back Function
             */
            this.saveMouApplyLimit = function (data, callBack) {
                $http({
                    method: 'POST',
                    url: Const.contextPath + 'university/mou/saveMouApplyLimit.ajax',
                    data: JSON.stringify(data)
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