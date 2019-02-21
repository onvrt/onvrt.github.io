$(document).ready(function() {
	window.dv_language || (window.dv_language = 'en_us');

	curLanguage = translationsObj[window.dv_language];

	if (typeof DV_RESPONSIVE_LAYOUT !== 'undefined' && DV_RESPONSIVE_LAYOUT) {
		var $window         = $(window),
			$body           = $('body'),
			$pageHeader     = $('.page-header'),
			$welcomeChevron = $pageHeader.find('.fa-chevron-down'),
			$jobDescription = $('.job-description'),
			$backButton     = $('#resumator-back-button'),
			$wmyuValue      = $('#resumator-wmyu-value'),
			$wmyuCount      = $('#resumator-wmyu-count'),
			$detectMobile   = $('#resumator-detect-mobile');

		function toggleWelcomeMessage() {
			if ($pageHeader.css('cursor') == 'pointer') {
				$body.toggleClass('welcome-message-open');
				$welcomeChevron.toggleClass('fa-flip-vertical');
				return false;
			}
		}

		function detectMobile() {
			if ($window.width() > 480) {
				$detectMobile.val(0);
			} else {
				$detectMobile.val(1);
			}
		}

		$pageHeader.click(function() {
			return toggleWelcomeMessage();
		});

		// detect browser width
		// enables server to apply correct body class when server-side errors are thrown
		detectMobile();
		$window.resize(detectMobile);

		if ($jobDescription.length) {
			// job position view
			var height    = $jobDescription.height(),
				$readMore = $('#read-more-description');

			if (height > 180) {
				$jobDescription.addClass('summary');

				$readMore.one('click', function() {
					$jobDescription.animate({
						height: height + 20
					}, 100);

					$readMore.slideUp(100);

					return false;
				});
			}

			$('#resumator-mobile-apply-button').click(function() {
				$body.addClass('applying');
			});

			$backButton.click(function() {
				if ($body.hasClass('applying')) {
					// if we are applying, back button should reset jobs view
					$body.removeClass('applying');
					window.scrollTo(0, 0);
					return false;
				}
			});

			if ($wmyuValue.length) {
				$wmyuValue.on('input propertychange', function() {
					var value = $wmyuValue.val(),
						diff  = 150 - value.length;

					$wmyuCount.text(diff);

					if (diff <= 20) {
						$wmyuCount.addClass('danger');
					} else if (diff <= 40) {
						$wmyuCount.removeClass('danger').addClass('warning');
					} else {
						$wmyuCount.removeClass('danger warning');
					}

					// support browsers that don't implement the maxlength attribute
					if (value.length > 150) {
						$wmyuValue.val(value.slice(0, 150));
					}
				});
			}
		}
	} else {
		// Set the WMYU field character count
		if(dv_language == 'es_us'){
			$('#resumator-wmyu-value').textareaCount({
				'maxCharacterSize': 150,
			    'warningNumber': 40,
			    'displayFormat': '#left Letras'
			});
		}else if(dv_language == 'nl_nl'){
			$('#resumator-wmyu-value').textareaCount({
				'maxCharacterSize': 150,
			    'warningNumber': 40,
			    'displayFormat': '#left Tekens'
			});
		}else{
			$('#resumator-wmyu-value').textareaCount({
				'maxCharacterSize': 150,
			    'warningNumber': 40,
			    'displayFormat': '#left Characters Left'
			});
		}
	}

	// Set the start date datepicker
	// moved to view.jobboard_deault.php
	$('.resumator-datepicker').datepicker({dateFormat: "yy-mm-dd"});

	// Manage resume upload options
	$('#resumator-choose-upload').click(function(){
		$('#resumator-resume-upload-wrapper').removeClass('none');
		$('#resumator-resume-options').hide();
		return false;
	});

	$('#resumator-choose-paste').click(function(){
		$('#resumator-resume-paste-wrapper').removeClass('none');
		$('#resumator-resume-options').hide();
		if (typeof window.resumatorResizeIframe !== 'undefined') {
			window.resumatorResizeIframe(0);
		}
		return false;
	});

	$('#resumator-resume-switch-paste').click(function(){
		$('#resumator-resume-paste-wrapper').removeClass('none');
		$("#resumator-resume-value").attr('value','');
		$('#resumator-resume-upload-wrapper').addClass('none');
		if (typeof window.resumatorResizeIframe !== 'undefined') {
			window.resumatorResizeIframe(0);
		}
		return false;
	});

	$('#resumator-resume-switch-upload').click(function(){
		$('#resumator-resume-paste-wrapper').addClass('none');
		$("#resumator-resumetext-value").attr('value','');
		$('#resumator-resume-upload-wrapper').removeClass('none');
		return false;
	});

	// Submit resume form
	$("#resumator-submit-resume, #resumator-submit-resume-button").click(function(){
		send_form(this);
		return false;
	});

	// Count the WMYU length
	$('#resumator-wmyu-value').keyup(function() {
		var len = this.value.length;
	    if (len >= 150) {
	        this.value = this.value.substring(0, 150);
	    }
	});

	$('#resumator-optional-fields-link').clickr({
		'#resumator-optional-fields':'slideDown',
		'#resumator-show-optional-fields':'hide'
	});

	// Hide felony explain form group
	if($('#resumator-felony-value').length && $('#resumator-felonyexplain-value').length) {
        toggleFelonyExplain();
        $('#resumator-felony-value').change(function() {
            toggleFelonyExplain();
        });
	}

	function toggleFelonyExplain() {
		var felonySelect = $('#resumator-felony-value');
		var felonyExplainFormGroup = $('#resumator-felonyexplain-value').closest('.form-group');
        if(felonySelect.val() != 2) { // 0 - no answer, 1 - no, 2 - yes
            felonyExplainFormGroup.hide();
        } else {
            felonyExplainFormGroup.show();
		}
	}

	// Show tooltip for IE11 and its over-intense security settings
	if (!!navigator.userAgent.match(/Trident.*rv:11./)) {
		$('#ie11-warning').css('display', 'block');
	}

	// For Apply With LinkedIn Widget
	window.INFrame = $('#res_apply_with_linkedin_frame');

});

