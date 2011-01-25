var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['text!views/members/billpay_signup.handlebars?v=1', 'vendor/handlebars', 'vendor/jquery-ui'], function(template) {
  var BillpaySignupView;
  BillpaySignupView = function() {
    var _a;
    _a = this;
    this.submitForm = function(){ return BillpaySignupView.prototype.submitForm.apply(_a, arguments); };
    this.open = function(){ return BillpaySignupView.prototype.open.apply(_a, arguments); };
    this.close = function(){ return BillpaySignupView.prototype.close.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(BillpaySignupView, Backbone.View);
  BillpaySignupView.prototype.id = 'billpay-signup-dialog';
  BillpaySignupView.prototype.events = {
    "click .form button": "submitForm"
  };
  BillpaySignupView.prototype.template = Handlebars.compile(template);
  BillpaySignupView.prototype.render = function() {
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
  BillpaySignupView.prototype.close = function(event, ui) {
    return this.remove();
  };
  BillpaySignupView.prototype.open = function(event, ui) {
    return this.delegateEvents();
  };
  BillpaySignupView.prototype.submitForm = function() {
    mpq.push(["track", "Submit Billpay Signup"]);
    alert('Provide instructions on what will happen next');
    return $(this.el).dialog('close');
  };
  return BillpaySignupView;
});