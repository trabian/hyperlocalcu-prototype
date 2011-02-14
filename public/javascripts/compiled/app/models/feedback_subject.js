var FeedbackSubject;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
FeedbackSubject = (function() {
  function FeedbackSubject() {
    FeedbackSubject.__super__.constructor.apply(this, arguments);
  }
  __extends(FeedbackSubject, Backbone.Model);
  FeedbackSubject.prototype.initialize = function(options) {
    FeedbackSubject.__super__.initialize.call(this, options);
    if (this.get('feedbacks') != null) {
      this.feedbacks = new FeedbackList(this.get('feedbacks'));
      this.feedbacks.url = options.list_url;
      this.bind('add:feedback', __bind(function(feedback_json) {
        this.set(feedback_json.subject);
        return this.feedbacks.add(feedback_json);
      }, this));
      return this.bind('update:feedback', __bind(function(feedback_json) {
        var feedback;
        this.set(feedback_json.subject);
        feedback = this.feedbacks.get(feedback_json.id);
        return feedback.set(feedback_json);
      }, this));
    }
  };
  FeedbackSubject.prototype.toViewJSON = function() {
    return _.extend(this.toJSON(), {
      meta: this.meta
    });
  };
  FeedbackSubject.prototype.toDetailJSON = function() {
    return this.toViewJSON();
  };
  return FeedbackSubject;
})();