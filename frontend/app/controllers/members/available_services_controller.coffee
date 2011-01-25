define ["app/views/members/billpay_signup_view"], (BillpaySignupView) ->

  class AvailableServicesController extends Backbone.Controller

    intialize: (options) ->

    routes:
      "billpay/signup": 'signupForBillpay'
      "billpay/no": 'rejectBillpay'

    signupForBillpay: =>
      @billpaySignupView or= new BillpaySignupView
      @billpaySignupView.render()

    rejectBillpay: =>
      $('.available-service.billpay').hide()
