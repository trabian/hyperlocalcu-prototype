var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
App.model.CUEvent = (function() {
  function CUEvent() {
    CUEvent.__super__.constructor.apply(this, arguments);
  }
  __extends(CUEvent, App.model.Event);
  CUEvent.prototype.initialize = function() {
    CUEvent.__super__.initialize.call(this);
    this.twitter_username = 'VantageCU';
    return this.avatar = "http://a2.twimg.com/profile_images/447377254/Van_Small_normal.jpg";
  };
  CUEvent.prototype.isSocial = function() {
    return true;
  };
  CUEvent.prototype.toDetailJSON = function() {
    return _.extend(this.toViewJSON(), {
      twitter_username: this.twitter_username,
      avatar: this.avatar
    });
  };
  return CUEvent;
})();