var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/feedback_list', 'app/models/feedback'], function(FeedbackList, Feedback) {
  var Teller;
  Teller = function() {
    return Backbone.Model.apply(this, arguments);
  };
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
});