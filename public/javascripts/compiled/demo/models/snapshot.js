var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(function() {
  var Snapshot;
  Snapshot = function() {
    return Backbone.Model.apply(this, arguments);
  };
  __extends(Snapshot, Backbone.Model);
  Snapshot.prototype.age = function() {
    return this.age || (this.age = (new Date() - new Date(this.get('timestamp'))));
  };
  Snapshot.prototype.restore = function() {
    return $.post("" + (this.url()) + "/restore", __bind(function() {
      return this.trigger('restore');
    }, this));
  };
  return Snapshot;
});