// Variables
"use strict";

var nbpics;
var currentpic;
var popup = $(".lx-popup").not(".legal");
var popupImg = $(".lx-popup-image img");
var popupTitle = $(".lx-popup-details ul li:eq(0) span");
var pupupCpic = $(".lx-popup-details ul li:eq(1) span");

// espand popup click event
$(".lx-portfolio-item").click(function() {
    // set nbpics to 0
    nbpics = 0;
    // get the number of pictures
    for (var i = 0; i < $(".lx-portfolio-item").length; i++) {
        // increment the number of pictures
        nbpics += 1;
        // pot the number of picture in the attribute data
        $(".lx-portfolio-item:eq(" + i + ")").attr("data", nbpics);
    }
    // get current picture number
    currentpic = $(this).attr("data");
    // transmit information to the popup
    popupImg.attr("src", $(this).find("img").attr("src"));
    popupTitle.text($(this).find("span").text());
    pupupCpic.text(currentpic + " of " + nbpics);
    popup.css({
        "display": "block"
    });
    return false;
});

// popup left arrow click event
$(".lx-popup-inside a .lx-angle-left").click(function() {
    // test if the curent picture is equal to 1 or not
    if (currentpic == 1) {
        currentpic = nbpics;
    } else {
        currentpic = parseInt(currentpic,10) - 1;
    }
    // transmit information to the popup
    popupImg.attr("src", $(".lx-portfolio-item[data='" + currentpic + "'] img").attr("src"));
    popupTitle.text($(".lx-portfolio-item[data='" + currentpic + "'] span").text());
    pupupCpic.text(currentpic + " of " + nbpics);
    return false;
});

// popup right arrow click event
$(".lx-popup-inside a .lx-angle-right").click(function() {
    // test if the current picture is equal to the number pictures or not
    if (currentpic == nbpics) {
        currentpic = 1;
    } else {
        currentpic = parseInt(currentpic,10) + 1;
    }
    // transmit information to the popup
    popupImg.attr("src", $(".lx-portfolio-item[data='" + currentpic + "'] img").attr("src"));
    popupTitle.text($(".lx-portfolio-item[data='" + currentpic + "'] span").text());
    pupupCpic.text(currentpic + " of " + nbpics);
    return false;
});

// popup remove click event
$(".lx-popup-inside a .lx-remove").click(function() {
    // hide popup
    popup.css({
        "display": "none"
    });
    return false;
});

// Hide the popup when esc key is clicked
$(document).on("keyup", function(e) {
    if (e.keyCode === 27) {
        // hide popup
        popup.css({
            "display": "none"
        });
    }
    if (e.keyCode === 37) {
        $(".lx-popup-inside a .lx-angle-left").trigger("click");
    }	
	if (e.keyCode === 39) {
        $(".lx-popup-inside a .lx-angle-right").trigger("click");
    }	
    return false;
});

$("body").on("mouseup",function (e){
	var bloc = $(".lx-popup-inside *");
	if (!bloc.is(e.target)){
        popup.css({
            "display": "none"
        });
	}
});

// search-plus click event
$(".lx-portfolio-item").click(function(event) {
    // stop hide popup event
    event.stopPropagation();
    return false;
});

// arrows click event
$(".lx-popup-content,.lx-popup-inside a .lx-angle-left,.lx-popup-inside a .lx-angle-right", ".lx-popup").click(function(event) {
    // stop hide popup event
    event.stopPropagation();
    return false;
});