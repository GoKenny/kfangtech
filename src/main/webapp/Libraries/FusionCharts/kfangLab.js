
$(document).ready(function() {
	

	FusionCharts.ready(function(){
		
	      var revenueChart = new FusionCharts({
	    	  
	    	// bar2d, 
	        "type": "column2d",   
	        
	        "renderAt": "chartContainer",
	        "width": "500",
	        "height": "300",
	        "dataFormat": "json",
	        
	        "dataSource": {
	        	
	          "chart": {
	              "caption": "Kfang Labs",
	              "subCaption": "Monthly Sales for Kenny",
	              "xAxisName": "Month",
	              "yAxisName": "Revenues (In USD)",
	              "theme": "fint"
	           },
	           
	          "data": [
	              {
	                 "label": "Jan",
	                 "value": "420000"
	              },
	              
	              {
	                 "label": "Feb",
	                 "value": "810000"
	              },
	              
	              {
	                 "label": "Mar",
	                 "value": "720000"
	              }
	           ]
	           
	           
	           
	        }
	    });

	    revenueChart.render();
	});
    
    
});


