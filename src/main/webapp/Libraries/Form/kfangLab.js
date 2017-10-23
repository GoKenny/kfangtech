
$(document).ready(function() {
	
	  jQuery("#theForm").on('submit', function(theEvent){
		  
		  // 1. Disable The Default Actions
		  theEvent.preventDefault();

		  // 2. Do The AJAX Call
		  jQuery.post( "someServlet", {data: "something"} )
	        
		  	.done(function(data) {
	            	
		  		// Do Something 
		  	})
	        
		  	.fail(function(data) {
	            	
		  		$("#theMessage").append('<p>' +  $("#theInput").val()  + '</p>');
		  	});
	        
	    });
    
    
});















/***************** The Original Code ****************/
//jQuery('form.contact-form').on('submit', function( e ){
//    e.preventDefault();
//    var $form = jQuery(this);
//    var request = $form.serialize();
//    jQuery($form).find('p.contact-form-respond').remove();
//    var ajax = jQuery.post( "contact-form.html", request )
//        .done(function( data ) {
//            jQuery($form).find('[type="submit"]').attr('disabled', false).parent().prepend('<p class="contact-form-respond highlight">'+data+'</p>');
//    })
//        .fail(function( data ) {
//            jQuery($form).find('[type="submit"]').attr('disabled', false).parent().prepend('<p>Mail cannot be sent.</p>');
//    })
//});



