
document.addEventListener("DOMContentLoaded", function (event) {


	require([
	         'dojo/dom',
	         'dojo/_base/fx',
	         'dojo/fx',
	         "dojo/on",
	         "dijit/Dialog",
	         'dojo/domReady!'
	     ], function (dom, baseFx, fx, on, Dialog) {
		
		
		var theData = dom.byId('theData');
		
		
		on(dom.byId("addDataButton"), "click", function(evt){
			
			theData.innerHTML += " Data";
			
		});
		
		on(dom.byId("fadeOutButton"), "click", function(evt){
			
			baseFx.fadeOut({
		        node: theData
		      }).play();
			
		});
		
		on(dom.byId("fadeInButton"), "click", function(evt){
			
			baseFx.fadeIn({
		        node: theData,
		        duration: 1500,
		        onEnd: function(){
		            console.log("animation finished");
		        },
		      }).play();
			
		});
		
		on(dom.byId("slideToButton"), "click", function(evt){
			
			fx.slideTo({
				node: theData,
				units: "px",
				top: 150,
				left:250,
				duration: 120
			}).play(50);
			
		});
		
		
//		on(dom.byId("dialogButton"), "click", function(evt){
//			
//			myDialog = new Dialog({
//		        title: "My Dialog",
//		        content: "Test content.",
//		        style: "width: 300px"
//		    });
//			
//		});
		
		
		
		
	});


});

