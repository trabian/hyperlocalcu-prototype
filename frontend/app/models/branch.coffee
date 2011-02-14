class Branch extends FeedbackSubject

  initialize: (options) ->

    options.list_url = "/branches/#{@id}/feedbacks"

    @meta = "Branch ##{@id}"

    super(options)

  url: =>
    "/branches/#{@id}"

EventFactory.branch = BranchEvent
