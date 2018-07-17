Fliplet.Widget.instance('sso-saml', function(data) {
  var $btn = $(this);
  var $error = $('.sso-error-holder');

  var buttonLabel = $btn.text();

  $btn.text('Please wait...').addClass('disabled');

  // Load session and prepare cookie
  Fliplet.Session.get().then(function () {
    $btn.text(buttonLabel).removeClass('disabled');
  }).catch(function (err) {
    $btn.text(buttonLabel).removeClass('disabled');
    console.error('Could not load the session', err);
    $error.html(err.message || err.description || 'Please make sure you\'re connected to the internet before logging in.');
    $error.removeClass('hidden');
  });

  $btn.click(function(event) {
    event.preventDefault();

    if (!data.passportType || !data.redirectAction) {
      console.warn('Incomplete component configuration');
      return;
    }

   $error.addClass('hidden');

    var ssoProviderPackageName = 'com.fliplet.sso.' + data.passportType;
    var ssoProvider = Fliplet.Widget.get(ssoProviderPackageName);

    if (!ssoProvider || typeof ssoProvider.authorize !== 'function') {
      throw new Error('Provider ' + ssoProviderPackageName + ' has not registered on Fliplet.Widget.register with an "authorize()" function.');
    }

    ssoProvider
      .authorize(data)
      .then(function onAuthorized() {
        $btn.addClass('hidden');
        $('.sso-confirmation').fadeIn(250, function() {
          setTimeout(function() {
            Fliplet.Navigate.to(data.redirectAction);
          }, 100);
        });
      })
      .catch(function onError(err) {
        console.error(err);
        $error.html(err);
        $error.removeClass('hidden');
      });
  });
});