var translationsObj = {
	"es_us":  {
		submitStatus: 'Presentación de la solicitud',
		alertMessage: 'Por favor corrige los errores resaltados e inténtalo de nuevo.',
		resumeLabel: 'Adjunta o pega tu CV',
		firstNameLabel: 'Introduce tu nombre',
		lastNameLabel: 'Introduce tus apellidos',
		emailLabel: 'Introduce una dirección de correo válida',
		cityLabel: 'Introduce tu ciudad',
		stateLabel: 'Introduce tu estado',
		postalLabel: 'Introduce postal',
		phoneLabel: 'Introduce tu número de teléfono',
		errorLabel: 'Introducir texto'
	},
	"nl_nl":  {
		submitStatus: 'Indienen van ... even geduld aub ...',
		alertMessage: 'Corrigeer de fouten gevonden met de applicatie.',
		resumeLabel: 'Bevestig of pasta CV',
		firstNameLabel: 'Voer de voornaam',
		lastNameLabel: 'Voer de achternaam',
		emailLabel: 'Voer geldige email adress',
		cityLabel: 'voer',
		stateLabel: 'Voer State',
		postalLabel: 'Voer postcode',
		phoneLabel: 'Voer het telefoonnummer',
		errorLabel: 'Voer tekst'
	},
	"en_us":  {
		submitStatus: 'Submitting...please wait...',
		alertMessage: 'Please correct the errors found with the application.',
		resumeLabel: 'Attach or paste resume',
		firstNameLabel: 'Enter first name',
		lastNameLabel: 'Enter last name',
		emailLabel: 'Enter valid email address',
		cityLabel: 'Enter City',
		stateLabel: 'Enter State',
		postalLabel: 'Enter postal code',
		phoneLabel: 'Enter phone number',
		errorLabel: 'Enter text'
	}
};

var resumator_errors, curLanguage;

