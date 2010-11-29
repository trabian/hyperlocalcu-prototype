var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['demo/models/snapshot'], function(Snapshot) {
  var SnapshotList;
  SnapshotList = function() {
    return Backbone.Collection.apply(this, arguments);
  };
  __extends(SnapshotList, Backbone.Collection);
  SnapshotList.prototype.model = Snapshot;
  SnapshotList.prototype.url = '/demo/snapshots';
  SnapshotList.prototype.comparator = function(snapshot) {
    return new Date() - new Date(snapshot.get('timestamp'));
  };
  return SnapshotList;
});