/**
 * 
 * @author Kenny Fang
 * 
 * Email: kuinai.fang@gmail.com
 * LinkedIn: https://ca.linkedin.com/in/kuinaifang
 * 
 * All Rights Reserved
 * 
 */

var globle_month = (new Date().getMonth()+1) ;
var globle_year = new Date().getFullYear();

var isEditing = false; 

$(document).ready(function() {
	
	
	/**************** When This Page Is Loading ****************/
	// 1. Display Current Schedule
	$("#tableDiv").fadeOut(10);
	showSpending(globle_month,globle_year);
	
	// Initialize For AddOneBile
	$("#year").val(new Date().getFullYear());
	$("#month").val(new Date().getMonth()+1);
	$("#date").val(new Date().getDate());
	
	setTimeout(function(){
		
		generateHighChart();
	
	}, 1500);

	$(document).ajaxComplete(function(){
		
		$("#loadingGif").fadeOut(10);
		
			
		$("#tableDiv").slideDown(1200);
			
	 });
	
	
	// 2.Prepare The "Edit" Dialog
	$(".dialogBackground").click(function(){
		
		$(".dialogBackground").hide();
		$("#dialog").dialog("close");
		$("#removeConfirmDialog").dialog("close");
	});
	
	$( "#dialog").dialog({
		
		autoOpen: false,
		resizable: true,
		draggable: true,
	      
	    show: {
	    	effect: "fold",  
	        duration: 300
	      },
	      
	    hide: {
	        effect: "fade",
	        duration: 200
	      },
	      
	    width: 455,
	    height: 300
	      
	});
	
	$("#removeConfirmDialog").dialog({
		
		autoOpen: false,
		resizable: true,
		draggable: true,
	      
	    show: {
	    	effect: "fold",  
	        duration: 300
	      },
	      
	    hide: {
	        effect: "fade",
	        duration: 200
	      },
	      
	    width: 350,
	    height: 150
	      
	});
	
	/*************** When The Page Is Done loading*****************/
	$(window).load(function() {
		
	});
	
	/*************** Logout ***********************/
	$("#logout").click(function(){

		$.post("Login",{requestType:"logout"}, function (jsonString) {
			location.reload();
		});
		
	});
	
	/**************** Add One Entry Text *****************/
	$("#addOneEntry").click(function(){
		
		var theData = $("#addOneEntry").text();
		
		if (theData == "+ Add One Spending") {
			
			$("#addOneEntry")[0].scrollIntoView(true);
			
			$("#addOneBillForm").slideDown(200);
			$("#addOneEntry").text("- Hide The Form");
			
			// Scroll to the section
			$('body').animate({
				scrollTop: $(this).offset().top - 250
			}, 1200);
		
		} else {
			
			$("#addOneBillForm").slideUp(200);
			$("#addOneEntry").text("+ Add One Spending");
		}
	
	});
	
	/********* Start The Smooth Scroll Library**********/
//	$('.theSmoothScroll').localScroll({
//		duration : 1500,
//		easing : 'easeOutQuart',
//		offset : 0
//	});
	
	/**************** Input Of The Place and Event*****************/
	$("#place").focusout(function(){
		
		var place = $("#place").val();
		
		if (place == "") {
			$("#theErrorMessage").fadeIn(100);
			$("#place").css("border-color", "red");
		}
		else{
			$("#theErrorMessage").fadeOut(100);
			$("#place").css("border-color", "transparent");
		}
		
	});
	
	$("#event").focusout(function(){
		
		var event = $("#event").val();
		
		if (event == "") {
			$("#theErrorMessage").fadeIn(100);
			$("#event").css("border-color", "red");
		}
		else{
			$("#theErrorMessage").fadeOut(100);
			$("#event").css("border-color", "transparent");
		}
		
	});	
	
	
	/**************** Add One Entry Button *****************/
	$("#theAddOneBillForm").on('submit', function(theEvent) {
		
		// 1. Disable The Default Actions
		theEvent.preventDefault();
		
		// 2. Collect The Inputs From User
		var amount = $("#amount").val();
		var comment = $("#comment").val();
		
		var year = $("#year").val().trim();
		var month = $("#month").val().trim();
		var date = $("#date").val().trim();
		
		var typeValue = $('input:radio[name=spendingType]:checked').val();

		// 2. Check The Amount
		if (amount == "") {
			
			$("#theErrorMessage").text("please enter the amount");
			$("#theErrorMessage").fadeIn(100);
			$("#amount").css("border-color", "red");
			return;
		} 
		
		//		if (amount < 0) {
		//			
		//			$("#theErrorMessage").text("amount should be larger than 0");
		//			$("#theErrorMessage").fadeIn(100);
		//			$("#amount").css("border-color", "red");
		//			return;
		//		} 
		
		if (isNaN(amount)) {
			
			$("#theErrorMessage").text("the amount should be number");
			$("#theErrorMessage").fadeOut(100);
			$("#amount").css("border-color", "red");
			return;
		}
		
		// Recover The The Error Messages
		$("#theErrorMessage").fadeOut(100);
		$("#amount").css("border-color", "transparent");
		
		// 3. Add This Data To DB
		$.get(getMyServerRoot(), {
			
			requestType: "addOneBill",

			amount: amount,
			comment: comment,
			
			year: year,
			month: month,
			date: date,
			typeValue: typeValue
			
		}, function(results) {
	
	   		jsonResult = jQuery.parseJSON(results);
	   		var insertResult = jsonResult.insertResult;
	   		
	   		if (insertResult == "ok") {

	   			// 1. Refresh The Spending List
	   			$("#tableDiv").fadeOut(300);
	   			showSpending(globle_month, globle_year);
	   			$("#tableDiv").fadeIn(200);
		   		
	   			// 2. Clear The Old Inputs
   				$("#amount").val("");
   				$("#comment").val("");
   				
   				// 3. Refresh The HighChart
   				generateHighChart();
   				
			} else {
				
	   			$("#insertResult").css("color", "red");
				$("#insertResult").text("System Error");
				$("#insertResult").fadeIn(100);
			}
	    });
	});
	
	
	/**************** Calendar Picker *****************/
//	 $("#dsel2").calendarPicker({
//		 
//	    monthNames:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//	    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//	    useWheel: false,
////	    callbackDelay: 10,
//	    years: 1,
//	    months: 2,
//	    days: 5,
//	    showDayArrows: false,
//	    
//	    callback: function(cal) {
//	    	
//	    	$("#datePicked").val(cal.currentDate.toString());
//
//	    	var calendarData =	cal.currentDate.toString().split(" ");
//	      
//	    	// Put Picked Data To The Input
//	    	$("#year").val( calendarData[3] );
//	    	$("#month").val( calendarData[1] );
//	    	$("#date").val( calendarData[2] );
//	      
//	    }
//		 
//	 });
	 
	
	// reference: http://xdsoft.net/jqplugins/datetimepicker/
	jQuery('#addOneBillDateTimePicker').datetimepicker({
		
		 inline: true,
		 theme: 'dark',
		 todayButton: false,
		 datepicker: true,
		 timepicker: false,
		 format:'d m Y H.i',
		 
		 //		 startTime:'7:00',
		 //		 defaultDate:'1987/12/03',
		 //		 allowTimes:[ '7:00', '7:30', '8:00', '8:30','9:00','9:30','10:00', '10:30', '11:00', '11:30', '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00', '18:30', '19:00', '19:30','20:00'],
			
		 onChangeDateTime: function(dp, data){
				
			 var selectedDateTime = data.val().split(" ");
			 	
			 var dateNumb = selectedDateTime[0];
			 var month = selectedDateTime[1];
			 var year = selectedDateTime[2];

			 $("#year").val(year);
			 $("#month").val(month);
			 $("#date").val(dateNumb);
		 }
	});
	 
	 
	 
	 
	 /** For Edit Dialog **/
//	 $("#datePicker").calendarPicker({
//		 
//	    monthNames:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//	    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//	    useWheel: false,
//	    years: 1,
//	    months: 2,
//	    days: 5,
//	    showDayArrows:false,
//	    
//	    callback: function(cal) {
//	    	
//	    	$("#datePicked").val(cal.currentDate.toString());
//
//	    	var calendarData =	cal.currentDate.toString().split(" ");
//	      
//	    	// Put Picked Data To The Input
//	    	$("#editYear").val( calendarData[3] );
//	    	$("#editMonth").val( calendarData[1] );
//	    	$("#editDate").val( calendarData[2] );
//	      
//	    }
//		 
//		 
//	 });
	 
	 /**************** Last And Next Month *****************/ 
	 $("#lastMonth").click(function(){
		
		 // 1. Decrease The Month
		 if (globle_month == 1) {
			 
			 globle_month =12;
			 globle_year--;
			 
			// Refresh The HighChart As Well
			 generateHighChart();
			
		} else
			globle_month--;
		 
		 // 2. Slide Current Table To The Right To Hide
		 $("#tableDiv").hide("slide", {direction: "right" }, 500);
		 
		 // 3. Show Loading Gif
		 $("#loadingGif").fadeIn(10);
		
		 setTimeout(function(){
		 
			 $.get(getMyServerRoot(), {
					
					requestType: "getSpending",
					month: globle_month,
					year: globle_year
					
				}, function(results) {
			
			   		var jsonResult = jQuery.parseJSON(results);
			   		
			   		// 4. Generate The Table
	
//			   			generateTable(jsonResult);
			   		generateAllSpendings(jsonResult);
			   			
			   		// 5. Hide The Loading Gif
			   		$("#loadingGif").fadeOut(10);
			   		
				});
		
		 }, 300);
		 
		 // 6. Slide The New Table To The Left To Show The New Table
		 $("#tableDiv").show("slide", {direction: "left" }, 500);
		 // 7. Update The Month and Year In The Title
		 $("#theMonth").slideUp(500);
			setTimeout(function(){
				$("#theMonth").text(convertNumberToMonth(globle_month) + ", " + globle_year);
				$("#theMonth").slideDown(300);
		}, 200);
			
	 });
	 
	 
	 $("#nextMonth").click(function(){
			
		 // 1. Increase The Month
		 if (globle_month == 12) {
			
			 globle_month = 1;
			 globle_year++;
			 
			 // Refresh The HighChart As Well
			 generateHighChart();
			 
		 } else
			 globle_month++;
		 // 2. Slide Current Table To The Left To Hide
		 $("#tableDiv").hide("slide", {direction: "left" }, 500);
		 
		// 3. Show Loading Gif
		 $("#loadingGif").fadeIn(10);
		 
		 setTimeout(function(){
			 
			 $.get(getMyServerRoot(), {
					
					requestType: "getSpending",
					month: globle_month,
					year: globle_year
					
				}, function(results) {
			
			   		var jsonResult = jQuery.parseJSON(results);
			   		
			   		// 4. Generate The Table
//		   			generateTable(jsonResult);
			   		generateAllSpendings(jsonResult);

		   			// 5. Hide The Loading Gif
		   			$("#loadingGif").fadeOut(10);
	
			});
		 
		 }, 300);
		
		 // 6. Slide The New Table To The Left To Show The New Table
		 $("#tableDiv").show("slide", {direction: "right" }, 500);

		 // 7. Update The Month and Year In The Title
		$("#theMonth").slideUp(500);
		setTimeout(function(){
			$("#theMonth").text(convertNumberToMonth(globle_month) + ", " + globle_year);
			$("#theMonth").slideDown(300);
		}, 200);
	 
	 });
	 
	 
	 /**************** Time Picker *****************/ 
//	 /** 1. From */
//	 $('#datetimepickerFrom').datetimepicker({
//			
//		 inline: true,
//		 datepicker: false,
//		 timepicker: true,
//		 todayButton: true,
//			
//		 format:'d.m.Y H.i',
//			
//		 startTime:'8:00',
//
//		 allowTimes:[ '8:00','8:30','9:00','9:30','10:00', '10:30', '11:00', '11:30', '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30',],
//			
//			onChangeDateTime:  function(dp,$input){
//				
//			     var selectedTime = $input.val().split(" ")[1];
//			     $("#from").val(selectedTime);
//			  }
//		
//		});
//	 
//	 $('#editDatetimepickerFrom').datetimepicker({
//			
//		 inline: true,
//		 datepicker: false,
//		 timepicker: true,
//		 todayButton: true,
//			
//		 format:'d.m.Y H.i',
//			
//		 startTime:'8:00',
//
//		 allowTimes:[ '8:00','8:30','9:00','9:30','10:00', '10:30', '11:00', '11:30', '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30',],
//			
//			onChangeDateTime:  function(dp,$input){
//				
//			     var selectedTime = $input.val().split(" ")[1];
//			     $("#editFrom").val(selectedTime);
//			  }
//		
//		});
//	 
//	 	/** 2. to */
//	 	$('#datetimepickerTo').datetimepicker({
//				
//			 inline: true,
//			 datepicker: false,
//			 timepicker: true,
//			 todayButton: false,
//				
//			 format:'d.m.Y H.i',
//				
//			 startTime:'8:00',
//	
//			 allowTimes:[ '8:00','8:30','9:00','9:30','10:00', '10:30', '11:00', '11:30', '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30',],
//					
//				onChangeDateTime:  function(dp,$input){
//					
//				     var selectedTime = $input.val().split(" ")[1];
//				     
//				     var fromTime = $("#from").val();
//				     
//				     if (selectedTime < fromTime) 
//						$("#timeErrorMessage").fadeIn(200);
//				     else{
//				    	 $("#timeErrorMessage").fadeOut(200);
//				    	 $("#to").val(selectedTime);
//				     }
//				  }
//		
//	 	});
	 	
//	 	$('#editDatetimepickerTo').datetimepicker({
//			
//			 inline: true,
//			 datepicker: false,
//			 timepicker: true,
//			 todayButton: false,
//				
//			 format:'d.m.Y H.i',
//				
//			 startTime:'8:00',
//	
//			 allowTimes:[ '8:00','8:30','9:00','9:30','10:00', '10:30', '11:00', '11:30', '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30',],
//					
//				onChangeDateTime:  function(dp,$input){
//					
//				     var selectedTime = $input.val().split(" ")[1];
//				     
//				     var fromTime = $("#editFrom").val();
//				     
//				     if (selectedTime < fromTime) 
//						$("#editTimeErrorMessage").fadeIn(200);
//				     else {
//				    	 $("#editTimeErrorMessage").fadeOut(200);
//				    	 $("#editTo").val(selectedTime);
//				     }
//				  }
//		
//	 	});
	 	
	 	
	 	/**************** "Edit" Button In The Window ****************/ 
	 	$("#editOneBillForm").on('submit', function(theEvent) {
	 		
	 		theEvent.preventDefault();
	 		isEditing = true;
	 		
	 		// 1. Collect All The Inputs
	 		var spendingIDtoUpdate = $("#spendingIDtoUpdate").val();
	 		
	 		var editAmount = $("#editAmount").val();
	 		var editComment = $("#editComment").val();
	 		
	 		var editYear = $("#editYear").val();
	 		var editMonth = $("#editMonth").val();
	 		var editDate = $("#editDate").val();
	 		
	 		var editSpendingType = $('input:radio[name=editSpendingType]:checked').val();
	 		
	 		$.get(getMyServerRoot(), {
				
				requestType: "updateEntry",
				
				spendingIDtoUpdate: spendingIDtoUpdate,
				
				editAmount: editAmount,
				editComment: editComment,

				editYear: editYear,
				editMonth: editMonth,
				editDate: editDate,
				editSpendingType: editSpendingType
				
			}, function(results) {
		
				// 1. close The Dialog And Background
				$(".dialogBackground").fadeOut(10);
		   		$( "#dialog" ).dialog("close");
				
		   		setTimeout(function(){
		   			
		   			// 2. Refresh The Table
		   			$("#tableDiv").fadeOut(80);
		   			showSpending(globle_month, globle_year);
		   			$("#tableDiv").fadeIn(50);
		   			
		   			// 3. Refresh The HighChart
		   			generateHighChart();
		   		
		   		}, 120);
		   		
		   		
		   		
			});
	 		
	 	});
	 	
	 	
	 // "Yes"
	$("#removeYes").click(function(){
			 
		// 1. Get The entryIdToRemove
		var entryIdToRemove = $("#entryIdToRemove").val();
		 
		 // 2. Remove This Entry In The DB
		 $.get(getMyServerRoot(), {
				
				requestType: "removeOneEntry",
				entryIdToRemove: entryIdToRemove,
				
			}, function(results) {
				
		   		var jsonResult = jQuery.parseJSON(results);
		   		
		   		if (jsonResult.removeStatus == "ok") {
		   		
		   			// 1. close The Dialog And Background
					$(".dialogBackground").fadeOut(10);
			   		$("#removeConfirmDialog").dialog("close");
					
			   		//2. Refresh The Table
			   		setTimeout(function(){
			   			
			   			$("#tableDiv").fadeOut(200);
			   			showSpending(globle_month, globle_year);
			   			$("#tableDiv").fadeIn(100);
			   		}, 100);
				}
		});
		 
	 });
	 
	 // "No"
	 $("#removeNo").click(function(){
		 
		 //  Close The Dialog And Background
		 $(".dialogBackground").fadeOut(80);
		 $("#removeConfirmDialog").dialog("close");
	 });
	 
	
});



