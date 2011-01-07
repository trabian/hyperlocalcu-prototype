var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event'], function(Event) {
  var BranchEvent;
  BranchEvent = function() {
    return Event.apply(this, arguments);
  };
  __extends(BranchEvent, Event);
  BranchEvent.prototype.initialize = function() {
    BranchEvent.__super__.initialize.call(this);
    this.description = ("In-Person " + (this.depositOrWithdrawal()));
    return (this.meta = this.get('branch').name);
  };
  return BranchEvent;
});