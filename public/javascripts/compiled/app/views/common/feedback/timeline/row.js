var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(["text!views/common/feedback/timeline/row.handlebars?v=3", "app/views/common/feedback/rating_view", 'vendor/handlebars'], function(template, RatingView) {
  var FeedbackRowView;
  return FeedbackRowView = (function() {
    function FeedbackRowView() {
      FeedbackRowView.__super__.constructor.apply(this, arguments);
    }
    __extends(FeedbackRowView, Backbone.View);
    FeedbackRowView.prototype.tagName = 'tr';
    FeedbackRowView.prototype.className = 'feedback';
    FeedbackRowView.prototype.template = Handlebars.compile(template);
    FeedbackRowView.prototype.initialize = function() {
      this.model.bind('change', __bind(function() {
        return this.render();
      }, this));
      return this.render();
    };
    FeedbackRowView.prototype.render = function() {
      var ratingView;
      $(this.el).html(this.template(this.model.toViewJSON()));
      ratingView = new RatingView({
        model: this.model,
        rating: this.model.get('rating'),
        readOnly: true
      });
      this.$('.rating').append(ratingView.render().el);
      return this;
    };
    return FeedbackRowView;
  })();
});