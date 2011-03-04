var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.view.MessagesNotice = (function() {
  function MessagesNotice() {
    MessagesNotice.__super__.constructor.apply(this, arguments);
  }
  __extends(MessagesNotice, Backbone.View);
  MessagesNotice.prototype.id = 'messages-notice';
  MessagesNotice.prototype.initialize = function(options) {
    return this.template = App.templates['members/messages_notice'];
  };
  MessagesNotice.prototype.render = function() {
    $(this.el).html(this.template());
    return this;
  };
  return MessagesNotice;
})();