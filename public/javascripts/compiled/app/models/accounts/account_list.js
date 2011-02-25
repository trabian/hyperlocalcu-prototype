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
  AccountList.prototype.defaultSelected = function() {
    return this.first();
  };
  return AccountList;
})();
_.extend(App.model.AccountList.prototype, App.model.extension.Selectable);