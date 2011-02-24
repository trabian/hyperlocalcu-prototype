var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
App.model.Account = (function() {
  function Account() {
    Account.__super__.constructor.apply(this, arguments);
  }
  __extends(Account, Backbone.Model);
  Account.prototype.initialize = function() {
    return this.refresh();
  };
  Account.prototype.refresh = function() {
    var rawLoans, rawShares;
    this.subaccounts = new App.model.SubaccountList(this.get('subaccounts'));
    this.subaccounts.account = this;
    rawShares = this.subaccounts.filter(function(subaccount) {
      return subaccount.get('account_type') === 'share';
    });
    this.shares = new App.model.SubaccountList(rawShares);
    rawLoans = this.subaccounts.filter(function(subaccount) {
      return subaccount.get('account_type') === 'loan';
    });
    this.loans = new App.model.SubaccountList(rawLoans);
    return this.subaccounts.bind('selectOne', __bind(function(subaccount) {
      var account_type;
      account_type = subaccount.get('account_type');
      this.shares.trigger('selectSubaccounts', account_type === 'share');
      return this.loans.trigger('selectSubaccounts', account_type === 'loan');
    }, this));
  };
  return Account;
})();