var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/models/event'], function(Event) {
  var CUEvent;
  CUEvent = function() {
    return Event.apply(this, arguments);
  };
  __extends(CUEvent, Event);
  CUEvent.prototype.initialize = function() {
    CUEvent.__super__.initialize.call(this);
    this.twitter_username = 'VantageCU';
    return (this.avatar = "http://a2.twimg.com/profile_images/447377254/Van_Small_normal.jpg");
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
});