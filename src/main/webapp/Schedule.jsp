<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="com.mongodb.DB" %>

<!DOCTYPE html>
<html>
<head>

<%
	// 1. Get Session Attribute
	String userName = (String) session.getAttribute("userName"); 
	DB db  = (DB) session.getAttribute("DBconnection");
			 	
	// 2. Determine If User Can View The Page Or Not
	if ( userName == null || db == null) {
%>
		<meta http-equiv="refresh" content="0; url=/login.jsp?from=MySchedule" />

<%
	}
	else {
%>

	<meta name="author" content="Kenny Fang">
	<meta name="Email" content="kuinai.fang@gmail.com">
	<meta name="LinkedIn" content="http://www.linkedin.com/profile/view?id=134048517">
	<meta name="Claim" content="All Rights Reserved">
	
	<!-- Mobile Responsiveness -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	
	<link rel="shortcut icon" type="image/x-icon" href="images/logo/javaLogo.jpg" />
	
	<!-- No Cache -->
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
	<meta http-equiv="pragma" content="no-cache" />
	
	<!-- jQuery Library -->
	<script type="text/javascript" src="js/libraries/jquery-2.1.1.min.js"></script>
	
	<!-- jQueryMobile Library -->
	<script src="js/libraries/jquery.mobile-1.4.5.js"></script>
	
	<!-- jQueryUI Library -->
	<script type="text/javascript" src="js/libraries/jquery-ui.min-1.11.2.js"></script>
	
	<!-- Google Maps Library -->
	<script src="js/libraries/googleMaps/googleMaps"></script>
	
	<!-- Calendar Picker Libraries -->
	<link rel="stylesheet" media="screen" type="text/css" href="js/libraries/calendarPicker/jquery.calendarPicker.css" />
	<script type="text/javascript" src="js/libraries/calendarPicker/jquery.calendarPicker.js"></script>
	<script type="text/javascript" src="js/libraries/calendarPicker/test/jquery.mousewheel.js"></script>
	
	<!-- Time Picker Library -->
	<link rel="stylesheet" type="text/css" href="js/libraries/DatePicker-xdsoft/jquery.datetimepicker.css" />
	<script src="js/libraries/DatePicker-xdsoft/jquery.datetimepicker.js"></script>
	
	<!-- jQueryUI Dialog Library -->
	<link rel="stylesheet" href="js/libraries/1.10.4-smoothness-jquery-ui.css">
	
	<!-- Customized Web Page -->
	<link rel="stylesheet" href="css/commonStyle.css"   />
	<link rel="stylesheet" href="css/Schedule.css"  />
	<script type="text/javascript" src="js/Schedule.js"></script>

	<title>My Schedule</title>

</head>

<body id="bodyStyle"  data-role="none">

	<div class="dialogBackground"> </div>

	<!-- *************************** Fixed Massage Bar On Top Of The Page ***************************  -->
	<div class=fixedBanner >
	
		<div class=imageContainer >
		
			 
			 <div id="spendingPage" class="pageLinks" >
			 
			 	<a id="theLink" rel="external" href="MySpending" >
			 
			 		<img align="left" src="images/logo/dollarSign.png" width="15" height="25" style="margin-left: 5px;"  >
			 		<span id="linkTitle"> MySpending </span>
			 	
			 	</a>
			 	
			 </div>
			 
			 <div id="currentPage" class="pageLinks noSelect">
			 
			 	<div id="calendarLogo" > </div>
			 	<div id="pageTitle"> MySchedule </div>
			 	
			 </div>
			 
			 <div id="logout">
			 	Logout 
			 </div>
			 
			 <div class="theUserContainer">
				<span>Account: </span>  <span id="theUserRole" ><%= userName %> </span> 
			 </div>
			 
			 
		</div>
		
	</div>
	

	<!-- *************************** The Black Background In The Center Of The Page ***************************  -->
	<div class="centerStyle"  >
	
	
	
		<!-- *************************** 1st Section For The Table, So That The Section Section Won't Jump Around When The Table Change ***************************  -->
		<div class="firstSection">
		
			<div class="hintBox">
					
				<div id="instructionText">
					How To
				</div>
				
				<div id="hintContent" >
				
					- Color <span style="background: grey" >Grey</span> means things to do today <br>
					<br>
					- double click, or swipe on your mobile, to toggle the status of the event,
					<br>
					
					<button id="hintOk" >ok</button>
					
				</div>
				
			</div>
			
			<br>
			<br>
			<br> 
	
			<div class="titleContainer" >
				<div id="theTitle" >
					Things To Do In:
				 </div> 
				<div id="theMonth" > 
					August
				</div>
				<div id="mobileLogo" >
					Mobile
				</div>
			</div>
			
			<br>
			<br>
		
		
			<!-- ********************************** Table of Schedule *************************************** -->
			<div id="tableMessage" > </div>
			
			<div id="loadingGif"> </div>
			
			<div id="tableDiv" >
			
				<table id="tableStyle">
					
					<tbody id="theTable">
						<tr> 
							<td>
								Loading ...
							</td> 
						</tr>
					</tbody>
				</table>
					
			</div>
		
		
			<div id="lastMonth" class="noSelect LastAndNext" title="last month">
				&lt; Last
			</div>
			
			<div id="nextMonth" class="noSelect LastAndNext" title="next month">
				Next &gt;
			</div>
			
		</div>
		
		
		<!-- *************************** 2nd Section For The Table, So That The Section Section Won't Jump Around When The Table Change ***************************  -->
		<div class="secondSection" >
	
			<br>
			<br>
			<br>
			<br>
			
			<!-- *************************** Form Of "Add One Entry" ***************************  -->
			<a id="addOneEntry" class="serviceText" >+ Add One Entry</a> 
		
			<div class="addOneActivityForm" >
			
				<input id="datePicked" style="width: 420px; display: none; "  > 
				
				<div class="textSpace" >
					
					<div class="textStyle" style="margin-left: 5px;">
						Year: 
					</div>
	
					<div>
						<input id="year" class="inputStyle" type="text" disabled="disabled" title="please select"> 
					</div>
	
				</div>
				
				<div class="textSpace" >
					
					<span class="textStyle" >
						Month: 
					</span>
						
					<input id="month" class="inputStyle" type="text" disabled="disabled" title="please select"> 
	
				</div>
				
				<div class="textSpace" >
					
					<span class="textStyle" >
						Date: 
					</span>
					
					<input id="date" class="inputStyle" 	type="text" disabled="disabled" title="please select" > 
				
				</div>
				
				<div class="textSpace" style="margin-left: 15px; margin-top: 12px; width: 185px;" >
					
					<div class="textStyle" >
						Time: 
					</div>	
	
					<div class="fromToContainer">
					
						<input data-role="none" id="from"  class="inputStyle" type="text" style="width: 55px;"  > 
							- 
						<input data-role="none" id="to"  class="inputStyle" type="text" style="width: 55px;"  > 

					</div>
					
				</div>	
				
				
				<div id="timeErrorMessage"> 
					End time should not be smaller than the start time 
				</div>
				
				<br> <br>
				
				<!-- Calendar Picker -->
				<div id="theCalendarPicker">  </div>
				
				<!-- Time Picker -->
				<div class="pickersContainer"> 
					<input data-role="none"  id="datetimepickerFrom" type="text">
					<input data-role="none"  id="datetimepickerTo" type="text">
				</div>
				
				<div id="insertResult" >
					Data are saved to the database:)
				</div>
				
				<div class="inputContainer" >
					
					<div id="theErrorMessage" >
						please input the required fields
					</div>
					
					<form id="addForm" >
						
						<div class="placeContainer" style="margin-left: 5px;" >
							Place: * 											 <input data-role="none"  id="place" class="inputStyle2" type="text" autocomplete="off" >  
							<span style="margin-left: 15px;">Event:</span> * 	 <input data-role="none"  id="event" type="text" class="inputStyle2" autocomplete="off" style="width: 150px; ">
						</div>
					
						<button id="addButton" type="submit" >
							Add	
						</button>
						
					</form>
				
				</div>
				
			</div>
	
	
	
			<!-- *************************** Show The Google Maps ***************************  -->
			<div id="checkTheMap" class="serviceText" >
				+ Longin History (Beta)
			</div>
			<br>
				
			<div id="map-canvas">  
			
			
			</div>
		
			<!-- *************************** Check My Spending ***************************  -->
