((function () {
    angular.module('appModule', ['ngDialog', 'ngRoute', 'ngCookies', 'angularFileUpload'])
        .directive('ngEnter', function () {
            return function (scope, element, attrs) {
                element.bind('keydown keypress', function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            };
        })
        .directive('krInput', [ '$parse', function($parse) {
            return {
                priority : 2,
                restrict : 'A',
                compile : function(element) {
                    element.on('compositionstart', function(e) {
                        e.stopImmediatePropagation();
                    });
                }
            };
        }])
        .directive('slideShow', function () {
            return {
                restrict:'A',
                link: function (scope, element, attr) {
                    scope.$watch(attr.slideShow, function(value) {
                        if (value) {
                            element.slideDown(350);
                        } else {
                            element.slideUp(350);
                        }
                    });
                }
            };
        })
        .directive("ngFileSelect", function(fileReader, $timeout) {
        	return {
        		scope: {
        			ngModel: '='
        		},
        		link: function($scope, el) {
        			function getFile(file) {
        				fileReader.readAsDataUrl(file, $scope)
        				.then(function(result) {
        					$timeout(function() {
        						$scope.ngModel = result;
        					});
        				});
        			}

        			el.bind("change", function(e) {
        				var file = (e.srcElement || e.target).files[0];
        				getFile(file);
        			});
        		}
        	};
        })
        .constant('Const', {
            contextPath: '/',
            successResultCode: '0',
            code: {
                TERMS_REGIST_USER: 'TRM01000001',
                UNIVERSITY_ROOT: 'UNI00000000',
                TEL_NUMBER_ROOT: 'TLN00000000',
                MOBILE_NUMBER_ROOT: 'MBN00000000',
                EMAIL_DOMAIN_ROOT: 'EMT00000000',
                ROOT: '0',
                SET_UP_TYPE: 'STU00000000',
                USER_STATUS_ROOT: 'UST00000000', /* 회원 상태코드 */
                USER_STATUS_ACTIVE : "UST01000001", // 정상
            	USER_STATUS_WITHDRAW : "UST01000002", // 탈퇴
            	USER_STATUS_FORCED_WITHDRAW : "UST01000003", // 강제탈퇴
            	USER_STATUS_INACTIVE : "UST01000004", // 휴면
                USER_TYPE_ROOT: 'UGR00000000', /* 회원 분류 코드 */
                USER_TYPE_SUPER: 'UGR01000001', /* 총괄 관리자 코드 */
                USER_TYPE_UNIV: 'UGR01000002', /* 대학담당자 코드 */
                USER_TYPE_LLLEARN: 'UGR01000003', /* 평생교육담당자 코드 */
                USER_TYPE_STUDENT: 'UGR01000004', /* 학생 코드 */
                USER_TYPE_CITIZEN: 'UGR01000005', /* 일반시민 코드 */
                MOU_TYPE: 'MOU00000000',     /* MOU 대학 분류 코드 */
                SEMESTER_TYPE: 'STC00000000', /* 학기 분류 코드 */
                SUBJECT_GRADE_CODE : 'SGC00000000', /* 학년 분류 코드 */
            },
            message : {
            	RESULT_CODE_LE00 : '입력하신 정보와 일치하는 회원이 없습니다.',
            	RESULT_CODE_LE01 : '비밀번호를 5회 이상 잘못 입력하셨습니다. 본인인증으로 임시비밀번호를 발급 받아 계정장금을 해제하시기 바랍니다.',
            	RESULT_CODE_LE02 : '장기간 로그인하지 않아 계정이 휴면처리 되었습니다. 본인인증으로 휴면계정을 복원하세요.',
            	//RESULT_CODE_LE03 : '비밀번호를 6개월이상 변경하지 않으셨습니다. 개인정보 보호를 위하여 비밀번호를 변경해 주세요.',
            	RESULT_CODE_LE05 : '회원가입 승인 대기중 입니다. 승인 후 로그인 할 수 있습니다.',
            	RESULT_CODE_LE06 : '관리자 사이트 접근 권한이 없는 계정입니다.',
            }
        })
        .run(function ($rootScope, Const) {
            $rootScope.Const = Const;

            // Loading View Count
            $rootScope.httpLoadingCnt = 0;
            
            // 로그인 사용자 세션
            $rootScope.userSession = {};

            // 회원 관리에서 사용할 전역 변수
            $rootScope.member = {
                management: {},
                modify: {
                	univAreaCodeList	: [{code:"", codeName:"지역 선택"}],
                	univCodeList		: [{code : "", codeName : "대학교 선택"}],
                },
                withdraw: {
                	pageViewType : 'pwchk'		// 'pwchk' 비밀번호 확인 -> 'confirm' 삭제 확인 
                }
            };

            // 코드/대학정보 관리에서 사용할 전역 변수
            $rootScope.university = {
                info: {},
                code: {},
                mou: {}
            };
            
            $rootScope.login = {
            	errCode:"",
            	purposeToCert:"",
            	popupScope:{}
            };
            
            $rootScope.userManagement = {
            		nowMgmtTab : 0,
                	pageType : 'basic', // basic : 회원목록, account : 가입승인대기 목록, withdraw : 탈퇴 승인대기
                	pageTypeArr : ['basic', 'account', 'withdraw'],
                	emailDomainList	: [],
            		telNoList : [],
            		cellNoList : [],
                	basic : {
                			searchUserTypeList	: [{code:"", codeName:"전체"}],
                        	searchUserType		: null,
                        	searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
                        	searchUnivArea		: null,
                        	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
                        	searchUniv			: null,
                        	searchUserStatusList: [{code : "", codeName : "전체"}],
                        	searchUserStatus	: null,
                        	searchPeriodTypeList: [{code : "", codeName : "전체"}],
                        	searchPeriodType	: null,
                        	searchStartDt		: null,
                        	searchEndDt			: null,
                        	searchKeyType		: null,
                        	searchKey			: null,
                        	sort				: '',
                    		order				: '',
                    		userList			: [],
                    		userInfo			: {},
                    		maxRowCnt 			: '10',
                    		nowPage				: '1',
                    		totalCnt			: '0',
                    		isCheckedAll		: false,
                    		searchYn			: 'N',
                    		pageViewType		: 'list' // list : 목록, info : 상세화면, modify : 수정화면
                	},
                	account : {
                			searchUserTypeList	: [{code:"", codeName:"전체"}],
                        	searchUserType		: null,
                        	searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
                        	searchUnivArea		: null,
                        	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
                        	searchUniv			: null,
                        	searchUserStatusList: [{code : "", codeName : "전체"}],
                        	searchUserStatus	: null,
                        	searchPeriodTypeList: [{code : "", codeName : "전체"}],
                        	searchPeriodType	: "ARD", /*account request date */
                        	searchStartDt		: null,
                        	searchEndDt			: null,
                        	searchKeyType		: null,
                        	searchKey			: null,
                        	sort				: '',
                    		order				: '',
                			userList			: [],
                			userInfo			: {},
                			maxRowCnt 			: '10',
                			nowPage				: '1',
                			totalCnt			: '0',
                			isCheckedAll		: false,
                			searchYn			: 'N',
                			pageViewType		: 'list' // list : 목록, info : 상세화면
                	},
                	withdraw : {
                			searchUserTypeList	: [{code:"", codeName:"전체"}],
                        	searchUserType		: null,
                        	searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
                        	searchUnivArea		: null,
                        	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
                        	searchUniv			: null,
                        	searchUserStatusList: [{code : "", codeName : "전체"}],
                        	searchUserStatus	: null,
                        	searchPeriodTypeList: [{code : "", codeName : "전체"}],
                        	searchPeriodType	: "WRD", /* withdraw request date*/
                        	searchStartDt		: null,
                        	searchEndDt			: null,
                        	searchKeyType		: null,
                        	searchKey			: null,
                        	sort				: 'USER_STATUS_CD',
                    		order				: 'DESC',
                    		userList			: [],
                    		userInfo			: {},
                    		maxRowCnt 			: '10',
                    		nowPage				: '1',
                    		totalCnt			: '0',
                    		isCheckedAll		: false,
                    		searchYn			: 'N',
                    		pageViewType			: 'list' // list : 목록, info : 상세화면
                	}
            };
            
            $rootScope.semester = {
                	searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
                	univAreaCodeList		: [{code:"", codeName:"지역 선택"}],
                	searchUnivArea		: null,
                	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
                	newUnivCodeList			: [{code : "", codeName : "대학교 선택"}],
                	searchUniv			: null,
                	searchYearList		: [{code : "", codeName : "전체"}],
                	yearList			: [{code : "", codeName : "년도 선택"}],
                	searchYear			: null,
                	semesterCodeList	: [{code : "", codeName : "학기 선택"}],
                	sort				: '',
            		order				: '',
            		semesterList		: [],
            		semesterInfo		: {},
            		maxRowCnt 			: '10',
            		nowPage				: '1',
            		totalCnt			: '0',
            		isCheckedAll		: false,
            		searchYn			: 'N',
            		pageViewType		: 'list', // list : 목록, modify : 등록/수정화면

            		//과목 등록/조회 페이지
            		subject				: {
            			searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
                    	searchUnivArea		: null,
                    	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
                    	searchUniv			: null,
                    	searchYearList		: [{code : "", codeName : "전체"}],
                    	searchYear			: null,
                    	searchSemesterCodeList	: [{code : "", codeName : "전체"}],
                    	searchSemesterCode	: null,
                    	searchSubjectGradeCodeList : [{code : "", codeName : "전체"}],
                    	searchSubjectGradeCode : null,
                    	searchClassAcceptType : null,
                    	searchKey			: null,
                    	searchType			: "",
                    	subjectGradeList	: [],
                    	sort				: '',
                		order				: '',
                		subjectList			: [],
                		subjectInfo			: {},
                		maxRowCnt 			: '10',
                		nowPage				: '1',
                		totalCnt			: '0',
                		isCheckedAll		: false,
                		searchYn			: 'N',
                		pageViewType		: 'list', // list : 목록, modify : 등록/수정화면
            		},
            };
            
            $rootScope.semesterGuide = {
                	searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
                	univAreaCodeList		: [{code:"", codeName:"지역 선택"}],
                	searchUnivArea		: null,
                	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
                	univCodeList			: [{code : "", codeName : "대학교 선택"}],
                	searchUniv			: null,
                	searchYearList		: [{code : "", codeName : "전체"}],
                	yearList			: [{code : "", codeName : "년도 선택"}],
                	searchYear			: null,
                	searchSemesterCodeList	: [{code : "", codeName : "전체"}],
                	sort				: '',
            		order				: '',
            		semesterListWithGuide		: [],
            		semesterInfo		: {},
            		maxRowCnt 			: '10',
            		nowPage				: '1',
            		totalCnt			: '0',
            		isCheckedAll		: false,
            		searchYn			: 'N',
            		pageViewType		: 'list', // list : 목록, modify : 등록/수정화면
            		uploader			: null, //파일업로더
            		isUnivComplete		: false,
            		isSemesterComplete	: false
            };
            
            $rootScope.semesterAcceptGuide = {
                	searchUnivAreaList		: [{code:"", codeName:"지역 전체"}],
                	univAreaCodeList		: [{code:"", codeName:"지역 선택"}],
                	searchUnivArea			: null,
                	searchUnivList			: [{code : "", codeName : "대학교 전체"}],
                	univCodeList			: [{code : "", codeName : "대학교 선택"}],
                	searchUniv				: null,
                	searchYearList			: [],
                	yearList				: [],
                	searchYear				: null,
                	searchSemesterCodeList	: [{code:"", codeName:"전체"}],
                	searchSmsStatus			: null,
                	searchUserUnivAreaList	: [{code:"", codeName:"지역 전체"}],
                	userUnivAreaCodeList	: [{code:"", codeName:"지역 선택"}],
                	searchUserUnivArea		: null,
                	searchUserUnivList		: [{code : "", codeName : "대학교 전체"}],
                	searchUserUniv			: null,
                	searchKeyType			: null,
                	searchKey				: null,
                	sort					: '',
            		order					: '',
            		semesterListWithGuide	: [],
            		semesterInfo			: {},
            		maxRowCnt 				: '10',
            		nowPage					: '1',
            		totalCnt				: '0',
            		isCheckedAll			: false,
            		searchYn				: 'N',
            		pageViewType			: 'list', // list : 목록, modify : 등록/수정화면
            		uploader				: null, //파일업로더
            		isUnivComplete			: false,
            		isSemesterComplete		: false
            };
            
            // 메뉴 관리에 필요한 전역 변수
            $rootScope.menu = {
            		
            };

            // 권한 관리에 필요한 전역 변수
            $rootScope.authority = {
				typeSet: {
					searchParam: {
                        managerType: '',
                        keywordType: '',
                        keyword: '',
                        univCode: '',
                        areaCode: '',
                        nowPage: '1',
						maxRowCnt: '10',
						sort: 'univName',
						order: 'ASC'
					}
				},
				group: {
						pageViewType		:	'list',
						searhUserList		: [{}],
						searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
	                	univAreaCodeList	: [{code:"", codeName:"지역 선택"}],
	                	searchUnivArea		: null,
	                	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
	                	univCodeList		: [{code : "", codeName : "대학교 선택"}],
	                	searchUniv			: null,
	                	groupList			: [],
	                	groupInfo			: {},
	                	searchYn			: 'N',
	                	isCheckedAll		: false,
	                	sort				: 'regDt',
                		order				: 'desc',
                		maxRowCnt 			: '10',
                		nowPage				: '1',
                		totalCnt			: '0',
				},
				personal: {
						pageViewType		:	'list',
						searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
	                	univAreaCodeList	: [{code:"", codeName:"지역 선택"}],
	                	searchUnivArea		: null,
	                	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
	                	univCodeList		: [{code : "", codeName : "대학교 선택"}],
	                	searchUniv			: null,
	                	univManagerList		: [],
	                	personalList		: [],
	                	personalInfo		: {},
	                	searchYn			: 'N',
	                	sort				: '',
                		order				: '',
                		maxRowCnt 			: '10',
                		nowPage				: '1',
                		totalCnt			: '0',
				}
			};

            // 세미나 관리에 필요한 전역 변수
            $rootScope.seminar = {
            		list : {
	            			searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
	                    	univAreaCodeList	: [{code:"", codeName:"지역 선택"}],
	                    	searchUnivArea		: null,
	                    	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
	                    	univCodeList		: [{code : "", codeName : "대학교 선택"}],
	                    	searchSeminaType	: null,
	                    	searchUniv			: null,
	                    	searchYn			: 'N',
	                    	sort				: 'regDt',
	                		order				: 'desc',
	                		maxRowCnt 			: '10',
	                		nowPage				: '1',
	                		totalCnt			: '0',
            				pageViewType		:	'list',
            				seminarList			:	[],
            				seminarInfo			:	{},
            				uploader			: null,
            				multiUploader		: null,
            		},
            		confirm : {
	            			searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
	                    	univAreaCodeList	: [{code:"", codeName:"지역 선택"}],
	                    	searchUnivArea		: null,
	                    	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
	                    	univCodeList		: [{code : "", codeName : "대학교 선택"}],
	                    	searchSeminaType	: null,
	                    	searchUniv	 		: null,
	                    	searchYn			: 'N',
	                    	sort				: 'regDt',
	                		order				: 'desc',
	                		maxRowCnt 			: '10',
	                		nowPage				: '1',
	                		totalCnt			: '0',
	        				pageViewType		:	'list',
	        				seminarList			:	[],
	        				applyList			:	[],
	        				seminarInfo			:	{},
	        				applyInfo			: 	{},
            		},
            		attend : {
	            			searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
	                    	univAreaCodeList	: [{code:"", codeName:"지역 선택"}],
	                    	searchUnivArea		: null,
	                    	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
	                    	univCodeList		: [{code : "", codeName : "대학교 선택"}],
	                    	searchSeminaType	: null,
	                    	searchUniv	 		: null,
	                    	searchYn			: 'N',
	                    	sort				: 'regDt',
	                		order				: 'desc',
	                		maxRowCnt 			: '10',
	                		nowPage				: '1',
	                		totalCnt			: '0',
	        				pageViewType		:	'list',
	                    	seminarList			:	[],
	                    	attendList			:   [],
	                    	seminarInfo			:	{},
	                    	attendInfo			:   {},
	                    	uploader			: null,
            		},
            		contest : {
	            			searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
	                    	univAreaCodeList	: [{code:"", codeName:"지역 선택"}],
	                    	searchUnivArea		: null,
	                    	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
	                    	univCodeList		: [{code : "", codeName : "대학교 선택"}],
	                    	searchSeminaType	: null,
	                    	searchUniv	 		: null,
	                    	searchYn			: 'N',
	                    	sort				: 'regDt',
	                		order				: 'desc',
	                		maxRowCnt 			: '10',
	                		nowPage				: '1',
	                		totalCnt			: '0',
	        				pageViewType		:	'list',
	        				contestList			:	[],
	                    	contestInfo			:	{},
	                    	uploader			: null,
            		}
            };
            
            /* SMS/메일발송 관리 */
            $rootScope.message = {
            		smsSendManagement:{
            			pageTypeArr	:	['smsSendList', 'smsSendResultList'],
            			pageType	:	'smsSendList',
            			nowMgmtTab	:	0,
            			smsInfo		:	{},
            			senderList	: {
            					senderList	: {
            						isCheckedAll				: false,
    	            				searchUnivAreaList			: [],
    	    	                	searchUnivArea				: null,
    	    	                	searchUnivList				: [{code : "", codeName : "대학교 전체"}],
    	    	                	searchUniv					: null,
    	    	                	searchYearList				: [],
    	    	                	searchYear					: null,
    	    	                	searchSemesterCodeList		: [],
    	    	                	searchUserUnivAreaList		: [{code:"", codeName:"지역 전체"}],
    	    	                	searchUserUnivArea			: null,
    	    	                	searchUserUnivList			: [{code : "", codeName : "대학교 전체"}],
    	    	                	searchUserUniv				: null,
    	    	                	searchType					: null,
    	    	                	searchKey					: null,
    	    	                	sort						: '',
    	                    		order						: '',
    	                    		maxRowCnt 					: '10',
    	                    		nowPage						: '1',
    	                    		totalCnt					: '0',
    	                    		searchYn					: 'N',
            					},
            					senderPersonalList : {
            						isCheckedAll				: false,
    	            				searchUnivAreaList			: [],
    	    	                	searchUnivArea				: null,
    	    	                	searchUnivList				: [{code : "", codeName : "대학교 전체"}],
    	    	                	searchUniv					: null,
    	    	                	searchYearList				: [],
    	    	                	searchYear					: null,
    	    	                	searchSemesterCodeList		: [],
    	    	                	searchUserUnivAreaList		: [{code:"", codeName:"지역 전체"}],
    	    	                	searchUserUnivArea			: null,
    	    	                	searchUserUnivList			: [{code : "", codeName : "대학교 전체"}],
    	    	                	searchUserUniv				: null,
    	    	                	searchType					: null,
    	    	                	searchKey					: null,
    	    	                	sort						: '',
    	                    		order						: '',
    	                    		maxRowCnt 					: '10',
    	                    		nowPage						: '1',
    	                    		totalCnt					: '0',
    	                    		searchYn					: 'N',
            					},
	            				pageTypeArr					:	['senderList', 'senderPersonalList'],
	            				pageType					: 'senderList',
	            				nowSenderTab				: 0,
	            				isCheckedAll				: false,
	            				searchUnivAreaList			: [],
	    	                	searchUnivArea				: null,
	    	                	searchUnivList				: [{code : "", codeName : "대학교 전체"}],
	    	                	searchUniv					: null,
	    	                	searchYearList				: [],
	    	                	searchYear					: null,
	    	                	searchSemesterCodeList		: [],
	    	                	searchUserUnivAreaList		: [{code:"", codeName:"지역 전체"}],
	    	                	searchUserUnivArea			: null,
	    	                	searchUserUnivList			: [{code : "", codeName : "대학교 전체"}],
	    	                	searchUserUniv				: null,
	    	                	searchType					: null,
	    	                	searchKey					: null,
	    	                	sort						: '',
	                    		order						: '',
	                    		maxRowCnt 					: '10',
	                    		nowPage						: '1',
	                    		totalCnt					: '0',
	                    		searchYn					: 'N',
            			},
            			smsSendList	:	{
            				searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
            				univAreaCodeList		: [{code:"", codeName:"지역 선택"}],
            				searchUnivArea		: null,
            				searchUnivList		: [{code : "", codeName : "대학교 전체"}],
            				univCodeList			: [{code : "", codeName : "대학교 선택"}],
            				searchUniv			: null,
            				searchStartDt		: null,
            				searchEndDt			: null,
            				searchTitle			: null,
            				searchMsgType		: 2,
            				sort				: '',
            				order				: '',
            				maxRowCnt 			: '10',
            				nowPage				: '1',
            				totalCnt			: '0',
            				pageViewType		: 'list',
            				isCheckedAll		: false,
            				messageList		: [],
            				messageTargetList		: [],
            				messageInfo		: {},
            			},
            			smsSendResultList:{
            				searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
            				univAreaCodeList		: [{code:"", codeName:"지역 선택"}],
            				searchUnivArea		: null,
            				searchUnivList		: [{code : "", codeName : "대학교 전체"}],
            				univCodeList			: [{code : "", codeName : "대학교 선택"}],
            				searchUniv			: null,
            				searchStartDt		: null,
            				searchEndDt			: null,
            				searchTitle			: null,
            				searchMsgType		: 2,
            				sort				: 'REG_DT',
            				order				: 'desc',
            				maxRowCnt 			: '10',
            				nowPage				: '1',
            				totalCnt			: '0',
            				pageViewType		: 'list',
            				messageList		: [],
            				messageTargetList		: [],
            				messageInfo		: {},
            			},
            			sendResultInfo: {
            				searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
            				univAreaCodeList		: [{code:"", codeName:"지역 선택"}],
            				searchUnivArea		: null,
            				searchUnivList		: [{code : "", codeName : "대학교 전체"}],
            				univCodeList			: [{code : "", codeName : "대학교 선택"}],
            				searchUniv			: null,
            				searchStartDt		: null,
            				searchEndDt			: null,
            				searchTitle			: null,
            				searchMsgType		: 2,
            				sort				: 'REG_DT',
            				order				: 'desc',
            				maxRowCnt 			: '10',
            				nowPage				: '1',
            				totalCnt			: '0',
            				pageViewType		: 'list',
            			}
            		},
            		emailSendManagement:{
            			pageTypeArr : ['sendList', 'resultList'],
            			pageType : 'sendList',
            			nowMgmtTab : 0,
            			sendList:{
            				searchMsgType			: 2,
            				sort					: '',
            				order					: '',
            				maxRowCnt	 			: '10',
            				nowPage					: '1',
            				totalCnt				: '0',
            				messageList				: [],
            				messageTargetList		: [],
            				messageInfo				: {},
                    		searchYn				: 'N',
                			nowMgmtTab				: 0
                		},
            			confirmInList :{
                			searchUnivAreaList		: [],
                        	searchUnivArea			: null,
                        	searchUnivList			: [],
                        	searchUniv				: null,
                        	searchYearList			: [],
                        	searchYear				: null,
                        	searchSemesterCodeList	: [],
                        	searchSemesterCode		: null,
                        	searchUserUnivAreaList	: [{code:"", codeName:"지역 전체"}],
    	                	searchUserUnivArea		: null,
    	                	searchUserUnivList		: [{code : "", codeName : "대학교 전체"}],
    	                	searchUserUniv			: null,
    	                	searchType				: null,
                        	searchKey				: null,
                    		searchYn				: 'N',
                        	sort					: '',
                    		order					: '',
                    		applyExchangeList		: [],
                    		maxRowCnt	 			: '10',
                    		nowPage					: '1',
                    		totalCnt				: '0',
                    		isCheckedAll			: false
                		},
                		userList : {
                        	searchUserUnivAreaList	: [],
    	                	searchUserUnivArea		: null,
    	                	searchUserUnivList		: [],
    	                	searchUserUniv			: null,
                        	searchType				: null,
                        	searchKey				: null,
                    		searchYn				: 'N',
                        	sort					: '',
                    		order					: '',
                    		userList				: [],
                    		userInfo				: {},
                    		maxRowCnt	 			: '10',
                    		nowPage					: '1',
                    		totalCnt				: '0',
                    		isCheckedAll			: false
            			},
            			resultList:{
            				searchUnivAreaList		: [{code:"", codeName:"지역 전체"}],
            				searchUnivArea			: null,
            				searchUnivList			: [{code : "", codeName : "대학교 전체"}],
            				searchUniv				: null,
            				searchTitle				: null,
            				searchStartDt			: null,
            				searchEndDt				: null,
            				searchMsgType			: 2,
            				searchYn				: 'N',
            				searchDateType			: '1',
            				sort					: '',
            				order					: '',
            				maxRowCnt 				: '10',
            				nowPage					: '1',
            				totalCnt				: '0',
            				messageList				: [],
            				messageInfo				: {},
                    		isCheckedAll			: false
            			},
        				targetList : {
                        	searchUserUnivAreaList	: [{code:"", codeName:"지역 전체"}],
    	                	searchUserUnivArea		: null,
    	                	searchUserUnivList		: [{code : "", codeName : "대학교 전체"}],
    	                	searchUserUniv			: null,
                        	searchType				: null,
                        	searchKey				: null,
                    		searchYn				: 'N',
                        	sort					: '',
                    		order					: '',
                    		userList				: [],
                    		userInfo				: {},
                    		maxRowCnt	 			: '10',
                    		nowPage					: '1',
                    		totalCnt				: '0'
                	    }
            		}
            };

            //학점교류 수강결과 전역 변수
            $rootScope.exchange = {
            		//학점교류신청 OUT
            		confirmOut : {
            			searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
                    	searchUnivArea		: null,
                    	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
                    	searchUniv			: null,
                    	searchYearList		: [{code : "", codeName : "전체"}],
                    	searchYear			: null,
                    	searchSemesterCodeList	: [{code : "", codeName : "전체"}],
                    	searchSemesterCode	: null,
                    	searchSubjectGradeCodeList : [{code : "", codeName : "전체"}],
                    	searchSubjectGradeCode : null,
                    	searchApplyStatus   : null,
                    	searchKey			: null,
                    	searchType			: "",
                    	subjectGradeList	: [],
                    	sort				: '',
                		order				: '',
                		applyStatusList		: [{code : '1', codeName : "대기"}, {code : '2', codeName : "승인"}, {code : '3', codeName : "반려"}],
                		applyExchangeUserList	: [],
                		maxRowCnt 			: '10',
                		nowPage				: '1',
                		totalCnt			: '0',
                		isCheckedAll		: false,
                		searchYn			: 'N',
                		pageViewType		: 'list', // list : 목록, modify : 등록/수정화면
                		isUnivComplete		: false,
	            		isSemesterComplete	: false
            		},
            		//학점교류신청 IN
            		confirmIn :{
            			searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
                    	searchUnivArea		: null,
                    	searchUnivList		: [{code : "", codeName : "대학교 전체"}],
                    	searchUniv			: null,
                    	searchYearList		: [{code : "", codeName : "전체"}],
                    	searchYear			: null,
                    	searchSemesterCodeList	: [{code : "", codeName : "전체"}],
                    	searchSemesterCode	: null,
                    	searchSubjectGradeCodeList : [{code : "", codeName : "전체"}],
                    	searchSubjectGradeCode : null,
                    	searchApplyStatus   : null,
                    	searchUserUnivAreaList	: [{code:"", codeName:"지역 전체"}],
	                	searchUserUnivArea	: null,
	                	searchUserUnivList	: [{code : "", codeName : "대학교 전체"}],
	                	searchUserUniv		: null,
                    	searchKey			: null,
                    	searchType			: "",
                    	subjectGradeList	: [],
                    	sort				: '',
                		order				: '',
                		applyStatusList		: [{code : '4', codeName : "대기"}, {code : '5', codeName : "승인"}, {code : '6', codeName : "반려"}],
                		applyExchangeUserList	: [],
                		maxRowCnt 			: '10',
                		nowPage				: '1',
                		totalCnt			: '0',
                		isCheckedAll		: false,
                		searchYn			: 'N',
                		pageViewType		: 'list', // list : 목록, modify : 등록/수정화면
                		isUnivComplete		: false,
	            		isSemesterComplete	: false
            		},
            		//학점교류신청 취소 OUT
            		cancelOut : {
	            		nowMgmtTab			: 0,
	            		viewPage			: [{searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
												searchUnivArea		: null,
												searchUnivList		: [{code : "", codeName : "대학교 전체"}],
												searchUniv			: null,
												searchYearList		: [{code : "", codeName : "전체"}],
												searchYear			: null,
												searchSemesterCodeList	: [{code : "", codeName : "전체"}],
												searchSemesterCode	: null,
												searchSubjectGradeCodeList : [{code : "", codeName : "전체"}],
												searchSubjectGradeCode : null,
												searchMessageConfirm: null,
												searchApplyStatus   : null,
												searchKey			: null,
												searchType			: "",
												subjectGradeList	: [],
												sort				: '',
												order				: '',
												applyStatusList		: [{code : '1', codeName : "대기"}, {code : '2', codeName : "승인"}, {code : '3', codeName : "반려"}],
												applyExchangeUserList	: [],
												maxRowCnt 			: '10',
												nowPage				: '1',
												totalCnt			: '0',
												isCheckedAll		: false,
												searchYn			: 'N',
												pageViewType		: 'list', // list : 목록, modify : 등록/수정화면
												isUnivComplete		: false,
												isSemesterComplete	: false,
	            		        			   },
	            		        			   {searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
												searchUnivArea		: null,
												searchUnivList		: [{code : "", codeName : "대학교 전체"}],
												searchUniv			: null,
												searchYearList		: [{code : "", codeName : "전체"}],
												searchYear			: null,
												searchSemesterCodeList	: [{code : "", codeName : "전체"}],
												searchSemesterCode	: null,
												searchSubjectGradeCodeList : [{code : "", codeName : "전체"}],
												searchSubjectGradeCode : null,
												searchMessageConfirm: null,
												searchApplyStatus   : null,
												searchKey			: null,
												searchType			: "",
												subjectGradeList	: [],
												sort				: '',
												order				: '',
												applyStatusList		: [{code : '1', codeName : "대기"}, {code : '2', codeName : "승인"}, {code : '3', codeName : "반려"}],
												applyExchangeUserList	: [],
												maxRowCnt 			: '10',
												nowPage				: '1',
												totalCnt			: '0',
												isCheckedAll		: false,
												searchYn			: 'N',
												pageViewType		: 'list', // list : 목록, modify : 등록/수정화면
												isUnivComplete		: false,
												isSemesterComplete	: false,
	            		        			   }]
            		},
            		//학점교류신청 취소 IN
            		cancelIn :{
    					searchUnivAreaList	: [{code:"", codeName:"지역 전체"}],
						searchUnivArea		: null,
						searchUnivList		: [{code : "", codeName : "대학교 전체"}],
						searchUniv			: null,
						searchYearList		: [{code : "", codeName : "전체"}],
						searchYear			: null,
						searchSemesterCodeList	: [{code : "", codeName : "전체"}],
						searchSemesterCode	: null,
						searchSubjectGradeCodeList : [{code : "", codeName : "전체"}],
						searchSubjectGradeCode : null,
						searchApplyStatus   : null,
						searchUserUnivAreaList	: [{code:"", codeName:"지역 전체"}],
	                	searchUserUnivArea	: null,
	                	searchUserUnivList	: [{code : "", codeName : "대학교 전체"}],
	                	searchUserUniv		: null,
						searchKey			: null,
						searchType			: "",
						subjectGradeList	: [],
						sort				: '',
						order				: '',
						applyStatusList		: [{code : '1', codeName : "대기"}, {code : '2', codeName : "승인"}, {code : '3', codeName : "반려"}],
						applyExchangeUserList	: [],
						maxRowCnt 			: '10',
						nowPage				: '1',
						totalCnt			: '0',
						isCheckedAll		: false,
						searchYn			: 'N',
						pageViewType		: 'list', // list : 목록, modify : 등록/수정화면
						isUnivComplete		: false,
						isSemesterComplete	: false,
            		},
            		exchangeResultInfo : {},
                	resultPageType : 'in', // in : 수강결과 등록(IN), out : 수강결과 조회(OUT)
                	registScoreInfo : {},
                	scorePageType : 'in', // in : 성적등록(IN), out : 성적조회(OUT)
            		//수강결과 등록(IN) 페이지
	            	resultIn : {
	                	searchUnivAreaList			: [],
	                	searchUnivArea				: null,
	                	searchUnivList				: [{code : "", codeName : "대학교 전체"}],
	                	searchUniv					: null,
	                	searchYearList				: [],
	                	searchYear					: null,
	                	searchSemesterCodeList		: [],
	                	searchSemesterCode			: null,
	                	searchUserUnivAreaList		: [{code:"", codeName:"지역 전체"}],
	                	searchUserUnivArea			: null,
	                	searchUserUnivList			: [{code : "", codeName : "대학교 전체"}],
	                	searchUserUniv				: null,
	                	searchStudentGradeCodeList	: [],
	                	searchStudentGradeCode		: null,
	                	searchType					: null,
	                	searchKey					: null,
	                	sort						: '',
	            		order						: '',
	            		exchangeResultList			: [],
	            		exchangeResultInfo			: {},
	            		maxRowCnt 					: '10',
	            		nowPage						: '1',
	            		totalCnt					: '0',
	            		searchYn					: 'N',
	            		pageViewType				: 'list', // list : 목록, modify : 등록/수정화면
	            		uploader					: null, //파일업로더
	            		isUnivComplete				: false,
	            		isSemesterComplete			: false
	            	},
            		//수강결과 등록(OUT) 페이지
	            	resultOut : {
	                	searchUnivAreaList			: [{code:"", codeName:"지역 전체"}],
	                	searchUnivArea				: null,
	                	searchUnivList				: [{code : "", codeName : "대학교 전체"}],
	                	searchUniv					: null,
	                	searchYearList				: [],
	                	searchYear					: null,
	                	searchSemesterCodeList		: [],
	                	searchSemesterCode			: null,
	                	searchUserUnivAreaList		: [],
	                	searchUserUnivArea			: null,
	                	searchUserUnivList			: [{code : "", codeName : "대학교 전체"}],
	                	searchUserUniv				: null,
	                	searchStudentGradeCodeList	: [],
	                	searchStudentGradeCode		: null,
	                	searchType					: null,
	                	searchKey					: null,
	                	sort						: '',
	            		order						: '',
	            		exchangeResultList			: [],
	            		exchangeResultInfo			: {},
	            		maxRowCnt 					: '10',
	            		nowPage						: '1',
	            		totalCnt					: '0',
	            		searchYn					: 'N',
	            		pageViewType				: 'list', // list : 목록, modify : 등록/수정화면
	            		uploader					: null, //파일업로더
	            		isUnivComplete				: false,
	            		isSemesterComplete			: false
	            	},
	            	//성적등록(IN) 페이지
	            	scoreIn : {
	                	searchUnivAreaList			: [],
	                	searchUnivArea				: null,
	                	searchUnivList				: [{code : "", codeName : "대학교 전체"}],
	                	searchUniv					: null,
	                	searchYearList				: [],
	                	searchYear					: null,
	                	searchSemesterCodeList		: [],
	                	searchSemesterCode			: null,
	                	searchUserUnivAreaList		: [{code:"", codeName:"지역 전체"}],
	                	searchUserUnivArea			: null,
	                	searchUserUnivList			: [{code : "", codeName : "대학교 전체"}],
	                	searchUserUniv				: null,
	                	searchStudentGradeCodeList	: [],
	                	searchStudentGradeCode		: null,
	                	searchType					: null,
	                	searchKey					: null,
	                	sort						: '',
	            		order						: '',
	            		exchangeResultList			: [],
	            		exchangeResultInfo			: {},
	            		maxRowCnt 					: '10',
	            		nowPage						: '1',
	            		totalCnt					: '0',
	            		searchYn					: 'N',
	            		pageViewType				: 'list', // list : 목록, modify : 등록/수정화면
	            		uploader					: null, //파일업로더
	            		isUnivComplete				: false,
	            		isSemesterComplete			: false
	            	},
	            	
            		//성적조회(OUT) 페이지
	            	scoreOut : {
	                	searchUnivAreaList			: [{code:"", codeName:"지역 전체"}],
	                	searchUnivArea				: null,
	                	searchUnivList				: [{code : "", codeName : "대학교 전체"}],
	                	searchUniv					: null,
	                	searchYearList				: [],
	                	searchYear					: null,
	                	searchSemesterCodeList		: [],
	                	searchSemesterCode			: null,
	                	searchUserUnivAreaList		: [],
	                	searchUserUnivArea			: null,
	                	searchUserUnivList			: [{code : "", codeName : "대학교 전체"}],
	                	searchUserUniv				: null,
	                	searchStudentGradeCodeList	: [],
	                	searchStudentGradeCode		: null,
	                	searchType					: null,
	                	searchKey					: null,
	                	gradeUnivName				: '',
	                	sort						: '',
	            		order						: '',
	            		exchangeResultList			: [],
	            		exchangeResultInfo			: {},
	            		maxRowCnt 					: '10',
	            		nowPage						: '1',
	            		totalCnt					: '0',
	            		searchYn					: 'N',
	            		pageViewType				: 'list', // list : 목록, modify : 등록/수정화면
	            		uploader					: null, //파일업로더
	            		isUnivComplete				: false,
	            		isSemesterComplete			: false
	            	},
	            	
	            	studentOut : {
	            		searchUnivAreaList			: [{code:"", codeName:"지역 전체"}],
	                	searchUnivArea				: null,
	                	searchUnivList				: [{code : "", codeName : "대학교 전체"}],
	                	searchUniv					: null,
	                	searchYearList				: [],
	                	searchYear					: null,
	                	searchSemesterCodeList		: [],
	                	searchSemesterCode			: null,
	                	searchUserUnivAreaList		: [],
	                	searchUserUnivArea			: null,
	                	searchUserUnivList			: [{code : "", codeName : "대학교 전체"}],
	                	searchUserUniv				: null,
	                	searchStudentGradeCodeList	: [],
	                	searchStudentGradeCode		: null,
	                	searchType					: null,
	                	searchKey					: null,
	                	sort						: '',
	            		order						: '',
	            		exchangeResultList			: [],
	            		exchangeResultInfo			: {},
	            		maxRowCnt 					: '10',
	            		nowPage						: '1',
	            		totalCnt					: '0',
	            		searchYn					: 'N',
	            		pageViewType				: 'list', // list : 목록, modify : 등록/수정화면
	            		uploader					: null, //파일업로더
	            		isUnivComplete				: false,
	            		isSemesterComplete			: false
	            	},
	            	
	            	studentIn : {
	            		searchUnivAreaList			: [],
	                	searchUnivArea				: null,
	                	searchUnivList				: [{code : "", codeName : "대학교 전체"}],
	                	searchUniv					: null,
	                	searchYearList				: [],
	                	searchYear					: null,
	                	searchSemesterCodeList		: [],
	                	searchSemesterCode			: null,
	                	searchUserUnivAreaList		: [{code:"", codeName:"지역 전체"}],
	                	searchUserUnivArea			: null,
	                	searchUserUnivList			: [{code : "", codeName : "대학교 전체"}],
	                	searchUserUniv				: null,
	                	searchStudentGradeCodeList	: [],
	                	searchStudentGradeCode		: null,
	                	searchType					: null,
	                	searchKey					: null,
	                	sort						: '',
	            		order						: '',
	            		exchangeResultList			: [],
	            		exchangeResultInfo			: {},
	            		maxRowCnt 					: '10',
	            		nowPage						: '1',
	            		totalCnt					: '0',
	            		searchYn					: 'N',
	            		pageViewType				: 'list', // list : 목록, modify : 등록/수정화면
	            		uploader					: null, //파일업로더
	            		isUnivComplete				: false,
	            		isSemesterComplete			: false
	            	},
	            	
            };

        })
        .config(function ($routeProvider, Const) {
            $routeProvider
                .when('/userManagement/management', {templateUrl: Const.contextPath + 'userManagement/management.view', controller: 'userManagementCtrl'})
                .when('/user/modify', {templateUrl: Const.contextPath + 'user/modify.view', controller: 'userModifyCtrl'})
                .when('/user/withdraw', {templateUrl: Const.contextPath + 'user/withdraw.view', controller: 'withdrawMemberCtrl'})
                .when('/university/info', {templateUrl: Const.contextPath + 'university/info.view', controller: 'universityInfoCtrl'})
                .when('/university/mou', {templateUrl: Const.contextPath + 'university/mou.view', controller: 'mouUniversityCtrl'})
                .when('/code/management', {templateUrl: Const.contextPath + 'code/management.view', controller: 'codeManagementCtrl'})
                .when('/menu/management', {templateUrl: Const.contextPath + 'menu/management.view', controller: 'menuManagementCtrl'})
                .when('/semester/management', {templateUrl: Const.contextPath + 'semester/management.view', controller: 'semesterCtrl'})
                .when('/semester/guideManagement', {templateUrl: Const.contextPath + 'semester/guideManagement.view', controller: 'semesterGuideCtrl'})
                .when('/exchange/viewSendAcceptGuide', {templateUrl: Const.contextPath + 'exchange/viewSendAcceptGuide.view', controller: 'semesterAcceptGuideCtrl'})
                .when('/subject/management', {templateUrl: Const.contextPath + 'subject/management.view', controller: 'subjectCtrl'})
                .when('/seminar/seminarList', {templateUrl: Const.contextPath + 'seminar/seminarList.view', controller: 'seminarListCtrl'})
                .when('/seminar/seminarConfirm', {templateUrl: Const.contextPath + 'seminar/seminarConfirm.view', controller: 'seminarConfirmCtrl'})
                .when('/seminar/seminarAttend', {templateUrl: Const.contextPath + 'seminar/seminarAttend.view', controller: 'seminarAttendCtrl'})
                .when('/seminar/contestList', {templateUrl: Const.contextPath + 'seminar/contestList.view', controller: 'contestCtrl'})
                .when('/authority/typeSet', {templateUrl: Const.contextPath + 'authority/managerTypeSetting.view', controller: 'managerTypeSettingCtrl'})
                .when('/authority/authorityGroupList', {templateUrl: Const.contextPath + 'authority/viewGroupList.view', controller: 'authorityGroupListCtrl'})
                .when('/authority/authorityUserList', {templateUrl: Const.contextPath + 'authority/viewAuthUserList.view', controller: 'authorityUserListCtrl'})
                .when('/message/smsSendManagement', {templateUrl: Const.contextPath + 'message/smsSendManagement.view', controller: 'smsSendManagementCtrl'})
                .when('/message/emailSendManagement', {templateUrl: Const.contextPath + 'message/emailSendManagement.view', controller: 'emailSendManagementCtrl'})
                .when('/category/mapping/list', {templateUrl: Const.contextPath + 'category/mapping/list.do', controller: 'catMappingCtrl'})
                .when('/statisticsedx/orgCaseStatList', {templateUrl: Const.contextPath + 'statisticsedx/orgCaseStatList.do', controller: 'catMappingCtrl'})
                .when('/exchange/exchangeConfirmIn', {templateUrl: Const.contextPath + 'exchange/viewConfirmIn.view', controller: 'exchangeConfirmInCtrl'})
                .when('/exchange/exchangeConfirmOut', {templateUrl: Const.contextPath + 'exchange/viewConfirmOut.view', controller: 'exchangeConfirmOutCtrl'})
                .when('/exchange/applyCancelOut', {templateUrl: Const.contextPath + 'exchange/viewApplyCancelOut.view', controller: 'applyCancelOutCtrl'})
                .when('/exchange/applyCancelIn', {templateUrl: Const.contextPath + 'exchange/viewApplyCancelIn.view', controller: 'applyCancelInCtrl'})
                .when('/exchangeResult/viewExchangeResultInList', {templateUrl: Const.contextPath + 'exchangeResult/viewExchangeResultInList.view', controller: 'exchangeResultInCtrl'})
                .when('/exchangeResult/viewExchangeResultOutList', {templateUrl: Const.contextPath + 'exchangeResult/viewExchangeResultOutList.view', controller: 'exchangeResultOutCtrl'})
                .when('/exchangeResult/viewRegistScoreIn', {templateUrl: Const.contextPath + 'exchangeResult/viewRegistScoreIn.view', controller: 'registScoreInCtrl'})
                .when('/exchangeResult/viewRegistScoreOut', {templateUrl: Const.contextPath + 'exchangeResult/viewRegistScoreOut.view', controller: 'registScoreOutCtrl'})
                .when('/exchangeResult/viewStudentHistoryOut', {templateUrl: Const.contextPath + 'exchangeResult/viewStudentHistoryOut.view', controller: 'studentHistoryOutCtrl'})
                .when('/exchangeResult/viewStudentHistoryIn', {templateUrl: Const.contextPath + 'exchangeResult/viewStudentHistoryIn.view', controller: 'studentHistoryInCtrl'})
                .otherwise({redirectTo: '/userManagement/management'});
        })
        .factory('interceptors', function ($rootScope) {
            var loadingLayer = $("#loadingLayer");
            return {
                'request': function (request) {
                    if (!request.noLoading) {
                        $rootScope.httpLoadingCnt++;
                        loadingLayer.show();
                    }
                    return request;
                },
                'response': function (response) {
                    if ($rootScope.httpLoadingCnt > 0) {
                        $rootScope.httpLoadingCnt--;
                    }
                    if ($rootScope.httpLoadingCnt <= 0) {
                        loadingLayer.hide();
                    }
                    return response;
                }
            };
        })
        .factory("fileReader", function($q, $log) {
        	var onLoad = function(reader, deferred, scope) {
        		return function() {
        			scope.$apply(function() {
        				deferred.resolve(reader.result);
        			});
        		};
        	};

        	var onError = function(reader, deferred, scope) {
        		return function() {
        			scope.$apply(function() {
        				deferred.reject(reader.result);
        			});
        		};
        	};

        	var onProgress = function(reader, scope) {
        		return function(event) {
        			scope.$broadcast("fileProgress", {
        				total: event.total,
        				loaded: event.loaded
        			});
        		};
        	};

        	var getReader = function(deferred, scope) {
        		var reader = new FileReader();
        		reader.onload = onLoad(reader, deferred, scope);
        		reader.onerror = onError(reader, deferred, scope);
        		reader.onprogress = onProgress(reader, scope);
        		return reader;
        	};

        	var readAsDataURL = function(file, scope) {
        		var deferred = $q.defer();
        		
        		var reader = getReader(deferred, scope);
        		reader.readAsDataURL(file);

        		return deferred.promise;
        	};

        	return {
        		readAsDataUrl: readAsDataURL
        	};
        })
        .config(['$httpProvider', function ($httpProvider) {
            //initialize get if not there
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }

            // add interceptors add
            $httpProvider.interceptors.push('interceptors');

            // Answer edited to include suggestions from comments
            // because previous version of code introduced browser-related errors

            // disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = new Date().getTime();
            // extra
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

        }])
        .config(function($filterProvider){
        	/**
        	 * 날짜문자열을 지정한 날짜포맷으로 변환함.
        	 * @param orgDate 변환전 날짜문자열
        	 * @param dateFormat 날짜포맷
        	 * @return rsltDate 변환후 날짜문자열
        	 */
        	$filterProvider.register('getDateString', function(){
        		return function(orgDate, dateFormat){
        			var rsltDate = "";
        			if(isNull(orgDate)) return rsltDate;
        			if(orgDate.length == 8){ orgDate = orgDate.substring(0,4)+"-"+orgDate.substring(4,6)+"-"+orgDate.substring(6,8); }
        			var orgDateArr = orgDate.split(" ");
        			orgDateArr[0] = orgDateArr[0].replace(/[.]/gi, '-');
        			orgDate = orgDateArr.join("T");
        			
        			dateFormat = isNull(dateFormat) ? "yyyy-MM-dd hh:mm:ss" : dateFormat;
        			var date = new Date(orgDate);

        			rsltDate = dateFormat.replace(/(YYYY|yyyy|YY|yy|MM|DD|dd|HH24|hh24|HH|hh|MI|mi|mm|SS|ss)/gi, function($obj){
        				switch($obj){
        					case "YYYY" : return date.getFullYear();	//년도 4자리
        					case "yyyy" : return date.getFullYear();	//년도 4자리
        					case "YY" :	return date.getFullYear().substring(2, 4);	//년도 뒷 2자리
        					case "yy" : return date.getFullYear().substring(2, 4);	//년도 뒷 2자리
        					case "MM" : return lpad(date.getMonth()+1, 2);	//월 2자리
        					case "DD" : return lpad(date.getDate(), 2);	//일 2자리
        					case "dd" : return lpad(date.getDate(), 2);	//일 2자리
        					case "HH24" : return lpad(date.getMonth(), 2);	// 시간 2자리 (0~24)
        					case "hh24" : return lpad(date.getMonth(), 2);	// 시간 2자리 (0~24)
        					case "HH" : return lpad(date.getHours(), 2);	// 시간 2자리 (0~24)
        					case "hh" : return lpad(date.getHours() % 12, 2); // 시간 2자리 (0~12)
        					case "MI" : return lpad(date.getMinutes(), 2); // 분 2자리
        					case "mi" : return lpad(date.getMinutes(), 2); // 분 2자리
        					case "mm" : return lpad(date.getMinutes(), 2); // 분 2자리
        					case "SS" : return lpad(date.getSeconds(), 2); // 초 2자리
        					case "ss" : return lpad(date.getSeconds(), 2); // 초 2자리
        				}
        			});
        			return rsltDate;
        		}
        	});
        })
        .config(function($filterProvider){
        	/**
        	 * 'hhmm' 형식의 문자열을 'hh:mm' 형식으로 변환
        	 * @param time 변환전 문자열
        	 * @param format 날짜 포맷
        	 * @return 변환 후 문자열
        	 */
        	$filterProvider.register('formatTime', function($filter){
        		return function(time, format){
        		    var date = new Date(0, 0, 0, time.substring(0, 2), time.substring(2, 4));
        		    return $filter('date')(date, format || 'hh:mm');
        		}
        	});
        })
;})());