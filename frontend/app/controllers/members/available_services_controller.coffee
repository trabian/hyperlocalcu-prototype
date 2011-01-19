define ->

  class AvailableServicesController extends Backbone.Controller

    intialize: (options) ->

    routes:
      "billpay/signup": 'signupForBillpay'
      "billpay/no": 'rejectBillpay'

    signupForBillpay: =>
      alert('sign up for billpay')

    rejectBillpay: =>
      $('.available-service.billpay').hide()
