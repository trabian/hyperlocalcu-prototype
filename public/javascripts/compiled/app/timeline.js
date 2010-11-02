define(["app/views/timeline_view", "app/models/item_list"], function(TimelineView, ItemList) {
  this.items = new ItemList();
  return {
    items: this.items,
    timeline: new TimelineView(this.items)
  };
});