class App.model.BranchEvent extends App.model.CUEvent

  initialize: ->

    super()

    @updateFields.push 'teller_comment', 'teller_rating'

    @description = "In-Person #{this.depositOrWithdrawal()}"

    @meta = "#{this.get('branch').name} Branch"

    @nameAndAddress = "<h2>Vantage Credit Union</h2><h3>#{this.get('branch').name} Branch</h3><p>#{this.get('branch')['address_summary']}</p>"

  feedbackQuestion: =>
    "#{this.get('teller').first_name} served as your teller for this #{this.depositOrWithdrawal().toLowerCase()}. <br /><strong>How was his service?</strong>"

  toDetailJSON: ->
    detailJSON = super()
    _.extend detailJSON,
      address: @nameAndAddress

App.model.EventFactory.branch = App.model.BranchEvent
