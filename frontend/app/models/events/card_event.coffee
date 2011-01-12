define ['app/models/events/merchant_event'], (MerchantEvent) ->

  class CardEvent extends MerchantEvent

    initialize: ->

      super()

      name = this.get('name')

      if @merchant?
        @meta = name
      else
        @description = name
