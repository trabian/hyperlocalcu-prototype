class App.model.NsfEvent extends App.model.Event

  initialize: ->

    super()

    @description = "NSF Fee"
    @className = "penalty"

App.model.EventFactory.nsf = App.model.NsfEvent
