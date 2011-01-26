define ['app/models/feedback_subject'], (FeedbackSubject) ->

  class Teller extends FeedbackSubject

    initialize: (options) ->

      options.list_url = "/tellers/#{@id}/feedbacks"

      @meta = "Teller ##{@id}"

      super(options)

    url: =>
      "/tellers/#{@id}"
