class App.model.AccountList extends Backbone.Collection

  model: App.model.Account

  # Provides the current selected account
  selected: ->
    this.filter (account) ->
      account.get 'selected'

  current: ->

    selectedAccounts = this.selected()

    if _.isEmpty(selectedAccounts)
      return this.first()
    else
      return _.first(selectedAccounts)

  selectOne: (account) ->
    _.each this.selected(), (selectedAccount) ->
      selectedAccount.set 'selected': false

    if account?
      account.set 'selected': true
