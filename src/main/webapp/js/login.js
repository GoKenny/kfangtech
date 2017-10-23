/**
 * 
 * Email: kuinai.fang@gmail.com
 * LinkedIn: http://www.linkedin.com/profile/view?id=134048517
 * 
 * All Rights Reserved
 * 
 * @author Kenny Fang
 * 
 */

$(document).ready(function(){
	
	$("body").fadeOut(5);
	
	var browserInfo = navigator.userAgent.toLowerCase();
	if (browserInfo.indexOf("chrome") > -1 && browserInfo.indexOf("android") > -1) {
		// todo
	}
	
	/** When The Page Loads, Do These */
	// Initialize The Paralax Pluggin
	$('#scene').parallax();
	
	if ($(window).width()<800) {
		$("body").css("background-attachment", "inherit");
		$("body").css("background", "linear-gradient(black,grey,black)");
		$("body").css("background", "black");
	}
	
	$(".welcomeDescription").hide();
	$("#InputRight").hide();
	
	
	/** When The Page Is Done Loading, Do These  */
	$(window).load(function() {
		
		recordBrowseHistory();
		
		$("body").fadeIn(250);
		
		$("#webappName").addClass("animated fadeInUp");
		$(".welcomeDescription").show("drop", {direction: "left", easing: "linear", distance: 400}, 400, function(){});
		$("#InputRight").show("drop", {direction: "right", easing: "linear", distance: 400}, 400, function(){});
		
		// prepare for Desktop sliding
		$("#floatingContainer").css("opacity", 0);
		$("#technicalSpecs, #specsDetails, #commercialProducts, #commercialListing, #featuring").hide(10);
		
	});
	
	/** Listeners */
	$("#webappName").dblclick(function(){
		window.open("UnanalyzedVisitors.jsp", "_blank");
	});
	
	
	$("#loginButtonContainer").mousedown(function(){
		
		$(this).css("marginRight", "-2px");
		$(this).css("marginTop", "2px");
		$(".logInButton").css("boxShadow", "none");
	});
	
	$("#loginButtonContainer").mouseup(function(){
		
		$(this).css("marginRight", "0px");
		$(this).css("marginTop", "0px");
		$(".logInButton").css("boxShadow", "#FDF5E6 1px 1px 3px 0px");
	});
	
	var clickedScroll=false;
	$("#aboutText, #downArrow").click(function(){
		
		// 1. tell the scrolling listener not to update the text while automatically scrolling down
		clickedScroll = true;
		
		$("#downArrow").fadeOut(500);
		
		// 2. Switch The Bottom Color
		$("#loginText").css("color", "grey");
		$("#loginText").css("border-bottom-color", "grey");
		
		$("#aboutText").css("color", "black");
		$("#aboutText").css("border-bottom-color", "black");
		
        // 3. Scroll to the section
        $('html, body').animate({
        	scrollTop: $("#aboutSection").offset().top + 50
        }, 500);

		
		// 4. Those Contents One By One
        // Desktop
        if ($(window).width()>800) {
			
	        setTimeout(function(){
	        	
	        	$("#technicalSpecs").show("drop", {direction: "left", easing: "linear", distance: 400}, 200, function(){
	        		$("#specsDetails").show("drop", {direction: "right", easing: "linear", distance: 400}, 200, function(){
	        			$("#commercialProducts").show("drop", {direction: "left", easing: "linear", distance: 400}, 200, function(){
	        				$("#commercialListing").show("drop", {direction: "right", easing: "linear", distance: 400}, 200, function(){
	        					$("#featuring").show("drop", {direction: "up", easing: "linear", distance: 0}, 200, function(){
	        						
	        						$("#floatingContainer").animate({
	        							opacity: 1
	        						}, 750);
	        						
	        						// 5. Tell the scrolling listener that can update now
	        						clickedScroll=false;
	        						
	        					});
	        				});
	        			});
	        		});
	        	});
	        	
	        }, 500);
        
        } 
        // Mobile
        else {
        	
        	setTimeout(function(){
	        	
	        	$("#technicalSpecs").show("drop", {direction: "left", easing: "linear"}, 400, function(){
	        		$("#specsDetails").show("drop", {direction: "right", easing: "linear"}, 400, function(){
	      
	        			$("#floatingContainer").animate({
	        										opacity: 1
	        									}, 750);
	        						
	        			// 5. Tell the scrolling listener that can update now
	        			clickedScroll=false;
	        		});
	       		});
	        	
	        }, 500);
        	
        }
		
	});
	

	$("#loginText").click(function(theEvent){
		
		// 1. tell the scrolling listener not to update the text
		clickedScroll = true;
		
		$("#downArrow").fadeIn(400);
		
		// 2. Switch The Bottom Color
		$("#aboutText").css("color", "grey");
		$("#aboutText").css("border-bottom-color", "silver");
		
		$(this).css("color", "black");
		$(this).css("border-bottom-color", "black");
		
		// 3. Scroll To The Section
		$('html, body').animate({
        	scrollTop: $("#loginSection").offset().top
        }, 800);
		
		 // 4. Tell the scrolling listener that can update now
		setTimeout(function() {
			clickedScroll=false;
		}, 800);
			 
	});
	
	/*********** The Submit Form *******************/
	$("#theLoginForm").on('submit', function(theEvent){
		  
		  theEvent.preventDefault();

		// 1. Get Inputs From Users
		var userName = $("#userName").val();
		var password = $("#password").val();

		// 2. Show Loading Image
		$("#loadingGif").show(10);
			
		// 3. AJAX Call To Server
		$.post( "Login" , { requestType: "login", userName : userName, password: password}) 
		.done (function(results) {
				
			jsonResult = jQuery.parseJSON(results);
			var loginResult = jsonResult.loginResult;
				
			// 4. Determine If User Can Enter The System
			if (loginResult == "loggedIn"){
				
				goToSystem(userName);
			}
			else
				showError();
			
		});
	});
	
	
	/** ************** When Scrolling *********************** */
	$(window).scroll(function() {

		// When Clicked The "DownArrow" or "About" Text, Don't Triger The Scrolling Effects
		if (clickedScroll) 
			return;
		
		var positionOfThisDiv;
		var currentPagePosition = $(window).scrollTop();

		// Toggle The Down Arrow
		positionOfThisDiv = $("#loginSection").offset().top;
		if (currentPagePosition - positionOfThisDiv >= 150) {
			$("#downArrow, #webappName").fadeOut(500);
			$("#webappName").removeClass("animated fadeInUp");
			$(".welcomeDescription").hide("drop", {direction: "left", easing: "linear", distance: 400}, 400, function(){});
			$("#InputRight").hide("drop", {direction: "right", easing: "linear", distance: 400}, 400, function(){});
		}
		else {
			$("#downArrow, #webappName").fadeIn(400);
			$("#webappName").addClass("animated fadeInUp");
			$(".welcomeDescription").show("drop", {direction: "left", easing: "linear", distance: 400}, 400, function(){});
			$("#InputRight").show("drop", {direction: "right", easing: "linear", distance: 400}, 400, function(){});
		}
		
		
		// Toggle The Nav Texts
		positionOfThisDiv = $("#aboutSection").offset().top;
		if (currentPagePosition - positionOfThisDiv >= -100) {
			
			// second section
			$("#loginText").css("color", "grey");
			$("#loginText").css("border-bottom-color", "grey");
			
			$("#aboutText").css("color", "white");
			$("#aboutText").css("border-bottom-color", "white");
			
		}  else {
			
			// first section
			$("#aboutText").css("color", "grey");
			$("#aboutText").css("border-bottom-color", "grey");
			
			$("#loginText").css("color", "white");
			$("#loginText").css("border-bottom-color", "white");
		}
		
		
		
		/***************Sliding*******************/
		//For Desktop 
		if ($(window).width() > 700) {
			
			// Floating
			var thisElement = $("#floatingContainer");
			positionOfThisDiv = thisElement.offset().top;
			// 1. When Hit The Spot
			if (positionOfThisDiv - currentPagePosition < 550) {
				
				// 2. Only Trigger Show When It's Not Showing
				if(thisElement.css("opacity")==0)
					thisElement.animate({
						opacity: 1
					}, 1000);
			}
			else {
				
				// 2. Only Trigger Hide When It's Not Hiding Already
				if(thisElement.css("opacity")==1)
					thisElement.animate({
						opacity: 0
					}, 500);
				
			}
			
			
			// technicalSpecs
			thisElement = $("#descriptionContainer");
			positionOfThisDiv = thisElement.offset().top;
			if (positionOfThisDiv - currentPagePosition < 550) {
				// 1. Show "technicalSpecs", 
				// 2.After That Animation completes, show "specsDetails"
				$("#technicalSpecs").show("drop", {direction: "left", easing: "linear", distance: 400}, 200, function(){
					$("#specsDetails").show("drop", {direction: "right", easing: "linear", distance: 400}, 200);
				});
				
			}
			else {
				$("#specsDetails").hide("drop", {direction: "right",easing: "linear",  distance: 400}, 300, function(){
					$("#technicalSpecs").hide("drop", {direction: "left", easing: "linear", distance: 400}, 300);
				});
			}
			
			// commercialProducts
			if (positionOfThisDiv - currentPagePosition < 400) {
				
				$("#commercialProducts").show("drop", {direction: "left", easing: "linear", distance: 400}, 200, function(){
					$("#commercialListing").show("drop", {direction: "right", easing: "linear", distance: 400}, 200, function(){
						$("#featuring").show("drop", {direction: "up", easing: "linear", distance: 0}, 200);
					});
				});
				
			}
			else {
				$("#featuring").hide("drop", {direction: "down",easing: "linear",  distance: 400}, 300, function(){
					$("#commercialListing").hide("drop", {direction: "right", easing: "linear", distance: 400}, 300, function(){
						$("#commercialProducts").hide("drop", {direction: "left", easing: "linear",  distance: 0}, 300);
					});
				});
			}
		
	} 
	// For Mobile
	else{
		
		// Floating
		thisElement = $("#floatingContainer");
		positionOfThisDiv = thisElement.offset().top;
		// 1. When Hit The Spot
		if (positionOfThisDiv - currentPagePosition < 300) {
			
			// 2. Only Trigger Show When It's Not Showing
			if(thisElement.css("opacity")==0)
				thisElement.animate({
					opacity: 1
				}, 1000);
		}
		else {
			
			// 2. Only Trigger Hide When It's Not Hiding Already
			if(thisElement.css("opacity")==1)
				thisElement.animate({
					opacity: 0
				}, 500);
		}
		
		// technicalSpecs
		thisElement = $("#descriptionContainer");
		positionOfThisDiv = thisElement.offset().top;
		if (positionOfThisDiv - currentPagePosition < 300) {
			// 1. Show "technicalSpecs", 
			// 2.After That Animation completes, show "specsDetails"
			$("#technicalSpecs").show("drop", {direction: "left", easing: "linear"}, 400, function(){
				$("#specsDetails").show("drop", {direction: "right", easing: "linear"}, 400);
			});
			
		}
		else {
			$("#specsDetails").hide("drop", {direction: "right",easing: "linear"}, 400, function(){
				$("#technicalSpecs").hide("drop", {direction: "left", easing: "linear"}, 400);
			});
		}
		
		// commercialProducts
		if (positionOfThisDiv - currentPagePosition < 170) {
			
			$("#commercialProducts").show("drop", {direction: "left", easing: "linear"}, 400, function(){
				$("#commercialListing").show("drop", {direction: "right", easing: "linear"}, 400);
			});
			
		}
		else {
			$("#commercialListing").hide("drop", {direction: "right", easing: "linear"}, 400, function(){
				$("#commercialProducts").hide("drop", {direction: "left", easing: "linear"}, 400);
			});
		}
		
		// featuring
		if (positionOfThisDiv - currentPagePosition < 0) {
			$("#featuring").show("drop", {direction: "up", easing: "linear", distance: -10}, 500);
		}
		else {
			$("#featuring").hide("drop", {direction: "up",easing: "linear", distance: -10}, 500);
		}
		
	}
		
		
		
	});
	
	
});


