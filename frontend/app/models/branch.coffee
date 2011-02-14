class App.model.Branch extends App.model.FeedbackSubject

  initialize: (options) ->

    options.list_url = "/branches/#{@id}/feedbacks"

    @meta = "Branch ##{@id}"

    super(options)

  url: =>
    "/branches/#{@id}"

App.model.FeedbackSubjectFactory.branch = App.model.Branch
