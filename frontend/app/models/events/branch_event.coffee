define ['app/models/events/cu_event'], (CUEvent) ->

  class BranchEvent extends CUEvent

    initialize: ->

      super()

      @updateFields.push 'teller_comment', 'teller_rating'

      @description = "In-Person #{this.depositOrWithdrawal()}"

      @meta = "#{this.get('branch').name} Branch"

    feedbackQuestion: =>
      "#{this.get('teller').first_name} served as your teller for this #{this.depositOrWithdrawal().toLowerCase()}. <br /><strong>How was his service?</strong>"

    toDetailJSON: ->
      detailJSON = super()
      _.extend detailJSON,
        address:
          this.get('branch')['address_summary']

