var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.SubaccountList = (function() {
  function SubaccountList() {
    this.render = __bind(this.render, this);;    SubaccountList.__super__.constructor.apply(this, arguments);
  }
  __extends(SubaccountList, Backbone.View);
  SubaccountList.prototype.initialize = function(options) {
    return this.template = App.templates['members/subaccount_list'];
  };
  SubaccountList.prototype.render = function() {
    $(this.el).html(this.template(this.options));
    return this;
  };
  return SubaccountList;
})();