define ['app/views/item_view'], (ItemView) ->

  # The TimelineView is responsible for rendering the list of [timeline items](item.html)
  class TimelineView extends Backbone.View

    # The items should be added to the timeline table's tbody to allow for a header row
    # within the thead.
    el: $('#timeline tbody')

    # Create the [summary view](summary_view.html) and bind the [item list's](item_list.html)
    # "refresh" event to the timeline's "addAll" event.
    initialize: (items) ->

      @items = items

      @items.bind 'refresh', @addAll

    # Add a timeline item to the bottom of the timeline.
    addOne: (item) =>

      view = new ItemView
        model: item
        collection: @items

      $(@el).append view.render().el

      this.addTimestampClass view, item

    # Add all items to the timeline
    addAll: =>
      @items.each @addOne

    # Add a "repeat-date' class to rows whose preceding row had the same timestamp.
    # This allows us to hide them in order to clean up the interface.
    addTimestampClass: (view, item) ->
      $(view.el).addClass('repeat-date') if item.get('timestamp') is @lastTimestamp
      @lastTimestamp = item.get('timestamp')
