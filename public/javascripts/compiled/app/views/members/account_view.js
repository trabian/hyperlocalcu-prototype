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
    this.model = this.collection.current();
    $(this.el).html(this.template({
      current: this.model.toJSON()
    }));
    this.addSubaccounts(this.model.shares, 'share-accounts', 'Share Accounts');
    this.addSubaccounts(this.model.loans, 'loan-accounts', 'Loan Accounts');
    return this;
  };
  Account.prototype.addSubaccounts = function(collection, className, title) {
    var listView;
    if (!collection.isEmpty()) {
      listView = new App.view.SubaccountList({
        model: this.model,
        className: className,
        title: title,
        collection: collection
      });
      return $(this.el).append(listView.render().el);
    }
  };
  return Account;
})();