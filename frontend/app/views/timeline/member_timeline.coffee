define ['app/views/timeline/events/row', 'app/views/timeline/events/atm/row', 'app/views/timeline/events/statement/row'], (EventRowView, AtmRow, StatementRow) ->

  class MemberTimeline extends Backbone.View

    el: $('#timeline tbody')

    initialize: (events) ->

      @events = events
      @events.bind 'refresh', @addAll

      @row_views =
        atm: AtmRow
        statement: StatementRow

    addOne: (event) =>

      row_view_class = @row_views[event.get('event_type')] || EventRowView

      view = new row_view_class
        model: event
        collection: @events
        id: event.id
        className: event.className

      $(@el).append view.render().el

      this.addTimestampClass view, event

    addAll: =>
      @events.each @addOne

    # Add a "repeat-date' class to rows whose preceding row had the same timestamp.
    # This allows us to hide them in order to clean up the interface.
    addTimestampClass: (view, event) ->
      $(view.el).addClass('repeat-date') if event.day() is @lastEventDay
      @lastEventDay = event.day()
