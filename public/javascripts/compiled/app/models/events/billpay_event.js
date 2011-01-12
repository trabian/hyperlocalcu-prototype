var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/events/merchant_event'], function(MerchantEvent) {
  var BillpayEvent;
  BillpayEvent = function() {
    return MerchantEvent.apply(this, arguments);
  };
  __extends(BillpayEvent, MerchantEvent);
  BillpayEvent.prototype.initialize = function() {
    BillpayEvent.__super__.initialize.call(this);
    return (this.meta = ("Billpay #" + (this.id)));
  };
  BillpayEvent.prototype.toDetailJSON = function() {
    var detailJSON;
    detailJSON = BillpayEvent.__super__.toDetailJSON.call(this);
    return _.extend(detailJSON, {
      bill_payment_processing_days: this.get('bill_payment_processing_days'),
      bill_payment_submitted_date: this.formatDate(this.get('bill_payment_submitted_date'))
    });
  };
  return BillpayEvent;
});