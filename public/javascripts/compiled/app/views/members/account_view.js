var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.Account = (function() {
  function Account() {
    Account.__super__.constructor.apply(this, arguments);
  }
  __extends(Account, Backbone.View);
  Account.prototype.id = 'account';
  Account.prototype.initialize = function(options) {
    return this.template = App.templates['members/account'];
  };
  Account.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  };
  return Account;
})();