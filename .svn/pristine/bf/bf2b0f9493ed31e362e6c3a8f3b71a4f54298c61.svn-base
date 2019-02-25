((function() {
    angular.module('appModule')
        .controller('mouUniversityCtrl', function($scope, $rootScope, codeService, Const, commonService, universityService, ngDialog) {

            /**
             * 지역과 대학교 코드 목록 한번에 가져오기
             */
            codeService.getUniversityCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
                $rootScope.university.mou.universityList = data.universityList;
            });

            /**
             * 참여 협의회 목록 삭제 클릭 이벤트
             */
            $scope.removeGroup = function() {
                var typeCodeList = [];
                $rootScope.university.mou.attachedGroupList.forEach(function(group) {
                    if (group.checked) {
                        typeCodeList.push(group.mouType);
                    }
                });

                if (typeCodeList.length) {
                    var params = {
                        univCode: $rootScope.university.mou.nowUniversityCode,
                        mouTypeList: typeCodeList
                    };

                    universityService.removeMouGroup(params, function() {
                        setAttachedGroupList();
                        setMouUnivList();
                    });
                }
            };

            /**
             * 개별 협약대학 목록 삭제 클릭 이벤트
             */
            $scope.removeMouUniv = function() {
                var mouUnivList = [];
                $rootScope.university.mou.individualMouList.forEach(function(univ) {
                    if (univ.checked) {
                        mouUnivList.push(univ.mouUnivCode);
                    }
                });

                if (mouUnivList.length) {
                    var params = {
                        univCode: $rootScope.university.mou.nowUniversityCode,
                        mouUnivList: mouUnivList
                    };
                    universityService.removeIndividualMouUniv(params, function() {
                        setIndividualMouList();
                        setMouUnivList();
                    });
                }
            };

            /**
             * 지역명을 클릭했을 때 이벤트
             *
             * @param obj 지역 코드 오브젝트
             */
            $scope.locationClick = function(obj) {
                $rootScope.university.mou.nowUniversityParentCode = obj.code;
            };

            /**
             * 대학교명을 클릭했을 때 이벤트
             *
             * @param obj 대학교 코드 오브젝트
             * @param parent 선택한 대학교 상위 지역 코드 오브젝트
             * **/
            $scope.universityClick = function(obj, parent) {
                $rootScope.university.mou.nowUniversityCode = obj.code;
                $rootScope.university.mou.nowUniversityParentCodeName = parent.codeName;

                setAttachedGroupList();
                setIndividualMouList();
                setMouUnivList();
            };

            /**
             * 참여중이 MOU 협의회 목록 설정
             */
            var setAttachedGroupList = $scope.setAttachedGroupList = function() {
                universityService.getAttachedGroupList($rootScope.university.mou.nowUniversityCode, function(data) {
                    if (data.groupList) {
                        $rootScope.university.mou.attachedGroupList = data.groupList;
                    } else {
                        $rootScope.university.mou.attachedGroupList = [];
                    }
                });
            };

            /**
             * 개별 MOU 대학 목록 설정
             */
            var setIndividualMouList = $scope.setIndividualMouList = function() {
                universityService.getIndividualMouList($rootScope.university.mou.nowUniversityCode, function(data) {
                    if (data.individualMouList) {
                        $rootScope.university.mou.individualMouList = data.individualMouList;
                    } else {
                        $rootScope.university.mou.individualMouList = [];
                    }
                });
            };

            /**
             * 협의회 참여대학 및 개별협약 대학교 목록 설정
             */
            var setMouUnivList = $scope.setMouUnivList = function() {
                universityService.getMouUnivList($rootScope.university.mou.nowUniversityCode, 'true', function(data) {
                    if (data.mouList) {
                        $rootScope.university.mou.mouList = data.mouList;
                    } else {
                        $rootScope.university.mou.mouList = [];
                    }
                });
            };

            /**
             * 협의회 추가 버튼 클릭시 이벤트
             */
            $scope.addGroupClick = function() {
                ngDialog.open({
                    template: Const.contextPath + 'html/university/unAttachedGroupList.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 356,
                    controller: function($scope) {
                        universityService.getUnAttachedGroupList($rootScope.university.mou.nowUniversityCode, function(data) {
                            if (data.groupCodeList) {
                                $rootScope.university.mou.unAttachedGroupList = data.groupCodeList;
                            } else {
                                $rootScope.university.mou.unAttachedGroupList = [];
                            }
                        });

                        /**
                         * 협의회 추가 저장
                         */
                        $scope.saveGroup = function() {
                            var typeCodeList = [];
                            $rootScope.university.mou.unAttachedGroupList.forEach(function(data) {
                                if (data.checked) {
                                    typeCodeList.push(data.code);
                                }
                            });

                            if (typeCodeList.length) {
                                var params = {
                                    univCode: $rootScope.university.mou.nowUniversityCode,
                                    mouTypeList: typeCodeList
                                };

                                universityService.addMouGroup(params, function () {
                                    setAttachedGroupList();
                                    setMouUnivList();
                                    commonService.alert("선택한 참여 협의회가 추가되었습니다.", function() {
                                        $scope.closeThisDialog();
                                    });
                                });
                            } else {
                                commonService.alert("참여 협의회를 선택해주세요.");
                            }
                        };
                    }
                });
            };

            /**
             * 개별 협약대학 목록 추가 버튼 클릭 이벤트
             */
            $scope.addIndividualMouClick = function() {
                ngDialog.open({
                    template: Const.contextPath + 'html/university/universitySelect.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 356,
                    controller: function($scope) {

                        commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
                            $scope.areaCodeList = data.codeList;
                        });

                        $scope.$watch('areaCode', function(newVal) {
                            if (newVal) {
                                $scope.areaCode = newVal;
                                setUniversityList()
                            }
                        });

                        $scope.initAreaCode = function(area) {
                            $scope.areaCode = area.code;
                        };

                        var setUniversityList = function() {
                            universityService.getUnivListWithoutMou($scope.areaCode, $rootScope.university.mou.nowUniversityCode, function(data) {
                                if (data.univList) {
                                    $scope.univList = data.univList;
                                } else {
                                    $scope.univList = [];
                                }
                            });
                        };

                        $scope.saveIndividualMou = function() {
                            var univCodeList = [];
                            $scope.univList.forEach(function(univ) {
                                if(univ.checked) {
                                    univCodeList.push(univ.code);
                                }
                            });

                            if (univCodeList.length) {
                                var params = {
                                    univCode: $rootScope.university.mou.nowUniversityCode,
                                    mouUnivList: univCodeList
                                };
                                universityService.addIndividualMouUniv(params, function() {
                                    setIndividualMouList();
                                    setMouUnivList();
                                    commonService.alert('선택한 개별 협약대학이 추가되었습니다.', function() {
                                        $scope.closeThisDialog();
                                    });
                                });
                            } else {
                                commonService.alert('개별 협약대학을 선택해주세요.');
                            }
                        };
                    }
                });
            };

            /**
             * 학점교류신청 인원 제한 버튼 클릭 이벤트
             */
            $scope.setApplyMouLimitClick = function() {
                ngDialog.open({
                    template: Const.contextPath + 'html/university/setMouApplyLimit.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 400,
                    controller: function($scope) {
                        universityService.getMouUnivList($rootScope.university.mou.nowUniversityCode, 'false', function(data) {
                            if (data.mouList) {
                                $scope.mouPopList = data.mouList;
                            } else {
                                $scope.mouPopList = [];
                            }
                        });

                        $scope.saveLimitCnt = function() {
                            if ($scope.mouPopList.length) {
                                // 입력값 숫자 체크
                                var isCheckFail = false;
                                var regNumber = /^[0-9]*$/;
                                $scope.mouPopList.forEach(function (mou) {
                                    if (!regNumber.test(mou.limitCnt)) {
                                        isCheckFail = true;
                                        return false;
                                    }
                                });

                                if (isCheckFail) {
                                    commonService.alert('숫자만 입력해 주세요.');
                                } else {
                                    var data = {
                                        univCode: $rootScope.university.mou.nowUniversityCode,
                                        mouList: $scope.mouPopList
                                    };
                                    universityService.saveMouApplyLimit(data, function () {
                                        commonService.alert('학점교류신청 인원제한을 설정 하셨습니다.', function () {
                                            setMouUnivList();
                                            $scope.closeThisDialog();
                                        });
                                    });
                                }
                            }
                        };
                    }
                });
            };

        });
})());