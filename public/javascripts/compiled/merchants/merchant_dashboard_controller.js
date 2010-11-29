var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["merchants/models/merchant", "merchants/models/feedback_list", "merchants/views/feedback_list_view"], function(Merchant, FeedbackList, FeedbackListView) {
  var MerchantDashboardController;
  MerchantDashboardController = function() {
    return Backbone.Controller.apply(this, arguments);
  };
  __extends(MerchantDashboardController, Backbone.Controller);
  MerchantDashboardController.prototype.initialize = function(options) {
    this.merchant = options.merchant;
    this.feedbackList = new FeedbackList({
      merchant: this.merchant
    });
    this.feedbackListView = new FeedbackListView(this.feedbackList);
    return this.feedbackList.fetch({
      success: function() {
        $('#dashboard-loading').hide();
        return $('#feedback').show();
      }
    });
  };
  return MerchantDashboardController;
});