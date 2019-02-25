<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<style>
li.active > a {
	color:#b40c0c!important
}
</style>

<div class="rightConBoxing">
    <div class="tab_wraping">
        <!-- tab1 -->
        <div id="tab1" class="tab-content current">
            <h5 class="cont_Title">메뉴 관리
                <div class="pg_location"><a >Go home</a> <span>&gt;</span> ADMIN<span>&gt;</span> 메뉴 관리<span>&gt;</span> </div>    
            </h5>
            <div id="innTabContent">
                <div class="_articleContent">
                    <div class="_codeContent">
                        <div class="_codeWrap">
                            <div class="codetotal">
                                <div class="_areaButton">
                                    <div class="_left">
                                        <span class="_button _large">
                                        	<a class="_blockUI mainBtn wx40"  ng-click="addNewMenu();">추가</a>
                                        </span>
                                        <span class="_button _large Gray"><a  class="_blockUI wx40"  ng-click="deleteMenuInfo();">삭제</a></span>
                                    </div> 
                                    <div class="_right"> 
                                        <div class="tree_updown">
                                            <span class="down"><a  ng-click="changeMenuIndex('down');">down</a></span>
                                            <span class="up"><a  ng-click="changeMenuIndex('up');">up</a></span>
                                        </div>  
                                    </div>
                                </div>
                                <div class="codeControl">
                                    <div class="tree">
                                        <ul class="clfix">
                                       		<li id="codeRoot" class="deactive">
												<a title="메뉴관리" style="cursor: pointer;background: url();" ng-click="clickRootMenu();">메뉴관리</a>
											</li>
                                        </ul>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div class="codeTable">
                            <table class="_table _view w100 mt50">
                                <caption>메뉴 관리 표</caption>
                                <colgroup>
                                    <col style="width:150px;">
                                    <col>
                                    <col style="width:150px;">
                                    <col>
                                </colgroup>
                                
                                <tbody>
                                    <tr>
                                        <th>상위 메뉴명</th>
                                        <td colspan="3">{{$root.menu.parentMenuName }}</td>
                                    </tr>
                                    <tr>
                                        <th>메뉴 명<span class="mark">*</span></th>
                                        <td colspan="3"><input kr-input type="text" id="menuName" placeholder="" class="w100" ng-model="$root.menu.menuName"></td>
                                    </tr>
                                    <tr>
                                        <th>URL <span class="mark">*</span></th>
                                        <td colspan="3"><input kr-input type="text" id="" placeholder="" class="w100 hx90" ng-model="$root.menu.menuUrl"></td>
                                    </tr>
                                    <tr>
                                        <th>노출여부</th>
                                        <td colspan="3">
                                            <div class="radioWrap">
                                                <div class="radio">
                                                    <input type="radio" id="rad_Chek01" name="itmSoldout" title="노출"
                                                      	ng-model="$root.menu.displayYn" value="Y">
                                                    <label for="rad_Chek01"><span></span>노출</label>
                                                </div>
                                                <div class="radio">
                                                        <input type="radio" id="rad_Chek02" name="itmSoldout" title="비노출"
                                                        	ng-model="$root.menu.displayYn" value="N">
                                                        <label for="rad_Chek02"><span></span>비노출</label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>작성자 <span class="mark">*</span></th>              
                                        <td colspan="3">{{$root.menu.regUserName }}</td>
                                    </tr>
                                    <tr>
                                        <th>작성일</th>
                                         <td colspan="3">{{$root.menu.regDt | getDateString:'yyyy.MM.dd' }}</td>
                                    </tr>
                                </tbody>
                            </table>   
                            <div class="_areaButton">
                                <div class="_center">
                                    <span class="_button _large blackBtn">
                                    	<a  class="_blockUI wx135"  ng-click="saveMenuInfo();">저장</a>
                                    </span>
                                    <span class="_button _large borderBtn">
                                    	<a  class="_blockUI wx135"  ng-click="deleteMenuInfo();">삭제</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div> 
            </div>
        </div>
        <!-- // tab1 -->
    </div>
</div>
