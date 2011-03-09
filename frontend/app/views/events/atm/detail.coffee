class App.view.AtmDetail extends Backbone.View

  renderFeedback: =>

    @options.parent.renderLocationFeedbackView 'atm',
      commentFormTitle: "Care to elaborate? Did you feel safe?"

App.view.EventDetailFactory.atm = App.view.AtmDetail
