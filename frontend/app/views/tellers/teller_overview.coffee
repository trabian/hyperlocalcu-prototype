define ["text!views/tellers/overview.handlebars?v=1", "app/views/common/feedback/rating_view", "vendor/handlebars"], (template, RatingView) ->

  class TellerOverviewView extends Backbone.View

    template: Handlebars.compile(template)

    initialize: (options) ->

    render: =>

      $(@el).html @template(@model.toJSON())

      _.each ['month', 'year'], (timespan) =>

        ratingView = new RatingView
          model: @model
          ratingField: "average_feedback_this_#{timespan}"
          readOnly: true

        this.$(".#{timespan} .rating").append ratingView.render().el

      return this
