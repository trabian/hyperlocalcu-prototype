var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['app/views/common/feedback/comment_view'], function(CommentView) {
  var RatingView;
  return RatingView = (function() {
    function RatingView() {
      this.showCommentForm = __bind(this.showCommentForm, this);;
      this.toggleCommentForm = __bind(this.toggleCommentForm, this);;
      this.fillStar = __bind(this.fillStar, this);;
      this.addStar = __bind(this.addStar, this);;
      this.updateRating = __bind(this.updateRating, this);;
      this.resetRating = __bind(this.resetRating, this);;
      this.addCancel = __bind(this.addCancel, this);;      RatingView.__super__.constructor.apply(this, arguments);
    }
    __extends(RatingView, Backbone.View);
    RatingView.prototype.tagName = 'div';
    RatingView.prototype.className = 'rating';
    RatingView.prototype.events = {
      'click .cancel': 'resetRating',
      'click .commentLink': 'toggleCommentForm'
    };
    RatingView.prototype.initialize = function(options) {
      return options.commentField = 'comment';
    };
    RatingView.prototype.render = function() {
      var commentLink, num;
      this.rating = this.options.rating || this.model.get('rating') || 0;
      this.readOnly = this.options.readOnly === true;
      if (!this.readOnly) {
        this.addCancel();
      }
      for (num = 1; num <= 5; num++) {
        this.addStar(num, num <= this.rating, this.readOnly);
      }
      if (!this.readOnly) {
        commentLink = this.make("a", {
          href: '#',
          className: 'commentLink'
        }, 'comment');
        $(this.el).append(commentLink);
        if (this.model.get(this.options.commentField)) {
          this.$('.commentLink').addClass('active');
          this.showCommentForm();
        }
        if (this.rating > 0) {
          $(this.el).addClass('rated active');
        }
      } else {
        $(this.el).addClass('readonly active');
      }
      return this;
    };
    RatingView.prototype.imagePath = function(name) {
      return "/images/ratings/" + name + ".png";
    };
    RatingView.prototype.addCancel = function() {
      var cancel;
      cancel = this.make("a", {
        href: '#',
        className: 'cancel'
      }, 'cancel');
      return $(this.el).append(cancel);
    };
    RatingView.prototype.resetRating = function() {
      this.updateRating(0);
      this.currentStar = null;
      $(this.el).removeClass('rated');
      this.fillStar();
      return false;
    };
    RatingView.prototype.updateRating = function(num) {
      return this.model.save({
        'rating': num
      });
    };
    RatingView.prototype.addStar = function(num, starOn, readOnly) {
      var star, starTag;
      starTag = readOnly ? "span" : "a";
      star = this.make(starTag, {
        className: "star" + (starOn ? ' on' : '')
      }, num);
      if (starOn) {
        this.currentStar = star;
      }
      if (!readOnly) {
        $(star).attr('href', '#');
        $(star).bind('mouseenter', __bind(function() {
          return this.fillStar(star);
        }, this));
        $(star).bind('mouseleave', __bind(function() {
          return this.fillStar(this.currentStar);
        }, this));
        $(star).bind('click', __bind(function() {
          this.updateRating(num);
          this.currentStar = star;
          this.fillStar(this.currentStar);
          this.showCommentForm();
          $(this.el).addClass('rated');
          return false;
        }, this));
      }
      return $(this.el).append(star);
    };
    RatingView.prototype.fillStar = function(star) {
      if (star != null) {
        $(star).prevAll().andSelf().addClass('on');
        $(star).nextAll().removeClass('on');
        return $(this.el).addClass('active');
      } else {
        this.$('.star').removeClass('on');
        return $(this.el).removeClass('active');
      }
    };
    RatingView.prototype.toggleCommentForm = function() {
      var _ref;
      if ((this.commentView != null) && this.commentView.isActive()) {
        if ((_ref = this.commentView) != null) {
          _ref.hide();
        }
      } else {
        this.showCommentForm();
      }
      return false;
    };
    RatingView.prototype.showCommentForm = function() {
      $(this.el).addClass('active');
      if (this.commentView != null) {
        return this.commentView.show();
      } else {
        this.commentView = new CommentView({
          model: this.model,
          commentField: this.options.commentField,
          title: this.options.commentFormTitle
        });
        this.commentView.bind('show', __bind(function() {
          return this.$('.commentLink').addClass('active');
        }, this));
        this.commentView.bind('hide', __bind(function() {
          if (this.model.get(this.options.commentField) == null) {
            return this.$('.commentLink').removeClass('active');
          }
        }, this));
        return this.options.commentParent.append(this.commentView.render().el);
      }
    };
    return RatingView;
  })();
});