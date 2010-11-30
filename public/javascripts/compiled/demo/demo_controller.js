var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(["order!vendor/socket_io", "order!vendor/juggernaut", "demo/views/snapshot_dialog_view"], function(socket_io, juggernaut, SnapshotDialogView) {
  var DemoController;
  DemoController = function() {
    var _a;
    _a = this;
    this.fetchSnapshots = function(){ return DemoController.prototype.fetchSnapshots.apply(_a, arguments); };
    return Backbone.Controller.apply(this, arguments);
  };
  __extends(DemoController, Backbone.Controller);
  DemoController.prototype.initialize = function(options) {
    var jug;
    jug = new Juggernaut();
    return jug.subscribe('monitor', function(data) {
      return console.log('Message received on "monitor" channel', data);
    });
  };
  DemoController.prototype.routes = {
    "demo/snapshots": 'fetchSnapshots'
  };
  DemoController.prototype.fetchSnapshots = function() {
    this.snapshotDialogView || (this.snapshotDialogView = new SnapshotDialogView());
    return this.snapshotDialogView.render();
  };
  return DemoController;
});