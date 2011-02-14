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
    this.renderDetail = __bind(this.renderDetail, this);;    BillpayDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(BillpayDetail, App.view.EventDetail);
  BillpayDetail.prototype.eventTypeOptions = {
    template: Handlebars.compile(template)
  };
  BillpayDetail.prototype.renderDetail = function() {
    if (this.model.get('vendor') != null) {
      return this.addFeedbackView('vendor');
    }
  };
  return BillpayDetail;
})();