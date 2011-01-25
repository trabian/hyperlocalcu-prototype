define ["text!views/feedback/form.handlebars?v=4", "app/views/common/feedback/rating_view", "vendor/handlebars", "vendor/jquery-ui"], (template, RatingView) ->

  class FeedbackView extends Backbone.View

    tagName: 'div'

    className: 'feedback'

    template: Handlebars.compile(template)

    initialize: (options)->

      super(options)

      @subject = @model.subject

    render: ->

      $(@el).html @template(
        avatar: @subject.get('avatar')
        question: @model.feedbackQuestion || @subject.question
      )

      ratingView = new RatingView
        model: @model
        commentParent: $(@el)
        commentFormTitle: "Care to elaborate?"

      this.$('.question').after ratingView.render().el

      return this
