var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.Account = (function() {
  function Account() {
    Account.__super__.constructor.apply(this, arguments);
  }
  __extends(Account, Backbone.Model);
  Account.prototype.initialize = function() {
    return this.refresh();
  };
  Account.prototype.refresh = function() {
    this.subaccounts = new App.model.SubaccountList(this.get('subaccounts'));
    this.shares = this.subaccounts.filter(function(subaccount) {
      return subaccount.get('type') === 'share';
    });
    return this.loans = this.subaccounts.filter(function(subaccount) {
      return subaccount.get('type') === 'loan';
    });
  };
  return Account;
})();