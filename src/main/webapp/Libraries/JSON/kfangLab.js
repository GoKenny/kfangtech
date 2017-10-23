
function checkIt() {
	
	var theObjects = {
			
		data1: "something",
		data2: 1234567,
		data3: {name: "Lebron James"},
		data4: [ {data: "apple" }, {data: "banana"}, {data: "orange" } ],
		sums: [{"_id":1,"sum":345.44},{"_id":2,"sum":85.25},{"_id":3,"sum":232.69},{"_id":4,"sum":211.92999999999998},{"_id":5,"sum":221.61000000000004},{"_id":6,"sum":349.93},{"_id":7,"sum":352.62},{"_id":8,"sum":343.57},{"_id":9,"sum":429.38},{"_id":10,"sum":521.1700000000001},{"_id":11,"sum":407.01},{"_id":12,"sum":433.06}]
	
	};
	
	/***** Test Combining 2 JSON Objects ***/
	var object1 = {
			data1 : "data1",
	};
	
	var object2 = {
			data1 : "New Data 1",
			data2 : "data2",
	};
	
	$.extend(object1,object2);
	
	alert(
			
//			theObjects.sums[0].sum
			object1.data1
			
	);

}




