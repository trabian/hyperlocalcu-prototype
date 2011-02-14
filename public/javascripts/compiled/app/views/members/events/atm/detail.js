var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/views/members/events/detail', 'vendor/handlebars'], function(EventDetailView) {
  var AtmDetailView;
  return AtmDetailView = (function() {
    function AtmDetailView() {
      this.renderDetail = __bind(this.renderDetail, this);;      AtmDetailView.__super__.constructor.apply(this, arguments);
    }
    __extends(AtmDetailView, EventDetailView);
    AtmDetailView.prototype.renderDetail = function() {
      return this.addLocationFeedbackView('atm', {
        commentFormTitle: "Care to elaborate? Did you feel safe?"
      });
    };
    return AtmDetailView;
  })();
});