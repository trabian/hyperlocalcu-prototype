var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/event'], function(Event) {
  var StatementEvent;
  return StatementEvent = (function() {
    function StatementEvent() {
      StatementEvent.__super__.constructor.apply(this, arguments);
    }
    __extends(StatementEvent, Event);
    StatementEvent.prototype.initialize = function() {
      StatementEvent.__super__.initialize.call(this);
      this.description = this.get('name');
      return this.className = "statement";
    };
    StatementEvent.prototype.toViewJSON = function() {
      var eventViewJSON;
      eventViewJSON = StatementEvent.__super__.toViewJSON.call(this);
      return _.extend(eventViewJSON, {
        opening_balance: this.formatCurrency(this.get('opening_balance')),
        ending_balance: this.formatCurrency(this.get('ending_balance'))
      });
    };
    return StatementEvent;
  })();
});