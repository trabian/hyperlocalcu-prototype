var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["text!views/social/overview.handlebars", "vendor/jquery-tweet", "vendor/jquery-timeago", "vendor/date", "vendor/handlebars"], function(template) {
  var SocialView;
  SocialView = function() {
    var _a;
    _a = this;
    this.renderTwitter = function(){ return SocialView.prototype.renderTwitter.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
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
});