function send_form(btn){
	checkAddress();

    // remove all previous error messages
    $(".resumator_label_error").remove();

	if( check_submission_form() ){
		$("#resumator-cancel-resume").remove();

			$("#resumator-manual-upload,#resumator-submit").html(curLanguage.submitStatus);

		$('.resumator-questionnaire-checkbox').each(function() {
			var box = $(this);
			var input = box.val()+'-||-';
			var parent = (typeof DV_RESPONSIVE_LAYOUT !== 'undefined' && DV_RESPONSIVE_LAYOUT) ? '.form-group' : '.resumator-input';
			var hidden_field = box.closest(parent).find('.resumator-questionnaire-checkbox-answer');
			if( box.is(':checked') ){
				hidden_field.val( hidden_field.val() + input );
			}else{
				hidden_field.val( hidden_field.val().replace(input,'') );
			}
		});
		$("#form_submit_new_resume").submit();
	}else{
		return false;
	}
}

function check_submission_form(){
	if (typeof DV_RESPONSIVE_LAYOUT !== 'undefined' && DV_RESPONSIVE_LAYOUT) {
		var resumatorErrors = false,
			scroll          = true,
			emailRegex      = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		$('.control-label').each(function() {
			var $label = $(this);

			if ($label.find('.asterisk').length) {
				var $formGroup = $label.closest('.form-group'),
					$input 	   = $formGroup.find('.form-control, .resumator-file-field'),
					error      = true;

				switch ($label.attr('id')) {
					case 'resumator-resume-label':
						error = $.trim($("#resumator-resume-value").val()) == '' && $.trim($("#resumator-resumetext-value").val()) == '';
						break;
					case 'resumator-address-label':
						$input.each(function() {
							error = error && $.trim($(this).val()) == '';
						});
						break;
					case 'resumator-email-label':
						var value = $.trim($input.val());
						error = value == '' || !emailRegex.test(value);
						break;
					case 'resumator-phone-label':
						var value = $input.val().replace(/[^0-9]/g, '');
						error = value.length < 7;
						break;
					case 'resumator-felonyexplain-label':
						var felonyValue = $('#resumator-felony-value').val(); // 0 - no answer, 1 - no, 2 - yes
						error = felonyValue == 2 && value == '';
						break;
					default:
						if ($input.length !== 0) {
							error = $.trim($input.val()) == '';
						} else {
							// case for required custom questionnaire checkboxes
							error = $formGroup.find('.resumator-questionnaire-checkbox:checked').length == 0;
						}
						break;
				}

				if (error) {
					$formGroup.addClass('has-error');
					resumatorErrors = true;

					if (scroll) {
						// scroll to first invalid field
						$('html, body').animate({
							scrollTop: $formGroup.offset().top - 20
						}, 200);
						scroll = false;
					}
				} else {
					$formGroup.removeClass('has-error');
					resumatorErrors = resumatorErrors || false;
				}
			}
		});

		// special, ugly case for EEOC disability status
		if ($("[name='resumator-eeoc_disability-value']:checked").val() > 0) {
			var $disabilitySignature = $('#disability-signature-area');

			if ($('#resumator-eeoc_disability_signature-value').val().trim() == '' || $('#resumator-eeoc_disability_date-value').val().trim() == '') {
				$disabilitySignature.addClass('has-error');
				resumatorErrors = true;
			}

			if (scroll) {
				$('html, body').animate({
					scrollTop: $disabilitySignature.offset().top - 20
				}, 200);
			}
		}

		// Check captcha
		if (typeof $('#g-recaptcha-response').val() != 'undefined' && $('#g-recaptcha-response').val() == '') {
			resumatorErrors = true;

			if ($('#recaptcha-required-error').length == 0) {
				$('<div id="recaptcha-required-error" class="dv_error"><span>Please verify.</span></div>').insertAfter('#resumator-recaptcha-label');
			}
		}

		if (resumatorErrors) {
			return false;
		} else {
			return true;
		}
	} else {
		resumator_errors = false;
		resumator_firstname = $("#resumator-firstname-value").attr("value");
		resumator_lastname = $("#resumator-lastname-value").attr("value");
		resumator_email = $("#resumator-email-value").attr("value");
		resumator_city = $("#resumator-city-value").attr("value");
		resumator_state = $("#resumator-state-value").attr("value");
		resumator_postal = $("#resumator-postal-value").attr("value");
		resumator_phone = $("#resumator-phone-value").attr("value");
		resumator_address = $("#resumator-address-value").attr("value");
		resumator_file = $("#resumator-resume-value").attr("value");
		resume_text = $("#resumator-resumetext-value").attr("value");
		resume_manual = $("#manual").attr("value");
		eeoc_disability = $("#resumator-eeoc_disability-value:checked").attr("value");
		eeoc_signature = $("#resumator-eeoc_disability_signature-value").attr("value");
		eeoc_date = $("#resumator-eeoc_disability_date-value").attr("value");

        var resume_html = $('#resumator-resume-label').html();
        var resume_required = (resume_html !== null && resume_html.indexOf('*') !== -1);

		if( resume_required && resumator_file == "" && $.trim(resume_text).length == 0 && resume_manual != 'true'){
			add_error("#resumator-resume-label", curLanguage.resumeLabel);
		}
		if( resumator_firstname == "" ){
			add_error("#resumator-firstname-label", curLanguage.firstNameLabel);
		}
		if( resumator_lastname == "" ){
			add_error("#resumator-lastname-label", curLanguage.lastNameLabel);
		}
		if( resumator_email == "" ){
			add_error("#resumator-email-label", curLanguage.emailLabel);
		}
		if( DV_ADDRESS_MANDATORY ){
			if( resumator_city == "" ){
				add_error("#resumator-address-label", curLanguage.cityLabel);
			}
			if( resumator_state == "" ){
				add_error("#resumator-address-label", curLanguage.stateLabel);
			}
			if( resumator_postal == "" ){
				add_error("#resumator-address-label", curLanguage.postalLabel);
			}
		}
		if( resumator_phone == "" && resume_manual != 'true' ){
			add_error("#resumator-phone-label", curLanguage.phoneLabel);
		}
		if ( eeoc_disability > 0 ){
			if ( eeoc_signature == "" ){
				add_error("#eeoc_disability_signature-label", curLanguage.errorLabel);
			}
			if ( eeoc_date == "" ){
				add_error("#eeoc_disability_date-label", curLanguage.errorLabel);
			}
		}

		// Check captcha
		if (typeof $('#g-recaptcha-response').val() != 'undefined' && $('#g-recaptcha-response').val() == '') {
			resumator_errors = true;

			if ($('#recaptcha-required-error').length == 0) {
				$('<div id="recaptcha-required-error" class="dv_error"><span>Please verify.</span></div>').insertAfter('#resumator-recaptcha-label');
			}
		}

		if( resumator_errors ){
			if( resumator_address == "" ){
				$("#resumator-address-value").attr("value", "Address");
			}
			if(dv_language == 'es' || dv_language == 'nl'){ // Some sort of catch all where language is not set properly
				$('.resumator_label_error').html(curLanguage.errorLabel);
			}
			alert(curLanguage.alertMessage);
			return false;
		}else{
			return true;
		}
	}
}

