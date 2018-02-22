Fliplet.Widget.instance('sso-saml', function(data) {
  // Load session and prepare cookie
  Fliplet.Session.get();
  $('.sso-login').fadeIn(250);

  $(this).click(function(event) {
    event.preventDefault();

    if (!data.passportType || !data.redirectAction) {
      console.warn('Incomplete component configuration');
      return;
    }

    $('.sso-error-holder').addClass('hidden');

    var ssoProviderPackageName = 'com.fliplet.sso.' + data.passportType;
    var ssoProvider = Fliplet.Widget.get(ssoProviderPackageName);

    if (!ssoProvider || typeof ssoProvider.authorize !== 'function') {
      throw new Error('Provider ' + ssoProviderPackageName + ' has not registered on Fliplet.Widget.register with an "authorize()" function.');
    }

    ssoProvider
      .authorize(data)
      .then(function onAuthorized() {
        $('.sso-login').hide();
        $('.sso-confirmation').fadeIn(250, function() {
          setTimeout(function() {
            Fliplet.Navigate.to(data.redirectAction);
          }, 100);
        });
      })
      .catch(function onError(err) {
        // woop woop
        console.error(err);
        $('.sso-error-holder').html(err);
        $('.sso-error-holder').removeClass('hidden');
      });
  });
});
