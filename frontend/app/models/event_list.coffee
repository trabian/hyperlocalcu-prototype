# The collection of [events](event.html) is backed by a JSON store.
define ['app/models/event', 'app/models/atm_event'], (Event, AtmEvent) ->

  class EventList extends Backbone.Collection

    # This will likely change in the future
    url: '/accounts/1/events'

    event_types:
      atm: AtmEvent

    _add: (model) ->
      super new @event_types[model.event_type](model)

    # Remove all events from the event list. This does not destroy the events on
    # the backend.
    clear: ->
      this.remove @models

    # Provides a list of all selected events
    selected: ->
      this.filter (event) ->
        event.get 'selected'

    # Deselects any selected events and selects the event passed
    selectOne: (event) ->
      _.each this.selected(), (selectedevent) ->
        selectedevent.set 'selected': false

      event.set 'selected': true

    # If the event is already selected then unselect it. Otherwise make sure
    # it's the only one selected.
    toggleOrSelectOne: (event) ->

      if event.get 'selected'

        # Allow listeners to know when an event is explicitly unselected (as
        # opposed to becoming unselected because another event is selected).
        #this.trigger('unselect')

        #event.set 'selected': false

      else

        this.selectOne event

