define ['app/models/events/cu_event'], (CUEvent) ->

  class AtmEvent extends CUEvent

    initialize: ->

      super()

      @description = "ATM #{this.depositOrWithdrawal()}"

      @meta = "#{this.get('atm').name} ATM"

      @nameAndAddress = "<h2>Vantage Credit Union</h2><h3>#{this.get('atm').name} ATM</h3><p>#{this.get('atm')['address_summary']}</p>"

    toDetailJSON: ->
      detailJSON = super()
      _.extend detailJSON,
        address: @nameAndAddress
