define ['app/models/feedback_list', 'app/models/feedback'], (FeedbackList, Feedback) ->

  class FeedbackSubject extends Backbone.Model

    initialize: (options) ->

      super(options)

      if this.get('feedbacks')?
        @feedbacks = new FeedbackList this.get('feedbacks')

        @feedbacks.url = options.list_url

        this.bind 'add:feedback', (feedback_json) =>
          this.set feedback_json.subject
          @feedbacks.add feedback_json

        this.bind 'update:feedback', (feedback_json) =>
          this.set feedback_json.subject
          feedback = @feedbacks.get(feedback_json.id)
          feedback.set feedback_json

    # Add the formatted timestamp and amount to the json for the view
    toViewJSON: ->
      _.extend this.toJSON(),
        meta: @meta

    toDetailJSON: ->
      this.toViewJSON()
