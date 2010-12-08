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
define(function() {
  var RatingView;
  RatingView = function() {
    var _a;
    _a = this;
    this.fillStar = function(){ return RatingView.prototype.fillStar.apply(_a, arguments); };
    this.addStar = function(){ return RatingView.prototype.addStar.apply(_a, arguments); };
    this.resetRating = function(){ return RatingView.prototype.resetRating.apply(_a, arguments); };
    this.addCancel = function(){ return RatingView.prototype.addCancel.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(RatingView, Backbone.View);
  RatingView.prototype.tagName = 'div';
  RatingView.prototype.className = 'rating';
  RatingView.prototype.events = {
    'click .cancel': 'resetRating'
  };
  RatingView.prototype.render = function() {
    var num;
    this.rating = this.model.get('rating') || 0;
    this.addCancel();
    for (num = 1; num <= 5; num++) {
      this.addStar(num, num <= this.rating);
    }
    if (this.rating > 0) {
      $(this.el).addClass('rated active');
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
    this.model.save({
      rating: 0
    }, {
      silent: true
    });
    this.currentStar = null;
    $(this.el).removeClass('rated');
    this.fillStar();
    return false;
  };
  RatingView.prototype.addStar = function(num, starOn) {
    var star;
    star = this.make("a", {
      href: '#',
      className: ("star" + (starOn ? ' on' : ''))
    }, num);
    if (starOn) {
      this.currentStar = star;
    }
    $(star).bind('mouseenter', __bind(function() {
      return this.fillStar(star);
    }, this));
    $(star).bind('mouseleave', __bind(function() {
      return this.fillStar(this.currentStar);
    }, this));
    $(star).bind('click', __bind(function() {
      this.model.save({
        rating: num
      }, {
        silent: true
      });
      this.currentStar = star;
      this.fillStar(this.currentStar);
      $(this.el).addClass('rated');
      return false;
    }, this));
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
  return RatingView;
});