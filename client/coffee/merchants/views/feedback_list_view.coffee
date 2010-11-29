define ['merchants/views/feedback_view'], (FeedbackView) ->

  class FeedbackListView extends Backbone.View

    el: $('#feedback-list')

    initialize: (feedbacks) ->

      @feedbacks = feedbacks

      @feedbacks.bind 'refresh', @addAll

    addOne: (feedback) =>

      view = new FeedbackView
        model: feedback
        id: feedback.id

      $(@el).append view.render().el

    addAll: =>
      @feedbacks.each @addOne
