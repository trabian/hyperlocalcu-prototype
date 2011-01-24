var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["app/controllers/common/timeline_controller", "app/views/tellers/teller_timeline"], function(TimelineController, TellerTimeline) {
  var TellerDashboardController;
  TellerDashboardController = function() {
    return TimelineController.apply(this, arguments);
  };
  __extends(TellerDashboardController, TimelineController);
  TellerDashboardController.prototype.initialize = function(options) {
    TellerDashboardController.__super__.initialize.call(this, options);
    return (this.timeline = new TellerTimeline({
      collection: options.events
    }));
  };
  return TellerDashboardController;
});