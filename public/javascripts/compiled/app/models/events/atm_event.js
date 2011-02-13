var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/events/cu_event'], function(CUEvent) {
  var AtmEvent;
  return AtmEvent = (function() {
    function AtmEvent() {
      AtmEvent.__super__.constructor.apply(this, arguments);
    }
    __extends(AtmEvent, CUEvent);
    AtmEvent.prototype.initialize = function() {
      AtmEvent.__super__.initialize.call(this);
      this.description = "ATM " + (this.depositOrWithdrawal());
      this.meta = "" + (this.get('atm').name) + " ATM";
      return this.nameAndAddress = "<h2>Vantage Credit Union</h2><h3>" + (this.get('atm').name) + " ATM</h3><p>" + (this.get('atm')['address_summary']) + "</p>";
    };
    AtmEvent.prototype.toDetailJSON = function() {
      var detailJSON;
      detailJSON = AtmEvent.__super__.toDetailJSON.call(this);
      return _.extend(detailJSON, {
        address: this.nameAndAddress
      });
    };
    return AtmEvent;
  })();
});