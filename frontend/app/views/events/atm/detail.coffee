class App.view.AtmDetail extends App.view.EventDetail

  renderDetail: =>
    this.addLocationFeedbackView 'atm',
      commentFormTitle: "Care to elaborate? Did you feel safe?"
