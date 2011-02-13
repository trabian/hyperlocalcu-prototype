var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["app/controllers/common/timeline_controller", "app/views/common/feedback/feedback_timeline_view", "app/views/tellers/teller_overview", "app/lib/socket"], function(TimelineController, FeedbackTimelineView, TellerOverviewView, socket) {
  var TellerDashboardController;
  return TellerDashboardController = (function() {
    function TellerDashboardController() {
      TellerDashboardController.__super__.constructor.apply(this, arguments);
    }
    __extends(TellerDashboardController, TimelineController);
    TellerDashboardController.prototype.initialize = function(options) {
      this.teller = options.teller;
      options.events = this.teller.feedbacks;
      TellerDashboardController.__super__.initialize.call(this, options);
      this.overview = new TellerOverviewView({
        model: this.teller
      });
      $('#subject-overview').append(this.overview.render().el);
      this.timeline = new FeedbackTimelineView({
        collection: this.teller.feedbacks
      });
      return socket.listenTo(this.teller);
    };
    return TellerDashboardController;
  })();
});