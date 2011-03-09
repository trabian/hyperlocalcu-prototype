var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.BillpayDetail = (function() {
  function BillpayDetail() {
    this.renderFeedback = __bind(this.renderFeedback, this);;
    this.render = __bind(this.render, this);;    BillpayDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(BillpayDetail, Backbone.View);
  BillpayDetail.prototype.render = function() {
    $(this.el).html(App.templates['events/billpay/detail'](this.model.toDetailJSON()));
    return this;
  };
  BillpayDetail.prototype.renderFeedback = function() {
    this.options.parent.renderLocationFeedbackView('merchant');
    if (this.model.get('vendor') != null) {
      return this.options.parent.addSubjectFeedbackView('vendor');
    }
  };
  return BillpayDetail;
})();
App.view.EventDetailFactory.billpay = App.view.BillpayDetail;