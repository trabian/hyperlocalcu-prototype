var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/events/merchant_event'], function(MerchantEvent) {
  var CardEvent;
  return CardEvent = (function() {
    function CardEvent() {
      CardEvent.__super__.constructor.apply(this, arguments);
    }
    __extends(CardEvent, MerchantEvent);
    CardEvent.prototype.initialize = function() {
      var name;
      CardEvent.__super__.initialize.call(this);
      name = this.get('name');
      if (this.merchant != null) {
        return this.meta = name;
      } else {
        return this.description = name;
      }
    };
    return CardEvent;
  })();
});