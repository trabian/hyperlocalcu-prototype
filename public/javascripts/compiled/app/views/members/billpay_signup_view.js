var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.BillpaySignup = (function() {
  function BillpaySignup() {
    this.submitForm = __bind(this.submitForm, this);;
    this.open = __bind(this.open, this);;
    this.close = __bind(this.close, this);;    BillpaySignup.__super__.constructor.apply(this, arguments);
  }
  __extends(BillpaySignup, Backbone.View);
  BillpaySignup.prototype.id = 'billpay-signup-dialog';
  BillpaySignup.prototype.events = {
    "click .form button": "submitForm"
  };
  BillpaySignup.prototype.initialize = function(options) {
    return this.template = App.templates['members/billpay_signup'];
  };
  BillpaySignup.prototype.render = function() {
    mpq.push([
      "track", "View Billpay Signup", {
        offer: "billpay"
      }
    ]);
    $(this.el).html(this.template());
    $(this.el).dialog({
      title: "Sign up for Billpay",
      width: 460,
      height: 310,
      open: this.open,
      close: this.close
    });
    return this.$('.form button').button();
  };
  BillpaySignup.prototype.close = function(event, ui) {
    window.location.hash = '#';
    return this.remove();
  };
  BillpaySignup.prototype.open = function(event, ui) {
    return this.delegateEvents();
  };
  BillpaySignup.prototype.submitForm = function() {
    mpq.push(["track", "Submit Billpay Signup"]);
    alert('Provide instructions on what will happen next');
    return $(this.el).dialog('close');
  };
  return BillpaySignup;
})();