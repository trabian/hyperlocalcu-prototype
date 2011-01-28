define ['app/lib/models/custom_sync'], (CustomSync) ->

  class EventMerchant extends Backbone.Model

    initialize: ->

      this.sync = CustomSync

    toUpdateJSON: =>
      merchant:
        this.toJSON()

  class MerchantList extends Backbone.Collection

    url: '/merchants'

    model: EventMerchant
