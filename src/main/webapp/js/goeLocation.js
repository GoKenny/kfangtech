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

function recordLoginHistory(userName) {
	
	// 1. Get User's Local Time
	var dateData = new Date().toString().split(" ");
	
	var month = dateData[1];
	var dateNumb = dateData[2];
	var year = dateData[3];
	var time = dateData[4];
	
	var loginTime = year + "/" + month + "/" + dateNumb + " at " + time;
	
	// 2. Get User's Geolocation
	if( navigator.geolocation ) { 

		navigator.geolocation.getCurrentPosition(
				
			// When User Allows
			function(location) { 
				
				$("#loadingGif").fadeIn(150);
		
				var latitude = location.coords.latitude;
				var longitude =  location.coords.longitude;
				
				// 2. Record The Geo Data
				$.post("LoginHistory", {
						
					  	requestType: "recordLocation",
					  
						userName : userName,
						loginTime: loginTime,
						latitude: latitude,
						longtitude: longitude
						
					}, function() {
						
						goToSystem();
				});
			
		
			}, 
		
			// When User Decline The Checking
			function() {
				
				// 2. Record The Geo Data
				$.post("LoginHistory", {
						
					  	requestType: "userDecline",
					  	loginTime: loginTime,
						userName : userName
						
					}, function() {
						
						goToSystem();
				});
				
			});
	
		// When Browser Does Not Support
	} else {
		
		alert("not supported");
		
		$.post("LoginHistory", {
			
		  	requestType: "browserNoSupport",
		  	loginTime: loginTime,
		  
			userName : userName
			
		}, function() {
			
			goToSystem();
		});
		
	}
	
}


//If The 3rd Party Taking Too Long, Show The Message
//setTimeout(function(){
//	
//	var theMessage = $("#theMessage");
//	theMessage.css("color", "blue");
//	theMessage.html("3rd Party Lagging <span id='dots'></span>");
//	
//	theMessage.fadeIn(250);
//	
//	var count = 0;
//	setInterval(function(){
//		
//		if(count ==3){
//			$("#dots").text("");
//			count = 0;
//		} else {
//			
//			$("#dots").append(" .");
//			count++;
//		}
//		
//	}, 500);
//	
//	
//}, 1500);


// Call To The 3rd Party
//$.ajax({
//	
//	// 1. Get The Analyzed Geo Data
//	  url: 'http://freegeoip.net/json/', 
//	  type: 'get', 
//	  dataType: 'jsonp',
//	  
//	  success: function(location) {
//		  
//		  // 2. Record The Geo Data
//		  $.post("LoginHistory", {
//				
//			  	requestType: "recordOneLogin",
//			  
//				userName : userName,
//				ip: location.ip,
//				country: location.country_name,
//				city: location.city,
//				latitude: location.latitude,
//				longtitude: location.longitude
//				
//			}, function() {
//				
//				// 3. Go Into System
////				goToSystem("Welcome");
//			});
//		  
//	  },
//
//	  // When The 3rd party is down
//	  error: function(){
//		
//		 // 2. Record The Geo Data
//		  $.post("LoginHistory", {
//				
//			  	requestType: "recordManually",
//			  
//				userName : userName
//				
//			}, function() {
//				
//				// 3. Go Into System
////				goToSystem("Welcome!");
//			});
//		
//	}
//	
//})
//
//
////.done(function(){})
//
////.fail(function(){})
//;