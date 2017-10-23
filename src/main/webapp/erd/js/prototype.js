
$(document).ready(function() {
	
	/**************** When The Page Is Loading, Do These  ***************/
	// 1. Initiate Dialog
	$("#tableDetailsDialog").dialog({
			
			autoOpen: false,
			resizable: false,
			draggable: true,
		      
		    show: {
		    	effect: "fade", // blind, bounce, clip, drop, explode, fade, fold, highlight, puff, pulsate, scale, shake, size, slide, transfer 
		        duration: 250
		      },
		      
		    hide: {
		        effect: "fade",
		        duration: 200
		      },
		      
		    minWidth: 385,
		    minHeight: 188
		      
		});
	
	addListenerToTableName("#1-Column");
	
	
	/**************** When The Page Is Done Loading, Do These  ***************/
	$(window).load(function() {
			
	});
	
	
	
    function addListenerToTableName(theColumnName) {
    	
    	/** 
    	 * 1. For Each Table (".tableName") In Specific Column 
    	 * 
    	 * @param theColumnName	e.g. "#1-Column"
    	 * 
    	 * */
    	$(theColumnName + " .tableName").click(function(){
    		
    		// 1. Get The Column Container Name and Number
    		var columnName = $(this).parent().parent().attr("id");
    		var columnNumb = columnName.split("-")[0];
    		
    		// 2. Hide Other Details (Hide All Details Excluding This Table's Details)
    		$("#" + columnName + " .tableFrame .tableDetails").not($(this).next()).hide("slide", {direction: "up",easing: "linear",  distance: 0}, 200, function(){ 	});
    		
    		// 2. Toggle The Details
    		$(this).next().toggle("slide", {direction: "up",easing: "linear",  distance: 0}, 200, function(){ 	});

    		
//    		var thisTableName = $(this);
    		
//    		columnNumb = parseInt(columnNumb);	// conver to int
//    		
//    		// If Next Column Exists
//    		if ($("#" + (columnNumb + 1) + "-Column").length) {
//    			
//    			// 2. Hide Details of Other Tables In This Column
//    			$("#" + columnName + " .tableFrame .tableDetails").not(thisTableName.next()).hide("slide", {direction: "up",easing: "linear",  distance: 0}, 200, function(){ 	});
//    			
//    			// 3. Toggle This Table Detail
//    			thisTableName.next().toggle("slide", {direction: "up", easing: "linear",  distance: 0}, 200, function(){ });
//    			
//    		}
//    		// If There Is No Next Column, Expand To The Right
//    		else {
//    			
//    			// 1. Expand The Details Of This Table
//    			thisTableName.next().toggle("slide", {direction: "up",easing: "linear",  distance: 0}, 200, function(){ 
//    				
//	   				// 2. Point To The Next Column And Generate The Tables And The New Column
//	   				columnNumb++
//	   				generateTablesAndColumn(columnNumb);
//    				
//    			});
//    			
//    		}
   		
    	});
    	
    	/**
    	 * 2. For Each Right Arrow (".rightArrow") In Specific Column 
    	 * 
    	 * @param theColumnName	e.g. "#1-Column"
    	 * 
    	 * */
    	$(theColumnName + " .rightArrow").click(function(){
    		
    		// 1. Get The Column Container Name and Number
    		var columnName = $(this).parent().parent().attr("id");
    		var columnNumb = columnName.split("-")[0];
    		
    		columnNumb = parseInt(columnNumb);	// conver to int
    		
    		// If Next Column Exists
    		if ($("#" + (columnNumb + 1) + "-Column").length) {
    			
    			// 2. Fade In and Out Tables In Next Column
    			$("#" + (columnNumb + 1) + "-Column" + " .tableFrame").fadeOut(400);
    			
    			setTimeout(function(){
    				$("#" + (columnNumb + 1) + "-Column" + " .tableFrame").fadeIn(400);
    			}, 300);
    			
    			
    			// 3. Remove Those Related Columns Of The Right
    			for (var i = (columnNumb + 2); i <1000; i++) {
					
    				var theColumnElement = $("#" + i + "-Column");
    				
    				if (theColumnElement.length) {
    					console.log(i);
    					
    					
    					theColumnElement.hide("slide", {direction: "left",easing: "linear",  distance: 0}, 300, function(){ 
    						
    						$(this).remove();
    						
    					});
    					
    				}
    			
    			}
    			
    		}
    		// If There Is No Next Column, Expand To The Right
    		else {
    			
	   			// 2. Point To The Next Column And Generate The Tables And The New Column
	   			columnNumb++
	   			generateTablesAndColumn(columnNumb);
    				
    			
    		}
    		
    	});
    	
    	
    	// Double Click
   	  	$(theColumnName + " .tableFrame").dblclick(function(){

    	   	$("#tableDetailsDialog").dialog("open");
    	    	
       });
    }
    
    /**
     * 
	 * Generate The One Column to The Right, And The Tables In It 
	 * 
	 * @param columnNumb	e.g. "1"
	 * 
	 * */
    function generateTablesAndColumn(columnNumb){
    	
    	// 1. Generate The HTML Code
    	var theColumnHTML = "";
    	
    	theColumnHTML += '<div id=' + columnNumb + '-Column' + ' class="tablesColumn" >';
    		 
    	theColumnHTML += '	<div class="sectionTitle">';
    	theColumnHTML += '		Related Tables';
		theColumnHTML += '	</div>';

		theColumnHTML += '	<div class="theSearchContainer">';
		theColumnHTML += '		search/filter: <input class="theInputStyle" type="text" placeholder="contain keyword" />';
		theColumnHTML += '	</div>';
    	
		// 2. Make Duplicated Tables
		for (var i = 0; i < 30; i++) {
			
			theColumnHTML += '	<div class="tableFrame relationalTables">';
	    	
			theColumnHTML += '		<div class="rightArrow"> </div>';
			theColumnHTML += '		<div class="tableName">';
			theColumnHTML += '			Related Table ' + (i+1);
			theColumnHTML += '		</div>';
	    	
			theColumnHTML += '		<div class="tableDetails">';
			theColumnHTML += '			<div class="row primary">';
			theColumnHTML += '				<div class="fieldName">ID</div>';
			theColumnHTML += '				<div class="fieldType">Integer</div>';
			theColumnHTML += '			</div>';
			theColumnHTML += '			<div class="row">';
			theColumnHTML += '				<div class="fieldName foreignKey">(fk) EmployeeID</div>';
			theColumnHTML += '				<div class="fieldType">int</div>';
			theColumnHTML += '			</div>';
			theColumnHTML += '			<div class="row">';
			theColumnHTML += '				<div class="fieldName foreignKey">(fk) DepartmentID</div>';
			theColumnHTML += '				<div class="fieldType">int</div>';
			theColumnHTML += '			</div>';
			theColumnHTML += '			<div class="row">';
			theColumnHTML += '				<div class="fieldName foreignKey">(fk) OtherForeignKey</div>';
			theColumnHTML += '				<div class="fieldType">int</div>';
			theColumnHTML += '			</div>';
			theColumnHTML += '			<div class="row">';
			theColumnHTML += '				<div class="fieldName">Other Field</div>';
			theColumnHTML += '				<div class="fieldType">String</div>';
			theColumnHTML += '			</div>';
			theColumnHTML += '			<div class="row">';
			theColumnHTML += '				<div class="fieldName">Other Field</div>';
			theColumnHTML += '				<div class="fieldType">String</div>';
			theColumnHTML += '			</div>';
			theColumnHTML += '			<div class="row">';
			theColumnHTML += '				<div class="fieldName">Other Field</div>';
			theColumnHTML += '				<div class="fieldType">String</div>';
			theColumnHTML += '			</div>';
			theColumnHTML += '			<div class="row">';
			theColumnHTML += '				<div class="fieldName">Other Field</div>';
			theColumnHTML += '				<div class="fieldType">String</div>';
			theColumnHTML += '			</div>';
			theColumnHTML += '			<div class="row">';
			theColumnHTML += '				<div class="fieldName">Other Field</div>';
			theColumnHTML += '				<div class="fieldType">String</div>';
			theColumnHTML += '			</div>';
	    	
			theColumnHTML += '		</div>';
	    	
			theColumnHTML += '	</div>';
		
    	}
		
		theColumnHTML += '	<div class="moreTablesInfo">  20+ more  </div>';
		
		theColumnHTML += '</div>	';
		
		// 2. Append This Column To The Right Of The Previous Column
		$("#erDiagramFrame").append(theColumnHTML);
		
		// 3. Slide In This Column
		$("#" + columnNumb + "-Column").show("slide", {direction: "left",easing: "linear",  distance: 0}, 400, function(){ 
			
			// 3. Slide In The Tables
			$("#" + columnNumb + "-Column .relationalTables").show("slide", {direction: "left", easing: "",  distance: 0}, 300, function(){ });

		})
		
		// 4.Add Handlers To All Tables In This New Column
		addListenerToTableName("#" + columnNumb + "-Column");
		
    
		
	}
    
    /**************************** AJAX Test ****************************/
    var accessTime = new Date();
    
    $.ajax({
		  url:"TheTraffic",
		  type: 'get',
		  dataType: 'json',
		  jsonpCallback: 'json',
		  data: {
			  accessTime: accessTime,
		  },
		  
		  success: function(json) {
			  
			  var jsonResult = jQuery.parseJSON(results);
			  // do something
		  },
		  
		  error: function(json){
			  // do something
		  }      
		  
	  });
    
    
    /**************************** JSON Data Test ****************************/
    // Get The Fist Table Name
//    console.log(theJson.root.QueryEntities.QueryEntity[0]._Name);
    
    
    
    /**************************** jQuery Connect ****************************/
    
});
