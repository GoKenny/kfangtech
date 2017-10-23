
$(document).ready(function() {
	
	 
	 $("#fromJS").click(function(){
		 
		 $("#theReveal").reveal({ 
		        animation: 'fade',                   // fade, fadeAndPop, none
		        animationspeed: 150,                    // how fast animtions are
		        closeonbackgroundclick: true,              // if you click background will modal close?
//		        dismissmodalclass: 'close'    				// the class of a button or element that will close an open modal
		    });
		 
	 });
    
    
});


