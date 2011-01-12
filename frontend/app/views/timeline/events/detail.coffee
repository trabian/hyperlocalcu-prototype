define ["text!views/timeline/events/detail.handlebars?v=3", "app/views/common/social/social_view", "app/views/common/feedback/feedback_view", "vendor/handlebars"], (template, SocialView, FeedbackView) ->

  class EventDetailView extends Backbone.View

    events:
      "click .close": "close"

    template: Handlebars.compile(template)

    eventTypeTemplate: null

    close: =>
      @model.set 'selected': false

    render: =>

      detailJSON = @model.toDetailJSON()

      $(@el).html @template(detailJSON)

      if @model.isSocial()
        @socialView = new SocialView
          model: @model

        $(@el).append @socialView.render().el

      if @eventTypeTemplate?
        $(@el).append @eventTypeTemplate(detailJSON)

      if @model.get('vendor')?
        @feedbackView = new FeedbackView
          model: @model
          subject: @model.get('vendor')

        $(@el).append @feedbackView.render().el

      this.show()

    show: ->

      this.trigger('show')

      $(@el).show()

    hide: ->

      this.trigger('hide')

      $(@el).empty().hide()
