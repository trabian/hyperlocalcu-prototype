define ['app/models/event'], (Event) ->

  class RewardEvent extends Event

    initialize: ->

      super()

      @description = "Reward"
      @meta = this.get('rewards')
