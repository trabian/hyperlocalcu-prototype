var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.MemberDashboard = (function() {
  function MemberDashboard() {
    this.renderAccount = __bind(this.renderAccount, this);;
    this.renderTimeline = __bind(this.renderTimeline, this);;
    this.selectSubaccount = __bind(this.selectSubaccount, this);;
    this.render = __bind(this.render, this);;    MemberDashboard.__super__.constructor.apply(this, arguments);
  }
  __extends(MemberDashboard, Backbone.View);
  MemberDashboard.prototype.initialize = function(options) {
    this.render();
    return this.model.accounts.current().subaccounts.bind('selectOne', this.selectSubaccount);
  };
  MemberDashboard.prototype.render = function() {
    return this.renderAccount();
  };
  MemberDashboard.prototype.selectSubaccount = function(subaccount) {
    subaccount.events.unbind('refresh', this.renderTimeline);
    subaccount.events.bind('refresh', this.renderTimeline, subaccount);
    return this.renderTimeline;
  };
  MemberDashboard.prototype.renderTimeline = function(subaccount) {
    var timelineView;
    timelineView = new App.view.AccountTimeline({
      model: subaccount
    });
    return $('#main .content').html(timelineView.render().el);
  };
  MemberDashboard.prototype.renderAccount = function() {
    this.accountView = new App.view.Account({
      model: this.model.accounts.current()
    });
    return $('#sidebar').html(this.accountView.render().el);
  };
  return MemberDashboard;
})();