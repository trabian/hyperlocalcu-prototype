define ['app/models/feedback_subject'], (FeedbackSubject) ->

  class Vendor extends FeedbackSubject

    initialize: (options) ->

      options.list_url = "/vendors/#{@id}/feedbacks"

      @meta = "Vendor ##{@id}"

      super(options)

    url: =>
      "/vendors/#{@id}"

