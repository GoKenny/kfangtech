"use strict";

if(typeof Placeholdem === 'function') {
	Placeholdem( document.querySelectorAll( '[placeholder]' ) );
}

jQuery(document).ready(function() {
	//menu
	if (jQuery().superfish) {
		jQuery('ul.sf-menu').superfish({
			delay:       700,
			animation:   {opacity:'show',height:'show'},			
			animationOut: {opacity: 'hide'},
			speed:       'fast',
			disableHI:   false,
			cssArrows:   false,
			autoArrows:  true
		});

	}  


    //Search
    jQuery(document).ready(function() {
	jQuery('#open_search_bar').on('click', function( e ){
		e.preventDefault();
		jQuery('#search').toggleClass('search_closed');
	});
	});
     
     //Masonry
//     var container = document.querySelector('#masonry');
//		var msnry = new Masonry( container, {
//		  // options		  
//		  itemSelector: '.masonry-item'
//		});

		
	//toTop
//	if (jQuery().UItoTop) {
//        jQuery().UItoTop({ easingType: 'easeOutQuart' });
//    }

    //horizontal accordion
    if (jQuery().elastislide) {
	    jQuery('#horizontal_slider').elastislide({
	        imageW : 360,
	        border : 0,
	        minItems : 1,
	        margin : 30
	    });
	}

	//parallax
//	if (jQuery().parallax) {
//		
//	}
	   

   	//carousel
   	if (jQuery().carousel) {
		jQuery('.carousel').carousel();
	}

	//owl carousel
	if (jQuery().owlCarousel) {
	    jQuery(".owl-carousel").owlCarousel({
	    	navigation : false,
	    	navigationText : false,
	    	pagination : true,
	    	items: 4,
	    });
	}

    //prettyPhoto
    if (jQuery().prettyPhoto) {
	   	jQuery("a[rel^='prettyPhoto']").prettyPhoto({
			theme: 'facebook' /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
	  	});
	}
	
    //nice scroll
	if (jQuery().niceScroll) {
    	
	}

	//bx slider
	if (jQuery().bxSlider) {
		jQuery('.bxslider').bxSlider({
			auto: true,
			controls: true,
			pager: false,
		  	mode: 'fade',
		  	speed: 800
		});
	}
		
	//portfolio and horizontal slider animation
		jQuery('.portfolio_item_image .portfolio_links').css({opacity: 0});
		jQuery('.isotope-item, .horizontal_slider_introimg').hover(
		 	function() {
				jQuery( this ).find('.portfolio_item_image .portfolio_links').stop().animate({ opacity: 1}, 500, 'easeOutExpo').find('.p-view').toggleClass('moveFromLeft').end().find('.p-link').toggleClass('moveFromRight');
			}, function() {
				jQuery( this ).find('.portfolio_item_image .portfolio_links').stop().animate({ opacity: 0}, 300, 'easeOutExpo').find('.p-view').toggleClass('moveFromLeft').end().find('.p-link').toggleClass('moveFromRight');
			}
		);

	//teaser style5 animation
	jQuery('.single_teaser.icons.style5').hover(
	 	function() {
			jQuery( this ).find('i').addClass('moveFromLeft').end().find('h3').addClass('moveFromRight').end().find('p').addClass('moveFromBottom');
		}, function() {
			jQuery( this ).find('i').removeClass('moveFromLeft').end().find('h3').removeClass('moveFromRight').end().find('p').removeClass('moveFromBottom');
		}
	);

	//twitter
	//slide tweets
	jQuery('#tweets .twitter').bind('loaded', function(){
		jQuery(this).addClass('flexslider').find('ul').addClass('slides');
	});
	if (jQuery().tweet) {
		jQuery('.twitter').tweet({
			modpath: "./twitter/",
		    count: 2,
		    avatar_size: 48,
		    loading_text: 'loading twitter feed...',
		    join_text: 'auto',
		    username: 'ThemeForest', 
		    template: "{avatar}{time}{join}<span class=\"tweet_text\">{tweet_text}</span>"
		});
	}

});

