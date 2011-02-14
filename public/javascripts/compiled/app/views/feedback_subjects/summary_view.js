var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/models/feedback_list'], function(FeedbackList) {
  var FeedbackSummaryView;
  return FeedbackSummaryView = (function() {
    function FeedbackSummaryView() {
      this.render = __bind(this.render, this);;      FeedbackSummaryView.__super__.constructor.apply(this, arguments);
    }
    __extends(FeedbackSummaryView, Backbone.View);
    FeedbackSummaryView.prototype.initialize = function(options) {
      return this.collection = new FeedbackList;
    };
    FeedbackSummaryView.prototype.render = function() {
      alert(this.collection.length);
      $(this.el).html('<div>summary</div>');
      return this;
    };
    return FeedbackSummaryView;
  })();
});