define ['app/models/event'], (Event) ->

  class CheckEvent extends Event

    initialize: ->

      super()

      merchant = this.get('merchant')
      check_name = "Check ##{this.get('check_number')}"

      if merchant?
        @description = this.get('merchant').name
        @meta = check_name
      else
        @description = check_name
