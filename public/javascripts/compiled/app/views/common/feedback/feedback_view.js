var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["text!views/feedback/form.handlebars?v=4", "app/views/common/feedback/rating_view", "vendor/handlebars", "vendor/jquery-ui"], function(template, RatingView) {
  var FeedbackView;
  return FeedbackView = (function() {
    function FeedbackView() {
      FeedbackView.__super__.constructor.apply(this, arguments);
    }
    __extends(FeedbackView, Backbone.View);
    FeedbackView.prototype.tagName = 'div';
    FeedbackView.prototype.className = 'feedback';
    FeedbackView.prototype.template = Handlebars.compile(template);
    FeedbackView.prototype.initialize = function(options) {
      FeedbackView.__super__.initialize.call(this, options);
      return this.subject = this.model.subject;
    };
    FeedbackView.prototype.render = function() {
      var ratingView;
      $(this.el).html(this.template({
        avatar: this.subject.get('avatar'),
        question: this.model.feedbackQuestion || this.subject.question
      }));
      ratingView = new RatingView({
        model: this.model,
        commentParent: $(this.el),
        commentFormTitle: "Care to elaborate?"
      });
      this.$('.question').after(ratingView.render().el);
      return this;
    };
    return FeedbackView;
  })();
});