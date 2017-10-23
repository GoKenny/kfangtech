/*
 * Handling the job for retrieving data from servlet
 * and send the data to draw Trend and Pie chart library.
 * 
 * Author: Shan Huang
 * Last update by Hamed Minaee: 2013/07/20
 */

/* Servlet name for the trend charts */
nameOfServlet = "chartData", 
nameOfServletforsort = "SortedInfo",
nameOfServletfortopicsort = "TopicSortedInfo",
frequencyServlet = "FrequencyServlet",
measureServlet= "Measuement",
nameOfTrendDiv = "trend_chart", 
nameOfPieDiv = "pie_chart";
var lineColors = new Array();
var topCloud=5;
var chartTypes = new Array("Frequency", "Tone", "Sentiment", "Intensity",
"Quality","Mood");
var sType;var tRange;var enIDs;var tpIDs;
var r;
var w;
var h;
// Chart legend names
//Four bar colors for the entity scores
var enScoreBarColors = new Array("#61b1ba", "#88d3e9", "#3c9dcd", "#a3cdd3");
// Four bar colors for the topic scores
var tpScoreBarColors = new Array("#61b1ba", "#88d3e9", "#3c9dcd", "#a3cdd3");
// Four score labels
var labels = new Array("Sentiment", "Intensity", "Quality", "Tone");

