var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event'], function(Event) {
  var StatementEvent;
  StatementEvent = function() {
    return Event.apply(this, arguments);
  };
  __extends(StatementEvent, Event);
  StatementEvent.prototype.initialize = function() {
    StatementEvent.__super__.initialize.call(this);
    this.description = this.get('name');
    return (this.className = "statement");
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
});