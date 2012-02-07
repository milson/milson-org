---
  title: Branding
  id: branding
---

Presently, this site is branded for ACME.

Hopefully your company isn't called ACME, however.

There are a number of files that you should change to reflect your brand.

  * `src/index.jade` - the wireframe that holds the site - title, header, footer
  * `src/stylesheets/layout.less` - the color scheme, fonts, etc
  * `src/static/favicon.ico` - the icon that shows up in a browser tab
  * `src/static/images/logo.png` - the icon that shows up in a browser tab
  * `src/lib/index.js` - the JavaScript that controlls the menu system

### jade

`jade` is an HTML preprocessor.

It allows us to create a very simple site from somewhat dynamic content (like PHP),
but jade is done right. It only runs when building the site, not when someone visits
the site.

You can host a site built with jade (or haml) or your server as regular files, without
any special considerations. It can also be hosted for free through GitHub pages.

### less

`less` is a CSS preprocessor.

It makes it easy to compile multiple less sheets into a single css document.

Because it supports variables, it's also easy to recomplie a site with a 
different theme editing a single document.


### pakmanager

`pakmanager` is a JavaScript preprocessor.

It uses normal JavaScript, but also provides the CommonJS module functionality
through `require`. You can use it to install freely available JavaScript modules
directly from `npm`.
