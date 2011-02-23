var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.Accounts = (function() {
  function Accounts() {
    this.render = __bind(this.render, this);;    Accounts.__super__.constructor.apply(this, arguments);
  }
  __extends(Accounts, Backbone.View);
  Accounts.prototype.id = 'accounts';
  Accounts.prototype.initialize = function(options) {
    this.template = App.templates['members/accounts'];
    return this.collection.bind('change:selected', this.render);
  };
  Accounts.prototype.render = function() {
    $(this.el).html(this.template({
      current: this.collection.current().toJSON()
    }));
    return this;
  };
  return Accounts;
})();