var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(function() {
  var MerchantDashboardController;
  MerchantDashboardController = function() {
    return Backbone.Controller.apply(this, arguments);
  };
  __extends(MerchantDashboardController, Backbone.Controller);
  MerchantDashboardController.prototype.initialize = function() {
    return console.log('Initialized dashboard');
  };
  return MerchantDashboardController;
});