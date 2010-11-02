# Load [TimelineView](timeline_view.html) and [Items](item_list.html)
define ["app/views/timeline_view", "app/models/item_list"], (TimelineView, ItemList) ->

  @items = new ItemList

  items: @items
  timeline: new TimelineView(@items)
