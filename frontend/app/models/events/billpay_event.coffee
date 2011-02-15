class App.model.BillpayEvent extends App.model.MerchantEvent

  initialize: ->

    super()

    @meta = "Billpay ##{this.id}"

  toDetailJSON: ->
    detailJSON = super()
    _.extend detailJSON,
      bill_payment_processing_days: this.get('bill_payment_processing_days')
      bill_payment_submitted_date: this.formatDate(this.get('bill_payment_submitted_date'))
      description: "Billpay ##{this.id}"

App.model.EventFactory.billpay = App.model.BillpayEvent
