var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["text!views/feedback/comment.handlebars?v=4"], function(template) {
  var CommentView;
  return CommentView = (function() {
    function CommentView() {
      this.showThanks = __bind(this.showThanks, this);;
      this.submitComment = __bind(this.submitComment, this);;
      this.resetAndHide = __bind(this.resetAndHide, this);;
      this.isActive = __bind(this.isActive, this);;
      this.hide = __bind(this.hide, this);;
      this.show = __bind(this.show, this);;
      this.updateButton = __bind(this.updateButton, this);;
      this.render = __bind(this.render, this);;      CommentView.__super__.constructor.apply(this, arguments);
    }
    __extends(CommentView, Backbone.View);
    CommentView.prototype.tagName = 'div';
    CommentView.prototype.className = 'comment';
    CommentView.prototype.events = {
      "click .cancel": "resetAndHide",
      "keyup textarea": 'updateButton',
      "click button": "submitComment"
    };
    CommentView.prototype.initialize = function(options) {
      return this.commentField = this.options.commentField;
    };
    CommentView.prototype.template = Handlebars.compile(template);
    CommentView.prototype.render = function() {
      $(this.el).html(this.template({
        comment: this.model.get(this.commentField),
        title: this.options.title,
        buttonText: this.options.buttonText || 'Share'
      }));
      this.$('button').button({
        icons: {
          primary: 'ui-icon-comment'
        }
      });
      this.updateButton();
      return this;
    };
    CommentView.prototype.updateButton = function() {
      if ($.trim(this.$('textarea').val()).length > 0) {
        return this.$('button').button('enable');
      } else {
        return this.$('button').button('disable');
      }
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
      if (!this.$('button').button('option', 'disabled')) {
        commentAttributes = {};
        commentAttributes[this.commentField] = this.$('textarea').val();
        this.model.save(commentAttributes);
        return this.showThanks();
      }
    };
    CommentView.prototype.showThanks = function() {
      var hideThanks, parent;
      this.hide();
      parent = $(this.el).parent();
      parent.append('<p class="thanks">Thank you for your feedback!</p>');
      hideThanks = __bind(function() {
        return parent.find('.thanks').fadeOut();
      }, this);
      return _.delay(hideThanks, 3000);
    };
    return CommentView;
  })();
});