define ['app/models/event'], (Event) ->

  class MerchantEvent extends Event

    initialize: ->

      super()

      @merchant = this.get('merchant')

      if @merchant?
        @description = @merchant.name
        @twitter_username = @merchant.twitter_username

    isSocial: ->
      @twitter_username?

    toDetailJSON: ->
      if @merchant?
        _.extend this.toViewJSON(),
          address: @merchant.address_summary
          avatar: @merchant.avatar
          twitter_username: @merchant.twitter_username
      else
        super()

