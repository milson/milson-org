(function() {
  "use strict";
  var $ = require('ender')
    , forEachAsync = require('forEachAsync')
    , marginOffset = 59
    , scrollWait = 50
    , lastScroll
    , in_menus
    , allMenuItems
    ; 

  function menuStick() {
    if(scrollWait > Date.now() - lastScroll) {
      return;
    }
    lastScroll = Date.now();

    var scrollIndex = $('body').scrollTop();
    if(scrollIndex > 98) {
      $('.menu').addClass('sticky');
    } else {
      $('.menu').removeClass('sticky');
    }

    in_menus.some(function(element, index) {
      var menuItem = $('[href="#' + element.id + '"]')
        , realItem = $('#' + element.id)
        ;

      // if not in view or is already selected
      if(scrollIndex > realItem.offset().top + realItem.offset().height + marginOffset
      || scrollIndex < realItem.offset().top || menuItem.hasClass('active')) {

        return false;

      } 

      allMenuItems.removeClass('active');
      showSub(menuItem);
      menuItem.addClass('active');


      return true;
    });
  }

// TODO change theAwesomeness to a .dataset attribute.
  function showSub(anchorEl) {
    // if it is a menu major and it already has the class then it is already expanded
    // do nothing.
    if(anchorEl.closest('li').hasClass('menu_major')) {
      if(!anchorEl.hasClass('active')) {
        console.log('hiding 52');
        $('.menu_major ul').hide();
        anchorEl.siblings('ul').show();
        anchorEl.closest('li').addClass('theAwesomeness');
      }
      // do nothing
      return;
    //  showSub(element);
    }

    if(!anchorEl.closest('.menu_major').hasClass('theAwesomeness')) {
      console.log('our master doesnt have the awesomeness.');

      $('.menu_major').removeClass('theAwesomeness');
      anchorEl.closest('.menu_major').addClass('theAwesomeness');

      console.log('Hiding #68');
      $('.menu_major ul').hide();
      anchorEl.closest('ul').show();
    }
    


    //  showSub(menuItem.closest('.menu_major'));
    // if we are changing the active class on the parent major menu then hide all and show one.

    //$(element).children('ul').show();
  }

  function assignHandlers() {
    window.onscroll = menuStick;
    in_menus = [];

    $('.in_menu').forEach(function (el, i) {
      in_menus[i] = el;
    });

    $('.menu_major ul').hide();
    lastScroll = Date.now();

    allMenuItems = $('.menu li a');
  }

  $.domReady(assignHandlers);

}());
