define ["app/controllers/common/timeline_controller", "app/views/common/feedback/feedback_timeline_view", "app/views/tellers/teller_overview", "app/lib/socket"], (TimelineController, FeedbackTimelineView, TellerOverviewView, socket) ->

  class TellerDashboardController extends TimelineController

    initialize: (options) ->

      @teller = options.teller

      options.events = @teller.feedbacks

      super(options)

      @overview = new TellerOverviewView
        model: @teller

      $('#teller-overview').append @overview.render().el

      @timeline = new FeedbackTimelineView
        collection: @teller.feedbacks

      socket.listenTo @teller
