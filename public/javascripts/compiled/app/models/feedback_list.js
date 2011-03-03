var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.FeedbackList = (function() {
  function FeedbackList() {
    this.for_subject = __bind(this.for_subject, this);;    FeedbackList.__super__.constructor.apply(this, arguments);
  }
  __extends(FeedbackList, Backbone.Collection);
  FeedbackList.prototype.model = App.model.Feedback;
  FeedbackList.prototype.initialize = function(collection, options) {
    this.event = options.event;
    return this.url = options.url;
  };
  FeedbackList.prototype.for_subject = function(subject_key) {
    var feedback;
    feedback = this.find(__bind(function(feedback) {
      return feedback.get('subject_key') === subject_key;
    }, this));
    if (feedback == null) {
      feedback = new App.model.Feedback({
        subject_key: subject_key
      }, {
        collection: this
      });
    }
    feedback.subject = App.model.FeedbackSubjectFactory.getSubject(this.event.get(subject_key));
    return feedback;
  };
  return FeedbackList;
})();