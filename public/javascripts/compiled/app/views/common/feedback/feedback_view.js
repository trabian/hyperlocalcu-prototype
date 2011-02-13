var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
      this.subject = this.model.subject;
      return this.question = options.question || this.subject.get('question');
    };
    FeedbackView.prototype.render = function() {
      var ratingView;
      $(this.el).html(this.template({
        avatar: this.subject.get('avatar'),
        question: this.question
      }));
      ratingView = new RatingView({
        model: this.model,
        commentParent: $(this.el),
        commentFormTitle: "Care to elaborate?"
      });
      ratingView.bind('expand', __bind(function() {
        return this.trigger('expand');
      }, this));
      ratingView.bind('collapse', __bind(function() {
        return this.trigger('collapse');
      }, this));
      this.$('.question').after(ratingView.render().el);
      return this;
    };
    return FeedbackView;
  })();
});