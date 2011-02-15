class App.model.EventMerchant extends Backbone.Model

  initialize: ->

    this.sync = App.model.CustomSync

  toUpdateJSON: =>
    merchant:
      this.toJSON()

class App.model.MerchantList extends Backbone.Collection

  url: '/merchants'

  model: App.model.EventMerchant
