var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.controller.FeedbackDashboard = (function() {
  function FeedbackDashboard() {
    FeedbackDashboard.__super__.constructor.apply(this, arguments);
  }
  __extends(FeedbackDashboard, App.controller.Timeline);
  FeedbackDashboard.prototype.initialize = function(options) {
    this.subject = options.subject;
    options.events = this.subject.feedbacks;
    FeedbackDashboard.__super__.initialize.call(this, options);
    this.overview = new App.view.FeedbackSubjectOverview({
      model: this.subject
    });
    $('#subject-overview').append(this.overview.render().el);
    this.timeline = new App.view.FeedbackTimeline({
      collection: this.subject.feedbacks
    });
    return socket.listenTo(this.subject);
  };
  return FeedbackDashboard;
})();