class App.view.BillpaySignup extends Backbone.View

  id: 'billpay-signup-dialog'

  events:
    "click .form button": "submitForm"

  template: Handlebars.compile(template)

  render: ->

    mpq.push ["track", "View Billpay Signup", {
      offer: "billpay"
    }]

    $(@el).html @template()
    
    $(@el).dialog
      title: "Sign up for Billpay"
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

    mpq.push ["track", "Submit Billpay Signup"]

    alert 'Provide instructions on what will happen next'

    $(@el).dialog 'close'
