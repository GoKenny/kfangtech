/**
 * Personal Library
 * 
 * Email: kuinai.fang@gmail.com
 * LinkedIn: https://ca.linkedin.com/in/kuinaifang
 * 
 * All Rights Reserved
 * 
 * @author Kenny Fang
 * 
 */


// http://output.jsbin.com/ubaqek/1/

$(document).ready(function() {
	
	$(window).load(function() {
		

	var connections = [];
	
	// jQuery-UI Draggable
	$('.draggable').draggable({
		drag : function() {
			var item = this;
			connections.forEach(function(connection){
				if(connection.elem1[0] === item || connection.elem2[0] === item) {
					connection.calculate();
				}
			})
		}
	});
	
	connections.push(new $.connect('#m1', '#m2', {leftLabel : '', rightLabel: 'kenny'}));
	connections.push(new $.connect('#m1', '#m3'));

	
	});
	
});


