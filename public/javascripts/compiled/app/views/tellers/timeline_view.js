var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["app/views/common/timeline/timeline_view"], function(TimelineView) {
  var TellerTimelineView;
  TellerTimelineView = function() {
    return TimelineView.apply(this, arguments);
  };
  __extends(TellerTimelineView, TimelineView);
  return TellerTimelineView;
});