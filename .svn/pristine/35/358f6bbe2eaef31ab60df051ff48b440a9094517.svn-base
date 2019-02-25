<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%
    long timestamp = System.currentTimeMillis();
%>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>공유대학포탈_회원관리_회원목록</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta name="description" content="" />
    <meta property="og:description" content="" />

    <jsp:include page="/resourcesLoad.jsp?t=<%=timestamp%>" flush="true" />

    <!-- Controller Load -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/userManagementCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/userModifyCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/withdrawMemberCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/codeManagementCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/menuManagementCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/universityInfoCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/mouUniversityCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/semesterCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/semesterGuideCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/semesterAcceptGuideCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/subjectCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/seminarListCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/seminarConfirmCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/seminarAttendCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/contestCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/managerTypeSettingCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/authorityGroupListCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/authorityUserListCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/smsSendManagementCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/emailSendManagementCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/catMappingCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/exchangeConfirmInCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/exchangeConfirmOutCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/applyCancelInCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/applyCancelOutCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/exchangeResultInCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/exchangeResultOutCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/studentHistoryInCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/studentHistoryOutCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/registScoreInCtrl.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/controller/registScoreOutCtrl.js?t=<%=timestamp%>"></script>

    <!-- Service Load -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/userService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/userManagementService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/codeService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/menuService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/universityService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/semesterService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/semesterGuideService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/semesterAcceptGuideService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/subjectService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/seminarService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/authorityService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/smsSendManagementService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/emailSendManagementService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/exchangeConfirmInService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/exchangeConfirmOutService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/applyCancelInService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/applyCancelOutService.js?t=<%=timestamp%>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/service/exchangeResultService.js?t=<%=timestamp%>"></script>

    <style>
        .btn_duplicate,
        .btn_garbage,
        .btn_create, .btn_create2,
        .div_draging .btn_addParabox,.btn_tabclose{min-width:auto;padding:0;}
        .pop-loading{position:fixed; top:0; left:0;width:100%;height:100%;background:rgba(255,255,255,0.8);z-index:99999;text-align:center;display: none;}
        .pop-loading div{position:absolute; top:50%; left:50%;margin-top:-70px;margin-left:-70px;}
    </style>

    <script type="text/javascript">
        angular.module('appModule').controller('mainController', function($scope, userService, $location, ngDialog, Const, $cookies, commonService, $httpParamSerializer, $http) {
            /** 사용자 세션 정보를 root scope에 저장 **/
            commonService.setUserSessionInRootScope();

            /** 화면 상단 tab 목록 **/
            $scope.pageTabList = [];
            
            /** 비밀번호 변경 변수**/
            $scope.oldUserPwd = null;
            $scope.userPwd = null;
            $scope.confirmUserPwd = null;

            /** 화면 상단 tab 목록에 메뉴를 추가한다. **/
            $scope.pageTabAdd = function(menu) {
                $scope.pageTabList.push(menu);
            };

            $scope.pageTabDelete = function(menu, index) {
                if ($scope.nowMenuSeq === menu.menuSeq) {
                    if (index === ($scope.pageTabList.length - 1)) {
                        $scope.menuClick($scope.pageTabList[index - 1]);
                    } else {
                        $scope.menuClick($scope.pageTabList[index + 1]);
                    }
                }

                $scope.pageTabList.splice(index, 1);
            };

            /** 사용자별 메뉴 목록 조회 **/
            userService.getMenuList(function(data) {
                console.log(data);
                $scope.userMenuList = data.menuList;

                console.log('menu length => ', data.menuList.length);
                if (data.menuList.length === 0) {
                    commonService.alert('사용하실 수 있는 메뉴가 없습니다.', function() {
                        location.href = Const.contextPath + 'login/login.do';
                    });
                    return;
                }

                var routePathMenu = null;
                var mainMenu = null;

                // 진입시 기본 메뉴를 설정
                $scope.userMenuList.forEach(function(obj) {
                	if(!isNull(obj.subMenuList)){
	                    obj.subMenuList.forEach(function (menu) {
	                        if (menu.menuUrl === $location.path()) {
	                            routePathMenu = menu;
	                        } else if (menu.mainYn === "Y") {
	                            mainMenu = menu;
	                        }
	                    });
                	}
                });

                // 초기 보여질 페이지 설정
                if (routePathMenu) {
                    $scope.nowParentMenuSeq = routePathMenu.parentSeq;
                    $scope.nowMenuSeq = routePathMenu.menuSeq;
                    $scope.pageTabAdd(routePathMenu);
                } else {
                    $scope.nowParentMenuSeq = mainMenu.parentSeq;
                    $scope.nowMenuSeq = mainMenu.menuSeq;
                    $scope.pageTabAdd(mainMenu);
                }
            });

            /**
             * 상위 메뉴를 클릭시 이벤트
             * @param menu 메뉴 객체
             */
            $scope.parentMenuClick = function(menu) {
                console.log('parent menu => ', menu);
                $scope.nowParentMenuSeq = menu.menuSeq;
            };

            /**
             * 메뉴 클릭시 이벤트
             * @param menu
             */
            $scope.menuClick = function(menu) {
                console.log(menu);


                // 상단 tab 메뉴에 등록이 안된 메뉴일 경우 추가 한다.
                if ($.inArray(menu, $scope.pageTabList) === -1) {
                    if ($scope.pageTabList.length >= 10) {
                        commonService.alert('열려있는 탭이 너무 많아 더이상 메뉴를 이동할 수 없습니다.\n탭을 닫으신 후 다시 시도해 주세요.');
                        return;
                    }

                    $scope.pageTabAdd(menu);
                }

                // 현재 페이지를 클릭한 메뉴로 설정
                $scope.nowMenuSeq = menu.menuSeq;
                $scope.nowParentMenuSeq = menu.parentSeq;

                // 컨텐츠 페이지 변경
                $location.url(menu.menuUrl);
            };
            
			if("${userSession.pwdNeedToChgYn}" === "Y" && nvltoStr($cookies.get("pwdChangeHold"),"").toLowerCase() != "true"){
            	ngDialog.open({
                    template: Const.contextPath + 'common/pwdChangePop.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 476,
                    controller: function($scope, commonService, $cookies) {
                    	$scope.oldUserPwd = null;
						$scope.userPwd = null;
						$scope.confirmUserPwd = null;
						
						
                        $scope.updateUserPwd = function() {
                        	if(isNull($scope.oldUserPwd)){
                    			commonService.alert("현재 비밀번호를 입력해주세요.", $("[ng-model='oldUserPwd']").focus());
                    			return false;
                    		}
                        	
                        	if(isNull($scope.userPwd)){
                    			commonService.alert("비밀번호를 입력해주세요.", $("[ng-model='userPwd']").focus());
                    			return false;
                    		}else{
                    			var numCnt = $scope.userPwd.search(/[0-9]/g); //비밀번호 숫자 카운트
                    	        var chrCnt = $scope.userPwd.search(/[a-z]/ig);	//비밀번호 영문 소문자 카운트
                    	        var uppChrCnt = $scope.userPwd.search(/[A-Z]/ig); //비밀번호 영문 대문자 카운트
                    	        var specialCnt = $scope.userPwd.search(/[`~!@#$%^&*()_\-+=|\\\'\";:\/?<>,.]/gi); //비밀번호 특수문자 카운트
                    	        
                    	        var totCnt = $scope.userPwd.length// 비밀번호길이
                    			
                	        	if(numCnt < 0 || (chrCnt+uppChrCnt) < 0 || specialCnt < 0 || totCnt < 10){
                	        		commonService.alert("새 비밀번호는 영문, 숫자, 특수문자를 포함한 10~15자로 입력해주세요.", $("[ng-model='userPwd']").focus());
                        			return false;
                	        	}
                    		}
                    		
                    		if(isNull($scope.confirmUserPwd)){
                    			commonService.alert("새 비밀번호를 재입력해주세요.", $("[ng-model='confirmUserPwd']").focus());
                    			return false;
                    		}else{
                    			if($scope.userPwd != $scope.confirmUserPwd){
                    				commonService.alert("비밀번호가 일치하지 않습니다.", $("[ng-model='confirmUserPwd']").focus());
                        			return false;
                    			}
                    		}
                        	
                    		var param = {
    								oldUserPwd : $scope.oldUserPwd,
    								userPwd : $scope.userPwd,
    								confirmUserPwd : $scope.confirmUserPwd
    						};
                        	
                           	userService.updateUserPwd(param, function(data){
                           		if(isNull(data.resultDetail)){
                           			commonService.alert("비밀번호가 변경되었습니다.", function(){
                           				var date = new Date();
                                    	date.setDate(date.getDate()+7);
                                    	$cookies.put("pwdChangeHold", true, {path:"/admin", expires:date.toGMTString()});
                           				window.location.reload();
	                           			//$scope.closeThisDialog();
	                           		});
                           		}else{
                           			if(data.resultDetail.resultCode == "PC00"){
                           				commonService.alert("현재 비밀번호가 일치하지 않습니다.\n다시 입력해 주세요.", function(){
	                           				$("[ng-model='oldUserPwd']").focus();
	                           			});
                           			}
                           		}
                           	});
                        };
                        
                        $scope.pwdChangeHold = function() {
                        	var date = new Date();
                        	date.setDate(date.getDate()+7);
                        	$cookies.put("pwdChangeHold", true, {path:"/", expires:date.toGMTString()});
                        	$scope.closeThisDialog();
                        };
                        
                        
                        $scope.closeLayerPopup = function() {
                        	$scope.closeThisDialog();
                        }
                    }
                });
			}

            /**
             * 계정전환 클릭 이벤트
             */
			$scope.changeAccountClick = function() {
                ngDialog.open({
                    template: Const.contextPath + 'html/changeAccount.html',
                    showClose: false,
                    closeByDocument: false,
                    width:1200,
                    controller: function($scope, $rootScope, userManagementService) {
                        $scope.searchNowPage = 1;
                        $scope.sortField = 'univName';
                        $scope.order = 'asc';
                        var isInit = true;

                        /** 지역 코드 가져오기 **/
                        commonService.getCodeList(Const.code.UNIVERSITY_ROOT, function(data) {
                            if (data.codeList.length) {
                                $scope.areaCodeList = data.codeList;
                                if (Const.code.USER_TYPE_SUPER !== $rootScope.userSession.userType) {
                                    $scope.selectAreaCode = $rootScope.userSession.univAreaCd;
                                    $("[ng-model='selectAreaCode']").attr("disabled", true);
                                    getUnivCodeList();
                                } else {
                                    $scope.searchUser();
                                }
                            } else {
                                $scope.areaCodeList = [];
                                if (Const.code.USER_TYPE_SUPER === $rootScope.userSession.userType) {
                                    $scope.searchUser();
                                }
                            }
                        });

                        /** 대학교 목록 조회 **/
                        var getUnivCodeList = function() {
                            if ($scope.selectAreaCode) {
                                commonService.getCodeList($scope.selectAreaCode, function(data) {
                                    console.log('univCode list=>', data);
                                    if (data.codeList.length) {
                                        $scope.univCodeList = data.codeList;
                                        if (Const.code.USER_TYPE_SUPER !== $rootScope.userSession.userType) {
                                            $scope.selectUnivCode = $rootScope.userSession.univCode;
                                            $("[ng-model='selectUnivCode']").attr("disabled", true);
                                        } else {
                                            $scope.selectUnivCode = '';
                                        }
                                    } else {
                                        $scope.univCodeList = [];
                                        $scope.selectUnivCode = '';
                                    }

                                    if (isInit) {
                                        $scope.searchUser();
                                    }
                                });
                            } else {
                                $scope.selectUnivCode = '';
                                if (isInit) {
                                    $scope.searchUser();
                                }
                            }
                        };

                        /** 지역 변경시 이벤트 처리 **/
                        $scope.$watch('selectAreaCode', function(newVal) {
                            if(isInit) {
                                return;
                            }

                            if (newVal) {
                                $scope.selectAreaCode = newVal;
                            } else {
                                $scope.selectAreaCode = '';
                            }

                            console.log('areaCode => ', newVal);
                            getUnivCodeList();
                        });

                        /** 검색조건 초기화 **/
                        $scope.clearSearchParam = function() {
                            if (Const.code.USER_TYPE_SUPER === $rootScope.userSession.userType) {
                                $scope.selectUnivCode = '';
                                $scope.selectAreaCode = '';
                            }

                            $scope.searchUserType = '';
                            $scope.searchKeyword = '';
                        };

                        /** 조회 **/
                        $scope.searchUser = function() {
                            if(isInit) {
                                $scope.clearSearchParam();
                            }

                            var userTypeArr = [];
                            if ($scope.searchUserType === 'S') {
                                userTypeArr.push(Const.code.USER_TYPE_STUDENT);
                            } else if ($scope.searchUserType === 'L') {
                                userTypeArr.push(Const.code.USER_TYPE_CITIZEN);
                            } else {
                                userTypeArr.push(Const.code.USER_TYPE_STUDENT);
                                userTypeArr.push(Const.code.USER_TYPE_CITIZEN);
                            }

                            var params = {
                                userTypeArr: userTypeArr,
                                searchUniv: $scope.selectUnivCode,
                                searchUnivArea: $scope.selectAreaCode,
                                searchKeyType: 'idAndName',
                                searchKey: $scope.searchKeyword,
                                nowPage: $scope.searchNowPage,
                                rowCnt: 10,
                                sort: $scope.sortField,
                                order: $scope.order
                            };

                            userManagementService.selectUserList(params, function(data) {
                                if (data.userList.length) {
                                    $scope.userList = data.userList;
                                    $scope.totalCnt = data.userList[0].totalCnt;
                                } else {
                                    $scope.userList = [];
                                    $scope.totalCnt = 0;
                                }

                                if(isInit){
                                    $("#changeAccountPaging").createPaging({
                                        totalCnt: $scope.totalCnt,
                                        nowPage: $scope.searchNowPage,
                                        maxRowCnt: 10,
                                        showPageCnt: 10,
                                        clickEvent: function(pageTargetId, pageNum) {
                                            $scope.searchNowPage = pageNum;
                                            $scope.searchUser();
                                        }
                                    });
                                    isInit = false;
                                } else {
                                    pagingUtils.changePaging('changeAccountPaging', $scope.searchNowPage, $scope.totalCnt);
                                }
                            });
                        };

                        /** 정렬 기준 변경 **/
                        $scope.sortFieldClick = function(fieldName) {
                            if (fieldName === $scope.sortField) {
                                $scope.order = $scope.order === 'asc' ? 'desc' : 'asc';
                            } else {
                                $scope.sortField = fieldName;
                                $scope.order = 'asc';
                            }

                            $scope.searchUser();
                        };

                        /** 조회 버튼 클릭 이벤트 **/
                        $scope.searchBtnClick = function() {
                            $scope.searchNowPage = 1;
                            $scope.searchUser();
                        };

                        /** 계정 전환 **/
                        $scope.changeAccountToUser = function(user) {
                            var params = {
                                id: 'admin',
                                RelayState: ''
                            };

                            $http({
                                method: 'POST',
                                url: 'https://sso.sfup.or.kr/svc/tk/SLO.do',
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                dataType : 'json',
                                data :$httpParamSerializer(params)
                            }).then(function success(response) {
                                $("#changeAccountForm > input[name='userId']").val(user.userId);
                                $("#changeAccountForm > input[name='userSeq']").val(user.userSeq);
                                $("#changeAccountForm").submit();
                            }, function error(response) {
                                commonService.etcError(response);
                            })
                        }
                    }
                });
            };
        });
 
        $(document).ready(function(){
        	<c:if test="${session eq null}">
        	window.location.href = "${pageContext.request.contextPath}/login/logout.do";
       		</c:if>
        });

        // window.onbeforeunload = function() {
        //     return "Are you sure you want to refresh? Think of the kittens!";
        // }
    </script>
</head>
<body ng-app="appModule" ng-controller="mainController">

<div id="loadingLayer" class="pop-loading">
    <div>
        <img src="${pageContext.request.contextPath}/images/common/spinningwheel.gif" />
    </div>
</div>

<div class="wrap">
    <!-- 상단 레이어 -->
    <header>
        <div class="top_area">
            <div class="global_navi">
                <ul class="clfix">
                	<li class="gbnv_0 radiBtn"><a title="OPEN EDX" href="${pageContext.request.contextPath}/statisticsedx/orgCaseStatList.do" target="_blank">EDX</a></li>
                    <li class="gbnv_1"><a href="javascript:;" title="로그인"><span>${session.userName}</span>님(${session.userTypeName}) 환영합니다.</a></li>
                    <li class="gbnv_2 radiBtn"><a href="javascript:;" title="Portal">Portal</a></li>
                    <li class="gbnv_3 radiBtn"><a href="${pageContext.request.contextPath}/login/logout.do" title="Logout">Logout</a></li>
                    <li class="gbnv_4 radiBtn"><a ng-click="changeAccountClick();" title="계정전환">계정전환</a></li>
                </ul>
            </div>

            <h1 class="logo">
                <a title="공유대학포탈">공유대학포탈</a>
            </h1>
            <div class="pageTit">
                <a title="CMS 관리자">CMS 관리자</a>
            </div>
        </div>
    </header>

    <div id="container">
        <div class="contents">
            <div class="conBox">
                <div id="content" class="total_content">
                    <div class="content_wrap">
                        <div class="content_layout">
                            <!-- Left Contents -->
                            <div class="cont_left">
                                <h5 class="lTitle">ADMIN</h5>
                                <div class="dragToggle">
                                    <ul class="acco_opened">
                                        <li ng-repeat="obj in userMenuList | orderBy:'menu.menuIndex'">
                                            <div class="opener" ng-class="{active:nowParentMenuSeq === obj.menu.menuSeq}" ng-click="parentMenuClick(obj.menu);">
                                                <a class="acco_act" ng-class="{active:nowParentMenuSeq === obj.menu.menuSeq}"></a>
                                                <span>{{obj.menu.menuName}}</span>
                                            </div>
                                            <div class="hidden_div" slide-show="nowParentMenuSeq === obj.menu.menuSeq"> <!-- style="display:block;" -->
                                                <ul class="acco_opened para_contain-dp2-1" id="para_box_dep2-1">
                                                    <!-- 세부 메뉴 -->
                                                    <li ng-repeat="sub in obj.subMenuList | orderBy:menuIndex" ng-click="menuClick(sub);">
                                                        <div class="">
                                                            <span class="acco_dot" ng-class="{active:nowMenuSeq === sub.menuSeq}">{{sub.menuName}}</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!--// Left Contents -->

                            <!-- Right Contents -->
                            <div class="cont_right">
                                <div class="cont_bar">
                                    <div class="left_menu">
                                        <p>
                                            <button type="button" title="메뉴닫기" class="btn btn_lnm_close menuLBtn"
                                                    onclick="toggleLmenu(this, '.cont_left');return false;">
                                                <span>메뉴</span></button>
                                        </p>
                                    </div>
                                    <!-- 상단 Tab Layer -->
                                    <div class="right_menu">
                                        <div class="tab_list">
                                            <div ng-repeat="menu in pageTabList" ng-class="{current:nowMenuSeq === menu.menuSeq}">
                                                <a title="{{menu.menuName}}" ng-click="menuClick(menu);">
                                                    <span>{{menu.menuName}}</span>
                                                </a>
                                                <button type="button" title="삭제" class="btn menuRBtn btn_tabclose" ng-click="pageTabDelete(menu, $index);" ng-show="pageTabList.length > 1">
                                                    <span>삭제</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <!--// 상단 Tab Layer -->
                                </div>

                                <!-- 본문 -->
                                <div id="ngViewField" class="rightConBoxing" ng-view></div>
                            </div>
                            <!--// Right Contents -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<form id="changeAccountForm" action="${pageContext.request.contextPath}/main/change/account.do" target="_blank" method="POST">
    <input type="hidden" name="userId">
    <input type="hidden" name="userSeq">
</form>

</body>
</html>
