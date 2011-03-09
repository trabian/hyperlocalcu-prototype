class App.view.EventDetail extends Backbone.View

  templatePath: 'events/detail'

  initialize: ->

  setModel: (model) ->

    @model = model

    @eventTypeView = App.view.EventDetailFactory.getEventDetailView @model, this

  render: =>

    $(@el).html App.templates[@templatePath](@model.toDetailJSON())

    if @eventTypeView?.render?
      this.$('#event-detail').append @eventTypeView.render().el

    this.decorate()

    this.renderSocialView() if @model.isSocial()

    @model.feedbacks.fetchIfNeeded
      success: (collection, response) =>
        @eventTypeView?.renderFeedback?()
        this.resize()

    return this

  decorate: =>
    $(@el).toggleClass 'deposit', @model.isDeposit()

  renderSocialView: =>

    @socialView = new App.view.Social
      model: @model

    this.$('.footer').append(@socialView.render().el).show()

  renderLocationFeedbackView: (field, options) =>

    feedback = @model.feedbacks.for_subject(field)

    if feedback?

      addressEl = this.$('.location .address')

      ratingViewOptions = _.extend
        model: feedback
        commentParent: addressEl
        commentFormTitle: "Care to elaborate?"
      , options

      locationRatingView = new App.view.Rating ratingViewOptions

      locationRatingView.bind 'expand', @resize
      locationRatingView.bind 'collapse', @resize

      addressEl.append locationRatingView.render().el

      #@feedbackSummaryView = new App.view.FeedbackSummary

      #@addressEl.append @feedbackSummaryView.render().el

  resize: =>
    this.trigger 'resize'

  addSubjectFeedbackView: (subject_types...) =>
    _.each subject_types, (subject_type) =>

      feedback = @model.feedbacks.for_subject(subject_type)

      if feedback?

        feedbackView = new App.view.Feedback
          model: feedback
          question: @model.feedbackQuestion

        feedbackView.bind 'expand', @resize
        feedbackView.bind 'collapse', @resize

        this.$('#event-detail').append feedbackView.render().el
