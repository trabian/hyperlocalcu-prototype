define ['app/models/event'], (Event) ->

  class CUEvent extends Event

    initialize: ->

      super()

      @twitter_username = 'VantageCU'
      @avatar = "http://a2.twimg.com/profile_images/447377254/Van_Small_normal.jpg"

    isSocial: ->
      true

    toDetailJSON: ->
      _.extend this.toViewJSON(),
        twitter_username: @twitter_username
        avatar: @avatar
