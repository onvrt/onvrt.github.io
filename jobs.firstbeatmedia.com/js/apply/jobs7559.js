$(document).ready(function() {

	$("#link_show_advanced_search").live('click',function(event){
		$("#advanced_search").slideDown('fast');
		$("#job_listings_wrapper, #search_bar").slideUp('fast',function(){resumatorResizeIframe(0,true);});
		return false;
	});

	$("#btn_cancel_search").live('click',function(event){
		$("#advanced_search").slideUp('fast');
		$("#job_listings_wrapper, #search_bar").slideDown('fast',function(){resumatorResizeIframe(0,true);});
		return false;
	});

	$("a.resumator_button").live('click',function(event){
		this.blur();
	});

	$(".submit_buttons a.resumator_button:not(.resumator_button_clear)").live('click',function(event){
		$(this).parent().append('<p class="t14 mb0 p5 gray">Working...</p>').children('.resumator_button').hide();
	});

	$('#resumator_btn_apply_now').click(function(){
		$('#resumator_form_wrapper').slideDown('fast',function(){resumatorResizeIframe(0);});
		$('#job_description_wrapper').slideUp('fast');
		return false;
	});

	$('#resumator-cancel-resume').click(function(){
		$('#resumator_form_wrapper').slideUp('fast');
		$('#job_description_wrapper').slideDown('fast',function(){resumatorResizeIframe(0);});
		return false;
	});

	$('.resumator-resume-action').click(function(){
		setTimeout(function() {resumatorResizeIframe(0,1);},500);
		return false;
	});

});

function resumatorResizeIframe(addMoreHeight,dontJumpTop){
	if( resumator_bank_helper_url.length ){
		// What's the page height?
		var h = document.getElementById('resumator_help_frame').offsetTop; // var height = document.body.scrollHeight;
		if( addMoreHeight ){ h += addMoreHeight; }
		// Going to 'pipe' the data to the parent through the helpframe..
		var pipe = document.getElementById('resumator_help_frame');
		// Suppress jump to top
		if(dontJumpTop){
			jump = "&nojump=1";
		}else{
			jump = "&nojump=0";
		}
		// Cachebuster a precaution here to stop browser caching interfering
		pipe.src = resumator_bank_helper_url+'?height='+h+'&cacheb='+Math.random()+jump;
	}
}
