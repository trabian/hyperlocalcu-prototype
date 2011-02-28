class App.model.AccountList extends Backbone.Collection

  model: App.model.Account

  ## Provides the current selected account
  #selected: ->
    #this.filter (account) ->
      #account.get 'selected'

  defaultSelected: ->
    this.first()

_.extend App.model.AccountList::, App.model.extension.Selectable
