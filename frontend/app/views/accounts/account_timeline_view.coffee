class App.view.AccountTimeline extends Backbone.View

  id: 'account-timeline'

  initialize: ->
    @template = App.templates['accounts/timeline']

  render: =>

    $(@el).html @template(@model.toJSON)

    return this
