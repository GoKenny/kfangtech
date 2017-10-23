
//https://developers.google.com/maps/documentation/javascript/examples/




$(document).ready(function() {

//	$("#showTheMap").click(theMaps);
	
	// show the map onload
	google.maps.event.addDomListener(window, 'load', theMaps());
	
	$("#addOneMarker").click(function(){
		addMarker();
	});
	
	
});


//var map;
function theMaps() {
	
	
//	navigator.geolocation.getCurrentPosition(function(position) { //optional: get your current location
		
	
		// 1. initialize the map
        var mapOptions = {
          center: new google.maps.LatLng(45.949837, -66.641792),
//          mapTypeId: google.maps.MapTypeId.SATELLITE,
          zoom: 5
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        
        // 2. add a marker
		var theMarker = new google.maps.Marker({
			
//			position : new google.maps.LatLng( position.coords.latitude, position.coords.longitude),
			position : new google.maps.LatLng( 45.949837, -66.641792),
			title : "Testing !",
			animation: google.maps.Animation.DROP
		});
		theMarker.setMap(map);
		
		// 3. Message of the Popup
		var contentString = '<div>'+
		      					'<strong>Something</strong>'+
		      					'<div>'+
		      						'<p><b>Some Data</b> is showing <b>here</b> at the popup </p>'+
		      						'I am Here'+
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
		
//	});
      
}
 
/************************Add Another Marker************************/

var number=0;
//var markers = [];
function addMarker() {

	// 1. customize the marker
	var theMarker = new google.maps.Marker({
		
		position:  new google.maps.LatLng(45.949837, -64.641799+(number++)),
	    map: map,  // add this marker immediately
	    animation: google.maps.Animation.DROP,
	    icon: '../img/dogIcon.PNG'
	    
	});
	
//	markers.push(theMarker);
  
  	//2. Message of the infowindow
	var contentString = '<div>'+
	      					'<strong>Something</strong>'+
	      					'<div>'+
	      						"I'm Lebron James " + number +
							'</div>'+
						'</div>';
	var theInfowindow = new google.maps.InfoWindow({
		
	      content: contentString,
	      maxWidth: 500
	  
		});
	
	// 3. Add click listener to the marker
	google.maps.event.addListener(theMarker, 'click', function() {
		theInfowindow.open(map,theMarker);
	});

//	for (var i = 0; i < markers.length; i++) 
//		markers[i].setMap(map);
}


