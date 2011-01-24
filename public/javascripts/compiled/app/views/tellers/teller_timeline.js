var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["app/views/common/timeline/timeline_view", "app/views/common/feedback/timeline/row_factory"], function(TimelineView, FeedbackRowFactory) {
  var TellerTimelineView;
  TellerTimelineView = function() {
    return TimelineView.apply(this, arguments);
  };
  __extends(TellerTimelineView, TimelineView);
  TellerTimelineView.prototype.initialize = function(options) {
    options.rowFactory = new FeedbackRowFactory();
    return TellerTimelineView.__super__.initialize.call(this, options);
  };
  return TellerTimelineView;
});