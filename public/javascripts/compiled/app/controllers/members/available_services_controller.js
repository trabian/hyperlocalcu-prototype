var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["app/views/members/billpay_signup_view"], function(BillpaySignupView) {
  var AvailableServicesController;
  return AvailableServicesController = (function() {
    function AvailableServicesController() {
      this.rejectBillpay = __bind(this.rejectBillpay, this);;
      this.signupForBillpay = __bind(this.signupForBillpay, this);;      AvailableServicesController.__super__.constructor.apply(this, arguments);
    }
    __extends(AvailableServicesController, Backbone.Controller);
    AvailableServicesController.prototype.intialize = function(options) {};
    AvailableServicesController.prototype.routes = {
      "billpay/signup": 'signupForBillpay',
      "billpay/no": 'rejectBillpay'
    };
    AvailableServicesController.prototype.signupForBillpay = function() {
      this.billpaySignupView || (this.billpaySignupView = new BillpaySignupView);
      return this.billpaySignupView.render();
    };
    AvailableServicesController.prototype.rejectBillpay = function() {
      return $('.available-service.billpay').hide();
    };
    return AvailableServicesController;
  })();
});