/*
window.addEventListener("load", function(){
	setTimeout(function() { window.scrollTo(0, 1) }, 100)
}, false);
*/


//팝업 가운데 띄우기
function open_window(url,name,width,height) { 
 var url = url; 
 var name = name;
 var width = width;
 var height = height; 
 var top = (screen.availHeight / 2) - (height / 2); 
 var left = (screen.availWidth / 2) - (width / 2); 
 wopen = window.open(url, name, "location=0, status=0, scrollbars=no, resizable=no, width="+ width +", height="+ height +", top=" + top + ", left=" + left);
}

function open_full_window(url,name,width,height) { 
 var url = url; 
 var name = name;
 var width = width;
 var height = height; 
 var top = (screen.availHeight / 2) - (height / 2); 
 var left = (screen.availWidth / 2) - (width / 2); 
 wopen = window.open(url, name, "location=0, status=0, scrollbars=yes, resizable=yes, width="+ width +", height="+ height +", top=" + top + ", left=" + left);
}

/* 레이어팝업 포커스 돌려주기 - a태그*/
function showlayer(self,obj){
	var $self = $(self);
	var $target = $($self.attr('href'));
	var windowHeight = $(window).height();
	$(".wrap").css("height",windowHeight +"px");
	$(".dim_layer").css("height",windowHeight +"px");
	$("html, body").stop().animate({ scrollTop : 0 }, 200, "easeOutQuad");
	$target.attr('tabindex', '0').show().focus();
	$(".dim_layer").show();
	$(window).on('resize orientationchange',function(){
		var lHeight = $(window).height();
		$(".wrap").css("height",lHeight);
		$(".dim_layer").css("height",lHeight);
	});
	$(obj).find(".close_layer").click(function(){
		$(obj).hide();
		$(".dim_layer").hide();
		$(".wrap").css("height","auto");
		$self.focus();
		$(this).off('click');
		$(window).off('resize orientationchange');
	});
	$(obj).find(".closeBtn").click(function(){
		$(obj).hide();
		$(".dim_layer").hide();
		$(".wrap").css("height","auto");
		$self.focus();
		$(this).off('click');
		$(window).off('resize orientationchange');
	});
}

function showSelect(self,obj,sId){
	var $self = $(self);
	var $target = $(sId);
	var windowHeight = $(window).height();
	$(".wrap").css("height",windowHeight +"px");
	$(".dim_layer").css("height",windowHeight +"px");
	$("html, body").stop().animate({ scrollTop : 0 }, 200, "easeOutQuad");
	$target.attr('tabindex', '0').show().focus();
	$(".dim_layer").show();
	$(window).on('resize orientationchange',function(){
		var lHeight = $(window).height();
		$(".wrap").css("height",lHeight);
		$(".dim_layer").css("height",lHeight);
	});
	$(obj).find(".close_layer").click(function(){
		$(obj).hide();
		$(".dim_layer").hide();
		$(".wrap").css("height","auto");
		$self.focus();
		$(this).off('click');
		$(window).off('resize orientationchange');
	});
}

function showAllmenu(self,obj){
    $(".dim_layer").css("display","block");
    var $self = $(self);
    $(obj).attr('tabindex', '0').show().focus();
    var centerHeight = parseInt($(".wrap").css("height"));
    var windowHeight = $(window).height();
    
   $(".wrap").css("height",windowHeight +"px");
   $(".dim_layer").css("height",windowHeight +"px");

    $(".dim_layer").click(function(){
      $self.focus();
      $(obj).css("display","none");
      $(".dim_layer").css("display","none");
      $(".dim_layer").css("height","100%");
      $(".wrap").css("height","auto");
    });
    $(".allmenu_close").click(function(){
      $self.focus();
      $(obj).css("display","none");
      $(".dim_layer").css("display","none");
      $(".dim_layer").css("height","100%");
      $(".wrap").css("height","auto");
    });
  }

