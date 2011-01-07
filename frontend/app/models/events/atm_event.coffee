define ['app/models/event'], (Event) ->

  class AtmEvent extends Event

    initialize: ->

      super()

      @description = "ATM #{this.depositOrWithdrawal()}"

      @meta = "#{this.get('atm').name} ATM"

