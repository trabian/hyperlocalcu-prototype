var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["merchants/models/merchant", "merchants/models/feedback_list", "merchants/views/feedback_list_view", "merchants/views/sales_chart_view"], function(Merchant, FeedbackList, FeedbackListView, SalesChartView) {
  var MerchantDashboardController;
  MerchantDashboardController = function() {
    return Backbone.Controller.apply(this, arguments);
  };
  __extends(MerchantDashboardController, Backbone.Controller);
  MerchantDashboardController.prototype.initialize = function(options) {
    this.merchant = options.merchant;
    this.salesChartView = new SalesChartView({
      model: this.merchant
    });
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