# Load [TimelineView](timeline_view.html) and [Items](item_list.html)
define ["member-timeline/views/timeline_view", "member-timeline/models/item_list", "member-timeline/views/merchant_view", "member-timeline/views/summary_view"], (TimelineView, ItemList, MerchantView, SummaryView) ->

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
