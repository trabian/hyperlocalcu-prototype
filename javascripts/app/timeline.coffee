# Load [TimelineView](timeline_view.html) and [Items](item_list.html)
define ["app/views/timeline_view", "app/models/item_list"], (TimelineView, Items) ->

  # Instantiate the TimelineView
  new TimelineView

  # Fetch the items from the data store.  This will add all the items to the timeline.
  Items.fetch()
