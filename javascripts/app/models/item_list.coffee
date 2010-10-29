define ['app/models/item'], (Item) ->

  class ItemList extends Backbone.Collection

    model: Item

    events:
      "change:selected": "changeSelection"

    changeSelection: ->
      alert('changed selection')

    url: '/items.json'

  window.Items = new ItemList
