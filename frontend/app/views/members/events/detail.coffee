define ["text!views/timeline/events/detail.handlebars?v=3", "app/views/common/social/social_view", "app/views/common/feedback/feedback_view", "vendor/handlebars"], (template, SocialView, FeedbackView) ->

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

      detailJSON = @model.toDetailJSON()

      $(@el).html @template(detailJSON)

      if @model.isSocial()
        @socialView = new SocialView
          model: @model

        $(@el).append @socialView.render().el

      if @eventTypeOptions? and @eventTypeOptions.template?
        $(@el).append @eventTypeOptions.template(detailJSON)

      this.addFeedbackView 'vendor', 'teller'

      if @renderDetail?
        this.renderDetail()

      this.show()

    show: ->

      this.trigger('show')

      $(@el).show()

    hide: ->

      this.trigger('hide')

      $(@el).empty().hide()

    addFeedbackView: (fields...) =>
      _.each fields, (field) =>
        if @model.get(field)?
          @feedbackView = new FeedbackView
            model: @model
            subject: @model.get(field)
            fieldPrefix: field

          $(@el).append @feedbackView.render().el

          return false
