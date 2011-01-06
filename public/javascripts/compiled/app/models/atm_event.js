var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event'], function(Event) {
  var AtmEvent;
  AtmEvent = function() {
    return Event.apply(this, arguments);
  };
  __extends(AtmEvent, Event);
  AtmEvent.prototype.initialize = function() {
    var atm_event_type;
    AtmEvent.__super__.initialize.call(this);
    atm_event_type = this.isDeposit() ? "Deposit" : "Withdrawal";
    this.description = ("ATM " + (atm_event_type));
    return (this.meta = this.get('atm').name);
  };
  AtmEvent.prototype.isDeposit = function() {
    return this.get('amount') > 0;
  };
  return AtmEvent;
});