class App.model.RewardEvent extends App.model.Event

  initialize: ->

    super()

    @description = "Reward"
    @meta = this.get('rewards')

App.model.EventFactory.reward = App.model.RewardEvent
