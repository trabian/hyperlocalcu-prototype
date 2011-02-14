class App.view.FeedbackTimeline extends App.view.Timeline

  initialize: (options) ->

    options.rowFactory = new App.view.FeedbackRowFactory

    super(options)

    @collection.bind 'add', (model) =>
      this.addOne(model, 'top')
      this.refreshTimestamps()
