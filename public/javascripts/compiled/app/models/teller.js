var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/feedback_list', 'app/models/feedback'], function(FeedbackList, Feedback) {
  var Teller;
  return Teller = (function() {
    function Teller() {
      this.url = __bind(this.url, this);;      Teller.__super__.constructor.apply(this, arguments);
    }
    __extends(Teller, Backbone.Model);
    Teller.prototype.initialize = function(options) {
      Teller.__super__.initialize.call(this, options);
      this.feedbacks = new FeedbackList(this.get('feedbacks'));
      this.feedbacks.url = "/tellers/" + this.id + "/feedbacks";
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
    };
    Teller.prototype.toViewJSON = function() {
      return _.extend(this.toJSON());
    };
    Teller.prototype.toDetailJSON = function() {
      return this.toViewJSON();
    };
    Teller.prototype.url = function() {
      return "/tellers/" + this.id;
    };
    return Teller;
  })();
});