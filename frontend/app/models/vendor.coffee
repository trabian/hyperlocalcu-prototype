class App.model.Vendor extends App.model.FeedbackSubject

  initialize: (options) ->

    options.list_url = "/vendors/#{@id}/feedbacks"

    @meta = "Vendor ##{@id}"

    super(options)

  url: =>
    "/vendors/#{@id}"

App.model.FeedbackSubjectFactory.vendor = App.model.Vendor
