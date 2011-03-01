class App.view.EventDetail extends Backbone.View

  events:
    "click .close": "close"

  templatePath: 'members/events/detail'

  initialize: ->

    if @eventTypeOptions?
      if @eventTypeOptions.events?
        this.delegateEvents(@eventTypeOptions.events)
      if @eventTypeOptions.templatePath?
        @eventTypeOptions.template = App.templates[@eventTypeOptions.templatePath]

    $(window).bind 'resize', @resize

    count = 0

    throttled = $.throttle 250, ->
      console.log 'scroll', count++

    $(window).bind 'scroll', throttled

  close: =>
    @model.set 'selected': false
    this.hide()
    false

  render: =>

    mpq.push ["track", "View event detail", {
      event_type: @model.get('event_type')
      id: @model.id
    }]

    @model.initializeDetails()

    detailJSON = @model.toDetailJSON()

    $(@el).html App.templates[@templatePath](detailJSON)

    @header = this.$('#event-header')
    @detail = this.$('#event-detail')
    @wrapper = this.$('#event-detail-wrapper')
    @footer = this.$('#event-footer')

    if @model.isSocial()
      @footer.show()
      @socialView = new App.view.Social
        model: @model

      @footer.append @socialView.render().el

    if @eventTypeOptions? and @eventTypeOptions.template?
      @detail.append @eventTypeOptions.template(detailJSON)

    this.show()

    @wrapper.jScrollPane()

    if @renderDetail?
      this.renderDetail()

    if @model.isDeposit()
      @header.addClass('deposit')

    if @model.get('merchant')?
      this.addLocationFeedbackView 'merchant',
        include_summary_view: true

    @scroll = @wrapper.data('jsp')

    return this

  resize: =>

    shim = 40 

    if @footer.is(':visible')
      shim = shim + @footer.innerHeight() 

    heightOffset = shim + parseInt($(@el).offset().top) + parseInt(@header.css('height'))

    height = $(window).height() - heightOffset

    @wrapper.height(Math.min(height, @maxHeight))

    if $.browser.ie

      if !throttleTimeout
        setTimeout =>
          @scroll.reinitialise()
          throttleTimeout = null
        , 50

    else
      @scroll.reinitialise()

  show: ->

    this.trigger('show')

    #$(@el).waypoint('destroy').waypoint(@adjustPosition).waypoint
      #offset: 10

    $(@el).show()

  hide: ->

    this.trigger('hide')

    #$(@el).waypoint 'destroy'

    $(@el).empty().hide()

  adjustPosition: (element, direction) =>

    if direction is 'down'
      $(@el).addClass('fixed')
    else
      $(@el).removeClass('fixed')

    this.resize()

  addLocationFeedbackView: (field, options) =>

    feedback = @model.feedbacks.for_subject(field)

    if feedback?

      @addressEl = @detail.find('.address')

      ratingViewOptions = _.extend
        model: feedback
        commentParent: @addressEl
        commentFormTitle: "Care to elaborate?"
      , options

      @locationRatingView = new App.view.Rating ratingViewOptions

      @locationRatingView.bind 'expand', @resize
      @locationRatingView.bind 'collapse', @resize

      @addressEl.append @locationRatingView.render().el

      @feedbackSummaryView = new App.view.FeedbackSummary

      @addressEl.append @feedbackSummaryView.render().el

  addFeedbackView: (subject_types...) =>
    _.each subject_types, (subject_type) =>

      feedback = @model.feedbacks.for_subject(subject_type)

      if feedback?
        @feedbackView = new App.view.Feedback
          model: feedback
          question: @model.feedbackQuestion

        @feedbackView.bind 'expand', @resize
        @feedbackView.bind 'collapse', @resize

        @detail.append @feedbackView.render().el
