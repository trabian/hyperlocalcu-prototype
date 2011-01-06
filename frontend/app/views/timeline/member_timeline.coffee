define ['app/views/timeline/event', 'app/views/timeline/events/atm/row'], (EventView, AtmRow) ->

  class MemberTimeline extends Backbone.View

    el: $('#timeline tbody')

    initialize: (events) ->

      @events = events
      @events.bind 'refresh', @addAll

      @row_views =
        atm: AtmRow

    addOne: (event) =>

      view = new @row_views[event.get('event_type')]
        model: event
        collection: @events
        id: event.id

      #view = new EventView
        #model: event
        #collection: @events
        #id: event.id

      $(@el).append view.render().el

      this.addTimestampClass view, event

    addAll: =>
      @events.each @addOne

    # Add a "repeat-date' class to rows whose preceding row had the same timestamp.
    # This allows us to hide them in order to clean up the interface.
    addTimestampClass: (view, event) ->
      $(view.el).addClass('repeat-date') if event.get('posted_at') is @lastTimestamp
      @lastTimestamp = event.get('posted_at')
