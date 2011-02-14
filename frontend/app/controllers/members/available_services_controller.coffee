class App.controller.AvailableServices extends Backbone.Controller

  intialize: (options) ->

  routes:
    "billpay/signup": 'signupForBillpay'
    "billpay/no": 'rejectBillpay'

  signupForBillpay: =>
    @billpaySignupView or= new App.BillpaySignupView
    @billpaySignupView.render()

  rejectBillpay: =>
    $('.available-service.billpay').hide()