function showMV(self,obj){
    $(".dim_layer").css("display","block");
    var $self = $(self);
    $(obj).attr('tabindex', '0').show().focus();
    var centerHeight = parseInt($(".wrap").css("height"));
    var windowHeight = $(window).height();
    
   $(".wrap").css("height",windowHeight +"px");
   $(".dim_layer").css("height",windowHeight +"px");

    $(".dim_layer").click(function(){
      $self.focus();
      $(obj).css("display","none");
      $(".dim_layer").css("display","none");
      $(".dim_layer").css("height","100%");
 	  $('#mMv01').stop();
      $(".wrap").css("height","auto");
    });
    $(".mv_close").click(function(){
      $self.focus();
      $(obj).css("display","none");
      $(".dim_layer").css("display","none");
      $(".dim_layer").css("height","100%");
      $('#mMv01').stop();
      $(".wrap").css("height","auto");
    });
  }

function showApiMV(self,obj){
    $(".dim_layer").css("display","block");
    var $self = $(self);
    $(obj).attr('tabindex', '0').show().focus();
    var centerHeight = parseInt($(".wrap").css("height"));
    var windowHeight = $(window).height();
    
   $(".wrap").css("height",windowHeight +"px");
   $(".dim_layer").css("height",windowHeight +"px");
   $(".wrap").css("overflow","hidden");


    $(".dim_layer").click(function(){
      $self.focus();
      $(obj).css("display","none");
      $(".dim_layer").css("display","none");
      $(".dim_layer").css("height","100%");
 	  $('#mMv01').stop();
      $(".wrap").css("height","auto");
      $(".wrap").css("overflow","auto");
    });
    $(".mv_close").click(function(){
      $self.focus();
      $(obj).css("display","none");
      $(".dim_layer").css("display","none");
      $(".dim_layer").css("height","100%");
      $('#mMv01').stop();
      $(".wrap").css("height","auto");
      $(".wrap").css("overflow","auto");
    });
  }

function toggleLmenu(self,obj){
	var $self = $(self);
    if($self.hasClass("btn_lnm_close")) {
	    $(obj).stop().animate({ left : -320 + 'px'}, 200, "easeOutExpo");
	    $(".cont_right").stop().animate({ marginLeft : 0 + 'px' }, 200, "easeOutExpo");
	    $self.removeClass('btn_lnm_close');
	    $self.addClass('btn_lnm_open');
	}
	else if($self.hasClass("btn_lnm_open")) {
		$(".cont_left").focus();
		$(obj).stop().animate({ left : 0 }, 200, "easeOutExpo");
		$(".cont_right").stop().animate({ marginLeft : 231 + 'px' }, 200, "easeOutExpo");
		$self.removeClass('btn_lnm_open');
		$self.addClass('btn_lnm_close');
	}
}

function showResentMssg(obj){
	$(obj).attr('tabindex', '0').focus();    

	var box_height = $('.rMessage_box').outerHeight();
	console.log(box_height);
	$(obj).stop().animate({ bottom : box_height }, 200, "easeOutQuart");
	$(obj).addClass("rmsg-open");
	
	$('.rmssg_close').click(function(){
	    	$(obj).stop().animate({ bottom : 0}, 200, "easeOutQuart");
	    	$(obj).removeClass("rmsg-open");
	});	
  }

// monthly, weekly select
function calendar_select(e){
	var $e = $(e);

	if($e.length == 0){
		return false;
	}

	$e.on("change",function(){
		var chk = $(this).prop('checked');
		if(chk==true){
			var showClass = $(this).attr('id');
			$(".cal_monthly, .cal_weekly").hide();
			$("."+showClass).show();
		}
	});
}

// list_checking
function list_checking(e){
	var $e = $(e);

	if($e.length == 0){
		return false;
	}

	$e.on("change",function(){
		var chk = $(this).prop('checked');
		if(chk==true){
			$(this).parent().parent().addClass('tr-checked')
		} else {
			$(this).parent().parent().removeClass('tr-checked')
		}
	});
}

