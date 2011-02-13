define ["text!views/feedback/subject_overview.handlebars?v=3", "app/views/common/feedback/rating_view", "vendor/handlebars"], (template, RatingView) ->

  class FeedbackSubjectOverviewView extends Backbone.View

    template: Handlebars.compile(template)

    initialize: (options) ->

      @model.bind 'change', =>
        this.render()

    render: =>

      $(@el).html @template(@model.toViewJSON())

      _.each ['month', 'year'], (timespan) =>

        ratingView = new RatingView
          model: @model
          rating: @model.get('feedback_totals')[timespan].average
          readOnly: true

        this.$(".#{timespan} .rating").append ratingView.render().el

      return this
