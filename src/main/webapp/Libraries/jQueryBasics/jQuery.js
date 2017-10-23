/**
 * $(".test").hide() - hides all elements with class="test".
 * 
 * $("#test").hide() - hides the element with id="test".
 * 
 */


$(document).ready(function() {
	
	// toggle or hide
	/**************************toggle**************************/
	$(".toggle").click(function() {
		$(".testing").toggle(1000);
		// $(".testing").toggle(1000, something());
	});
	
	// 2. fadeIn, fadeOut, fadeToggle, or fadeTo
	/**************************Fade**************************/
	$(".fadeToggle").click(function() {
		$(".a2").fadeToggle(1000);
	});
	
	$(".fadeTo").click(function() {
		$(".a2").fadeTo(1000, 0.1);
	});

	
	// slideUp, slideDown, slideToggle
	/**************************SlideToggle**************************/
	$(".SlideToggle").click(function() {
		$(".div1").slideToggle(1000);
	});

	
	/**************************Animate**************************/
	$(".Animate").click(function() {

		div2 = $(".div2");
		div2.css('position', 'relative');
		div2.css('color', 'white');

		// 1. Right-Bottom
		$(".div2").animate({
			color: 'green',
			marginLeft : '400px',
			marginTop : '250px',
			opacity : '0.5',
		}, 1500);
		
		// 2. Go up
		$(".div2").animate({
			marginTop : '0px'
		});
	});

	/**************************changeCSS**************************/
	$(".div3").hover(function() {
		$(this).css("background", "orange");
	});
	
	$(".changeCSS").click(function() {

		$(".div3").css('background', "url('../img/androa.jpg')");
		$(".div3").css('background-size', "100% 100%");
		$(".div3").css('width', "150px");
		$(".div3").css('height', "150px");
		$(".div3").css('color', "white");
		$(".div3").css('text-align', "center");
		$(".div3").css('marginRight', 400);
		
		// can be variable as well
		var div3 = $(".div3");
		div3.css('font-family', 'Segoe Print');
	});

	/**************************changeElementData**************************/
	$(".changeElementData").click(function() {
		$(".div4").html("<div>   <strong>   Data !  </strong>    </div> ");
//		$(".div4").text("what");
	});

	/**************************addElement**************************/
	$(".addElement").click(function() {

		// 1. make the <img> element
		var theImg = $("<img>");
		theImg.prop("src", "../img/androa.jpg");
		theImg.prop("id", "fang");
		theImg.addClass("kuinai");
		theImg.css("width", "50px");

		// 2. Add this listener to this element
		theImg.click(function() {
			theImg.prop("src", "");
			theImg.remove();
		});

		// 3. Add This <img> to that <div>
		$(".div5").append(theImg);
	});

});
