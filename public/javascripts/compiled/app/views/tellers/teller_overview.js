var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["text!views/tellers/overview.handlebars?v=1", "app/views/common/feedback/rating_view", "vendor/handlebars"], function(template, RatingView) {
  var TellerOverviewView;
  TellerOverviewView = function() {
    var _a;
    _a = this;
    this.render = function(){ return TellerOverviewView.prototype.render.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(TellerOverviewView, Backbone.View);
  TellerOverviewView.prototype.template = Handlebars.compile(template);
  TellerOverviewView.prototype.initialize = function(options) {};
  TellerOverviewView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    _.each(['month', 'year'], __bind(function(timespan) {
      var ratingView;
      ratingView = new RatingView({
        model: this.model,
        ratingField: ("average_feedback_this_" + (timespan)),
        readOnly: true
      });
      return this.$("." + (timespan) + " .rating").append(ratingView.render().el);
    }, this));
    return this;
  };
  return TellerOverviewView;
});