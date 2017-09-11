//鍮꾩＜��
$(function() {
	var $rowgroup = $("#container .rowgroup");
	var $visual = $rowgroup.children(".visual");
	var $visualList = $visual.children(".visual_list");
	var $visualListUl = $visualList.children("ul");
	var $visualListEach = $visualListUl.children("li");
	var $visualListWrap = $visualListEach.children(".visual_wrap");
	var $visualListImgBox = $visualListWrap.children(".visual_img");
	var $visualListContBox = $visualListWrap.children(".visual_cont");
	var $visualListContBoxWrap = $visualListContBox.children(".wrap");
	var $visualListContImg = $visualListContBoxWrap.children("img");
	var $visualListImg = $visualListImgBox.children("img");
	var visualListEachCnt = $visualListEach.length;
	var $visualCtrl = $visual.children(".visual_control");
	var $visualCircleBtn = $visualCtrl.find(".circle_btn");
	var $visualCtrlFirst = $visualCtrl.find("button:first-child");
	var isRun = true;
	var idx = 0;

	$visualListEach.eq(0).addClass("active");
	$visualCircleBtn.eq(0).addClass("active");
	$visualCircleBtn.eq(0).replaceText("爰쇱쭚", "耳쒖쭚");

	$visualListImg.eq(0).load(function() {
		$rowgroup.height($visualListUl.children("li.active").children(".visual_wrap").children(".visual_img").children("img").height());
	}).each(function() { //ie fix
		if(this.complete) $(this).load();
	});

	$visualListContImg.eq(0).load(function() {
		$visualListEach.eq(0).children(".visual_wrap").children(".visual_cont").css("margin-bottom", -$visualListUl.children("li.active").children(".visual_wrap").children(".visual_cont").children(".wrap").children("img").height()/2);
	}).each(function() { //ie fix
		if(this.complete) $(this).load();
	});
	
	//諛곌꼍�대�吏� �쒕옒洹� 湲덉�
	$visualListImgBox.on("dragstart", function() {
		return false;
	});

	$visualCircleBtn.click(function() {
		if(isRun) {
			var myIdx = $(this).index() -1;
			var activeIdx = $visualListUl.children("li.active").index();
				
			if(myIdx != activeIdx) {
				isRun=false;

				$visualListContBox.eq(myIdx).css("margin-bottom", 0);
				$visualListContBox.eq(myIdx).children(".wrap").children("img").css("opacity", 0);

				$visualListEach.eq(myIdx).show();
				$visualListEach.eq(activeIdx).fadeOut(1000, function() {
					$(this).removeClass("active");
					$visualListEach.eq(myIdx).addClass("active");
					$visualListContBox.eq(myIdx).stop().animate({"marginBottom": -$visualListEach.eq(myIdx).children(".visual_wrap").children(".visual_cont").children(".wrap").children("img").height()/2}, 1000);
					$visualListContBox.eq(myIdx).children(".wrap").children("img").animate({"opacity": 1}, 1000); //ie8 fix
					isRun=true;
					idx=myIdx;
				});

				$visualCircleBtn.eq(activeIdx).replaceText("耳쒖쭚", "爰쇱쭚");
				$visualCircleBtn.eq(activeIdx).removeClass("active");
				$visualCircleBtn.eq(myIdx).replaceText("爰쇱쭚", "耳쒖쭚");
				$visualCircleBtn.eq(myIdx).addClass("active");
			}
		}
	});
	
	function visualIf() {
		idx++;

		if(visualListEachCnt != idx) {
			$visualCircleBtn.eq(idx).click();
		}else{
			idx=0;
			$visualCircleBtn.eq(idx).click();
		}
	}

	var visualInterval = setInterval(function() {
		visualIf();
	},5000);
	
	function visualStop() {
		clearInterval(visualInterval);
	}

	$visualCtrlFirst.click(function() {
		if($(this).hasClass("visual_stop")) {
			visualStop();
			$visualCtrlFirst.replaceText("�뺤�", "�ъ깮");
			$(this).removeClass("visual_stop");
			$(this).addClass("visual_play");
		}else{
			visualInterval = setInterval(function() {
				visualIf();
			},5000);

			$(this).removeClass("visual_play");
			$(this).addClass("visual_stop");
			$visualCtrlFirst.replaceText("�ъ깮", "�뺤�");
		}
	});

});

