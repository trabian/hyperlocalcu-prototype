var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["app/controllers/common/timeline_controller", "app/views/tellers/teller_timeline", "app/views/tellers/teller_overview"], function(TimelineController, TellerTimeline, TellerOverviewView) {
  var TellerDashboardController;
  return TellerDashboardController = (function() {
    function TellerDashboardController() {
      TellerDashboardController.__super__.constructor.apply(this, arguments);
    }
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
  })();
});