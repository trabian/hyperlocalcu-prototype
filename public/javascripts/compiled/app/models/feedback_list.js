var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/feedback', 'app/models/feedback_subject_factory'], function(Feedback, FeedbackSubjectFactory) {
  var FeedbackList;
  return FeedbackList = (function() {
    function FeedbackList() {
      this.for_subject = __bind(this.for_subject, this);;      FeedbackList.__super__.constructor.apply(this, arguments);
    }
    __extends(FeedbackList, Backbone.Collection);
    FeedbackList.prototype.model = Feedback;
    FeedbackList.prototype.initialize = function(collection, options) {
      return this.event = options.event;
    };
    FeedbackList.prototype.for_subject = function(subject_key) {
      var feedback;
      feedback = this.find(__bind(function(feedback) {
        return feedback.get('subject_key') === subject_key;
      }, this));
      if (feedback == null) {
        feedback = new Feedback({
          subject_key: subject_key
        }, {
          collection: this
        });
      }
      feedback.subject = FeedbackSubjectFactory.getSubject(this.event.get(subject_key));
      return feedback;
    };
    return FeedbackList;
  })();
});