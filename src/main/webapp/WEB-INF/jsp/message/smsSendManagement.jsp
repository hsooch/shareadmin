<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>



<div class="tab_wraping">
    <!-- tab1 -->
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">SMS발송 관리
            <div class="pg_location"><a >Go home</a> <span>&gt;</span> ADMIN<span>&gt;</span> SMS/메일발송 관리<span>&gt;</span> SMS발송 관리</div>
        </h5>
        <div id="innTabContent">
            <ul class="innertab_list">
                <li data-tab="tab11" ng-class="{current:$root.message.smsSendManagement.nowMgmtTab === 0}"><a href="javascript:void(0);" ng-click="changeTab('0');"><span>SMS 발송</span></a></li>
                <li data-tab="tab21" ng-class="{current:$root.message.smsSendManagement.nowMgmtTab === 1}"><a href="javascript:void(0);" ng-click="changeTab('1');"><span>발송이력조회</span></a></li>
            </ul>
        <!-- innertab -->         
        <div class="innertab_wraping">
            <!-- tab11 -->
            <div id="tab11" class="tabcontent current" ng-class="{current:$root.message.smsSendManagement.nowMgmtTab === 0}">
                <h6>SMS 발송목록</h6>
                <div class="_articleContent smsTotWrap">
                    <div class="smsWrap">
                        <table class="_table _view w100 mt20 ">
                            <caption>SMS 발송 표</caption>
                            <tbody>
                                 <tr>
                                    <td>
                                        <label class="smsTit">제목</label>
                                        <ul class="smsTitText">
                                            <li>
                                            	<input type="text" id="input-sms-title" placeholder="최대 15자 입력가능" class="w100"
                                            		ng-model="$root.message.smsSendManagement.smsInfo.title">
                                            </li>
                                            <li>
                                                <div class="form_butSet textAR">
                                                    <span class="_button _large mwx109 _active">
                                                        <a  class="tabInnBtn" ng-click="addImgPopup();">이미지 추가</a>
                                                    </span>
                                                    <span class="_button _large mwx109">
                                                        <a  class="tabInnBtn" ng-click="removeImg();">이미지 삭제</a>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="popImgWrap">
										<div class="imgfile" style="width:336.09px; height:150px; background-color:#ffffff; border:solid 1px #cccccc;">
											<a style="color:#999999;" ng-show="!$root.message.smsSendManagement.smsInfo.imgSrc">이미지 (이미지 삽입시 MMS 로 발송됩니다.)</a>
											<img id="thumb-img" ng-show="$root.message.smsSendManagement.smsInfo.imgSrc && $root.message.smsSendManagement.smsInfo.haveImage == true" ng-src="{{$root.message.smsSendManagement.smsInfo.imgSrc }}" style="width:338.09px;height:150px; alt="">
										</div>
									</td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea name="" id="ta-sms" class="hx395" placeholder="내용입력 (90byte 초과 시 자동으로 2,000 byte로 전환되어 LMS로 발송됩니다.)"
                                        	ng-model="$root.message.smsSendManagement.smsInfo.content"></textarea>
                                        <p class="byteWrap"><label class="bytetxt"><span>0</span> byte/2000 byte</label></p>
                                    </td>
                                </tr>
                                <td>
                                    <label class=""></label>
                                    <div class="form_butSet textAR">
                                        <span class="_button _large mwx109">
                                            <a  class="tabInnBtn specialBtn" ng-click="emojiPopup();">특수문자</a>
                                        </span>
                                        <span class="_button _large mwx109">
                                            <a  class="tabInnBtn" ng-click="replaceTextArea();">다시쓰기</a>
                                        </span>
                                    </div>
                                </td>
                            </tbody>
                        </table>
                    <!--  특수문자 사용안할시 style="display:none"-->
                        <div class="specialWrap" style="display:none" >
                            <div class="specialText">
                                <div class="speTitle">특수문자 
                                    <button type="button" title="닫기" class="btn_tabclose speBtnClose" ng-click="emojiClose();"><span>닫기</span></button>
                                </div>
                                <ul class="speWrap" style="cursor:pointer;">
			                        <li>
			                            <!--  특수문자 선택시 class ="_active" 추가-->
			                            <span><a id="♥" class="emo" ng-click="addChar('♥');">♥</a></span>
			                            <span><a id="♡" class="emo" ng-click="addChar('♡');">♡</a></span>
			                            <span><a id="★" class="emo" ng-click="addChar('★');">★</a></span>
			                            <span><a id="☆" class="emo" ng-click="addChar('☆');">☆</a></span>
			                            <span><a id="▶" class="emo" ng-click="addChar('▶');">▶</a></span>
			                            <span><a id="▷" class="emo" ng-click="addChar('▷');">▷</a></span>
			                        </li>
			                        <li>
			                            <span><a id="●" class="emo" ng-click="addChar('●');">●</a></span>
			                            <span><a id="▲" class="emo" ng-click="addChar('▲');">▲</a></span>
			                            <span><a id="▒" class="emo" ng-click="addChar('▒');">▒</a></span>
			                            <span><a id="♨" class="emo" ng-click="addChar('♨');">♨</a></span>
			                            <span><a id="™" class="emo" ng-click="addChar('™');">™</a></span>
			                            <span><a id="℡" class="emo" ng-click="addChar('℡');">℡</a></span>
			                        </li>
			                        <li>
			                            <span><a id="♬" class="emo" ng-click="addChar('♬');">♬</a></span>
			                            <span><a id="♪" class="emo" ng-click="addChar('♪');">♪</a></span>
			                            <span><a id="♂" class="emo" ng-click="addChar('♂');">♂</a></span>
			                            <span><a id="♀" class="emo" ng-click="addChar('♀');">♀</a></span>
			                            <span><a id="⊙" class="emo" ng-click="addChar('⊙');">⊙</a></span>
			                            <span><a id="◆" class="emo" ng-click="addChar('◆');">◆</a></span>
			                        </li>
			                        <li>
			                            <span><a id="◇" class="emo" ng-click="addChar('◇');">◇</a></span>
			                            <span><a id="♣" class="emo" ng-click="addChar('♣');">♣</a></span>
			                            <span><a id="♧" class="emo" ng-click="addChar('♧');">♧</a></span>
			                            <span><a id="◀" class="emo" ng-click="addChar('◀');">◀</a></span>
			                            <span><a id="◁" class="emo" ng-click="addChar('◁');">◁</a></span>
			                            <span><a id="○" class="emo" ng-click="addChar('○');">○</a></span>
			                        </li>
			                        <li>
			                            <span><a id="□" class="emo" ng-click="addChar('□');">□</a></span>
			                            <span><a id="▼" class="emo" ng-click="addChar('▼');">▼</a></span>
			                            <span><a id="∑" class="emo" ng-click="addChar('∑');">∑</a></span>
			                            <span><a id="㉿" class="emo" ng-click="addChar('㉿');">㉿</a></span>
			                            <span><a id="▣" class="emo" ng-click="addChar('▣');">▣</a></span>
			                            <span><a id="『" class="emo" ng-click="addChar('『');">『</a></span>
			                        </li>
			                        <li>
			                            <span><a id="』" class="emo" ng-click="addChar('』');">』</a></span>
			                            <span><a id="☜" class="emo" ng-click="addChar('☜');">☜</a></span>
			                            <span><a id="㈜" class="emo" ng-click="addChar('㈜');">㈜</a></span>
			                            <span><a id="＼" class="emo" ng-click="addChar('＼');">＼</a></span>
			                            <span><a id="§" class="emo" ng-click="addChar('§');">§</a></span>
			                            <span><a id="■" class="emo" ng-click="addChar('■');">■</a></span>
			                        </li>
			                        <li>
			                            <span><a id="☞" class="emo" ng-click="addChar('☞');">☞</a></span>
			                            <span><a id="☎" class="emo" ng-click="addChar('☎');">☎</a></span>
			                            <span><a id="◈" class="emo" ng-click="addChar('◈');">◈</a></span>
			                            <span><a id="‡" class="emo" ng-click="addChar('‡');">‡</a></span>
			                        </li>
			                    </ul>
                            </div>
                        </div>
                    </div>
                    <div class="smsList mt10">
                        <div class="_listHead">
                            <div class="_count wBg listTit">
                                받는사람
                            </div>
                            <div class="_count wBg ">
                                총  대상자 :<strong>{{$root.message.smsSendManagement.smsSendList.checkedSenderList.length > 0 ? $root.message.smsSendManagement.smsSendList.checkedSenderList.length : 0}}<!-- <em>/100</em> --></strong>  명
                            </div>
                            <div class="_search pr0">
                                <div class="_btnSet pr0">
                                    <span class="_button _large borderBtn"><a ng-click="addSender();">받는사람 추가</a></span>
                                </div>
                            </div>
                        </div>
                        <div class="listTabWrap mt10">
                            <table class="_table _list w100">
                                <caption>표 제목</caption>
                                <colgroup>
                                    <col style="width:40px;">
                                    <col style="width:12%;">
                                    <col style="width:10%;">
                                    <col style="width:15%;">
                                    <col style="width:10%;">
                                    <col style="width:12%;">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" id="itemChkAll"
                                        	ng-model="$root.message.smsSendManagement.smsSendList.isCheckedAll" ng-click="chkAll();" name="">
											<label for="itemChkAll"><span></span></label>
										</th>
                                        <th>소속대학</th>
                                        <th>학과</th>
                                        <th>아이디</th>
                                        <th>성명</th>
                                        <th>핸드폰번호</th>
                                    </tr>
                                </thead>
                               	<tbody ng-hide="$root.message.smsSendManagement.smsSendList.checkedSenderList.length > 0">
									<tr class="nosearchData" style="display: lnline-block;">
										<td colspan="6">받는사람이 없습니다.</td>
									</tr>
								</tbody>
                                <tbody ng-show="$root.message.smsSendManagement.smsSendList.checkedSenderList.length > 0">
                                    <tr class="firTd" ng-repeat="data in $root.message.smsSendManagement.smsSendList.checkedSenderList | orderBy:descRn:false">
                                        <td>
											<input type="checkbox" id="chklist{{$index}}" ng-model="data.isChecked" ng-click="chkUser()">
                      						<label for="chklist{{$index}}"><span></span></label>
										</td>
                                        <td>{{data.userUnivCodeName}}</td>
                                        <td>{{data.userDepartment}}</td>
                                        <td>{{data.userId}}</td>
                                        <td>{{data.userName}}</td>
                                        <td>{{data.cellNo}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="_areaButton">
                            <div class="_left">
                                <span class="_button _large borderBtn"><a ng-click="delChked();">선택삭제</a></span>
                                <span class="_button _large borderBtn"><a ng-click="delAllChked();">전체삭제</a></span>
                            </div>
                        </div>
                        <div class="tableWrap">
                            <table class="_table _view w100 sendView">
                                <caption>표 제목</caption>
                                <colgroup>
                                    <col style="width:150px;">
                                    <col>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>발송시간 설정</th>
                                        <td>
                                            <ul>
                                                <li>
                                                    <div class="radioWrap">
                                                        <div class="radio pl0">
                                                            <input type="radio" id="rad_Chek01" name="itmSoldout" title="즉시발송" value="now"
                                                            	ng-model="$root.message.smsSendManagement.smsInfo.when" ng-change="setSendDate()">
                                                            <label for="rad_Chek01"><span></span>즉시발송</label>
                                                        </div>
                                                        <div class="radio">
                                                            <input type="radio" id="rad_Chek02" name="itmSoldout" title="예약발송" value="later"
                                                            	ng-model="$root.message.smsSendManagement.smsInfo.when" ng-change="clickDate();">
                                                            <label for="rad_Chek02"><span></span>예약발송</label>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <label class="pr10">예약발송 일시</label>
                                                    <div class="cal_type">
                                                        <p class="date">
                                                        	<span><input kr-input type="text" id="picker_sendDate" ng-model="$root.message.smsSendManagement.smsInfo.sendDate"></span>
                                                        	<label class="pickerlabel" for="picker_sendDate"></label>
                                                        </p>
                                                    </div>
                                                    <label for="time_date" class="pr10">일</label>
                                                    <select name="sch_timeH" id="sch_timeH" class="_selectBox _fL w15 mr05" ng-mode="$root.message.smsSendManagement.smsInfo.sendTime">
                                                        <option value="">선택</option>
				                                        <option value="00">0</option>
				                                        <option value="01">1</option>
				                                        <option value="02">2</option>
				                                        <option value="03">3</option>
				                                        <option value="04">4</option>
				                                        <option value="05">5</option>
				                                        <option value="06">6</option>
				                                        <option value="07">7</option>
				                                        <option value="08">8</option>
				                                        <option value="09">9</option>
				                                        <option value="10">10</option>
				                                        <option value="11">11</option>
				                                        <option value="12">12</option>
				                                        <option value="13">13</option>
				                                        <option value="14">14</option>
				                                        <option value="15">15</option>
				                                        <option value="16">16</option>
				                                        <option value="17">17</option>
				                                        <option value="18">18</option>
				                                        <option value="19">19</option>
				                                        <option value="20">20</option>
				                                        <option value="21">21</option>
				                                        <option value="22">22</option>
				                                        <option value="23">23</option>
                                                    </select>
                                                    <label for="time_hour" class="pr10">시</label>
                                                    <select name="sch_timeM" id="sch_timeM" class="_selectBox _fL w15 mr05" ng-model="$root.message.smsSendManagement.smsInfo.sendMinute">
                                                        <option value="">선택</option>
				                                        <option value="00">00</option>
				                                        <option value="05">05</option>
				                                        <option value="10">10</option>
				                                        <option value="15">15</option>
				                                        <option value="20">20</option>
				                                        <option value="25">25</option>
				                                        <option value="30">30</option>
				                                        <option value="35">35</option>
				                                        <option value="40">40</option>
				                                        <option value="45">45</option>
				                                        <option value="50">50</option>
				                                        <option value="55">55</option>
                                                    </select>
                                                    <label for="time_minute" class="pr10">분</label>
                                                </li>
                                                <li><span class="caution">* 예약발송은 현재보다 이전 시간으로 예약할 경우 즉시 발송됩니다.</span></li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="_areaButton">
                            <div class="_center">
                                <span class="_button _large blackBtn"><a class="mwx160 font16" ng-click="sendSms();">발송하기</a></span>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            <!-- //tab11 -->
            <!-- tab21 -->
            <div id="tab21" class="tabcontent current" ng-show="$root.message.smsSendManagement.pageType == 'smsSendResultList'" ng-class="{current:$root.message.smsSendManagement.nowMgmtTab === 1}">
                <h6>발송이력조회목록</h6>
                <div class="_articleContent" ng-show="$root.message.smsSendManagement.pageType == 'smsSendResultList' && $root.message.smsSendManagement.smsSendResultList.pageViewType == 'list'">
                    <div class="_border _write mt10">
                        <div class="_inner">
                            <fieldset>
                            <legend>월별 접속통계 조회 </legend>
                                <form name="selYearForm" method="post">
                                    <div class="_form _both">
                                        <div class="_insert tableWrap w1000">
                                            <div class="innTable">
                                                <table class="w100">
                                                    <colgroup>
                                                        <col style="width:8%">
                                                        <col style="width:15%">
                                                        <col style="width:17%">
                                                        <col style="width:22%">
                                                        <col style="width:8%">
                                                        <col style="width:7%">
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <td><label for="mem_date" class="pl20">기간검색</label></td>
                                                            <td colspan="2">
                                                                <div class="cal_type">
                                                                <p class="date"><span><input type="text" id="picker_before" ></span><label class="pickerlabel" for="picker_before"></label></p>
                                                                <p class="date"><span><input type="text" id="picker_after"></span><label class="pickerlabel" for="picker_after"></label></p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="form_butSet">
                                                                    <span class="_button _small _active"><a href="#" class="mw40">1개월</a></span>
                                                                    <span class="_button _small"><a href="#" class="mw40">6개월</a></span>
                                                                    <span class="_button _small"><a href="#" class="mw40">1년</a></span>
                                                                </div>
                                                            </td>
                                                            <td><label for="sch_search" class="pl20">제목</label></td>
                                                            <td>
                                                                <input type="text" id="" placeholder="" class="wx170">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><label for="sch_kind" class="pl20">발신대학</label></td>
                                                            <td>
                                                                <select name="sch_kind" id="sch_kind" class="_selectBox _fL w98">
                                                                    <option value="value">전체</option>
                                                                        <option value="value">서울지역</option>
                                                                        <option value="value">경인지역</option>
                                                                        <option value="value">부경울제</option>
                                                                        <option value="value">부경울제</option>
                                                                        <option value="value">대전세종충남</option>
                                                                        <option value="value">광주전남</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <select name="sch_kind2" id="sch_kind2" class="_selectBox _fL w100">
                                                                    <option value="value">전체</option>
                                                                        <option value="value">카톨릭대학교</option>
                                                                        <option value="value">건국대학교</option>
                                                                        <option value="value">광운대학교</option>
                                                                        <option value="value">동국대학교</option>
                                                                        <option value="value">동덕여자대학교</option>
                                                                        <option value="value">명지대학교</option>
                                                                        <option value="value">삼육대학교</option>
                                                                        <option value="value">상명대학교</option>
                                                                        <option value="value">서강대학교</option>
                                                                        <option value="value">서경대학교</option>
                                                                        <option value="value">서울과학기술대학교</option>
                                                                        <option value="value">서울시립대학교</option>
                                                                        <option value="value">서울여자대학교</option>
                                                                        <option value="value">성공회대학교</option>
                                                                        <option value="value">세종대학교</option>
                                                                        <option value="value">숙명여자대학교</option>
                                                                        <option value="value">숭실대학교</option>
                                                                        <option value="value">이화여자대학교</option>
                                                                        <option value="value">중앙대학교</option>
                                                                        <option value="value">추계예술대학교</option>
                                                                        <option value="value">한국외국어대학교</option>
                                                                        <option value="value">한성대학교</option>
                                                                        <option value="value">홍익대학교</option>
                                                                        <option value="value">KC대학교</option>
                                                                </select>
                                                            </td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="_areaButton innerBtn">
                                                <div class="_right">
                                                    <span class="_button _small _active searchBtn"><input type="button" value="조회" ng-click="searchResult(false)"></span>
                                                    <span class="_button _small resetBtn"><input type="button" value="초기화" onclick=""></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                    <div class="_listHead">
                        <div class="_count">
                            총  <strong>{{$root.message.smsSendManagement.smsSendResultList.totalCnt}}<!-- <em>/100</em> --></strong>  건이 검색되었습니다.
                        </div>
                        
                        <div class="_search pr0">
                            <div class="_btnSet pr0">
                                <span class="_large"><a  class="downBtn">엑셀다운</a></span>
                            </div>
                            <fieldset>
                                <legend>홈페이지검색</legend>
                                <select name="findType" class="_selectBox wx70">
                                    <option value="10">10개 </option>
                                    <option value="20">20개 </option>
                                    <option value="30">30개 </option>
                                    <option value="40">40개 </option>
                                    <option value="50">50개 </option>
                                </select>
                                <!-- <input type="text" name="findWord" value=""> -->
                                <!-- <input type="submit" value="검색" class="_submit"> -->
                            </fieldset>
                        </div>
                    </div>
                    <table class="_table _list w100 ">
                        <caption>표 제목</caption>
                        <colgroup>
                            <col style="width:50px;">
                            <col style="width:10%;">
                            <col style="width:8%;">
                            <col style="width:12%;">
                            <col style="width:12%;">
                            <col style="width:8%;">
                            <col style="width:10%;">
                            <col style="width:18%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:10%;">
                            <col style="width:8%;">
                            <col style="width:8%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th rowspan="2"><input type="checkbox" id="itm_Allcheck" name=""><label for="itm_Allcheck"><span></span></label></th>
                                <th rowspan="2" ng-click="changeSortOrder($event)" data-sort="REG_UNIV_CODE_NAME" data-order="desc"><span>발신대학<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                                <th rowspan="2" ng-click="changeSortOrder($event)" data-sort="SEND_TYPE" data-order="desc"><span>발송<br>유형<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                                <th rowspan="2" ng-click="changeSortOrder($event)" data-sort="REG_DT" data-order="desc"><span>발송일시<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                                <th rowspan="2" ng-click="changeSortOrder($event)" data-sort="SEND_DT" data-order="desc"><span>예약일시<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                                <th rowspan="2">예약발송<br>취소</th>
                                <th rowspan="2" ng-click="changeSortOrder($event)" data-sort="REG_USER_NAME" data-order="desc"><span>발신자<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                                <th rowspan="2" ng-click="changeSortOrder($event)" data-sort="TITLE" data-order="desc"><span>제목<a href="javascript:void(0);" style="display:none;" class="down" ></a></span></th>
                                <th colspan="4" class="resultTh">발송결과</th>
                                <th rowspan="2">발송내용<br>보기</th>
                            </tr>
                            <tr>
                                <th>성공<br>(도달율)</th>
                                <th>대기<br>(대기율)</th>
                                <th>실패<br>(실패율)</th>
                                <th>발송결과<br>상세보기</th>
                            </tr>
                        </thead>
                        <tbody ng-show="$root.message.smsSendManagement.smsSendResultList.smsResultList.length == 0">
							<tr class="nosearchData" style="display: lnline-block;">
								<td colspan="13">발송 이력이 없습니다.</td>
							</tr>
						</tbody>
                        <tbody ng-show="$root.message.smsSendManagement.smsSendResultList.smsResultList.length > 0">
                            <tr class="firTd" ng-repeat="data in $root.message.smsSendManagement.smsSendResultList.smsResultList">
                                <td><input type="checkbox" id="thisChk01" name=""><label for="thisChk01"><span></span></label></td>
                                <td>{{data.regUnivCodeName}}</td>
                                <td>{{data.sendType}}</td>
                                <td class="_aL">{{data.regDt}}</td>
                                <td>{{data.sendDt}}</td>
                                <td>-</td>
                                <td>{{data.regUserName}}</td>
                                <td class="_aL">{{data.title}}</td>
                                <td>100<br>(50.00%)</td>
                                <td>50<br>(25.00%)</td>
                                <td>50<br>(25.00%)</td>
                                <td><span class="_button _minimum"><a ng-click="getSendResultInfo(data.msgSeq)">결과</a></span></td>
                                <td><span class="_button _minimum _puple"><a ng-click="getMsgInfo(data.msgSeq)">보기</a></span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div ng-show="$root.message.smsSendManagement.smsSendResultList.smsResultList.length > 0" id="senderResultListPaging" class="_paging"></div>
                    <div class="_areaButton">
                        <div class="_left">
                            <span class="_button _large borderBtn"><a href="#"> 선택삭제</a></span>
                        </div>
                        <div class="_search pr0 _right">
                            <div class="_btnSet pr0">
                                <span class="_large"><a  class="downBtn">엑셀다운</a></span>
                            </div>
                            <fieldset>
                                <legend>홈페이지검색</legend>
                                <select name="findType" class="_selectBox wx70">
                                    <option value="10">10개 </option>
                                    <option value="20">20개 </option>
                                    <option value="30">30개 </option>
                                    <option value="40">40개 </option>
                                    <option value="50">50개 </option>
                                </select>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
            <!-- //tab21 -->
        </div> 
        <!-- //innertab -->  
    </div>
    <!-- // tab1 -->
</div>
