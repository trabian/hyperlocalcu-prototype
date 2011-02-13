var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(["http://js.pusherapp.com/1.6/pusher.min.js"], function(pusher) {
  var Socket;
  Socket = (function() {
    function Socket() {
      this.channelName = __bind(this.channelName, this);;
      this.listenTo = __bind(this.listenTo, this);;
    }
    Socket.prototype.listenTo = function(model) {
      var channel;
      this.pusher || (this.pusher = new Pusher(PUSHER_KEY));
      channel = this.pusher.subscribe(this.channelName(model));
      return channel.bind_all(__bind(function(event, data) {
        return model.trigger(event, data);
      }, this));
    };
    Socket.prototype.channelName = function(model) {
      return model.url().replace(/^\//, '').replace(/\//, '_');
    };
    return Socket;
  })();
  return new Socket;
});