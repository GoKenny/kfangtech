
$(document).ready(function() {
	
	
	$(window).scroll(function() {
		
		$('.to_fade').each(function(){
			
			var thisPosition = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			
			if (thisPosition < topOfWindow+500) 
				$(this).addClass("animated fadeInUp");
			else 
				$(this).removeClass("animated fadeInUp");
		
		});
	
	});
	
	
	
});


