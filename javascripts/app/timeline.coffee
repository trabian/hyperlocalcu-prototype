# Load [TimelineView](timeline_view.html) and [Items](item_list.html)
define ["app/views/timeline_view", "app/models/item_list", "app/views/merchant_view", "app/views/summary_view"], (TimelineView, ItemList, MerchantView, SummaryView) ->

  @items = new ItemList

  # TODO: Move this to a SidebarView or similar
  merchantView = new MerchantView(@items)

  defaultSidebar = $('#sidebar .default')

  merchantView.bind 'show', ->
    defaultSidebar.hide()

  merchantView.bind 'hide', ->
    defaultSidebar.show()

  items: @items
  timeline: new TimelineView(@items)
  summaryView: new SummaryView
  merchantView: merchantView
