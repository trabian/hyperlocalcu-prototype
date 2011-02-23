var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.AccountList = (function() {
  function AccountList() {
    AccountList.__super__.constructor.apply(this, arguments);
  }
  __extends(AccountList, Backbone.Collection);
  AccountList.prototype.model = App.model.Account;
  AccountList.prototype.selected = function() {
    return this.filter(function(account) {
      return account.get('selected');
    });
  };
  AccountList.prototype.current = function() {
    var selectedAccounts;
    selectedAccounts = this.selected();
    if (_.isEmpty(selectedAccounts)) {
      return this.first();
    } else {
      return _.first(selectedAccounts);
    }
  };
  AccountList.prototype.selectOne = function(account) {
    _.each(this.selected(), function(selectedAccount) {
      return selectedAccount.set({
        'selected': false
      });
    });
    if (account != null) {
      return account.set({
        'selected': true
      });
    }
  };
  return AccountList;
})();