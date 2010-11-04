define(["app/views/timeline_view", "app/models/item_list", "app/views/merchant_view", "app/views/summary_view"], function(TimelineView, ItemList, MerchantView, SummaryView) {
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