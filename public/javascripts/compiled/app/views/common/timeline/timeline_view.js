var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(function() {
  var TimelineView;
  return TimelineView = (function() {
    function TimelineView() {
      this.addOne = __bind(this.addOne, this);;
      this.addAll = __bind(this.addAll, this);;      TimelineView.__super__.constructor.apply(this, arguments);
    }
    __extends(TimelineView, Backbone.View);
    TimelineView.prototype.el = $('#timeline tbody');
    TimelineView.prototype.initialize = function(options) {
      this.collection.bind('refresh', this.addAll);
      this.collection.bind('add', this.addOne);
      if (!this.collection.isEmpty()) {
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
      return this.lastEventDay = event.day();
    };
    return TimelineView;
  })();
});