var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["text!views/tellers/overview.handlebars?v=1", "app/views/common/feedback/rating_view", "vendor/handlebars"], function(template, RatingView) {
  var TellerOverviewView;
  return TellerOverviewView = (function() {
    function TellerOverviewView() {
      this.render = __bind(this.render, this);;      TellerOverviewView.__super__.constructor.apply(this, arguments);
    }
    __extends(TellerOverviewView, Backbone.View);
    TellerOverviewView.prototype.template = Handlebars.compile(template);
    TellerOverviewView.prototype.initialize = function(options) {};
    TellerOverviewView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      _.each(['month', 'year'], __bind(function(timespan) {
        var ratingView;
        ratingView = new RatingView({
          model: this.model,
          ratingField: "average_feedback_this_" + timespan,
          readOnly: true
        });
        return this.$("." + timespan + " .rating").append(ratingView.render().el);
      }, this));
      return this;
    };
    return TellerOverviewView;
  })();
});