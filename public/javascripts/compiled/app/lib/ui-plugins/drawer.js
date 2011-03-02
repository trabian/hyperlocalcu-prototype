var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
$.widget("ui.drawer", {
  options: {
    verticalMargin: 10,
    throttleOrDebounce: 'debounce',
    delay: 100,
    resizeOnInit: true,
    scrollShim: 17
  },
  _create: function() {
    $(window).bind('scroll resize', this._windowObserver());
    if (this.options.resizeOnInit) {
      return this.redraw();
    }
  },
  _windowObserver: function() {
    _.bindAll(this, 'redraw', 'show');
    if (this.options.throttleOrDebounce === 'debounce') {
      return $.debounce(this.options.delay, this.redraw);
    } else {
      return $.throttle(this.options.delay, this.redraw);
    }
  },
  show: function() {
    this.element.show().trigger('show');
    this.initializeScrollable();
    return this.redraw();
  },
  hide: function() {
    return this.element.hide().trigger('hide');
  },
  redraw: function() {
    var drawerHeight, drawerTop, mainHeight, mainTop, padding, visibleMainHeight, windowHeight, windowScrollTop;
    drawerTop = 0;
    drawerHeight = 0;
    mainTop = this.options.main.position().top;
    mainHeight = this.options.main.height();
    windowScrollTop = $(window).scrollTop();
    windowHeight = $(window).height();
    padding = parseInt(this.element.css('padding-top')) + parseInt(this.element.css('padding-bottom'));
    if (mainTop > windowScrollTop) {
      drawerTop = mainTop + this.options.verticalMargin;
      drawerHeight = windowHeight - (drawerTop - windowScrollTop) - this.options.verticalMargin;
      drawerHeight = Math.min(drawerHeight, mainHeight - (this.options.verticalMargin * 2));
    } else {
      drawerTop = windowScrollTop + this.options.verticalMargin;
      visibleMainHeight = mainTop + mainHeight - windowScrollTop;
      drawerHeight = Math.min(windowHeight, visibleMainHeight) - (this.options.verticalMargin * 2);
    }
    drawerHeight -= padding;
    this.element.css({
      top: drawerTop
    });
    return this.resizeScrollable(drawerHeight);
  },
  resizeScrollable: function(height) {
    var scrollHeight;
    if (this.scrollableInitialized == null) {
      this.initializeScrollable();
    }
    scrollHeight = height - this.options.scrollShim;
    if (this.header.is(':visible')) {
      scrollHeight -= this.header.outerHeight();
      console.log('header', this.header.outerHeight());
    }
    if (this.footer.is(':visible')) {
      scrollHeight -= this.footer.outerHeight();
      console.log('footer', this.header.outerHeight());
    }
    scrollHeight = Math.max(0, scrollHeight);
    this.scrollable.css({
      height: scrollHeight
    });
    return this.scroll.reinitialise();
  },
  initializeScrollable: function() {
    this.element.find('.close').click(__bind(function() {
      this.hide();
      return false;
    }, this));
    this.header = this.element.find('.header');
    this.scrollable = this.element.find('.scrollable');
    this.footer = this.element.find('.footer');
    this.scrollable.jScrollPane();
    this.scroll = this.scrollable.data('jsp');
    return this.scrollableInitialized = true;
  }
});