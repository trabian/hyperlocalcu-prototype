define ["text!views/tellers/overview.handlebars?v=2", "app/views/common/feedback/rating_view", "vendor/handlebars"], (template, RatingView) ->

  class TellerOverviewView extends Backbone.View

    template: Handlebars.compile(template)

    initialize: (options) ->

      @model.bind 'change', =>
        this.render()

    render: =>

      $(@el).html @template(@model.toJSON())

      _.each ['month', 'year'], (timespan) =>

        ratingView = new RatingView
          model: @model
          rating: @model.get('feedback_totals')[timespan].average
          readOnly: true

        this.$(".#{timespan} .rating").append ratingView.render().el

      return this
