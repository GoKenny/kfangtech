
$(document).ready(function() {
	
	i=0;
	availableTags = [
	                 "ActionScript 	<span style='background: grey'>  testing  </span>",
	                 "AppleScript",
	                 "Asp",
	                 "Application",
	                 "Apple",
	                 "Activity"
	                 ];
	
	$( "#tags").keyup(function()  {
		
		i++;
		availableTags.push("ActionScript " + i);
		
		$("#tags").autocomplete({
			
			source: availableTags,
			minLength: 1,
		});

	});
	
	
	/** Optional: Customized Autocomplete instance. */
    $.widget( "app.autocomplete", $.ui.autocomplete, {
        
        // 1. the class that I want to add to the matching string 
        options: {
            highlightClass: "kfangHighlight"
        },
        
        // 2. append the class to the matching string
        _renderItem: function( ul, item ) {

            var re = new RegExp( "(" + this.term + ")", "gi" );
            var template = "<span class='" + this.options.highlightClass + "'>$1</span>";
            
            var label = item.label.replace( re, template );
            var $li = $( "<li/>" ).appendTo( ul );
                   
            $( "<a/>" )	.attr( "href", "#" )
            			.html( label )
            			.appendTo( $li );
                    
            return $li;
                    
        }
        
    });

    
    
    /** show autocomplete after the ajax finishes */
//    $(document).ajaxComplete(function(){
//    	
//    	$("#filterTweet").autocomplete(  {
//    		source: availableTags,
//    	});
//    	
//    });

    
    
});


