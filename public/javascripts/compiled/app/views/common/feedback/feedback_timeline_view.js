var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["app/views/common/timeline/timeline_view", "app/views/common/feedback/timeline/row_factory"], function(TimelineView, FeedbackRowFactory) {
  var FeedbackTimelineView;
  return FeedbackTimelineView = (function() {
    function FeedbackTimelineView() {
      FeedbackTimelineView.__super__.constructor.apply(this, arguments);
    }
    __extends(FeedbackTimelineView, TimelineView);
    FeedbackTimelineView.prototype.initialize = function(options) {
      options.rowFactory = new FeedbackRowFactory;
      return FeedbackTimelineView.__super__.initialize.call(this, options);
    };
    return FeedbackTimelineView;
  })();
});