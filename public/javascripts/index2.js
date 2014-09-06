$(function() {
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style')
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      )
      document.querySelector('head').appendChild(msViewportStyle)
    }

    var success = 'Success! Your username has been reserved. Confirmation has been sent to ';
	// Handle the form submition
    $('.email-form').submit(function(event) {
        event.preventDefault();
        var $form = $(this);
        
        $.ajax({
            type: "POST",
            url: '/process/username',
            data: $form.serialize(),
            success: function(data, textStatus, xhr) {
                if (data.error) {
                    $('.error-message').html(data.error).removeClass('hidden');
                    $form.find('input').addClass('error');
                } else {
                    // Success, display sharing options and success screen                   
                    $('.error-message').html(success + "'" + $form.find('input.email-input').val() + "'");
                    $form.fadeOut(function() {
                        $('.social-container').removeClass('hidden');
                        $('.error-message').removeClass('hidden');
                    });
                    $('.error-message').addClass('success');

                    //Firefox issue
                    $('.social-container .fb-like span').height(30);
                    $('.social-container .fb-like iframe').height(30);
                    ga('send', 'pageview', 'success');
                }
            },
            error: function() {

            }
        });
    });

    // Remove the error class (if any) when the user input changes. Also remove any error messages.
    $('input').change(function() {
        clear_error($(this).parent('form'));
    });

    $('#learnModal a.reserve').click(function() {
        $('#learnModal').modal('hide');
    });

});

function clear_error(form) {
    console.log('clear error');
	form.find('input').removeClass('error');
	$('.error-message').html('').addClass('hidden');
}