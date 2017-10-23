
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="dataCenter.OracleDB" %>
<%@ page import="toolsBox.TimeManager" %>
<%@ page import="java.util.List;" %>


<!DOCTYPE html>
<html>

<head>
	
	<meta http-equiv='Pragma' content='no-cache'>
	<meta http-equiv='Expires' content='-1'>
	
	<link href="css/commonStyle.css"   rel="stylesheet"  />
	<link href="css/Home.css"   rel="stylesheet"  />
	
	<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	
	<link href="images/UNBmail.jpg" rel="icon" type="image/x-icon" />
	<link href="images/UNBmail.jpg" rel="shortcut icon" type="image/x-icon" />

	<title>Kfang Webapp</title>

</head>


<body  style="margin: 0px; background: url('images/carbon2.jpg');  background-size: 25% 25%;  ">

	<div class=fixedBanner >
	
		<div class=imageContainer >
		
			 <div class=dataConfig>
			 	
			 	<%
			 		boolean loggedIn = false;
			 	
					String name = (String) session.getAttribute("userName"); 
			 		// Database database = (Database) session.getAttribute("database");
			 	
			 		if (name!=null)
			 			loggedIn = true;
			
					if(!loggedIn) { 
				%>
						<a style="color: yellow;" >Please Log In First</a>				
				<%
					}
					else {
						
				%>
						<a>Hello, <%= name %>  </a>
				<%
					}
				%>
			 
			 </div>
			 
		</div>
		
	</div>


	<div class=centerStyle>
	
		<% if(loggedIn) { %>
			
			<div class="theWeather" >
				<iframe 
					title=Fredericton 
					src='http://weather.gc.ca/wxlink/wxlink.html?cityCode=nb-29&amp;lang=e'
					class=weatherConfig
					>
				</iframe>
			</div>
		<%	} %>
 		
 		<br>
 		<br>
 		
		<% if(!loggedIn) { %>
			<a id='login'  style='font-family: Segoe Script; font-weight: bold;  position: relative; left: 300px; cursor: pointer; ' >Login</a>
		<%	} %>
		
		<br>
		
		<div  class=centerSection >
			
		
		<div id="dialog" title="Login"  >
  			User Name:	<input type="text" value="Kuinai Fang" disabled="disabled" ><br>
  			Password:	<input type="password" value="mypassoord" disabled="disabled" style="margin-left: 12px;" ><br>
			<a href="Login" style="float: right; border: 1px ; border-color: black; background: silver; width: 70px; text-align: center; margin-top: 3px;" >
				Login
			</a>
		</div>
		
		<script>
		  $(function() {
			  // 1. when click the button
		    $( "#login" ).click(function() {
		      $( "#dialog" ).dialog( "open" );
		    });
			  
			  // 2. do this
		    $( "#dialog" ).dialog(
		    	{
		      		autoOpen: false,
		      		show: {
		        		effect: "blind",
		        		duration: 500
		      		},
		      		hide: {
		        		effect: "fade",
		        		duration: 1000
			    	},
		      		width: 380
		    	}
		    );
		 
		  });
  		</script>
			
		</div>

		
		<div class=centerSection>
			
			<b> myCalendar </b> 
			<br>
			<br> 
			<a href="Schedule.jsp"> Check My Schedule </a>  
			<br>
			<br> 
			<a href=AddOneEntry.html> Add One Entry </a> <br>
			<br>
			<br> <b>mySpending </b> <br>
			<br> <a href=ShowSpending style='color:'> Current Spendings </a> <br>
			<br> <a href=ShowMiscellaneous style='color: '> Miscellaneous Spendings </a> <br>
		</div>

		<br><br>
		<br><br>
		<br>

		<div style='  margin-right: 70px; text-align: right;  font-size: 7pt; '>
			<a style="color: white;">Developed by: </a> <a href='http://www.linkedin.com/profile/view?id=134048517&trk=nav_responsive_tab_profile' target="blank" style="text-decoration: none; font-family: Segoe Script; color: red"> Kuinaifang</a>
		</div>
		
		<br>
		<br>
		
		
		<div class=myTitle >
 			<a style=' position: relative; float:left; left: 70px; color: red '>Powered By:</a>
			<br><br>
			
			<img class= myImage src="images/html5.png" style="width: ;"> 
			+
			<img class= myImage src="images/css3.png" style="width: ;"> 
			+
			<img class= myImage src="images/javaScript.png" style="width: ;"> 
			+
			<img class= myImage src="images/jQuery.jpg" style="height: 33px; width: 110px;">
			+
			<img class= myImage src="images/tomcat7.gif" style="height: 45px"> 
			+
			<img class= myImage src="images/javaee.png" style="width:85px; height: 45px"> 
			+
			<img class= myImage src="images/oracle10g.png" style="height: 42px; width:130px"> 
			+
			<a href='Documents/2014Winter.htm' style="color: black"  target='blank' > 
				<img class= myImage src='images/UNBmail.jpg' style="height: 45px; width: 161px;">
			</a>
 		</div>
		
		
	</div>

</body>

</html>