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
	<meta name="swag" content="Kenny's Java Full Stack Web Application">
	<meta name="dev practice" content="intuitive, maintainable, scalable">
	<meta name="email" content="kuinai.fang@gmail.com">

	<link rel="shortcut icon" type="image/x-icon" href="images/logo/javaLogo.jpg" />
	
	<!-- Mobile Responsiveness -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	
	<!-- jQuery Libraries -->
	<script type="text/javascript" src="js/libraries/jquery-2.1.1.min.js"></script>
	
	<!-- jQuery UI -->
	<script type="text/javascript" src="js/libraries/jquery-ui.min-1.11.2.js"></script>
	
	<!-- Zento Parallax -->
	<script type="text/javascript" src="js/libraries/zentoParallax/zentoParallax.js"></script>
	<link rel="stylesheet" type="text/css" href="js/libraries/zentoParallax/style.css" >

	<link rel="stylesheet" href="css/login.css" >
	<script type="text/javascript" src="js/login.js"></script>
	<!-- 	<script type="text/javascript" src="js/goeLocation.js"></script> -->

	<title>GoKenny</title>
	
</head>

<body id="theBody">
	
	<!-- 1. The Nav Section -->
	<div id="fixedNavContainer" >
	
		<div id="centerContainer" >

			<div class="navTabs" >
				<a id="loginText" class="tabTexts">Login</a>  
				<a id="aboutText" class="tabTexts">Specs</a> 
			</div>
		
		</div>
		
	</div>
	

	<div id="downArrow"> </div>
	
	<!-- 2. The Login Section -->
	<div id="loginSection">
		
	
		<div id="loginContainer" >
		
			
			<!-- 1. Title & Description On The Left -->
			<div id="TitleLeft" >
			
				<div id="webappName">
					Welcome, Please Log In 
				</div>
		
				<div class="welcomeDescription" >
					
					<div id="compatibleMessage" >
						Compatible with <img  src="images/logo/android.png" width="30" height="30" >  and <img  src="images/logo/apple.png" width="30" height="30" style="margin-left: -2px" > 
					</div>
					
					<div id="featureContainer" style="display: none;">
						<ul id="featureListings" >
							<li>Organize personal <strong style="font-size: 1.2em; color: #DEB887;">spending </strong> and <strong style="font-size: 1.2em; color: #DEB887;">schedule</strong></li>
							<li>Collect technical references</li>
							<li>Show off my full-stack dev skills XD</li>
						</ul>
					</div>
				</div>
			
			</div>
			
			
			<!-- 2. Input Section On The right -->
			<div id="InputRight" >
				<div id="loadingGif" >  </div>
				<form id="theLoginForm" >
					<div class="demoAccount" style="display: none;" >
						Beta account:  	<span style="color: orange;" >beta</span>, 
						password:		<span style="color: orange;" >beta</span>
					</div>			
					<div class="inputRow" >
						<div class="inputTitleText" >
							Username:	
						</div>
						<input id="userName" value="kenny" class="inputStyle" name="userName"  type="text" placeholder="User Name" >
					</div>
					
					<div class="inputRow" style="background: " >
						<div class="inputTitleText" >
							Password:	
						</div>
						<input id="password" value="beta" class="inputStyle" name="password" type="password" placeholder="Password" >
					</div>
					<div id="loginButtonContainer" >
						<input class="logInButton" type="submit" value="Log in" >
					</div>
					<div id="theMessage"> 
						<div id="theWelcomText" >
							Welcome  
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	
	<!-- 3. About Section -->
	<div id="aboutSection" >
	
		<div id="floatingContainer"  >
	
			<ul id="scene" 
				class="scene unselectable" 
				data-friction-x="0.08" 
				data-friction-y="0.08" 
				data-scalar-x="70" 
				data-scalar-y="120" 
				style="width:85%; height: 250px; margin: auto;" >
				
				<!-- 1. Background -->
				<li class="layer" data-depth="0.10">
					<div id="floatingBackground"> </div>
				</li>
				
				<!-- 2. Title -->
				<li class="layer" data-depth="0.08">
				
					<div id="titleContainer" >
					
						<div id="floatingDataContainer">
							
							<div id="floatingTitle">
								Personal Intelligence In The Cloud
							</div>
							
							<div id="floatingDescription" style="color: orange" >
								<!-- 								Organizing Spending and Schedule In the Clouds -->
							</div>
							
						</div>
					
					</div>
					
				</li>

				<!-- 3. Floating Images -->
				<li class="layer mobileHide" data-depth="0.28">
					<div  style="margin-top: 3%; margin-left: 84%;" >
						<img src="images/parallaxImages/oneCloud.png" style="width: 100%; height: 100%;" >
					</div>
				</li>
				
				<li class="layer mobileHide" data-depth="0.35">
					<div  style="margin-top: 16%; margin-left: 4%;" >
						<img src="images/parallaxImages/oneCloud.png" style="width: 70px; height: 35px;" >
					</div>
				</li>
				
				<li class="layer" data-depth="0.22">
					<div  style="margin-top: 5%; margin-left: 10%;" >
						<img src="images/parallaxImages/oneCloud.png" style="width: 70px; height: 35px;" >
					</div>
				</li>
				
				<li class="layer mobileHide" data-depth="0.18">
					<div  style="margin-top: 30%; margin-left: 18%;" >
						<img src="images/parallaxImages/oneCloud.png" style="width: 80px; height: 33px;" >
					</div>
				</li>
				
				<li class="layer" data-depth="0.1">
					<div  style="margin-top: 24%; margin-left: 90%;" >
						<img src="images/parallaxImages/oneCloud.png" style="width: 50px; height: 20px;" > 
					</div>
					
				</li>
				
				<li class="layer" data-depth="0.08">
					<div id="centerCloud" class="middleCloud" style="margin-top: 29%; margin-left: 57%;" >
						<img src="images/parallaxImages/oneCloud.png" style="width: 40px; height: 20px;" >
					</div>
					
				</li>
				
				<li class="layer mobileHide" data-depth="0.20" >
					<div id="centerCloud" style="margin-top: 23%; margin-left: 75%;" >
						<img src="images/parallaxImages/oneCloud.png" style="width: 92px; height: 50px;" >
					</div>
				</li>
				
				
				<!-- 4. Contact Information at the Bottom -->
				<li class="layer" data-depth="0.12" >
					
					<div class="contact" style="margin-top: 1%;" >

					</div>
			
				</li>
				
			</ul>

		</div>
	
		<br>
		
		<div id="descriptionContainer">
		
			<div id="technicalSpecsContainer">
				
				<!-- 1. Title -->
				<div id="technicalSpecs" class="theTitle mobileFadeUp" style="color: lime; font-style: italic;" >
					Technical Specs
				</div>
			
				<!-- 2. Description -->
				
				<div id="specsDetails" >
				
					<ul class="mobileFadeUp" >
						<li>  
							<strong class="techTitle">Front-end:</strong> HTML5, CSS3, JavaScript, jQuery / Mobile, AngularJS, AJAX, JSON, Google Maps, HighCharts;
						</li>
						
						<li>  
							<strong class="techTitle">Back-end:</strong>  Java, JSP, Servlet, JDBC, Tomcat, Maven3, JUnit;
						</li>
						
						<li>  
							<strong class="techTitle">Database:</strong>  MongoDB, Oracle;
						</li>
						
					</ul>
				</div>
			</div>	
				
			
			<div id="commercialProducts" class="theTitle mobileFadeUp" style="color: lime; font-style: italic;" >
				Sample Projects
			</div>
			
			<ul id="commercialListing" class="mobileFadeUp">