function loadCharts(sTyp, tRang, enID, tpID) {
	//console.log(enIDs);
	if(sType ===chartTypes[5])
		{
		
		sType=sTyp;
		tRange=tRang;
		enIDs=enID;
		tpIDs=tpID;
		h = $("#charts_wrapper").height();
		$("#charts_wrapper").empty();
		
		//$("#chart_main").height(h);
		$("#charts_wrapper").html("<div id='trend_chart1' style='width:50%;height:50%;float:left;'></div>" +
				"<div id='trend_chart2' style='width:50%;height:50%;float:left;'></div>" +
				"<div id='trend_chart3' style='width:50%;height:50%;float:left;'></div>" +
				"<div id='trend_chart4' style='width:50%;height:50%;float:left;'></div>");
		
		//$("#" + nameOfTrendDiv).empty();
		//$("#" + nameOfPieDiv).empty();
		var tester = enIDs.split(",");
		if( tester.length <2 )
		{
				$.get(getServletURL(), {
					categ:"TBN",
					type : sType,
					timeRange : tRange,
					entities : enIDs,
					topics : tpIDs
				}, function(results) {
					
					jsresult = jQuery.parseJSON(results);
				
					var r1 = Raphael("trend_chart1", w, h);
						r1.gridDrawn = false;
						var h1 = $("#trend_chart1").height();
						var w1 = $("#trend_chart1").width();
						var sureness=jsresult.sure.split(" ");
						var kindness=jsresult.kind.split(" ");
						var calmness=jsresult.calm.split(" ");
						var happiness=jsresult.happy.split(" ");
						var date=jsresult.date.split(" ");
						
						var democratsure=jsresult.democratsure.split(" ");
						var democratkind=jsresult.democratkind.split(" ");
						var democratcalm=jsresult.democratcalm.split(" ");
						var democrathappy=jsresult.democratsure.split(" ");
						
						var republicsure=jsresult.republicsure.split(" ");
						var republickind=jsresult.republickind.split(" ");
						var republiccalm=jsresult.republiccalm.split(" ");
						var republichappy=jsresult.republichappy.split(" ");
						
						
					var r2 = Raphael("trend_chart2", w, h);
						r2.gridDrawn = false;
						var h2 = $("#trend_chart2").height();
						var w2 = $("#trend_chart2").width();
					var r3 = Raphael("trend_chart3", w, h);
						r3.gridDrawn = false;
						var h3 = $("#trend_chart3").height();
						var w3 = $("#trend_chart3").width();
					var r4 = Raphael("trend_chart4", w, h);
						r4.gridDrawn = false;
						var h4 = $("#trend_chart4").height();
						var w4 = $("#trend_chart4").width();
						//var dat1=[0.5349, 0.4961, 0, 0.1627, 0.0852, 0.0775, 0.0697, 0.7674, 0.5426, 0.6279, 0.7054, 0.4728, 0.9767, 0.5659, 0.9845, ""];	
					//var dat=[0.5349, 0.4961333333333333, 0, 7.162766666666666, 1.0852666666666666, 1.0775, 17.069766666666666, 9.767433333333333, 20.542633333333335, 16.6279, 17.7054, 18.472866666666665, 20.976766666666666, 16.5659, 19.9845, ""];	
				//	var ti=["2013/11/01", "2013/11/02", "2013/11/03", "2013/11/03", "2013/11/04", "2013/11/05", "2013/11/06", "2013/11/07", "2013/11/08", "2013/11/09", "2013/11/10", "2013/11/11", "2013/11/12", "2013/11/13", "2013/11/14"];
					var le1=["Sureness"] ;
					var le2=["Kindness"] ;
					var le3=["Calmness"] ;
					var le4=["Happiness"] ;
					
					var colo=["#CC0000", "#BFBFBF", "#757575", "#191970", "#F29419", "#604016"];
					console.log("tester is: "+tester[0]);
					if(tester.length=1 && tester[0] != "")
					{
						/*for(var i=0;i<tester.length;i++)
						{
							tester[i]=tester[i].replace('entity', '');
						
						}*/
						le1[0]=$("#" + tester[0]).find(".entity_titlebar_title").text();
						le2[0]=$("#" + tester[0]).find(".entity_titlebar_title").text();
						le3[0]=$("#" + tester[0]).find(".entity_titlebar_title").text();
						le4[0]=$("#" + tester[0]).find(".entity_titlebar_title").text();
					}
					/*for(var i=0;i<2;i++)
						{*/
					var colo1=["#CC0000"];
							drawTrend(r1, w1, h1,0.7, sureness, date, le1, 0, colo1);
							//drawTrend(r1, w1, h1,1.001, democratsure, date, le1, 1, colo);
							//drawTrend(r1, w1, h1,1.001, republicsure, date, le1, 2, colo);
						//}
					
							var colo2=["#00FF00"];
					
					drawTrend(r2, w2, h2, 0.7, kindness, date, le2, 0, colo2);
					//drawTrend(r2, w2, h2, 1.001, democratkind, date, le2, 1, colo);
					//drawTrend(r2, w2, h2, 1.001, republickind, date, le2, 2, colo);
					
					
					
					var colo3=["#FF6600"];
					drawTrend(r3, w3, h3,0.7, calmness, date, le3, 0, colo3);
					//drawTrend(r3, w3, h3,1.001, democratcalm, date, le3, 1, colo);
					//drawTrend(r3, w3, h3,1.001, republiccalm, date, le3, 2, colo);
					
					
					var colo4=["#191970"];
					drawTrend(r4, w4, h4,0.7, happiness,date, le4, 0, colo4);
					//drawTrend(r4, w4, h4,0.5228, democrathappy,date, le4, 1, colo);
					//drawTrend(r4, w4, h4,0.5228, republichappy,date, le4, 2, colo);
					
					/*$("#trend_chart1").click(function(){
						
						
						$.boxer($('<div  class="inline_content"><div id="trend_charttest" style="width:100%;float:left;height:100%;"></div></div>'));
						var hh = $("#trend_charttest").height();
						var ww = $("#trend_charttest").width();
						var rtest = Raphael("trend_charttest", ww, hh);
						rtest.gridDrawn = false;
						drawTrend(rtest, ww, hh,0.7, happiness,date, le4, 0, colo4);
					});
					*/
			
					
					
					
					
				});

				
				}
		else
			{

			$.get(getServletURL(), {
				categ:"TBN",
				type : sType,
				timeRange : tRange,
				entities : enIDs,
				topics : tpIDs
			}, function(results) {
				
				jsresult = jQuery.parseJSON(results);
				
				
				var numOfLines = 0, allDatasure = new Array();
				allDatacalm = new Array();
				allDatahappy = new Array();
				allDatakind = new Array();
				var legends = new Array();
				var date=jsresult.date.split(" ");
				var entityIDs = enIDs.split(",");
				numOfLines = entityIDs.length;
						for ( var i = 0; i < numOfLines; i++)
							legends.push($("#" + entityIDs[i]).find(
									".entity_titlebar_title").text());
					
					
					// Default RGB
					var myRGB = [ '#CC0000', '#339900', '#0066CC' ];
	
					// Color scheme for lines and sectors
					
					// Use default predefined RGB
					if (numOfLines <= 3)
					{
					lineColors = myRGB;
					}
				else {// Generate array of HSL colors based on number of lines
					var hueDivs = Math.floor(360 / numOfLines);
					for ( var i = 0; i < numOfLines; i++)
						lineColors.push(hsl2RGB(hueDivs * i, 100, 40));
					
				}
				lineColors[3]="#191970";//since there were confliction in the color of two lines I changed one of them to this color
				lineColors[4]="#F29419";//since there were confliction in the color of two lines I changed one of them to this color
				lineColors[5]="#604016";//since there were confliction in the color of two lines I changed one of them to this color
				// Variables use for single line
				var  xLabel= (jsresult.date).split(" ");
				for(var i=0;i<entityIDs.length;i++)
				{
					allDatacalm[i]=(jsresult.calm[entityIDs[i].replace("entity",'')]).split(" ");
					allDatahappy[i]=(jsresult.happy[entityIDs[i].replace("entity",'')]).split(" ");
					allDatakind[i]=(jsresult.kind[entityIDs[i].replace("entity",'')]).split(" ");
					allDatasure[i]=(jsresult.sure[entityIDs[i].replace("entity",'')]).split(" ");
				}
				
				lineColors[numOfLines]="#BFBFBF";
				lineColors[numOfLines+1]="#757575";
				var r1 = Raphael("trend_chart1", w, h);
				r1.gridDrawn = false;
				var h1 = $("#trend_chart1").height();
				var w1 = $("#trend_chart1").width();
				
				var r2 = Raphael("trend_chart2", w, h);
				r2.gridDrawn = false;
				var h2 = $("#trend_chart2").height();
				var w2 = $("#trend_chart2").width();
				
				var r2 = Raphael("trend_chart2", w, h);
				r2.gridDrawn = false;
				var h2 = $("#trend_chart2").height();
				var w2 = $("#trend_chart2").width();
				
				var r3 = Raphael("trend_chart3", w, h);
				r3.gridDrawn = false;
				var h3 = $("#trend_chart3").height();
				var w3 = $("#trend_chart3").width();
				
				var r4 = Raphael("trend_chart4", w, h);
				r4.gridDrawn = false;
				var h4 = $("#trend_chart4").height();
				var w4 = $("#trend_chart4").width();
				var legends = new Array();
				//var democratsure=jsresult.democratsure.split(" ");
				//var democratkind=jsresult.democratkind.split(" ");
				//var democratcalm=jsresult.democratcalm.split(" ");
				//var democrathappy=jsresult.democratsure.split(" ");
				
				//var republicsure=jsresult.republicsure.split(" ");
				//var republickind=jsresult.republickind.split(" ");
				//var republiccalm=jsresult.republiccalm.split(" ");
				//var republichappy=jsresult.republichappy.split(" ");
						
						for ( var i = 0; i < numOfLines; i++)
							legends.push($("#" + entityIDs[i]).find(
									".entity_titlebar_title").text());
						
						//legends.push("Democrat");
						//legends.push("Republican");
				for ( var i = 0; i < numOfLines; i++) {
					
					drawTrend(r1, w1, h1, 1, allDatasure[i], date, legends, i, lineColors);
					drawTrend(r2, w2, h2, 1, allDatahappy[i], date, legends, i, lineColors);
					drawTrend(r3, w3, h3, 1, allDatakind[i], date, legends, i, lineColors);
					drawTrend(r4, w4, h4, 1, allDatacalm[i], date, legends, i, lineColors);
				}	
				//drawTrend(r1, w1, h1, 1, democratsure, date, legends, numOfLines, lineColors);
				//drawTrend(r1, w1, h1, 1, republicsure, date, legends, numOfLines+1, lineColors);
				
				//drawTrend(r2, w2, h2, 1, democratsure, date, legends, numOfLines, lineColors);
				//drawTrend(r2, w2, h2, 1, republicsure, date, legends, numOfLines+1, lineColors);
				
				//drawTrend(r3, w3, h3, 1, democratsure, date, legends, numOfLines, lineColors);
				//drawTrend(r3, w3, h3, 1, republicsure, date, legends, numOfLines+1, lineColors);
				
				//drawTrend(r4, w4, h4, 1, democratsure, date, legends, numOfLines, lineColors);
				//drawTrend(r4, w4, h4, 1, republicsure, date, legends, numOfLines+1, lineColors);
				
				
				
				
			});
			
			
			}
		}
	else{
		
		$("#charts_wrapper").empty();
		$("#charts_wrapper").html("<div id='word_cloud'></div><div id='trend_chart'></div><div id='pie_chart'></div>");

	
		
	sType=sTyp;
	tRange=tRang;
	enIDs=enID;
	tpIDs=tpID;
	/**
	 * DEBUG
	 */
	if (false) {
		var msg = "[DEBUG] ";
		msg += "\n sType = " + sType;
		msg += "\n tRange = " + tRange;
		msg += "\n enIDs = " + enIDs;
		msg += "\n tpIDs = " + tpIDs;
		msg += "\n Entities size = " + enIDs.split(",").length;
		msg += "\n Topics size = " + tpIDs.split(",").length;
		msg += "\n No selection on Entities = " + (enIDs == "");
		msg += "\n No selection on Topics = " + (tpIDs == "");
		alert(msg);
	}
	
	$( "body" ).data( "time", tRange );
	$( "body" ).data( "entity", enID );
	//console.log(enIDs);
	// Clean content of the Div first
	$("#" + nameOfTrendDiv).empty();
	$("#" + nameOfPieDiv).empty();

	// Chart types name


	// Calculate the maximum width availble for Trend chart
	var wrapperTotalWidth = $("#charts_wrapper").width();
	wordCloudWidth = $("#word_cloud").width(), pieChartWidth = $("#pie_chart")
			.width();
	var maxWidth = wrapperTotalWidth - wordCloudWidth - pieChartWidth;
	maxWidth -= 5; // Just give pie chart a bit more space
	h = $("#charts_wrapper").height();
	 w = maxWidth;
	// h = $("#charts_wrapper").height();
	 //alert("h "+h+" w "+w);
	 r = Raphael(nameOfTrendDiv, w, h);
	
	r.gridDrawn = false;
	
	// Send request to the servlet measuement.java and recieve the result
	// back. Here we are going to get information for scales from database 
	//loadScores(tRange);
	
	//loadEnt();
	//loadTop();
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	
/*	$.get(getServletURLforSort(), {
		timeRange : tRange
	}, function(results) {
		
		jsresult = jQuery.parseJSON(results);
		//console.log(jsresult);
		var temp=0;
		
		for (var entity in jsresult){
			
			$("#entityTitle"+temp).next("div").attr("id",jsresult[temp].id);
			
			
			$( "#entityTitle"+temp ).parent().parent().parent().attr("id","entity"+jsresult[temp].id);
			$("#entityTitle"+temp).text(jsresult[temp].name);
			$("#"+jsresult[temp].id).text(jsresult[temp].freq);
			$("#en_logo" + jsresult[temp].id).empty();
			$("#en_logo" + jsresult[temp].id).append("<img src='images/entities/"+ jsresult[temp].id +"'></img>");
			$("[title='en_bars"+temp+"']").empty();
			$("[title='en_bars"+temp+"']").append("<div class='en_bar"+ jsresult[temp].id+"_1'></div>" );
			$("[title='en_bars"+temp+"']").append("<div class='en_bar"+ jsresult[temp].id+"_2'></div>" );
			$("[title='en_bars"+temp+"']").append("<div class='en_bar"+ jsresult[temp].id+"_3'></div>" );
			$("[title='en_bars"+temp+"']").append("<div class='en_bar"+ jsresult[temp].id+"_4'></div>" );
			$("#entcon"+temp).children("div").eq(1).children("div").attr("class","en_bars"+jsresult[temp].id+"_1 jqbar horizontal");
			$("#entcon"+temp).children("div").eq(1).children("div").attr("class","en_bars"+jsresult[temp].id+"_2 jqbar horizontal");
			$("#entcon"+temp).children("div").eq(1).children("div").attr("class","en_bars"+jsresult[temp].id+"_3 jqbar horizontal");
			$("#entcon"+temp).children("div").eq(1).children("div").attr("class","en_bars"+jsresult[temp].id+"_4 jqbar horizontal");
		
			
			$("#en_bars").next("div").attr("id","en_bar"+jsresult[temp].id+"_1");
			$("#en_bars").next("div").next("div").attr("id","en_bar"+jsresult[temp].id+"_2");
			$("#en_bars").next("div").next("div").next("div").attr("id","en_bar"+jsresult[temp].id+"_3");
			$("#en_bars").next("div").next("div").next("div").next("div").attr("id","en_bar"+jsresult[temp].id+"_4");
			
			
			$("#en_bars").next("div").attr("class","en_bars"+jsresult[temp].id+"_1 jqbar horizontal");
			$("#en_bars").next("div").next("div").attr("class","en_bars"+jsresult[temp].id+"_2 jqbar horizontal");
			$("#en_bars").next("div").next("div").next("div").attr("class","en_bars"+jsresult[temp].id+"_3 jqbar horizontal");
			$("#en_bars").next("div").next("div").next("div").next("div").attr("class","en_bars"+jsresult[temp].id+"_4 jqbar horizontal");
		
			
			$("[title='en_bars"+temp+"']").children("div").attr("class","en_bars"+jsresult[temp].id+"_1 jqbar horizontal");
			$("[title='en_bars"+temp+"']").children("div").next("div").attr("class","en_bars"+jsresult[temp].id+"_2 jqbar horizontal");
			$("[title='en_bars"+temp+"']").children("div").next("div").next("div").attr("class","en_bars"+jsresult[temp].id+"_3 jqbar horizontal");
			$("[title='en_bars"+temp+"']").children("div").next("div").next("div").next("div").attr("class","en_bars"+jsresult[temp].id+"_4 jqbar horizontal");
			console.log($("[title='en_bars"+temp+"']").children("div").next("div").next("div").next("div").attr("class"));
			
			temp++;
			
		}

		

		
	});
/////////////////////////////////////////////////////////////////////////
	$.get(getServletURLforTopicSort(), {
		timeRange : tRange
	}, function(results) {

		jsresult = jQuery.parseJSON(results);
		
		var j=0;
		var k=0;
        var temp=0;
		
		for (var topic in jsresult){
			
			$("#topicTitle"+temp).next("div").attr("id",jsresult[temp].id+1000);
			
			
			$( "#topicTitle"+temp ).parent().parent().parent().attr("id","topic"+jsresult[temp].id);
			$("#topicTitle"+temp).text(jsresult[temp].name);
			$("#"+(jsresult[temp].id+1000)).text(jsresult[temp].freq);
			
			$("#topBar"+temp).children("div").attr("class","tpc_bar"+jsresult[temp].id+"_1 jqbar horizontal");
			$("#topBar"+temp).children("div").next("div").attr("class","tpc_bar"+jsresult[temp].id+"_2 jqbar horizontal");
			$("#topBar"+temp).children("div").next("div").next("div").attr("class","tpc_bar"+jsresult[temp].id+"_3 jqbar horizontal");
			$("#topBar"+temp).children("div").next("div").next("div").next("div").attr("class","tpc_bar"+jsresult[temp].id+"_4 jqbar horizontal");
			$("#tpc_bar").next("div").attr("id","tpc_bar"+jsresult[temp].id+"_1");
			$("#tpc_bar").next("div").next("div").attr("id","tpc_bar"+jsresult[temp].id+"_2");
			$("#tpc_bar").next("div").next("div").next("div").attr("id","tpc_bar"+jsresult[temp].id+"_3");
			$("#tpc_bar").next("div").next("div").next("div").next("div").attr("id","tpc_bar"+jsresult[temp].id+"_4");
			console.log("jsresult[temp].name "+jsresult[temp].name+ "jsresult[temp].id "+ jsresult[temp].id);
			temp++;
			
		}
		
		
		
		
		
		jQuery.each(jsresult.TopicFreq, function() {
			k=jsresult.TopicId[j];
			k=k+1000;
			
			$("#"+k).text(jsresult.TopicFreq[j]);
			
			j +=1;
		});


		

		
	});
	
	
	///////////////////////////////////////////////////////////////////////////////////
	
	$.get(getServletURL3(), {
		timeRange : tRange
	}, function(results) {
		var i=1;
		
		jsonresult = jQuery.parseJSON(results);
		
		// For each entity
		var entityScoreScales=new Array();
		 for (var entity in jsonresult.EntityMeasurs){
		
			entityScoreScales[0]=jsonresult.EntityMeasurs[entity].Sentiment;
			entityScoreScales[1]=jsonresult.EntityMeasurs[entity].Intensity;
			entityScoreScales[2]=jsonresult.EntityMeasurs[entity].Quality;
			entityScoreScales[3]=jsonresult.EntityMeasurs[entity].Tone;
			
			
				for ( var score = 1; score <= 4; score++)
					
					 
					$('.en_bar' +entity + '_' + score).jqbar({
						label :   labels[(score - 1)],
						value : Math.floor(entityScoreScales[score-1]*100),//we should load this number from the database
						barColor : enScoreBarColors[(score - 1)],
						orientation : 'h',
						barWidth : 26,
						barLength : 100,
						top : 0
					});
			
				
		 }
		 
		 var topicScoreScales=new Array();
		 
		 for (var topic in jsonresult.TopicMeasurs){
				
			 topicScoreScales[0]=jsonresult.TopicMeasurs[topic].Sentiment;
			 topicScoreScales[1]=jsonresult.TopicMeasurs[topic].Intensity;
			 topicScoreScales[2]=jsonresult.TopicMeasurs[topic].Quality;
			 topicScoreScales[3]=jsonresult.TopicMeasurs[topic].Tone;
				
					for ( var score = 1; score <= 4; score++)
						
						 
						$('.tpc_bar' +topic + '_' + score).jqbar({
							label :   labels[(score - 1)],
							value : Math.floor(topicScoreScales[score-1]*100),//we should load this number from the database
							barColor : enScoreBarColors[(score - 1)],
							orientation : 'h',
							barWidth : 26,
							barLength : 100,
							top : 0
						});
				
					
			 }
				
				
				
		 

		
	});
	*/
	
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	// Send request to the servlet frequencyServlet.java and recieve the result
	// back, here we get the information for frequency and show it in appropriate label in index.jsp
	/*$.get(getServletURL2(), {
		timeRange : tRange
	}, function(results) {

		jsresult = jQuery.parseJSON(results);
		var i=1;
		jQuery.each(jsresult.EntityFreq, function() {

			$("#"+i).text(jsresult.EntityFreq[i]);
			i +=1;
		});
		var j=0;
		var k=0;
		jQuery.each(jsresult.TopicFreq, function() {
			k=jsresult.TopicId[j];
			k=k+1000;
			
			$("#"+k).text(jsresult.TopicFreq[j]);
			
			j +=1;
		});


		

		
	});
	
	*/
	
	
	
	
	loadEnt();
	chartloader();
	
	typerloader(enIDs);
	//alert(getServletURLfortyper());
	/*loadChart("Blog");*/

	/*
	 * Send request to the servlet chartData.java and receive result data back
	 */
	/*var tester = enIDs.split(",");
	
	if( tester.length <2 )
		{
				$.get(getServletURL(), {
					type : sType,
					timeRange : tRange,
					entities : enIDs,
					topics : tpIDs
				}, function(results) {
					
					jsresult = jQuery.parseJSON(results);
					//console.log(jsresult);
					console.log(tpIDs);
					
					var numOfLines = 0, allData = new Array();
					
					var legends = new Array();
		
					// Is all entities are selected?
					var allEn = enIDs.length == 0 ? true : false;
		
					// Split entity names into array
					var entityIDs = enIDs.split(",");
					if (sType == chartTypes[0] || sType == chartTypes[3]) {
					
					
					
					
						if (allEn) {
							numOfLines = 1;
							if (sType == chartTypes[0])
								legends.push(sType);
							else
								legends.push("Tone");
						} else {
							numOfLines = entityIDs.length;
							for ( var i = 0; i < numOfLines; i++)
								legends.push($("#" + entityIDs[i]).find(
										".entity_titlebar_title").text());
						}
						
						// Default RGB
						var myRGB = [ '#CC0000', '#339900', '#0066CC' ];
		
						// Color scheme for lines and sectors
						
						// Use default predefined RGB
						if (numOfLines <= 3)
						{
						lineColors = myRGB;
						}
					else {// Generate array of HSL colors based on number of lines
						var hueDivs = Math.floor(360 / numOfLines);
						for ( var i = 0; i < numOfLines; i++)
							lineColors.push(hsl2RGB(hueDivs * i, 100, 40));
						
					}
					lineColors[3]="#191970";//since there were confliction in the color of two lines I changed one of them to this color
					lineColors[4]="#F29419";//since there were confliction in the color of two lines I changed one of them to this color
					lineColors[5]="#604016";//since there were confliction in the color of two lines I changed one of them to this color
					// Variables use for single line
					var data = (jsresult.data).split(" ");
					var  xLabel= (jsresult.date).split(" ");
					console.log(data);
					//find max
					for(var i=0;i<data.length;i++)
						{
						data[i]=parseFloat(data[i]);
						}
					var max=data[0];
					for(var i=0;i<data.length;i++)
					{	
						if(data[i]>max)
							{
								max=data[i];
								
							}
					}
					
					//console.log(allData[0]);
					//console.log(allData[1]);
					//console.log(allData[2]);
					//console.log(allData);
					allData[0]=[64,92,113,47,24,93,112];
					allData[1]=[20,32,29,15,11,34,29];
					allData[2]=[0,0,0,0,0,0,1];
					
					//when all is 0 except 1 it does not show the whole circle
					allData[0]=[0,0,0,0,0,0,0];
					allData[1]=[2,0,1,0,1,2,0];
					allData[2]=[0,0,0,0,0,0,0];
					for ( var i = 0; i < numOfLines; i++) {
						
						drawTrend(r, w, h, max, data, xLabel, legends, i, lineColors);
					}
					if(sType==chartTypes[3] || sType==chartTypes[4] || sType==chartTypes[2])
						{
							allData[0]=(jsresult.low).split(" ");
							
							allData[1]=(jsresult.med).split(" ");
							allData[2]=(jsresult.high).split(" ");
							for(var n=0;n<allData[0].length;n++)
							{
								allData[0][n]=parseInt(allData[0][n]);
								allData[1][n]=parseInt(allData[1][n]);
								allData[2][n]=parseInt(allData[2][n]);
							}
							drawPie(nameOfPieDiv, sType, allData, legendLMH, 3,
									myRGB);
						
						
						}
					
				}
				});
		}
	else if( tester.length >=2)
		{
			
				$.get(getServletURL(), {
					type : sType,
					timeRange : tRange,
					entities : enIDs,
					topics : tpIDs
				}, function(results) {
					
					jsresult = jQuery.parseJSON(results);
					console.log(tpIDs);
					
					
					var numOfLines = 0, allData = new Array();
					
					var legends = new Array();
		
					
		
					// Split entity names into array
					var entityIDs = enIDs.split(",");
					if (sType == chartTypes[0] || sType == chartTypes[3]) {
					
					
					
					
						
							numOfLines = entityIDs.length;
							for ( var i = 0; i < numOfLines; i++)
								legends.push($("#" + entityIDs[i]).find(
										".entity_titlebar_title").text());
						
						
						// Default RGB
						var myRGB = [ '#CC0000', '#339900', '#0066CC' ];
		
						// Color scheme for lines and sectors
						
						// Use default predefined RGB
						if (numOfLines <= 3)
						{
						lineColors = myRGB;
						}
					else {// Generate array of HSL colors based on number of lines
						var hueDivs = Math.floor(360 / numOfLines);
						for ( var i = 0; i < numOfLines; i++)
							lineColors.push(hsl2RGB(hueDivs * i, 100, 40));
						
					}
					lineColors[3]="#191970";//since there were confliction in the color of two lines I changed one of them to this color
					lineColors[4]="#F29419";//since there were confliction in the color of two lines I changed one of them to this color
					lineColors[5]="#604016";//since there were confliction in the color of two lines I changed one of them to this color
					// Variables use for single line
					
					var  xLabel= (jsresult.date).split(" ");
					for(var i=0;i<entityIDs.length;i++)
						{
						allData[i]=(jsresult.data[entityIDs[i].replace("entity",'')]).split(" ");
						}
					console.log(allData[0]);
					console.log(allData[1]);
					for(var n=0;n<allData[0].length;n++)
					{
						allData[0][n]=parseInt(allData[0][n]);
						allData[1][n]=parseInt(allData[1][n]);
						allData[2][n]=parseInt(allData[2][n]);
					}
					//find max
					var max=jsresult.max;
					
					
					allData[0]=[64,92,113,47,24,93,112];
					allData[1]=[20,32,29,15,11,34,29];
					allData[2]=[0,0,0,0,0,0,1];
					for ( var i = 0; i < numOfLines; i++) {
						
						drawTrend(r, w, h, max, allData[i], xLabel, legends, i, lineColors);
					}
					drawPie(nameOfPieDiv, sType, allData, legendLMH, 3,
							myRGB);
				});
		
		}
	else{
	$.get(getServletURL(), {
		type : sType,
		timeRange : tRange,
		entities : enIDs,
		topics : tpIDs
	}, function(results) {
		var xLabel = new Array();
		
		var numOfLines = 0, allData = new Array();
		
		var legends = new Array();

		// Is all entities are selected?
		var allEn = enIDs.length == 0 ? true : false;

		// Split entity names into array
		var entityIDs = enIDs.split(",");

		// Frequency or Tone
		if (sType == chartTypes[0] || sType == chartTypes[1]) {
			if (allEn) {
				numOfLines = 1;
				if (sType == chartTypes[0])
					legends.push("Frequency");
				else
					legends.push("Tone");
			} else {
				numOfLines = entityIDs.length;
				for ( var i = 0; i < numOfLines; i++)
					legends.push($("#" + entityIDs[i]).find(
							".entity_titlebar_title").text());
			}
		}
		// Sentiment or Intensity or Quality
		if (sType == chartTypes[2] || sType == chartTypes[3]
				|| sType == chartTypes[4]) {
			numOfLines = entityIDs.length;
			// If all entity or one entity selected
			if (numOfLines == 1) {
				numOfLines = 3;
				if (sType == chartTypes[2])
					legends = legendNNP;
				else
					legends = legendLMH;
			} else {
				for ( var i = 0; i < numOfLines; i++)
					legends.push($("#" + entityIDs[i]).find(
							".entity_titlebar_title").text());
				
			}
		}

		for ( var i = 0; i < numOfLines; i++) {
			allData[i] = new Array();
		}

		// Parse received data
		var dataPoints = results.split("|");
		for ( var i = 0; i < dataPoints.length; i++) {
			var dataSet = dataPoints[i].split("=");

			xLabel.push(dataSet[0]);

			var dataArray = dataSet[1].split(",");

			for ( var l = 0; l < numOfLines; l++) {
				var value = parseFloat(dataArray[l]);
				value = Math.round(value * 10000) / 10000;
				allData[l].push(value);
				
			}
		}

		var max = 0;
		// Find the peak for overall data points
		for ( var i = 0; i < numOfLines; i++) {
			max = Math.max.apply(Math, allData[i]) > max ? Math.max.apply(Math,
					allData[i]) : max;
		}

		// Default RGB
		var myRGB = [ '#CC0000', '#339900', '#0066CC' ];

		// Color scheme for lines and sectors
		
		// Use default predefined RGB
		if (numOfLines <= 3)
			lineColors = myRGB;
		// Generate array of HSL colors based on number of lines
		else {
			var hueDivs = Math.floor(360 / numOfLines);
			for ( var i = 0; i < numOfLines; i++)
				lineColors.push(hsl2RGB(hueDivs * i, 100, 40));
			
		}
		lineColors[3]="#191970";//since there were confliction in the color of two lines I changed one of them to this color
		lineColors[4]="#F29419";//since there were confliction in the color of two lines I changed one of them to this color
		lineColors[5]="#604016";//since there were confliction in the color of two lines I changed one of them to this color
		
		
		// Variables use for single line
		var data = new Array();

		
		 * Draw charts
		 
		// For Frequency and Tone
		if (sType == chartTypes[0] || sType == chartTypes[1]) {
			for ( var i = 0; i < numOfLines; i++) {
				data = allData[i];
				// Draw Trend Chart
				drawTrend(r, w, h, max, data, xLabel, legends, i, lineColors);
			}
		}
		// For Sentiment, Intensity and Quality
		if (sType == chartTypes[2] || sType == chartTypes[3]
				|| sType == chartTypes[4]) {
			for ( var i = 0; i < numOfLines; i++) {
				data = allData[i];
				// Draw Trend Chart
				drawTrend(r, w, h, max, data, xLabel, legends, i, lineColors);
			}
		//	console.log("allData :"+allData[0]+"   "+allData[1]+"    "+ allData[2]);
			// Draw Pie Chart
			if (sType == chartTypes[2])
				drawPie(nameOfPieDiv, sType, allData, legendNNP, numOfLines,
						myRGB);
			else
				drawPie(nameOfPieDiv, sType, allData, legendLMH, numOfLines,
						myRGB);
		}
	});
	
	
		}
	
	*/
	
	
	
	
	
	$("#word_cloud").css( 'cursor', 'pointer' );
	//$("#word_cloud").style.cursor='pointer';
	// Send request to the servlet measuement.java and recieve the result
	// back, here we get the information for wordcloud 
	///***************************************************************************************************************************
	
	
	$.get(getServletURL3(), {
		timeRange : tRange
	}, function(results) {
		var key=new Array(200);
		var val=new Array(200);
		var entityIDs = enIDs.split(",");
		
		for(var i=0;i<entityIDs.length;i++)
			{
			entityIDs[i]=entityIDs[i].replace('entity', '');
			
			}
	//	console.log(entityIDs);
		key=[];
		val=[];

		var i=0;
		JsonCloud = jQuery.parseJSON(results);
		$('#word_cloud').empty();
		//when nothing is clicked
		if(enIDs.length ==0)
			{
				for(var cloud in JsonCloud.WordCloud)
					{
						for(var cloudInfo in JsonCloud.WordCloud[cloud])
							{
								
								key[i]=cloudInfo;
								
								val[i]=(JsonCloud.WordCloud[cloud][cloudInfo])*8;
								i++;
							}
							
							
							
							
						
					}
			}
		else //when at least one entity is clicked(enID length is at least 1)
			{
			var clickedEntityId=0;// id of the entity which is clicked
			var topCloudCounter=0;
				for(var id=0;id< entityIDs.length;id++)
				{
					
				
					
					clickedEntityId=parseInt(entityIDs[id]);
				//	console.log(id+"______________________"+enIDs+"_________________________________"+entityIDs);
					
					for(var cloud2 in JsonCloud.WordCloud[clickedEntityId])
						{
							if(topCloudCounter <5)
								{
								
									key[i]=entityIDs[id]+cloud2;
									
									val[i]=(JsonCloud.WordCloud[clickedEntityId][cloud2])*10;
									
									topCloudCounter++;
									i++;
								}
							else
							{
								
								topCloudCounter=0;
								break;
								
							}
							
						}
					
					
				}
			//	console.log(key);
		
			}
		

		
		var fill = d3.scale.category20();
	 
		/*var width = 200;*/
		var width = $("#word_cloud").width();
		var height = 230;
		

		d3.layout.cloud().size([ width, height ]).words(d3.zip(key, val).map(function(d) {
		      return {text: d[0], size: d[1]};
	 
				})).rotate(function() {
			return ~~(Math.random() * 2) * 30;
		}).font("Impact").fontSize(function(d) {
			return d.size;
		}).on("end", draw).start();
		var temp=0;
		function draw(words) {
			d3.select("#word_cloud").append("svg").attr("width", width).attr(
					"height", height).append("g").attr("transform",
					"translate(" + width / 2 + "," + (height / 2 + 10) + ")").selectAll(
					"text").data(words).enter().append("text").style("font-size",
					function(d) {
						return d.size + "px";
					}).style("font-family", "Impact").style("fill", function(d, i) {
						//console.log(enIDs.length);
						if(enIDs.length!=0)
							{			
										var firstAlph;
										firstAlph=(d.text).substring(0,1);
										//console.log(firstAlph);
										for(var tcounter=0; tcounter<entityIDs.length;tcounter++)
										{
											
											
											if(firstAlph ==entityIDs[tcounter])
												{
												temp=tcounter;
												//console.log(tcounter);
												break;
												}
											
										}
										 return d3.rgb(lineColors[temp]);//this will return the color of the word according to the color of line
						
							}
						else
							{
							
							return fill(i);
							
							}
						
		
						
				
			}).attr("text-anchor", "middle").attr("transform", function(d) {
				return "translate(" + [ d.x, d.y ] + ")rotate(" + d.rotate + ")";
			}).text(function(d) {
				
				if(enIDs.length!=0)
				{
					return (d.text).substring(1,(d.text).length);
				}
				else
					{
					
					 return d.text;
					
					}
			}).on("click", function(d) {
				var firstAl="#entityTitle"+(d.text).substring(0,1);
				//console.log(firstAl);
				
				if(enIDs.length!=0)
				{
					window.open("https://www.google.ca/#fp=44419e4db9eddb62&q="+$(firstAl).text()+"+"+(d.text).substring(1,(d.text).length));
				}
				else
					{
					
					window.open("https://www.google.ca/#fp=44419e4db9eddb62&q="+$(firstAl).text()+"+"+d.text);
					
					}
				
				
			  });
		}

		
		
	});
	
	
	
	
	
	///***************************************************************************************************************************
	$("svg").width("100%");
	
	}
}




