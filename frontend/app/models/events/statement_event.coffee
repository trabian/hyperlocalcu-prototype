define ['app/models/event'], (Event) ->

  class StatementEvent extends Event

    initialize: ->

      super()

      @description = this.get('name')
      @className = "statement"

    toViewJSON: ->
      eventViewJSON = super()

      _.extend eventViewJSON,
        opening_balance: this.formatCurrency(this.get('opening_balance'))
        ending_balance: this.formatCurrency(this.get('ending_balance'))
