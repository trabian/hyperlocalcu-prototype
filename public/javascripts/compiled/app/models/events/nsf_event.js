var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/event'], function(Event) {
  var NsfEvent;
  return NsfEvent = (function() {
    function NsfEvent() {
      NsfEvent.__super__.constructor.apply(this, arguments);
    }
    __extends(NsfEvent, Event);
    NsfEvent.prototype.initialize = function() {
      NsfEvent.__super__.initialize.call(this);
      this.description = "NSF Fee";
      return this.className = "penalty";
    };
    return NsfEvent;
  })();
});