class App.model.AtmEvent extends App.model.CUEvent

  initialize: ->

    super()

    @description = "ATM #{this.depositOrWithdrawal()}"

    @meta = "#{this.get('atm').name} ATM"

    @nameAndAddress = "<h2>Vantage Credit Union</h2><h3>#{this.get('atm').name} ATM</h3><p>#{this.get('atm')['address_summary']}</p>"

  toDetailJSON: ->
    detailJSON = super()
    _.extend detailJSON,
      address: @nameAndAddress

App.model.EventFactory.atm = App.model.AtmEvent
