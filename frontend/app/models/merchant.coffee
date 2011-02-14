class App.model.Merchant extends App.model.FeedbackSubject

  initialize: (options) ->

    options.list_url = "/merchants/#{@id}/feedbacks"

    @meta = "Merchant ##{@id}"

    super(options)

  url: =>
    "/merchants/#{@id}"

App.model.FeedbackSubjectFactory.merchant = App.model.Merchant
