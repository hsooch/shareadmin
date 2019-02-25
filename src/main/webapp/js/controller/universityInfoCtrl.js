((function() {
    angular.module('appModule')
        .controller('universityInfoCtrl', function($scope, $rootScope, commonService, Const, codeService, FileUploader, universityService) {
            console.log("university info in....");

            /**
             * 업로더 설정
             */
            if (!$rootScope.university.info.uploader) {
                $rootScope.university.info.uploader = new FileUploader({
                    url: Const.contextPath + 'university/submitWithLogo.ajax',
                    filters: [
                        {
                            name: 'fileSizeFilter',
                            fn: function (file) {
                                console.log('file => ', file);
                                if (file.size > 10485760) {
                                    commonService.alert('업로드 파일 용량은 10MB 이하만 가능합니다.');
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }, {
                            name: 'extensionFilter',
                            fn: function (file) {
                                var re = /(?:\.([^.]+))?$/;
                                var ext = re.exec(file.name)[1];
                                var isAllow = false;

                                if (ext) {
                                    switch (ext.toUpperCase()) {
                                        case 'JPG':
                                        case 'JPEG':
                                        case 'GIF':
                                        case 'BMP':
                                        case 'PNG':
                                            isAllow = true;
                                            break;
                                    }
                                }

                                if (!isAllow) {
                                    commonService.alert('JPG, JPEG, PNG, GIF, BMP 파일만 업로드 가능합니다.');
                                }

                                return isAllow;
                            }
                        }
                    ], onBeforeAddQueue: function (files, options, filters) {
                        console.log('files length => ', files.length);
                        if (files.length && this.queue.length !== 0) {
                            this.clearQueue();
                        }

                        this.addToQueue(files, options, filters);
                    }
                });
            }

            /**
             * 지역과 대학교 코드 목록 한번에 가져오기
             */
            codeService.getUniversityCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
                console.log(data);
                $rootScope.university.info.universityList = data.universityList;
            });

            /**
             * 설립 구분 코드 가져오기
             */
            if (!$rootScope.university.info.setUpTypeList) {
                commonService.getCodeList(Const.code.SET_UP_TYPE, function(data) {
                    $rootScope.university.info.setUpTypeList = data.codeList;
                });
            }

            /**
             * 지역번호 목록 가져오기
             */
            if (!$rootScope.university.info.telFirstNumList) {
                commonService.getCodeList(Const.code.TEL_NUMBER_ROOT, function(data) {
                    $rootScope.university.info.telFirstNumList = data.codeList;
                    $rootScope.university.info.telNum1 = data.codeList[0].codeName;
                });
            }

            /**
             * 지역명을 클릭했을 때 이벤트
             *
             * @param obj 지역 코드 오브젝트
             */
            $scope.locationClick = function(obj) {
                $rootScope.university.info.nowUniversityParentCode = obj.code;
            };

            /**
             * 대학교명을 클릭했을 때 이벤트
             *
             * @param obj 대학교 코드 오브젝트
             * @param parent 선택한 대학교 상위 지역 코드 오브젝트
             * **/
            $scope.universityClick = function(obj, parent) {
                $rootScope.university.info.nowUniversityCode = obj.code;
                $rootScope.university.info.nowUniversityCodeName = obj.codeName;
                $rootScope.university.info.nowUniversityParentCodeName = parent.codeName;
                showUniversityInfo();
            };

            /**
             * 주소 검색 후 결과 데이터를 맵핑 한다.
             *
             * @param zipCode 우편번호
             * @param defaultAddr 기본 주소
             * @param detailAddr 상세 주소
             */
            $scope.setAddress = function(zipCode, defaultAddr, detailAddr) {
                $rootScope.university.info.zipCode = zipCode;
                $rootScope.university.info.defaultAddr = defaultAddr;
                $rootScope.university.info.detailAddr = detailAddr;
            };

            /**
             * 대학 정보를 조회하며 화면에 정보를 노출한다.
             */
            var showUniversityInfo = function() {
                if ($rootScope.university.info.uploader.queue.length > 0) {
                    $rootScope.university.info.uploader.clearQueue();
                }

                universityService.getUniversityInfo($rootScope.university.info.nowUniversityCode, function(data) {
                    console.log(data);
                    if (data.info) {
                        $rootScope.university.info.setUpType = data.info.setupCode;
                        $rootScope.university.info.zipCode = data.info.zipCode;
                        $rootScope.university.info.defaultAddr = data.info.defaultAddr;
                        $rootScope.university.info.detailAddr = data.info.detailAddr;
                        $rootScope.university.info.saveLogoFileName = defaultIfEmpty(data.info.logoFileName);
                        $rootScope.university.info.saveLogoFileUrl = defaultIfEmpty(data.info.logoFileUrl);
                        $rootScope.university.info.homeUrl = defaultIfEmpty(data.info.homeUrl);
                        $rootScope.university.info.miniHomeUrl = defaultIfEmpty(data.info.miniHomeUrl);
                        $rootScope.university.info.enableYn = data.info.enableYn;
                        $rootScope.university.info.regUserName = data.info.regUserName;
                        $rootScope.university.info.commonCode = data.info.commonCode;
                        $rootScope.university.info.univNameEn = data.info.univNameEn;
                        $rootScope.university.info.applyDocId = data.info.applyDocId;
                        $rootScope.university.info.applyCancelDocId = data.info.applyCancelDocId;
                        if (data.info.telNum) {
                            var telNums = data.info.telNum.split('-');
                            if (telNums.length === 3) {
                                $rootScope.university.info.telNum1 = telNums[0];
                                $rootScope.university.info.telNum2 = telNums[1];
                                $rootScope.university.info.telNum3 = telNums[2];
                            }
                        }
                    } else {
                        $rootScope.university.info.setUpType = '';
                        $rootScope.university.info.zipCode = '';
                        $rootScope.university.info.defaultAddr = '';
                        $rootScope.university.info.detailAddr = '';
                        $rootScope.university.info.telNum1 = '02';
                        $rootScope.university.info.telNum2 = '';
                        $rootScope.university.info.telNum3 = '';
                        $rootScope.university.info.saveLogoFileName = '';
                        $rootScope.university.info.saveLogoFileUrl = '';
                        $rootScope.university.info.homeUrl = '';
                        $rootScope.university.info.miniHomeUrl = '';
                        $rootScope.university.info.regUserName = '';
                        $rootScope.university.info.enableYn = 'Y';
                        $rootScope.university.info.commonCode = '';
                        $rootScope.university.info.univNameEn = '';
                        $rootScope.university.info.applyDocId = '';
                        $rootScope.university.info.applyCancelDocId = '';
                    }
                    $rootScope.university.info.logoDeleteYn = 'N';
                });
            };

            /**
             * 저장을 클릭했을 때 이벤트
             */
            $scope.submit = function() {
                console.log('field value => ', $rootScope.university.info);
                var telNum = $rootScope.university.info.telNum1 + '-' + $rootScope.university.info.telNum2 + '-'
                    + $rootScope.university.info.telNum3;

                if ($rootScope.university.info.uploader.queue.length) {
                    var item = $rootScope.university.info.uploader.queue[0];
                    item.formData.push({areaCode: $rootScope.university.info.nowUniversityParentCode});
                    item.formData.push({setupCode: $rootScope.university.info.setUpType});
                    item.formData.push({universityCode: $rootScope.university.info.nowUniversityCode});
                    item.formData.push({zipCode: $rootScope.university.info.zipCode});
                    item.formData.push({defaultAddr: $rootScope.university.info.defaultAddr});
                    item.formData.push({detailAddr: $rootScope.university.info.detailAddr});
                    item.formData.push({telNum: telNum});
                    item.formData.push({homeUrl: $rootScope.university.info.homeUrl});
                    item.formData.push({miniHomeUrl: $rootScope.university.info.miniHomeUrl});
                    item.formData.push({enableYn: $rootScope.university.info.enableYn});
                    item.formData.push({logoDeleteYn: $rootScope.university.info.logoDeleteYn});
                    item.formData.push({commonCode: $rootScope.university.info.commonCode});
                    item.formData.push({univNameEn: $rootScope.university.info.univNameEn});
                    item.formData.push({applyDocId: $rootScope.university.info.applyDocId});
                    item.formData.push({applyCancelDocId: $rootScope.university.info.applyCancelDocId});
                    item.onSuccess = function() {
                        commonService.alert('저장되었습니다.');
                        showUniversityInfo();
                    };
                    item.onError = function(response, status) {
                        console.error('logo upload error status => ', status);
                        commonService.etcError(response);
                    };
                    item.upload();
                } else {
                    var data = {
                        areaCode: $rootScope.university.info.nowUniversityParentCode,
                        setupCode: $rootScope.university.info.setUpType,
                        universityCode: $rootScope.university.info.nowUniversityCode,
                        zipCode: $rootScope.university.info.zipCode,
                        defaultAddr: $rootScope.university.info.defaultAddr,
                        detailAddr: $rootScope.university.info.detailAddr,
                        telNum: telNum,
                        homeUrl: $rootScope.university.info.homeUrl,
                        miniHomeUrl: $rootScope.university.info.miniHomeUrl,
                        enableYn: $rootScope.university.info.enableYn,
                        logoDeleteYn: $rootScope.university.info.logoDeleteYn,
                        commonCode: $rootScope.university.info.commonCode,
                        univNameEn: $rootScope.university.info.univNameEn,
                        applyDocId: $rootScope.university.info.applyDocId,
                        applyCancelDocId: $rootScope.university.info.applyCancelDocId
                    };

                    universityService.saveUniversityInfo(data, function() {
                        commonService.alert('저장되었습니다.');
                        showUniversityInfo();
                    });
                }
            };
        });
})());