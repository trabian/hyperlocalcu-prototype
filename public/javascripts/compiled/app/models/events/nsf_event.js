var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event'], function(Event) {
  var NsfEvent;
  NsfEvent = function() {
    return Event.apply(this, arguments);
  };
  __extends(NsfEvent, Event);
  NsfEvent.prototype.initialize = function() {
    NsfEvent.__super__.initialize.call(this);
    this.description = "NSF Fee";
    return (this.className = "penalty");
  };
  return NsfEvent;
});