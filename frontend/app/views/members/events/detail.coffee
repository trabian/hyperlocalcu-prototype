define ["text!views/timeline/events/detail.handlebars?v=8", "app/views/common/social/social_view", "app/views/common/feedback/feedback_view", "app/views/common/feedback/rating_view", "vendor/handlebars"], (template, SocialView, FeedbackView, RatingView) ->

  class EventDetailView extends Backbone.View

    events:
      "click .close": "close"

    template: Handlebars.compile(template)

    initialize: ->
      if @eventTypeOptions? and @eventTypeOptions.events?
        this.delegateEvents(@eventTypeOptions.events)


    close: =>
      @model.set 'selected': false

    render: =>

      mpq.push ["track", "View event detail", {
        event_type: @model.get('event_type')
        id: @model.id
      }]

      @model.initializeDetails()

      detailJSON = @model.toDetailJSON()

      $(@el).html @template(detailJSON)

      @detail = this.$('#event-detail')

      if @model.isSocial()
        @socialView = new SocialView
          model: @model

        @detail.append @socialView.render().el

      if @eventTypeOptions? and @eventTypeOptions.template?
        @detail.append @eventTypeOptions.template(detailJSON)

      if @renderDetail?
        this.renderDetail()

      if @model.isDeposit()
        @detail.addClass('deposit')

      if @model.get('merchant')?
        this.addMerchantFeedbackView()

      this.show()

    show: ->

      this.trigger('show')

      $(@el).show()

    hide: ->

      this.trigger('hide')

      $(@el).empty().hide()

    addMerchantFeedbackView: =>

      feedback = @model.feedbacks.for_subject('merchant')

      if feedback?

        @merchantDetails = @detail.find('.address')

        @merchantRatingView = new RatingView
          model: feedback
          commentParent: @merchantDetails
          commentFormTitle: "Care to elaborate?"


        @merchantDetails.append @merchantRatingView.render().el

    addFeedbackView: (subject_types...) =>
      _.each subject_types, (subject_type) =>

        feedback = @model.feedbacks.for_subject(subject_type)

        if feedback?
          @feedbackView = new FeedbackView
            model: feedback
            question: @model.feedbackQuestion

          @detail.append @feedbackView.render().el
