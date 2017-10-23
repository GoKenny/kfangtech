
//https://developers.google.com/chart/interactive/docs/gallery/linechart


// 1. Configure Which Google Chart To Use
google.load("visualization", "1", {
	packages : [ "corechart" ]
});

// 2. Run The Google Chart
google.setOnLoadCallback(drawKennyChart);



function drawKennyChart() {
	
	// 1. Define option
	var option = {
			title : "Kenny's Lab",
			width : 800,
			height : 400,
			animation : {
				duration : 1000,
				startup: true,
				easing: "inAndOut"
			},
			crosshair: {
				trigger: "both",
				orientation: "vertical"
			},
			vAxis : {
				minValue : 200,
				maxValue : 250
			}
	};
	
	// 2.setup empty chart
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'N');
	data.addColumn('number', 'Testing');
	data.addRow([ '2003', 210]);
	data.addRow([ '2004', 200 ]);
	
	var chart = new google.visualization.LineChart(document.getElementById('KennyDiv'));
	chart.draw(data, option);
	
	// 3. Create and draw the visualization.
	data.addRow([ '2009', 230 ]);
	chart.draw(data, option);
	
	data.addRow([ '2010', 200 ]);
	chart.draw(data, option);
	
	data.addRow([ '2010', 210 ]);
	chart.draw(data, option);
	data.addRow([ '2010', 230 ]);
	chart.draw(data, option);
	data.addRow([ '2010', 240 ]);
	chart.draw(data, option);
	
	// 4. Some Animation After a few Seconds
//	setTimeout(function() {
//		data.addRow([ '2011', 250 ]);
//		chart.draw(data, option);
//	}, 500);
//	
//	setTimeout(function() {
//		data.addRow([ '2012', 240 ]);
//		chart.draw(data, option);
//	}, 1000);
	
}







//google.load("visualization", "1", {packages:["corechart"]});
//google.setOnLoadCallback(drawChart);
//
// var options = {
//    title: 'Kenny Company Performance',
//    animation:{
//        duration: 1000000,
//    }
//};
// 
// 
//// var options = {
////	      width: 400,
////	      height: 240,
////	      animation: {
////	        duration: 1000,
////	        easing: 'in'
////	      }
//// };
// 
// 
//function drawChart() {
//	
//       var data = google.visualization.arrayToDataTable([
//         ['Year', 'Something', 'Testing'],
//         ['2004',  1000,      400,],
//         ['2005',  1170,      460],
//         ['2006',  660,       1120],
//         ['2007',  1030,      540]
//       ]);
//       
//       data.addRow(['10000', 1230, 1000]);
//       
//
//
//       var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
//       
//       chart.draw(data, options);
//       
//
//     }

