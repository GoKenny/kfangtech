<%@ page language="java" contentType="text/html;UTF-8" pageEncoding="UTF-8"%>
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
		<meta http-equiv="refresh" content="0; url=/login.jsp?from=MySpending" />

<%
		return;
	}
%>

	<meta name="author" content="Kenny Fang">
	<meta name="Email" content="kuinai.fang@gmail.com">
	<meta name="LinkedIn" content="http://ca.linkedin.com/in/kuinaifang">
	<meta name="Claim" content="All Rights Reserved">
	
	<!-- Mobile Responsiveness -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	
<!-- 	<link href="images/logo/Logo.png" rel="shortcut icon" type="image/x-icon" /> -->
	<link rel="shortcut icon" type="image/x-icon" href="images/logo/javaLogo.jpg" />
	
	<!-- No Cache  -->
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
	
<!-- jQuery Library -->
	<script type="text/javascript" src="js/libraries/jquery-2.1.1.min.js"></script>
	
	<!-- jQueryUI Library -->
	<script type="text/javascript" src="js/libraries/jquery-ui.min-1.11.2.js"></script>
	
	<!-- HighCharts Library -->
	<script type="text/javascript" src="js/libraries/HighCharts/highcharts.js"></script>
	<script type="text/javascript" src="js/libraries/HighCharts/exporting.js"></script>
	
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
	<link rel="stylesheet" href="css/Spending.css"  />
	<script type="text/javascript" src="js/Spending.js" charset="UTF-8"></script>

	<title>Expenses</title>

</head>

<body id="bodyStyle">

	<div class="dialogBackground"> </div>

	<!-- *************************** Fixed Massage Bar On Top Of The Page ***************************  -->
	<div class=fixedBanner >
	
		<div class=imageContainer >
			 
			 <div id="currentPage" class="pageLinks">
			 	
			 	<div id="dollarSign" > </div>
			 	<div id="pageTitle"> Expenses </div>
			 	
			 </div>
			 
			 <div class="pageLinks noSelect"  >
			 
			 	<a id="theLink"  href="MySchedule" >
			 	
				 	<img align="left" src="images/logo/calendarWhite.png" width="25" height="25" style="margin-left: 3px;"  >
				 	<span id="linkTitle"> MyShedule </span>
			 	
			 	</a>
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
	<div class="centerStyle" >

		<!-- *************************** 1st Section For The Table, So That The Section Section Won't Jump Around When The Table Change ***************************  -->
		<div class="firstSection" >
		
			<div id="spendingTrend" >
				Spending Analytics
			</div>
		
			<!-- *************************** The Chart ***************************  -->
			<div id="container"> </div>
		
			<!-- ********************************** Table of Schedule *************************************** -->
			<div class="titleContainer">
				<div id="theTitle"> Spending For:</div> 
				<div id="theMonth"> August</div>
				<div id="mobileLogo" >Mobile</div>
			</div>
			
			<div id="tableMessage"> </div>
			
			<div id="loadingGif"> </div>
			
			<div id="tableDiv" style="background:  ; width: 100%;  margin-top: -15px;" >
			
				<!-- 1. The Table -->
				<table id="tableStyle" border="0">
					
					<tbody id="theTable">
						<tr> 
							<td>
								Loading ...
							</td> 
						</tr>
					</tbody>
					
				</table>
				
				<!-- 2. The Total Spending -->
				<div class="totalSpendingContainer" >
					
				</div>
					
			</div>
		
		
			<span id="lastMonth" class="noSelect LastAndNext" title="last month" >
				&lt; Last 
			</span>
			
			<span id="nextMonth" class="noSelect LastAndNext" title="next month">
				Next &gt;
			</span>
		
		</div>

		<!-- *************************** 2nd Section For The Table, So That The Section Section Won't Jump Around When The Table Change ***************************  -->

		<div class="secondSection"   >

			<!-- *************************** Form Of "Add One Entry" ***************************  -->
			<a id="addOneEntry" class="serviceText" >+ Add One Spending</a> 
		
			<div id="addOneBillForm" >
			
				<div id="typeRow" >
					<input class="radiostyle"  id="fixedRadio" type="radio" title="food" value="3"  name="spendingType"  checked="checked">  <label for="fixedRadio" class="typeDescription">Business</label>
					<input  class="radiostyle" id="foodRadio"  type="radio" title="food" value="1"  name="spendingType" > <label for="foodRadio" class="typeDescription" >Partial</label> 
					<input class="radiostyle" id="misellaneousRadio" type="radio" title="Miscellaneous" value="2"  name="spendingType" > <label for="misellaneousRadio" class="typeDescription">Personal</label>
				</div> 

				<div id="theErrorMessage" >	please enter the amount </div>

				<div id="dateRow" >
					<div class="textSpace" >
						<span class="textStyle" style="margin-left: 22px;" >
							Year: 
						</span>
						<input id="year" class="inputStyle" type="text" disabled="disabled"  > 
					</div>
					
					<div class="textSpace" >
						<span class="textStyle" >
							Month: 
						</span>
						<input id="month" class="inputStyle" type="text" disabled="disabled" > 
		
					</div>
					<div class="textSpace" >
						<span class="textStyle" >
							Date: 
						</span>
						<input id="date" class="inputStyle" 	type="text" disabled="disabled" > 
					</div>
				</div>
				
				<!-- Calendar Picker -->
