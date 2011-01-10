var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["text!views/timeline/events/detail.handlebars?v=3", "vendor/handlebars"], function(template) {
  var EventDetailView;
  EventDetailView = function() {
    var _a;
    _a = this;
    this.render = function(){ return EventDetailView.prototype.render.apply(_a, arguments); };
    this.close = function(){ return EventDetailView.prototype.close.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(EventDetailView, Backbone.View);
  EventDetailView.prototype.events = {
    "click .close": "close"
  };
  EventDetailView.prototype.template = Handlebars.compile(template);
  EventDetailView.prototype.close = function() {
    return this.model.set({
      'selected': false
    });
  };
  EventDetailView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toDetailJSON()));
    return this.show();
  };
  EventDetailView.prototype.show = function() {
    this.trigger('show');
    return $(this.el).show();
  };
  EventDetailView.prototype.hide = function() {
    this.trigger('hide');
    return $(this.el).empty().hide();
  };
  return EventDetailView;
});