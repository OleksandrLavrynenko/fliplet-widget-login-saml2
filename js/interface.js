Fliplet().then(function() {
  var data = Fliplet.Widget.getData() || {};

  data.passportType = 'saml2';

  $(window).on('resize', Fliplet.Widget.autosize);

  var linkProvider = Fliplet.Widget.open('com.fliplet.link', {
    selector: '#redirectAction',
    data: $.extend(true, {
      action: 'screen',
      page: 'none',
      transition: 'slide.left',
      options: {
        hideAction: true
      }
    }, data.redirectAction)
  });

  var ssoProvider = Fliplet.Widget.open('com.fliplet.sso.' + data.passportType, {
    selector: '#ssoProvider',
    instance: true
  });

  linkProvider.then(function(res) {
    data.buttonLabel = $('[name="buttonLabel"]').val();
    data.redirectAction = res.data;

    Fliplet.Widget.save(data).then(function() {
      Fliplet.Widget.complete();
    });
  });

  ssoProvider.then(function(data) {
    linkProvider.forwardSaveRequest();
  });

  $('form').submit(function(event) {
    event.preventDefault();
    ssoProvider.forwardSaveRequest();
  });

  // Fired from Fliplet Studio when the external save button is clicked
  Fliplet.Widget.onSaveRequest(function() {
    $('form').submit();
  });
});
