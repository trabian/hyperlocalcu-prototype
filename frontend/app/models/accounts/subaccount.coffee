class App.model.Subaccount extends Backbone.Model

  initialize: ->

    @events = new App.model.EventList
    @events.url = "/subaccounts/#{@id}/events"

    this.bind 'change:selected', @fetchEvents

  fetchEvents: =>
    @events.fetch() if this.get('selected')

  toViewJSON: ->

    _.extend this.toJSON(),
      formattedBalance: App.helper.currency.format(this.get('balance'))
      formattedAvailableBalance: if this.get('balance') == this.get('available_balance') then null else App.helper.currency.format(this.get('available_balance'))
