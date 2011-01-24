define ['app/views/common/feedback/timeline/row'], (FeedbackRowView) ->

  class FeedbackRowFactory

    build: (event, collection) ->

      view = new FeedbackRowView
        model: event
        collection: collection
        id: event.id
        className: event.className
