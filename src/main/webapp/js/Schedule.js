/**
 * 
 * @author Kenny Fang
 * 
 * Email: kuinai.fang@gmail.com
 * LinkedIn: http://www.linkedin.com/profile/view?id=134048517
 * 
 * All Rights Reserved
 * 
 */

var globle_month = (new Date().getMonth()+1) ;
var globle_year = new Date().getFullYear();

$(document).ready(function() {
	
	
	/**************** When This Page  Is Loading ****************/
	// 1. Display Current Schedule
	$("#tableDiv").fadeOut(5);
	showSchedule(globle_month,globle_year);
	
	$(document).ajaxComplete(function(){
		$("#loadingGif").fadeOut(10);
		$("#tableDiv").slideDown(700);
//		$("#tableDiv").fadeIn(250);
	 });
	
	// 2.Prepare The "Edit" Dialog
	$(".dialogBackground").click(function(){
		
		$("#hintContent, #instructionText, #hintBox, .dialogBackground").fadeOut(300);
		$("#dialog").dialog("close");
		$("#removeConfirmDialog").dialog("close");
	});
	
	$("#dialog").dialog({
		
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
	      
	    width: 530,
	    height: 355
	      
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
	
	/*************** When The Page Is Done loading***********************/
	$(window).load(function() {
		
		// If It Is A Beta User, Show Instruction
		var theUser = $("#theUserRole").text().trim();
		if (theUser != "kenny") {
			
			// In Mobile, Use The Transparent Background For The Instructions
			if ($(window).width() < 650) {
					$(".dialogBackground").fadeIn(400);
				}
					
			setTimeout(function(){
				
				$("#instructionText").fadeIn(500, function(){
					
//					$("#hintContent").show("drop", {direction: "up"}, 750);
					$("#hintContent").slideDown( 750);
				});
				
			}, 500);
		
		}
			
	});
	
	
	/*************** Logout ***********************/
	$("#logout").click(function(){

		$.post("Login",{requestType:"logout"}, function (jsonString) {
			location.reload();
		});
		
	});
	
	/**************** Hint ****************/
	$("#instructionText").click(function(){
		
		$("#hintContent").slideToggle(500);
	});
	
	
	$("#hintOk").click(function(){
		
		$("#hintContent, #instructionText, #hintBox, .dialogBackground").fadeOut(400);
	
	
	});
	
	
	/**************** Add One Entry Text *****************/
	$("#addOneEntry").click(function(){
		
		var theData = $("#addOneEntry").text();
		
		if (theData == "+ Add One Entry") {
			
//			$("#addOneEntry")[0].scrollIntoView(true);

			$(".addOneActivityForm").slideDown(200);
			$("#addOneEntry").text("- Hide The Form");
			
			// Scroll to the section
			$('body').animate({
				scrollTop: $("#addOneEntry").offset().top - 50
			}, 1000);
			

		} else {
			
			$(".addOneActivityForm").slideUp(200);
			$("#addOneEntry").text("+ Add One Entry");
		}
	
	
	});
	
	/********* Start The Smooth Scroll Library**********/
//	$('.theSmoothScroll').localScroll({
//		duration : 1000,
//		easing : 'easeOutQuart',
//		offset : 0
//	});
	
	
	/**************** Input Of The Place and Event*****************/
	// When Focus Out, Check If It Is Empty
//	$("#place, #event").focusout(function(){
//		
//		var theInput = $(this).val();
//		
//		if (theInput == "") {
//			$("#theErrorMessage").fadeIn(100);
//			$("#place").css("border-color", "red");
//		}
//		else{
//			$("#theErrorMessage").fadeOut(100);
//			$("#place").css("border-color", "transparent");
//		}
//		
//	});
	
	// Remove The ErrorMessage When Type Something In It
	$("#place, #event").keyup(function(){
		$("#theErrorMessage").fadeOut(80);
	});
	
	
	$("#from, #to").focusout(function(){
		
		var data = $(this).val();
		
		if (isNaN(data)) {
			
			$("#theErrorMessage").text("The time should be number");
			$("#theErrorMessage").fadeIn(100);
			$(this).css("border-color", "red");
			
		} else {
			
			$("#theErrorMessage").fadeOut(100);
			$(this).css("border-color", "white");
			
		}
		
	});
	
	

	/**************** Add One Entry Button *****************/
	$("#addForm").submit( function(e){
		
		e.preventDefault();
		
		// 1. Collect The Inputs From User
		var year = $("#year").val().trim();
		var month = $("#month").val().trim();
		var date = $("#date").val().trim();
		var from = $("#from").val().trim();
		var to = $("#to").val().trim();
		var place = $("#place").val().trim();
		var event = $("#event").val().trim();
		
		if (isNaN(from)||isNaN(to)) {
			
			$("#theErrorMessage").text("start time should be number");
			$("#theErrorMessage").fadeOut(100);
			$("#from").css("border-color", "red");
			return;
		}
		
		if (place == "") {
			$("#theErrorMessage").text("please input the place");
			$("#theErrorMessage").fadeIn(100);
			$("#place").css("border-color", "red");
			return;
		}
		
		if (event == "") {
			$("#theErrorMessage").text("please input the event");
			$("#theErrorMessage").fadeIn(100);
			$("#event").css("border-color", "red");
			return;
		}
		
		month = convertMonthToNumber(month);
		
		$.get(getMyServerRoot(), {
			
			requestType: "addOneEntry",
			year: year,
			month: month,
			date: date,
			from: from,
			to: to,
			place: place,
			event: event,
			
		}, function(results) {
	
			// 1. Get The JSON From Servlet
	   		jsonResult = jQuery.parseJSON(results);
	   		var insertResult = jsonResult.insertResult;
	   		
	   		
	   		if (insertResult == "ok") {

	   			// 1. Show Success Message
	   			$("#insertResult").css("color", "rgb(30, 193, 226)");
	   			$("#insertResult").text("Entry is saved to the DB successfully :)");
	   			$("#insertResult").fadeIn(50);
	   			
	   			// 2. Refresh The Table
   				globle_month = month;
   				globle_year = year;
   				
	   			$("#tableDiv").fadeOut(300);
	   			showSchedule(globle_month, globle_year);
	   			$("#tableDiv").fadeIn(200);
	   			
	   			// 3.Clear The Form in 1.5 second
	   			setTimeout(function(){
	   				
	   				$("#insertResult").fadeOut(200);
	   				
	   				 $("#from").val("");
	   				 $("#to").val("");
	   				 $("#place").val("");
	   				 $("#event").val("");
	   				
	   			}, 1500);
	   			
			} else {
				
	   			$("#insertResult").css("color", "red");
				$("#insertResult").text("System Error");
				$("#insertResult").fadeIn(100);
			}
	   		
				
	    });
		
		
	});
	

	/**************** Show The Map Text *****************/
	$("#checkTheMap").click(function(){
		
		// toggle the map
		var mapHeight = $("#map-canvas").css("height");
		if (mapHeight == "0px") {
			
			// 1. Change The Text
			$("#map-canvas").css("height", "400px");
			$("#checkTheMap").text("- Longin History");
			
			
			// 2. Generate The Map
			showTheMaps();
			
			// 3. Adjust The Height Of The Map
			 $("#map-canvas").css("height", "450px");
			
			// 3. Scroll To The Map
			$('body').animate({
				scrollTop: $(this).offset().top - 50
			}, 1000);
			
		}
		else{
			
			$("#map-canvas").css("height", "0px");
			$("#checkTheMap").text("+ Longin History");
			//			$("#seeYourCurrentLocation").fadeOut(200);
		}
			
		
	});
	
	$("#seeYourCurrentLocation").click(function(){
		
		showYourLocationOnTheMaps();
	});
	
	
	/**************** Calendar Picker *****************/
	 $("#theCalendarPicker").calendarPicker({
		 
	    monthNames:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	    useWheel: false,
//	    callbackDelay: 10,
	    years: 1,
	    months: 2,
	    days: 5,
	    showDayArrows:false,
	    
	    callback: function(cal) {
	    	
	    	$("#datePicked").val(cal.currentDate.toString());

	    	var calendarData =	cal.currentDate.toString().split(" ");
	      
	    	// Put Picked Data To The Input
	    	$("#year").val( calendarData[3] );
	    	$("#month").val( calendarData[1] );
	    	$("#date").val( calendarData[2] );
	      
	    }
		 
		 
	 });
	 
	 
	 /** For Edit Dialog **/
	 $("#datePicker").calendarPicker({
		 
	    monthNames:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	    useWheel: false,
	    years: 1,
	    months: 2,
	    days: 5,
	    showDayArrows:false,
	    
	    callback: function(cal) {
	    	
	    	$("#datePicked").val(cal.currentDate.toString());

	    	var calendarData =	cal.currentDate.toString().split(" ");
	      
	    	// Put Picked Data To The Input
	    	$("#editYear").val( calendarData[3] );
	    	$("#editMonth").val( calendarData[1] );
	    	$("#editDate").val( calendarData[2] );
	      
	    }
		 
		 
	 });
	 
	 /**************** Last And Next Month *****************/ 
	 $("#lastMonth").click(function(){
		
		 // 1. Decrease The Month
		 if (globle_month == 1) {
			 
			 globle_month =12;
			 globle_year--;
			
		} else
			globle_month--;
		 
		 // 2. Slide Current Table To The Right To Hide, blind, bounce, clip, drop, highlight, puff, slide
		 $("#tableDiv").hide("slide", {direction: "right"}, 500);
		 
		 // 3. Show Loading Gif
		 $("#loadingGif").fadeIn(10);
		 
		 setTimeout(function(){
		 
			 $.get("Schedule", { requestType: "getSchedule", month: globle_month, year: globle_year })
			 .done(function(results) {
			   	
				jsonResult = jQuery.parseJSON(results);
			   	var rows = jsonResult.rows;
			   		
		   		// 4. Generate The Table (It's So Fast To Get And Show The Data, So Delay A Little Bit To Generate The New Data)
		   		generateTable(rows);
		   		
			   	$("#loadingGif").fadeOut(10);
			   	
			 });
		   		
		 }, 420);
		 
		// 6. Slide The New Table To The Left To Show The New Table
		$("#tableDiv").show("slide", {direction: "left"}, 500);
		   		
		// 7. Show The Hidden Data
		setTimeout(function(){
			$(".columnName").slideDown(700);
			$("#manage").fadeIn(800);
		}, 500);
		
		
		 // 8. Update The Month and Year In The Title
		 $("#theMonth").slideUp(500);
		 setTimeout(function(){
			 $("#theMonth").text(convertNumberToMonth(globle_month) + ", " + globle_year);
			 $("#theMonth").slideDown(300);
		 }, 300);
	 
	 });
	 
	 
	 $("#nextMonth").click(function(){
			
		 // 1. Increase The Month
		 if (globle_month == 12) {
			
			 globle_month = 1;
			 globle_year++;
		 } else
			 globle_month++;
		 
		 // 2. Slide Current Table To The Left To Hide
		 $("#tableDiv").hide("slide", {direction: "left" }, 500);
		 
		// 3. Show Loading Gif
		 $("#loadingGif").fadeIn(10);
		 
		 setTimeout(function(){
			 
			 $.get("Schedule", { requestType: "getSchedule", month: globle_month, year: globle_year})
			 .done(function(results) {
			
		   		jsonResult = jQuery.parseJSON(results);
		   		var rows = jsonResult.rows;
		   		
		   	
		   			// 4. Generate The Table (It's So Fast To Get And Show The Data, So Delay A Little Bit To Generate The New Data)
		   			generateTable(rows);
	
		   			$("#loadingGif").fadeOut(10);
	   			
		   		});

		 }, 420);

		 // 6. Slide The New Table To The Left To Show The New Table
		 $("#tableDiv").show("slide", {direction: "right" }, 500);
		   		
  		// 7. Show The Hidden Data
   		setTimeout(function(){
   			$(".columnName").slideDown(500);
   			$("#manage").fadeIn(800);
   		}, 500);
	 
	
		// 8. Update The Month and Year In The Title
		$("#theMonth").slideUp(500);
		setTimeout(function(){
			$("#theMonth").text(convertNumberToMonth(globle_month) + ", " + globle_year);
			$("#theMonth").slideDown(300);
	   	}, 300);
		 
	 });
	 
	 
	 /**************** Check My Spending *****************/ 
//	 $("#checkMySpending").click(function(){
//		
//		 $(this).fadeOut(100);
//		 
//		 // In 0.2 second
//		 setTimeout(function(){
//			 
//		
//			 $("#checkMySpending").css("text-decoration", "none");
//			 $("#checkMySpending").text("Coming Soon :)");
//			 $("#checkMySpending").fadeIn(50);
//
//		 }, 100);
//		
//	 });	
	 
	 
	 /**************** Time Picker *****************/ 
	 /** 1. From */
	 $('#datetimepickerFrom').datetimepicker({
			
		 inline: true,
		 datepicker: false,
		 timepicker: true,
		 todayButton: true,
			
		 format:'d.m.Y H.i',
			
		 startTime:'7:00',

		 allowTimes:[ '7:00', '7:30', '8:00', '8:30','9:00','9:30','10:00', '10:30', '11:00', '11:30', '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00', '18:30', '19:00', '19:30','20:00'],
			
			onChangeDateTime:  function(dp,$input){
				
			     var selectedTime = $input.val().split(" ")[1];
			     $("#from").val(selectedTime);
			  }
		
		});
	 
	 $('#editDatetimepickerFrom').datetimepicker({
			
		 inline: true,
		 datepicker: false,
		 timepicker: true,
		 todayButton: true,
			
		 format:'d.m.Y H.i',
			
		 startTime:'7:30',

		 allowTimes:['7:00', '7:30', '8:00', '8:30','9:00','9:30','10:00', '10:30', '11:00', '11:30', '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00', '18:30', '19:00', '19:30','20:00'],
			
			onChangeDateTime:  function(dp,$input){
				
			     var selectedTime = $input.val().split(" ")[1];
			     $("#editFrom").val(selectedTime);
			  }
		
		});
	 
	 	/** 2. to */
	 	$('#datetimepickerTo').datetimepicker({
				
			 inline: true,
			 datepicker: false,
			 timepicker: true,
			 todayButton: false,
				
			 format:'d.m.Y H.i',
				
			 startTime:'8:00',
	
			 allowTimes:[  '7:30', '8:00','8:30','9:00','9:30','10:00', '10:30', '11:00', '11:30', '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00', '18:30', '19:00', '19:30','20:00'],
					
				onChangeDateTime:  function(dp,$input){
					
				     var selectedTime = $input.val().split(" ")[1];
				     
				     var fromTime = $("#from").val();
				     
				     if (selectedTime < fromTime) 
						$("#timeErrorMessage").fadeIn(200);
				     else{
				    	 $("#timeErrorMessage").fadeOut(200);
				    	 $("#to").val(selectedTime);
				     }
				  }
		
	 	});
	 	
	 	$('#editDatetimepickerTo').datetimepicker({
			
			 inline: true,
			 datepicker: false,
			 timepicker: true,
			 todayButton: false,
				
			 format:'d.m.Y H.i',
				
			 startTime:'8:00',
	
			 allowTimes:[  '7:30', '8:00','8:30','9:00','9:30','10:00', '10:30', '11:00', '11:30', '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00', '18:30', '19:00', '19:30','20:00'],
					
				onChangeDateTime:  function(dp,$input){
					
				     var selectedTime = $input.val().split(" ")[1];
				     
				     var fromTime = $("#editFrom").val();
				     
				     if (selectedTime < fromTime) 
						$("#editTimeErrorMessage").fadeIn(200);
				     else {
				    	 $("#editTimeErrorMessage").fadeOut(200);
				    	 $("#editTo").val(selectedTime);
				     }
				  }
		
	 	});
	 	
	 	
	 	/**************** "Edit" Button In The Window ****************/ 
	 	$("#theEditForm").submit(function(e) {
	 		
	 		e.preventDefault();
	 		
	 		// 1. Collect All The Inputs
	 		var entryIDtoUpdate = $("#entryIDtoUpdate").val();
	 		
	 		var editYear = $("#editYear").val();
	 		var editMonth = $("#editMonth").val();
	 		var editDate = $("#editDate").val();
	 		
	 		var editFrom = $("#editFrom").val();
	 		var editTo = $("#editTo").val();
	 		
	 		var editPlace = $("#editPlace").val();
	 		var editEvent = $("#editEvent").val();
	 		
	 		var editStatus = $("#editStatus").val();
	 		
	 		
	 		$.get(getMyServerRoot(), {
				
				requestType: "updateEntry",
				
				entryIDtoUpdate: entryIDtoUpdate,
				
				editYear: editYear,
				editMonth: convertMonthToNumber(editMonth),
				editDate: editDate,
				
				editFrom: editFrom,
				editTo: editTo,
				
				editPlace: editPlace,
				editEvent: editEvent,
				
				editStatus: editStatus
				
			}, function(results) {
		
//				// 1. Get The JSON From Servlet
//		   		jsonResult = jQuery.parseJSON(results);
//		   		var rows = jsonResult.rows;
		   		
				// 1. close The Dialog And Background
				$(".dialogBackground").fadeOut(10);
		   		$( "#dialog" ).dialog("close");
				
		   		//2. Refresh The Table
		   		setTimeout(function(){
		   			
		   			$("#tableDiv").fadeOut(80);
		   			showSchedule(globle_month, globle_year);
		   			$("#tableDiv").fadeIn(50);
		   		
		   		}, 100);
		   		
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
			   			showSchedule(globle_month, globle_year);
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


function showSchedule(month, year) {
	
	$.get(getMyServerRoot(), {
			
			requestType: "getSchedule",
			month: month,
			year: year
			
		}, function(results) {
	
			// 1. Get The JSON From Servlet
	   		jsonResult = jQuery.parseJSON(results);
	   		var rows = jsonResult.rows;
	   		
	   		//2. Generate The Table
	   		generateTable(rows);
			
	});
	
}


function generateTable(rows){
	
	
	// 1. Initialize Table
	var entryRow = "";
	var theTable = $("#theTable");
	var tableMessage = $("#tableMessage");

	theTable.empty();
	tableMessage.text("");
		
	// 2. Append Each Row To The Table
	if (rows == null) {
			
		tableMessage.text("No Data For This Month :(");
		return;
	}
	
	
	var columnName = "<tr> " +
	
						"<td>" +
						 	" <div class='columnName'>Date</div>" + 
						"</td>" +
						
						"<td  >" +
							"<div class='columnName'>Time</div>" + 
						"</td>" +
					
						"<td >" +
							"<div class='columnName'>Place</div>" + 
						"</td>" +
						
						"<td>" +
							"<div class='columnName'>Event</div>" + 
						"</td>" +
					
					"<tr>";
	
	var manageText = "<tr>" +
						"<td colspan=4>" +
							"<span id='manage' class='buttonColor' >+Edit</span>" +
						"</td>" +
					"</tr>";
		
	theTable.append(manageText + columnName);
		
	for (var i = 0; i < rows.length; i++) {
		
		var to = rows[i].to;
		if(to!=="")
			to = " <span class='mobileBreak'><br></span> - <span class='mobileBreak'><br></span> " + to;
		
		// Scenario 1: Strike Through The Completed Entry
		if (rows[i].status == "completed") 
			entryRow = "<tr id =" + rows[i].id  +"> " +
				
//							"<td class='entryID' >" + rows[i].id + "</td>" +
				
							"<td align=left colspan=4>" +
								"<del>" + 
									rows[i].date + "<a>th-</a>" + rows[i].dayOfWeek + " <a>from </a>" + rows[i].from + to + "<a> at </a>" + rows[i].place + ", <a>to </a>" + rows[i].event +
								"</del> " +
							"</td>" + 
							
							"<td class='editText buttonColor' > Change </td>" +
							
							"<td class='removeText buttonColor' > Remove </td>" +
								
						"</tr>"	;

		// Scenario 2: Show Entry That Is Pending To Do
		else {
			
			var todayStyle = "";
			if (rows[i].today !="no")
				todayStyle = "todayEntry";
			
			entryRow = "<tr id =" + rows[i].id + " class='pendingEnties "  + todayStyle + "'>"  +
							"<td class='entryID' >" + rows[i].id + "</td>" +
		   					"<td class='dateContainer'"  + ">" + rows[i].date + "<span style='font-size: 10px'>th-</span>" + rows[i].dayOfWeek + "</td>" +
							"<td class='timeContainer'" + ">" + "<a></a>" + rows[i].from + to + " </td>" +
							"<td class='placeContainer'"  + ">" + "<a style='color:grey; font-size: 0.8em'> at </a>" + rows[i].place + " </td>" + 
							"<td class='eventContainer'"  + ">" + "<a style='color:grey; font-size: 0.8em'> to </a>" + rows[i].event + " </td>" +
							
							"<td class='editText buttonColor' > Change </td>" +
							"<td class='removeText buttonColor' > Remove </td>" +
						"</tr>";  
		}
		
		// 02. Append This Row To The Table 
		// Scenario 1: Append This Row Next To Previous Entry
		if (rows[i].sameDay == "yes") 
			theTable.append(entryRow); 
		
		else {
				
			// Scenario 2: If This Entry Is For Next Week, Add Horizontal Line + weekNumb Before This Row
			if (rows[i].nextWeek == "yes") {
					
				theTable.append("<tr>  " +
									"<td colspan=4>" +
										"<hr> " + 
										"<span style='color: orange; font-style: italic;'class='weekNumbers' > Week " + rows[i].weekNumb + ": </span>" +
									"</td>" +
								"</tr>");

				theTable.append(entryRow);
			} else {
					
				// Scenario 3: If This Entry Is For The Next Day In The Same Week, Add One Empty Row Before This Row
				theTable.append(" <tr> " +
									"<td> " +
										"<div style='margin-top: 5px'>  </div> " +
									"</td> " +
								"</tr>");
					
				theTable.append(entryRow);
			}
		} 
			
	}
		
	// 3. Add The Horizontal Line At The End
	theTable.append("<tr>  " +
						"<td colspan=4>" +
							"<hr>  " +
						"</td>" +
					"</tr>");
		
	// 4. Add Click Listener To Each Generated Row For Completing The Entry
	addDoubleClickListener();
	
	// 5. Add Click Listener To Each Generated "Edit" Text
	addClickListenerToEditText();
		
	 /**************** Manage *****************/ 
	 $("#manage").click(function(){
			
		 var data = $(this).text();
		 
		 if(data == "+Edit") {
			 
			 $(".editText").fadeIn(150);
			 $(".removeText").fadeIn(150);
			 $(this).text("-Hide");
		 } else {
			 
			 $(".editText").fadeOut(150);
			 $(".removeText").fadeOut(150);
			 $(this).text("+Edit");
		 }
		 
	 });	
	 
	// 5. Update The Month and Year In The Title
	$("#theMonth").text(convertNumberToMonth(globle_month) + ", " + globle_year);
	
}


function addDoubleClickListener() {

	// Desktop Version
	$("tr").dblclick(function () {
		
		var entryID = $(this).attr("id");
		toggleStatus(entryID);
	});
	
	// Mobile Version
	$("tr").swipe( function() { 
		
		var entryID = $(this).attr("id");
		toggleStatus(entryID);
	} );

}

function toggleStatus (entryID) {
	
	if (entryID != null ) {
		
		$.get(getMyServerRoot(), {
			
			requestType: "toggleStatus",
			entryID: entryID.trim()
			
		}, function(results) {
			
			// 1. Get The JSON From Servlet
			jsonResult = jQuery.parseJSON(results);
			var updateResult = jsonResult.updateResult;
			
			// 2. Refresh The Table
			if (updateResult == "ok") 
				showSchedule(globle_month, globle_year);
			else
				$("#tableMessage").text("Error From MongoDB :(");
			
		});
		
	}
	
}


jQuery( "#theTitle" ).swipe(  function( event ) { alert("tapped"); } );



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
		   		
		   		// 3. Fill The Edit Dialog With Original Data
		   		$("#entryIDtoUpdate").val(entryID);
		   		
		   		$("#editYear").val(jsonResult.year);
		   		$("#editMonth").val(convertNumberToShortMonth(jsonResult.month));
		   		$("#editDate").val(jsonResult.date);
		   		
	   			$("#editFrom").val(jsonResult.from);
	   			$("#editTo").val( jsonResult.to);
		   		
	   			$("#editPlace").val( jsonResult.place);
	   			$("#editEvent").val( jsonResult.event);
	   			$("#editStatus").val( jsonResult.status);
		   		
		   		// 4. Show Edit Dialog
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
	var url = "http://" + window.location.host + "/Schedule";
	return url;
}


function showTheMaps() {
	
	// 1. initialize the map
    var mapOptions = {
      center: new google.maps.LatLng(48.924402, -91.078125),
      zoom: 3,
      //      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
//    // 2. add a marker
//	var theMarker = new google.maps.Marker({
//		
//		position : new google.maps.LatLng(45.949837, -66.641792),
//		title : "-_-",
//		animation: google.maps.Animation.DROP
//	});
	
//	theMarker.setMap(map);
	
	// 3. Message of the Popup
//	var contentString = '<div style="color: black" >'+
//	      					'<strong>Computer Science</strong>'+
//	      					'<div>'+
//	      						'Information Technology Center' +
//							'</div>'+
//						'</div>';
	
//	var infowindow = new google.maps.InfoWindow({
//		
//	      content: contentString,
//	      maxWidth: 550
//	  });
	
	
	// 3. click listener
//	google.maps.event.addListener(theMarker, 'click', function() {
//		infowindow.open(map,theMarker);
//	});
	
	// 4. Add Markers
	setTimeout(function(){
		addMarkers(map);
	}, 500);
  
}


function addMarkers(map) {
	
	// 1. Get All The Coordinates From The Server
	$.post("LoginHistory", {
			
		requestType: "getAllLoginCoordinates",
		
	}, function(results) {
		
		var jsonResult = jQuery.parseJSON(results);
		var recordsArray = jsonResult.records;
		
		for (var i = 0; i < recordsArray.length; i++) 
			// Can't Write The Map Code Directly Here Because of JavaScript Loop For Common Viariable Which Does Not Renew The Defined Variable
			andOneMaker(map, recordsArray[i]);

	});

}

function andOneMaker(map, record) {
	
	// 1. customize the marker
	var theMarker = new google.maps.Marker({
		
		position:  new google.maps.LatLng(record.latitude, record.longtitude),
		map: map,  
		animation: google.maps.Animation.DROP,
		title : "Beta",
		clickable: true
	});
	
	//2. Message of the infowindow
	var userName = record.userName;
	var ip = record.ip;
	
	if (ip == "1.1.1.1") 
		ip = "confidential";
	
	var contentString = 
		'<div style="color: black; font-weight: bold; font-size: 11px; text-align: ; width: 125px ; height: 65px; ">'+
		
			"<div>" + 
				"Account: " + " <span style='color:orange'> " + userName + "</span>" +
			"</div>" +

			"<div>" + 
				"IP: " + " <span style='color:orange'> " + ip +  "</span>" +
			"</div>" +
		
			'<div style="margin-top: 2px; color: " >'+
				"Time: " + "<span style='color:orange'> " + record.loginTime + "</span>" +
			'</div>'+
			
		'</div>';
	
	theMarker.info = new google.maps.InfoWindow({
		
		content: contentString,
		maxWidth: 580
		
	});
	
	// 3. Add click listener to the marker
	google.maps.event.addListener(theMarker, 'click', function() {
		
		theMarker.info.open(map, theMarker);
	});
	
	theMarker.setMap(map);
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
