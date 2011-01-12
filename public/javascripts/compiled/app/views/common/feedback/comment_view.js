var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["text!views/feedback/comment.handlebars?v=2"], function(template) {
  var CommentView;
  CommentView = function() {
    var _a;
    _a = this;
    this.submitComment = function(){ return CommentView.prototype.submitComment.apply(_a, arguments); };
    this.resetAndHide = function(){ return CommentView.prototype.resetAndHide.apply(_a, arguments); };
    this.isActive = function(){ return CommentView.prototype.isActive.apply(_a, arguments); };
    this.hide = function(){ return CommentView.prototype.hide.apply(_a, arguments); };
    this.show = function(){ return CommentView.prototype.show.apply(_a, arguments); };
    this.updateButton = function(){ return CommentView.prototype.updateButton.apply(_a, arguments); };
    this.render = function(){ return CommentView.prototype.render.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(CommentView, Backbone.View);
  CommentView.prototype.tagName = 'div';
  CommentView.prototype.className = 'comment';
  CommentView.prototype.events = {
    "click .cancel": "resetAndHide",
    "keyup textarea": 'updateButton',
    "click button": "submitComment"
  };
  CommentView.prototype.initialize = function(options) {
    return (this.commentField = this.options.commentField);
  };
  CommentView.prototype.template = Handlebars.compile(template);
  CommentView.prototype.render = function() {
    $(this.el).html(this.template({
      comment: this.model.get(this.commentField),
      title: this.options.title
    }));
    this.$('button').button({
      icons: {
        primary: 'ui-icon-comment'
      }
    });
    this.updateButton();
    this.trigger('show');
    return this;
  };
  CommentView.prototype.updateButton = function() {
    return $.trim(this.$('textarea').val()).length > 0 ? this.$('button').button('enable') : this.$('button').button('disable');
  };
  CommentView.prototype.show = function() {
    $(this.el).show();
    return this.trigger('show');
  };
  CommentView.prototype.hide = function() {
    $(this.el).hide();
    return this.trigger('hide');
  };
  CommentView.prototype.isActive = function() {
    return $(this.el).is(":visible");
  };
  CommentView.prototype.resetAndHide = function() {
    this.$('textarea').val(this.model.get(this.commentField));
    this.hide();
    return false;
  };
  CommentView.prototype.submitComment = function() {
    var commentAttributes;
    if (!(this.$('button').button('option', 'disabled'))) {
      commentAttributes = {};
      commentAttributes[this.commentField] = this.$('textarea').val();
      return this.model.save(commentAttributes);
    }
  };
  return CommentView;
});