//�묒＜news
$(function() {
	var $rowgroup2 = $("#container .rowgroup2");
	var $news = $rowgroup2.find(".news");
	var $newsHeading = $news.children("h2");
	var $newsA = $newsHeading.children("a");
	var $newsMore = $news.children(".more");

	$newsA.hover(function(){
		$newsMore.addClass("hover");
    }, function(){
		$newsMore.removeClass("hover");
	});
});

//sns梨꾨꼸
$(function() {
	var $wrapper = $("#wrapper");
	var $rowgroup2 = $("#container .rowgroup2");
	var $sns = $rowgroup2.find(".sns");
	var $snsHeight = $sns.height();
	var $snsWrap = $sns.children(".sns_wrap");
	var $snsGroup = $snsWrap.children(".sns_group");
	var $snsPart = $snsGroup.children(".sns_part");
	var $snsCont = $snsPart.children(".sns_cont");
	var $snsOpen = $snsWrap.children(".sns_open");
	var $snsOpenBtn = $snsOpen.children("button");
	var $snsCtrl = $snsGroup.children(".sns_control");
	var $snsLeft = $snsCtrl.children(".sns_left");
	var $snsRight = $snsCtrl.children(".sns_right");
	var $snsClose = $snsGroup.children(".sns_close");
	var $snsCloseBtn = $snsClose.children("button");
	var snsContCnt = $snsCont.length;
	var idx = 0;
	var isRun = true;
	var snsView = 0;
	var snsMod = 0;
	var snsIdx = 1;
	var snsTemp = 0;

	//init
	$snsPart.eq(0).addClass("active");
	$snsPart.children(".sns_cont:nth-child(2n)").addClass("second");

	$snsOpenBtn.click(function() {
		var $snsTop = $sns.offset().top;
		var $cultureList = $("#container .rowgroup3 .culture .culture_list");
		var $cultureListLiHeight = $cultureList.find("li").eq(0).height();
		var $cultureListTop = $cultureList.offset().top;
		var slideHeight = $cultureListTop - $snsTop + $cultureListLiHeight;
		
		$snsOpen.fadeOut("fast", function() {
			$rowgroup2.addClass("sns_active");
			$snsCtrl.show();
			$snsClose.show();
			if($wrapper.hasClass("mobile")) {
				//媛깆떊
				snsView = 3;
				snsMod = Math.ceil(snsContCnt/snsView);
				$snsCont.slice(0,3).show();
			}else{
				//媛깆떊
				snsView = 6;
				snsMod = Math.ceil(snsContCnt/snsView);
				$snsWrap.height(slideHeight);
				$snsCont.slice(0,6).show();
			}
		});
	});

	$snsCloseBtn.click(function() {
		$snsClose.fadeOut("fast", function() {
			$rowgroup2.removeClass("sns_active");
			$snsWrap.removeAttr("style");
			$snsCtrl.hide();
			$snsClose.hide();
			$snsOpen.fadeIn("fast");
			snsTemp = 0;
			snsIdx = 1;

			if($wrapper.hasClass("mobile")) {
				$snsCont.hide();
				$snsCont.eq(0).show();
			}else{
				$snsCont.hide();
				$snsCont.slice(0,2).show();
			}

		});
	});

	$snsLeft.click(function() {
		if(snsIdx > 1) {
			snsIdx--;
			snsTemp = snsTemp - snsView;

			$snsCont.hide();
			$snsCont.slice(snsTemp, snsIdx*snsView).show();
		}else{
			var backMod = snsContCnt % snsView;
			if(backMod == 0) {
				snsIdx=snsMod;
				snsTemp=snsContCnt-snsView;
				$snsCont.hide();
				$snsCont.slice(snsTemp, snsIdx*snsView).show();
			}else{
				snsIdx=snsMod;
				snsTemp=snsContCnt-backMod;
				$snsCont.hide();
				$snsCont.slice(snsTemp,snsContCnt).show();
			}
		}
	});

	$snsRight.click(function() {
		if(snsIdx < snsMod) {
			snsIdx++;
			snsTemp = snsTemp + snsView;

			$snsCont.hide();
			$snsCont.slice(snsTemp, snsIdx*snsView).show();

		}else{
			snsIdx = 1;
			snsTemp = 0;

			$snsCont.hide();
			$snsCont.slice(snsTemp, snsIdx*snsView).show();
		}
	});
});

