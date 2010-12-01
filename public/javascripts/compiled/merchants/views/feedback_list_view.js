var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['merchants/views/feedback_view'], function(FeedbackView) {
  var FeedbackListView;
  FeedbackListView = function() {
    var _a;
    _a = this;
    this.addAll = function(){ return FeedbackListView.prototype.addAll.apply(_a, arguments); };
    this.addOne = function(){ return FeedbackListView.prototype.addOne.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(FeedbackListView, Backbone.View);
  FeedbackListView.prototype.el = $('#feedback-list');
  FeedbackListView.prototype.initialize = function(feedbacks) {
    this.feedbacks = feedbacks;
    this.feedbacks.bind('refresh', this.addAll);
    return this.feedbacks.bind('add', this.addOne);
  };
  FeedbackListView.prototype.addOne = function(feedback) {
    var view;
    view = new FeedbackView({
      model: feedback,
      id: feedback.id
    });
    return $(this.el).prepend(view.render().el);
  };
  FeedbackListView.prototype.addAll = function() {
    return this.feedbacks.each(this.addOne);
  };
  return FeedbackListView;
});