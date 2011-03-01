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

    @scroll = @wrapper.data('jsp')

    @model.feedbacks.bind 'refresh', @renderFeedback
    @model.feedbacks.fetch()

    this.trigger 'rendered'

    return this

  renderFeedback: =>

    if @model.get('merchant')?
      this.addLocationFeedbackView 'merchant',
        include_summary_view: true

  resize: (height) =>

    shim = 17

    wrapperHeight = height - shim

    if @header.is(':visible')
      wrapperHeight -= @header.outerHeight()

    if @footer.is(':visible')
      wrapperHeight -= @footer.outerHeight()

    @wrapper.css
      height: Math.max(0, wrapperHeight)

    @scroll.reinitialise()

  show: ->

    this.trigger('show')

    $(@el).show()

  hide: ->

    this.trigger('hide')

    $(@el).empty().hide()

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

      #@locationRatingView.bind 'expand', @resize
      #@locationRatingView.bind 'collapse', @resize

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

        #@feedbackView.bind 'expand', @resize
        #@feedbackView.bind 'collapse', @resize

        @detail.append @feedbackView.render().el
