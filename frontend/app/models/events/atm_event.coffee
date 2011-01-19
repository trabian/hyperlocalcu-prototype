define ['app/models/events/cu_event'], (CUEvent) ->

  class AtmEvent extends CUEvent

    initialize: ->

      super()

      @description = "ATM #{this.depositOrWithdrawal()}"

      @meta = "#{this.get('atm').name} ATM"

