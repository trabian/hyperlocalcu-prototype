var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["vendor/jquery-tweet"], function(jquery_tweet) {
  var TweetView;
  TweetView = function() {
    return Backbone.View.apply(this, arguments);
  };
  __extends(TweetView, Backbone.View);
  TweetView.prototype.tagName = 'div';
  return TweetView;
});