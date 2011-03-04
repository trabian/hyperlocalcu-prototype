var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.Social = (function() {
  function Social() {
    this.renderTwitter = __bind(this.renderTwitter, this);;    Social.__super__.constructor.apply(this, arguments);
  }
  __extends(Social, Backbone.View);
  Social.prototype.tagName = 'div';
  Social.prototype.className = 'social';
  Social.prototype.render = function() {
    this.template = App.templates['common/social/overview'];
    $(this.el).html(this.template(this.model.toDetailJSON()));
    if (this.model.twitter_username) {
      this.renderTwitter();
    }
    return this;
  };
  Social.prototype.renderTwitter = function() {
    var username;
    username = this.model.twitter_username;
    return this.$('.twitter .latest-tweet').tweet({
      username: this.model.twitter_username,
      count: 1,
      broadcast_only: true,
      internal: true
    });
  };
  return Social;
})();