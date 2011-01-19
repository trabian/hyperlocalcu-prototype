define ['app/models/events/merchant_event'], (MerchantEvent) ->

  class CheckEvent extends MerchantEvent

    initialize: ->

      super()

      check_name = "Check ##{this.get('check_number')}"

      if @merchant?
        @meta = check_name
      else
        @description = check_name

      @updateFields.push 'check_image_comment'

