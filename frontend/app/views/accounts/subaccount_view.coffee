class App.view.Subaccount extends Backbone.View

  className: 'subaccount'

  initialize: (options) ->

    @template = App.templates['members/subaccount']

    @model.bind 'change', @render

  render: =>

    $(@el).html @template(@model.toViewJSON())

    selected = @model.get('selected') is true

    $(@el).toggleClass 'selected', selected

    return this
