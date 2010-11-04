# Load [TimelineView](timeline_view.html) and [Items](item_list.html)
define ["app/views/timeline_view", "app/models/item_list", "app/views/merchant_view"], (TimelineView, ItemList, MerchantView) ->

  @items = new ItemList

  items: @items
  timeline: new TimelineView(@items)
  merchantView: new MerchantView(@items)
