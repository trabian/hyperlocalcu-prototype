class App.model.CheckEvent extends App.model.MerchantEvent

  initialize: ->

    super()

    check_name = "Check ##{this.get('check_number')}"

    if @merchant?
      @meta = check_name
    else
      @description = check_name

    @updateFields.push 'check_image_comment'

    this.bind 'change:merchant', =>
      @meta = check_name

  toDetailJSON: ->
    detailJSON = super()
    _.extend detailJSON,
      description: "Check ##{this.id}"

App.model.EventFactory.check = App.model.CheckEvent
