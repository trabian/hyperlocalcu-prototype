# The collection of [Items](item.html) is backed by a JSON store.
define ['member-timeline/models/item'], (Item) ->

  class ItemList extends Backbone.Collection

    model: Item

    # This will likely change in the future
    url: '/items.json'

    # Remove all items from the item list. This does not destroy the items on the backend.
    clear: ->
      this.remove @models

    # Provides a list of all selected items
    selected: ->
      this.filter (item) ->
        item.get 'selected'

    # Deselects any selected items and selects the item passed
    selectOne: (item) ->
      _.each this.selected(), (selectedItem) ->
        selectedItem.set 'selected': false

      item.set 'selected': true

    # If the item is already selected then unselect it. Otherwise make sure it's the only one selected.
    toggleOrSelectOne: (item) ->
      if item.get 'selected' 
        item.set 'selected': false
      else
        this.selectOne item
