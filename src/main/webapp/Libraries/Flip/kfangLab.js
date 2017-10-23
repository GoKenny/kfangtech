

$(document).ready(function () {
	
	// 1. Hide The Back
    $(".back").hide(5);
    
    // 2. When Hover, Flip To Back
    $('.theFlip').hover(
    		
    	// 1. When Mouse In
        function () {
        	
            $(this).find('div').stop().rotate3Di(	'toggle', 
            										200, 
            										{
            											direction: 'clockwise', 
            											sideChange: mySideChange
            										}
            									);
        },
        
        // 2. When Mouse Out
        function () {
        	
            $(this).find('div').stop().rotate3Di(	'toggle', 
            										200, 
            										{sideChange: mySideChange}
            									);
        }
        
    );
});



function mySideChange(front) {
	
    if (front) {
    	
        $(this).parent().find('div.front').show();
        $(this).parent().find('div.back').hide();
    } 
    else {
    	
        $(this).parent().find('div.front').hide();
        $(this).parent().find('div.back').show();
    }
}
