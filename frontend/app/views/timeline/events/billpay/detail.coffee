define ['text!views/timeline/events/billpay/detail.handlebars?v=2', 'app/views/timeline/events/detail', 'vendor/handlebars'], (template, EventDetailView) ->

  class BillpayDetailView extends EventDetailView

    eventTypeTemplate: Handlebars.compile(template)
