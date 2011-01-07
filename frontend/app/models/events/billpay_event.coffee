define ['app/models/event'], (Event) ->

  class BillpayEvent extends Event

    initialize: ->

      super()

      @description = this.get('merchant').name

      @meta = "Billpay ##{this.id}"
