var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['merchants/models/feedback'], function(Feedback) {
  var FeedbackList;
  FeedbackList = function() {
    var _a;
    _a = this;
    this.initialize = function(){ return FeedbackList.prototype.initialize.apply(_a, arguments); };
    this.url = function(){ return FeedbackList.prototype.url.apply(_a, arguments); };
    return Backbone.Collection.apply(this, arguments);
  };
  __extends(FeedbackList, Backbone.Collection);
  FeedbackList.prototype.model = Feedback;
  FeedbackList.prototype.url = function() {
    return "/merchants/" + (this.merchant.id) + "/feedbacks";
  };
  FeedbackList.prototype.initialize = function(options) {
    this.merchant = options.merchant;
    return this.merchant.bind('add:feedback', __bind(function(feedback) {
      return this.add(feedback);
    }, this));
  };
  return FeedbackList;
});