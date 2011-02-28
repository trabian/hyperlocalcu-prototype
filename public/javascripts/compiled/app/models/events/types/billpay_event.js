var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.BillpayEvent = (function() {
  function BillpayEvent() {
    BillpayEvent.__super__.constructor.apply(this, arguments);
  }
  __extends(BillpayEvent, App.model.MerchantEvent);
  BillpayEvent.prototype.initialize = function() {
    BillpayEvent.__super__.initialize.call(this);
    return this.meta = "Billpay #" + this.id;
  };
  BillpayEvent.prototype.toDetailJSON = function() {
    var detailJSON;
    detailJSON = BillpayEvent.__super__.toDetailJSON.call(this);
    return _.extend(detailJSON, {
      bill_payment_processing_days: this.get('bill_payment_processing_days'),
      bill_payment_submitted_date: this.formatDate(this.get('bill_payment_submitted_date')),
      description: "Billpay #" + this.id
    });
  };
  return BillpayEvent;
})();
App.model.EventFactory.billpay = App.model.BillpayEvent;