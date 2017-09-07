Fliplet.Widget.instance('sso-saml', function(data) {
  // Load session and prepare cookie
  Fliplet.Session.get();
  $('.sso-login').fadeIn(250);

  $(this).click(function(event) {
    event.preventDefault();

    $('.sso-error-holder').addClass('hidden');
    $('.sso-error-warning').addClass('hidden');
    $('.sso-error-warning').html('');

    if (!data.passportType) {
      $('.sso-error-holder').append('- The single sign-on provider has not been configured.<br>');
      $('.sso-error-warning').removeClass('hidden');
      return;
    }

    var ssoProviderPackageName = 'com.fliplet.sso.' + data.passportType;
    var ssoProvider = Fliplet.Widget.get(ssoProviderPackageName);

    if (!ssoProvider || typeof ssoProvider.authorize !== 'function') {
      $('.sso-error-holder').append('- The provider ' + ssoProviderPackageName + ' has not been configured on this app.<br>');
      $('.sso-error-warning').removeClass('hidden');

      throw new Error('Provider ' + ssoProviderPackageName + ' has not registered on Fliplet.Widget.register with an "authorize()" function.');
    }

    if (!data.redirectAction) {
      $('.sso-error-holder').append('- Please set up a navigation action to be fired on successful sign in.<br>');
      $('.sso-error-warning').removeClass('hidden');
      return;
    }

    ssoProvider
      .authorize()
      .then(function onAuthorized() {
        $('.sso-login').hide();
        $('.sso-confirmation').fadeIn(250);
      })
      .catch(function onError(err) {
        // woop woop
        console.error(err);
        $('.sso-error-holder').html(err);
        $('.sso-error-holder').removeClass('hidden');
      });
  });

  $('[data-sso-redirect]').on('click', function() {
    event.preventDefault();

    Fliplet.Navigate.to(data.redirectAction);
  });
});
