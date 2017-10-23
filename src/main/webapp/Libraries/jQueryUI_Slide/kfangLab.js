
$(document).ready(function() {

    $("#theButton").click(function(){
    	
	// 1. Show Data 1 
	$("#theData1").show("drop", {direction: "left", easing: "linear", distance: 400}, 500, function(){
		
		// 2. Then Show Data 2
		$("#theData2").show("drop", {direction: "right", easing: "linear", distance: 400}, 500);
	
	});
	
    });
    
});


