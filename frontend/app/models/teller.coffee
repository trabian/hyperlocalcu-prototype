class App.model.Teller extends App.model.FeedbackSubject

  initialize: (options) ->

    options.list_url = "/tellers/#{@id}/feedbacks"

    @meta = "Teller ##{@id}"

    super(options)

  url: =>
    "/tellers/#{@id}"

App.model.FeedbackSubjectFactory.teller = App.model.Teller
