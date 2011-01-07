var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event'], function(Event) {
  var RewardEvent;
  RewardEvent = function() {
    return Event.apply(this, arguments);
  };
  __extends(RewardEvent, Event);
  RewardEvent.prototype.initialize = function() {
    RewardEvent.__super__.initialize.call(this);
    this.description = "Reward";
    return (this.meta = this.get('rewards'));
  };
  return RewardEvent;
});