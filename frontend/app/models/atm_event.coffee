# The collection of [events](event.html) is backed by a JSON store.
define ['app/models/event'], (Event) ->

  class AtmEvent extends Event

    initialize: ->

      super()

      atm_event_type = if this.isDeposit() then "Deposit" else "Withdrawal"

      @description = "ATM #{atm_event_type}"

      @meta = this.get('atm').name

    isDeposit: ->
      this.get('amount') > 0
