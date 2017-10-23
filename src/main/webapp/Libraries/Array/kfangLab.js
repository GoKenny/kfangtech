
$(document).ready(function(){
	

	$("#theButton").click(function() {
		
		theArray = ["a", "b", "c"];
		theArray.push("d");
		theArray.push("e");
		
		alert(theArray.indexOf("d"));
		
		
	});
	
});

