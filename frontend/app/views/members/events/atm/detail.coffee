define ['app/views/members/events/detail', 'vendor/handlebars'], (EventDetailView) ->

  class AtmDetailView extends EventDetailView

    renderDetail: =>
      this.addLocationFeedbackView 'atm',
        commentFormTitle: "Care to elaborate? Did you feel safe?"

