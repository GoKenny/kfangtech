window.onload = function(){
	
	// 1. On Click
	document.getElementById("theButton").onclick = function kennyFunction() {
	
		// 2. Get All The Elements Of That Class
		var elemArray = document.getElementsByClassName('theClass');
	
		// 3. Do Something For Each Element Of That Class
		for (var i = 0; i < elemArray.length; i++) {
			
			// 1. Change CSS
			elemArray[i].style.border = "1px solid black";
			elemArray[i].style.cursor = "pointer";
	
			// 2. Add Click Listener To Each Element Of The Class
			elemArray[i].onclick = function() {
				
				this.style.background = "green";
	
			}
	
		}
	
	};

}