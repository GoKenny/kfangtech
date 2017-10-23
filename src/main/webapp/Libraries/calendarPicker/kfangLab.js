
/**
 * http://bugsvoice.com/applications/bugsVoice/site/test/calendarPickerDemo.jsp
 * */

$(document).ready(function() {
	
//	 $("#dsel2").hide();
	
		 $("#dsel2").calendarPicker({
			 
		    monthNames:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		    useWheel:true,
		    //callbackDelay:500,
		    years: 1,
		    months: 2,
		    days: 5,
		    showDayArrows:false,
		    
		    callback: function(cal) {
		    	
		      $("#wtf").val(cal.currentDate);
		      
		    }
		 
		 
		 });
		 
//		 $("#wtf").click(function(){
//			 $("#dsel2").slideDown(500);
//		 });
		 
});