$(document).ready(function() {
	// Progressbar
	$('.pgbar_ui').each(function(index, item){
		var pg_value = $(item).children().attr('value');
		$(item).find('.pgbar').animate({width: pg_value +'%', overflow:'auto'}, 1200, 'swing');
		// console.log("dd?", pg_value);
		// $(item).find('.pgbar').css('width', $(item).attr('value') + '%');
	});

    // mob LNB 하위 메뉴 펼쳐짐   
	$(".lnbList > dd > a").on("click", function(e){
		if($(this).parent().has("ul")) {
		  e.preventDefault();
		}

		if(!$(this).hasClass("open")) {
		  // hide any open menus and remove all other classes
		  $(".lnbList dd ul").slideUp(350);
		  $(".lnbList dd a").removeClass("open");
		  
		  // open our new menu and add the open class
		  $(this).next("ul").slideDown(350);
		  $(this).addClass("open");
		}

		else if($(this).hasClass("open")) {
		  $(this).removeClass("open");
		  $(this).next("ul").slideUp(350);
		}
	});

	// garbage btn
	$('.tabcontent .smsTotWrap .smsWrap .speBtnClose').on('click',function(){
		$('.specialWrap').css('display', 'none');
    });
    $('.specialBtn').on('click',function(){
		$('.specialWrap').css('display', 'block');
    });

	$('.right_menu .tab_list .btn_tabclose').on('click',function(){
		$(this).parent().remove();
    });

	$('.range_wrap .btn_garbage, .schema_wrap .tab_list2 .btn_garbage').on('click',function(){
		$(this).parent().remove();
    });

    
	// File Import
    $('.btn_import, .file_upload > .inpDiv').on('click',function(){
      $('#files').click();
    });
    $('#files').change(function(){
      var input = $(this).val();
      var input_value = input.replace("C:\\fakepath\\","")
      $('.file_address').val(input_value);
    });

    // 스크롤 탑
    $(".go_top button").on("click", function(){
        $("html, body").stop().animate({ scrollTop : 0 }, 200, "easeOutQuad"); 
    });

    // quick menu    
    $(".btn_create2").on("click", function(){
        var cre_posTop = ($(this).offset().top) - 10 ;
        var cre_posLeft = ($(this).offset().left) + 30 ;
        
        $('.quickmenu').fadeIn(150);
        $('.quickmenu').offset({top: cre_posTop, left: cre_posLeft});
    });

   
	var arrowTimer = null;
	if($(".guide_scroll p span").length) {
		function animation() {
			$(".guide_scroll p span").stop().animate(
				{opacity:0.2},
			{
			duration:700,
			complete:function() {
				$(this).stop().animate({opacity:1},{duration:700,complete:animation});
			}
		});
		} animation();
	}

    // quick menu Close
	    $(document).mouseup(function(e){
	        var container = $(".quickmenu");
			if (!container.is(e.target)  && container.has(e.target).length == 0){
				container.css('display', 'none');
			}
	    });
	    $('.quickmenu button').click(function(e){
	        var container = $(".quickmenu");
			container.css('display', 'none');
	    });



	$(window).scroll(function(){
		var wintop = $(window).scrollTop(), 
		  docheight = $(document).height(), 
		  conheight = $('.typeB_layer').height(), 
		  winheight = $(window).height();
		var scrolltrigger = 0.2;

		if((wintop/(docheight-winheight)) > scrolltrigger) {
			//console.log('scroll bottom');
			$(".go_top").fadeIn();
		}else{
			$(".go_top").fadeOut();
		}
		//  mobile scroll red line check
		if(wintop > 373) {
			//console.log('scroll bottom');
			// $(".go_top").fadeIn();
			// console.log();
			$('.mTypeB header').css("border-bottom","3px solid #cc374a");
		}else  if  (wintop > 182) {
			$('.mTypeC header').css("border-bottom","3px solid #cc374a");
		}else{
			$('header').removeAttr('style');
			// $(".go_top").fadeOut();
		}
	});


	// accordion - Toggle
	$(".accordion > li a.acco_toggle, .accordion > li > ul > li a.acco_toggle, .accordion > dd a.acco_toggle, .accordion > dd > ul > li a.acco_toggle").on("click", function(e){
		if($(this).parent().has("ul")) {
		  e.preventDefault();
		}
		// one open script
		if(!$(this).hasClass("active")) {
	      // hide any open menus and remove all other classes
	      $(this).parents('.accordion').find('.hidden_div').slideUp(350);
	      $(this).parents('.accordion').find('a').removeClass("active");
	      
	      // open our new menu and add the open class
	      $(this).parent().next().slideDown(350);
	      $(this).addClass("active");
	    }
	    
	    else if($(this).hasClass("active")) {
	      $(this).removeClass("active");
	      $(this).parent().next().slideUp(350);
	    }
	});

	// accordion - Toggle
	$(".accordion2 > li > div > a.acco_toggle").on("click", function(e){
		if($(this).parent().has("ul")) {
		  e.preventDefault();
		}
		if(!$(this).hasClass("active")) {
		  // hide any open menus and remove all other classes
		  $(".accordion2 li .hidden_div").slideUp(350);
		  $(".accordion2 li div a").removeClass("active");
		  
		  // open our new menu and add the open class
		  $(this).parent().next().slideDown(350);
		  $(this).addClass("active");
		}

		else if($(this).hasClass("active")) {
		  $(this).removeClass("active");
		  $(this).parent().next().slideUp(350);
		}
	});

	// accordion - Toggle
	$(".accordion_inner > li > div > a.acco_toggle").on("click", function(e){
		if($(this).parent().has("ul")) {
		  e.preventDefault();
		}
		if(!$(this).hasClass("active")) {
		  // hide any open menus and remove all other classes
		  $(".accordion_inner li .hidden_div").slideUp(350);
		  $(".accordion_inner li div a").removeClass("active");
		  
		  // open our new menu and add the open class
		  $(this).parent().next().slideDown(350);
		  $(this).addClass("active");
		}

		else if($(this).hasClass("active")) {
		  $(this).removeClass("active");
		  $(this).parent().next().slideUp(350);
		}
	});



	// acco_opened - no Toggle
	// $(".acco_opened > li a.acco_act").on("click", function(e){
	// 	if($(this).parent().has("ul")) {
	// 	  e.preventDefault();
	// 	}

	// 	// multi open script
	// 	if(!$(this).hasClass("active")) {
	// 	  // open our new menu and add the open class
	// 	  $(this).parent().next().slideDown(350);
	// 	  $(this).parent('.opener').addClass("active");		  
	// 	  $(this).addClass("active");		  
	// 	}
	// 	else if($(this).hasClass("active")) {
	// 	  $(this).parent('.opener').removeClass("active");		  
	// 	  $(this).removeClass("active");
	// 	  $(this).parent().next().slideUp(350);
	// 	}
	// });



	// acco_opened - no Toggle
	$(".acco_opened > li > div > span").on("click", function(e){
		if($(this).parent().has("ul")) {
		  e.preventDefault();
		}

		// multi open script
		if(!$(this).hasClass("active")) {
		  // open our new menu and add the open class
		  $(this).parent().next().slideDown(350);
		  $(this).parent('.opener').addClass("active");		  
		  $(this).addClass("active");		  
		}
		else if($(this).hasClass("active")) {
		  $(this).parent('.opener').removeClass("active");		  
		  $(this).removeClass("active");
		  $(this).parent().next().slideUp(350);
		}
	});

	// acco_opened - no Toggle
	$("._table > thead > tr > th > .lineUp > a").on("click", function(e){
		// multi open script
		if($(this).hasClass("up")) {
		  // open our new menu and add the open class
		  $(this).removeClass("up");
		  $(this).addClass("down");		  
		}
		else if($(this).hasClass("down")) {
		  $(this).removeClass("down");		  
		  $(this).addClass("up");
		}
	});

	// Tab
		$('.tab_list div').click(function() {
	        var activeTab = $(this).attr('data-tab');
	        $('.tab_list div').removeClass('current');
	        $('.tab-content').removeClass('current');
	        $(this).addClass('current');
	        $('#' + activeTab).addClass('current');
	    });

	// Tab 
	$('ul.innertab_list li').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('ul.innertab_list li').removeClass('current');
        $('.tabcontent').removeClass('current');
        $(this).addClass('current');
        $('#' + activeTab).addClass('current');
    });

   

 //    // Tab3 
	// $('ul.innertab_list > li').click(function() {
 //        var activeTab = $(this).attr('data-tab3');
 //        $('ul.innertab_list > li').removeClass('innercurrent');
 //        $('.innertabcontent').removeClass('innercurrent');
 //        $(this).addClass('innercurrent');
 //        $('#' + activeTab).addClass('innercurrent');
 //    });

    // parameter add
	$('.para_tit .btn_sml.btn').click(function() {
        $(this).parents('.parameter_add').find('.paraDiv_drag').stop().slideDown(350);
    });
    

    // tooltip
    $( '.tooltip').on("mouseover",function(){
		$(this).next('.tooltiptext').stop().fadeIn(300);
    });
    $( '.tooltip').on("mouseout",function(){
		$(this).next('.tooltiptext').stop().fadeOut(300);
    });

	$(window).resize(function(){/*(이슈) 3.헤더영역이슈*/
		// 화면 사이즈 변화에 따라 푸터 하단에 위치
		var h = $(window).height();
		var headerH = $(".wrap").find("header").height();
		//var footH = $(".wrap").find("footer").height();
		//var bodyH = $(".wrap").find(".cont_bar").height();

		var conH = h - headerH -3// - bodyH;//- footH
		// console.log("sectionH : " + sectionH)
		$(".content_layout, .cont_right").css({
			"min-height": conH-0 +"px"
		});

		$(".cont_spec").css({
			"height": conH-0 +"px"
		});
	}).resize();
	
});


