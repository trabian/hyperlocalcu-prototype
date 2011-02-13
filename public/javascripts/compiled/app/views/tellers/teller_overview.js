var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["text!views/feedback/subject_overview.handlebars?v=2", "app/views/common/feedback/rating_view", "vendor/handlebars"], function(template, RatingView) {
  var TellerOverviewView;
  return TellerOverviewView = (function() {
    function TellerOverviewView() {
      this.render = __bind(this.render, this);;      TellerOverviewView.__super__.constructor.apply(this, arguments);
    }
    __extends(TellerOverviewView, Backbone.View);
    TellerOverviewView.prototype.template = Handlebars.compile(template);
    TellerOverviewView.prototype.initialize = function(options) {
      return this.model.bind('change', __bind(function() {
        return this.render();
      }, this));
    };
    TellerOverviewView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toViewJSON()));
      _.each(['month', 'year'], __bind(function(timespan) {
        var ratingView;
        ratingView = new RatingView({
          model: this.model,
          rating: this.model.get('feedback_totals')[timespan].average,
          readOnly: true
        });
        return this.$("." + timespan + " .rating").append(ratingView.render().el);
      }, this));
      return this;
    };
    return TellerOverviewView;
  })();
});