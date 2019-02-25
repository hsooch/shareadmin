// 'use strict';
(function($){
	$(document).ready(function(){
		$(".select-ui strong a").on('click', function(){
			$(this).each(function(){
				if(!$(this).parents('div.select-ui').hasClass("open")){
					$(this).parents('div.select-ui').addClass("open");
				}else{
					$(this).parents('div.select-ui').removeClass("open");
				}
			});
		});
		$(".select-ui ul li a").click(function() {
			$(this).each(function(){
			  var text = $(this).html();
			  $(this).parents('div.select-ui').find('strong a').html(text);
			  $(".select-ui ul").parents('div.select-ui').removeClass('open');
			});
		});

		$(document).bind('click', function(e) {
		  var $clicked = $(e.target);
		  if (!$clicked.parents().hasClass("dropdown"))
		    $(".dropdown dd ul").hide();
		});

		// table resize
		tbResize();
		function tbResize(){
			var winSize = $(window).width();
			var $noResult = $('.search-tb-list .tb-list tr td.no-result');
			if(winSize < 768){
				$noResult.attr("colspan", 3);
			}else if(winSize < 1200){
				$noResult.attr("colspan", 6);

			}else{
				$noResult.attr("colspan", 10);
			};
		}
		$(window).resize(function(){
			tbResize();
		});

		// 학점교류신청내역 flag
		stateFlag();
		function stateFlag(){
			var $flag = $('.flag');
			$flag.filter(":contains('신청중')").addClass('flag-ing');
			$flag.filter(":contains('반려')").addClass('flag-return');
			$flag.filter(":contains('승인')").addClass('flag-approval');
			$flag.filter(":contains('취소')").addClass('flag-cancel');
		}

		// 레이어팝업 모바일 > 신청중인 내역 > 상세보기 아코디언
		btnDropdown();
		function btnDropdown(){
			var $btnDetail = $('.btn-detail');
			$btnDetail.on('click', function(){
				$(this).each(function(){
					if(!$(this).parents('tr').next('tr').hasClass('active')){
						$(this).parents('tr').next('tr').addClass('active');
						$(this).text('닫기').addClass('active');

					}else{
						$(this).parents('tr').next('tr').removeClass('active');
						$(this).text('보기').removeClass('active');
					}
				});
			});
		}
	});
})(jQuery);
