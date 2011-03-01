$.widget("ui.drawer", {
  options: {
    verticalMargin: 10,
    throttleOrDebounce: 'debounce',
    delay: 100,
    resizeOnInit: true
  },
  _create: function() {
    $(window).bind('scroll resize', this._windowObserver());
    if (this.options.resizeOnInit) {
      return this.redraw();
    }
  },
  _windowObserver: function() {
    _.bindAll(this, 'redraw');
    if (this.options.throttleOrDebounce === 'debounce') {
      return $.debounce(this.options.delay, this.redraw);
    } else {
      return $.throttle(this.options.delay, this.redraw);
    }
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
    if (_.isFunction(this.options.resize)) {
      this.element.css({
        top: drawerTop
      });
      return this.options.resize(this.element, drawerHeight);
    } else {
      return this.element.css({
        top: drawerTop,
        height: drawerHeight
      });
    }
  }
});