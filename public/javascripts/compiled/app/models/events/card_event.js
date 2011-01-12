var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/events/merchant_event'], function(MerchantEvent) {
  var CardEvent;
  CardEvent = function() {
    return MerchantEvent.apply(this, arguments);
  };
  __extends(CardEvent, MerchantEvent);
  CardEvent.prototype.initialize = function() {
    var _a, name;
    CardEvent.__super__.initialize.call(this);
    name = this.get('name');
    return (typeof (_a = this.merchant) !== "undefined" && _a !== null) ? (this.meta = name) : (this.description = name);
  };
  return CardEvent;
});