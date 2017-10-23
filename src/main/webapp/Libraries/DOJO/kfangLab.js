
require([
         'dojo/dom',
         'dojo/fx',
         'dojo/domReady!'
     ], function (dom, fx) {
	
		// 1. Get The Element
        var greeting = dom.byId('greeting');
        
        // 2. Change The HTML Text
        greeting.innerHTML = ' Testing The DOJO Library';
      
        // 3. Add Some Effects
        fx.slideTo({
            node: greeting,
            top: 150,
            left: 300
        }).play(500);
         
         
     });




require(["dojo/dom", "dojo/on", "dojo/request", "dojo/domReady!"],
		
	    function(dom, on, request){
	
	        // Attach the onclick event handler to the textButton
	        on(dom.byId("theButton"), "click", function(evt){
	        	
	            // Display the text file content
	        	dom.byId("greeting").innerHTML += " Data";
	                
	        });
	    }
	);