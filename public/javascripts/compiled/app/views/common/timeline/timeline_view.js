var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(function() {
  var TimelineView;
  TimelineView = function() {
    var _a;
    _a = this;
    this.addOne = function(){ return TimelineView.prototype.addOne.apply(_a, arguments); };
    this.addAll = function(){ return TimelineView.prototype.addAll.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(TimelineView, Backbone.View);
  TimelineView.prototype.el = $('#timeline tbody');
  TimelineView.prototype.initialize = function(options) {
    this.collection.bind('refresh', this.addAll);
    if (!(this.collection.isEmpty())) {
      this.addAll();
      return this.collection.trigger('load');
    }
  };
  TimelineView.prototype.addAll = function() {
    return this.collection.each(this.addOne);
  };
  TimelineView.prototype.addOne = function(model) {
    var view;
    view = this.options.rowFactory.build(model, this.collection);
    $(this.el).append(view.render().el);
    return this.addTimestampClass(view, model);
  };
  TimelineView.prototype.addTimestampClass = function(view, event) {
    if (event.day() === this.lastEventDay) {
      $(view.el).addClass('repeat-date');
    }
    return (this.lastEventDay = event.day());
  };
  return TimelineView;
});