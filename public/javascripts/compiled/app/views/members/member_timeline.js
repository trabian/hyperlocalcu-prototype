var MemberTimeline;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
MemberTimeline = (function() {
  function MemberTimeline() {
    MemberTimeline.__super__.constructor.apply(this, arguments);
  }
  __extends(MemberTimeline, TimelineView);
  MemberTimeline.prototype.initialize = function(options) {
    options.rowFactory = new MemberTimelineRowFactory;
    return MemberTimeline.__super__.initialize.call(this, options);
  };
  return MemberTimeline;
})();