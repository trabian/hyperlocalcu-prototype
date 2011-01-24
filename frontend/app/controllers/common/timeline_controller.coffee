define ->

  class TimelineController extends Backbone.Controller

    initialize: (options) ->

      @events = options.events

      @events.bind 'change:selected', @changeSelected

      @events.bind 'unselect', =>
        this.saveLocation ''

      # Optionally fetch as the final step of initialization
      this.fetch() if options.fetchOnInit == true

    routes:
      "events/:event_id": 'selectEvent'

    selectEvent: (eventId) =>
      @events.selectOne @events.get(eventId)

    fetch: =>

      @events.fetch
        success: ->

          $('#timeline-loading').hide()
          $('#timeline').show()

          Backbone.history.start()

    # Change the selected event and either show or hide the Detail view
    # based on whether the event is selected.
    changeSelected: (event) =>

      if event.get('selected')
        this.trigger 'select', event
        this.saveLocation "events/#{event.id}"
      else
        this.trigger 'unselect', event

