class App.view.BranchDetail extends App.view.EventDetail

  renderDetail: =>

    this.addFeedbackView 'teller'

    this.addLocationFeedbackView 'branch',
      commentFormTitle: "Care to tell us more about this branch?"
