var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/views/common/timeline/timeline_view', 'app/views/members/events/row_factory'], function(TimelineView, MemberTimelineRowFactory) {
  var MemberTimeline;
  MemberTimeline = function() {
    return TimelineView.apply(this, arguments);
  };
  __extends(MemberTimeline, TimelineView);
  MemberTimeline.prototype.initialize = function(options) {
    options.rowFactory = new MemberTimelineRowFactory();
    return MemberTimeline.__super__.initialize.call(this, options);
  };
  return MemberTimeline;
});