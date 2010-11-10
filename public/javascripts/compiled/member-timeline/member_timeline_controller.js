define(["member-timeline/views/timeline_view", "member-timeline/models/item_list", "member-timeline/views/merchant_view", "member-timeline/views/summary_view"], function(TimelineView, ItemList, MerchantView, SummaryView) {
  var defaultSidebar, merchantView;
  this.items = new ItemList();
  merchantView = new MerchantView(this.items);
  defaultSidebar = $('#sidebar .default');
  merchantView.bind('show', function() {
    return defaultSidebar.hide();
  });
  merchantView.bind('hide', function() {
    return defaultSidebar.show();
  });
  return {
    items: this.items,
    timeline: new TimelineView(this.items),
    summaryView: new SummaryView(),
    merchantView: merchantView
  };
});