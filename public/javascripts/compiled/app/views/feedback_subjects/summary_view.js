var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.FeedbackSummary = (function() {
  function FeedbackSummary() {
    this.render = __bind(this.render, this);;    FeedbackSummary.__super__.constructor.apply(this, arguments);
  }
  __extends(FeedbackSummary, Backbone.View);
  FeedbackSummary.prototype.initialize = function(options) {
    return this.collection = new App.model.FeedbackList;
  };
  FeedbackSummary.prototype.render = function() {
    return this;
  };
  return FeedbackSummary;
})();