jQuery(function($){
	
	// Common
	var select_root = $('div.select');
	var select_value = $('.myValue');
	var select_a = $('div.select>div.category_list>div>ul>li>a');
	var select_close = $('div.select>div.category_list>.layer_close');
	
	// Show
	function show_option(){
		$(this).parents('div.select:first').toggleClass('open');
	}
	
	// // Hover
	// function i_hover(){
	// 	$(this).parents('ul:first').children('li').removeClass('hover');
	// 	$(this).parents('li:first').toggleClass('hover');
	// }
	
	// Hide
	function hide_option(){
		var t = $(this);
		setTimeout(function(){
			t.parents('div.select:first').removeClass('open');
		}, 1);
	}
	
	// Set Anchor
	function set_anchor(){
		var v = $(this).text();
		$(this).parents('.category_list').prev('.myValue').text('').append(v);
		$(this).parents('.category_list').prev('.myValue').addClass('selected');
	}

	// Anchor Focus Out
	$('*:not("div.select a")').focus(function(){
		$('.aList').parent('.select').removeClass('open');
	});
	
	select_value.click(show_option);
	select_root.find('.category_list').css('position','absolute');
	select_root.removeClass('open');
	select_a.click(set_anchor).click(hide_option);
	select_close.click(hide_option);
	
	
});

