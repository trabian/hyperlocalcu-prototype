define ['app/models/item'], (Item) ->

  class ItemList extends Backbone.Collection

    model: Item

    url: '/items.json'

  window.Items = new ItemList
