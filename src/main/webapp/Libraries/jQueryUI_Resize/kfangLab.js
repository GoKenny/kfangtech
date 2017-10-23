$(document).ready(function() {

	$("#resizable").resizable({

		// maxHeight: 250,
		maxWidth : 350,
		minHeight : 150,
		minWidth : 200,

//		 handles: 'e, w, s, n', // Horizontally Only, east, west

		handles : 's, n',

	});

	
	$('table td').resizable({

		handles : 'e',
		minWidth : 18
	});

});
