(function() {
  define(["app/views/timeline_view", "app/models/item_list"], function(TimelineView, Items) {
    new TimelineView();
    return Items.fetch();
  });
}).call(this);
