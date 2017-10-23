/**
	API Options Reference
		http://api.highcharts.com/highcharts
*/

$(document).ready(function() {
	
	$('#container').highcharts({
		
		yAxis: {
	    	 /********************** 1. Data Range ************************/
	    	 min: -1,
	    	 max: 1,
	    	 minorTickPosition: 'outside',
	    	 tickPosition: 'outside',
	    	 labels: {
	        	rotation: 'auto',
	        	distance: 15
	    	 },
	    	 
	    	 tickmarkPlacement: 'on',
	    	 
	    	 //Optional: customize intervals
//	    	 tickInterval : 0.5,
//	    	 minorTickInterval: 0.5,
	    	 
//	    	 tickInterval: 5,
	        
	        /********************** 2. PlotBands Colors************************/
	        plotBands: [
	                    
	           {
	           	from: -1,
	          	to: -0.4,
	          	color: 'red',
	           	innerRadius: '100%',
	           	outerRadius: '105%'
	          },
	          
	          {
	          	from: -0.4,
	          	to: 0.4,
	          	color: 'orange',
	           	innerRadius: '100%',
	           	outerRadius: '105%'
	          },
	          
	          {
	        	from: 0.4,
	        	to: 1,
	        	color: 'green',
	        	innerRadius: '100%',
	        	outerRadius: '105%'
	          },
	        
	        ],
	        pane: 0,
	        title: {
	        	text: '<span style="font-size:9px">Sentiment</span><br><strong style="">Dominic Cardy</strong>',
	        	y: -40
	        }
	    },
		
		// Optional:  hide the www.highchart.com
		credits: {
			enabled: false,
			text: 'something',
			href: 'http://www.google.ca'
		},
		
		// Optional:  hide the download buttons
		exporting: {
			enabled: false,
			
		},
		
		
	    chart: {
	        type: 'gauge',
	        plotBorderWidth: 1,
	        plotBackgroundColor: {
	        	linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
	        	stops: [
//	        		[0, '#FFF4C6'],
//	        		[0.3, '#FFFFFF'],
//	        		[1, '#FFF4C6']
	        	]
	        },
	        plotBackgroundImage: null,
	        height: 200
	    },
	    
	    title: {
	        text: 'Sentiment'
	    },
	    
	    pane: 
	       {
	        startAngle: -45, endAngle: 45,
	        background: null,
	        center: ['50%', '155%'],
	        size: 310
	       }
	    ,	    		        
	
	    
	    plotOptions: {
	    	
	    	gauge: {
	    		dataLabels: {
	    			enabled: true
	    		},
	    		dial: {
	    			backgroundColor: 'black',
	    			baseLength: '70%',
	    			radius: '100%',
	    			baseWidth: '5',
	    			borderWidth: '1',
	    			borderColor: 'silver',
	    				
	    		}
	    	},
	    	
	    },
	    	
	    series: [
	    
	      {
	        data: [-1],
	        yAxis: 0
	      }
	    
	    ]
	
	},
	
	// Let the music play
	function(chart) {
		
		/************************Update The Gauge Every 500 milliseconds***********************/
	    setInterval(function() {
	    	
	    	// 1. generate random number
	        var left = chart.series[0].points[0];
	        var inc = (Math.random() - 0.5) * 3;
	        var leftVal =  left.y + inc;
	        
	        if (leftVal < -1 || leftVal > 1) 
	            leftVal = left.y - inc;
	        
	        // 2. update the data
	        left.update( leftVal , false);
	        chart.redraw();
	
	    },  500);
	}
	
	
	);
	
	
	
	/************************Link In New Tab***********************/
	$('.tweetAuthorRow').dblclick(function() {
		var url = $(this).find(".hiddenURL").html();
//		window.open(url);
		
//		window.open(url,'_self',false);
		location.href = url;
	});
    
});


