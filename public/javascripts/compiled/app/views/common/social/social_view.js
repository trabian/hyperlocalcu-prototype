var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(["text!views/social/overview.handlebars", "vendor/jquery-tweet", "vendor/jquery-timeago", "vendor/date", "vendor/handlebars"], function(template) {
  var SocialView;
  return SocialView = (function() {
    function SocialView() {
      this.renderTwitter = __bind(this.renderTwitter, this);;      SocialView.__super__.constructor.apply(this, arguments);
    }
    __extends(SocialView, Backbone.View);
    SocialView.prototype.tagName = 'div';
    SocialView.prototype.className = 'social';
    SocialView.prototype.template = Handlebars.compile(template);
    SocialView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toDetailJSON()));
      if (this.model.twitter_username) {
        this.renderTwitter();
      }
      return this;
    };
    SocialView.prototype.renderTwitter = function() {
      var username;
      username = this.model.twitter_username;
      return this.$('.twitter .latest-tweet').tweet({
        username: this.model.twitter_username,
        count: 1,
        broadcast_only: true
      });
    };
    return SocialView;
  })();
});