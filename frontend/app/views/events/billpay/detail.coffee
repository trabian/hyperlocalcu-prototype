class App.view.BillpayDetail extends Backbone.View

  render: =>

    $(@el).html App.templates['events/billpay/detail'](@model.toDetailJSON())

    return this

  renderFeedback: =>

    @options.parent.renderLocationFeedbackView 'merchant'

    @options.parent.addSubjectFeedbackView 'vendor' if @model.get('vendor')?

App.view.EventDetailFactory.billpay = App.view.BillpayDetail
