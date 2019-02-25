((function() {
    angular.module('appModule')
        .controller('smsSendManagementCtrl', function($scope, $rootScope, smsSendManagementService, userService, commonService, Const, ngDialog) {
        	$rootScope.message.smsSendManagement.scope = $scope;
        	console.log("$rootScope.message =>",$rootScope.message);
        	/**
        	 * 탭 변경
        	 */
            $scope.changeTab = function(tabIdx){
            	$rootScope.message.smsSendManagement.nowMgmtTab = tabIdx*1;
            	var pageType = $rootScope.message.smsSendManagement.pageTypeArr[$rootScope.message.smsSendManagement.nowMgmtTab];
            	$rootScope.message.smsSendManagement.pageType = pageType;
            	
            	if($rootScope.message.smsSendManagement[pageType].searchYn != "Y"){
            		$scope.searchResult(false);
//            		$scope.search(pageType, true);
            	}
            };
            
            /**
             * sms 제목 글자수 체크 15자
             */
            $("#input-sms-title").on("keyup", function() {
                if($(this).val().length >= 15) {
                	$(this).val($(this).val().substring(0, 14));
                	commonService.alert("15자 이상 입력할 수 없습니다.");
                	return;
                }
            });
            
            $("[ng-model='$root.message.smsSendManagement.smsInfo.sendDate']").datepicker(getDatePickerConfig("dateField"));
            
            /**
             * 이미지 추가 
             */
            $scope.addImgPopup = function() {
            	ngDialog.open({
                    template: Const.contextPath + 'html/message/smsAddImgPopup.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 640,
                    controller: function($rootScope, $scope, smsSendManagementService, commonService, $cookies, Const, FileUploader) {

                    	var w = $rootScope.message.smsSendManagement.smsInfo.imgWidth = '320';
                    	
                    	/**
                         * 썸네일 업로더 설정
                         */	
                        if (!$rootScope.message.smsSendManagement.uploader) {
                            $rootScope.message.smsSendManagement.uploader = new FileUploader({
                                url: Const.contextPath + 'message/uploadSmsImage.ajax',
                                filters: [
                                    {
                                        name: 'fileSizeFilter',
                                        fn: function (file) {
                                            console.log('file => ', file);
                                            if (file.size > 204800) {
                                                commonService.alert('업로드 파일 용량은 200KB 이하만 가능합니다.');
                                                $scope.fileSize = false;
                                                $rootScope.message.smsSendManagement.smsInfo.haveImage = false;
                                                return false;
                                            } else {
                                            	$scope.fileSize = true;
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
                                                        isAllow = true;
                                                        break;
                                                }
                                            }

                                            if (!isAllow) {
                                                commonService.alert('통신사 정책에 의해 이미지는 JPG, JPEG 파일만 발송 가능합니다.');
                                                $rootScope.message.smsSendManagement.smsInfo.haveImage = false;
                                            }

                                            return isAllow;
                                        }
                                    }
                                ], onBeforeAddQueue: function (files, options, filters) {
                                    if (this.queue.length !== 0 && files.length > 0) {
                                        this.clearQueue();
                                    }

                                    this.addToQueue(files, options, filters);
                                    console.log('queue => ', this.queue);
                                }
                            });
                        }
                        
                        /**
                         * 서버에 사진 업로드
                         */
                        $scope.uploadImage = function() {
                        	 if ($rootScope.message.smsSendManagement.uploader.queue.length) {
         	                	$rootScope.message.smsSendManagement.uploader.formData = [];
         	                    var item = $rootScope.message.smsSendManagement.uploader.queue[0];
         	                    item.formData.push({width	: w});
         	                    
//         	                    item.onSuccess = function(response, status) {
//         	                    	console.log(response);
//         	                    };
         	                    item.onError = function(response, status) {
         	                        console.error('logo upload error status => ', status);
         	                        commonService.etcError(response);
         	                    };
         	                    commonService.confirm('저장 하시겠습니까?', function(data) {
         	                    	item.upload();
         	                    	item.onComplete = function(response, status, headers) {
         	                    		$rootScope.message.smsSendManagement.smsInfo.imageFileKey = response.logKey;
         	                    	}
         	                    });
         	                }
                        };
                        
                        $scope.closeLayerPopup = function(haveImage) {
                        	$rootScope.message.smsSendManagement.smsInfo.haveImage = haveImage;
                        	if (haveImage === false) {
                        		$rootScope.message.smsSendManagement.uploader = null;
                        	}
                        	else {
                        		if(!$rootScope.message.smsSendManagement.uploader.queue.length) {
                        			commonService.alert('이미지를 등록해 주세요.');
                        			return;
                        		}
                        	}
                        	$scope.closeThisDialog();
                        };
                    }
                });
            }
           
            /**
             * 이미지 삭제
             */
            $scope.removeImg = function() {
            	$rootScope.message.smsSendManagement.uploader = null;
            	$rootScope.message.smsSendManagement.smsInfo.imgSrc = null;
            	$rootScope.message.smsSendManagement.smsInfo.haveImage = false;
            	$('#thumb-img').attr('src', null);
            }
            
            /**
             * 이모티콘 입력창
             */
            $scope.emojiPopup = function() {
            	$('.specialWrap').css('display', 'block');
            	$scope.addChar = function(char) {
            		if($('.emo').hasClass('_active')) {
            			$('.emo').removeClass('_active');
            		}
            		$('#'+char).addClass('_active');
            		
            		$('#ta-sms').val(function(i, text) {
            			$rootScope.message.smsSendManagement.smsInfo.content += char
            		    return text + char;
            		});
            	}
            }
            
            /**
             * 이모티콘 창 닫기
             */
            $scope.emojiClose = function() {
            	$('.specialWrap').css('display', 'none');
            	$('.emo').removeClass('_active');
            }
            
            /**
             * text-area 초기화
             */
            $scope.replaceTextArea = function() {
            	$('#ta-sms').val('');
            }
            
            /**
             * 받는사람 추가 버튼
             * 
             */
            $scope.addSender = function() {
            	ngDialog.open({
                    template: Const.contextPath + 'html/message/smsMessageSenderPopup.html',
                    showClose: false,
                    closeByDocument: false,
                    width: 1400,
                    controller: function($rootScope, $scope, smsSendManagementService, commonService, $cookies, Const, FileUploader) {
                    	
                    	/**
                    	 * 탭 변경
                    	 */
                        $scope.changeTab = function(tabIdx){
                        	$rootScope.message.smsSendManagement.senderList.nowSenderTab = tabIdx*1;
                        	var pageType = $rootScope.message.smsSendManagement.senderList.pageTypeArr[$rootScope.message.smsSendManagement.senderList.nowSenderTab];
                        	$rootScope.message.smsSendManagement.senderList.pageType = pageType;
                        	
                        	if($rootScope.message.smsSendManagement.senderList[pageType].searchYn != "Y"){
                        		$scope.search(pageType, true);
                        	}
                        };
                        
                    	/**
                    	 * 받는사람 목록 조회
                    	 * @param pageType String
                    	 * @param redrawPage boolean (페이징영역 설정값 초기화 및 재구성 여부)
                    	 */
                    	$scope.search = function(redrawPage){
                    		var param = {
                	        	searchUnivArea			:	$rootScope.message.smsSendManagement.senderList.searchUnivArea,
                	        	searchUniv				:	$rootScope.message.smsSendManagement.senderList.searchUniv,
                	        	searchYear 				:	$rootScope.message.smsSendManagement.senderList.searchYear,
                	        	searchSemesterCode		:	$rootScope.message.smsSendManagement.senderList.searchSemesterCode,
                	        	searchUserUnivArea		:	$rootScope.message.smsSendManagement.senderList.searchUserUnivArea,
                	        	searchUserUniv			:	$rootScope.message.smsSendManagement.senderList.searchUserUniv,
                	        	searchType				:	$rootScope.message.smsSendManagement.senderList.searchType,
                	        	searchKey				:	$rootScope.message.smsSendManagement.senderList.searchKey,
                	        	sort					:	$rootScope.message.smsSendManagement.senderList.sort,
                	        	order					:	$rootScope.message.smsSendManagement.senderList.order,
                	        	//isPaging				: 	'Y',
                	        	nowPage					:	isNull(pagingGlobalVar["senderListPaging"]) || redrawPage ? 1 : pagingGlobalVar["senderListPaging"].nowPage,
                	        	rowCnt					:	$rootScope.message.smsSendManagement.senderList.maxRowCnt,
                    		};
                    		
                    		smsSendManagementService.getSenderList(param, function(data){
                    			$rootScope.message.smsSendManagement.senderList.searchYn = "Y";
            					$rootScope.message.smsSendManagement.senderList.senderListExIn = data.senderList;
//            					console.log(data);
            					if(data.senderList.length > 0){
            						var totCnt = data.senderList[0].totalCnt*1;
            						var nowPage = $rootScope.message.smsSendManagement.senderList.nowPage*1;
            						var maxRowCnt = $rootScope.message.smsSendManagement.senderList.maxRowCnt*1;
            						$rootScope.message.smsSendManagement.senderList.totalCnt = totCnt;
            						var maxPage = (totCnt/maxRowCnt)+1;
            						if(nowPage > maxPage){
            							nowPage = maxPage;
            							$rootScope.message.smsSendManagement.senderList.nowPage = nowPage;
            						}
            						
            						//paging 유무 확인 후 없으면 paging영역 재구성 
            						if(isNull(pagingGlobalVar["senderListPaging"]) || redrawPage){
            							$("#senderListPaging").html("");
            							$("#senderListPaging").createPaging({
            								totalCnt: totCnt,
            			                    nowPage: nowPage,
            			                    maxRowCnt: maxRowCnt,
            			                    showPageCnt: 10,
            			                    clickEvent: function(pageTrgtId, pageNum) {
            			                        pagingUtils.changePaging(pageTrgtId, pageNum, totCnt);
            			                        $scope.search();// 페이지 번호 선택시 재검색.
            			                    }
            							});
            		        		}
            					}else{
            						$rootScope.message.smsSendManagement.senderList.totalCnt = 0;
            					}
                    		});
                    	};
                    	
                    	/**
                         * 회원 목록 전체 체크박스 컨트롤
                         */
                    	$scope.checkAllUserList = function(pageType){
                    		$.each($rootScope.message.smsSendManagement[pageType].senderListExIn, function(i){
                    			$rootScope.message.smsSendManagement[pageType].senderListExIn[i].isChecked = $rootScope.message.smsSendManagement[pageType].isCheckedAll;
                        	});
                        };
                        $scope.checkUserList = function(pageType){
                        	var isCheckedAll = true;
                        	$.each($rootScope.message.smsSendManagement[pageType].senderListExIn, function(i){
                        		if(!$rootScope.message.smsSendManagement[pageType].senderListExIn[i].isChecked){
                        			isCheckedAll = false;
                        		}
                        	});
                        	$rootScope.message.smsSendManagement[pageType].isCheckedAll = isCheckedAll;
                        };

                        $scope.getCheckedUserSeqList = function(pageType, all){
                        	var stuNoList = $rootScope.message.smsSendManagement[pageType].stuNoList = [];
                			
                        	if (!all) {
                    			$.each($rootScope.message.smsSendManagement[pageType].senderListExIn, function(i){
                            		if($rootScope.message.smsSendManagement[pageType].senderListExIn[i].isChecked){
                            			stuNoList.push($rootScope.message.smsSendManagement[pageType].senderListExIn[i].studentNumber);
                            		}
                            	});
                        	}
                        	else {
                        		$.each($rootScope.message.smsSendManagement[pageType].senderListExIn, function(i){
                        			stuNoList.push($rootScope.message.smsSendManagement[pageType].senderListExIn[i].studentNumber);
                            	});
                        		
                        	}
                			stuNoList = stuNoList.slice().sort(function(a,b){return a - b}).reduce(function(a,b){if (a.slice(-1)[0] !== b) a.push(b);return a;},[]);
                			var param = { studentNumber		:	stuNoList }
                			$scope.closeThisDialog();
                			
                			smsSendManagementService.getCheckedSenderList(param, function(data) {
            					$rootScope.message.smsSendManagement.smsSendList.checkedSenderList = data.senderList;
                			});
                        };
            			
                    	$scope.search(true);
                    }
            	});
            }
            
            /**
             * 회원 목록 전체 체크박스 컨트롤
             */
        	$scope.chkAll = function(){
        		$.each($rootScope.message.smsSendManagement.smsSendList.checkedSenderList, function(i){
        			$rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].isChecked = $rootScope.message.smsSendManagement.smsSendList.isCheckedAll;
            	});
            };
            $scope.chkUser = function(){
            	var isCheckedAll = true;
            	$.each($rootScope.message.smsSendManagement.smsSendList.checkedSenderList, function(i){
            		if(!$rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].isChecked){
            			isCheckedAll = false;
            		}
            	});
            	$rootScope.message.smsSendManagement.smsSendList.isCheckedAll = isCheckedAll;
            }
            
            /**
             * 선택 삭제
             */
            $scope.delChked = function() {
            	if($rootScope.message.smsSendManagement.smsSendList.checkedSenderList.length > 0) {
            		$.each($rootScope.message.smsSendManagement.smsSendList.checkedSenderList, function(i) {
                		if($rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].isChecked) {
                			$rootScope.message.smsSendManagement.smsSendList.checkedSenderList 
                				= $.grep($rootScope.message.smsSendManagement.smsSendList.checkedSenderList, 
                							function(value) { return value != $rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i]; });
                		}
                		console.log($rootScope.message.smsSendManagement.smsSendList.checkedSenderList.length );
                	});
            	}
            	else if($rootScope.message.smsSendManagement.smsSendList.checkedSenderList.length === 0) {
            		$rootScope.message.smsSendManagement.smsSendList.checkedSenderList.splice(0, $rootScope.message.smsSendManagement.smsSendList.checkedSenderList.length);
            	}
            	else {
            		commonService.alert('삭제할 대상이 없습니다.');
            	}
            }
            
            /**
             * 전체 삭제
             */
            $scope.delAllChked = function() {
            	if($rootScope.message.smsSendManagement.smsSendList.checkedSenderList.length > 0) {
            		$rootScope.message.smsSendManagement.smsSendList.checkedSenderList.splice(0, $rootScope.message.smsSendManagement.smsSendList.checkedSenderList.length);
            	}
            	else {
            		commonService.alert('삭제할 대상이 없습니다.');
            	}
            }
            
            /**
             * 메시지 전송
             */
            $scope.sendSms = function() {
            	if($rootScope.message.smsSendManagement.smsSendList.checkedSenderList !== undefined) {
            		$.each($rootScope.message.smsSendManagement.smsSendList.checkedSenderList, function(i) {
            			if($rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].cellNo !== undefined) {
            				var toPhone = $rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].cellNo.split('-')[0];
                			var toPhone1 = $rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].cellNo.split('-')[1];
                			var toPhone2 = $rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].cellNo.split('-')[2];
            			}
            			
            			var param = {
                    			title 		:   $rootScope.message.smsSendManagement.smsInfo.title,
                    			content 	: 	$rootScope.message.smsSendManagement.smsInfo.content,
                    			reqDate		:	$rootScope.message.smsSendManagement.smsInfo.sendDate,
                    			toName		:	$rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].userName,
                    			mouStNum	:	$rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].mouStudentNumber,
                    			toPhone		:	toPhone + toPhone1 + toPhone2,		// 수신자 번호
                    			fromPhone	:	'021234567',	// 발신자 번호
                    			userSeq		:	$rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].userSeq, 
                    			univCode	:	$rootScope.message.smsSendManagement.smsSendList.checkedSenderList[i].userUnivCode, 
                    			regUserSeq	:	$rootScope.userSession.userSeq,
                    	}
            			console.log(param);
            			smsSendManagementService.sendSms(param, function(data) {
            				console.log(data);
            			});
                	});
            	}
            	else {
            		commonService.alert('발송할 대상자가 없습니다.');
            		return;
            	}
            }
            
            /**
             * 발송이력 목록
             * 
             */
            $scope.searchResult = function(redrawPage){
        		var param = {
    	        	searchUnivArea			:	$rootScope.message.smsSendManagement.senderList.searchUnivArea,
    	        	searchUniv				:	$rootScope.message.smsSendManagement.senderList.searchUniv,
    	        	searchYear 				:	$rootScope.message.smsSendManagement.senderList.searchYear,
    	        	searchSemesterCode		:	$rootScope.message.smsSendManagement.senderList.searchSemesterCode,
    	        	searchUserUnivArea		:	$rootScope.message.smsSendManagement.senderList.searchUserUnivArea,
    	        	searchUserUniv			:	$rootScope.message.smsSendManagement.senderList.searchUserUniv,
    	        	searchType				:	$rootScope.message.smsSendManagement.senderList.searchType,
    	        	searchKey				:	$rootScope.message.smsSendManagement.senderList.searchKey,
    	        	sort					:	$rootScope.message.smsSendManagement.senderList.sort,
    	        	order					:	$rootScope.message.smsSendManagement.senderList.order,
    	        	//isPaging				: 	'Y',
    	        	nowPage					:	isNull(pagingGlobalVar["senderResultListPaging"]) || redrawPage ? 1 : pagingGlobalVar["senderResultListPaging"].nowPage,
    	        	rowCnt					:	$rootScope.message.smsSendManagement.senderList.maxRowCnt,
        		};
        		
        		smsSendManagementService.getSmsResultList(param, function(data){
        			$rootScope.message.smsSendManagement.smsSendResultList.searchYn = "Y";
					$rootScope.message.smsSendManagement.smsSendResultList.smsResultList = data.smsResultList;
					
					$scope.changeMaxRowCnt = function(){
		        		$scope.searchResult(true);
		        	};
					
					$scope.changeSortOrder = function($event){
		        		var elemObj = $event.currentTarget || $event.srcElement;
		        		var sort = $(elemObj).attr("data-sort");
		        		var order = ($(elemObj).attr("data-order") == "desc" ? "asc": "desc");
		        		var elemIndex = $(elemObj).parent().find("th").index($(elemObj));
		        		$(elemObj).parent().find("th").each(function(i, th){
		        			if(i == elemIndex){
		        				$(th).find("span").addClass("lineUp");
		        				$(th).find("a").removeClass(order=="desc"?"up":"down").addClass(order=="desc"?"down":"up").show();
		        			}else{
		        				$(th).find("span").removeClass("lineUp");
		        				$(th).find("a").removeClass("down").removeClass("up").hide();
		        			}
		        		});
		        		
		        		$rootScope.message.smsSendManagement.smsSendResultList.sort = sort;
		        		$rootScope.message.smsSendManagement.smsSendResultList.order = order;
		        		$(elemObj).attr("data-order", order);
		        		$scope.searchResult(true);
		        	};
        		});
        	};
        	
        	$scope.getMsgInfo = function(seq) {
        		var param = {
        				messageSeq 		:	seq,
        				searchMsgType 	: 	1
        		}
        		smsSendManagementService.getMessageInfo(param, function(data) {
        			$rootScope.message.smsSendManagement.messageInfo = data.messageInfo;
        			
        			ngDialog.open({
                        template: Const.contextPath + 'html/message/messageInfo.html',
                        showClose: false,
                        closeByDocument: false,
                        width: 640,
                        controller: function() {
                        	
                        }
        			});
        		});
        		//////// smsSendManagementService.getMessageInfo
        	}
        	//////// $scope.getMsgInfo 
        	
        	$scope.getSendResultInfo = function(seq) {
        		var param = {
        				msgSeq	:	seq
        		}
        		smsSendManagementService.getSendResultInfo(param, function(data) {
        			$rootScope.message.smsSendManagement.sendResultInfo.resultInfo = data.sendResultInfo;
        			
        			ngDialog.open({
                        template: Const.contextPath + 'html/message/sendResultInfo.html',
                        showClose: false,
                        closeByDocument: false,
                        width: 1300,
                        controller: function() {
                        	
                        }
        			});
        		});
        	}
        	
        	$scope.setSendDate = function() {
        		var currentDate = new Date();
    			var now = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2); 
    			$rootScope.message.smsSendManagement.smsInfo.sendDate = now;
        	}
        	
        	$scope.clickDate = function() {
        		$rootScope.message.smsSendManagement.smsInfo.sendDate = null;
        		$('.pickerlabel').click();
        	}
        	
        	/**
        	 * 예약발송 작업중
        	 * 
        	 * 각 팝업 검색 기능
        	 * 받는사람 추가 -> 개별회원목록 불러오기
        	 * 
        	 * 이미지 전송, 도달율, 대기율, 실패율 < 차주에 휴머스온에서 매뉴얼 준다고함
        	 */
        	
        	
        	
        });
})());