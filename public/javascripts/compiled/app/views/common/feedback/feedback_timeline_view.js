var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(["app/views/common/timeline/timeline_view", "app/views/common/feedback/timeline/row_factory"], function(TimelineView, FeedbackRowFactory) {
  var FeedbackTimelineView;
  return FeedbackTimelineView = (function() {
    function FeedbackTimelineView() {
      FeedbackTimelineView.__super__.constructor.apply(this, arguments);
    }
    __extends(FeedbackTimelineView, TimelineView);
    FeedbackTimelineView.prototype.initialize = function(options) {
      options.rowFactory = new FeedbackRowFactory;
      FeedbackTimelineView.__super__.initialize.call(this, options);
      return this.collection.bind('add', __bind(function(model) {
        this.addOne(model, 'top');
        return this.refreshTimestamps();
      }, this));
    };
    return FeedbackTimelineView;
  })();
});