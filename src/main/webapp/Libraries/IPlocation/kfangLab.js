
/**
 * Manually Lookup Address By IP:
 * 
 * http://www.iplocation.net/
 * 
 * 
 * */

$(document).ready(function() {
	
	
	jQuery.ajax( { 
		  url: 'http://freegeoip.net/json/', 
		  type: 'get', 
		  dataType: 'jsonp',
		  success: function(location) {
			  
			  var currentTime = new Date();
			  $('#currentTime').append(currentTime);
			  
			  $('#ip').append(location.ip);
			  jQuery('#city').append(location.city);
			  jQuery('#regionName').append(location.region_name);
			  $('#longitude').append(location.longitude);
			  $('#latitude').append(location.latitude);
			  $('#countryName').append(location.country_name);
			  $('#countryCode').append(location.country_code);
			  jQuery('#regionCode').append(location.region_code);
			  $('#zipCode').append(location.zipcode);
			  $('#areaCode').append(location.areacode);
		    
		  }
		
	});
    
    
});


