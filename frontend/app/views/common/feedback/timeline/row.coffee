define ["text!views/common/feedback/timeline/row.handlebars?v=3", "app/views/common/feedback/rating_view", 'vendor/handlebars'], (template, RatingView) ->

  class FeedbackRowView extends Backbone.View

    tagName: 'tr'

    template: Handlebars.compile(template)

    initialize: ->

      this.render()

    render: ->

      $(@el).html @template(@model.toViewJSON())

      ratingView = new RatingView
        model: @model
        ratingField: "teller_rating"
        readOnly: true

      this.$('.rating').append ratingView.render().el

      return this