function generateHighChart() {

	$.get(getMyServerRoot(), {
		
		requestType: "getMonthlyTotals",

		year: globle_year
		
	}, function(results) {

		// 1. Get The Array of Monthly Spendings
   		var jsonResult = $.parseJSON(results);
   		var monthlyTotals = jsonResult.monthlyTotals;
   		
   		/* 2. Compute The Average Spending */
   		
   		var theTotal = 0;
   		var theLength = 0;
   		
   		if (monthlyTotals.length==12) 
   			theLength = monthlyTotals.length;
   		else
   			// Exclude Current Month
   			theLength = monthlyTotals.length - 1;
   		
   		// 2.1 Get The Total 
   		for (var i = 0; i < theLength; i++) {
   			theTotal += monthlyTotals[i];
		}

   		// 2.2 Get The Average 
   		var theAverage = theTotal / theLength;
   		theAverage = Math.round(theAverage * 100) / 100;
   		
   		// 2.3 Make The Array Of Average
   		var theArrayOfAverage = new Array();
   		for (var i = 0; i < 12; i++) 
			theArrayOfAverage.push(theAverage);
   		
   		var theGoal = new Array();
   		for (var i = 0; i < 12; i++) 
   			theGoal.push(3000);
   		
   		// 2. Generate The High Chart
   		$('#container').highcharts({

   		   plotOptions: {
               series: {
                   animation: {
                       duration: 1000,
                   }
               }
           },
   			
			title: {
				text: '',
				x: 0, //center
				y: 5
			},
	            
//			subtitle: {
//				text: 'Monthly',
//				x: -20
//	      	},
	            
	      	xAxis: {
	      		categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	      	},
	            
	      	yAxis: {

		      	title: {
//		      		text: 'Amount'
		      		text: null
		      		},
		        
		      	plotLines: [{
		      		value: 0,
		      		width: 1,
		      		color: '#808080'}]
	      	},
	      	
	      	
	      	series: [
	       	  
	            	{	
	            		name: 'Monthly',
//	            		data: [170, 250, 300, null, null, null, null, null, 400, 350, 450, null],
	            		data: monthlyTotals,
	            		animation: {
	                        duration: 6000,
	                    },
	            		
	            		connectNulls: true,
	            		
	            		color: 'white'
	            	}, 
	       	        	
	       	        {	
	            		name: 'Average',
//	       	        	data: [380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380, 380],
	            		data: theArrayOfAverage,
	       	        	color: 'purple'
	                 },
	                 
	                 {	
		            		name: 'The Goal',
		            		data: theGoal,
		       	        	color: 'lime'
		                 }
	       	        	
	       	        ],
	       	        
	       	legend: {
	       		
	       			enabled : true,
	       			floating: true,
//	       			margin: 500,
	       			title: {
	       				style: { color: "red"}
	       				},
	       			itemStyle: {"margin-left":"100px", "padding-left" : "200px", "color": "orange"},
	       			align: 'left',
	       			verticalAlign: 'top', // top, middle, bottom
	           		layout: 'horizontal',	// horizontal, vertical
	           		borderWidth: 0,
	           	},
	      	
	            
	            tooltip: {
//	                valueSuffix: 'data',
//	            	valuePrefix: "data",
	                shared: true,
	                crosshairs: true
	            },
	      	
	            
//	            plotOptions: {
//	                line: {
//	                    dataLabels: {
//	                        enabled: true
//	                    },
//	                    enableMouseTracking: false
//	                }
//	            },
	            
	            credits: {
	    			enabled: false,
	    			text: 'myDeupty',
	    			href: 'http://fang-kuinai.rhcloud.com'
	    		},
	    		
	    		exporting: {
	    			
	    			enabled: true,
	    		},
	      	
	        });


//   		if (insertResult == "No Error") {
//
//   			// 1. Show Refresh The Spending
//   			$("#tableDiv").fadeOut(300);
//   			showSpending(globle_month, globle_year);
//   			$("#tableDiv").fadeIn(200);
//	   		
//   			// 2. Clear The Old Inputs
//				$("#amount").val("");
//				$("#comment").val("");
//		} else {
//			
//   			$("#insertResult").css("color", "red");
//			$("#insertResult").text("System Error");
//			$("#insertResult").fadeIn(100);
//		}
    });
	
}

