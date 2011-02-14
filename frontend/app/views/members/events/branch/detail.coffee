#define ['text!views/timeline/events/branch/detail.handlebars?v=2', 'app/views/members/events/detail', 'vendor/handlebars'], (template, EventDetailView) ->

class App.view.BranchDetail extends App.view.EventDetail

  renderDetail: =>

    this.addFeedbackView 'teller'

    this.addLocationFeedbackView 'branch',
      commentFormTitle: "Care to tell us more about this branch?"
