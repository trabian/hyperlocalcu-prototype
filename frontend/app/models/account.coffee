class App.model.Account extends Backbone.Model

  initialize: ->

    this.refresh()

  refresh: ->

    @subaccounts = new App.model.SubaccountList(this.get('subaccounts'))

    @subaccounts.account = this

    @shares = @subaccounts.filter (subaccount) ->
      subaccount.get('account_type') == 'share'

    @loans = @subaccounts.filter (subaccount) ->
      subaccount.get('account_type') == 'loan'
