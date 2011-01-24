define ['app/views/common/timeline/timeline_view', 'app/views/members/events/row_factory'], (TimelineView, MemberTimelineRowFactory) ->

  class MemberTimeline extends TimelineView

    initialize: (options) ->

      options.rowFactory = new MemberTimelineRowFactory

      super(options)
