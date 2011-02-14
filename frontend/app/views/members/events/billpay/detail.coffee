#define ['text!views/timeline/events/billpay/detail.handlebars?v=2', 'app/views/members/events/detail', 'vendor/handlebars'], (template, EventDetailView) ->

class App.view.BillpayDetail extends App.view.EventDetail

  eventTypeOptions:
    template: Handlebars.compile(template)

  renderDetail: =>
    if @model.get('vendor')?
      this.addFeedbackView 'vendor'
