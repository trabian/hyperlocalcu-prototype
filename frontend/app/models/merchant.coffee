define ['app/models/feedback_subject'], (FeedbackSubject) ->

  class Merchant extends FeedbackSubject

    initialize: (options) ->

      options.list_url = "/merchants/#{@id}/feedbacks"

      @meta = "Merchant ##{@id}"

      super(options)

    url: =>
      "/merchants/#{@id}"

