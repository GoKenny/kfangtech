/**
 * 
 * Customized JavaScript For The Landing Page
 * 
 * Author: Kenny Fang
 * 
 */

$(document).ready(function() {

	/** ********************** When The Page Loads, Do These ************* */

	$('#scene').parallax();
	var screenHeight = $(window).height();
	$("#landing").css("height", screenHeight);

	/** ********************** When The Page Is Done Loading, Do These ************* */
	jQuery(window).load(function() {

		/** 1. Adjust The Height Of The First Section */

		// 1. Get The Height Of The Screen
		// var screenWidth = $(window).width();
		// alert(screenWidth);
		// $("html").css("width",screenWidth);
		// 2. Set The First Section Same Height As The Screen
		/** 2. Animate The Images In The First Section */
		// setTimeout(function(){
		// $("#blueChatImage").show("slide", {direction: "left" }, 1200);
		// $("#orangeChatImage").show("slide", {direction: "up" }, 1200);
		// $("#purpleChatImage").show("slide", {direction: "up" }, 1200);
		// $("#yellowChatImage").show("slide", {direction: "right" }, 1000);
		// $("#boxImage").show("slide", {direction: "down" }, 1200);
		$(".theTitle").show("fade", {
			direction : "left"
		}, 1500);

		// }, 500);

	});

	/** ************************ Set Up 3D Flips ************************ */
	// 1. Hide The Back
	$(".back").hide(5);

	// 2. When Hover, Flip To Back
	$('.theFlip').hover(

	// 1. When Mouse In
	function() {

		$(this).find('div').stop().rotate3Di('toggle', 200, {
			direction : 'clockwise',
			sideChange : mySideChange
		});
	},

	// 2. When Mouse Out
	function() {

		$(this).find('div').stop().rotate3Di('toggle', 200, {
			sideChange : mySideChange
		});
	}

	);

	/** ************************ Set Up The Smooth Scroll************************ */
	$('.theSmoothScroll').localScroll({
		duration : 1000,
		easing : 'easeOutQuart',
		offset : 0
	});

	/** ************************ When Scroll The Page, Do These ************************* */
	$(window).scroll(function() {

		/** ************** The 4 Images *********************** */
		// var positionOfThisDiv = $(".imagesContainer").offset().top; // It's Fixed Number
		var positionOfThisDiv;
		var currentPagePosition = $(window).scrollTop();

		// When Scroll To This Div Class
		// if (currentPagePosition - positionOfThisDiv > -20) {
		//        	
		// $("#blueChatImage").hide("slide", {direction: "left" }, 800);
		// $("#orangeChatImage").hide("slide", {direction: "up" }, 800);
		// $("#purpleChatImage").hide("slide", {direction: "up" }, 800);
		// $("#yellowChatImage").hide("slide", {direction: "right" }, 700);
		// }
		// else {
		// $("#blueChatImage").show("slide", {direction: "left" }, 800);
		// $("#orangeChatImage").show("slide", {direction: "up" }, 800);
		// $("#purpleChatImage").show("slide", {direction: "up" }, 800);
		// $("#yellowChatImage").show("slide", {direction: "right" }, 700);
		// }

		/** ************** The Header *********************** */
		// Don't Show The Header On Mobile
		var screenWidth = $(window).width();

		if (screenWidth > 700) {

			positionOfThisDiv = $("#headerDetector").offset().top;
			if (currentPagePosition - positionOfThisDiv > -5) {
				$("#myOwnHeader").fadeIn(500);
			} else {
				$("#myOwnHeader").fadeOut(300);
			}

		}

		/** ************** Box Images *********************** */
		// positionOfThisDiv = $(".boxImageContainer").offset().top;
		// if (currentPagePosition - positionOfThisDiv > 120) {
		// $("#boxImage").hide("slide", {direction: "down" }, 500);
		// }
		// else {
		// $("#boxImage").show("slide", {direction: "down" }, 500);
		// }
		/** ************** The Title *********************** */
		// positionOfThisDiv = $(".theTitleContainer").offset().top;
		// if (currentPagePosition - positionOfThisDiv > -50) {
		// $(".theTitle").hide("fade", {direction: "right" }, 700);
		// }
		// else {
		// $(".theTitle").show("fade", {direction: "right" }, 700);
		// }
		//        
		/** ************** The Computer Stuff *********************** */
		positionOfThisDiv = $(".theSkillsContainer").offset().top;
		if (currentPagePosition - positionOfThisDiv >  -200) {

			$("#macImage").show("slide", {
				direction : "up"
			}, 500);
			$("#iphoneImage").show("slide", {
				direction : "down"
			}, 500);

			$(".moreDescriptionContainer").show("slide", {
				direction : "right"
			}, 700);
		} else {

			$("#macImage").hide("slide", {
				direction : "up"
			}, 400);
			$("#iphoneImage").hide("slide", {
				direction : "down"
			}, 400);

			$(".moreDescriptionContainer").hide("slide", {
				direction : "left"
			}, 700);
		}

		/** ************** The Market Title *********************** */
		positionOfThisDiv = $("#marketTitleContainer").offset().top;

		// alert(currentPagePosition - positionOfThisDiv);

		if (currentPagePosition - positionOfThisDiv > -500) {

			$("#titleData").fadeIn(800);

		} else {

			$("#titleData").fadeOut(500);

		}

		/** ************** The Market Image *********************** */
		positionOfThisDiv = $("#marketChartImageContainer").offset().top;

		if (currentPagePosition - positionOfThisDiv > -500) {

			// $(".theMarketChart").show("slide", {direction: "left" }, 500);

			$("#theChart").fadeIn(500);

			// $(".chartDescriptions").show("fade", {direction: "down" }, 700);
			setTimeout(function() {

				$("#chartDescriptions").fadeIn(500);

			}, 200);

		} else {

			// $(".theMarketChart").hide("slide", {direction: "left" }, 400);

			$("#theChart").fadeOut(500);

			// $(".chartDescriptions").hide("fade", {direction: "down" }, 700);

			$("#chartDescriptions").fadeOut(500);
		}

		/** ************** The Pie Charts *********************** */
		// if (jQuery().easyPieChart) {
		// var colors = ['#fbcf61', '#e6557c', '#00c1e4'];
		var colors = [ '#3299BB' ];

		jQuery('.chart').each(function() {

			positionOfThisDiv = jQuery(this).offset().top;
			console.log(positionOfThisDiv - currentPagePosition);
			if (positionOfThisDiv - currentPagePosition < 500) {

				jQuery(this).easyPieChart({
					barColor : colors[0],
					trackColor : '#474747',
					scaleColor : false,
					scaleLength : false,
					lineCap : 'butt',
					lineWidth : 8,
					size : 170,
					rotate : 0,
					animate : 2000,
					onStep : function(from, to, percent) {
						jQuery(this.el).find('.percent').text(Math.round(percent));
					}
				});
			}

		});
		// }

	});
	
	/** ************************ jCanvas For Triangle ************************ */
	$('.myTriangleCanvas').drawPolygon({
		
		fillStyle: '#EBEBEB',
		strokeStyle: 'silver',
		strokeWidth: 1,
		rotate: -5,
//		concavity: 0.5,
		  
		sides: 3,
		
		radius: 85,
		x: 150, y: 85,
		
	});
	

	/** ************************ When Hover The Logo, Show Description ************************ */

	// When Mouse On the "+" logo, show The Description
//	$(".plusContainer").mouseenter(function() {
//
//		// 1. Change The Indicator
//		$(this).find(".plusSpace").css("margin-left", "7px");
//		$(this).find(".plusSpace").text(" - ");
//
//		// 2. Show The Message
//		$(this).parent().find(".theFeatureDescription").slideDown(300);
//	});

	// When Mouse Out of The Whole Container, Hide The Description
//	$(".moreDescriptionContainer").mouseleave(function() {
//
//		// 1. Change The Message
//		$(this).find(".plusSpace").css("margin-left", "5px");
//		$(this).find(".plusSpace").text(" + ");
//
//		// 2. Hide The Message
//		$(this).find(".theFeatureDescription").slideUp(300);
//	});
	
	/************************** Appear When Scroll ************************ */
	var windowHeight = $(window).height();
	$('.to_fade, .block-header').each(function(){
		
		var imagePos = $(this).offset().top;
		var topOfWindow = $(window).scrollTop();
		if (imagePos < topOfWindow + windowHeight - 850) 
			$(this).addClass("fadeInUp");
			//			$(this).addClass("animated fadeInUp");
	});

	
	/************************** Send Email ************************ */
	$("#emailForm").on("submit", function(theEvent) {
		
		
		// 1. Collect The Email Address
		theEvent.preventDefault();
		var theEmailAddress = $("#theEmailAddress").val().toString();
		
		// 3. Check The Email Input
		var regularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (regularExpression.test(theEmailAddress)) {
			// it is in a valid format 
		} else {
			$("#messageContainer").css("color", "yellow");
			$("#messageContainer").text("please enter a valid email");
			return;
		}

		// 2. cross domain AJAX request
		$("#emailSendingGif").show(10);
		$.ajax({
				url:"http://131.202.245.68/omid/EmailService",
				type: 'GET',
			    dataType: 'jsonp',
			    jsonpCallback: 'jsonp',
			    data: { 
			    	theEmailAddress: theEmailAddress
			    },
			    
			    success:function(json){
		        
			    	$("#emailSendingGif").hide(10);
			    	
			    	$("#messageContainer").css("color", "white");
					$("#messageContainer").text("email has been sent !");
					
					$("#theEmailAddress").val("");
			    },
		     
			    error:function(json){
			    	
			    }      
		
		});
		
		
//		jQuery.jsonp("http://131.202.245.68/omid/EmailService", {
//			theEmailAddress : theEmailAddress
//		})
//
//		.done(function(data) {
//
//			$("#messageContainer").css("color", "blue");
//			$("#messageContainer").text("success: Your email has been received ");
//		})
//
//		.fail(function(data) {
//
//			$("#messageContainer").css("color", "yellow");
//			$("#messageContainer").text("error: Sending Email Failed :( ");
//		});
		
		

	});

});

function mySideChange(front) {

	if (front) {

		$(this).parent().find('div.front').show();
		$(this).parent().find('div.back').hide();
	} else {

		$(this).parent().find('div.front').hide();
		$(this).parent().find('div.back').show();
	}
}
