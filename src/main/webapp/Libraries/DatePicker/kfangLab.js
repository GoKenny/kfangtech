
/**
 * http://www.eyecon.ro/datepicker/
 * */

$(document).ready(function() {
	
	$('#date').DatePicker({
		flat: true,
		date: '2014-07-16',
		current: '2014-07-16',
		calendars: 1,
		starts: 0
	});
	
//	today = new Date();
		
	$('.inputDate').DatePicker({
		
		format:'m/d/Y',
		date: '07/10/2014',
		current: '07/10/2014',
		position: 'right', 	//['top'|'left'|'right'|'bottom']
		mode: 'single', 	// ['single'|'multiple'|'range'
		calendars: 1,		// 1,2,3,4,5...
		starts: 0,			// 1,2,3,4,5...
		
		
		onChange: function(formated, dates) {
			
			// 1. put the data in it
			$('#inputDate').val(formated);
			
			// 2. close the picker
			 $('#inputDate').DatePickerHide();
			
		}
	
	
	});

    
});

