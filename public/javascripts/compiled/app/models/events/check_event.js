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
    var check_name, merchant;
    BillpayEvent.__super__.initialize.call(this);
    merchant = this.get('merchant');
    check_name = ("Check #" + (this.get('check_number')));
    if (typeof merchant !== "undefined" && merchant !== null) {
      this.description = this.get('merchant').name;
      return (this.meta = check_name);
    } else {
      return (this.description = check_name);
    }
  };
  return BillpayEvent;
});