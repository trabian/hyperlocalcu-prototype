define ['text!views/timeline/events/branch/detail.handlebars?v=2', 'app/views/members/events/detail', 'vendor/handlebars'], (template, EventDetailView) ->

  class BranchDetailView extends EventDetailView

    renderDetail: =>

      this.addFeedbackView 'teller'

      this.addLocationFeedbackView 'branch',
        commentFormTitle: "Care to tell us more about this branch?"
