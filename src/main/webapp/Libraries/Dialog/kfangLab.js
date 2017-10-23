
$(document).ready(function() {
	
	
	$("#showDialog").click(function() {
		
		
		$(".dialogBackground").fadeIn();
		$("#dialog").dialog("open");
	});

	
	$("#dialog").dialog({
		
		autoOpen: false,
		resizable: true,
		draggable: true,
	      
	    show: {
	    	effect: "puff", // blind, bounce, clip, drop, explode, fade, fold, highlight, puff, pulsate, scale, shake, size, slide, transfer 
	        duration: 500
	      },
	      
	    hide: {
	        effect: "fade",
	        duration: 200
	      },
	      
	    minWidth: 350
	      
	});
	
	
	$(".dialogBackground").click(function(){
		
		$(".dialogBackground").hide();
		$( "#dialog" ).dialog("close");
	});
    
});


