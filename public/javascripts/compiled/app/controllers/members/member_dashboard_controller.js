var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.controller.MemberDashboard = (function() {
  function MemberDashboard() {
    this.hideEventDetail = __bind(this.hideEventDetail, this);;
    this.showEventDetail = __bind(this.showEventDetail, this);;    MemberDashboard.__super__.constructor.apply(this, arguments);
  }
  __extends(MemberDashboard, App.controller.Timeline);
  MemberDashboard.prototype.initialize = function(options) {
    MemberDashboard.__super__.initialize.call(this, options);
    this.bind('select', this.showEventDetail);
    this.bind('unselect', this.hideEventDetail);
    this.member = options.member;
    this.timeline = new App.view.MemberTimeline({
      collection: this.events
    });
    console.log(this.member.accounts);
    this.accountView = new App.view.Account({
      collection: this.member.accounts
    });
    return $('#sidebar').prepend(this.accountView.render().el);
  };
  MemberDashboard.prototype.showEventDetail = function(event) {
    var detail_view_class;
    this.detail_views || (this.detail_views = {
      atm: App.view.AtmDetail,
      branch: App.view.BranchDetail,
      billpay: App.view.BillpayDetail,
      card: App.view.CardDetail,
      check: App.view.CheckDetail
    });
    detail_view_class = this.detail_views[event.get('event_type')] || App.view.EventDetail;
    this.detailView = new detail_view_class({
      model: event,
      el: $('#event-detail-view')
    });
    return this.detailView.render();
  };
  MemberDashboard.prototype.hideEventDetail = function(event) {
    return this.detailView.hide();
  };
  return MemberDashboard;
})();