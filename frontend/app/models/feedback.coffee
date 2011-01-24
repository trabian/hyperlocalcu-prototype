define ['app/models/event'], (Event) ->

  class Feedback extends Event

    initialize: ->

      super()

      @className = "feedback"
