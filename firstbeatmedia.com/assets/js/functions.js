(function($){

	$(document).ready(function (){
	
		$('.menu-toggle').click(function(){
			$('#site-nav').toggleClass('toggled-on');
		});
		$('#reveal').click(function(){
			$('#portfolio-overlay').fadeOut(300);
		});
		$('#gmap #adress button').click(function(){
			$('#adress').hide();
			$('#contact-form').fadeIn(300)
		});
		$('.form-close').click(function(){
			$('#contact-form').hide();
			$('#adress').fadeIn(300)
		});
		$('.error').focus(function(){
			$(this).removeClass('error')
		});
		$('#slider').rhinoslider({
				effect: 'fade',
				controlsMousewheel: false,
				controlsKeyboard: false,
				controlsPlayPause: false,
				showBullets: 'never',
				showControls: 'always',
				effectTime: 500
		});
		$(function() {
				$('#popup-content').jScrollPane({autoReinitialise: true});
			});
		
		// turn on active menu item

		if ($('body').hasClass('home-page')) {
        	$('.menu-home').addClass('active')
		}
		if ($('body').hasClass('portfolio-page')) {
        	$('.menu-portfolio').addClass('active')
		}
		if ($('body').hasClass('culture-page')) {
        	$('.menu-culture').addClass('active')
		}
		if ($('body').hasClass('contact-page')) {
        	$('.menu-contact').addClass('active')
		}

		


		(function($){
			$.fn.simplestSlideShow = function(settings){
			    var config = {
			      'timeOut': 6000,
			      'speed': 'normal'
			    };
			    if (settings) $.extend(config, settings);
			    this.each(function(){
			      var $elem = $(this);
			      $elem.children(':gt(0)').hide();
			      setInterval(function(){
			        $elem.children().eq(0).fadeOut(config['speed'])
			        .next().fadeIn(config['speed'])
			        .end().appendTo($elem);
			      }, config['timeOut']);
			    });
			    return this;
			};
		})(jQuery);
		$('#our-culture>ul li').simplestSlideShow({'timeOut': 8000, 'speed': 1500});

	});
	
	
})(window.jQuery);
