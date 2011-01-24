var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["app/controllers/common/timeline_controller", "app/views/tellers/teller_timeline", "app/views/tellers/teller_overview"], function(TimelineController, TellerTimeline, TellerOverviewView) {
  var TellerDashboardController;
  TellerDashboardController = function() {
    return TimelineController.apply(this, arguments);
  };
  __extends(TellerDashboardController, TimelineController);
  TellerDashboardController.prototype.initialize = function(options) {
    this.teller = options.teller;
    options.events = this.teller.feedbacks();
    TellerDashboardController.__super__.initialize.call(this, options);
    this.timeline = new TellerTimeline({
      collection: options.events
    });
    this.overview = new TellerOverviewView({
      model: this.teller
    });
    return $('#teller-overview').append(this.overview.render().el);
  };
  return TellerDashboardController;
});