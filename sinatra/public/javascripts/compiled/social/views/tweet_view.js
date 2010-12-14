var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["vendor/jquery-ui", "vendor/showdown", "text!views/social/twitter/form.handlebars?version=5"], function(jqueryUI, showdown, tweetFormTemplate) {
  var TweetView;
  TweetView = function() {
    var _a;
    _a = this;
    this.submitTweet = function(){ return TweetView.prototype.submitTweet.apply(_a, arguments); };
    this.render = function(){ return TweetView.prototype.render.apply(_a, arguments); };
    this.updateCount = function(){ return TweetView.prototype.updateCount.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(TweetView, Backbone.View);
  TweetView.prototype.events = {
    "keyup textarea": "updateCount",
    "click button": "submitTweet"
  };
  TweetView.prototype.template = Handlebars.compile(tweetFormTemplate);
  TweetView.prototype.initialize = function() {
    this.maxChars = 140;
    this.markdownConverter = new Showdown.converter();
    return this.render();
  };
  TweetView.prototype.updateCount = function() {
    var charCount;
    this.count || (this.count = this.$('.count'));
    this.field || (this.field = this.$('textarea'));
    this.button || (this.button = this.$('button'));
    this.form || (this.form = this.$('.tweet-form'));
    charCount = $.trim(this.field.val()).length;
    this.count.text(this.maxChars - charCount);
    if (charCount > this.maxChars) {
      this.button.button('disable');
      return this.form.addClass('over-limit');
    } else {
      if (charCount === 0) {
        this.button.button('disable');
      } else {
        this.button.button('enable');
      }
      return this.form.removeClass('over-limit');
    }
  };
  TweetView.prototype.render = function() {
    var tweet;
    tweet = {
      message: this.options.twitterSettings["default"],
      prompt: this.markdownConverter.makeHtml(this.options.twitterSettings.prompt)
    };
    $(this.el).html(this.template(tweet));
    this.$('button').button();
    return this.updateCount();
  };
  TweetView.prototype.submitTweet = function() {
    return !(this.button.button('option', 'disabled')) ? alert("This doesn't work quite yet.  But it will.  Oh, it will.") : null;
  };
  return TweetView;
});