// Small helper fucntion for calling drawLine for Trend chart
function drawTrend(r, w, h, m, d, xLabel, legends, nLine, colors) {
	/**
	 * DEBUG
	 */
	if (false) {
		var msg = "[DEBUG] ";
		msg += "\n r = " + r;
		msg += "\n w = " + w;
		msg += "\n h = " + h;
		msg += "\n max = " + m;
		msg += "\n data = " + d;
		msg += "\n xLabel = " + xLabel;
		msg += "\n legends = " + legends;
		msg += "\n nLine = " + nLine;
		msg += "\n colors = " + colors;
		alert(msg);
	}
	drawLine({
		lines : legends,
		data : d,
		xlabels : xLabel,
		max : m,
		holder : r,
		spewidth : w,
		speheight : h,
		showarea : false,
		mousecoords : 'circle',
		nodot : false,
		lpos : 'top',
		nLine : nLine,
		colors : colors
	});
}

// A helper function for converting HSL color to RGB
function hsl2RGB(h, s, l) {
	var m1, m2, hue;
	var r, g, b;
	s /= 100;
	l /= 100;
	if (s == 0)
		r = g = b = (l * 255);
	else {
		if (l <= 0.5)
			m2 = l * (s + 1);
		else
			m2 = l + s - l * s;
		m1 = l * 2 - m2;
		hue = h / 360;
		r = hue2RGB(m1, m2, hue + 1 / 3);
		g = hue2RGB(m1, m2, hue);
		b = hue2RGB(m1, m2, hue - 1 / 3);
	}
	return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b)
			+ ")";
}

