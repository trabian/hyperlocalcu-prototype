var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/views/item_view', 'app/views/summary_view'], function(ItemView, SummaryView) {
  var TimelineView;
  TimelineView = function() {
    return Backbone.View.apply(this, arguments);
  };
  __extends(TimelineView, Backbone.View);
  TimelineView.prototype.el = $('#timeline tbody');
  TimelineView.prototype.initialize = function(items) {
    var summary_view;
    summary_view = new SummaryView();
    _.bindAll(this, 'addAll', 'addOne', 'selectItem');
    this.items = items;
    this.items.bind('refresh', this.addAll);
    return this.items.bind('select', this.selectItem);
  };
  TimelineView.prototype.addOne = function(item) {
    var view;
    view = new ItemView({
      model: item,
      timelineView: this
    });
    $(this.el).append(view.render().el);
    return this.addTimestampClass(view, item);
  };
  TimelineView.prototype.addAll = function() {
    return this.items.each(this.addOne);
  };
  TimelineView.prototype.addTimestampClass = function(view, item) {
    if (item.get('timestamp') === this.lastTimestamp) {
      $(view.el).addClass('repeat-date');
    }
    return (this.lastTimestamp = item.get('timestamp'));
  };
  TimelineView.prototype.selectItem = function(item, previousItem) {
    return previousItem.set({
      'selected': false
    });
  };
  return TimelineView;
});