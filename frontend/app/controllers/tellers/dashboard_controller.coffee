define ["app/controllers/common/timeline_controller", "app/views/tellers/teller_timeline", "app/views/tellers/teller_overview"], (TimelineController, TellerTimeline, TellerOverviewView) ->

  class TellerDashboardController extends TimelineController

    initialize: (options) ->

      @teller = options.teller

      options.events = @teller.feedbacks()

      super(options)

      @timeline = new TellerTimeline
        collection: options.events

      @overview = new TellerOverviewView
        model: @teller

      $('#teller-overview').append @overview.render().el
