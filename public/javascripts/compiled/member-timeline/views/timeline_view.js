var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['member-timeline/views/item_view'], function(ItemView) {
  var TimelineView;
  TimelineView = function() {
    var _a;
    _a = this;
    this.addAll = function(){ return TimelineView.prototype.addAll.apply(_a, arguments); };
    this.addOne = function(){ return TimelineView.prototype.addOne.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(TimelineView, Backbone.View);
  TimelineView.prototype.el = $('#timeline tbody');
  TimelineView.prototype.initialize = function(items) {
    this.items = items;
    return this.items.bind('refresh', this.addAll);
  };
  TimelineView.prototype.addOne = function(item) {
    var view;
    view = new ItemView({
      model: item,
      collection: this.items,
      id: item.id
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
  return TimelineView;
});