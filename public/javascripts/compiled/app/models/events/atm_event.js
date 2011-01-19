var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/events/cu_event'], function(CUEvent) {
  var AtmEvent;
  AtmEvent = function() {
    return CUEvent.apply(this, arguments);
  };
  __extends(AtmEvent, CUEvent);
  AtmEvent.prototype.initialize = function() {
    AtmEvent.__super__.initialize.call(this);
    this.description = ("ATM " + (this.depositOrWithdrawal()));
    return (this.meta = ("" + (this.get('atm').name) + " ATM"));
  };
  return AtmEvent;
});