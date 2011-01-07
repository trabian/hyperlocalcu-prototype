var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event'], function(Event) {
  var BillpayEvent;
  BillpayEvent = function() {
    return Event.apply(this, arguments);
  };
  __extends(BillpayEvent, Event);
  BillpayEvent.prototype.initialize = function() {
    BillpayEvent.__super__.initialize.call(this);
    this.description = this.get('merchant').name;
    return (this.meta = ("Billpay #" + (this.id)));
  };
  return BillpayEvent;
});