function showError() {
	
	$("#loadingGif").hide(10);
	
	var password = $("#password");
	
	// 1. Clear The Password Input
	password.val("");
	password.css("border-color", "red");
	
	// 2. Show Error Message
	var theMessage = $("#theMessage");
	theMessage.css("color","red");
	theMessage.text("username or password is incorrect.");
	theMessage.fadeIn(150);
}

function goToSystem(userName) {
	
	$("#loadingGif").fadeOut(5);
	
	// 1. Get The URL of Previous Page
	var previousPage = "";
	var theParameter = $(location).attr('search');
	
	if (theParameter != "") 
		previousPage = theParameter.split("=")[1];
	else
		previousPage = "/MySpending";
	
	// 2. Show The Welcome Message
	$("#password").css("border-color","silver");
	var theMessage = $("#theMessage");
	theMessage.css("color", "white");
//	theMessage.html("<div id='theWelcomText'> Welcome </div>");
	
	theMessage.fadeIn(10);
	
	// 3. Save This Login To Database
	var theTime = getTheTime();
	$.post("LoginHistory", {
			requestType: "recordLogin",
			loginTime : theTime,
			userName: userName
			})
	.done(function(){
		
	});
	
	// 4. Some Effects Before Going To The System
	setTimeout(function(){
		$("#loginContainer").fadeOut(750);
	}, 500);
	
	setTimeout(function(){  
		window.open(previousPage,'_self',false);
	}, 1000);
	
}

function recordBrowseHistory() {
	
	// 1. Get Local Time
	var theTime = getTheTime();
	
	// 2. Record The Browsing History
	$.post("LoginHistory", {requestType: "recordBrowseHistory", loginTime: theTime}, function(){} );
		
}

function getTheTime() {
	
	// 1. Get Local Time
	var dateData = new Date().toString().split(" ");
	
	var month = dateData[1];
	var dateNumb = dateData[2];
	var year = dateData[3];
	var time = dateData[4];
	
	var theTime = year + "/" + month + "/" + dateNumb + " at " + time;
	
	return theTime;
	
}

var Author = {
		
	name : "Kenny",
	email: "kuinai.fang@gmail.com",
	
	showInfo: function(){
		alert(this.name + "\n" + this.email );
	}
		
};
