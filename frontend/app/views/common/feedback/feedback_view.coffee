define ["text!views/feedback/form.handlebars?v=4", "app/views/common/feedback/rating_view", "vendor/handlebars", "vendor/jquery-ui"], (template, RatingView) ->

  class FeedbackView extends Backbone.View

    tagName: 'div'

    className: 'feedback'

    template: Handlebars.compile(template)

    render: ->

      $(@el).html @template(
        avatar: @options.subject.avatar
        question: @model.feedbackQuestion || @options.subject.question
      )

      ratingView = new RatingView
        model: @model
        commentParent: $(@el)
        ratingField: "#{@options.fieldPrefix}_rating"
        commentField: "#{@options.fieldPrefix}_comment"
        commentFormTitle: "Care to elaborate?"

      this.$('.question').after ratingView.render().el

      return this
