class App.model.LoanApplication extends Backbone.Model

  initialize: ->

    this.sync = App.model.CustomSync

  toUpdateJSON: =>
    loan_application:
      requested_amount: this.get('requested_amount')
      member_number: '1234'
