class App.model.Account extends Backbone.Model

  initialize: ->

    this.refresh()

  refresh: ->

    @subaccounts = new App.model.SubaccountList(this.get('subaccounts'))

    @shares = @subaccounts.filter (subaccount) ->
      subaccount.get('type') == 'share'

    @loans = @subaccounts.filter (subaccount) ->
      subaccount.get('type') == 'loan'