// Together with hsl2RGB function
function hue2RGB(m1, m2, hue) {
	var v;
	if (hue < 0)
		hue += 1;
	else if (hue > 1)
		hue -= 1;
	if (6 * hue < 1)
		v = m1 + (m2 - m1) * hue * 6;
	else if (2 * hue < 1)
		v = m2;
	else if (3 * hue < 2)
		v = m1 + (m2 - m1) * (2 / 3 - hue) * 6;
	else
		v = m1;
	return 255 * v;
}

// Returns the URL of the servlet
function getServletURL() {
	var servletURL = getServerRoot() + "/" + nameOfServlet;
	return servletURL;
}


function getServletURLforSort() {
	var servletURL = getServerRoot() + "/" + nameOfServletforsort;
	return servletURL;
}

function getServletURLforTopicSort() {
	var servletURL = getServerRoot() + "/" + nameOfServletfortopicsort;
	return servletURL;
}
function getServletURL2() {
	var servletURL = getServerRoot() + "/" + frequencyServlet;
	return servletURL;
}

function getServletURL3() {
	var servletURL = getServerRoot() + "/" + measureServlet;
	return servletURL;
}

// Returns the URL of the server root
function getServerRoot() {
	var url = "http://" + window.location.host;
	var servletName = window.location.pathname.split("/")[1];
	url += "/" + servletName;
	return url;
}

