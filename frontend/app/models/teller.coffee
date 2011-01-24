define ['app/models/feedback_list', 'app/models/feedback'], (FeedbackList, Feedback) ->

  class Teller extends Backbone.Model

    initialize: ->

    # Add the formatted timestamp and amount to the json for the view
    toViewJSON: ->
      _.extend this.toJSON()

    toDetailJSON: ->
      this.toViewJSON()

    feedbacks: ->
      new FeedbackList this.get('feedbacks'),
        model: Feedback