jQuery(window).load(function(){	

 //Masonry 
//        var container = document.querySelector('#masonry');
//		var msnry = new Masonry( container, {
//		  // options		  
//		  itemSelector: '.masonry-item'
//		});


	setTimeout(function(){
		jQuery('.progress-bar').addClass('stretchRight');
	}, 600);


	//stick header to top
//	if (jQuery().sticky) {
//	    jQuery("#header").sticky({ 
//	    		topSpacing: 0,
//	    		scrollBeforeStick: 5
//	    	},
//	    	function(){ 
//	    		
////	    		jQuery("#header").stop().animate({opacity:0}, 0).delay(500).stop().animate({opacity:1}, 1000);
//	    	},
//	       	function(){ 
////	    		jQuery("#header").stop().animate({opacity:0}, 0).delay(50).stop().animate({opacity:1}, 2000);
//	    	}
//	    );
//	}
	

	if (jQuery().flexslider) {		
              jQuery('.flexslider').flexslider({
              animation: "slide",
  			  animationLoop: false,
   			 itemWidth: 276,
   			 itemMargin: 0
  });
	}

	jQuery('body').delay(1000).scrollspy('refresh');


	//preloader
	jQuery(".preloaderimg").fadeOut();
	jQuery(".preloader").delay(200).fadeOut("slow").delay(200, function(){
		jQuery(this).remove();
	});

	//fractionslider
	if (jQuery().fractionSlider) {
		var $mainSlider = jQuery('#mainslider');
		jQuery('.slider').fractionSlider({
			'fullWidth': 			true,
			'controls': 			true, 
			'pager': 				true,
			'responsive': 			true,
			'dimensions': 			"1920,1080",
		    'increase': 			false,
			'pauseOnHover': 		false,
			'slideEndAnimation': 	false,
			'timeout' : 			2500,
			'slideTransitionSpeed' :0
			
		});
	}



	//flickr
	// use http://idgettr.com/ to find your ID
	if (jQuery().jflickrfeed) {
		jQuery("#flickr").jflickrfeed({
			flickrbase: "http://api.flickr.com/services/feeds/",
			limit: 8,
			qstrings: {
				id: "37671286@N07"
			},
			itemTemplate: '<a href="{{image_b}}" rel="prettyPhoto[pp_gal]"><li><img alt="{{title}}" src="{{image_s}}" /></li></a>'
		}, function(data) {
			jQuery("#flickr a").prettyPhoto({
				theme: 'facebook'
	   		});
	   		jQuery("#flickr li").hover(function () {						 
			   jQuery(this).find("img").stop().animate({ opacity: 0.5 }, 200);
		    }, function() {
			   jQuery(this).find("img").stop().animate({ opacity: 1.0 }, 400);
		    });
		});
	}

	//animation to elements
//	var windowHeight = jQuery(window).height();
//	jQuery('.to_fade, .block-header, .block-header + p').each(function(){
//	var imagePos = jQuery(this).offset().top;
//	var topOfWindow = jQuery(window).scrollTop();
//		if (imagePos < topOfWindow+windowHeight-100) {
//			jQuery(this).addClass("animated fadeInUp");
//		}
//	});

	jQuery('.to_slide_left').each(function(){
	var imagePos = jQuery(this).offset().top;

	var topOfWindow = jQuery(window).scrollTop();
		if (imagePos < topOfWindow+windowHeight-100) {
			jQuery(this).addClass("animated fadeInLeft");
		}
	});

	jQuery('.to_slide_right').each(function(){
	var imagePos = jQuery(this).offset().top;

	var topOfWindow = jQuery(window).scrollTop();
		if (imagePos < topOfWindow+windowHeight-100) {
			jQuery(this).addClass("animated fadeInRight");
		}
	});


		//single page localscroll and scrollspy
//	var navHeight = jQuery('#header').outerHeight(true) + 40;
//	jQuery('body').scrollspy({
//		target: '.mainmenu_wrap',
//		offset: navHeight
//	});
	
	if (jQuery().localScroll) {
		jQuery('#mainmenu, #land').localScroll({
			duration: 1500,
			easing:'easeOutQuart',
			offset: 0
		});
		
	}

});

//jQuery(window).resize(function(){
//	jQuery("#header").sticky('update');
//	jQuery('body').scrollspy('refresh');
//
//});



jQuery(window).scroll(function() {

//	//circle progress bar
//	if (jQuery().easyPieChart) {
//		var count = 0 ;
//		//var colors = ['#fbcf61', '#e6557c', '#00c1e4'];
//		var colors = ['#e75f4d'];
//		jQuery('.chart').each(function(){
//
//				
//			var imagePos = jQuery(this).offset().top;
//			var topOfWindow = jQuery(window).scrollTop();
//			if (imagePos < topOfWindow+600) {
//
//				jQuery(this).easyPieChart({
//			        barColor: colors[count],
//					trackColor: '#474747',
//					scaleColor: false,
//					scaleLength: false,
//					lineCap: 'butt',
//					lineWidth: 8,
//					size: 170,
//					rotate: 0,
//					animate: 2000,
//					onStep: function(from, to, percent) {
//							jQuery(this.el).find('.percent').text(Math.round(percent));
//						}
//			    });
//			}
//
//			count++;
//			if (count >= colors.length) { count = 0};
//		});
//	}

	//animation to elements
	var windowHeight = jQuery(window).height();
	jQuery('.to_fade, .block-header, .block-header + p').each(function(){
	var imagePos = jQuery(this).offset().top;
	var topOfWindow = jQuery(window).scrollTop();
		if (imagePos < topOfWindow+windowHeight-100) {
			jQuery(this).addClass("animated fadeInUp");
		}
	});

	jQuery('.to_slide_left').each(function(){
	var imagePos = jQuery(this).offset().top;

	var topOfWindow = jQuery(window).scrollTop();
		if (imagePos < topOfWindow+windowHeight-100) {
			jQuery(this).addClass("animated fadeInLeft");
		}
	});

	jQuery('.to_slide_right').each(function(){
	var imagePos = jQuery(this).offset().top;

	var topOfWindow = jQuery(window).scrollTop();
		if (imagePos < topOfWindow+windowHeight-100) {
			jQuery(this).addClass("animated fadeInRight");
		}
	});

});

