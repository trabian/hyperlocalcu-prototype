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
    AtmEvent.__super__.initialize.call(this);
    this.description = ("ATM " + (this.depositOrWithdrawal()));
    return (this.meta = ("" + (this.get('atm').name) + " ATM"));
  };
  return AtmEvent;
});