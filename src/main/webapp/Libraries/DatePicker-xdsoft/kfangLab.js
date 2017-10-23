
/**
 * http://xdsoft.net/jqplugins/datetimepicker/
 * */

$(document).ready(function() {
	
	$('#datetimepicker').datetimepicker({
		
//		lang:'ch',
		
		
		inline: true,
		datepicker: false,
		timepicker: true,
		todayButton: true,
		
		
		format:'d.m.Y H:i',
		
		//		startDate:'01.05.2014 13:00', 
		
		
		allowTimes:['8:00','9:00','10:00','11:00','12:00', 
		            '13:00', '14:00', '15:00', '16:00', '17:0' ],
		 
		minTime:'10:00',
		startTime:'10:00',
		
//		onChangeDateTime:  
//			
//			function(dp,$input){
//		    	alert($input.val());
//		  },
			
//			function() { 
//			
//				$('#datetimepicker').datetimepicker('hide');
//		
//		},
		
		
		
        // minDate:'-1970/01/02', //yesterday is minimum date(for today use 0 or -1970/01/01)
		// maxDate:'+1970/01/02'  //tommorow is maximum date calendar		        
		           
		           
		
	});

});

