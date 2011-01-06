var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["app/views/timeline/member_timeline", "app/models/event_list"], function(MemberTimeline, EventList) {
  var MemberTimelineController;
  MemberTimelineController = function() {
    var _a;
    _a = this;
    this.fetch = function(){ return MemberTimelineController.prototype.fetch.apply(_a, arguments); };
    this.setupTimeline = function(){ return MemberTimelineController.prototype.setupTimeline.apply(_a, arguments); };
    this.setupEventList = function(){ return MemberTimelineController.prototype.setupEventList.apply(_a, arguments); };
    return Backbone.Controller.apply(this, arguments);
  };
  __extends(MemberTimelineController, Backbone.Controller);
  MemberTimelineController.prototype.initialize = function(options) {
    this.setupEventList();
    this.setupTimeline();
    if (options.fetchOnInit === true) {
      return this.fetch();
    }
  };
  MemberTimelineController.prototype.routes = {
    "events/:event_id": 'selectEvent'
  };
  MemberTimelineController.prototype.setupEventList = function() {
    return (this.events = new EventList());
  };
  MemberTimelineController.prototype.setupTimeline = function() {
    return (this.timeline = new MemberTimeline(this.events));
  };
  MemberTimelineController.prototype.fetch = function() {
    return this.events.fetch({
      success: function() {
        $('#timeline-loading').hide();
        $('#timeline').show();
        return Backbone.history.start();
      }
    });
  };
  return MemberTimelineController;
});