function addOneBill() {
//	alert("yes");
}


function showSpending(month, year) {
	
	$.get(getMyServerRoot(), {
			
			requestType: "getSpending",
			month: month,
			year: year
			
		}, function(results) {
	
			// 1. Get The JSON From Servlet
	   		var jsonResult = jQuery.parseJSON(results);
//	   		var rows = jsonResult.rows;
	   		
	   		//2. Generate The Table
//   			generateTable(jsonResult);
	   		generateAllSpendings(jsonResult);
			
	});
	
}

var Global_lastEntrydate = "";


function generateAllSpendings(jsonResult){
	
	var theTable = $("#theTable");
	var tableMessage = $("#tableMessage");

	theTable.empty();
	tableMessage.text("");
		
	if (jsonResult == null) {
		tableMessage.text("No Data For This Month :(");
		return;
	}
		
	theTable.append(" <tr> " +
						"<td colspan='3'>" +
							"<span id='manage' class='buttonColor' >+Edit</span> <br>" +
						"</td>" +
					"<tr>");
	
	// Combine all kinds of spending 
	var allSpendings = jsonResult.allSpending;
	
	var totaSpending = 0;
	
	theTable.append( "<tr style='text-align: center;' > " +
			
			"<td colspan='3' >" +
				"<span class='spendingTypeTitle' > My Expenses So Far </span>" +
				"<br> <hr>" +
			"</td>" + 

		"</tr>"	);
	
	if (allSpendings == null) {
		
		theTable.append( "<tr style='text-align: right' > " +
				
				"<td colspan='3' >" +
					"Subtotal:  <span style='color: yellow'>$" + totaSpending + "<br><br> </span>" +
				"</td>" + 
	
			"</tr>"	);
	} else {
	
		for (var i = 0; i < allSpendings.length; i++) {
			
			var dateNumb = allSpendings[i].dateNumb;
			var month = allSpendings[i].month;
			var year = allSpendings[i].year;
			
			var dateString = month + " " + dateNumb + ", " + year;
			
			var theDayNumb = new Date(dateString).getDay();
			var theDay = dayInEnglish(theDayNumb);
		
			// 01. Append This Row To The Table
			var largeSpendingStyle = "";
			if (allSpendings[i].amount >= 100) 
				largeSpendingStyle = " largeSpendingStyle";
			if (allSpendings[i].amount < 0) 
				largeSpendingStyle = " returnStyle";
			
			entryRow = "<tr id =" + allSpendings[i].id  +  " class = \"" + largeSpendingStyle + "\"> " +
							"<td class='dateContainer' >" +
							allSpendings[i].dateNumb + "th-" + theDay +
							"</td>" + 
							"<td class='amountContainer' >" +
								"$" + allSpendings[i].amount + 
							"</td>" +
							"<td>" + 
							allSpendings[i].comment + 
							"</td>"+
							"<td class='editText buttonColor' > Change </td>" +
							"<td class='removeText buttonColor' > Remove </td>" +
						"</tr>"	;

			if (Global_lastEntrydate != dateNumb)
				entryRow = "<tr>			 " +
								"<td class =\"otherDateStyle\" > </td>" +
							"</tr>" + entryRow
				;
			
			Global_lastEntrydate = dateNumb;
			
			theTable.append(entryRow); 
			
			// 02. Sum The Miscellaneous Spending
			totaSpending = totaSpending + allSpendings[i].amount;
		}
		
		// 3. Add The Horizontal Line For Food Spending
		theTable.append("<tr>  " +
				"<td colspan=3>" +
				"<hr>  " +
				"</td>" +
		"</tr>");
		
		// 4. Append The Miscellaneous Spending Number
		totaSpending = Math.round(totaSpending * 100) / 100;
	}
	
	
	/*******************Total Spending**********************/
	theTable.append( 
		"<tr> " +
			"<td colspan='3' style='text-align: right; ' >" +
				"Total:  <span style='color: yellow; font-size: 1.5em;'>$" + totaSpending + "<br><br></span>" +
			"</td>" + 
		"</tr>"	);
	
	
	// 5. Add Click Listener for "Manage"
	$("#manage").click(function(){
		
		var data = $(this).text();
		
		$(".editText").css("min-width", "5px");
		$(".removeText").css("min-width", "5px");
		
		if(data == "+Edit") {
			
			$(this).text("-Hide");
			$(".editText").fadeIn(150);
			$(".removeText").fadeIn(150);
		} else {
			
			isEditing = false;
			$(this).text("+Edit");
			$(".editText").fadeOut(150);
			$(".removeText").fadeOut(150);
		}
		
	});
	
	if(isEditing)
		$("#manage").click();
	
	// 6. Add Click Listener To Each Generated "Edit" Text
	addClickListenerToEditText();
	 
	// 7. Update The Month and Year In The Title
	$("#theMonth").text(convertNumberToMonth(globle_month) + ", " + globle_year);
	
	
}

