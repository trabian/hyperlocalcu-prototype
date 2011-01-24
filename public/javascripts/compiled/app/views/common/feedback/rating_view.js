var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/views/common/feedback/comment_view'], function(CommentView) {
  var RatingView;
  RatingView = function() {
    var _a;
    _a = this;
    this.showCommentForm = function(){ return RatingView.prototype.showCommentForm.apply(_a, arguments); };
    this.toggleCommentForm = function(){ return RatingView.prototype.toggleCommentForm.apply(_a, arguments); };
    this.fillStar = function(){ return RatingView.prototype.fillStar.apply(_a, arguments); };
    this.addStar = function(){ return RatingView.prototype.addStar.apply(_a, arguments); };
    this.updateRating = function(){ return RatingView.prototype.updateRating.apply(_a, arguments); };
    this.resetRating = function(){ return RatingView.prototype.resetRating.apply(_a, arguments); };
    this.addCancel = function(){ return RatingView.prototype.addCancel.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(RatingView, Backbone.View);
  RatingView.prototype.tagName = 'div';
  RatingView.prototype.className = 'rating';
  RatingView.prototype.events = {
    'click .cancel': 'resetRating',
    'click .commentLink': 'toggleCommentForm'
  };
  RatingView.prototype.render = function() {
    var _a, commentLink, num;
    this.rating = this.model.get(this.options.ratingField) || 0;
    this.readOnly = (this.options.readOnly === true);
    if (!(this.readOnly)) {
      this.addCancel();
    }
    for (num = 1; num <= 5; num++) {
      this.addStar(num, num <= this.rating, this.readOnly);
    }
    if (!(this.readOnly)) {
      commentLink = this.make("a", {
        href: '#',
        className: 'commentLink'
      }, 'comment');
      $(this.el).append(commentLink);
      if (typeof (_a = this.model.get(this.options.commentField)) !== "undefined" && _a !== null) {
        this.$('.commentLink').addClass('active');
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
    return "/images/ratings/" + (name) + ".png";
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
    var ratingAttributes;
    ratingAttributes = {};
    ratingAttributes[this.options.ratingField] = num;
    return this.model.save(ratingAttributes);
  };
  RatingView.prototype.addStar = function(num, starOn, readOnly) {
    var star, starTag;
    starTag = readOnly ? "span" : "a";
    star = this.make(starTag, {
      className: ("star" + (starOn ? ' on' : ''))
    }, num);
    if (starOn) {
      this.currentStar = star;
    }
    if (!(readOnly)) {
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
    if (typeof star !== "undefined" && star !== null) {
      $(star).prevAll().andSelf().addClass('on');
      $(star).nextAll().removeClass('on');
      return $(this.el).addClass('active');
    } else {
      this.$('.star').removeClass('on');
      return $(this.el).removeClass('active');
    }
  };
  RatingView.prototype.toggleCommentForm = function() {
    var _a;
    if ((typeof (_a = this.commentView) !== "undefined" && _a !== null) && this.commentView.isActive()) {
      this.commentView == null ? undefined : this.commentView.hide();
    } else {
      this.showCommentForm();
    }
    return false;
  };
  RatingView.prototype.showCommentForm = function() {
    var _a;
    $(this.el).addClass('active');
    if (typeof (_a = this.commentView) !== "undefined" && _a !== null) {
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
        var _b;
        if (!(typeof (_b = this.model.get(this.options.commentField)) !== "undefined" && _b !== null)) {
          return this.$('.commentLink').removeClass('active');
        }
      }, this));
      return this.options.commentParent.append(this.commentView.render().el);
    }
  };
  return RatingView;
});