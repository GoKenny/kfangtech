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
	
//	$("body").fadeOut(5);
	
	var browserInfo = navigator.userAgent.toLowerCase();
	if (browserInfo.indexOf("chrome") > -1 && browserInfo.indexOf("android") > -1) {
		// todo
	}
	
	/** When The Page Loads, Do These */
	$("#welcomeText").hide();
	
	/** When The Page Is Done Loading, Do These  */
	$(window).load(function() {
		
//		$("body").fadeIn(250);
		$("#welcomeText").show("drop", {direction: "down", easing: "linear", distance: 50}, 550, function(){});
		
	});
	
	
	$("#signUpButton").mousedown(function(){
//		$(this).css("marginRight", "-2px");
//		$(this).css("marginTop", "2px");
	})
	
});


