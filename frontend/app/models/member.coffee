# The Member model acts as a container for accounts,
# existing rewards, and other member-related information.
class App.model.Member extends Backbone.Model

  initialize: ->
    @accounts = new App.model.AccountList(this.get('accounts'))

  cityState: =>
    [this.get('city'), this.get('region')].join(', ')
