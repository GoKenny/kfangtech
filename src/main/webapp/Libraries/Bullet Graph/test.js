$(document).ready(function(){
	
    // 1. set its style
    $('#origninalGraph').bulletGraph({
        width: 170,
        height: 15,
        ranges:			['0%', '35%', '55%', '100%'],
        rangesLabels: 	['Negative', 'Neutral', 'Positive'],
        showLabels: true,
        sliderOptions: {
        	
//        	disabled: true,
        	slide: function( event, ui ) {/* do something*/}
    
        }
    });
    
    // 2. set its value
    $("#origninalGraph_bulletGraphBox .actual").slider('value', 70);
    

});
