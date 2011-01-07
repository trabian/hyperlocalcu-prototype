define ['app/models/event'], (Event) ->

  class NsfEvent extends Event

    initialize: ->

      super()

      @description = "NSF Fee"
      @className = "penalty"
