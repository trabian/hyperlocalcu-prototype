$.widget "ui.drawer",
  
  options:
    verticalMargin: 10
    throttleOrDebounce: 'debounce'
    delay: 100
    resizeOnInit: true

  _create: ->

    $(window).bind 'scroll resize', this._windowObserver()

    this.redraw() if @options.resizeOnInit

  _windowObserver: ->

    _.bindAll this, 'redraw'

    if @options.throttleOrDebounce is 'debounce'
      $.debounce @options.delay, @redraw
    else
      $.throttle @options.delay, @redraw

  redraw: ->

    drawerTop = 0
    drawerHeight = 0

    mainTop = @options.main.position().top
    mainHeight = @options.main.height()
    windowScrollTop = $(window).scrollTop()
    windowHeight = $(window).height()
    padding = parseInt(this.element.css('padding-top')) + parseInt(this.element.css('padding-bottom'))

    if mainTop > windowScrollTop

      drawerTop = mainTop + @options.verticalMargin

      drawerHeight = windowHeight - (drawerTop - windowScrollTop) - @options.verticalMargin

      drawerHeight = Math.min drawerHeight, mainHeight - (@options.verticalMargin * 2)

    else

      drawerTop = windowScrollTop + @options.verticalMargin

      visibleMainHeight = mainTop + mainHeight - windowScrollTop

      drawerHeight = Math.min(windowHeight, visibleMainHeight) - (@options.verticalMargin * 2)

    drawerHeight -= padding

    if _.isFunction @options.resize

      this.element.css
        top: drawerTop

      @options.resize this.element, drawerHeight

    else
      this.element.css
        top: drawerTop
        height: drawerHeight