//臾명솕�됱궗 �덈궡
$(function() {
	var $culture = $("#container .rowgroup3 .culture");
	var $cultureWrap = $culture.children(".wrap");
	var $cultureList = $culture.children(".culture_list");
	var $cultureListUl = $cultureList.children("ul");
	var $cultureListLi = $cultureListUl.children("li");
	var $cultureListLiCnt = $cultureListLi.length;
	var $cultureListA = $cultureListLi.children("a");
	var $cultureCtrl = $cultureWrap.children(".culture_control");
	var $cultureLeft = $cultureCtrl.children(".culture_left");
	var $cultureRight = $cultureCtrl.children(".culture_right");
	var isRun = true;
	var totalWidth = 0;

	for(var i=0; i<$cultureListLiCnt; i++) {
		totalWidth += $cultureListLi.eq(i).outerWidth(true);
	}

	$cultureListUl.width(totalWidth);
	$cultureList.attr("tabindex", -1);
	$cultureList.css("-webkit-overflow-scrolling", "touch");

	$cultureListA.on("mouseenter focusin", function() {
		$(this).parent("li").addClass("active");
	}).on("mouseleave focusout", function() {
		$(this).parent("li").removeClass("active");
	});
	
	$cultureLeft.click(function() {
		if(isRun) {
			isRun = false;
			var leftVal = parseInt($cultureListUl.css("left"));
			var liWidth = $cultureListUl.children("li:last-child").width();
			var totalMove = leftVal + liWidth;

			$cultureListUl.animate({"left":totalMove}, 500, function() {
				$cultureListUl.children("li:last-child").clone(true).prependTo($cultureListUl);
				$cultureListUl.children("li:last-child").remove();
				$cultureListUl.css("left", leftVal);
				isRun = true;
			});
		}
	});

	$cultureRight.click(function() {
		if(isRun) {
			isRun = false;
			var rightVal = parseInt($cultureListUl.css("left"));
			var liWidth = -$cultureListUl.children("li").eq(0).width();
			var totalMove = rightVal + liWidth;

			$cultureListUl.animate({"left":totalMove}, 500, function() {
				$cultureListUl.children("li").eq(0).clone(true).appendTo($cultureListUl);
				$cultureListUl.children("li").eq(0).remove();
				$cultureListUl.css("left", rightVal);
				isRun = true;
			});
		}
	});
});

//�ы뻾�뺣낫 �덈궡
$(function() {
	var $travelInfo = $("#container .rowgroup3 .travel_info .wrap");
	var $travelInfoUl = $travelInfo.children("ul");
	var $travelInfoLi = $travelInfoUl.children("li");
	var $travelInfoA = $travelInfoLi.children("a");

	$travelInfoA.on("focusin mouseenter", function() {
		$(this).parent("li").addClass("active");
	}).on("focusout mouseleave", function() {
		$travelInfoA.parent("li").removeClass("active");
	});

});

//�듬찓��
$(function() {
	var $quickMenu = $("#container .quickmenu");
	var quickMenuWidth = $quickMenu.width();
	var quickMenuHeight = $quickMenu.height();
	var $quickMenuA = $quickMenu.children("a");
	var $rowgroup2Wrap = $("#container .rowgroup2 > .wrap");
	var previdx = 1;
	var target1 = $quickMenuA.eq(0).attr("href");
	var target2 = $quickMenuA.eq(1).attr("href");
	var target3 = $quickMenuA.eq(2).attr("href");
	var lastScroll = 0;
	var speed = 100;
	var top = parseInt($quickMenu.css("top"));
	var time = 0;

	$quickMenu.addClass("active1");

	$(window).on("resize.quickMenu", function() {
		if(this.resizeTO) {
			clearTimeout(this.resizeTO);
		}
		this.resizeTO = setTimeout(function() {
			$(this).trigger('resizeEnd');
		}, 500);
	});

	//由ъ궗�댁쫰媛� �앸굹硫�
	$(window).on("resizeEnd.quickMenu", function() {
		var $rowgroup2WrapLeft = $rowgroup2Wrap.offset().left;
		$quickMenu.css("right", $rowgroup2WrapLeft-quickMenuWidth);
	});

	$(window).trigger("resizeEnd.quickMenu");

	$quickMenuA.click(function(event) {
		//if(new Date().getTime()-time >= speed) {
			//var idx = $quickMenuA.index(this) + 1;

			/*$quickMenu.removeClass("active"+previdx);
			$quickMenu.addClass("active"+idx);*/

			//previdx = idx;
			
			event.preventDefault();
		//}
	});

	function scrollClass(target, direction) {
		var $target = target;
		var $targetA = $target.children("a");
		var targetCnt = $targetA.length;

		//諛⑺뼢 寃곗젙
		if(direction == "down") {
			var quickMenuTop = $quickMenu.offset().top + quickMenuHeight;
		}else if(direction == "up") {
			var quickMenuTop = $quickMenu.offset().top;
		}

		for(var i=targetCnt; i>0; i--) {
			var moveText = $targetA.eq(i-1).attr("href");
			var targetTop = $(moveText).offset().top;

			if(quickMenuTop >= targetTop) {
				$quickMenu.removeClass("active"+previdx);
				$quickMenu.addClass("active"+i);
				previdx = i;
				break;
			}
		}
	}
	$(window).on("scroll.quickMenu", function() {
		if(new Date().getTime()-time >= speed) {
			time = new Date().getTime();
			var scrollPx = $(this).scrollTop();
			var myTop = scrollPx + top;
			var max = $("#container").height() - quickMenuHeight;

			if(myTop < max) {
				$quickMenu.stop().animate({"top" : myTop}, 500, function() {
					if(scrollPx > lastScroll){
					  //scroll down
						scrollClass($quickMenu, "down");
					}else{
						//scroll up
						scrollClass($quickMenu, "up");
					}
					lastScroll = scrollPx;
				});
			}
		}
	});
	
	//$(window).trigger("scroll.quickMenu");
});

