# The collection of [events](event.html) is backed by a JSON store.
class App.model.EventList extends Backbone.Collection

  # This will likely change in the future
  #url: '/accounts/1/events'

  _add: (model) ->
    super App.model.EventFactory.getEvent(model)

  # Remove all events from the event list. This does not destroy the events on
  # the backend.
  clear: ->
    this.remove @models

_.extend App.model.EventList::, App.model.extension.Selectable
