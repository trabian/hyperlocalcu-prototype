# The collection of [Items](item.html) is backed by a JSON store.
define ['app/models/item'], (Item) ->

  class ItemList extends Backbone.Collection

    model: Item

    # This will likely change in the future
    url: '/items.json'

    # Remove all items from the item list. This does not destroy the items on the backend.
    clear: ->
      this.remove @models

  # Return the ItemList
  new ItemList
