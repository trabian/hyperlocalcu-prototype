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
define(["vendor/jquery-tweet", "vendor/jquery-timeago", "text!views/member-timeline/social.handlebars?v=2", "text!views/social/facebook/post.handlebars?v=1", "vendor/date"], function(jquery_tweet, jquery_timeago, template, facebookPostTemplate) {
  var SocialView;
  SocialView = function() {
    var _a;
    _a = this;
    this.showSecurityMessage = function(){ return SocialView.prototype.showSecurityMessage.apply(_a, arguments); };
    this.renderFacebook = function(){ return SocialView.prototype.renderFacebook.apply(_a, arguments); };
    this.renderTwitter = function(){ return SocialView.prototype.renderTwitter.apply(_a, arguments); };
    this.render = function(){ return SocialView.prototype.render.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(SocialView, Backbone.View);
  SocialView.prototype.tagName = 'div';
  SocialView.prototype.className = 'social';
  SocialView.prototype.events = {
    'click .security a': 'showSecurityMessage'
  };
  SocialView.prototype.template = Handlebars.compile(template);
  SocialView.prototype.facebookPostTemplate = Handlebars.compile(facebookPostTemplate);
  SocialView.prototype.initialize = function(options) {
    return (this.socialSettings = options.socialSettings);
  };
  SocialView.prototype.render = function() {
    $(this.el).html(this.template(this.socialSettings));
    if (this.socialSettings.twitter) {
      this.renderTwitter(this.socialSettings.twitter);
    }
    if (this.socialSettings.facebook) {
      this.renderFacebook(this.socialSettings.facebook);
    }
    return this;
  };
  SocialView.prototype.renderTwitter = function(twitterSettings) {
    return this.$('.twitter .latest-tweet').tweet({
      username: twitterSettings.username,
      count: 1,
      broadcast_only: true
    });
  };
  SocialView.prototype.renderFacebook = function(facebookSettings) {
    return $.getJSON("https://graph.facebook.com/" + (facebookSettings.username) + "/posts?limit=1&callback=?", __bind(function(response) {
      var post;
      post = response.data[0];
      post.date = $.timeago(post.created_time);
      post.username = facebookSettings.username;
      return this.$('.facebook .latest-post').html(this.facebookPostTemplate(post));
    }, this));
  };
  SocialView.prototype.showSecurityMessage = function() {
    return alert("Eventually link to details about how we maintain privacy");
  };
  return SocialView;
});