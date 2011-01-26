define ['text!views/timeline/events/billpay/detail.handlebars?v=2', 'app/views/members/events/detail', 'vendor/handlebars'], (template, EventDetailView) ->

  class BillpayDetailView extends EventDetailView

    eventTypeOptions:
      template: Handlebars.compile(template)

    renderDetail: =>
      this.addFeedbackView 'vendor'

