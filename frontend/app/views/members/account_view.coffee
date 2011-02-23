class App.view.Account extends Backbone.View

  id: 'accounts'

  initialize: (options) ->
    @template = App.templates['members/account']

    @collection.bind 'change:selected', @render

  render: =>

    @model = @collection.current()

    $(@el).html @template
      current: @model.toJSON()

    sharesView = new App.view.SubaccountList
      className: 'share'
      title: "Shares"
      subaccounts: @model.shares

    $(@el).append sharesView.render().el

    return this