jQuery(function($){
	var tree = $('.tree');
	var togglePlus = '<button type="button" class="toggle plus">+</button>';
	var toggleMinus = '<button type="button" class="toggle minus">-</button>';
	
	// defalt
	tree.find('li>ul').css('display','none');
	tree.find('ul>li:last-child').addClass('last');
	tree.find('li>ul:hidden').parent('li').prepend(togglePlus);
	tree.find('li>ul:visible').parent('li').prepend(toggleMinus);
	
	// active
	tree.find('li.active').parents('li').addClass('open');
	tree.find('li.open').parents('li').addClass('open');
	tree.find('li.open>.toggle').text('-').removeClass('plus').addClass('minus');
	tree.find('li.open>ul').slideDown(100);
	
	// click toggle
	$('.tree .toggle').click(function(){
		t = $(this);
		t.parent('li').toggleClass('open');
		if(t.parent('li').hasClass('open')){
			t.text('-').removeClass('plus').addClass('minus');
			t.parent('li').find('>ul').slideDown(100);
		} else {
			t.text('+').removeClass('minus').addClass('plus');
			t.parent('li').find('>ul').slideUp(100);
		}
	});
	
});

(function ($) {
    'use strict';

	$.fn.clickAccordion = function (obj, other){
		var target = $(obj).attr("value");

		$("." + other).children('div').slideDown(350);
		$("." + other).siblings("li").removeClass("active");
		$("." + other).children('a').addClass("active");

		$(obj).siblings("a").removeClass("on");
		$(obj).addClass("on");
		
	    var offset = $(".li" + target).offset();
        $('html, body').animate({scrollTop : offset.top}, 400, "easeOutQuad");
	}
})(jQuery);	

