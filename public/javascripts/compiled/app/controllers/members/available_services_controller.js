var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["app/views/members/billpay_signup_view"], function(BillpaySignupView) {
  var AvailableServicesController;
  AvailableServicesController = function() {
    var _a;
    _a = this;
    this.rejectBillpay = function(){ return AvailableServicesController.prototype.rejectBillpay.apply(_a, arguments); };
    this.signupForBillpay = function(){ return AvailableServicesController.prototype.signupForBillpay.apply(_a, arguments); };
    return Backbone.Controller.apply(this, arguments);
  };
  __extends(AvailableServicesController, Backbone.Controller);
  AvailableServicesController.prototype.intialize = function(options) {};
  AvailableServicesController.prototype.routes = {
    "billpay/signup": 'signupForBillpay',
    "billpay/no": 'rejectBillpay'
  };
  AvailableServicesController.prototype.signupForBillpay = function() {
    this.billpaySignupView || (this.billpaySignupView = new BillpaySignupView());
    return this.billpaySignupView.render();
  };
  AvailableServicesController.prototype.rejectBillpay = function() {
    return $('.available-service.billpay').hide();
  };
  return AvailableServicesController;
});