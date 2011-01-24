var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event'], function(Event) {
  var Feedback;
  Feedback = function() {
    return Event.apply(this, arguments);
  };
  __extends(Feedback, Event);
  Feedback.prototype.initialize = function() {
    Feedback.__super__.initialize.call(this);
    return (this.className = "feedback");
  };
  return Feedback;
});