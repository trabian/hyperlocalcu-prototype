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
    this.selectSubaccount = __bind(this.selectSubaccount, this);;    MemberDashboard.__super__.constructor.apply(this, arguments);
  }
  __extends(MemberDashboard, Backbone.Controller);
  MemberDashboard.prototype.initialize = function(options) {
    this.member = options.member;
    this.dashboardView = new App.view.MemberDashboard({
      model: this.member
    });
    return Backbone.history.start();
  };
  MemberDashboard.prototype.routes = {
    "accounts/:account_id/subaccounts/:subaccount_id": "selectSubaccount"
  };
  MemberDashboard.prototype.selectSubaccount = function(accountId, subaccountId) {
    var account;
    account = this.member.accounts.get(accountId);
    return this.member.accounts.get(accountId).subaccounts.selectOne(subaccountId);
  };
  return MemberDashboard;
})();