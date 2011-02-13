var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["app/controllers/common/timeline_controller", "app/views/common/feedback/feedback_timeline_view", "app/views/feedback_subjects/feedback_subject_overview", "app/lib/socket"], function(TimelineController, FeedbackTimelineView, FeedbackSubjectOverviewView, socket) {
  var FeedbackDashboardController;
  return FeedbackDashboardController = (function() {
    function FeedbackDashboardController() {
      FeedbackDashboardController.__super__.constructor.apply(this, arguments);
    }
    __extends(FeedbackDashboardController, TimelineController);
    FeedbackDashboardController.prototype.initialize = function(options) {
      this.subject = options.subject;
      options.events = this.subject.feedbacks;
      FeedbackDashboardController.__super__.initialize.call(this, options);
      this.overview = new FeedbackSubjectOverviewView({
        model: this.subject
      });
      $('#subject-overview').append(this.overview.render().el);
      this.timeline = new FeedbackTimelineView({
        collection: this.subject.feedbacks
      });
      return socket.listenTo(this.subject);
    };
    return FeedbackDashboardController;
  })();
});