<!-- 				<li>   -->
<!-- 					<h4 class="projectTitle">EyesOver Landing Page: </h4>  <a class="theLinks" href="eyesover"  target="_blank"> www.eyesover.com</a>  <a class="jobType"> (Web UIs)</a> -->
<!-- 				</li> -->

<!-- 				<li>   -->
<!-- 					<h4 class="projectTitle">EyesOver: </h4>  <a class="theLinks" href="http://leaders.eyesover.com" target="_blank" >www.leaders.eyesover.com</a>	<a class="jobType"> (Full-stack)</a> -->
<!-- 				</li> -->

				<li>  
					<h4 class="projectTitle">Forever Living Products </h4>  <a class="theLinks" href="http://200002563640.fbo.foreverliving.com/page/products/all-products/can/en?clearDisclaimer=true" target="_blank" >www.foreverliving.com</a>	<a class="jobType"> (Full-stack)</a>
				</li>
				<li>  
					<h4 class="projectTitle">Vera Remedy </h4>  <a class="theLinks" href="aloe"  target="_blank"> http://veraramedy.com</a> <a class="jobType"> </a>
				</li>
				
				<li>  
					<h4 class="projectTitle">BlackBerry AppStore: </h4>  <a class="theLinks" href="http://appworld.blackberry.com"  target="_blank"> www.appworld.blackberry.com</a> <a class="jobType"> </a>
				</li>
				
				<li>  
					<h4 class="projectTitle">NB Online Resources: </h4>  <a class="theLinks" href="http://www2.unb.ca/alc"  target="_blank" title="Award Winning"> www2.unb.ca/alc</a> <a class="jobType"> </a>
				</li>
				
			</ul>
			 
			<div id="featuring" class="bottomMessage mobileFadeUp" >
			
				Featuring:   <br>
				
				<img class="ITlogos"  src="images/logo/html5Transparent.png"  	style=" width: 35px; padding-top: 5px; padding-bottom: 2px;"   >	
				
				<img class="ITlogos"  src="images/logo/ANGULARJS.jpg"  	style=" margin-left: 25px; padding-top: 5px; padding-bottom: 2px;"   >	
				
				<img class="ITlogos"  src="images/logo/jqueryTransparent.jpg" 	style=" width: 100px; margin-left: 20px; padding: 4px; ">
				
				<img class="ITlogos"  src="images/logo/JavaEE.jpg" 				style=" width: 50px; margin-left: 25px; "  >	
				
				<img class="ITlogos"  src="images/logo/oracleRed.jpg" 			style="min-width: 120px; margin-left: 25px; ">	
				
				<img class="ITlogos"  src="images/logo/MongoDBtransparent.png" 	style="width: 90px;margin-left: 25px; padding: 2px 8px 2px 8px;" >
			
			</div>
			
		</div>

	</div>

</body>

</html>
