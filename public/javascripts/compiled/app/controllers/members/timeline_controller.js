var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["app/controllers/common/timeline_controller", "app/views/members/member_timeline", "app/views/members/events/detail", "app/views/members/events/billpay/detail", "app/views/members/events/check/detail"], function(TimelineController, MemberTimeline, EventDetailView, BillpayDetailView, CheckDetailView) {
  var MemberTimelineController;
  MemberTimelineController = function() {
    var _a;
    _a = this;
    this.hideEventDetail = function(){ return MemberTimelineController.prototype.hideEventDetail.apply(_a, arguments); };
    this.showEventDetail = function(){ return MemberTimelineController.prototype.showEventDetail.apply(_a, arguments); };
    return TimelineController.apply(this, arguments);
  };
  __extends(MemberTimelineController, TimelineController);
  MemberTimelineController.prototype.initialize = function(options) {
    MemberTimelineController.__super__.initialize.call(this, options);
    this.bind('select', this.showEventDetail);
    this.bind('unselect', this.hideEventDetail);
    return (this.timeline = new MemberTimeline({
      collection: this.events
    }));
  };
  MemberTimelineController.prototype.showEventDetail = function(event) {
    var detail_view_class;
    this.detail_views || (this.detail_views = {
      billpay: BillpayDetailView,
      check: CheckDetailView
    });
    detail_view_class = this.detail_views[event.get('event_type')] || EventDetailView;
    this.detailView = new detail_view_class({
      model: event,
      el: $('#event-detail-view')
    });
    return this.detailView.render();
  };
  MemberTimelineController.prototype.hideEventDetail = function(event) {
    return this.detailView.hide();
  };
  return MemberTimelineController;
});