function generateTable(jsonResult) {
	
	// 1. Initialize Table
	var entryRow = "";
	var theTable = $("#theTable");
	var tableMessage = $("#tableMessage");

	theTable.empty();
	tableMessage.text("");
		
	// 2. Append Each Row To The Table
	if (jsonResult == null) {
		tableMessage.text("No Data For This Month :(");
		return;
	}
		
	theTable.append(" <tr> " +
						"<td colspan='3'>" +
							"<span id='manage' class='buttonColor' >+Edit</span> <br>" +
						"</td>" +
					"<tr>");
	
	/******************* Business Expenses **********************/
	// 3. Display and Calculate Food Spending
	var fixedSpending = jsonResult.fixedSpending;
	var totalFixedSpending = 0;
	
	theTable.append(
		"<tr style='text-align: center;' > " +
			
			"<td colspan='3' >" +
				"<span class='spendingTypeTitle' > Business Expenses </span>" +
				"<br> <hr>" +
			"</td>" + 

		"</tr>"	);
	
	if (fixedSpending == null) {
		
		theTable.append( "<tr style='text-align: right' > " +
				
				"<td colspan='3' >" +
					"Subtotal:  <span style='color: yellow'>$" + totalFixedSpending + "<br>+</span>" +
				"</td>" + 
	
			"</tr>"	);
	} else {
	
		for (var i = 0; i < fixedSpending.length; i++) {
			
			var dateNumb = fixedSpending[i].dateNumb;
			var month = fixedSpending[i].month;
			var year = fixedSpending[i].year;
			
			var dateString = month + " " + dateNumb + ", " + year;
			
			var theDayNumb = new Date(dateString).getDay();
			var theDay = dayInEnglish(theDayNumb);
			
			
		
			// 01. Append This Row To The Table
			var largeSpendingStyle = "";
			if (fixedSpending[i].amount >= 100) 
				largeSpendingStyle = " largeSpendingStyle";
			if (fixedSpending[i].amount < 0) 
				largeSpendingStyle = " returnStyle";
			
			
			entryRow = "<tr id =" + fixedSpending[i].id  + " class = \"" + largeSpendingStyle + "\"> " +
					
							"<td class='dateContainer' >" +
								fixedSpending[i].dateNumb + "th-" + theDay + 
							"</td>" + 
							
							"<td class='amountContainer' >" +
								"$" + fixedSpending[i].amount + 
							"</td>" +
							
							"<td>" + 
								fixedSpending[i].comment + 
							"</td>"+
							
							"<td class='editText buttonColor' > Change </td>" +
							
							"<td class='removeText buttonColor' > Remove </td>" +
								
						"</tr>"	;
			
			if (Global_lastEntrydate != dateNumb)
				entryRow = "<tr> " +
								"<td class =\"otherDateStyle\" > </td>" +
							"</tr>" + entryRow;
				;
			
			Global_lastEntrydate = dateNumb;
			
			
			
			theTable.append(entryRow); 
			
			// 02. Sum The Miscellaneous Spending
			totalFixedSpending = totalFixedSpending + fixedSpending[i].amount;
		}
		
		// 3. Add The Horizontal Line For Food Spending
		theTable.append("<tr>  " +
							"<td colspan=3>" +
								" <hr>  " +
							"</td>" +
						"</tr>");
		
		// 4. Append The Miscellaneous Spending Number
		totalFixedSpending = Math.round(totalFixedSpending * 100) / 100;
		theTable.append( "<tr style='text-align: right' > " +
				
				"<td colspan='3' >" +
				"Subtotal:  <span style='color: yellow'>$" + totalFixedSpending + "<br></span> " +
				"<span class='plusSign'>+<span> " +
				"</td>" + 
				
		"</tr>"	);
	}
	
	
	/******************* Partial Business Spending**********************/
	
	theTable.append( "<tr style='text-align: center;' > " +
			
			"<td colspan='3' >" +
				"<span class='spendingTypeTitle' > Partial Business Expenses </span>" +
				"<br> <hr>" +
			"</td>" + 

		"</tr>"	);
	
	// 3. Display and Calculate Food & Restaurant Spending
	var totalFoodSpending = 0;
	var foddSpending = jsonResult.foodSpending;
	
	if (foddSpending == null) {
		
		theTable.append( "<tr style='text-align: right' > " +
				
				"<td colspan='3' >" +
					"Subtotal:  <span style='color: yellow'>$" + totalFoodSpending + "<br>+</span>" +
				"</td>" + 
	
			"</tr>"	);
	} else {
	
		for (var i = 0; i < foddSpending.length; i++) {
			
			var dateNumb = foddSpending[i].dateNumb;
			var month = foddSpending[i].month;
			var year = foddSpending[i].year;
			
			var dateString = month + " " + dateNumb + ", " + year;
			
			var theDayNumb = new Date(dateString).getDay();
			var theDay = dayInEnglish(theDayNumb);
		
			// 01. Append This Row To The Table
			
			var largeSpendingStyle = "";
			if (foddSpending[i].amount >= 100) 
				largeSpendingStyle = " largeSpendingStyle";
			if (foddSpending[i].amount < 0) 
				largeSpendingStyle = " returnStyle";
			
			
			entryRow = "<tr id =" + foddSpending[i].id  + " class = \"" + largeSpendingStyle + "\"> " +
					
							"<td class='dateContainer' >" +
							foddSpending[i].dateNumb + "th-" + theDay +
							"</td>" + 
							
							"<td class='amountContainer' >" +
								"$" + foddSpending[i].amount + 
							"</td>" +
							
							"<td>" + 
							foddSpending[i].comment + 
							"</td>"+
							
							"<td class='editText buttonColor' > Change </td>" +
							
							"<td class='removeText buttonColor' > Remove </td>" +
								
						"</tr>"	;

			if (Global_lastEntrydate != dateNumb)
				entryRow = "<tr> " +
								"<td class =\"otherDateStyle\" > </td>" +
							"</tr>" + entryRow;
				;
			
			Global_lastEntrydate = dateNumb;
			
			theTable.append(entryRow); 
			
			// 02. Sum The Food Spending
			totalFoodSpending = totalFoodSpending + foddSpending[i].amount;
		}
		
		
		// 3. Add The Horizontal Line For Food Spending
		theTable.append("<tr>  " +
							"<td colspan=3>" +
								"<hr>  " +
							"</td>" +
						"</tr>");
		
		// 4. Append The Fodd Spending Number
		totalFoodSpending = Math.round(totalFoodSpending * 100) / 100;
		theTable.append( "<tr style='text-align: right' > " +
		
							"<td colspan='3' >" +
								"Subtotal:  <span style='color: yellow'>$" + totalFoodSpending + "<br> </span> <span class='plusSign'>+<span>" +
							"</td>" + 
				
						"</tr>"	);
	
	}
	
	
	/******************* Personal Spending**********************/
	// 3. Display and Calculate Food Spending
	var miscellaneousSpending = jsonResult.miscellaneousSpending;
	var totalMiscellaneousSpending = 0;
	
	theTable.append( "<tr style='text-align: center;' > " +
			
			"<td colspan='3' >" +
				"<span class='spendingTypeTitle' > Personal Expenses </span>" +
				"<br> <hr>" +
			"</td>" + 

		"</tr>"	);
	
	if (miscellaneousSpending == null) {
		
		theTable.append( "<tr style='text-align: right' > " +
				
				"<td colspan='3' >" +
					"Subtotal:  <span style='color: yellow'>$" + totalMiscellaneousSpending + "<br><br> </span>" +
				"</td>" + 
	
			"</tr>"	);
	} else {
	
		for (var i = 0; i < miscellaneousSpending.length; i++) {
			
			var dateNumb = miscellaneousSpending[i].dateNumb;
			var month = miscellaneousSpending[i].month;
			var year = miscellaneousSpending[i].year;
			
			var dateString = month + " " + dateNumb + ", " + year;
			
			var theDayNumb = new Date(dateString).getDay();
			var theDay = dayInEnglish(theDayNumb);
		
			// 01. Append This Row To The Table
			var largeSpendingStyle = "";
			if (miscellaneousSpending[i].amount >= 100) 
				largeSpendingStyle = " largeSpendingStyle";
			if (miscellaneousSpending[i].amount < 0) 
				largeSpendingStyle = " returnStyle";
			
			
			entryRow = "<tr id =" + miscellaneousSpending[i].id  +  " class = \"" + largeSpendingStyle + "\"> " +
					
							"<td class='dateContainer' >" +
							miscellaneousSpending[i].dateNumb + "th-" + theDay +
							"</td>" + 
							
							"<td class='amountContainer' >" +
								"$" + miscellaneousSpending[i].amount + 
							"</td>" +
							
							"<td>" + 
							miscellaneousSpending[i].comment + 
							"</td>"+
							
							"<td class='editText buttonColor' > Change </td>" +
							
							"<td class='removeText buttonColor' > Remove </td>" +
								
						"</tr>"	;

			if (Global_lastEntrydate != dateNumb)
				entryRow = "<tr>			 " +
								"<td class =\"otherDateStyle\" > </td>" +
							"</tr>" + entryRow
				;
			
			Global_lastEntrydate = dateNumb;
			
			theTable.append(entryRow); 
			
			// 02. Sum The Miscellaneous Spending
			totalMiscellaneousSpending = totalMiscellaneousSpending + miscellaneousSpending[i].amount;
		}
		
		// 3. Add The Horizontal Line For Food Spending
		theTable.append("<tr>  " +
				"<td colspan=3>" +
				"<hr>  " +
				"</td>" +
		"</tr>");
		
		// 4. Append The Miscellaneous Spending Number
		totalMiscellaneousSpending = Math.round(totalMiscellaneousSpending * 100) / 100;
		theTable.append( 
			"<tr style='text-align: right' > " +
				"<td colspan='3' >" +
					"Subtotal:  <span style='color: yellow'>$" + totalMiscellaneousSpending + " <br><br><br> </span>" +
				"</td>" + 
			"</tr>"	);
	}
	
	
	/*******************Total Spending**********************/
	var totalSpending = totalFoodSpending + totalMiscellaneousSpending +  totalFixedSpending;
	totalSpending = Math.round(totalSpending * 100) / 100;
	
	// 3. Add The Horizontal Line For Food Spending
	theTable.append("<tr>  " +
			"<td colspan=3>" +
			"</td>" +
	"</tr>");
	
	theTable.append( 
		"<tr> " +
			
			"<td colspan='3' style='text-align: right; border-top: 1px dotted white; ' >" +
				"Total Spending:  <span style='color: yellow; font-size: 1.5em;'>$" + totalSpending + "<br><br></span>" +
			"</td>" + 
			
		"</tr>"	);
	
	
	// 5. Add Click Listener for "Manage"
	$("#manage").click(function(){
		
		var data = $(this).text();
		
		$(".editText").css("min-width", "5px");
		$(".removeText").css("min-width", "5px");
		
		if(data == "+Edit") {
			
			$(this).text("-Hide");
			$(".editText").fadeIn(150);
			$(".removeText").fadeIn(150);
		} else {
			
			isEditing = false;
			$(this).text("+Edit");
			$(".editText").fadeOut(150);
			$(".removeText").fadeOut(150);
		}
		
	});
	
	if(isEditing)
		$("#manage").click();
	
	// 6. Add Click Listener To Each Generated "Edit" Text
	addClickListenerToEditText();
	 
	// 7. Update The Month and Year In The Title
	$("#theMonth").text(convertNumberToMonth(globle_month) + ", " + globle_year);
	
}


