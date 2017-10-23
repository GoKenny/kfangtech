
$(document).ready(function() {
	
	/**
	 * http://www.refulz.com:8082/index.php#tab2?foo=789
		Property    Result
		-------------------------------------------
		host        www.refulz.com:8082
		hostname    www.refulz.com
		port        8082
		protocol    http
		pathname    index.php
		href        http://www.refulz.com:8082/index.php#tab2
		hash        #tab2
		search      ?foo=789
	 * 
	 * */
	
	alert( $(location).attr('href'));
    
    
});


