var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
define(['app/views/timeline/event'], function(EventView) {
  var AtmRow;
  AtmRow = function() {
    return EventView.apply(this, arguments);
  };
  __extends(AtmRow, EventView);
  return AtmRow;
});