var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['vendor/handlebars', 'vendor/jquery-timeago', 'text!views/merchants/feedback.handlebars?v=1'], function(handlebars, timeago, template) {
  var FeedbackView;
  FeedbackView = function() {
    return Backbone.View.apply(this, arguments);
  };
  __extends(FeedbackView, Backbone.View);
  FeedbackView.prototype.tagName = 'li';
  FeedbackView.prototype.className = 'feedback';
  FeedbackView.prototype.template = Handlebars.compile(template);
  FeedbackView.prototype.initialize = function() {
    return this.render();
  };
  FeedbackView.prototype.render = function() {
    $(this.el).html(this.template(this.model.toJSON()));
    this.$('.timestamp').text($.timeago(this.model.get('created_at')));
    return this;
  };
  return FeedbackView;
});