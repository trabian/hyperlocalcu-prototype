class App.view.FeedbackSubjectOverview extends Backbone.View

  initialize: (options) ->

    @template = App.templates['feedback_subjects/overview']

    @model.bind 'change', =>
      this.render()

  render: =>

    $(@el).html @template(@model.toViewJSON())

    _.each ['month', 'year'], (timespan) =>

      ratingView = new App.view.Rating
        model: @model
        rating: @model.get('feedback_totals')[timespan].average
        readOnly: true

      this.$(".#{timespan} .rating").append ratingView.render().el

    return this
