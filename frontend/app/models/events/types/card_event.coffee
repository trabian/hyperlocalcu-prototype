class App.model.CardEvent extends App.model.MerchantEvent

  initialize: ->

    super()

    name = this.get('name')

    if @merchant?
      @meta = name
    else
      @description = name

    this.bind 'change:merchant', =>
      @meta = name

App.model.EventFactory.card = App.model.CardEvent
