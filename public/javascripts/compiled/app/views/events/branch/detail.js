var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.BranchDetail = (function() {
  function BranchDetail() {
    this.renderFeedback = __bind(this.renderFeedback, this);;    BranchDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(BranchDetail, Backbone.View);
  BranchDetail.prototype.renderFeedback = function() {
    this.options.parent.renderLocationFeedbackView('branch');
    if (this.model.get('teller') != null) {
      return this.options.parent.addSubjectFeedbackView('teller');
    }
  };
  return BranchDetail;
})();
App.view.EventDetailFactory.branch = App.view.BranchDetail;