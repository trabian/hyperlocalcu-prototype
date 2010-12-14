define ['lib/models/custom_sync'], (CustomSync) ->

  class Merchant extends Backbone.Model

    initialize: ->
      this.sync = CustomSync

    url: =>
      "/merchants/#{@id}"

    toUpdateJSON: =>
      merchant:
        avatar: this.get('avatar')
        twitter_username: this.get('twitter_username')
        facebook_username: this.get('facebook_username')

