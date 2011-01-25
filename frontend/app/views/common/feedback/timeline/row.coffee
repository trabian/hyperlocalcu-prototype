define ["text!views/common/feedback/timeline/row.handlebars?v=3", "app/views/common/feedback/rating_view", 'vendor/handlebars'], (template, RatingView) ->

  class FeedbackRowView extends Backbone.View

    tagName: 'tr'

    className: 'feedback'

    template: Handlebars.compile(template)

    initialize: ->

      @model.bind 'change', =>
        this.render()

      this.render()

    render: ->

      $(@el).html @template(@model.toViewJSON())

      ratingView = new RatingView
        model: @model
        rating: @model.get('rating')
        readOnly: true

      this.$('.rating').append ratingView.render().el

      return this