function chartloader()
{
	if(tweet && blog && news)
		{
		
			loadChart("TBN");
		}
	else if(tweet && blog && !news)
		{
		loadChart("TB");
		}
	else if(tweet && !blog && news)
	{
		loadChart("TN");
	}
	else if(!tweet && blog && news)
	{
		loadChart("BN");
	}
	else if(tweet && !blog && !news)
	{
		loadChart("Tweet");
	}
	else if(!tweet && blog && !news)
	{
		loadChart("Blog");
	}
	else if(!tweet && !blog && news)
	{
		loadChart("News");
	}
	else if(!tweet && !blog && !news)
	{
		loadChart("NO");
	}

}

function loadChart(categ)
{
	//console.log(tRange);
	
	loadEnt();
	loadTop();
	$("#" + nameOfTrendDiv).empty();
	$("#" + nameOfPieDiv).empty();
	 $('#wait').removeAttr('style');
 	 
    var top = $("#chart_main").height()/2+ ($("#ss").height()) / 2;
    /* var left = $("#trend_chart").offset().left-69+69/2 + ($("#ss").width()) / 2;*/
      var left = $("#chart_main").width()/2+ ($("#ss").width()) / 2;
     
   
     $("#wait").css({
         height:"89px",
         width: "69px",
        position:"absolute",
        top:top+"px",
        left:left+"px"
     });
	 r = Raphael(nameOfTrendDiv, w, h);
		r.gridDrawn = false;
	var legendNNP = new Array("Negative", "Neutral", "Positive");
	var legendLMH = new Array("Low", "Medium", "High");
var tester = enIDs.split(",");
	
	if( tester.length <2 )
		{
				$.get(getServletURL(), {
					categ:categ,
					type : sType,
					timeRange : tRange,
					entities : enIDs,
					topics : tpIDs
				}, function(results) {
					
					jsresult = jQuery.parseJSON(results);
					//console.log(jsresult);
					//console.log(tpIDs);
					
					var numOfLines = 0;
					
					var legends = new Array();
		
					// Is all entities are selected?
					var allEn = enIDs.length == 0 ? true : false;
		
					// Split entity names into array
					var entityIDs = enIDs.split(",");
					/*if (sType == chartTypes[0] || sType == chartTypes[3]) {*/
					
					
					
					
						if (allEn) {
							numOfLines = 1;
							/*if (sType == chartTypes[0])*/
								legends.push(sType);
							/*else
								legends.push("Tone");*/
						} else {
							numOfLines = entityIDs.length;
							for ( var i = 0; i < numOfLines; i++)
								legends.push($("#" + entityIDs[i]).find(
										".entity_titlebar_title").text());
						}
						
						// Default RGB
						var myRGB = [ '#CC0000', '#339900', '#0066CC' ];
						//var piRGB = [ '#F5F507', '#339900', '#0066CC' ];
						var piRGB = [ '#FF9900', '#6599FF', '#AAF200' ];
						// Color scheme for lines and sectors
						
						// Use default predefined RGB
						if (numOfLines <= 3)
						{
						lineColors = myRGB;
						}
					else {// Generate array of HSL colors based on number of lines
						var hueDivs = Math.floor(360 / numOfLines);
						for ( var i = 0; i < numOfLines; i++)
							lineColors.push(hsl2RGB(hueDivs * i, 100, 40));
						
					}
					lineColors[3]="#191970";//since there were confliction in the color of two lines I changed one of them to this color
					lineColors[4]="#F29419";//since there were confliction in the color of two lines I changed one of them to this color
					lineColors[5]="#604016";//since there were confliction in the color of two lines I changed one of them to this color
					// Variables use for single line
					var data = (jsresult.data).split(" ");
					var  xLabel= (jsresult.date).split(" ");
					if(categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN" || categ=="Tweet"|| categ=="Blog" )
					{
						var democrat=(jsresult.democrat).split(" ");
						var repub=(jsresult.republic).split(" ");
					//	console.log(repub);
					}
					//console.log(data);
					//find max
					for(var i=0;i<data.length;i++)
						{
						
						/*repub[i]=parseFloat(repub[i]);
						democrat[i]=parseFloat(democrat[i]);*/
						repub[i]=Math.floor(parseFloat(repub[i])* 1000) / 1000;
						democrat[i]=Math.floor(parseFloat(democrat[i])* 1000) / 1000;
						data[i]=Math.floor(parseFloat(data[i])* 1000) / 1000;
						
						}
					var max=data[0];
					for(var i=0;i<data.length;i++)
					{	
						if(data[i]>max)
							{
								max=data[i];
								
							}
					}
					
					//console.log(allData[0]);
					//console.log(allData[1]);
					//console.log(allData[2]);
					//console.log(allData);
					/*allData[0]=[64,92,113,47,24,93,112];
					allData[1]=[20,32,29,15,11,34,29];
					allData[2]=[0,0,0,0,0,0,1];*/
					
					//when all is 0 except 1 it does not show the whole circle
					/*allData[0]=[0,0,0,0,0,0,0];
					allData[1]=[2,0,1,0,1,2,0];
					allData[2]=[0,0,0,0,0,0,0];*/
					if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN" || categ=="Tweet"|| categ=="Blog") && jsresult.party=="Both")
					{
						for(var i=0;i<democrat.length;i++)
						{	
							if(democrat[i]>max)
								{
									max=democrat[i];
									
								}
							if(repub[i]>max)
							{
								max=repub[i];
								
							}
							
						}
					legends.push("democrat");
					legends.push("Republican");
					}
					else if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet"|| categ=="Blog")&& jsresult.party=="Repub")
					{
						for(var i=0;i<repub.length;i++)
						{	
							
							if(repub[i]>max)
							{
								max=repub[i];
								//alert(repub[i]);
								
							}
							
						}
						legends.push("Republican");
					}
					else if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet"|| categ=="Blog") && jsresult.party=="Democ")
					{
						for(var i=0;i<democrat.length;i++)
						{	
							if(democrat[i]>max)
								{
									max=democrat[i];
									
								}
							
							
						}
						legends.push("democrat");
						
					}
					else if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet"|| categ=="Blog") && jsresult.party=="null")
					{
						/**/
						
					}
					
					lineColors[numOfLines]="#BFBFBF";
					lineColors[numOfLines+1]="#757575";
					/*data[2]=-10;*/
					for ( var i = 0; i < numOfLines; i++) {
						/*console.log("tets");
						console.log(data);*/
						drawTrend(r, w, h, max, data, xLabel, legends, i, lineColors);
						
					}
					if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet" || categ=="Blog") && jsresult.party=="Both")
					{
						
						drawTrend(r, w, h, max, democrat, xLabel, legends,numOfLines, lineColors);
						drawTrend(r, w, h, max, repub, xLabel, legends, numOfLines+1, lineColors);
						//console.log(repub);
						//console.log(xLabel);
						//console.log(legends);
						//console.log(lineColors);
						//console.log(max);
					}
					else if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet"|| categ=="Blog")&& jsresult.party=="Repub")
						{
						drawTrend(r, w, h, max, repub, xLabel, legends, i, lineColors);
						
						}
					else if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet"|| categ=="Blog") && jsresult.party=="Democ")
					{
						drawTrend(r, w, h, max, democrat, xLabel, legends, i, lineColors);
					
					}
					//alert($("text").find( "tspan" ).text("democrat").parent().prev().last("rect").attr("x"));
					//alert($("svg").last("rect").attr("fill"));
					//alert($("svg").next().last("rect").attr("fill"));
					if(sType==chartTypes[3] || sType==chartTypes[4] || sType==chartTypes[2])
						{
							$("#pie_chart").empty();
							var allData = new Array();
							allData[0]=(jsresult.low).split(" ");
							
							allData[1]=(jsresult.med).split(" ");
							allData[2]=(jsresult.high).split(" ");
							for(var n=0;n<allData[0].length;n++)
							{
								allData[0][n]=parseInt(allData[0][n]);
								allData[1][n]=parseInt(allData[1][n]);
								allData[2][n]=parseInt(allData[2][n]);
							}
							//console.log(legendLMH);
							drawPie(nameOfPieDiv, sType, allData, legendLMH, 3,
									piRGB);
						
						
						}
					
					$("svg").width("100%");
				/*}*/
					$('#wait').attr('style','display:none;width:69px;height:89px;border:1px solid black;position:absolute;top:50%;left:50%;padding:2px;');
				});
			
				
		}
	else if( tester.length >=2)
		{
			
				$.get(getServletURL(), {
					categ:categ,
					type : sType,
					timeRange : tRange,
					entities : enIDs,
					topics : tpIDs
				}, function(results) {
					
					jsresult = jQuery.parseJSON(results);
					/*console.log(tpIDs);*/
					
					
					var numOfLines = 0, allData = new Array();
					
					var legends = new Array();
		
					
		
					// Split entity names into array
					var entityIDs = enIDs.split(",");
					/*if (sType == chartTypes[0] || sType == chartTypes[3]) {*/
					
					
					
					
						
							numOfLines = entityIDs.length;
							for ( var i = 0; i < numOfLines; i++)
								legends.push($("#" + entityIDs[i]).find(
										".entity_titlebar_title").text());
						
						
						// Default RGB
						var myRGB = [ '#CC0000', '#339900', '#0066CC' ];
		
						// Color scheme for lines and sectors
						
						// Use default predefined RGB
						if (numOfLines <= 3)
						{
						lineColors = myRGB;
						}
					else {// Generate array of HSL colors based on number of lines
						var hueDivs = Math.floor(360 / numOfLines);
						for ( var i = 0; i < numOfLines; i++)
							lineColors.push(hsl2RGB(hueDivs * i, 100, 40));
						
					}
					lineColors[3]="#191970";//since there were confliction in the color of two lines I changed one of them to this color
					lineColors[4]="#F29419";//since there were confliction in the color of two lines I changed one of them to this color
					lineColors[5]="#604016";//since there were confliction in the color of two lines I changed one of them to this color
					// Variables use for single line
					
					//var data = (jsresult.data).split(" ");
					var  xLabel= (jsresult.date).split(" ");
					if(categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN" || categ=="Tweet"|| categ=="Blog" )
					{
						var democrat=(jsresult.democrat).split(" ");
						var repub=(jsresult.republic).split(" ");
						//console.log(repub);
					}
					//console.log(data);
					//find max
					for(var i=0;i<repub.length;i++)
						{
						
						repub[i]=parseFloat(repub[i]);
						democrat[i]=parseFloat(democrat[i]);
						/*data[i]=parseFloat(data[i]);*/
						}
					var max=jsresult.max;
					/*for(var i=0;i<data.length;i++)
					{	
						if(data[i]>max)
							{
								max=data[i];
								
							}
					}*/
					for(var i=0;i<entityIDs.length;i++)
						{
						allData[i]=(jsresult.data[entityIDs[i].replace("entity",'')]).split(" ");
						}
					//alert(jsresult.data[entityIDs[i].replace("entity",'')]);
					if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN" || categ=="Tweet"|| categ=="Blog") && jsresult.party=="Both")
					{
						for(var i=0;i<democrat.length;i++)
						{	
							if(democrat[i]>max)
								{
									max=democrat[i];
									
								}
							if(repub[i]>max)
							{
								max=repub[i];
								
							}
							
						}
					legends.push("democrat");
					legends.push("Republican");
					}
					else if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet"|| categ=="Blog")&& jsresult.party=="Repub")
					{
						for(var i=0;i<repub.length;i++)
						{	
							
							if(repub[i]>max)
							{
								max=repub[i];
								//alert(repub[i]);
								
							}
							
						}
						legends.push("Republican");
					}
					else if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet"|| categ=="Blog") && jsresult.party=="Democ")
					{
						for(var i=0;i<democrat.length;i++)
						{	
							if(democrat[i]>max)
								{
									max=democrat[i];
									
								}
							
							
						}
						legends.push("democrat");
						
					}
					else if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet"|| categ=="Blog") && jsresult.party=="null")
					{
						/**/
						
					}
					
					lineColors[numOfLines]="#BFBFBF";
					lineColors[numOfLines+1]="#757575";
					for ( var i = 0; i < numOfLines; i++) {
						
						drawTrend(r, w, h, max, allData[i], xLabel, legends, i, lineColors);
					}
					if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet" || categ=="Blog") && jsresult.party=="Both")
					{
						
						drawTrend(r, w, h, max, democrat, xLabel, legends,numOfLines, lineColors);
						drawTrend(r, w, h, max, repub, xLabel, legends, numOfLines+1, lineColors);
					}
					else if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet"|| categ=="Blog")&& jsresult.party=="Repub")
						{
						drawTrend(r, w, h, max, repub, xLabel, legends, i, lineColors);
						
						}
					else if((categ=="TBN"  || categ=="News" || categ=="TB" || categ=="TN" || categ=="BN"|| categ=="Tweet"|| categ=="Blog") && jsresult.party=="Democ")
					{
						drawTrend(r, w, h, max, democrat, xLabel, legends, i, lineColors);
					
					}
					//console.log(allData[0]);
					//console.log(allData[1]);
					/*for(var n=0;n<allData[0].length;n++)
					{
						allData[0][n]=parseInt(allData[0][n]);
						allData[1][n]=parseInt(allData[1][n]);
						allData[2][n]=parseInt(allData[2][n]);
					}*/
					//find max
					
					
					
					/*allData[0]=[64,92,113,47,24,93,112];
					allData[1]=[20,32,29,15,11,34,29];
					allData[2]=[0,0,0,0,0,0,1];*/
					/*for ( var i = 0; i < numOfLines; i++) {
						
						drawTrend(r, w, h, max, allData[i], xLabel, legends, i, lineColors);
					}*/
					/*drawPie(nameOfPieDiv, sType, allData, legendLMH, 3,
							myRGB);*/
					$('#wait').attr('style','display:none;width:69px;height:89px;border:1px solid black;position:absolute;top:50%;left:50%;padding:2px;');
				});
		
		}
	/*else{
	$.get(getServletURL(), {
		type : sType,
		timeRange : tRange,
		entities : enIDs,
		topics : tpIDs
	}, function(results) {
		var xLabel = new Array();
		
		var numOfLines = 0, allData = new Array();
		
		var legends = new Array();

		// Is all entities are selected?
		var allEn = enIDs.length == 0 ? true : false;

		// Split entity names into array
		var entityIDs = enIDs.split(",");

		// Frequency or Tone
		if (sType == chartTypes[0] || sType == chartTypes[1]) {
			if (allEn) {
				numOfLines = 1;
				if (sType == chartTypes[0])
					legends.push("Frequency");
				else
					legends.push("Tone");
			} else {
				numOfLines = entityIDs.length;
				for ( var i = 0; i < numOfLines; i++)
					legends.push($("#" + entityIDs[i]).find(
							".entity_titlebar_title").text());
			}
		}
		// Sentiment or Intensity or Quality
		if (sType == chartTypes[2] || sType == chartTypes[3]
				|| sType == chartTypes[4]) {
			numOfLines = entityIDs.length;
			// If all entity or one entity selected
			if (numOfLines == 1) {
				numOfLines = 3;
				if (sType == chartTypes[2])
					legends = legendNNP;
				else
					legends = legendLMH;
			} else {
				for ( var i = 0; i < numOfLines; i++)
					legends.push($("#" + entityIDs[i]).find(
							".entity_titlebar_title").text());
				
			}
		}

		for ( var i = 0; i < numOfLines; i++) {
			allData[i] = new Array();
		}

		// Parse received data
		var dataPoints = results.split("|");
		for ( var i = 0; i < dataPoints.length; i++) {
			var dataSet = dataPoints[i].split("=");

			xLabel.push(dataSet[0]);

			var dataArray = dataSet[1].split(",");

			for ( var l = 0; l < numOfLines; l++) {
				var value = parseFloat(dataArray[l]);
				value = Math.round(value * 10000) / 10000;
				allData[l].push(value);
				
			}
		}

		var max = 0;
		// Find the peak for overall data points
		for ( var i = 0; i < numOfLines; i++) {
			max = Math.max.apply(Math, allData[i]) > max ? Math.max.apply(Math,
					allData[i]) : max;
		}

		// Default RGB
		var myRGB = [ '#CC0000', '#339900', '#0066CC' ];

		// Color scheme for lines and sectors
		
		// Use default predefined RGB
		if (numOfLines <= 3)
			lineColors = myRGB;
		// Generate array of HSL colors based on number of lines
		else {
			var hueDivs = Math.floor(360 / numOfLines);
			for ( var i = 0; i < numOfLines; i++)
				lineColors.push(hsl2RGB(hueDivs * i, 100, 40));
			
		}
		lineColors[3]="#191970";//since there were confliction in the color of two lines I changed one of them to this color
		lineColors[4]="#F29419";//since there were confliction in the color of two lines I changed one of them to this color
		lineColors[5]="#604016";//since there were confliction in the color of two lines I changed one of them to this color
		
		
		// Variables use for single line
		var data = new Array();

		
		 * Draw charts
		 
		// For Frequency and Tone
		if (sType == chartTypes[0] || sType == chartTypes[1]) {
			for ( var i = 0; i < numOfLines; i++) {
				data = allData[i];
				// Draw Trend Chart
				drawTrend(r, w, h, max, data, xLabel, legends, i, lineColors);
			}
		}
		// For Sentiment, Intensity and Quality
		if (sType == chartTypes[2] || sType == chartTypes[3]
				|| sType == chartTypes[4]) {
			for ( var i = 0; i < numOfLines; i++) {
				data = allData[i];
				// Draw Trend Chart
				drawTrend(r, w, h, max, data, xLabel, legends, i, lineColors);
			}
		//	console.log("allData :"+allData[0]+"   "+allData[1]+"    "+ allData[2]);
			// Draw Pie Chart
			if (sType == chartTypes[2])
				drawPie(nameOfPieDiv, sType, allData, legendNNP, numOfLines,
						myRGB);
			else
				drawPie(nameOfPieDiv, sType, allData, legendLMH, numOfLines,
						myRGB);
		}
	});
	
	
		}*/
	
	




}