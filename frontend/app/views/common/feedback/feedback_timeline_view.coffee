define ["app/views/common/timeline/timeline_view", "app/views/common/feedback/timeline/row_factory"], (TimelineView, FeedbackRowFactory) ->

  class FeedbackTimelineView extends TimelineView

    initialize: (options) ->

      options.rowFactory = new FeedbackRowFactory

      super(options)

      @collection.bind 'add', (model) =>
        this.addOne(model, 'top')
        this.refreshTimestamps()


