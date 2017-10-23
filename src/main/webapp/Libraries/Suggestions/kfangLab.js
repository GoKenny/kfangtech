
$(document).ready(function() {
	
	$("#myInput").keyup(function() {
		
		// 1. get user input 
		data = $(this).val();
		
		if(data.keyCode ==37)
			alert("left");
		
		// 2. show suggestions
		showSuggestionResults();
		
		// validate input
		$("span").text(data);
		
		
	});
	
	
});



function showSuggestionResults (){
	
	// 1. show suggestions div
	$(".suggestionBox   .suggestionRestuls").remove();
	$(".suggestionBox").append( '	<div class="suggestionRestuls "  	tabindex="-1"> result 1 </div>	'	);
	$(".suggestionBox").append( '	<div class="suggestionRestuls"    	tabindex="-1"> result 2 </div>	'	);
	$(".suggestionBox").append( '	<div class="suggestionRestuls"		tabindex="-1"> result 3 </div>	'	);
	$(".suggestionBox").append( '	<div class="suggestionRestuls"		tabindex="-1" > result 4 </div>	'	);
	$(".suggestionBox").append( '	<div class="suggestionRestuls"		tabindex="-1" > result 5 </div>	'	);
	$(".suggestionBox").append( '	<div class="suggestionRestuls"		tabindex="-1" > result 6 </div>	'	);
	$(".suggestionBox").append( '	<div class="suggestionRestuls" 		tabindex="-1" > result 7 </div>	'	);
	
	// 2. click action for all results
	$(".suggestionRestuls").click(function () {
		
		data = $(this).text().trim();
		
		$("#myInput").val( data );
	
	});
	
}


// ← ↑ → ↓
$(document).keydown(function(e){
	
	// ↓
    if (e.keyCode == 40) { 
    	
      $(".suggestionRestuls:focus").next().focus();
      
      data = $(".suggestionRestuls:focus").text();
//      alert(data);
      
    }
    
    // ↑
    if (e.keyCode == 38) {      
    	
        $(".suggestionRestuls:focus").prev().focus();

    }   
    
    
});

