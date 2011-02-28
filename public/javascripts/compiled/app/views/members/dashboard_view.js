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
    this.renderTimeline = __bind(this.renderTimeline, this);;
    this.render = __bind(this.render, this);;    MemberDashboard.__super__.constructor.apply(this, arguments);
  }
  __extends(MemberDashboard, Backbone.View);
  MemberDashboard.prototype.initialize = function(options) {
    var subaccounts;
    if (this.model.accounts.length !== 0) {
      this.render();
      subaccounts = this.model.accounts.current().subaccounts;
      return subaccounts.bind('selectOne', this.renderTimeline);
    }
  };
  MemberDashboard.prototype.render = function() {
    this.accountView = new App.view.Account({
      model: this.model.accounts.current()
    });
    return $('#sidebar').html(this.accountView.render().el);
  };
  MemberDashboard.prototype.renderTimeline = function(subaccount) {
    this.timelineView = new App.view.AccountTimeline({
      model: subaccount
    });
    return $('#main .content').html(this.timelineView.render().el);
  };
  return MemberDashboard;
})();