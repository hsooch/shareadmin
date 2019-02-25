<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%
    long timestamp = System.currentTimeMillis();
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>open edx 강좌매핑</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta name="description" content="" />
    <meta property="og:description" content="" />

    <jsp:include page="/resourcesLoad.jsp?t=<%=timestamp%>" flush="true" />

	<!-- script src="https://code.jquery.com/jquery.min.js"></script-->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jui/jquery.dataTables.min.js"></script> 
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/jui/jquery.dataTables.min.css" />
	<style>
		.top_area{position:relative;background:#3a55a6;height:60px;}
		.top_area .logo{width:230px;height:60px;position:absolute;left:0;top:0;}
		.top_area .logo a{width:230px;height:60px;display:block;background:url('${pageContext.request.contextPath}/images/common/icon/logo.png') 20px center no-repeat;text-indent:-9999px;position:relative;z-index:100;}
		.top_area .pageTit{width:118px;height:24px;margin:18px 0;position:absolute;border-radius:0 12px 12px 0;left:231px;top:0;background:#fff; text-align: center;}
		.top_area .pageTit a{color:#191919;line-height:24px;padding-left: 16px;}
		.top_area .pageTit a:before{content:'';position:absolute;left:14px;top:5px;padding-left:15px;width:16px;height:14px;background:url(${pageContext.request.contextPath}/images/common/icon/icon_com.png) no-repeat;}
		
		.top_area .global_navi{width:100%;margin:auto;padding-top:18px;position:relative;z-index:2;text-align:right;}
		.top_area .global_navi > ul{display:inline-block;padding-right:100px;}
		.top_area .global_navi li{float:left;position:relative;margin:0 4px;height:20px;line-height:24px;font-size:12px;}
		.top_area .global_navi li a{color:#fff;display:block;}
		.top_area .global_navi li a span{color:#fffd41;}
		.top_area .global_navi li.radiBtn{ width:87px;height:24px;line-height:24px;text-align:left;background:#fff; border-radius: 12px;}
		.top_area .global_navi li.radiBtn a {color: #333;padding-left:32px;}
		.top_area .global_navi li.gbnv_1{padding-right: 6px; font-size: 13px;}
		.top_area .global_navi li.gbnv_2:before{content:'';position:absolute;left:14px;top:5px;width:18px;height:18px;background:url(${pageContext.request.contextPath}/images/common/icon/icon_navibtn.png) -21px -1px no-repeat;}
		.top_area .global_navi li.gbnv_3:before{content:'';position:absolute;left:14px;top:5px;width:18px;height:18px;background:url(${pageContext.request.contextPath}/images/icon_x.png) -0px -1px no-repeat;}	

		.cont_Title{height:31px;line-height:30px;position:relative;font-size:26px;color:#333;font-weight:500;}
		.dataTables_length {margin-bottom: 10px;}

		select {width : 65px;}		
		select#selectCat {width : 100px;}
				
		#btn {
			background-color: #3a77a6!important;
			color: #fff!important;
			font-size:1em;height:40px;line-height:40px;
			font-weight:700;padding:0 1em;
		}
		#courseList {
			border-bottom: 2px solid #07337c;
		}
	</style>
	    <style>
	        .onStep {color:red;}
	        
				* {
				  margin: 0;
				  padding: 0;
				}
				
				.pop-layer .pop-container {
				  padding: 20px 25px;
				}
				
				.pop-layer p.ctxt {
				  color: #666;
				  line-height: 25px;
				}
				
				.pop-layer .btn-r {
				  width: 100%;
				  margin: 10px 0 20px;
				  padding-top: 10px;
				  border-top: 1px solid #DDD;
				  text-align: right;
				}
				
				.pop-layer {
				  display: none;
				  position: absolute;
				  top: 50%;
				  left: 50%;
				  width: 410px;
				  height: auto;
				  background-color: #fff;
				  border: 5px solid #3571B5;
				  z-index: 10;
				}
				
				.dim-layer {
				  display: none;
				  position: fixed;
				  _position: absolute;
				  top: 0;
				  left: 0;
				  width: 100%;
				  height: 100%;
				  z-index: 100;
				}
				
				.dim-layer .dimBg {
				  position: absolute;
				  top: 0;
				  left: 0;
				  width: 100%;
				  height: 100%;			  
				  opacity: .5;
				  filter: alpha(opacity=50);
				}
				
				.dim-layer .pop-layer {
				  display: block;
				}
				
				a.btn-layerClose {
				  display: inline-block;
				  height: 25px;
				  padding: 0 14px 0;
				  border: 1px solid #304a8a;
				  background-color: #3f5a9d;
				  font-size: 13px;
				  color: #fff;
				  line-height: 25px;
				}
				
				a.btn-layerClose:hover {
				  border: 1px solid #091940;
				  background-color: #1f326a;
				  color: #fff;
				}
	
	    </style>
	
	<script type="text/javascript">	    
		$(document).ready(function() {
		    $("#courseList").DataTable({
		        order: [],
		        columnDefs: [{orderable: false, targets: [0]}]
		    });
		} );
	    
	    
	  //변경 처리
	    function fnudpData(){
	
	    	var chkbox = $("input[name=chk]:checkbox");
	    	var selbox = $("#selectBox option");
	    	var sel = $("select[id=selectBox]");
			
	    	var s = $("select[id=selectCat]");
	    	var t = $("select[id=selectType]");
	    	
	    	var osubject;
	    	var otype;
	    	 
	    	var cname ;
	    	
			var arr = new Array();		
	    	for(i=0;i<chkbox.length;i++) {
	    	    if (chkbox[i].checked == true){    	    	
	    	    	  
	    	    	s.each(function(a){ 
	    	    		var tr = chkbox.parent().parent().eq(a);
	    				var td = tr.children();    				
	    	    		if(i==a) {
	    	    			osubject =  $(this).val();
	    	    			cname = td.eq(2).text(); 
	    	    		}
	    	    	}); 
	
	    	    	t.each(function(a){ 
	    	    		if(i==a)  otype =  $(this).val();
	    	    	}); 
	    	    	 
	   
	    	    	arr.push( {
	    	                //id: chkbox[i].value,
	    	                //subject:  $("select[name=selectCat"+i+"]").val(),
	    	                //type: $("select[name=selectType"+i+"]").val()
	    	                id: chkbox[i].value,
	    	                subject:  osubject,   	                
	    	                type: otype  ,
	    	                displayName: cname
	    	        }); 
	    	    	
	    	    }
	    	}
	    	
	    	 if(arr.length == 0){
	    		 alert("데이터를 선택하세요.");
	    		 return;
	    	 }
	    	 
	    	 
	
	   
	    	$.ajax({
	    		url: '<c:url value="/category/mapping/mapping.ajax"/>', 
	    		type: 'POST',    		
	    		processData: false, 
	    		contentType: "application/json",
	    		data: JSON.stringify(arr), 
	    		success: function(data){    			
	    			alert(data.msg);
	    			location.reload();
	    			return;
	    		},
	    		error:function(request,status,error){
	    		        alert("code:"+request.status+"\n"+"error:"+error);
	    	    }
	    	});
	    
	 
	    }
	  
	    function chkCount(){
	    	if(document.querySelectorAll('input[name="chk"]:checked').length == 0){    		 
	            return false;
	    	}
	     
	    }
	    
	    function fnselCat(){ 
	    	var chkbox = $("input[name=chk]:checkbox");
	    	var s = $("select[id=selectCat]");
	    	
	    	var a = 0;
	    	for(i=0;i<chkbox.length;i++) {
	    	    if (chkbox[i].checked == true){    	    	
	    	    	// $("select[name=selectCat"+i+"]").val($("select[name=layerSelectCat]").val()).attr("selected", "selected");
	    	    	s.each(function(j){ 
	    	    		if(i==j) $(this).val($("select[name=layerSelectCat]").val()).attr("selected", "selected");
	    	    	});
	    	    	 a = a+1;
	    	    }
	    	} 
	    	
	    	if(a == 0){alert("데이터를 선택하세요."); return;}
	    }
	
	  
	    function fnselType(){
	    	
	    	var a=0;
	    	var chkbox = $("input[name=chk]:checkbox");
	    	var t = $("select[id=selectType]");
	    	
	    	for(i=0;i<chkbox.length;i++) {
	    	    if (chkbox[i].checked == true){    	    	
	    	    	// $("select[name=selectType"+i+"]").val($("select[name=layerSelectType]").val()).attr("selected", "selected");
	    	    	t.each(function(j){ 
	    	    		if(i==j) $(this).val($("select[name=layerSelectType]").val()).attr("selected", "selected");
	    	    	});
	    	    	
	    	    	 a = a+1;
	    	    }
	    	} 
	    	if(a == 0){alert("데이터를 선택하세요."); return;}
	    }
	</script>
</head>
<body>
<div class="top_area">
    <div class="global_navi">
        <ul class="clfix">
        	<li class="gbnv_2 radiBtn"><a href="${pageContext.request.contextPath}/statisticsedx/orgCaseStatList.do" title="통계조회">통계조회</a></li>
            <li class="gbnv_3 radiBtn"><a href="javascript:self.close();" title="닫기">닫기</a></li>
        </ul>
    </div>

    <h1 class="logo">
        <a title="공유대학포탈">공유대학포탈</a>
    </h1>
</div>
<div class="tab_wraping">
    <!-- tab1 -->
    <div id="tab1" class="tab-content current">
        <h5 class="cont_Title">과정/타입 정보 조회</h5>
		<!-- innertab -->
		<div id="innTabContent">
            <!-- innertab -->
            <div class="innertab_wraping">
            <div class="_articleContent">
	       		<div class="_listHead">
					<div class="_search pr0">
						<div class="_btnSet pr0">
							<!-- button id="btn" type="button" title="저장" onclick="fnudpData()">
							저장
							</button-->
							<span class="_button _large"><a href="javascript:fnudpData();" class="mainBtn">저장</a></span>
						</div>
					</div>
				</div>

                <form commandName="mCourseDataVO" name="dataForm" id="dataForm" >
                    <table id="courseList" class="_table _list w100 ">
                        <thead>
                            <tr>
	                            <th style="width:6%">
	                                <input type="checkbox" id="chkAll" name="chkAll">
	                                <label for="chkAll"><span></span></label>
	                            </th>
	                            <th style="width:31%">아이디</th>
	                            <th style="width:31%">과정명</th>
	                            <th style="width:8%">기관</th>
	                            <th style="width:10%">번호</th>
	                            <th style="width:12%">과정</th>
	                            <th style="width:8%">타입</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                              <c:choose>
                            <c:when test="${fn:length(jsonList) > 0}">
                                <c:forEach items="${jsonList }" var="jsonList" varStatus="status">
                                 <tr align="center">        
                                    <td>
                                        <input type="checkbox" id="chk${status.index}"
                                            name="chk" value="${jsonList.id}">
                                        <label for="chk${status.index}"><span></span></label>	
                                    </td>
                                      <td>${jsonList.id }</td>
                                      <td>${jsonList.displayName }</td>
                                      <td>${jsonList.org }</td>
                                      <td>${jsonList.number }</td>
                                      <td>
                                      <!-- ${jsonList.subject }  -->                      
                                      <select id="selectCat" name="selectCat${status.index }" >
                                         <option>--</option>
                                            <c:if test="${courseinfo != null and  fn:length(courseinfo) != 0 }">                                         
                                                <c:forEach items="${courseinfo }" var="courseinfo">
                                                    <c:choose>
                                                        <c:when test="${courseinfo eq jsonList.subject}">
                                                            <option value="${courseinfo}" selected>${courseinfo}</option>
                                                        </c:when>		               					
                                                        <c:otherwise>
                                                            <option value="${courseinfo}">${courseinfo}</option>
                                                        </c:otherwise>
                                                    </c:choose>	
                                                </c:forEach>
                                            </c:if>
                                        </select>
                                      </td>
                                      <td>
                                            <select id="selectType" name="selectType${status.index }">
                                         <option>--</option>
                                            <c:if test="${coursetype != null and  fn:length(coursetype) != 0 }">                                         
                                                <c:forEach items="${coursetype }" var="coursetype">
                                                <c:choose>
                                                        <c:when test="${coursetype eq jsonList.type}">
                                                            <option value="${coursetype}" selected>${coursetype}</option>
                                                        </c:when>		               					
                                                        <c:otherwise>
                                                            <option value="${coursetype}">${coursetype}</option>
                                                        </c:otherwise>
                                                    </c:choose>	 
                                                </c:forEach>
                                            </c:if>
                                        </select>
                                       </td>
                                     </tr>
                                </c:forEach>
                            </c:when>
                            <c:otherwise>
                                <tr>
                                    <td colspan="7">조회된 결과가 없습니다.</td>
                                </tr>
                            </c:otherwise>
                        </c:choose>
                       
                        </tbody>                     
                    </table>
                    

                    
                    
                <!-- div class="_listHead">
                    <div class="_search pr0">
                        <div class="_btnSet pr0">
                            <span class="_button _large"><a href="javascript:fnudpData();" class="_blockUI mainBtn" >저장</a></span>
                        </div>
                    </div>
                </div-->
                
                    <!-- button id="btn" type="button" title="저장" onclick="fnudpData()">저장</button-->
					<!-- a href="#layer1" class="btn-example">
                        <button id="btn_pos" type="button" title="카테고리변경"  >카테고리변경</button>
                    </a>
                    <a href="#layer2" class="btn-example">
                        <button id="btn" type="button" title="타입변경">타입변경</button>
                    </a-->
                
                </form>
            </div>
            </div>
        <!-- //innertab -->
		</div>
    </div>
</div> 

<div id="layer1" class="pop-layer">
    <div class="pop-container">
        <div class="pop-conts">
            <!--content //-->
            <p class="ctxt mb20"> 
            
			    <h1>카테고리 선택</h1>
			
            </br>
            	 <select id="layerSelectCat" name="layerSelectCat">
                      	  <option selected> -- </option>
                         	<c:if test="${courseinfo != null and  fn:length(courseinfo) != 0 }">                                         
	               				<c:forEach items="${courseinfo }" var="courseinfo">
	               					<option value="${courseinfo}">${courseinfo}</option>
		               			 </c:forEach>
		     		 		</c:if>
                        </select>
            </p>

            <div class="btn-r">
                <a href="#" class="btn-layerClose" onclick="fnselCat()">선택</a>
            </div>
            <!--// content-->
        </div>
    </div>
</div>
<br/><br/> 
<div class="dim-layer">
    <div class="dimBg"></div>
    <div id="layer2" class="pop-layer">
        <div class="pop-container">
            <div class="pop-conts">
                <!--content //-->
                
			    <h1>타입선택</h1>
			
            </br>
            	 <select id="layerSelectType" name="layerSelectType">
                      	 <option selected> -- </option>
                         	<c:if test="${coursetype != null and  fn:length(coursetype) != 0 }">                                         
	               				<c:forEach items="${coursetype }" var="coursetype">
	               					<option value="${coursetype}">${coursetype}</option>
		               			 </c:forEach>
		     		 		</c:if>
                        </select>
            </p>

                <div class="btn-r">
                 	<a href="#" class="btn-layerClose" onclick="fnselType()">선택</a>                    
                </div>
                <!--// content-->
            </div>
        </div>
    </div>
</div>
        
 
    
    <script>
	    $("#chkAll").click(function(){
	    	if($("#chkAll").is(":checked")){
	    		 $("input[name=chk]:checkbox").prop("checked", "checked");	    		
	    	}else{
	    		 $("input[name=chk]:checkbox").removeProp("checked", "checked");
	    	} 
	    });
    
//    	var selbox = $("#selectBox option");
//    	var sel = $("select[id=selectBox]");

	   // #################### ㅠ<!-- layer popup --> 디자인 필요
	   
	    $('.btn-example').click(function(){
	        var $href = $(this).attr('href');
	        layer_popup($href);
    	});
	    
	    function layer_popup(el){

	        var $el = $(el);        //레이어의 id를 $el 변수에 저장
	        var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수

	        isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

	        var $elWidth = ~~($el.outerWidth()),
	            $elHeight = ~~($el.outerHeight()),
	            docWidth = $(document).width(),
	            docHeight = $(document).height();

	        // 화면의 중앙에 레이어를 띄운다.
	        if ($elHeight < docHeight || $elWidth < docWidth) {
	            $el.css({
	                marginTop: -$elHeight /2,
	                marginLeft: -$elWidth/2
	            })
	        } else {
	            $el.css({top: 0, left: 0});
	        }

	        $el.find('a.btn-layerClose').click(function(){
	            isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	            return false;
	        });

	        $('.layer .dimBg').click(function(){
	            $('.dim-layer').fadeOut();
	            return false;
	        });

	    }
	 
	    // #################### ㅠ<!-- layer popup -->
	 
    </script>
 
<!-- Layer Pop End -->
</body>
</html>