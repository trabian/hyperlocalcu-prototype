var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event'], function(Event) {
  var CardEvent;
  CardEvent = function() {
    return Event.apply(this, arguments);
  };
  __extends(CardEvent, Event);
  CardEvent.prototype.initialize = function() {
    var check_name, merchant, name;
    CardEvent.__super__.initialize.call(this);
    merchant = this.get('merchant');
    name = this.get('name');
    check_name = ("Check #" + (this.get('check_number')));
    if (typeof merchant !== "undefined" && merchant !== null) {
      this.description = this.get('merchant').name;
      return (this.meta = name);
    } else {
      return (this.description = name);
    }
  };
  return CardEvent;
});