var beforeRowgroupHeight = 0;

function lowIEAll_main(firstWidth, winWidth, firstHeight, winHeight) {
	if($("#container .rowgroup .visual .visual_list ul li.active .visual_img img").height() != beforeRowgroupHeight) {
		$("#container .rowgroup").height($("#container .rowgroup .visual .visual_list ul li.active .visual_img img").height());
		$("#container .rowgroup .visual .visual_list ul li.active .visual_wrap .visual_cont").css("margin-bottom", -$("#container .rowgroup .visual .visual_list ul li.active .visual_cont img").height()/2);
	}else{
		beforeRowgroupHeight = $("#container .rowgroup .visual .visual_list ul li.active .visual_img img").height();
	}
}

function lowIEInit_main(firstWidth, firstHeight) {
	//紐⑤뱶蹂�寃�
	$(".sns .sns_wrap .sns_group .sns_part .sns_cont").hide();
	$(".sns .sns_wrap .sns_group .sns_part .sns_cont").slice(0,2).show();
}

function all_main(firstWidth, winWidth, firstHeight, winHeight) {
	if($("#container .rowgroup .visual .visual_list ul li.active .visual_img img").height() != beforeRowgroupHeight) {
		$("#container .rowgroup").height($("#container .rowgroup .visual .visual_list ul li.active .visual_img img").height());
		$("#container .rowgroup .visual .visual_list ul li.active .visual_wrap .visual_cont").css("margin-bottom", -$("#container .rowgroup .visual .visual_list ul li.active .visual_cont img").height()/2);
	}else{
		beforeRowgroupHeight = $("#container .rowgroup .visual .visual_list ul li.active .visual_img img").height();
	}
}

function wide_main(firstWidth, winWidth, firstHeight, winHeight) {
	$(".sns .sns_wrap .sns_group .sns_close button").click();

	//紐⑤뱶蹂�寃�
	$(".sns .sns_wrap .sns_group .sns_part .sns_cont").hide();
	$(".sns .sns_wrap .sns_group .sns_part .sns_cont").slice(0,2).show();
}

function web_main(firstWidth, winWidth, firstHeight, winHeight) {
	$(".sns .sns_wrap .sns_group .sns_close button").click();

	//紐⑤뱶蹂�寃�
	$(".sns .sns_wrap .sns_group .sns_part .sns_cont").hide();
	$(".sns .sns_wrap .sns_group .sns_part .sns_cont").slice(0,2).show();
}

function tablet_main(firstWidth, winWidth, firstHeight, winHeight) {
	$(".sns .sns_wrap .sns_group .sns_close button").click();

	//紐⑤뱶蹂�寃�
	$(".sns .sns_wrap .sns_group .sns_part .sns_cont").hide();
	$(".sns .sns_wrap .sns_group .sns_part .sns_cont").slice(0,2).show();
}

function mobile_main(firstWidth, winWidth, firstHeight, winHeight) {
	//�곸냽�댁젣
	$(".sns .sns_wrap .sns_group .sns_close button").click();

	//紐⑤뱶蹂�寃�
	$(".sns .sns_wrap .sns_group .sns_part .sns_cont").hide();
	$(".sns .sns_wrap .sns_group .sns_part .sns_cont").eq(0).show();
}