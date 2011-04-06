var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.controller.AvailableServices = (function() {
  function AvailableServices() {
    this.showLoanApplication = __bind(this.showLoanApplication, this);;
    this.rejectBillpay = __bind(this.rejectBillpay, this);;
    this.signupForBillpay = __bind(this.signupForBillpay, this);;    AvailableServices.__super__.constructor.apply(this, arguments);
  }
  __extends(AvailableServices, Backbone.Controller);
  AvailableServices.prototype.intialize = function(options) {};
  AvailableServices.prototype.routes = {
    "billpay/signup": 'signupForBillpay',
    "billpay/no": 'rejectBillpay',
    "loans/apply": 'showLoanApplication'
  };
  AvailableServices.prototype.signupForBillpay = function() {
    this.billpaySignupView || (this.billpaySignupView = new App.view.BillpaySignup);
    return this.billpaySignupView.render();
  };
  AvailableServices.prototype.rejectBillpay = function() {
    return $('.available-service.billpay').hide();
  };
  AvailableServices.prototype.showLoanApplication = function() {
    this.loanApplicationView || (this.loanApplicationView = new App.view.LoanApplication);
    return this.loanApplicationView.render();
  };
  return AvailableServices;
})();