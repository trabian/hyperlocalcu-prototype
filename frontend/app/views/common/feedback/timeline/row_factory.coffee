class App.view.FeedbackRowFactory

  build: (event, collection) ->

    view = new App.view.FeedbackRow
      model: event
      collection: collection
      id: event.id
      className: event.className
