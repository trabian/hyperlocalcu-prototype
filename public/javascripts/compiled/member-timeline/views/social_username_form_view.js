var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(function() {
  var SocialUsernameFormView;
  SocialUsernameFormView = function() {
    var _a;
    _a = this;
    this.addUsername = function(){ return SocialUsernameFormView.prototype.addUsername.apply(_a, arguments); };
    this.addUsernameOnEnter = function(){ return SocialUsernameFormView.prototype.addUsernameOnEnter.apply(_a, arguments); };
    return Backbone.View.apply(this, arguments);
  };
  __extends(SocialUsernameFormView, Backbone.View);
  SocialUsernameFormView.prototype.events = {
    'click button': 'addUsername',
    'keypress input.text': 'addUsernameOnEnter'
  };
  SocialUsernameFormView.prototype.addUsernameOnEnter = function(e) {
    if (e.keyCode === 13) {
      return this.addUsername();
    }
  };
  SocialUsernameFormView.prototype.addUsername = function() {
    var attrs, username;
    username = this.$('input.text').val();
    this.$('.form').html('Loading...');
    attrs = {};
    attrs[this.options.fieldname] = username;
    return this.model.save(attrs);
  };
  return SocialUsernameFormView;
});