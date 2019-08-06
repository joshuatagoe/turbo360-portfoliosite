// Strict Mode
"use strict";

// Window Load Event
$(window).on("load", function() {
	// Loader Fade Out
    $(".lx-loader").fadeOut();
    return false;
});

// Document Ready event
$(document).on("ready", function() {
	// Menu Mobile Init
	if($(window).width() < 1024){
		if($(".lx-body-menu").length){
			$(".lx-body-menu").css("top","-" + ($(".lx-body-menu").outerHeight() + 5) + "px");
		}
	}
	// Resize Youtube Iframe
	if($("iframe[allowfullscreen]").length){
		$("iframe[allowfullscreen]").height($("iframe[allowfullscreen]").width() * 0.5625);
	}
	// Mini Slide Init
	if($(".lx-mini-slide").length){
		for(var i=0;i<$(".lx-mini-slide").length;i++){
			$(".lx-mini-slide:eq("+i+") ul li").css({"width":$(".lx-mini-slide:eq("+i+")").outerWidth()+"px"});
			$(".lx-mini-slide:eq("+i+") ul").css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+$(".lx-mini-slide:eq("+i+") ul li").outerWidth()+"px"});		
		}		
	}
	// Large Slide Init
	if($(".lx-large-slide").length){
		$(".lx-large-slide").height($(window).height() - 100);
		$(".lx-large-slide ul li").height($(window).height() - 100);
		$(".lx-portfolio-item").css({"max-height":($(window).height()-100)+"px","max-width":$(".lx-large-slide").width()+"px"});
		$(".lx-portfolio-item-img").css({"max-height":($(window).height()-100)+"px","max-width":$(".lx-large-slide").width()+"px"});
		$(".lx-portfolio-item-img img").css({"max-height":($(window).height()-100)+"px","max-width":$(".lx-large-slide").width()+"px"});
		for(i=0;i<$(".lx-portfolio-item").length;i++){
			$(".lx-portfolio-item:eq("+i+")").before("<img src='"+$(".lx-portfolio-item:eq("+i+") img").attr("src")+"' />");
			if($(".lx-large-slide").width() > $(".lx-portfolio-item:eq("+i+") img").width()){
				$(".lx-portfolio-item:eq("+i+")").prev("img").css({"left":(($(".lx-large-slide").width()/2)-($(".lx-portfolio-item:eq("+i+") img").width()/2))+"px","transform":"scale("+($(".lx-large-slide").width()/$(".lx-portfolio-item:eq("+i+") img").width())+")"});
			}
			else{
				$(".lx-portfolio-item:eq("+i+")").prev("img").css({"top":(($(".lx-large-slide").height()/2)-($(".lx-portfolio-item:eq("+i+") img").height()/2))+"px","transform":"scale("+($(".lx-large-slide").height()/$(".lx-portfolio-item:eq("+i+") img").height())+")"});
			}
		}
	}
	// Footer Init
	if($(window).height() > ($(".lx-footer").height()+$(".lx-footer").offset().top)){
		$(".lx-footer").css("margin-top",($(window).height() - ($(".lx-footer").height()+$(".lx-footer").offset().top)));
	}
	return false;
});

// Mini Slide Effect
var lx_passed = "yes";
$(".lx-mini-slide-nav > .fa-angle-right").on("click",function(){
	if(lx_passed === "yes"){
		lx_passed = "no";
		var ul = $(this).parent().parent().find("ul")
		ul.css({"-webkit-transition":"all 0.4s","transition":"all 0.4s","left":"-"+(ul.find("li").outerWidth()*2)+"px"});
		window.setTimeout(function(){
			ul.css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+ul.find("li").outerWidth()+"px"});
			var item = "<li style='width:"+ul.find("li").outerWidth()+"px;'>"+ul.find("li:eq(0)").html()+"</li>";
			ul.append(item);
			ul.find("li:eq(0)").remove();
			lx_passed = "yes";
		},500);
	}
});
$(".lx-mini-slide-nav > .fa-angle-left").on("click",function(){
	if(lx_passed === "yes"){
		lx_passed = "no";
		var ul = $(this).parent().parent().find("ul")
		ul.css({"-webkit-transition":"all 0.4s","transition":"all 0.4s","left":"0px"});
		window.setTimeout(function(){
			ul.css({"-webkit-transition":"all 0s","transition":"all 0s","left":"-"+(ul.find("li").outerWidth())+"px"});
			var item = "<li style='width:"+ul.find("li").outerWidth()+"px;'>"+ul.find("li:last-child").prev(".lx-mini-slide ul li").html()+"</li>";
			ul.prepend(item);
			ul.find("li:last-child").prev(".lx-mini-slide ul li").remove();
			lx_passed = "yes";
		},500);
	}
});

// Submenu Effects
$(".lx-has-children > a").on("click",function(){
	if($(window).width() < 1024){
		if($(this).next("div").css("display") !== "block"){
			$(".lx-body-submenu").slideUp();
			$(this).next("div").slideDown();
		}
		else{
			$(this).next("div").slideUp();
		}
	}
});

// Submenu Mobile Effect
$(".lx-body-menu > a").on("click",function(){
	if(parseInt($(".lx-body-menu").css("top"),10) < 0){
		$(".lx-body-menu").css("top","0px");
	}
	else{
		$(".lx-body-menu").css("top","-" + ($(".lx-body-menu").outerHeight() + 5) + "px");
	}
});

// Responsive Sidebar  Effect
$(".lx-add").on("click", function() {
	$(".lx-sidebar").css("right","0px");
	$(".lx-main-menu-mobile").css("left","-160px");
	return false;
});
$(".lx-sidebar > i").on("click", function() {
	$(".lx-sidebar").css("right","-100%");
	return false;
});

// Sidebar Scrolling Effect
if($(".lx-sidebar").length){
	var sidebarold = ($(".lx-sidebar").offset().top + $(".lx-sidebar").height() - $(window).height());
	$(document).on("scroll",function(){
		if($(window).width() > 1023){
			var sidebarwidth = $(".lx-sidebar").outerWidth();
			if($(this).scrollTop() > ($(".lx-sidebar").offset().top + $(".lx-sidebar").height() - $(window).height())){
				$(".lx-sidebar").css({"position":"fixed","bottom":"0px","width":sidebarwidth+"px"});
			}
			else if($(this).scrollTop() <= sidebarold){
				$(".lx-sidebar").removeAttr("style");
			}		
		}
	});	
}