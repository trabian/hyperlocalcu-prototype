var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["merchants/models/merchant", "merchants/models/feedback_list"], function(Merchant, FeedbackList) {
  var MerchantDashboardController;
  MerchantDashboardController = function() {
    return Backbone.Controller.apply(this, arguments);
  };
  __extends(MerchantDashboardController, Backbone.Controller);
  MerchantDashboardController.prototype.initialize = function(merchant) {
    this.merchant = merchant;
    this.feedback_list = new FeedbackList({
      merchant: this.merchant
    });
    this.feedback_list.fetch();
    return console.log('initialized controller with merchant', this.merchant, this.feedback_list);
  };
  return MerchantDashboardController;
});