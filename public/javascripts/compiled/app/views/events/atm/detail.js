var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.AtmDetail = (function() {
  function AtmDetail() {
    this.renderFeedback = __bind(this.renderFeedback, this);;    AtmDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(AtmDetail, Backbone.View);
  AtmDetail.prototype.renderFeedback = function() {
    return this.options.parent.renderLocationFeedbackView('atm', {
      commentFormTitle: "Care to elaborate? Did you feel safe?"
    });
  };
  return AtmDetail;
})();
App.view.EventDetailFactory.atm = App.view.AtmDetail;