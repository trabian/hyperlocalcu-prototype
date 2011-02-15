class App.model.Atm extends App.model.FeedbackSubject

  initialize: (options) ->

    options.list_url = "/atms/#{@id}/feedbacks"

    @meta = "ATM ##{@id}"

    super(options)

  url: =>
    "/atms/#{@id}"

App.model.FeedbackSubjectFactory.atm = App.model.Atm

