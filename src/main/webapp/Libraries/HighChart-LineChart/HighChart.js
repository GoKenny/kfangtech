

$(document).ready(function() {
	
        
	$('#container').highcharts({

		title: {
			text: 'Something Title',
			x: -20 //center
		},
            
		subtitle: {
			text: 'Something: Kfang.com',
			x: -20
      	},
            
      	xAxis: {
      		categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      	},
            
      	yAxis: {

	      	title: {
	      		text: 'Temperature (C)'},
	        
	      	plotLines: [{
	      		value: 0,
	      		width: 1,
	      		color: '#808080'}]
      	},
      	
      	
      	series: [
      	       
//       	        {	name: 'New York',
//       	        	data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]	}, 
       	  
            	{	name: 'Tokyo',
            		data: [7.0, 6.9, 9.5, null, null , null, null, null, 23.3, 18.3, 13.9, null],
            		connectNulls: true
            	}, 
       	        	
       	        {	name: 'Fredericton',
       	        	data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
       	        	color: 'purple'
                 }
       	        	
       	        ],
       	        
       	legend: {

           		layout: 'vertical',
           		align: 'right',
           		verticalAlign: 'middle',
           		borderWidth: 0
           	},
      	
            
            tooltip: {
                //valueSuffix: 'degree',
                shared: true,
                crosshairs: true
            },
      	
            
//            plotOptions: {
//                line: {
//                    dataLabels: {
//                        enabled: true
//                    },
//                    enableMouseTracking: false
//                }
//            },
            
      	
        });
	
	
	
	
	
	
    });
    
