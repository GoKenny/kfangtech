<%@ page 
	language="java" 
	contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" 
%>

<!DOCTYPE html>

<html id="theHTML" >
 
<head>

	<meta charset="utf-8">
	<meta name="author" content="Kenny Fang">
	<meta name="description" content="Kenny's Java Webapp">

	<link rel="shortcut icon" type="image/x-icon" href="images/logo/javaLogo.jpg" />
	
	<!-- Mobile Responsiveness -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	
	<!-- AngularJS -->
	<script type="text/javascript" src="js/libraries/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="js/libraries/angular.min-1.3.14.js"></script>

	<link rel="stylesheet" href="css/UnanalyzedVisitors.css" >
	<script type="text/javascript" src="js/UnanalyzedVisitors.js"></script>

	<title>Unanalyzed Visitors</title>
	
</head>

<body id="theBody">
			
	<div id="centerContainer"  ng-app="UnanlyzedVisitors" ng-controller="theController"  >
		
		<div id="middle" >
		
		<div id="loadingGif" ng-show="loading" ></div>
		
		<div id="unanalyzedBrowsingTitle" >
			Unanalyzed Browsing
		</div>
		<div ng-repeat="browsing in unanalyzedBrowsings">
			<div class="row" >
				<div class="loginTime" > {{ browsing.loginTime }} </div>   
				<div class="ipAddress" > {{ browsing.ip }}  </div>
				<div class="delete" > 
					<button class="buttonStyle"  ng-click="deleteThis(browsing.id)" > delete </button> 
				</div>
			</div>
		</div>
		
		<div id="unanalyzedLoginTitle" >
			Unanalyzed Login
		</div>
		<div ng-repeat="login in unanalyzedLogins">
			<div class="row" >
				<div class="loginTime" > {{ login.loginTime }} </div>   
				<div class="ipAddress" > {{ login.ip }}  </div>
				<div class="delete" > 
					<button class="buttonStyle"  ng-click="deleteThis(login.id)" > delete </button> 
				</div>
			</div>
		</div>
		
		</div>
	</div>
	
</body>

</html>
