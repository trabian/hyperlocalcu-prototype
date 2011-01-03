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
define(["vendor/jquery-tweet", "vendor/jquery-timeago", "text!views/member-timeline/social.handlebars?v=8", "vendor/date", "member-timeline/views/social_username_form_view"], function(jquery_tweet, jquery_timeago, template, date, SocialUsernameFormView) {
  var SocialView;
  SocialView = function() {
    var _a;
    _a = this;
    this.showSecurityMessage = function(){ return SocialView.prototype.showSecurityMessage.apply(_a, arguments); };
    this.vote = function(){ return SocialView.prototype.vote.apply(_a, arguments); };
    this.renderTwitter = function(){ return SocialView.prototype.renderTwitter.apply(_a, arguments); };
    this.render = function(){ return SocialView.prototype.render.apply(_a, arguments); };
    this.initialize = function(){ return SocialView.prototype.initialize.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(SocialView, Backbone.View);
  SocialView.prototype.tagName = 'div';
  SocialView.prototype.className = 'social';
  SocialView.prototype.events = {
    'click .security a': 'showSecurityMessage',
    'click a.vote': 'vote'
  };
  SocialView.prototype.initialize = function() {
    return this.model.bind('change:twitter_username', this.renderTwitter);
  };
  SocialView.prototype.template = Handlebars.compile(template);
  SocialView.prototype.render = function() {
    var twitterForm;
    console.log('render model', this.model);
    $(this.el).html(this.template(this.model.toJSON()));
    twitterForm = new SocialUsernameFormView({
      model: this.model,
      fieldname: 'twitter_username',
      el: this.$('.twitter')
    });
    if (this.model.get('twitter_username')) {
      this.renderTwitter();
    }
    this.$('button').button({
      icons: {
        primary: 'ui-icon-plus'
      }
    });
    return this;
  };
  SocialView.prototype.renderTwitter = function() {
    var username;
    username = this.model.get('twitter_username');
    return this.$('.twitter .latest-tweet').tweet({
      username: username,
      count: 1,
      broadcast_only: true,
      time_parser: __bind(function(time) {
        return $.timeago(time);
      }, this),
      onLoad: __bind(function(data) {
        var _a;
        this.$('.twitter .form').remove();
        return !(typeof (_a = this.model.get('avatar')) !== "undefined" && _a !== null) ? this.model.save({
          'avatar': data[0] == null ? undefined : data[0].user == null ? undefined : data[0].user.profile_image_url
        }) : null;
      }, this)
    });
  };
  SocialView.prototype.vote = function() {
    alert('Voting for a tweet or post will allow good deals to bubble to the top for other members');
    return false;
  };
  SocialView.prototype.showSecurityMessage = function() {
    return alert("Eventually link to details about how we maintain privacy");
  };
  return SocialView;
});