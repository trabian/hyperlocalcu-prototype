var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.LoanApplication = (function() {
  function LoanApplication() {
    this.toUpdateJSON = __bind(this.toUpdateJSON, this);;    LoanApplication.__super__.constructor.apply(this, arguments);
  }
  __extends(LoanApplication, Backbone.Model);
  LoanApplication.prototype.initialize = function() {
    return this.sync = App.model.CustomSync;
  };
  LoanApplication.prototype.toUpdateJSON = function() {
    return {
      loan_application: {
        requested_amount: this.get('requested_amount'),
        member_number: '1234'
      }
    };
  };
  return LoanApplication;
})();