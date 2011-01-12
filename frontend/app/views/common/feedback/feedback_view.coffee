define ["text!views/feedback/form.handlebars?v=4", "app/views/common/feedback/rating_view", "vendor/handlebars", "vendor/jquery-ui"], (template, RatingView) ->

  class FeedbackView extends Backbone.View

    tagName: 'div'

    className: 'feedback'

    template: Handlebars.compile(template)

    render: ->

      $(@el).html @template(
        avatar: @options.subject.avatar
        question: @options.subject.question
      )

      ratingView = new RatingView
        model: @model
        commentParent: $(@el)
        ratingField: "vendor_rating"
        commentField: "vendor_comment"
        commentFormTitle: "Care to elaborate?"

      this.$('.question').after ratingView.render().el

      return this
