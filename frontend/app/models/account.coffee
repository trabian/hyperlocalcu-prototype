class App.model.Account extends Backbone.Model

  initialize: ->

    this.refresh()

  refresh: ->

    @subaccounts = new App.model.SubaccountList(this.get('subaccounts'))

    @subaccounts.account = this

    rawShares = @subaccounts.filter (subaccount) ->
      subaccount.get('account_type') == 'share'

    @shares = new App.model.SubaccountList rawShares

    rawLoans = @subaccounts.filter (subaccount) ->
      subaccount.get('account_type') == 'loan'

    @loans = new App.model.SubaccountList rawLoans

    @subaccounts.bind 'selectOne', (subaccount) =>
 
      account_type = subaccount.get('account_type')

      @shares.trigger 'selectSubaccounts', account_type is 'share'
      @loans.trigger 'selectSubaccounts', account_type is 'loan'
