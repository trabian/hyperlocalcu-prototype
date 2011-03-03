$.widget "ui.drawer",
  
  options:
    verticalMargin: 10
    throttleOrDebounce: 'debounce'
    delay: 100
    resizeOnInit: true
    scrollShim: 17

  _create: ->

    $(window).bind 'scroll resize', this._windowObserver()

    this.redraw() if @options.resizeOnInit

  _windowObserver: ->

    _.bindAll this, 'redraw', 'show'

    if @options.throttleOrDebounce is 'debounce'
      $.debounce @options.delay, @redraw
    else
      $.throttle @options.delay, @redraw

  show: ->
    this.element.show().trigger('show')
    this.initializeScrollable()
    this.redraw()

  hide: ->
    this.element.hide().trigger('hide')

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

    this.element.css
      top: drawerTop

    this.resizeScrollable drawerHeight

  resizeScrollable: (height) ->

    this.initializeScrollable() unless @scrollableInitialized?

    scrollHeight = height - @options.scrollShim

    if @header.is(':visible')
      scrollHeight -= @header.outerHeight()

    if @footer.is(':visible')
      scrollHeight -= @footer.outerHeight()

    scrollHeight = Math.max 0, scrollHeight

    @scrollable.css
      height: scrollHeight

    @scroll.reinitialise()

  initializeScrollable: ->

    this.element.find('.close').click =>
      this.hide()
      return false

    @header = this.element.find('.header')
    @scrollable = this.element.find('.scrollable')
    @footer = this.element.find('.footer')

    @scrollable.jScrollPane()
    @scroll = @scrollable.data('jsp')

    @scrollableInitialized = true

