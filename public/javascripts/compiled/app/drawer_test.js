$(function() {
  var count, debounced, drawer, main, options, redraw, throttled;
  count = 0;
  options = {
    drawerMargin: 10,
    borderHeight: 2
  };
  main = $('#main');
  drawer = $('#event-detail-view');
  redraw = function() {
    var drawerHeight, drawerTop, mainHeight, mainTop, visibleMainHeight, windowHeight, windowScrollTop;
    drawerTop = 0;
    drawerHeight = 0;
    mainTop = main.position().top;
    mainHeight = main.height();
    windowScrollTop = $(window).scrollTop();
    windowHeight = $(window).height();
    if (mainTop > windowScrollTop) {
      drawerTop = mainTop + options.drawerMargin;
      drawerHeight = windowHeight - (drawerTop - windowScrollTop) - (options.drawerMargin * 2);
      drawerHeight = Math.min(drawerHeight, mainHeight - (options.drawerMargin * 3));
    } else {
      drawerTop = windowScrollTop + options.drawerMargin;
      visibleMainHeight = mainTop + mainHeight - windowScrollTop;
      drawerHeight = Math.min(windowHeight, visibleMainHeight) - (options.drawerMargin * 3) - options.borderHeight;
    }
    return drawer.css({
      'top': drawerTop,
      'height': drawerHeight
    });
  };
  throttled = $.throttle(100, redraw);
  debounced = $.debounce(100, redraw);
  $(window).bind('scroll resize', throttled);
  return $(window).trigger('scroll');
});