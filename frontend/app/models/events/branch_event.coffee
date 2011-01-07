define ['app/models/event'], (Event) ->

  class BranchEvent extends Event

    initialize: ->

      super()

      @description = "In-Person #{this.depositOrWithdrawal()}"

      @meta = "#{this.get('branch').name} Branch"

