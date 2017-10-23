
$(document).ready(function() {

	
	/********************Option 1********************/
	$.get("theServlet", {
		
		actionType : "autocomplete",
		keyword: "something"
		
	}, function(results) {
		
		var jsonResult = jQuery.parseJSON(results);
		var tweetText = jsonResult.tweetText;
		
		// do something
		
	});
	
	$.get("Schedule", { 
		requestType: "getSchedule", 
		month: "1", 
		year: "2015" })
	.done(function(results) {
			
		var jsonResult = jQuery.parseJSON(results);
		var rows = jsonResult.rows;
		
		// do something
	});
	
	$.post( "Login" , { 
		requestType: "login", 
		userName : "kenny", 
		password: "1234"}) 
	.done (function(results) {
			
		var jsonResult = jQuery.parseJSON(results);
		var loginResult = jsonResult.loginResult;
			
		// do something
	});
	
	
	/********************option 2 Cross Domain ********************/
	$.ajax({
		url:"theServlet",
		type: 'get', 
		dataType: 'jsonp',  //json for same domain
		jsonpCallback: 'jsonp', // jason for same domain
		data: { 
			longitude: "123.123",
			latitude: "123.123"
		},
		
		success:function(json) {
			// do something
		},
		
		error:function(json){
			
		}      
		
	});

	/********************option 3 ********************/
    $.ajax({
    	url:"http://www.w3schools.com/JQuery/demo_test.txt",
    	success: function(result) {
    		$("#div1").html(result);
    	}
    });
	    
    
});



function getMyServerRoot() {
	var url = "http://" + window.location.host;
	var servletName = window.location.pathname.split("/")[1];
	url += "/" + servletName;
	return url;
}


