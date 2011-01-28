var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['text!views/timeline/events/branch/detail.handlebars?v=2', 'app/views/members/events/detail', 'vendor/handlebars'], function(template, EventDetailView) {
  var BranchDetailView;
  return BranchDetailView = (function() {
    function BranchDetailView() {
      this.renderDetail = __bind(this.renderDetail, this);;      BranchDetailView.__super__.constructor.apply(this, arguments);
    }
    __extends(BranchDetailView, EventDetailView);
    BranchDetailView.prototype.renderDetail = function() {
      return this.addFeedbackView('teller');
    };
    return BranchDetailView;
  })();
});