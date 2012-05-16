/*jshint node:true laxcomma:true es5:true laxbreak:true*/
(function() {
  "use strict";
  var $ = require('ender')
    , forEachAsync = require('forEachAsync')
    , domReady = require('domready')
    , marginOffset = 59
    , scrollWait = 50
    , lastScroll
    , contentBlocks
    , allMenuItems
    , allMenus
    ; 

  function menuStick() {
    var scrollIndex = $('body').scrollTop();
    if(scrollIndex > 98) {
      $('.menu').addClass('sticky');
    } else {
      $('.menu').removeClass('sticky');
    }

    if(scrollWait > Date.now() - lastScroll) {
      return;
    }
    lastScroll = Date.now();
    contentBlocks.some(function(element, index) {
      var menuBlock = $('#' + element.dataset.map + '_mwrap ul')
        , content = $('[data-map="' + element.dataset.map +'"]')
        , cTop = content.offset().top - marginOffset
        , cBottom = cTop + content.offset().height + marginOffset// It's faster to do an addition operation here.
        , menuItems
        ;

      // Are we in view?
      if(scrollIndex < cTop || scrollIndex > cBottom) {
        // no, kill execution and move on:
        return false;
      }
      // If we aren't active, expand:
      if(!menuBlock.hasClass('menuOpen')) {
        // If we make it here, it means the content IS in view, and the menu is NOT expanded.
        // Close the others:
        allMenus.removeClass('menuOpen');
        allMenus.hide();
        // Show the current:
        menuBlock.addClass('menuOpen');
        menuBlock.show();
      }

      // Take care of highlighting:
      content.children('.in_menu').each(highlight);
    });

    function highlight(contentNibble, idx) {
      var nibble = $('#' + contentNibble.id)
        , nibbleTop = nibble.offset().top - marginOffset
        , nibbleBottom = nibbleTop + nibble.offset().height + marginOffset
        ;

      if((scrollIndex > nibbleTop && scrollIndex < nibbleBottom)
      && !nibble.hasClass('active')) {
        // If we've made it here, then the menuItem IS in view, and is NOT highlighted.
        allMenuItems.removeClass('active');
        $('[href="#' + contentNibble.id + '"]').addClass('active');
      }
    }
  }



  function chromeRedrawFix() {
    setTimeout(function() {
      var sel = $('.menu')[0];
      sel.style.display = 'none';
      // yes this hack does something
      sel.offsetHeight = sel.offsetHeight;
      sel.style.display = 'block';
    }, 1);
  }

  function assignHandlers() {
    require('window').onscroll = menuStick;
    contentBlocks = [];

    $('.cwrapper').forEach(function(el, i) {
      contentBlocks[i] = el;
    });

    lastScroll = Date.now();

    allMenus = $('.menu_major ul');
    allMenuItems = $('.menu li a');
    allMenus.hide();

    $('.doc_columns').delegate('.menu_column', 'click', chromeRedrawFix);
  }

  domReady(assignHandlers);

}());
