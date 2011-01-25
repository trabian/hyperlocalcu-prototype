var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["app/controllers/common/timeline_controller", "app/views/members/member_timeline", "app/views/members/events/detail", "app/views/members/events/billpay/detail", "app/views/members/events/branch/detail", "app/views/members/events/check/detail"], function(TimelineController, MemberTimeline, EventDetailView, BillpayDetailView, BranchDetailView, CheckDetailView) {
  var MemberTimelineController;
  return MemberTimelineController = (function() {
    function MemberTimelineController() {
      this.hideEventDetail = __bind(this.hideEventDetail, this);;
      this.showEventDetail = __bind(this.showEventDetail, this);;      MemberTimelineController.__super__.constructor.apply(this, arguments);
    }
    __extends(MemberTimelineController, TimelineController);
    MemberTimelineController.prototype.initialize = function(options) {
      MemberTimelineController.__super__.initialize.call(this, options);
      this.bind('select', this.showEventDetail);
      this.bind('unselect', this.hideEventDetail);
      return this.timeline = new MemberTimeline({
        collection: this.events
      });
    };
    MemberTimelineController.prototype.showEventDetail = function(event) {
      var detail_view_class;
      this.detail_views || (this.detail_views = {
        branch: BranchDetailView,
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
  })();
});