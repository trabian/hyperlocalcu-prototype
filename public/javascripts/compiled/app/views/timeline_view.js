var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/item_list', 'app/views/item_view', 'app/views/summary_view'], function(Items, ItemView, SummaryView) {
  var TimelineView;
  TimelineView = function() {
    return Backbone.View.apply(this, arguments);
  };
  __extends(TimelineView, Backbone.View);
  TimelineView.prototype.el = $('#timeline tbody');
  TimelineView.prototype.initialize = function() {
    var summary_view;
    summary_view = new SummaryView();
    _.bindAll(this, 'addAll', 'addOne');
    return Items.bind('refresh', this.addAll);
  };
  TimelineView.prototype.addOne = function(item) {
    var view;
    view = new ItemView({
      model: item
    });
    $(this.el).append(view.render().el);
    return this.addTimestampClass(view, item);
  };
  TimelineView.prototype.addAll = function() {
    return Items.each(this.addOne);
  };
  TimelineView.prototype.addTimestampClass = function(view, item) {
    if (item.get('timestamp') === this.lastTimestamp) {
      $(view.el).addClass('repeat-date');
    }
    return (this.lastTimestamp = item.get('timestamp'));
  };
  return TimelineView;
});