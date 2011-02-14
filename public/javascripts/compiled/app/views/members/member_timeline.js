var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.MemberTimeline = (function() {
  function MemberTimeline() {
    MemberTimeline.__super__.constructor.apply(this, arguments);
  }
  __extends(MemberTimeline, App.view.Timeline);
  MemberTimeline.prototype.initialize = function(options) {
    options.rowFactory = new App.view.MemberTimelineRowFactory;
    return MemberTimeline.__super__.initialize.call(this, options);
  };
  return MemberTimeline;
})();