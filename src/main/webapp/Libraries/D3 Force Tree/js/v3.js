/**
 * Personal Library
 * 
 * Email: kuinai.fang@gmail.com LinkedIn: https://ca.linkedin.com/in/kuinaifang
 * 
 * All Rights Reserved
 * 
 * @author Kenny Fang
 * 
 */

// Reference: http://bl.ocks.org/mbostock/1153292

var rootName = "Employee"; // The ID Name Of The Root

$(document).ready(function() {
	
	// Make The Nodes With The JSON Data
	var theNodes = {};
	tableRelations.forEach(
			
			function(link) {
		
				link.source = theNodes[link.from] || (theNodes[link.from] = {
					nodeName : link.from,
					id : link.id,
//					fixed : true,
//					x : 500,
//					y: 300,
				});
				
				link.target = theNodes[link.target] || (theNodes[link.target] = {
					nodeName : link.target,
					id : link.target,
//					x : 500,
//					y: 300
//					fixed : true,
				});
		
			}
	);

	// The Force Template
	var force = d3.layout
				.force()
				.size([850, 500])
				.nodes(d3.values(theNodes))
				.alpha(0.1)				// 0 Means Stop
				.on("tick", tick )
				.links(tableRelations)
				.linkDistance(200)		// Length Of The Linking Line
				.charge(-350)			// Space Among Nodes
				.chargeDistance(200)
//				.theta(10)			// Attraction of Each Node
								.friction(0.9)
				.linkStrength(3)		// Elasticity Of Link
//				.gravity(0.1)
			//					.gravity(0.3)
				.start()
//				.stop()
				;

	/** 1. Create The SVG Space*/
	var svg = d3.select("#theSVGcontainer")
				.append("svg")
				.attr("id","theSVGstyle");
	
	/**
	 * Beta 1
	
	var path = svg.append("svg:g")
	.selectAll("path")
	.data(force.links())
	.enter().append("svg:path")
	.attr("class", function(d) { return "link " + d.color; });
	
	 * */
	
	svg.append("defs")
		.selectAll("marker")
		//		.data([ "suit", "licensing", "resolved" ])
		//		.data([ "to", "from", "dashTo" ])	
		.data([ "green", "blue", "dashTo" ])	
		.enter()
		// 1. Arrow 
		.append("marker")
		.attr("id", function(d) {return d;})
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", 100)
		.attr("refY", 0)
		.attr("markerWidth", 7)
		.attr("markerHeight", 7)
		.attr("orient", "auto")
		// 2. Connecting Lines
		.append("path")
		.attr("d", "M0,-5L10,0L0,5");
	
	
	// Graph Path For The Linking Arrows
	var path = svg.append("g")
					.selectAll("path")
					.data(force.links())
					.enter()
					.append("path")
					.attr("class", function(d) {
							return "link " + d.color;
					})
					.attr("marker-end", function(d) {
							return "url(#" + d.color + ")";
					});

	
	var Rectangle = svg.append("g")
						.selectAll("rect")
						.data(force.nodes())
						.enter()
						.append("rect")
						.attr("width", 120)
						.attr("height", 20)
						.attr("x", -50)
						.attr("y", -15)
						.attr("id", function(d) {
							
							// Stop Moving For Each Node
							setTimeout(function() {
								d.fixed = true;
							}, 1800);
							
							// Temporary: Remove All The Space
							// Will Be Real Table ID Such As 123456
							return  d.nodeName.replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
						
						})	
						
						// Can Be Dragged
						.call(
							
							force
							.drag()
							.on("dragstart", stopMoving)
							
						)
						
						;
	
	function stopMoving(d) {
		d.fixed = true;
		  
	}

	// Graph Path For The Text
	var text = svg.append("g")
					.selectAll("text")
					.data(force.nodes())
					.enter()
					.append("text")
					
					// Position 
					.attr("x", 7)
					.attr("y", -4)
					
					// Align Center
					.attr("text-anchor", "middle")
					.attr("alignment-baseline", "middle")
					
					.text(function(d) {
							return d.nodeName;
					});

	function tick() {
		
		Rectangle.attr("transform", transform);
		text.attr("transform", transform);
		
		path.attr("d", linkArc);
		
		/*** Beta 2
		
		path.attr("d", function(d) {
			    var dx = d.target.x - d.source.x,
			        dy = d.target.y - d.source.y,
			        dr = 0,
			        
			        theta = Math.atan2(dy, dx) + Math.PI / 400,		// 400 for left and right
			        d90 = Math.PI / 2,
			        dtxs = (d.target.x - 0 ) - 70 * Math.cos(theta), // 70 for starting position
			        dtys = (d.target.y - 0 ) - 70 * Math.sin(theta);
			    
			    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0 1," + d.target.x + "," + d.target.y 
			    		+ "A" + dr + "," + dr + " 0 0 0," + d.source.x + "," + d.source.y 
			    		+ "M" + dtxs + "," + dtys +  "l" + ( (3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) - 0 ) + "," + ( (-3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) - 0 )
			    		+ "L" + ( (dtxs - 3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) - 0 ) + "," + ( (dtys + 3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) - 0 ) + "z";
			  });
		 
		 * */
		
	}

	function linkArc(d) {
		
		var dx = d.target.x - d.source.x, 
			dy = d.target.y - d.source.y, 
			dr = 0;   // Math.sqrt(dx * dx + dy * dy)
			
		d.fixed = true;
		
		return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
	}

	function transform(d) {
		return "translate(" + d.x + "," + d.y + ")";
	}
	
	$("rect").dblclick(function() {
		var data = $(this).attr("id");
		alert(data);
	});
	
	
	
	/****** When The Pag Is Done Loading ******/
	$(window).load(function() {
		
		/*** Listeners ***/
		$("rect").click(function() {
			
			/*** 1. Change The Background Color **/
			$("rect").attr("class","");
			
			$(this).attr("class", "selectedBackground");

			var theID = $(this).attr("id");
			
//		alert("#" + theID);
			
		});
		
		// 1. Set The Color Of The Root
		$("#" + rootName).css("fill", "#FAC090");
	
		/**AJAX Test ***/
		var data = new Date();
	
		$.ajax({
			url:"Data",
			type: 'get',
			dataType: 'json',
			jsonpCallback: 'json',
			data: {
				data: data + " v3",
			},
			
			success: function(json) {
				
				var jsonResult = jQuery.parseJSON(results);
				// do something
			},
			
			error: function(json){
				// do something
			}      
			
		});
	
	});
	
});

