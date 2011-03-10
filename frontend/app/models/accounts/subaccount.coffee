class App.model.Subaccount extends Backbone.Model

  initialize: ->

    @events = new App.model.EventList
    @events.url = "/subaccounts/#{@id}/events"

    @statements = new App.model.StatementList(this.get('statements'))

  dailyBalances: ->

    balances = {}

    # Cheating until accessing a real db
    this.events.each (event) ->

      datetime = event.postedDate()

      date = Date.UTC(datetime.getUTCFullYear(), datetime.getUTCMonth(), datetime.getUTCDate())

      balances[date] = event.get('balance') unless balances[date]?

    _.map balances, (value, key) ->
      [parseInt(key), value]

  toViewJSON: ->

    _.extend this.toJSON(),
      formattedBalance: App.helper.currency.format(this.get('balance'))
      formattedAvailableBalance: if this.get('balance') == this.get('available_balance') then null else App.helper.currency.format(this.get('available_balance'))