<!-- 			<br> -->
<!-- 			<span id="checkMySpending"  > -->
<!-- 				<a href="spending" class="buttonColor"  style="font-size: 1em;" > -->
<!-- 					Check Current Spending -->
<!-- 				</a>		 -->
<!-- 			</span> -->
	
		</div>
		
	
		<!-- *************************** Edit Dialog ***************************  -->
		<div id="dialog"  style="background: black; color: white; " >
		
			<div  class="editContents"   style="zoom: " >
			
				<div class="editOneActivityForm" >
				
					<input  id="datePicked" style="width: 450px; display: none; "> 
					
					<input id="entryIDtoUpdate" type="text" >
					
					<div class="textSpace" style="margin-left: 20px;" >
						
						<div class="textStyle" >
							Year: 
						</div>
						
						<input id="editYear" class="inputStyle" type="text" disabled="disabled"  > 
					</div>
					
					<div class="textSpace" >
						
						<div class="textStyle" >
							Month: 
						</div>
							
						<input id="editMonth" class="inputStyle" type="text" disabled="disabled" > 
		
					</div>
					
					<div class="textSpace" >
						
						<div class="textStyle" >
							Date: 
						</div>
						
						<input id="editDate" class="inputStyle" 	type="text" disabled="disabled" > 
					
					</div>
					
					
					<div class="textSpace" style="margin-left: 15px; margin-top: 12px; width: 183px;" >
					
						<div class="textStyle" >
							Time: 
						</div>	
		
						<div class="fromToContainer">
						
							<input data-role="none" id="editFrom"  class="inputStyle" type="text" style="width: 55px;"  > 
								- 
							<input data-role="none" id="editTo"  class="inputStyle" type="text" style="width: 55px;"  > 
	
						</div>
					
					</div>	
					
					<div id="editTimeErrorMessage"> 
						End time should not be smaller than the start time 
					</div>
					
					<br> <br>
					
					<!-- Calendar Picker -->
					<div id="datePicker" ></div>
					
					<div class="pickersSeparater"> </div>
		
					<!-- Time Picker -->
					<input id="editDatetimepickerFrom" type="text">
					<input id="editDatetimepickerTo" type="text">
					
					<form id="theEditForm">
					
						<div class="editInputContainer" >
						
							<div  class="textSpace">
								Place: <span style="margin-left: 5px;" >*</span> 
								<input data-role="none"  id="editPlace" class="inputStyle2" type="text" style="width: 180px; " >  
								
								<span id="theErrorMessage" >
									please input the required fields
								</span>
								
								<div style="margin-top: 5px;" >
									Event: * 
									<input data-role="none"  id="editEvent" type="text" class="inputStyle2" style="width: 230px; ">
								</div>
							</div>
						</div>
					
						<div class="editStatusContainer"   >
							
							<select data-role="none"  id="editStatus" style="height: 25px;" >
								<option value="pending" >pending</option>
								<option value="completed" >completed</option>
							</select>
						
						</div>
						
						<button id="editButton" type="submit"  >
							Edit	
						</button>
					
					</form>
					
					<br> 
					
				</div>
			
			</div>
		</div>
		
		<!-- *************************** Remove Confirm Dialog ***************************  -->
		<div id="removeConfirmDialog"  style="background: black; color: white; " >
			
			<input id="entryIdToRemove" >
			
			<div class="removeConfirmMessage">
				Are you sure to remove this event?
			</div>
			
			<div class="buttonPosition" >
				<button id="removeYes" class="buttonStyle" type="button" >Yes</button>
				<button id="removeNo" class="buttonStyle" >No</button>
			</div>
			
		</div>
		
		<div class="developedBy" >
			Developed By: <span style="color: red"> KennyFang</span>
		</div>
		
		<br>
		<br>
		
	</div>

</body>
</html>

<%
	}
%>
