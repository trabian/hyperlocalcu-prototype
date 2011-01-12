var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["text!views/timeline/events/detail.handlebars?v=3", "app/views/common/social/social_view", "app/views/common/feedback/feedback_view", "vendor/handlebars"], function(template, SocialView, FeedbackView) {
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
  EventDetailView.prototype.eventTypeTemplate = null;
  EventDetailView.prototype.close = function() {
    return this.model.set({
      'selected': false
    });
  };
  EventDetailView.prototype.render = function() {
    var _a, _b, detailJSON;
    detailJSON = this.model.toDetailJSON();
    $(this.el).html(this.template(detailJSON));
    if (this.model.isSocial()) {
      this.socialView = new SocialView({
        model: this.model
      });
      $(this.el).append(this.socialView.render().el);
    }
    if (typeof (_a = this.eventTypeTemplate) !== "undefined" && _a !== null) {
      $(this.el).append(this.eventTypeTemplate(detailJSON));
    }
    if (typeof (_b = this.model.get('vendor')) !== "undefined" && _b !== null) {
      this.feedbackView = new FeedbackView({
        model: this.model,
        subject: this.model.get('vendor')
      });
      $(this.el).append(this.feedbackView.render().el);
    }
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