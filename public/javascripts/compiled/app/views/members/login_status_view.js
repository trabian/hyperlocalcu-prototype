var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.LoginStatus = (function() {
  function LoginStatus() {
    LoginStatus.__super__.constructor.apply(this, arguments);
  }
  __extends(LoginStatus, Backbone.View);
  LoginStatus.prototype.id = 'login-status';
  LoginStatus.prototype.initialize = function(options) {
    return this.template = App.templates['members/login_status'];
  };
  LoginStatus.prototype.render = function() {
    $(this.el).html(this.template(this.model.toViewJSON()));
    return this;
  };
  return LoginStatus;
})();