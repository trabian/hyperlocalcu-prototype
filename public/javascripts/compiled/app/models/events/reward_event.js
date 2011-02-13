var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/event'], function(Event) {
  var RewardEvent;
  return RewardEvent = (function() {
    function RewardEvent() {
      RewardEvent.__super__.constructor.apply(this, arguments);
    }
    __extends(RewardEvent, Event);
    RewardEvent.prototype.initialize = function() {
      RewardEvent.__super__.initialize.call(this);
      this.description = "Reward";
      return this.meta = this.get('rewards');
    };
    return RewardEvent;
  })();
});