//*** blockUI ***********************************************************************************//
(function($){
	$(window).on("load resize scroll", function() {
		jf_blockUISizeSet();
	});
})(jQuery);

//escape 클릭시 blockUI Close
$(document).on('keyup',function(evt) {
	if($('.blockMsg').size() > 0){
		if (evt.keyCode == 27) {
			$.unblockUI();
		}
	}
});
function jf_blockUISizeSet(){
	if($('.blockMsg').size() > 0){
		var w_screen = $(window).width(); //화면 가로 해상도를 구한다.
		//창크기에 따라 변환
		$('.blockMsg').css("width","472px");
		if(w_screen <= 768 && w_screen > 380){
			$('.blockMsg').css("width","90%");
		}else if(w_screen <= 380){
			$('.blockMsg').css("width","96%");
		}
		
		
		var widthVal = $('.blockMsg').width();
		if(widthVal != null){
			var leftVal = (w_screen/2)-(widthVal/2);
			$('.blockMsg').css("left",leftVal+"px");
		}
		
		var h_screen = $(window).height(); //화면 세로 해상도를 구한다.
		var heightVal = $('.blockMsg').height();
		if(heightVal != null){
			var topVal = (h_screen/2)-(heightVal/2);
			$('.blockMsg').css("top",topVal+"px");
		}
	}
}

$(function(){
	$(document).on("click","._blockUI",function(){
		if($(this).is("a")){
			var href = $(this).attr("href");
			//$(this).attr("target", "blockUI");
			
			var className = $(this).attr("class").replace("_blockUI ", "");
			var html = 	"<div class=\"_blockInner\">"+
						"	<div class=\"_popHeader\">"+
						"<span class=\"pop_Title\">제목</span>"+
						"		<a href=\"#close\" onclick=\"$.unblockUI();\" class=\"_blockClose\">close</a>"+
						"	</div>"+
						"	<div class=\"_popContent\">"+
						"		<div class=\"popconBox\">"+
						//"	<iframe name=\"blockUI\" src=\""+href+"\" class='"+className+"'></iframe>"+
						"		</div>"+
						"	</div>"+
						"</div>";
			$.blockUI({
				message:html
			});
			
			var blockClass = $('.blockMsg').attr("class") + " "+className;
			$('.blockMsg').attr("class", blockClass);
			
			jf_blockUISizeSet();
			return false;
		}
	});
	
	
});
function blockUI(customTag){
	if(customTag != null){
		
		if(customTag.indexOf("iframe") == -1){
			customTag = "<div class=\"_blockWrap\">"+customTag+"</div>";
		}
		
		var html = 	"<div class=\"_blockInner\">"+
					"	<a href=\"#close\" onclick=\"$.unblockUI();\" class=\"_blockClose\">close</a>"+
					"	"+customTag+""+
					"</div>";
		$.blockUI({
			message:html
		});
		
		jf_blockUISizeSet();
	}else{
		$.blockUI({ css: {             
		 	border: '0',             
		 	padding: '15px',             
		 	backgroundColor: '#101010',
		 	opacity: .75,             
		 	color: '#fff' 
		} }); 
	}
	
}

function unblockUI(){
	$.unblockUI();
}
//*** blockUI ***********************************************************************************//


