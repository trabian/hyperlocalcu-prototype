var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.EventDetail = (function() {
  function EventDetail() {
    this.decorateAndShow = __bind(this.decorateAndShow, this);;
    this.render = __bind(this.render, this);;    EventDetail.__super__.constructor.apply(this, arguments);
  }
  __extends(EventDetail, Backbone.View);
  EventDetail.prototype.templatePath = 'events/detail';
  EventDetail.prototype.initialize = function() {};
  EventDetail.prototype.render = function() {
    $(this.el).html(App.templates[this.templatePath](this.model.toDetailJSON()));
    $(this.el).bind('hide', __bind(function() {
      return this.model.set({
        selected: false
      });
    }, this));
    this.decorateAndShow();
    return this;
  };
  EventDetail.prototype.decorateAndShow = function() {
    if (this.model.isDeposit()) {
      $(this.el).addClass('deposit');
    }
    return $(this.el).drawer('show');
  };
  return EventDetail;
})();