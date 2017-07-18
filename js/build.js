Fliplet.Widget.instance('sso-saml', function (data) {
  $(this).click(function (event) {
    event.preventDefault();

    if (!data.passportType) {
      return alert('The SSO provider has not been configured');
    }

    var ssoProviderPackageName = 'com.fliplet.sso.' + data.passportType;
    var ssoProvider = Fliplet.Widget.get(ssoProviderPackageName);

    if (!ssoProvider || typeof ssoProvider.authorize !== 'function') {
      alert('The provider ' + ssoProviderPackageName + ' has not been configured on this app.');
      throw new Error('Provider ' + ssoProviderPackageName + ' has not registered on Fliplet.Widget.register with an "authorize()" function.');
    }

    if (!data.redirectAction) {
      alert('Please set up a navigation action to be fired on successful sign in.');
    }

    ssoProvider
      .authorize()
      .then(function onAuthorized() {
        Fliplet.Navigate.to(data.redirectAction);
      })
      .catch(function onError(err) {
        // woop woop
        console.error(err);
        alert(err);
      })
  });
})