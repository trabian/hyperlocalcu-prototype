define ['member-timeline/views/item_view'], (ItemView) ->

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
        id: item.id

      $(@el).append view.render().el

      this.addTimestampClass view, item

    # Add all items to the timeline
    addAll: =>
      @items.each @addOne
      this.addRating()

    # Add a "repeat-date' class to rows whose preceding row had the same timestamp.
    # This allows us to hide them in order to clean up the interface.
    addTimestampClass: (view, item) ->
      $(view.el).addClass('repeat-date') if item.get('timestamp') is @lastTimestamp
      @lastTimestamp = item.get('timestamp')

    addRating: ->

      itemList = @items

      this.$('.rating').raty

        path: '/images/raty/'
        onClick: (rating) ->

          $(this).toggleClass 'active', rating > 0

          item_id = $(this).closest('tr').attr('id')
          
          item = itemList.get item_id
          item.set
            rating: rating

