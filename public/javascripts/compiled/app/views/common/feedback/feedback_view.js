var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
App.view.Feedback = (function() {
  function Feedback() {
    Feedback.__super__.constructor.apply(this, arguments);
  }
  __extends(Feedback, Backbone.View);
  Feedback.prototype.tagName = 'div';
  Feedback.prototype.className = 'feedback';
  Feedback.prototype.template = Handlebars.compile(template);
  Feedback.prototype.initialize = function(options) {
    Feedback.__super__.initialize.call(this, options);
    this.subject = this.model.subject;
    return this.question = options.question || this.subject.get('question');
  };
  Feedback.prototype.render = function() {
    var ratingView;
    $(this.el).html(this.template({
      avatar: this.subject.get('avatar'),
      question: this.question
    }));
    ratingView = new App.view.Rating({
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
  return Feedback;
})();