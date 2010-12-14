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
    return Backbone.View.apply(this, arguments);
  };
  __extends(SocialUsernameFormView, Backbone.View);
  SocialUsernameFormView.prototype.events = {
    'click button': addUsername
  };
  return SocialUsernameFormView;
});