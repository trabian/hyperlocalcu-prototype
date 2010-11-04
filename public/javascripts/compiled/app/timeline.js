define(["app/views/timeline_view", "app/models/item_list", "app/views/merchant_view"], function(TimelineView, ItemList, MerchantView) {
  this.items = new ItemList();
  return {
    items: this.items,
    timeline: new TimelineView(this.items),
    merchantView: new MerchantView(this.items)
  };
});