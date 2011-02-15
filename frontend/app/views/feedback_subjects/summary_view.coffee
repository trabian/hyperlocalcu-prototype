class App.view.FeedbackSummary extends Backbone.View

  initialize: (options) ->
    @collection = new App.model.FeedbackList

  render: =>

    #$(@el).html '<div>summary</div>'

    this
