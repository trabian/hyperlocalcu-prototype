define ["text!views/timeline/events/detail.handlebars?v=7", "app/views/common/social/social_view", "app/views/common/feedback/feedback_view", "vendor/handlebars"], (template, SocialView, FeedbackView) ->

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

      this.show()

    show: ->

      this.trigger('show')

      $(@el).show()

    hide: ->

      this.trigger('hide')

      $(@el).empty().hide()

    addFeedbackView: (subject_types...) =>
      _.each subject_types, (subject_type) =>

        feedback = @model.feedbacks.for_subject(subject_type)

        if feedback?
          @feedbackView = new FeedbackView
            model: feedback
            question: @model.feedbackQuestion

          @detail.append @feedbackView.render().el
