
$(document).ready(function() {
	
	$("#theCanvas").drawLine({
		
		  strokeStyle: 'black',
		  strokeWidth: 1,
		  x1: 100, y1: 50,
		  x2: 100, y2: 150,
		  x3: 200, y3: 100,
		  x4: 150, y4: 200
	});
	
	
	
	
//	$("#myTriangleCanvas").drawLine({
//		
//		  strokeStyle: 'white',
//		  strokeWidth: 4,
//		  rotate: -2,
//		  
//		  x1: 200, y1: 0,
//		  x2: 200, y2: 150,
//		  x3: 150, y3: 0,
//		  x4: 150, y4: 200
//	});
	
	
	
	$('#myTriangleCanvas').drawPolygon({
		
		fillStyle: 'white',
		strokeStyle: 'white',
		strokeWidth: 2,
		rotate: -20,
//		concavity: 0.5,
		  
		sides: 3,
		
		
		radius: 80,
		x: 150, y: 80,
		
	});
    
    
});


