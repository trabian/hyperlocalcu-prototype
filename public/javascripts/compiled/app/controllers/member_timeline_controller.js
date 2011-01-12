var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["app/views/timeline/member_timeline", "app/views/timeline/events/detail", "app/views/timeline/events/billpay/detail", "app/models/event_list"], function(MemberTimeline, EventDetailView, BillpayDetailView, EventList) {
  var MemberTimelineController;
  MemberTimelineController = function() {
    var _a;
    _a = this;
    this.showEventDetail = function(){ return MemberTimelineController.prototype.showEventDetail.apply(_a, arguments); };
    this.changeSelected = function(){ return MemberTimelineController.prototype.changeSelected.apply(_a, arguments); };
    this.fetch = function(){ return MemberTimelineController.prototype.fetch.apply(_a, arguments); };
    this.setupTimeline = function(){ return MemberTimelineController.prototype.setupTimeline.apply(_a, arguments); };
    this.setupEventList = function(){ return MemberTimelineController.prototype.setupEventList.apply(_a, arguments); };
    this.selectEvent = function(){ return MemberTimelineController.prototype.selectEvent.apply(_a, arguments); };
    return Backbone.Controller.apply(this, arguments);
  };
  __extends(MemberTimelineController, Backbone.Controller);
  MemberTimelineController.prototype.initialize = function(options) {
    this.setupEventList();
    this.setupTimeline();
    this.detail_views = {
      billpay: BillpayDetailView
    };
    if (options.fetchOnInit === true) {
      return this.fetch();
    }
  };
  MemberTimelineController.prototype.routes = {
    "events/:event_id": 'selectEvent'
  };
  MemberTimelineController.prototype.selectEvent = function(eventId) {
    return this.events.selectOne(this.events.get(eventId));
  };
  MemberTimelineController.prototype.setupEventList = function() {
    this.events = new EventList();
    this.events.bind('change:selected', this.changeSelected);
    return this.events.bind('unselect', __bind(function() {
      return this.saveLocation('');
    }, this));
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
  MemberTimelineController.prototype.changeSelected = function(event) {
    if (event.get('selected')) {
      this.saveLocation("events/" + (event.id));
      return this.showEventDetail(event);
    } else {
      return this.detailView.hide();
    }
  };
  MemberTimelineController.prototype.showEventDetail = function(event) {
    var detail_view_class;
    detail_view_class = this.detail_views[event.get('event_type')] || EventDetailView;
    this.detailView = new detail_view_class({
      model: event,
      el: $('#event-detail-view')
    });
    return this.detailView.render();
  };
  return MemberTimelineController;
});