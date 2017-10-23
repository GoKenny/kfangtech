
 var global_logedIn = "No";

$(document).ready(function() {
	

	
	$( "#dialog" ).dialog({
		
		autoOpen: true,
		resizable: true,
		draggable: true,
	      
	    show: {
	    	effect: "fade",
	        duration: 500
	      },
	      
	    hide: {
	        effect: "fade",
	        duration: 200
	      },
	      
	    width: 350
	      
	});
	
	
	$(".dialogBackground").click(function(){
		
		$(".dialogBackground").hide();
		$( "#dialog" ).dialog( "close" );
	});
	
	
	$(".logInButton").click(function(){
		
		global_logedIn = "Yes";
		
		password = $("#password").val();
		
		alert("logged In: " + global_logedIn);
		alert("password: " + password);
		
	});
    
});


