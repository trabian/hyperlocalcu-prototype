class App.controller.FeedbackDashboard extends App.controller.Timeline

  initialize: (options) ->

    @subject = options.subject

    options.events = @subject.feedbacks

    super(options)

    @overview = new App.view.FeedbackSubjectOverview
      model: @subject

    $('#subject-overview').append @overview.render().el

    @timeline = new App.view.FeedbackTimeline
      collection: @subject.feedbacks

    App.socket.listenTo @subject
