var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.Account = (function() {
  function Account() {
    this.render = __bind(this.render, this);;    Account.__super__.constructor.apply(this, arguments);
  }
  __extends(Account, Backbone.View);
  Account.prototype.id = 'accounts';
  Account.prototype.initialize = function(options) {
    this.template = App.templates['members/account'];
    return this.collection.bind('change:selected', this.render);
  };
  Account.prototype.render = function() {
    var loansView, sharesView;
    this.model = this.collection.current();
    $(this.el).html(this.template({
      current: this.model.toJSON()
    }));
    sharesView = new App.view.SubaccountList({
      model: this.model,
      className: 'share-accounts',
      title: "Share Accounts",
      subaccounts: this.model.shares
    });
    $(this.el).append(sharesView.render().el);
    loansView = new App.view.SubaccountList({
      model: this.model,
      className: 'loan-accounts',
      title: "Loan Accounts",
      subaccounts: this.model.loans
    });
    $(this.el).append(loansView.render().el);
    return this;
  };
  return Account;
})();