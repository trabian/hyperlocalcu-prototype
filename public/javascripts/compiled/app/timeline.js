define(["app/views/timeline_view", "app/models/item_list"], function(TimelineView, Items) {
  return {
    timeline: new TimelineView(),
    items: Items
  };
});