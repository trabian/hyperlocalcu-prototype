var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/feedback'], function(Feedback) {
  var FeedbackList;
  FeedbackList = function() {
    return Backbone.Collection.apply(this, arguments);
  };
  __extends(FeedbackList, Backbone.Collection);
  FeedbackList.prototype.model = Feedback;
  return FeedbackList;
});