function addClickListenerToEditText() {
	
	/***************************"Edit"************************/
	 $(".editText").click(function() {
		 
		// 1. Get The ID Of This Entry
		var entryID = $(this).parent().attr("id");
		
		// 2. Get The Original Data For This Entry From The Database
		 $.get(getMyServerRoot(), {
				
				requestType: "getOneEntryData",
				entryID: entryID,
				
			}, function(results) {
				
		   		var jsonResult = jQuery.parseJSON(results);
		   		
		   		// 3. Set Spending Type
		   		switch (jsonResult.type) {
		   			case 1:	document.getElementById("editFoodRadio").checked = true; break;
		   			case 2: document.getElementById("editMiscellaneousRadio").checked = true; break;
		   			case 3: document.getElementById("editFixedRadio").checked = true; break;
		   		}
		   		
		   		// 4. Fill The Edit Dialog With Original Data
		   		$("#spendingIDtoUpdate").val(entryID);
		   		
		   		$("#editAmount").val(jsonResult.amount);
		   		$("#editComment").val( jsonResult.comment);

		   		$("#editYear").val(jsonResult.year);
		   		$("#editMonth").val(jsonResult.month);
		   		$("#editDate").val(jsonResult.dateNumb);
		   		
		   		// datetime Pikcer
		   		$('#editBillDateTimePicker').datetimepicker({
		   			
			   		 inline: true,
			   		 theme: 'dark',
			   		 todayButton: false,
			   		 datepicker: true,
			   		 timepicker: false,
			   		 format:'d m Y H.i',
			   		 defaultDate:  jsonResult.year + "/" + jsonResult.month + "/" + jsonResult.dateNumb,
	
			   		 onChangeDateTime: function(dp, data){
			   				
			   			 var selectedDateTime = data.val().split(" ");
			   			 	
			   			 var dateNumb = selectedDateTime[0];
			   			 var month = selectedDateTime[1];
			   			 var year = selectedDateTime[2];
	
			   			 $("#editYear").val(year);
			   			 $("#editMonth").val(month);
			   			 $("#editDate").val(dateNumb);
			   		 }
		   		});

		   		// 5. Show Edit Dialog
		   		$(".dialogBackground").fadeIn(10);
		   		$( "#dialog" ).dialog( "open" );
		});
		
	 });
	 
	 /***************************"Remove"************************/
	 $(".removeText").click(function() {
		 
		 // 1. Save This ID To The Confirm Window For Removing
		var entryID = $(this).parent().attr("id");
		$("#entryIdToRemove").val(entryID);
		
		// 2. Show The Dialog
		$(".dialogBackground").fadeIn(10);
	 	$("#removeConfirmDialog").dialog("open");
	 });
}