<!-- 				<input  id="datePicked" style="width: 450px; display: block; ">  -->
<!-- 				<div id="dsel2" class="calendarPicker" ></div> -->
				<div id="addOneBillDateTimePicker" style="width: 100%; background: orange;" > </div>
				
				<div id="insertResult" ></div>
				
				<div class="amountCommentContainer" >
					<form id="theAddOneBillForm" >
						<div id="dataInputRow">
							<div class="inputContainer" >
								<span style="color: red;">*</span>Amount: $ <input id="amount" class="inputStyle2" type="number" step="any" autocomplete="off">  
							</div>
							<div  class="inputContainer">
								<span style="margin-left: 10px;" >
									Comment: <input  id="comment" type="text" class="inputStyle20" autocomplete="off">
								</span>
							</div>
							<div  class="inputContainer">
								<input id="addButton" value="Add" type="submit">
							</div>
						</div>
					</form>
				</div>
				
			</div>
			
	
		</div>
		
	
		<!-- *************************** Edit Dialog ***************************  -->
		<div id="dialog"  style="background: black; color: white; overflow: hidden; " >
		
			<input id="spendingIDtoUpdate"  hidden="hidden" >
		
			<div class="editFormContainer" >

				<div id="editTheErrorMessage" >
					please enter the amount
				</div>
				
				<div class="textSpace" >
					
					<form id="editOneBillForm" >
					
						*Amount: $<input id="editAmount" class="inputStyle2" type="number" step="any">  
						
						<span style="margin-left: 10px;" >
							Comment: 
							<input  id="editComment" type="text" class="inputStyle2" style="width: 100px; ">
							
							<input id="editButton" value="Edit" type="submit">
							
							
							<span id="typeRow" >
								<input class="radiostyle"  id="editFixedRadio" type="radio" title="food" value="3"  name="editSpendingType"  >  <label for="editFixedRadio" class="typeDescription">Business</label>
								<input  class="radiostyle" id="editFoodRadio" type="radio" title="food" value="1" checked="checked"  name="editSpendingType" > <label for="editFoodRadio" class="typeDescription" > Partial </label> 
								<input class="radiostyle"   id="editMiscellaneousRadio" type="radio" title="Miscellaneous" value="2"  name="editSpendingType"  > <label for="editMiscellaneousRadio" class="typeDescription">Personal</label>
							</span>
							
							
						</span>
					
					</form>
					
				</div>
				
				<br>
				<br>
				
				<div style="display: none">
				
					<div class="textSpace" >
						
						<span class="textStyle" style="margin-left: 45px;" >
							Year: 
						</span>
						
						<input id="editYear" class="inputStyle" type="text" disabled="disabled"  > 
					</div>
					
					<div class="textSpace" >
						
						<span class="textStyle" >
							Month: 
						</span>
							
						<input id="editMonth" class="inputStyle" type="text" disabled="disabled" > 
		
					</div>
					
					<div class="textSpace" >
						
						<span class="textStyle" >
							Date: 
						</span>
						
						<input id="editDate" class="inputStyle" 	type="text" disabled="disabled" > 
						
						<br>
					
					</div>
					
				</div>
				
				
				<!-- Calendar Picker -->
				<div id="editBillDateTimePicker" ></div>
				
				<div id="insertResult" ></div>
				
				<br> <br>

			</div>		


		</div>
		
		<!-- *************************** Remove Confirm Dialog ***************************  -->
		<div id="removeConfirmDialog"  style="background: black; color: white; " >
			
			<input id="entryIdToRemove" >
			
			
			<div class="removeConfirmMessage">
				Are you sure to remove this spending?
			</div>
			
			<div class="buttonPosition" >
				<button id="removeYes" class="buttonStyle" type="button" >Yes</button>
				<button id="removeNo" class="buttonStyle" >No</button>
			</div>
			
		</div>
		
		<div class="developedBy" >
			Developed By: <span style="color: red"> KennyFang</span>
		</div>
		
	</div>

</body>
</html>
