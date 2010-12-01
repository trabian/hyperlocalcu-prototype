var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
define(["order!vendor/socket_io", "order!vendor/juggernaut"], function(socket_io, juggernaut) {
  var Socket;
  Socket = function() {
    var _a;
    _a = this;
    this.listenTo = function(){ return Socket.prototype.listenTo.apply(_a, arguments); };
    return this;
  };
  Socket.prototype.listenTo = function(model) {
    this.jug || (this.jug = new Juggernaut());
    return this.jug.subscribe(model.url, __bind(function(data) {
      return model.trigger(data.event, data.object);
    }, this));
  };
  return new Socket();
});