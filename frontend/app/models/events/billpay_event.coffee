define ['app/models/events/merchant_event'], (MerchantEvent) ->

  class BillpayEvent extends MerchantEvent

    initialize: ->

      super()

      @meta = "Billpay ##{this.id}"

    toDetailJSON: ->
      detailJSON = super()
      _.extend detailJSON,
        bill_payment_processing_days: this.get('bill_payment_processing_days')
        bill_payment_submitted_date: this.formatDate(this.get('bill_payment_submitted_date'))
