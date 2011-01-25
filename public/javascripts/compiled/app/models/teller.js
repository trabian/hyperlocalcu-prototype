var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
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
      Teller.__super__.constructor.apply(this, arguments);
    }
    __extends(Teller, Backbone.Model);
    Teller.prototype.initialize = function() {};
    Teller.prototype.toViewJSON = function() {
      return _.extend(this.toJSON());
    };
    Teller.prototype.toDetailJSON = function() {
      return this.toViewJSON();
    };
    Teller.prototype.feedbacks = function() {
      return new FeedbackList(this.get('feedbacks'), {
        model: Feedback
      });
    };
    return Teller;
  })();
});