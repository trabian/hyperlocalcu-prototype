# The Member model acts as a container for accounts,
# existing rewards, and other member-related information.
class App.model.Member extends Backbone.Model

  initialize: ->
    @accounts = new App.model.AccountList(this.get('accounts'))

  cityState: =>
    [this.get('city'), this.get('region')].join(', ')

  name: =>
    "#{this.get('first_name')} #{this.get('last_name')}"

  toViewJSON: ->
    _.extend this.toJSON(),
      name: this.name()
      last_login: "2/28/2011" # Mocked for now
