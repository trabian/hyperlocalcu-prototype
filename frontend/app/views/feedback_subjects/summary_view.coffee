class App.view.FeedbackSummary extends Backbone.View

  initialize: (options) ->
    @collection = new FeedbackList

  render: =>

    alert @collection.length

    $(@el).html '<div>summary</div>'

    this
