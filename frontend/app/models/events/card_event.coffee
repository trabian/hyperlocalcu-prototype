define ['app/models/event'], (Event) ->

  class CardEvent extends Event

    initialize: ->

      super()

      merchant = this.get('merchant')
      name = this.get('name')
      check_name = "Check ##{this.get('check_number')}"

      if merchant?
        @description = this.get('merchant').name
        @meta = name
      else
        @description = name
