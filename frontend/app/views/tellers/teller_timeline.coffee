define ["app/views/common/timeline/timeline_view", "app/views/common/feedback/timeline/row_factory"], (TimelineView, FeedbackRowFactory) ->

  class TellerTimelineView extends TimelineView

    initialize: (options) ->

      options.rowFactory = new FeedbackRowFactory

      super(options)
