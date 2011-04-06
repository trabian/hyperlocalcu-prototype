var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.LoanApplication = (function() {
  function LoanApplication() {
    this.submitForm = __bind(this.submitForm, this);;
    this.open = __bind(this.open, this);;
    this.close = __bind(this.close, this);;    LoanApplication.__super__.constructor.apply(this, arguments);
  }
  __extends(LoanApplication, Backbone.View);
  LoanApplication.prototype.id = 'loan-application-dialog';
  LoanApplication.prototype.events = {
    "click .form button": "submitForm"
  };
  LoanApplication.prototype.initialize = function(options) {
    return this.template = App.templates['loans/application'];
  };
  LoanApplication.prototype.render = function() {
    $(this.el).html(this.template());
    $(this.el).dialog({
      title: "Apply for a Loan",
      width: 460,
      height: 310,
      open: this.open,
      close: this.close
    });
    return this.$('.form button').button();
  };
  LoanApplication.prototype.close = function(event, ui) {
    window.location.hash = '#';
    return this.remove();
  };
  LoanApplication.prototype.open = function(event, ui) {
    return this.delegateEvents();
  };
  LoanApplication.prototype.submitForm = function() {
    var loans;
    loans = new App.model.LoanApplicationList;
    loans.create({
      requested_amount: this.$('.amount').val()
    });
    alert('Provide instructions on what will happen next');
    return $(this.el).dialog('close');
  };
  return LoanApplication;
})();