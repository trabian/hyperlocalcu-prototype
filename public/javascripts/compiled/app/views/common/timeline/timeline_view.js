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
      this.refreshTimestamps = __bind(this.refreshTimestamps, this);;
      this.addOne = __bind(this.addOne, this);;
      this.addAll = __bind(this.addAll, this);;      TimelineView.__super__.constructor.apply(this, arguments);
    }
    __extends(TimelineView, Backbone.View);
    TimelineView.prototype.el = $('#timeline tbody');
    TimelineView.prototype.initialize = function(options) {
      this.collection.bind('refresh', this.addAll);
      if (!this.collection.isEmpty()) {
        this.addAll();
      }
      return this.collection.trigger('load');
    };
    TimelineView.prototype.addAll = function() {
      return this.collection.each(this.addOne);
    };
    TimelineView.prototype.addOne = function(model, position) {
      var rendered, view;
      view = this.options.rowFactory.build(model, this.collection);
      rendered = view.render().el;
      if (position === 'top') {
        $(this.el).prepend(rendered);
      } else {
        $(this.el).append(rendered);
      }
      return this.addTimestampClass(view, model);
    };
    TimelineView.prototype.refreshTimestamps = function() {
      var previousDay;
      previousDay = null;
      return this.$('tr').each(__bind(function(index, row) {
        var day;
        day = $(row).find('>td:first-child').text();
        if (day === previousDay) {
          $(row).addClass('repeat-date');
        } else {
          $(row).removeClass('repeat-date');
        }
        return previousDay = day;
      }, this));
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