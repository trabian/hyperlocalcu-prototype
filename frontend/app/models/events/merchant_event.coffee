define ['app/models/event'], (Event) ->

  class MerchantEvent extends Event

    initialize: ->

      super()

      this.loadMerchantAttributes()

      this.bind 'change:merchant', @loadMerchantAttributes

    isSocial: ->
      @twitter_username?

    loadMerchantAttributes: =>

      @merchant = this.get('merchant')

      if @merchant?
        @description = @merchant.name
        @twitter_username = @merchant.twitter_username
        @address_summary = "<h2>#{@merchant.name}</h2><p>#{@merchant.address_summary}</p>"

    toDetailJSON: ->
      if @merchant?
        _.extend this.toViewJSON(),
          address: @address_summary
          avatar: @merchant.avatar
          twitter_username: @merchant.twitter_username
      else
        super()

    addMerchant: (merchant) =>

      merchant.merchant_number = this.get('merchant_number')

      params =
        url: "#{this.url()}/add_merchant"
        type: 'POST'
        contentType: 'application/json'

        data: JSON.stringify
          merchant: merchant

        dataType: 'json'
        processData: false
        success: (resp) =>

          new_merchant = this.parse(resp)

          this.collection.each (event) ->
            event.set new_merchant if event.get('merchant_number') == new_merchant.merchant_number

      $.ajax params
