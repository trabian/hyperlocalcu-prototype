var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(function() {
  var Merchant;
  Merchant = function() {
    return Backbone.Model.apply(this, arguments);
  };
  __extends(Merchant, Backbone.Model);
  return Merchant;
});