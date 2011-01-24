define ["app/controllers/common/timeline_controller", "app/views/tellers/teller_timeline"], (TimelineController, TellerTimeline) ->

  class TellerDashboardController extends TimelineController

    initialize: (options) ->

      super(options)

      @timeline = new TellerTimeline
        collection: options.events
