define ['app/models/event'], (Event) ->

  class MerchantEvent extends Event

    initialize: ->

      super()

      @merchant = this.get('merchant')

      if @merchant?
        @description = @merchant.name
        @twitter_username = @merchant.twitter_username
        @address_summary = "<h2>#{@merchant.name}</h2><p>#{@merchant.address_summary}</p>"

    isSocial: ->
      @twitter_username?

    toDetailJSON: ->
      if @merchant?
        _.extend this.toViewJSON(),
          address: @address_summary
          avatar: @merchant.avatar
          twitter_username: @merchant.twitter_username
      else
        super()

    addMerchant: (merchant) =>

      params =
        url: "#{this.url()}/add_merchant"
        type: 'POST'
        contentType: 'application/json'

        data: JSON.stringify
          merchant: merchant

        dataType: 'json'
        processData: false
        success: (resp) =>
          this.set(this.parse(resp))

      $.ajax params