function getMyServerRoot() {
//	var url = "http://" + window.location.host + "/Schedule";
	var url = "http://" + window.location.host + "/Spending";
	return url;
}


function showTheMaps() {
	
	// 1. initialize the map
    var mapOptions = {
      center: new google.maps.LatLng(45.949837, -66.641792),
      zoom: 15,
//      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    // 2. add a marker
	var theMarker = new google.maps.Marker({
		
		position : new google.maps.LatLng(45.949837, -66.641792),
		title : "-_-",
		animation: google.maps.Animation.DROP
	});
	theMarker.setMap(map);
	
	// 3. Message of the Popup
	var contentString = '<div style="color: black" >'+
	      					'<strong>Computer Science</strong>'+
	      					'<div>'+
	      						'Information Technology Center' +
							'</div>'+
						'</div>';
	var infowindow = new google.maps.InfoWindow({
		
	      content: contentString,
	      maxWidth: 500
	  });
	
	
	// 3. click listener
	google.maps.event.addListener(theMarker, 'click', function() {
		infowindow.open(map,theMarker);
	});
	
}

function showYourLocationOnTheMaps() {
	
	navigator.geolocation.getCurrentPosition(function(position) {
		
		var theLatitude = position.coords.latitude;
		var theLongitude = position.coords.longitude;
		
		// 1. initialize the map
	    var mapOptions = {
	      center: new google.maps.LatLng(theLatitude, theLongitude),
	      zoom: 15,
	//      mapTypeId: google.maps.MapTypeId.SATELLITE
	    };
	    
	    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	    
	    // 2. add a marker
		var theMarker = new google.maps.Marker({
			
			position : new google.maps.LatLng(theLatitude, theLongitude),
			title : "You Are Here",
			animation: google.maps.Animation.DROP
		});
		theMarker.setMap(map);
		
		// 3. Message of the Popup
		var contentString = '<div style="color: black" >'+
		      					'<div>'+
		      						'You Are Here :)' +
								'</div>'+
							'</div>';
		var infowindow = new google.maps.InfoWindow({
			
		      content: contentString,
		      maxWidth: 500
		  });
		
		
		// 3. click listener
		google.maps.event.addListener(theMarker, 'click', function() {
			infowindow.open(map,theMarker);
		});
	
  });
  
}

function convertMonthToNumber(monthString){
	
	if(monthString == "Jan")
		return "1";
	if(monthString == "Feb")
		return "2";
	if(monthString == "Mar")
		return "3";
	if(monthString == "Apr")
		return "4";
	if(monthString == "May")
		return "5";
	if(monthString == "Jun")
		return "6";
	if(monthString == "Jul")
		return "7";
	if(monthString == "Aug")
		return "8";
	if(monthString == "Sep")
		return "9";
	if(monthString == "Oct")
		return "10";
	if(monthString == "Nov")
		return "11";
	if(monthString == "Dec")
		return "12";
	
}

function convertNumberToMonth(monthNumber) {
	
	if(monthNumber == "1")
		return "January";
	if(monthNumber == "2")
		return "Feburary";
	if(monthNumber == "3")
		return "March";
	if(monthNumber == "4")
		return "April";
	if(monthNumber == "5")
		return "May";
	if(monthNumber == "6")
		return "June";
	if(monthNumber == "7")
		return "July";
	if(monthNumber == "8")
		return "August";
	if(monthNumber == "9")
		return "September";
	if(monthNumber == "10") 
		return "October";
	if(monthNumber == "11")
		return "November";
	if(monthNumber == "12")
		return "December";
}

function convertNumberToShortMonth(monthNumber) {
	
	
	if(monthNumber == "1")
		return "Jan";
	if(monthNumber == "2")
		return "Feb";
	if(monthNumber == "3")
		return "Mar";
	if(monthNumber == "4")
		return "Apr";
	if(monthNumber == "5")
		return "May";
	if(monthNumber == "6")
		return "Jun";
	if(monthNumber == "7")
		return "Jul";
	if(monthNumber == "8")
		return "Aug";
	if(monthNumber == "9")
		return "Sep";
	if(monthNumber == "10") 
		return "Oct";
	if(monthNumber == "11")
		return "Nov";
	if(monthNumber == "12")
		return "Dec";
}

function dayInEnglish(monthNumber) {
	
	if(monthNumber == "0")
		return "Sun";
	if(monthNumber == "1")
		return "Mon";
	if(monthNumber == "2")
		return "Tue";
	if(monthNumber == "3")
		return "Wed";
	if(monthNumber == "4")
		return "Thu";
	if(monthNumber == "5")
		return "Fri";
	if(monthNumber == "6")
		return "Sat";
}
