var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["text!views/common/feedback/timeline/row.handlebars?v=3", "app/views/common/feedback/rating_view", 'vendor/handlebars'], function(template, RatingView) {
  var FeedbackRowView;
  FeedbackRowView = function() {
    return Backbone.View.apply(this, arguments);
  };
  __extends(FeedbackRowView, Backbone.View);
  FeedbackRowView.prototype.tagName = 'tr';
  FeedbackRowView.prototype.template = Handlebars.compile(template);
  FeedbackRowView.prototype.initialize = function() {
    return this.render();
  };
  FeedbackRowView.prototype.render = function() {
    var ratingView;
    $(this.el).html(this.template(this.model.toViewJSON()));
    ratingView = new RatingView({
      model: this.model,
      ratingField: "teller_rating",
      readOnly: true
    });
    this.$('.rating').append(ratingView.render().el);
    return this;
  };
  return FeedbackRowView;
});