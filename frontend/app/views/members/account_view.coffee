class App.view.Account extends Backbone.View

  id: 'account'

  initialize: (options) ->

    @template = App.templates['members/account']

  render: ->

    $(@el).html @template @model.toJSON()

    return this
