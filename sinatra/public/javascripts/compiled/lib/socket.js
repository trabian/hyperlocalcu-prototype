var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
define(["http://js.pusherapp.com/1.6/pusher.min.js"], function(pusher) {
  var Socket;
  Socket = function() {
    var _a;
    _a = this;
    this.channelName = function(){ return Socket.prototype.channelName.apply(_a, arguments); };
    this.listenTo = function(){ return Socket.prototype.listenTo.apply(_a, arguments); };
    return this;
  };
  Socket.prototype.listenTo = function(model) {
    var channel;
    this.pusher || (this.pusher = new Pusher(PUSHER_KEY));
    channel = this.pusher.subscribe(this.channelName(model));
    return channel.bind_all(__bind(function(event, data) {
      return model.trigger(event, data);
    }, this));
  };
  Socket.prototype.channelName = function(model) {
    return model.url.replace(/^\//, '').replace(/\//, '_');
  };
  return new Socket();
});