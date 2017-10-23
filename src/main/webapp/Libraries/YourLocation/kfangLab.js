
var theLatitude;
var theLongitude;
var theAccuracy;


navigator.geolocation.getCurrentPosition(function(position) {
	
	theLatitude = position.coords.latitude;
	theLongitude = position.coords.longitude;
	
	theAccuracy = position.coords.accuracy;
});


if (navigator.geolocation) 
	navigator.geolocation.getCurrentPosition(showTheMap , showError);



function showTheMap(position) {
	
	// Message
	var s = document.querySelector('#status');
	s.innerHTML = "found you!";
	s.className = 'success';

	var mapcanvas = document.createElement('div');
	mapcanvas.id = 'mapcanvas';
	mapcanvas.style.height = '400px';
	mapcanvas.style.width = '560px';
	document.querySelector('article').appendChild(mapcanvas);

	// Show The Map
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	var myOptions = {
		zoom : 15,
		center : latlng,
		mapTypeControl : false,
		navigationControlOptions : {
			style : google.maps.NavigationControlStyle.SMALL
		},
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

	var marker = new google.maps.Marker({
		position : latlng,
		map : map,
		title : "You are here! (at least within a " + position.coords.accuracy + " meter radius)"
	});
	
}

function showError(msg) {
	var s = document.querySelector('#status');
	s.innerHTML = typeof msg == 'string' ? msg : "Not Supported By Your Browser";
	s.className = 'fail';

	// console.log(arguments);
}






