var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.Subaccount = (function() {
  function Subaccount() {
    this.render = __bind(this.render, this);;    Subaccount.__super__.constructor.apply(this, arguments);
  }
  __extends(Subaccount, Backbone.View);
  Subaccount.prototype.className = 'subaccount';
  Subaccount.prototype.initialize = function(options) {
    this.template = App.templates['members/subaccount'];
    return this.model.bind('change', this.render);
  };
  Subaccount.prototype.render = function() {
    var selected;
    $(this.el).html(this.template(this.model.toViewJSON()));
    selected = this.model.get('selected') === true;
    $(this.el).toggleClass('selected', selected);
    return this;
  };
  return Subaccount;
})();