class App.view.LoanApplication extends Backbone.View

  id: 'loan-application-dialog'

  events:
    "click .form button": "submitForm"

  initialize: (options) ->

    @template = App.templates['loans/application']

  render: ->

    $(@el).html @template()
    
    $(@el).dialog
      title: "Apply for a Loan"
      width: 460
      height: 310
      open: @open
      close: @close

    this.$('.form button').button()

  close: (event, ui) =>
    window.location.hash = '#'
    this.remove()

  open: (event, ui) =>
    this.delegateEvents()

  submitForm: =>

    loans = new App.model.LoanApplicationList

    loans.create
      requested_amount: this.$('.amount').val()

    alert 'Provide instructions on what will happen next'

    $(@el).dialog 'close'

