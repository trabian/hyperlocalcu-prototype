var __slice = Array.prototype.slice, __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
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
    this.addFeedbackView = function(){ return EventDetailView.prototype.addFeedbackView.apply(_a, arguments); };
    this.render = function(){ return EventDetailView.prototype.render.apply(_a, arguments); };
    this.close = function(){ return EventDetailView.prototype.close.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(EventDetailView, Backbone.View);
  EventDetailView.prototype.events = {
    "click .close": "close"
  };
  EventDetailView.prototype.template = Handlebars.compile(template);
  EventDetailView.prototype.initialize = function() {
    var _a, _b;
    return (typeof (_a = this.eventTypeOptions) !== "undefined" && _a !== null) && (typeof (_b = this.eventTypeOptions.events) !== "undefined" && _b !== null) ? this.delegateEvents(this.eventTypeOptions.events) : null;
  };
  EventDetailView.prototype.close = function() {
    return this.model.set({
      'selected': false
    });
  };
  EventDetailView.prototype.render = function() {
    var _a, _b, _c, detailJSON;
    mpq.push([
      "track", "View event detail", {
        event_type: this.model.get('event_type'),
        id: this.model.id
      }
    ]);
    detailJSON = this.model.toDetailJSON();
    $(this.el).html(this.template(detailJSON));
    if (this.model.isSocial()) {
      this.socialView = new SocialView({
        model: this.model
      });
      $(this.el).append(this.socialView.render().el);
    }
    if ((typeof (_a = this.eventTypeOptions) !== "undefined" && _a !== null) && (typeof (_b = this.eventTypeOptions.template) !== "undefined" && _b !== null)) {
      $(this.el).append(this.eventTypeOptions.template(detailJSON));
    }
    this.addFeedbackView('vendor', 'teller');
    if (typeof (_c = this.renderDetail) !== "undefined" && _c !== null) {
      this.renderDetail();
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
  EventDetailView.prototype.addFeedbackView = function() {
    var fields;
    fields = __slice.call(arguments, 0);
    return _.each(fields, __bind(function(field) {
      var _a;
      if (typeof (_a = this.model.get(field)) !== "undefined" && _a !== null) {
        this.feedbackView = new FeedbackView({
          model: this.model,
          subject: this.model.get(field),
          fieldPrefix: field
        });
        $(this.el).append(this.feedbackView.render().el);
        return false;
      }
    }, this));
  };
  return EventDetailView;
});