class MemberTimeline extends TimelineView

  initialize: (options) ->

    options.rowFactory = new MemberTimelineRowFactory

    super(options)
