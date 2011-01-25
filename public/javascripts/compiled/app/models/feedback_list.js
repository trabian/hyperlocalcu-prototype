var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/feedback'], function(Feedback) {
  var FeedbackList;
  return FeedbackList = (function() {
    function FeedbackList() {
      FeedbackList.__super__.constructor.apply(this, arguments);
    }
    __extends(FeedbackList, Backbone.Collection);
    FeedbackList.prototype.model = Feedback;
    return FeedbackList;
  })();
});