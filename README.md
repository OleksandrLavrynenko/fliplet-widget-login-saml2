# Fliplet SAML2 SSO Login component

This component relies on https://github.com/Fliplet/fliplet-widget-sso-saml2 to work.

## Test out the integration

1. In your Fliplet app while in Fliplet Studio, drop a **saml2 login component** and use the following Sign-in URL:

```
https://capriza.github.io/samling/samling.html
```

Hit save without adding anything else. Sign-out URL and certificate are not required for this demo.

2. Click the sign in button while in preview mode. You will be redirected to a page looking like this:

<img width="1307" alt="screen shot 2018-11-05 at 15 16 28" src="https://user-images.githubusercontent.com/574210/48003112-c9b97880-e10d-11e8-9e1c-1e9a79e295bf.png">

Type something in the **Name identifier** input, like `Fliplet`, then press **Next** in the top right corner and press **Post Response** right after.

You will be redirected to your Fliplet app within seconds and it will behave as if you logged in with SAML2.
