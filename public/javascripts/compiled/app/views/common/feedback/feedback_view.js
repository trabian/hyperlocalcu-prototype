var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["text!views/feedback/form.handlebars?v=4", "app/views/common/feedback/rating_view", "vendor/handlebars", "vendor/jquery-ui"], function(template, RatingView) {
  var FeedbackView;
  FeedbackView = function() {
    return Backbone.View.apply(this, arguments);
  };
  __extends(FeedbackView, Backbone.View);
  FeedbackView.prototype.tagName = 'div';
  FeedbackView.prototype.className = 'feedback';
  FeedbackView.prototype.template = Handlebars.compile(template);
  FeedbackView.prototype.render = function() {
    var ratingView;
    $(this.el).html(this.template({
      avatar: this.options.subject.avatar,
      question: this.model.feedbackQuestion || this.options.subject.question
    }));
    ratingView = new RatingView({
      model: this.model,
      commentParent: $(this.el),
      ratingField: ("" + (this.options.fieldPrefix) + "_rating"),
      commentField: ("" + (this.options.fieldPrefix) + "_comment"),
      commentFormTitle: "Care to elaborate?"
    });
    this.$('.question').after(ratingView.render().el);
    return this;
  };
  return FeedbackView;
});