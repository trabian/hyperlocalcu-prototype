class App.view.Subaccount extends Backbone.View

  className: 'subaccount'

  initialize: (options) ->
    @template = App.templates['members/subaccount']

  render: =>

    $(@el).html @template(@model.toJSON())

    return this