function checkAddress(){
	// Store address values
	resumator_address = $("#resumator-address-value").attr("value");
	resumator_city = $("#resumator-city-value").attr("value");
	resumator_state = $("#resumator-state-value").attr("value");
	resumator_postal = $("#resumator-postal-value").attr("value");
	// Remove placeholder text (plugin does not perform on IE)
	if( resumator_address == "Address" ){ $("#resumator-address-value").attr("value",""); }
	if( resumator_city == "City" ){ $("#resumator-city-value").attr("value",""); }
	if( resumator_state == "State" ){ $("#resumator-state-value").attr("value",""); }
	if( resumator_postal == "Postal" ){ $("#resumator-postal-value").attr("value",""); }
}

function check_email(email_address) {
	if(email_address.search(/^[a-zA-Z0-9_\+]+((-[a-zA-Z0-9_\+]+)|(\.[a-zA-Z0-9_\+]+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) == -1) {
		return false;
	}else{
		return true;
	}
}

function add_error( label, msg ){
    $(label).append(' <span class="resumator_label_error" style="color: #f00 !important;">'+msg+'.</span>');
    resumator_errors = true;
}

function get_base_domain(hostname) {
	if(!hostname) {
		hostname = document.location.hostname;
	}
	if(hostname == 'localhost') {
		return hostname;
	}
	var host_parts = hostname.split('.');
	var l = host_parts.length;
	return host_parts[l-2] + '.' + host_parts[l-1];
}
// the parent and child document.domain must match. They can only be set to a subset of the original hostname, so we set cmsprep.theresumator.com to theresumator.com
document.domain = get_base_domain();
