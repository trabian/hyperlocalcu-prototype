class App.view.BranchDetail extends Backbone.View

  renderFeedback: =>

    @options.parent.renderLocationFeedbackView 'branch'

    @options.parent.addSubjectFeedbackView 'teller' if @model.get('teller')?

App.view.EventDetailFactory.branch = App.view.BranchDetail
