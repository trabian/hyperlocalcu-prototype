# The collection of [Items](item.html) is backed by a JSON store.
define ['app/models/item'], (Item) ->

  class ItemList extends Backbone.Collection

    model: Item

    url: '/items.json'

  window.Items = new ItemList
