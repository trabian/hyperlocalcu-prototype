class App.view.MemberTimeline extends App.view.Timeline

  initialize: (options) ->

    options.rowFactory = new App.view.MemberTimelineRowFactory

    super(options)
