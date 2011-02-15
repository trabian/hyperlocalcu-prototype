class App.model.StatementEvent extends App.model.Event

  initialize: ->

    super()

    @description = this.get('name')
    @className = "statement"

  toViewJSON: ->
    eventViewJSON = super()

    _.extend eventViewJSON,
      opening_balance: this.formatCurrency(this.get('opening_balance'))
      ending_balance: this.formatCurrency(this.get('ending_balance'))

App.model.EventFactory.statement = App.model.StatementEvent
